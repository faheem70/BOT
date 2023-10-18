import React from 'react';

const adminDashboardStyle = {
    textAlign: 'center',
    padding: '20px',
};

const navStyle = {
    marginTop: '20px',
};

const ulStyle = {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'center',
};

const liStyle = {
    margin: '0 20px',
};

const linkStyle = {
    textDecoration: 'none',
    color: 'blue',
};

function AdminDashboard() {
    return (
        <div style={adminDashboardStyle}>
            <h1>Admin Dashboard</h1>
            <nav style={navStyle}>
                <ul style={ulStyle}>
                    <li style={liStyle}>
                        <a href="/#/userlist" style={linkStyle}>User Management</a>
                    </li>
                    <li style={liStyle}>
                        <a href="/#/botsetting" style={linkStyle}>Bot Settings</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default AdminDashboard;
