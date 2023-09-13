const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
  itemNumber: String,
  description: String,
  unit: String,
  quantity: Number,
  unitPrice: Number,
});

module.exports = mongoose.model('Contract', contractSchema);
