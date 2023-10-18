import React, { useEffect, useState } from 'react';
import "./Subscription.css"
import axios from 'axios';
const Subscription = () => {
    const [location, setLocation] = useState('');
    const [time, setTime] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the subscription data to send to the backend
        const subscriptionData = {
            location,
            time,
        };

        try {
            const response = await fetch('http://localhost:4000/api/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(subscriptionData),
            });

            if (response.ok) {
                setMessage('Subscription successful!'); // Display success message

                // Fetch weather data again and update the message
                const fetchData = async () => {
                    try {
                        const response = await axios.get(
                            `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=3065e13d98f813ae1b6b963a14e5ffb7`
                        );
                        const data = response.data;

                        // Extract the weather information and create the message
                        const weather = data.weather[0].description;
                        const temperature = data.main.temp - 273.15;
                        const city = data.name;
                        const humidity = data.main.humidity;
                        const pressure = data.main.pressure;
                        const windSpeed = data.wind.speed;
                        const newMessage = `The weather in ${city} is ${weather} with a temperature of ${temperature.toFixed(2)}°C. The humidity is ${humidity}%, the pressure is ${pressure}hPa, and the wind speed is ${windSpeed}m/s.`;

                        // Set the message in the state
                        setMessage(`You will receive weather updates at ${time}. ${newMessage}`);

                    } catch (error) {
                        // Handle errors
                        setMessage('Error fetching weather data');
                        console.error('Error fetching weather data:', error);
                    }
                };

                fetchData();
            } else {
                setMessage('Subscription failed. Please try again later.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again later.');
        }
    };


    return (
        <div className='subscription-container '>
            <h1>Subscribe for Daily Weather Updates</h1>
            <form onSubmit={handleSubmit}>
                <div className=''>
                    <label htmlFor="location">Location: </label>
                    <input
                        type="text"
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="time">Time of Update: </label>
                    <input
                        type="time"
                        id="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                </div>
                <button className='submit-button' type="submit">Subscribe</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default Subscription;
