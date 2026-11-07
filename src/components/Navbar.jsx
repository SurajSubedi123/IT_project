import React from 'react';

export default function Navbar({ activePage, setActivePage, currentUser, onLogout }) {
  return (
    <header className="navbar">
      <div className="navbar-content">
        <div className="navbar-left">
          <span
            className="brand-title"
            onClick={() => setActivePage('home')}
            title="Switch to Home View"
          >
            IT SIMULATION PROJECT
          </span>
          <span className="brand-separator">/</span>
          <span
            className="brand-subtitle"
            onClick={() => setActivePage('login')}
            title="Switch to Login / Sign Up"
          >
            {activePage === 'login' ? 'Login and Sign Up' : 'Home'}
          </span>
        </div>

        {/* Quick View Toggle for easy review of both screens */}
        <div className="navbar-right">
          <button
            type="button"
            className={`view-pill ${activePage === 'login' ? 'active' : ''}`}
            onClick={() => setActivePage('login')}
            title="View Login and Sign Up Page (Image 1)"
          >
            Login & Sign Up
          </button>
          <button
            type="button"
            className={`view-pill ${activePage === 'home' ? 'active' : ''}`}
            onClick={() => setActivePage('home')}
            title="View Home Page (Image 2)"
          >
            Home View
          </button>

          {currentUser && (
            <div className="user-profile">
              <span className="user-initial">{currentUser.name.charAt(0).toUpperCase()}</span>
              <span className="user-name">{currentUser.name}</span>
              <button type="button" className="logout-link" onClick={onLogout}>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .navbar {
          background-color: #111d33;
          height: 58px;
          display: flex;
          align-items: center;
          width: 100%;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
        }

        .navbar-content {
          width: 100%;
          padding: 0 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .navbar-left {
          display: flex;
          align-items: center;
          gap: 10px;
          user-select: none;
        }

        .brand-title {
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.6px;
          color: #ffffff;
          cursor: pointer;
        }

        .brand-separator {
          font-size: 15px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.7);
        }

        .brand-subtitle {
          font-size: 15px;
          font-weight: 600;
          color: #ffffff;
          cursor: pointer;
        }

        .navbar-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .view-pill {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #cbd5e1;
          font-size: 12px;
          font-weight: 500;
          padding: 4px 10px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .view-pill:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.16);
        }

        .view-pill.active {
          background: rgba(255, 255, 255, 0.25);
          color: #ffffff;
          font-weight: 600;
          border-color: rgba(255, 255, 255, 0.4);
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-left: 8px;
          background: rgba(255, 255, 255, 0.1);
          padding: 3px 10px 3px 6px;
          border-radius: 20px;
        }

        .user-initial {
          width: 22px;
          height: 22px;
          background-color: #2563eb;
          color: #ffffff;
          border-radius: 50%;
          font-size: 11px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .user-name {
          font-size: 12px;
          color: #f1f5f9;
          font-weight: 500;
        }

        .logout-link {
          background: none;
          border: none;
          color: #fca5a5;
          font-size: 11px;
          cursor: pointer;
          font-weight: 600;
          padding: 2px 4px;
        }

        .logout-link:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .navbar-content {
            padding: 0 16px;
          }
          .brand-title {
            font-size: 13px;
          }
          .brand-subtitle {
            font-size: 13px;
          }
          .view-pill {
            font-size: 11px;
            padding: 3px 8px;
          }
        }
      `}</style>
    </header>
  );
}
