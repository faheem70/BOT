// server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

// Define routes for user management (e.g., list, block, delete users)
router.get('/getAllUsers', userController.getAllUsers);
router.post('/saveUser', userController.createUsers)
router.post('/blockUser/:userId', userController.blockUser);
router.post('/unblockUser/:userId', userController.blockUser);
router.delete('/delete/:userId', userController.deleteUser);
router.post('/subscribe', userController.subscribeUser);
module.exports = router;

