const mongoose = require('mongoose');
const WorkDone = require('./WorkDone'); 

const contractSchema = new mongoose.Schema({
  itemNumber: Number,
  buildingComponent: String,
  itemName: String,
  unit : String,
  quantity: Number,
  unitPrice: Number,
});

const ContractArchiveSchema = new mongoose.Schema({
  itemNumber: Number,
  buildingComponent: String,
  itemName: String,
  unit: String,
  quantity: Number,
  unitPrice: Number,
});


const ContractArchiveTable = mongoose.model('ContractArchive', ContractArchiveSchema);
const ContractTable = mongoose.model('Contract', contractSchema);

module.exports = { 
  ContractTable,
  ContractArchiveTable, 
}

