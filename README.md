# 🌦️ Weather API Project

This is a Node.js API that allows users to register with their email and location, fetch current weather data for that location using the OpenWeatherMap API, and store weather history in MongoDB. Email functionality and scheduled weather checks are also supported.

---

## 🚀 Features

- Register a user with email and location
- Fetch and store weather data from OpenWeather API
- Update user location
- View weather history for a user
- Scheduled cron jobs to update weather
- Email integration (e.g., notify users)
- MongoDB for storing user and weather data

---

## 📦 Technologies Used

- Node.js + Express
- MongoDB + Mongoose
- Axios (API requests)
- dotenv (env vars)
- Postman (API testing)
- Nodemailer (email utility)
- node-cron (scheduled tasks)

---

## 📁 Project Structure
nodeapp/ <br>
│ <br>
├── models/<br>
│ └── User.js<br>
├── routes/<br>
│ └── users.js<br>
├── utils/<br>
│ └── weather.js<br>
│ └── email.js<br>
├── .env<br>
├── app.js<br>
├── cron.js<br>
└── postman/<br>
  └── collection.json

## 📫 Postman Collection

You can test the API using Postman. Download or import the collection below:

👉 [Download Postman Collection](./postman/collection.json)


## 📫 Postman Collection (Online)

👉 [View & Import Postman Collection]([https://www.postman.com/your-link-here](https://pandula-7331343.postman.co/workspace/Pandula's-Workspace~8087f7ef-e7b7-4563-8b65-78d34774a0cf/request/43795187-54c4c6af-50fd-456f-bb98-57d94e4c1837?action=share&creator=43795187&ctx=documentation))


### 📮 Register a User

**POST** `/api/users`

**Body:**
```json
{
  "email": "test@example.com",
  "location": "London"
}

Response
{
  "_id": "...",
  "email": "test@example.com",
  "location": "London",
  "weatherData": [...]
}

```
<h3>2. Install Dependencies</h3>

npm install

<h3>3. Configure .env</h3>
Create a .env file in the root directory and add: <br>

.env
<br>
MONGO_URI=mongodb://localhost:27017/weatherDB<br>
OPENWEATHER_API_KEY=your_openweather_api_key<br>
EMAIL_USER=your_email@example.com<br>
EMAIL_PASS=your_email_password_or_app_password<br>

<h3>4. Run the Server</h3>

node app.js<br>
Server will run on: http://localhost:3002

<h3>🧪 Sample API Usage</h3>
✅ Register a User<br>
POST /api/users<br>

{<br>
  "email": "john@example.com",<br>
  "location": "Colombo"<br>
}<br>
🔄 Update Location<br>
PUT /api/users/john@example.com<br>
{
  "location": "Kandy"
}
<h3>📊 Get Weather Data</h3>
GET /api/weather/john@example.com

<h3>📅 Cron Job</h3>
The server runs a cron job to:

Periodically fetch weather for all users

Update their history

Optionally, send email updates

<h3>📧 Email Support</h3>
Emails are sent using nodemailer using credentials provided in .env.

