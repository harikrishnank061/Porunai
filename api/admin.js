import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Disable buffering so we see errors immediately instead of waiting 10 seconds
mongoose.set('bufferCommands', false);

const app = express();
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// MongoDB Connection with caching for serverless
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb && mongoose.connection.readyState === 1) {
    return cachedDb;
  }
  cachedDb = null;
  try {
    console.log('Connecting to MongoDB (Fresh Attempt)...');
    const db = await mongoose.connect(process.env.MONGODB_URI.trim(), {
      serverSelectionTimeoutMS: 20000, // Give it 20 seconds to find the leader
    });
    console.log('Successfully connected to MongoDB');
    cachedDb = db;
    return db;
  } catch (error) {
    cachedDb = null;
    console.error('MongoDB Connection Error Details:', error.message);
    throw error;
  }
}

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'events',
    transformation: [{ width: 1200, crop: 'limit', quality: 'auto', fetch_format: 'auto' }],
  },
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit per image
});

// Schema
const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  category: String,
  images: [String],
  president: String,
  secretary: String,
  treasurer: String,
  governor: String,
  riTheme: String,
  location: String,
  createdAt: { type: Date, default: Date.now },
});

const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);

// Auth Middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Routes
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return res.json({ token });
  }
  res.status(401).json({ error: 'Invalid credentials' });
});

app.get('/api/admin/events', async (req, res) => {
  try {
    await connectToDatabase();
    const { category, page = 1, limit = 10 } = req.query;
    const query = category ? { category } : {};
    
    // Safety limit: Never allow fetching more than 100 items at once
    const safeLimit = Math.min(parseInt(limit) || 10, 100);
    
    const events = await Event.find(query)
      .sort({ date: -1 })
      .skip((Math.max(0, parseInt(page) - 1)) * safeLimit)
      .limit(safeLimit);
    
    const total = await Event.countDocuments(query);
    
    res.json({ events, total });
  } catch (err) {
    console.error('Fetch Error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/admin/events', authenticate, upload.array('images', 15), async (req, res) => {
  try {
    await connectToDatabase();
    const { title, description, date, category, president, secretary, treasurer, governor, riTheme, location } = req.body;
    
    if (category === 'Gallery' && (!req.files || req.files.length === 0)) {
      return res.status(400).json({ error: 'Please upload at least one image for the Gallery.' });
    }

    const imageUrls = req.files.map(file => file.path);
    
    console.log(`Creating new event: ${title} with ${imageUrls.length} images`);
    
    const event = new Event({
      title,
      description,
      date,
      category,
      images: imageUrls,
      president,
      secretary,
      treasurer,
      governor,
      riTheme,
      location,
    });

    await event.save();
    res.json(event);
  } catch (err) {
    console.error('Save Error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/admin/events/:id', authenticate, upload.array('images', 15), async (req, res) => {
  try {
    await connectToDatabase();
    const { title, description, date, category, existingImages, president, secretary, treasurer, governor, riTheme, location } = req.body;
    const newImages = req.files.map(file => file.path);
    const images = [...(JSON.parse(existingImages || '[]')), ...newImages];

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { title, description, date, category, images, president, secretary, treasurer, governor, riTheme, location },
      { new: true }
    );
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const getPublicIdFromUrl = (url) => {
  try {
    const parts = url.split('/');
    const folder = parts[parts.length - 2];
    const filename = parts[parts.length - 1].split('.')[0];
    return `${folder}/${filename}`;
  } catch (e) {
    return null;
  }
};

app.delete('/api/admin/events/:id', authenticate, async (req, res) => {
  try {
    await connectToDatabase();
    const event = await Event.findById(req.params.id);
    
    if (event && event.images && event.images.length > 0) {
      const deletePromises = event.images.map(imageUrl => {
        const publicId = getPublicIdFromUrl(imageUrl);
        return publicId ? cloudinary.uploader.destroy(publicId) : Promise.resolve();
      });
      await Promise.all(deletePromises);
    }

    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event and associated images deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Failed to delete event and images' });
  }
});

export default app;
