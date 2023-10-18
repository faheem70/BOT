import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const loginContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
};

const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: 'blue',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
};

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);


    const handleGoogleLogin = async (googleData) => {
        const idToken = googleData.credential;
        //const userEmail = googleData.profile.email;
        //console.log(userEmail);

        try {
            const response = await fetch('https://bot-backend-sg1l.onrender.com/api/saveUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id_token: idToken }),
            });

            if (response.ok) {
                setUser(googleData);
                const userData = await response.json();
                setUser(userData.user);

            } else {
                console.error('Failed to send Google data to the backend');
            }
        } catch (error) {
            console.error('Error while sending Google data:', error);
        }
    };

    const handleLogout = () => {
        setUser(null);
        navigate('/');
    };
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const adminEmail = process.env.REACT_APP_EMAIL;

    return (

        <div style={loginContainerStyle}>
            <h1>Welcome to Telegram Bot</h1>
            {user ? (
                <div>
                    <p>You are logged in as {user.email}</p>
                    <button onClick={handleLogout} style={buttonStyle}>Logout</button>
                    <span style={{ padding: '0 10px' }}></span>
                    <a href='/subscription'><button style={buttonStyle}>Go For Subscribe</button></a>
                    {user.email === process.env.REACT_APP_EMAIL && (
                        <span style={{ padding: '0 10px' }}>
                            <a href='/admin'><button style={buttonStyle}>Admin Dashboard</button></a>
                        </span>
                    )}
                </div>
            ) : (
                <GoogleOAuthProvider clientId={clientId}
                    scope="https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile"
                >
                    <GoogleLogin
                        onSuccess={handleGoogleLogin}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                        style={buttonStyle}
                    />
                </GoogleOAuthProvider>
            )}
        </div>
    );
};

export default Login;
