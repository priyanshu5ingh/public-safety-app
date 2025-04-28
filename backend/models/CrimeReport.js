const mongoose = require('mongoose');

const crimeReportSchema = new mongoose.Schema({
    crimeType: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('CrimeReport', crimeReportSchema, 'reports'); // 'reports' is the collection name