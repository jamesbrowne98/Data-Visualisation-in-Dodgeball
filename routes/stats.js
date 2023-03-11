const express = require('express');
const router = express.Router();

const Stats = require('../models/stats');

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const stats = await Stats.find({ _id: id }); 
  res.render('stats', { stats: stats });
});

router.get('/', async (req, res) => {
  try {
    const stats = await Stats.find({});
    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
