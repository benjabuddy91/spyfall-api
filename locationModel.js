var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const LocationSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
})

module.exports = mongoose.model('location', LocationSchema)