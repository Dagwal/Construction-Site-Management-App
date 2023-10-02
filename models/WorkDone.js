const mongoose = require('mongoose');

const workDoneSchema = new mongoose.Schema({
  itemNumber: Number,
  buildingComponent: String,
  itemName: String,
  unit : String,
  quantity: Number,
  unitPrice: Number,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('WorkDone', workDoneSchema);
