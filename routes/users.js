const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const fetchWeather = require('../utils/weather');
const sendEmail = require('../utils/email');
const router = express.Router();

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Create a user and store data
router.post('/users', [
  body('email').isEmail().withMessage('Please provide a valid email address'),
  body('location').isString().notEmpty().withMessage('Location is required'),
], handleValidationErrors, async (req, res) => {
  const { email, location } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    const newUser = new User({ email, location });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving user data', error });
  }
});

// Update user location
router.put('/users/:email', [
  body('location').isString().notEmpty().withMessage('Location is required'),
], handleValidationErrors, async (req, res) => {
  const { email } = req.params;
  const { location } = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { location },
      { new: true }
    );    
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }    
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating user location', error });
  }
});

// Get weather data for a user
router.get('/weather/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const weatherData = user.weatherData;
    res.json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving weather data', error });
  }
});

module.exports = router;
