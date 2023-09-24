const mongoose = require('mongoose');
const materialSchema = new mongoose.Schema({
    itemNumber: {
        type: String,
        required: true,
    },
    materialName: {
        type: String,
        required: true,
    },
    materialTypeSize: {
        type: String,
        required: true,
    },
});

const MaterialTable = mongoose.model('Material', materialSchema);
module.exports = { MaterialTable };
