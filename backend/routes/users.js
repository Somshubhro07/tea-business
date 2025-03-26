const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// GET /api/users - Get all users (for merchant dashboard)
router.get('/', auth, async (req, res) => {
  try {
    // Ensure only merchants can access this route
    if (req.user.role !== 'merchant') {
      return res.status(403).json({ message: 'Access denied. Merchants only.' });
    }
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;