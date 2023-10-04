const mongoose = require('mongoose');

const UsedMaterialSchema = new mongoose.Schema({
    itemNumber: Number, // Foreign Key referencing Material Table
    materialName: String,
    materialTypeSize: String,
    quantity: Number,
    unitMesurment: String,
    price: Number,
    date: { type: Date, default: Date.now }
  });

  const UsedMaterialArchiveSchema = UsedMaterialSchema.clone();

  const UsedMaterialTable = mongoose.model('UsedMaterialTable2', UsedMaterialSchema);
  const UsedMaterialArchiveTable = mongoose.model('UsedMaterialArchive', UsedMaterialArchiveSchema);

  module.exports = {UsedMaterialTable, UsedMaterialArchiveTable};