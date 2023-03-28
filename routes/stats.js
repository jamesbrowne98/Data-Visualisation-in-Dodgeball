const express = require('express');
const router = express.Router();
const Player = require('../models/player');

router.get('/:id', async (req, res) => {
  try {
    const playerStats = await Player.findOne({ _id: req.params.id });
    if (!playerStats) {
      return res.status(404).json({ msg: 'Player stats not found' });
    }
    res.json(playerStats);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
