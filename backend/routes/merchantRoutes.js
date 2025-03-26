const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Merchant = require('../models/Merchant');

// Register a new merchant
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let merchant = await Merchant.findOne({ email });
    if (merchant) {
      return res.status(400).json({ message: 'Merchant already exists' });
    }

    merchant = new Merchant({ name, email, password, role: 'merchant' });
    const salt = await bcrypt.genSalt(10);
    merchant.password = await bcrypt.hash(password, salt);
    await merchant.save();

    res.status(201).json({ merchant: { id: merchant.id, name, email, role: 'merchant' } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login a merchant
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const merchant = await Merchant.findOne({ email });
    if (!merchant) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, merchant.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (merchant.role !== 'merchant') {
      return res.status(403).json({ message: 'Access denied. Only merchants can log in here.' });
    }

    res.json({ merchant: { id: merchant.id, name: merchant.name, email, role: 'merchant' } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get merchant profile by ID
router.get('/:id', async (req, res) => {
  try {
    const merchant = await Merchant.findById(req.params.id).select('-password');
    if (!merchant) {
      return res.status(404).json({ message: 'Merchant not found' });
    }
    if (merchant.role !== 'merchant') {
      return res.status(403).json({ message: 'Access denied. Not a merchant.' });
    }
    res.json({ merchant });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;