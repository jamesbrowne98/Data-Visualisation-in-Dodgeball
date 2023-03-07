const express = require('express');
const router = express.Router();
const Stats = require('../models/stats');

router.get('/stats', async (req, res) => {
  try {
    const statsData = await Stats.find();
    res.send(statsData);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
