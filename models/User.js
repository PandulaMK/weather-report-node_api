const mongoose = require('mongoose');

const weatherEntrySchema = new mongoose.Schema({
  data: {
    temperature: Number,
    description: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
  },
  location: {
    type: String,
    required: true,
  },
  weatherData: [weatherEntrySchema],
});

module.exports = mongoose.model('User', userSchema);
