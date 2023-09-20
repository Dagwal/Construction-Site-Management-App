const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for Material Name Table
const stockSchema = new Schema({
  itemNumber: String, // Primary Key
  materialName: String, // Foreign Key referencing Material Name Table
  materialTypeSize: String,
  unit: String, // Foreign Key referencing Material Type/Size Table
  quantity: Number,
  date: { type: Date, default: Date.now }, // Automatically generated
});

const Stocks = mongoose.model('Stocks', stockSchema);
module.exports = Stocks;





































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
