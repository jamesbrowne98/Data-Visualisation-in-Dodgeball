const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Stats = require('../models/stats'); // import your Stats model here

// GET stats data
router.get('/stats', async (req, res) => {
  try {
    const statsData = await Stats.find({});
    res.json(statsData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Route to add new stats data
router.post('/stats', async (req, res) => {
  const statsData = new Stats({
    player_id: req.body.player_id,
    game_id: req.body.game_id,
    PlayerName: req.body.PlayerName,
    hits: req.body.hits,
    catches: req.body.catches,
    totalEliminations: req.body.totalEliminations,
    singleBallEliminations: req.body.singleBallEliminations,
    teamEliminations: req.body.teamEliminations,
    dodges: req.body.dodges,
    timesHit: req.body.timesHit,
    singleOut: req.body.singleOut,
    teamOut: req.body.teamOut,
    miscOut: req.body.miscOut,
    timesCaught: req.body.timesCaught,
    timesEliminated: req.body.timesEliminated,
    KD: req.body.KD,
    setsOff: req.body.setsOff,
  });

  try {
    const savedStatsData = await statsData.save();
    res.json(savedStatsData);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
