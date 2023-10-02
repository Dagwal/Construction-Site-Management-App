const mongoose = require('mongoose');
const materialSchema = new mongoose.Schema({
    itemNumber: {
        type: Number,
    },
    materialName: {
        type: String,
    },
    materialTypeSize: {
        type: String,
    },
    mesuringUnit: {
        type: String,
    }
});

const MaterialTable = mongoose.model('Material', materialSchema);
module.exports = { MaterialTable };
