const mongoose = require('mongoose');
const { ObjectId } = require('mongoose');

const statsSchema = new mongoose.Schema({
  // Define schema for stats data
  _id: { type: ObjectId, required: true},
  player_id: { type: String, required: true},
  game_id: { type: String, required: true},
  PlayerName: {type: String, required: true},
  hits: {type: Number, required: true},
  catches: {type: Number, required: true},
  totalEliminations: {type: Number, required: true},
  singleBallEliminations: {type: Number, required: true},
  teamEliminations: {type: Number, required: true},
  dodges: {type: Number, required: true},
  timesHit: {type: Number, required: true},
  singleOut: {type: Number, required: true},
  teamOut: {type: Number, required: true},
  miscOut: {type: Number, required: true},
  timesCaught: {type: Number, required: true},
  timesEliminated: {type: Number, required: true},
  KD: {type: mongoose.Decimal128, required: true},
  setsOff: {type: Number, required: true},
});

const express = require('express');
const router = express.Router();
const Stats = require('../models/stats');

// GET all stats
router.get('/', async (req, res) => {
  try {
    const stats = await Stats.find({}).limit(100).maxTimeMS(30000);
    res.json(stats);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;