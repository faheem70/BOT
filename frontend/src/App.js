import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Routes component
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import UserSubscription from './components/UserSubscription';
import Subscription from './components/Subscription';
import UserList from './components/UserList';
import BotSettings from './components/BotSettings';
const userMail = 'faheemakhtar19730@gmail.com';
function App() {

  const isAdmin = userMail === 'faheemakhtar19730@gmail.com';
  return (
    <Router>
      <div>
        <Routes> {/* Wrap your Route components in a Routes component */}
          {isAdmin ? (
            <Route path="/admin" element={<AdminPanel />} />
          ) : (
            // If not an admin, you can render a different component or navigate elsewhere
            <Route path="/admin" element={<Navigate to="/" />} />
          )}
          <Route path="/" element={<Login />} />
          <Route path='/usersubscription' element={<UserSubscription />} />
          <Route path='/subscription' element={<Subscription />} />
          <Route path='/userlist' element={<UserList />} />
          <Route path='/botsetting' element={<BotSettings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
