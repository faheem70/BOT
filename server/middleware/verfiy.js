const { OAuth2Client } = require('google-auth-library');

// Initialize the OAuth2 client with your Google client ID
const CLIENT_ID = '849372130948-d10lraplnablfekkab7p3ka4i5uomddn.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

// Define a function to verify the ID token
async function verifyIdToken(idToken) {
    try {
        const ticket = await client.verifyIdToken({
            idToken,
            audience: CLIENT_ID,
        });

        const payload = ticket.getPayload();
        return payload;
    } catch (error) {
        // Log the verification error for debugging purposes
        console.error('Error verifying ID token:', error.message);
        throw new Error('Invalid ID token');
    }
}

module.exports = {
    verifyIdToken,
};
