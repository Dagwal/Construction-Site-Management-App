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

const workDoneArchiveSchema = workDoneSchema.clone();

const WorkDone = mongoose.model('WorkDone', workDoneSchema);
const WorkDoneArchiveTable = mongoose.model('WorkDoneArchive', workDoneArchiveSchema);

module.exports = { WorkDone, WorkDoneArchiveTable };