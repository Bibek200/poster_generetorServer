import Poster from '../models/Poster.js';
import { createCanvas, loadImage } from 'canvas';
import path from 'path';

// Upload Poster with placeholders
export const uploadPoster = async (req, res) => {
  try {
    const { category, placeholders } = req.body;
    const imageUrl = req.file.path;

    let parsedPlaceholders = [];

    if (typeof placeholders === 'string') {
      parsedPlaceholders = JSON.parse(placeholders);
    } else if (Array.isArray(placeholders)) {
      parsedPlaceholders = placeholders;
    }

    parsedPlaceholders = parsedPlaceholders.map(ph => ({
      key: ph.key,
      x: Number(ph.x) || 0,
      y: Number(ph.y) || 0,
      style: ph.style || {}
    }));

    const poster = await Poster.create({ category, imageUrl, placeholders: parsedPlaceholders });

    res.status(201).json({ message: 'Poster uploaded successfully', poster });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Customer Posters
export const getPostersByCategoryWithCustomer = async (req, res) => {
  const { category } = req.params;
  const customer = req.customer;

  try {
    const posters = await Poster.find({ category });

    const customizedPosters = posters.map(poster => {
      const customizedData = {};
      poster.placeholders.forEach(ph => {
        customizedData[ph.key] = {
          value: customer[ph.key] || '',
          x: ph.x,
          y: ph.y,
          style: ph.style || {}
        };
      });

      return {
        _id: poster._id,
        imageUrl: poster.imageUrl,
        category: poster.category,
        customizedData
      };
    });

    res.json({ customer, posters: customizedPosters });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// downlod customer posters
export const downloadCustomizedPoster = async (req, res) => {
  const { posterId } = req.params;
  const customer = req.customer;

  try {
    const poster = await Poster.findById(posterId);
    if (!poster) return res.status(404).json({ message: 'Poster not found' });

    const image = await loadImage(path.resolve(poster.imageUrl));
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);

    poster.placeholders.forEach(ph => {
      const text = customer[ph.key] || '';
      const { fontSize = 20, color = '#000', fontFamily = 'Arial' } = ph.style || {};
      ctx.font = `${fontSize}px ${fontFamily}`;
      ctx.fillStyle = color;
      ctx.fillText(text, ph.x, ph.y);
    });

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', `attachment; filename=poster-${posterId}.png`);

    canvas.createPNGStream().pipe(res);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
