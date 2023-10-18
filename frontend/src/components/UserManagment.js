import React, { useState, useEffect } from 'react';

const UserList = () => {
    const [users, setUsers] = useState([]);

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
    }, []);

    return (
        <div>
            <h1>User List</h1>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>
                        User ID: {user._id}
                        {/* Add other user data fields here */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
