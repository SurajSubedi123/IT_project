import React from 'react';

export default function HomePage({ onNavigateToLogin, onNavigateToSignup }) {
  return (
    <div className="home-container">
      <div className="home-content">
        {/* Page Title & Tagline */}
        <div className="home-header">
          <h1 className="home-title">Home</h1>
          <p className="home-subtitle">
            Learn practical network troubleshooting through realistic, state-based training tickets.
          </p>
        </div>

        {/* Welcome Callout Banner */}
        <section className="welcome-banner">
          <h2 className="banner-heading">
            Welcome to the IT Troubleshooting Training Simulator
          </h2>
          <p className="banner-text">
            Investigate simulated faults on PCs, switches, routers, DNS and DHCP services. Type diagnostic commands, interpret outputs, record your actions and verify your solution.
          </p>
          <p className="banner-cta">
            <span>New here? </span>
            <button type="button" className="inline-link" onClick={onNavigateToSignup}>
              Sign up to begin.
            </button>
            <span> Already have an account? </span>
            <button type="button" className="inline-link" onClick={onNavigateToLogin}>
              Log in to continue.
            </button>
          </p>
        </section>

        {/* How it works Card */}
        <section className="info-card">
          <h3 className="card-heading">How it works</h3>
          <p className="flow-text">
            Log in or sign up <span className="arrow">→</span> Open your tickets or select a scenario <span className="arrow">→</span> Create a ticket <span className="arrow">→</span> Investigate <span className="arrow">→</span> Save or resolve.
          </p>
          <p className="card-description">
            The simulator uses predefined component states. Results change only when the appropriate simulated conditions or device configuration change.
          </p>
        </section>

        {/* Training areas Card */}
        <section className="info-card">
          <h3 className="card-heading">Training areas</h3>
          <p className="areas-list">
            Network connectivity &bull; DNS resolution &bull; DHCP configuration &bull; Physical link troubleshooting
          </p>
          <p className="card-description">
            Useful commands: <code className="cmd-tag">ipconfig</code>, <code className="cmd-tag">ipconfig /all</code>, <code className="cmd-tag">ping</code>, <code className="cmd-tag">nslookup</code> and device-specific switch/router diagnostics.
          </p>
        </section>

        {/* Before you begin Card */}
        <section className="info-card">
          <h3 className="card-heading">Before you begin</h3>
          <p className="card-description">
            These are simulated devices and command outputs, not access to a real computer or live network. Fault details remain hidden until you investigate.
          </p>
        </section>

        {/* Bottom Action Buttons */}
        <div className="home-actions">
          <button 
            type="button" 
            className="action-btn"
            onClick={onNavigateToLogin}
          >
            Log In
          </button>
          <button 
            type="button" 
            className="action-btn"
            onClick={onNavigateToSignup}
          >
            Sign Up
          </button>
          <button 
            type="button" 
            className="action-btn"
            onClick={() => alert('Networking Basics tutorial module selected!')}
          >
            Networking Basics
          </button>
        </div>
      </div>

      <style>{`
        .home-container {
          min-height: calc(100vh - 60px);
          background-color: #f3f6fa;
          padding: 36px 24px 60px 24px;
          display: flex;
          justify-content: center;
        }

        .home-content {
          max-width: 980px;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .home-header {
          margin-bottom: 4px;
        }

        .home-title {
          font-size: 28px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 8px;
          letter-spacing: -0.3px;
        }

        .home-subtitle {
          font-size: 15px;
          color: #64748b;
          line-height: 1.5;
        }

        /* Blue Welcome Banner */
        .welcome-banner {
          background-color: #eff6ff;
          border: 1px solid #bfdbfe;
          border-radius: 10px;
          padding: 24px 28px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .banner-heading {
          font-size: 18px;
          font-weight: 700;
          color: #1e293b;
        }

        .banner-text {
          font-size: 14px;
          color: #334155;
          line-height: 1.6;
        }

        .banner-cta {
          font-size: 14px;
          color: #1e293b;
          font-weight: 500;
        }

        .inline-link {
          background: none;
          border: none;
          color: #2563eb;
          font-weight: 600;
          cursor: pointer;
          padding: 0;
          font-size: 14px;
          text-decoration: none;
        }

        .inline-link:hover {
          text-decoration: underline;
        }

        /* Generic Info Cards */
        .info-card {
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 22px 28px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .card-heading {
          font-size: 17px;
          font-weight: 700;
          color: #1e293b;
        }

        .flow-text {
          font-size: 14px;
          color: #1e293b;
          font-weight: 500;
          line-height: 1.5;
        }

        .arrow {
          color: #64748b;
          margin: 0 4px;
        }

        .areas-list {
          font-size: 14px;
          color: #1e293b;
          font-weight: 500;
        }

        .cmd-tag {
          font-family: 'Consolas', 'Courier New', monospace;
          background-color: #f1f5f9;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 13px;
          color: #0f172a;
        }

        .card-description {
          font-size: 14px;
          color: #64748b;
          line-height: 1.55;
        }

        /* Action Buttons at bottom */
        .home-actions {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 10px;
        }

        .action-btn {
          background-color: #2563eb;
          color: #ffffff;
          border: none;
          border-radius: 8px;
          padding: 10px 22px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.15s ease, transform 0.1s ease;
        }

        .action-btn:hover {
          background-color: #1d4ed8;
        }

        .action-btn:active {
          transform: translateY(1px);
        }

        @media (max-width: 640px) {
          .home-actions {
            flex-direction: column;
            width: 100%;
          }
          .action-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

