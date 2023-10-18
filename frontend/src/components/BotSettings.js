import React, { useState, useEffect } from 'react';
import '../components/BotSettings.css';

function BotSettings() {
    const [apiKey, setApiKey] = useState('');
    const [botSettings, setBotSettings] = useState({ apiKey: '' });

    useEffect(() => {
        // Fetch bot settings when the component mounts
        fetch('http://localhost:4000/api/botsettings')
            .then((response) => response.json())
            .then((data) => setBotSettings(data))
            .catch((error) => console.error(error));
    }, []);

    const updateBotSettings = () => {
        fetch('http://localhost:4000/api/botsettings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ apiKey }),
        })
            .then((response) => response.json())
            .then((data) => setBotSettings(data))
            .catch((error) => console.error(error));
    };

    return (
        <div className="App">
            <h1>Bot Settings</h1>
            <div className="bot-settings">
                <label className="label">API Key: </label>
                <input
                    className="input"
                    type="text"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                />
                <button className="button" onClick={updateBotSettings}>Update</button>
            </div>
            <div className="bot-settings">
                <h2>Current Bot Settings</h2>
                <p>API Key: {botSettings.apiKey}</p>
            </div>
        </div>
    );
}

export default BotSettings;
