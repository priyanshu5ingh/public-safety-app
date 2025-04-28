const express = require('express');
const router = express.Router();
const db = require('../db');
const Joi = require('joi');

// Validation schema for crime reports
const crimeReportSchema = Joi.object({
    crimeType: Joi.string().required(),
    description: Joi.string().allow('').optional(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    timestamp: Joi.date().optional()
});

// GET all crime reports
router.get('/', (req, res) => {
    db.all('SELECT * FROM crime_reports', [], (err, rows) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(rows);
    });
});

// POST a new crime report
router.post('/', (req, res) => {
    const { error } = crimeReportSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { crimeType, description, latitude, longitude, timestamp } = req.body;
    const sql = `INSERT INTO crime_reports (crimeType, description, latitude, longitude, timestamp) VALUES (?, ?, ?, ?, ?)`;
    db.run(sql, [crimeType, description, latitude, longitude, timestamp || new Date().toISOString()], function(err) {
        if (err) return res.status(500).json({ message: err.message });
        res.status(201).json({ id: this.lastID, ...req.body });
    });
});

module.exports = router;