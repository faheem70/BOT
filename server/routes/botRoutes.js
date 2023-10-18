
const express = require('express');
const router = express.Router();
const botController = require('../controllers/botController');

router.get('/botsettings', botController.getBotSettings);

router.post('/botsettings', botController.updateBotSettings);


module.exports = router;
