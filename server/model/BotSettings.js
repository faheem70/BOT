const mongoose = require('mongoose');

const botSettingsSchema = new mongoose.Schema({
    apiKey: String,

});

module.exports = mongoose.model('BotSettings', botSettingsSchema);
