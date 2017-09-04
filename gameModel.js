const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  players: [String],
  startTime: Date,
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'location' },
});

module.exports = mongoose.model('game', GameSchema);
