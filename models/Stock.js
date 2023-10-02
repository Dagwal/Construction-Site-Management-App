const mongoose = require('mongoose');
const material = require('./Material');

// Schema for Stock Table (Table 1)
const stockTable1Schema = new mongoose.Schema({
  itemNumber: Number, // Foreign Key referencing Material Table
  materialName: String,
  materialTypeSize: String,
  quantity: Number,
  unitMesurment: String,
  price: Number,
  date: { type: Date, default: Date.now }, // Automatically generated
});

// Schema for Table 2 (Aggregated Stock)
const stockTable2Schema = new mongoose.Schema({
  itemNumber: Number, // Foreign Key referencing Material Table
  materialName: String,
  materialTypeSize: String,
  quantity: Number,
  unitMesurment: String,
  price: Number,
  date: { type: Date, default: Date.now }
});

const StockTable1 = mongoose.model('StockTable1', stockTable1Schema);
const StockTable2 = mongoose.model('StockTable2', stockTable2Schema);

module.exports = {
  StockTable1,
  StockTable2,
};






































// const mongoose = require('mongoose');

// // Schema for Material Name Table
// const materialNameSchema = new mongoose.Schema({
//   name: { type: String, required: true, unique: true }, // Primary Key
// });

// // Schema for Material Type/Size Table
// const materialTypeSizeSchema = new mongoose.Schema({
//   typeSize: { type: String, required: true }, // Primary Key
// });

// // Schema for Table 1 (Stock Table)
// const stockTable1Schema = new mongoose.Schema({
//   itemNumber: { type: String, required: true, unique: true }, // Primary Key
//   materialName: { type: mongoose.Schema.Types.ObjectId, ref: 'MaterialName', required: true }, // Foreign Key
//   materialTypeSize: { type: mongoose.Schema.Types.ObjectId, ref: 'MaterialTypeSize', required: true }, // Foreign Key
//   quantity: { type: Number, required: true },
//   date: { type: Date, default: Date.now }, // Automatically generated
// });

// // Schema for Table 2 (Aggregated Stock)
// const stockTable2Schema = new mongoose.Schema({
//   materialName: { type: mongoose.Schema.Types.ObjectId, ref: 'MaterialName', required: true }, // Foreign Key
//   materialTypeSize: { type: mongoose.Schema.Types.ObjectId, ref: 'MaterialTypeSize', required: true }, // Foreign Key
//   totalQuantity: { type: Number, required: true },
//   lastUpdatedDate: { type: Date, default: Date.now }, // Automatically generated
// });

// // Create models for each schema
// const MaterialName = mongoose.model('MaterialName', materialNameSchema);
// const MaterialTypeSize = mongoose.model('MaterialTypeSize', materialTypeSizeSchema);
// const StockTable1 = mongoose.model('StockTable1', stockTable1Schema);
// const StockTable2 = mongoose.model('StockTable2', stockTable2Schema);

// module.exports = {
//   MaterialName,
//   MaterialTypeSize,
//   StockTable1,
//   StockTable2,
// };
