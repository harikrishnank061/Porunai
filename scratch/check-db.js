import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const eventSchema = new mongoose.Schema({
  title: String,
  category: String,
  images: [String],
});

const Event = mongoose.model('Event', eventSchema);

async function checkData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI.trim());
    console.log('Connected to DB');
    const events = await Event.find({}).sort({ _id: -1 }).limit(5);
    console.log('Latest 5 items in DB:');
    events.forEach(e => {
      console.log(`- Title: ${e.title}, Category: ${e.category}, ImageCount: ${e.images?.length}`);
    });
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

checkData();
