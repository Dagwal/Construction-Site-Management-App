// models/WorkDone.js
const mongoose = require('mongoose');

const workDoneSchema = new mongoose.Schema({
    itemNumber: {
        type: String,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    },
    unitPrice: {
        type: Number,
        required: true,
    },
    measurement: {
        type: String,
        required: true,
        enum: ['m3-h', 'd', 'w', 'm2-w', 'h', 'pcs', 'kg'],
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const WorkDone = mongoose.model('WorkDone', workDoneSchema);

module.exports = { WorkDone };
