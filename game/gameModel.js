const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  players: [{ type: String, unique: true }],
  startTime: Number,
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'location' },
  locations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'location' }],
  spy: String,
  accessCode: String,
  host: String,
});

module.exports = mongoose.model('game', GameSchema);
