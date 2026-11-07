import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';

export default function App() {
  const [activePage, setActivePage] = useState('login'); // Default is 'login' exactly like Image 1
  const [currentUser, setCurrentUser] = useState(null);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    // Optional: automatically transition to home or stay with success notification
  };

  const handleSignupSuccess = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActivePage('login');
  };

  return (
    <div className="app-root">
      {/* Top Navbar */}
      <Navbar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="app-main">
        {activePage === 'login' ? (
          <LoginPage 
            onLoginSuccess={handleLoginSuccess}
            onSignupSuccess={handleSignupSuccess}
          />
        ) : (
          <HomePage 
            onNavigateToLogin={() => setActivePage('login')}
            onNavigateToSignup={() => setActivePage('login')}
          />
        )}
      </main>

      <style>{`
        .app-root {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background-color: #f3f6fa;
        }

        .app-main {
          flex: 1;
        }
      `}</style>
    </div>
  );
}

