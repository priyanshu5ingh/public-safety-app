const express = require('express');
const router = express.Router();
const News = require('../models/News');

// Get all news items
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    
    const news = await News.find(query)
      .sort({ timestamp: -1 })
      .limit(50);

    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new news item (for admin use)
router.post('/', async (req, res) => {
  try {
    const { title, description, source, category, url } = req.body;

    const news = new News({
      title,
      description,
      source,
      category,
      url
    });

    const savedNews = await news.save();
    res.status(201).json(savedNews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 