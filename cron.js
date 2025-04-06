const cron = require('node-cron');
const fetchWeather = require('./utils/weather');
const sendEmail = require('./utils/email');
const User = require('./models/User');

cron.schedule('0 */3 * * *', async () => {
  try {
    const users = await User.find();
    for (const user of users) {
      const weather = await fetchWeather(user.location);
      if (weather) {
        const { temperature, description } = weather;
        const weatherReport = `Weather in ${user.location}: ${description}, ${temperature}°C`;
        user.weatherData.push({
          temperature,
          description,
        });
        await user.save();
        await sendEmail(user.email, 'Weather Report', weatherReport);
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
});
