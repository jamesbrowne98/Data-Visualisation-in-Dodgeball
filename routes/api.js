const express = require('express');
const router = express.Router();
const Stats = require('../models/stats');

// Route to get stats data
router.get('/', async (req, res) => {
  try {
    const stats = await Stats.find();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
