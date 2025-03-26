const mongoose = require('mongoose');

const teaSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // e.g., "Matcha Bliss"
  description: { type: String, required: true }, // e.g., "Green vibes, caffeine kicks."
  price: { type: Number, required: true }, // e.g., 12.99
  source: { type: String, required: true }, // e.g., "Kyoto, Japan"
  type: { type: String, enum: ['Green', 'Black', 'White', 'Herbal', 'Oolong'], required: true },
  image: { type: String, required: true }, // URL to tea image
  stock: { type: Number, default: 100 }, // Inventory count
  quip: { type: String }, // Cheeky hover text, e.g., "Sip me, I dare you"
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Tea', teaSchema);