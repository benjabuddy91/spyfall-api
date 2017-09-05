const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  players: [String],
  startTime: Date,
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'location' },
  spy: String,
});

module.exports = mongoose.model('game', GameSchema);
