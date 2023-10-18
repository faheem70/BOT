import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
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
    <div>
      <Routes>
        {isAdmin ? (
          <Route path="/admin" element={<AdminPanel />} />
        ) : (
          <Route path="/admin" element={<Navigate to="/" />} />
        )}
        <Route path="/" element={<Login />} />
        <Route path='/usersubscription' element={<UserSubscription />} />
        <Route path='/subscription' element={<Subscription />} />
        <Route path='/userlist' element={<UserList />} />
        <Route path='/botsetting' element={<BotSettings />} />
      </Routes>
    </div>
  );
}

function MainApp() {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
}

export default MainApp;
