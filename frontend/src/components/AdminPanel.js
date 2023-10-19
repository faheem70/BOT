import React from 'react';

const adminDashboardStyle = {
    textAlign: 'center',
    padding: '20px',
    backgroundImage: 'url("https://www.sss-solutions.org/wp-content/uploads/2018/01/1116146294-login-page-background-image-112.jpg")',
    backgroundSize: 'cover',
    color: 'white',
    height: '100vh', // Make the background cover the entire viewport
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};

const headingStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
};

const buttonContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: 'blue',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    margin: '10px',
    borderRadius: '5px',
    textDecoration: 'none',

};

function AdminDashboard() {
    return (
        <div style={adminDashboardStyle}>
            <h1 style={headingStyle}>Admin Dashboard</h1>
            <div style={buttonContainerStyle}>
                <a href="/#/userlist" style={buttonStyle}>
                    User Management
                </a>
                <a href="/#/botsetting" style={buttonStyle}>
                    Bot Settings
                </a>
            </div>
        </div>
    );
}

export default AdminDashboard;
