const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
  player_id: {
    type: String,
    required: true
  },
  game_id: {
    type: String,
    required: true
  },
  PlayerName: {
    type: String,
    required: true
  },
  hits: {
    type: Number,
    required: true
  },
  catches: {
    type: Number,
    required: true
  },
  totalEliminations: {
    type: Number,
    required: true
  },
  singleBallEliminations: {
    type: Number,
    required: true
  },
  Eliminations: {
    type: Number,
    required: true
  },
  dodges: {
    type: Number,
    required: true
  },
  timesHit: {
    type: Number,
    required: true
  },
  singleOut: {
    type: Number,
    required: true
  },
  teamOut: {
    type: Number,
    required: true
  },
  miscOut: {
    type: Number,
    required: true
  },
  timesCaught: {
    type: Number,
    required: true
  },
  timesEliminated: {
    type: Number,
    required: true
  },
  KD: {
    type: mongoose.Decimal128,
    required: true
  },
  setsOff: {
    type: Number,
    required: true
  }
});

const Stats = mongoose.model('Stats', statsSchema);

module.exports = Stats;
