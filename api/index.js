import server from '../dist/server/server.js';
import { Readable } from 'node:stream';

export default async function handler(req, res) {
  try {
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const url = new URL(req.url, `${protocol}://${host}`);
    
    const requestOptions = {
      method: req.method,
      headers: req.headers,
    };

    if (req.method !== 'GET' && req.method !== 'HEAD') {
      const body = new ReadableStream({
        start(controller) {
          req.on('data', chunk => controller.enqueue(chunk));
          req.on('end', () => controller.close());
          req.on('error', err => controller.error(err));
        }
      });
      requestOptions.body = body;
      requestOptions.duplex = 'half';
    }

    const request = new Request(url, requestOptions);
    const response = await server.fetch(request);

    res.status(response.status);
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    if (response.body) {
      const reader = response.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
      res.end();
    } else {
      res.end();
    }
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).send('Internal Server Error');
  }
}
