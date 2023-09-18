const mongoose = require('mongoose');
const materialSchema = new mongoose.Schema({
    materialName: {
        type: String,
        required: true,
        unique: true, // Ensures uniqueness in the Material Name Table
    },
    materialTypeSize: {
        type: String,
        required: true,
        unique: true, // Ensures uniqueness in the Material Type/Size Table
    },
});

const MaterialTable = mongoose.model('Material', materialSchema);
module.exports = { MaterialTable };
