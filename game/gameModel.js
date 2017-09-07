const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  players: [{ type: String, unique: true }],
  startTime: Date,
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'location' },
  spy: String,
  accessCode: String,
  host: String,
});

module.exports = mongoose.model('game', GameSchema);
