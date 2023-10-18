
const BotSettings = require('../model/BotSettings');

// For your getBotSettings route
exports.getBotSettings = async (req, res) => {
    try {
        const settings = await BotSettings.findOne({});

        res.json(settings); // Send a JSON response
    } catch (error) {
        res.status(500).json({ error: 'Error fetching bot settings' }); // Send a JSON error response
    }
};

// For your updateBotSettings route
exports.updateBotSettings = async (req, res) => {
    const { apiKey } = req.body;

    try {
        let settings = await BotSettings.findOne({});
        if (!settings) {
            settings = new BotSettings({ apiKey });
        } else {
            settings.apiKey = apiKey;
        }
        await settings.save();
        res.json(settings); // Send a JSON response
    } catch (error) {
        res.status(500).json({ error: 'Error updating bot settings' }); // Send a JSON error response
    }
};

