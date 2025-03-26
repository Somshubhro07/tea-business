const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Order = require('../models/Order');

// GET /api/orders - Get all orders (for merchant dashboard)
router.get('/', auth, async (req, res) => {
  try {
    // Ensure only merchants can access this route
    if (req.user.role !== 'merchant') {
      return res.status(403).json({ message: 'Access denied. Merchants only.' });
    }
    const orders = await Order.find().populate('user', 'name email');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;