const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  playerId: Number,
  hits: Number,
  catches: Number,
  totalEliminations: Number,
  singleBallEliminations: Number,
  teamEliminations: Number,
  dodges: Number,
  timesHit: Number,
  singleOut: Number,
  teamOut: Number,
  miscOut: Number,
  timesCaught: Number,
  timesEliminated: Number,
  KD: Number,
  setsOff: Number
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;

