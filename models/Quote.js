const mongoose = require('mongoose');
const { Schema } = mongoose;

const quoteSchema = new Schema({
  id: Number,
  season: Number,
  episode: Number,
  scene: Number,
  line_text: String,
  speaker: String
});

mongoose.model('quote', quoteSchema, 'office');
