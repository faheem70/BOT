
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        unique: true,
    },
    email: String, // Add an email field
    // Add a name field
    blocked: {
        type: Boolean,
        default: false,
    },
    // Add more fields as needed
});
module.exports = mongoose.model('User', userSchema);


