const express = require('express');
const router = express.Router();
const Incident = require('../models/Incident');
const auth = require('../middleware/auth');

// Get all incidents within a radius
router.get('/', async (req, res) => {
  try {
    const { longitude, latitude, radius = 5000 } = req.query;

    const incidents = await Incident.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: parseInt(radius)
        }
      }
    }).sort({ timestamp: -1 });

    res.json(incidents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Report a new incident
router.post('/', auth, async (req, res) => {
  try {
    const { type, description, latitude, longitude } = req.body;

    const incident = new Incident({
      type,
      description,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude]
      },
      reportedBy: req.user.id
    });

    const savedIncident = await incident.save();
    res.status(201).json(savedIncident);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update incident status
router.patch('/:id', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const incident = await Incident.findById(req.params.id);

    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' });
    }

    incident.status = status;
    const updatedIncident = await incident.save();
    res.json(updatedIncident);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 