const express = require('express');
const router = express.Router();
const Stats = require('../models/statsModels');

// Get all stats
router.get('/', async (req, res) => {
  try {
    const stats = await Stats.find();
    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Get a single stat by ID
router.get('/:id', async (req, res) => {
  try {
    const Stats = await Stats.findById(req.params.id).exec();
    if (!Stats) {
      return res.status(404).json({ msg: 'Stat not found' });
    }
    res.json(Stats);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Stat not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
