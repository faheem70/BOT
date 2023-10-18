// server/controllers/userController.js
const User = require('../model/User'); // Import your User model
const { verifyIdToken } = require('../middleware/verfiy');
exports.createUsers = async (req, res) => {
    const googleData = req.body;

    try {
        // Verify the ID token and extract user information
        const userInfo = await verifyIdToken(googleData.id_token);
        // console.log(userInfo);
        // Check if the user with this Google ID exists in your database
        const existingUser = await User.findOne({ googleId: userInfo.sub });

        if (!existingUser) {
            // User doesn't exist, create a new user
            const newUser = new User({
                googleId: userInfo.sub,
                email: userInfo.email,
                // Add other user attributes if needed
            });

            await newUser.save();
            //console.log(newUser);
            res.status(201).json({ message: 'User created successfully', user: newUser });
        } else {
            // User already exists
            res.status(200).json({ message: 'User already exists', user: existingUser });
        }
    } catch (error) {
        // Handle the verification error
        console.error('Verification error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get a list of all users
exports.getAllUsers = async (req, res) => {
    try {
        // Use the find method to retrieve all users from the database
        const users = await User.find();

        if (users) {
            res.json(users);
        } else {
            res.status(404).json({ error: 'No users found' });
        }
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
};

// Block a user
exports.blockUser = async (req, res) => {
    const { userId } = req.params;

    try {
        // Find the user by ID
        const userToBlock = await User.findOne({ _id: userId });

        if (!userToBlock) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Block the user
        userToBlock.blocked = true;

        // Save the updated user to the database
        await userToBlock.save();

        res.status(200).json({ message: 'User blocked successfully' });
    } catch (error) {
        // Handle errors, e.g., database errors
        console.error('Error blocking user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.unblockUser = async (req, res) => {
    const { userId } = req.params;

    try {
        // Find the user by ID
        const userToUnblock = await User.findOne({ _id: userId });

        if (!userToUnblock) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Unblock the user
        userToUnblock.blocked = false;

        // Save the updated user to the database
        await userToUnblock.save();

        res.status(200).json({ message: 'User unblocked successfully' });
    } catch (error) {
        // Handle errors, e.g., database errors
        console.error('Error unblocking user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
// Delete a user
exports.deleteUser = (req, res) => {
    const userId = req.params.userId;
    User.findByIdAndRemove(userId)
        .then(user => {
            if (!user) {
                return res.status(404).send('User not found.');
            }
            res.json({ message: 'User deleted successfully.' });
        })
        .catch(err => {
            console.error('Error deleting user:', err);
            res.status(500).send('An error occurred while deleting the user.');
        });
};

exports.subscribeUser = (req, res) => {
    const { userId } = req.body; // Assuming you're sending the user's ID
    User.findById(userId)
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            user.isSubscribed = !user.isSubscribed; // Toggle the subscription status
            user.save()
                .then((updatedUser) => {
                    res.json(updatedUser);
                })
                .catch((err) => {
                    console.error('Error updating user:', err);
                    res.status(500).json({ error: 'An error occurred while updating user' });
                });
        })
        .catch((err) => {
            console.error('Error finding user:', err);
            res.status(500).json({ error: 'An error occurred while finding user' });
        });
};
exports.deleteUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const deletedUser = await User.findByIdAndRemove(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'An error occurred while deleting the user' });
    }
};