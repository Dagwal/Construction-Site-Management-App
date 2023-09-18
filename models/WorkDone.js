const mongoose = require('mongoose');

const workDoneSchema = new mongoose.Schema({
  itemNumber: String, // Item number from the contract agreement
  unit: String,      // Unit (e.g., m3-h, d, w, m2-w, h, pcs, kg)
  unitPrice: Number, // Unit price from the contract agreement
  measurement: Number, // Measurement (if applicable)
  status: {
    type: String,
    enum: ['Pending', 'Completed'], // Status of the work (Pending or Completed)
    default: 'Pending', // Default status is Pending
  },
});

module.exports = mongoose.model('WorkDone', workDoneSchema);
