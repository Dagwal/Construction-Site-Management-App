const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
  itemNumber: Number,
  buildingComponent: String,
  itemName: String,
  unit : String,
  quantity: Number,
  unitPrice: Number,
});

const ContractTable = mongoose.model('Contract', contractSchema);
module.exports = { ContractTable }
