import React, { useState, useEffect } from 'react';
import "./UserList.css"
import Login from './Login';
const UserList = () => {
    const [users, setUsers] = useState([]);
    const [deletedUserId, setDeletedUserId] = useState(null);
    useEffect(() => {
        // Fetch all users when the component mounts
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://bot-backend-sg1l.onrender.com/api/getAllUsers', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const userData = await response.json();
                    setUsers(userData);
                } else {
                    console.error('Failed to fetch users');
                }
            } catch (error) {
                console.error('Error while fetching users:', error);
            }
        };

        fetchUsers();
    }, [deletedUserId]);
    const handleBlockUser = async (userId) => {
        try {
            const response = await fetch(`https://bot-backend-sg1l.onrender.com/api/blockUser/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Assuming users is the array of users in your frontend state
                setUsers((prevUsers) =>
                    prevUsers.map((user) => {
                        if (user._id === userId) {
                            return { ...user, blocked: true };
                        }
                        return user;
                    })
                );
            } else {
                console.error('Failed to block the user');
            }
        } catch (error) {
            console.error('Error while blocking the user:', error);
        }
    };

    const handleUnblockUser = async (userId) => {
        try {
            const response = await fetch(`https://bot-backend-sg1l.onrender.com/unblockUser/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Assuming users is the array of users in your frontend state
                setUsers((prevUsers) =>
                    prevUsers.map((user) => {
                        if (user._id === userId) {
                            return { ...user, blocked: false };
                        }
                        return user;
                    })
                );
            } else {
                console.error('Failed to unblock the user');
            }
        } catch (error) {
            console.error('Error while unblocking the user:', error);
        }
    };
    const handleDeleteUser = (userId) => {
        fetch(`https://bot-backend-sg1l.onrender.com/api/delete/${userId}`, {
            method: 'DELETE'
        })
            .then((response) => {
                if (response.status === 200) {
                    setDeletedUserId(userId); 
                }
            })
            .catch((error) => console.error(error));
    };


    return (
        <div className="user-list">
            <h1>User List</h1>
            <ul className="user-list-items">
                {users.map((user) => (
                    <li key={user._id} className="user-item">
                        UserEmail : {user.email}
                        <span style={{ padding: '0 5px' }}></span>
                        User ID: {user._id}
                        {user.blocked ? (
                            <button onClick={() => handleUnblockUser(user._id)}>Unblock User</button>
                        ) : (
                            <button onClick={() => handleBlockUser(user._id)}>Block User</button>
                        )}
                        <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};



export default UserList;

