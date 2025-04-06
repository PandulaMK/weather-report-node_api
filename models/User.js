const mongoose = require('mongoose');

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
  weatherData: [{
    date: {
      type: Date,
      default: Date.now,
    },
    temperature: Number,
    description: String,
  }]
});

module.exports = mongoose.model('User', userSchema);