const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Tea = require('../models/Tea');

// GET /api/teas - Get all teas
router.get('/', async (req, res) => {
  try {
    const teas = await Tea.find();
    res.json(teas);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/teas - Add a new tea (merchant only)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'merchant') {
      return res.status(403).json({ message: 'Access denied. Merchants only.' });
    }

    const { name, description, price, image, category } = req.body;
    const tea = new Tea({ name, description, price, image, category });
    await tea.save();
    res.status(201).json(tea);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;