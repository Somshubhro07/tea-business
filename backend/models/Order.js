const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  teas: [
    {
      tea: { type: mongoose.Schema.Types.ObjectId, ref: 'Tea', required: true },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
  total: { type: Number, required: true }, // Total price
  status: { type: String, enum: ['pending', 'shipped', 'delivered'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);