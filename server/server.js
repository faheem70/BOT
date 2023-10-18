// server/server.js
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const TelegramBot = require('node-telegram-bot-api');
const axios = require("axios");
const bodyParser = require('body-parser');
// Import models, routes, and controllers
const dotenv = require("dotenv");
const authRoute = require("./middleware/auth");
const User = require('./model/User');
const BotSettings = require('./model/BotSettings');
const userRoutes = require('./routes/userRoutes');
const botRoutes = require('./routes/botRoutes');
const cors = require('cors');

const app = express();
app.use(cors());
dotenv.config();
const mongoURI = process.env.MONGO_URI;
// Set up sessions, Passport for Google OAuth, and MongoDB connection
app.use(session({ secret: 'V8LO6Kj8oM', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());


mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });
// Set up the Telegram bot
BotSettings.findOne({})
    .then((settings) => {
        const token = settings ? settings.apiKey : process.env.TELEGRAM_API_KRY;
        const bot = new TelegramBot(token, { polling: true });

        bot.on("message", async (msg) => {
            const chatId = msg.chat.id;
            const userInput = msg.text;

            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=3065e13d98f813ae1b6b963a14e5ffb7`
                );
                const data = response.data;

                const weather = data.weather[0].description;
                const temperature = data.main.temp - 273.15;
                const city = data.name;
                const humidity = data.main.humidity;
                const pressure = data.main.pressure;
                const windSpeed = data.wind.speed;
                const message = `The weather in ${city} is ${weather} with a temperature of ${temperature.toFixed(2)}°C. The humidity is ${humidity}%, the pressure is ${pressure}hPa, and the wind speed is ${windSpeed}m/s.`;

                bot.sendMessage(chatId, message);
            } catch (error) {
                bot.sendMessage(chatId, "City doesn't exist.");
            }
        });

        // Start your Express server

    })
    .catch((err) => {
        console.error(err);
    });
const Subscription = mongoose.model('Subscription', {
    location: String,
    time: String,
});


// API endpoint for handling subscription requests
app.post('/api/subscribe', async (req, res) => {
    const { location, time } = req.body;

    // Perform validation here if necessary

    // Create a new subscription document and save it to the database
    const newSubscription = new Subscription({ location, time });
    try {
        await newSubscription.save();
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
// Passport configuration





// Define your routes
app.use('/api', userRoutes);
app.use('/api/users', userRoutes);
app.use('/api', botRoutes);

// Set up Express routes for Google OAuth
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);
app.use("/auth", authRoute);
const port = process.env.PORT
// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    // bot.startPolling();
});

