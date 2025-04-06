const axios = require('axios');
require('dotenv').config();

const fetchWeather = async (location) => {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(url);
    const { main, weather } = response.data;
    return {
      temperature: main.temp,
      description: weather[0].description,
    };
  } catch (error) {
    console.error('Error:', error);
    return { error: 'Unable to fetch weather data.' };
  }
};

module.exports = fetchWeather;
