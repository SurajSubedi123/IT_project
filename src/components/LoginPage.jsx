import React, { useState, useRef } from 'react';
import { Eye, EyeOff, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

export default function LoginPage({ onLoginSuccess, onSignupSuccess }) {
  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');

  // Signup Form State
  const [fullName, setFullName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupError, setSignupError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState('');

  const fullNameInputRef = useRef(null);

  // Initialize users in localStorage if not present
  React.useEffect(() => {
    const existing = localStorage.getItem('it_sim_users');
    if (!existing) {
      const defaultUsers = [
        {
          name: 'Demo Student',
          email: 'student@example.com',
          password: 'password123'
        }
      ];
      localStorage.setItem('it_sim_users', JSON.stringify(defaultUsers));
    }
  }, []);

  // Validate email helper
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  // Handle Login Submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginSuccess('');

    if (!loginEmail.trim()) {
      setLoginError('Please enter your email address.');
      return;
    }
    if (!isValidEmail(loginEmail)) {
      setLoginError('Please enter a valid email address.');
      return;
    }
    if (!loginPassword) {
      setLoginError('Please enter your password.');
      return;
    }

    setLoginLoading(true);
    setTimeout(() => {
      setLoginLoading(false);
      
      const storedUsers = JSON.parse(localStorage.getItem('it_sim_users') || '[]');
      const matchedUser = storedUsers.find(
        (u) => u.email.toLowerCase() === loginEmail.toLowerCase().trim()
      );

      if (matchedUser) {
        if (matchedUser.password !== loginPassword) {
          setLoginError('Invalid password. Please check your credentials.');
          return;
        }
        setLoginSuccess(`Welcome back, ${matchedUser.name}! Logging you in...`);
        if (onLoginSuccess) {
          setTimeout(() => {
            onLoginSuccess({
              email: matchedUser.email,
              name: matchedUser.name,
              role: 'student'
            });
          }, 600);
        }
      } else {
        // Allow login as demo user if not found or give helpful feedback
        setLoginSuccess(`Welcome back! Logged in as student.`);
        if (onLoginSuccess) {
          setTimeout(() => {
            onLoginSuccess({
              email: loginEmail,
              name: loginEmail.split('@')[0],
              role: 'student'
            });
          }, 600);
        }
      }
    }, 500);
  };

  // Handle Signup Submission
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setSignupError('');
    setSignupSuccess('');

    if (!fullName.trim()) {
      setSignupError('Please enter your full name.');
      return;
    }
    if (!studentEmail.trim()) {
      setSignupError('Please enter your student email.');
      return;
    }
    if (!isValidEmail(studentEmail)) {
      setSignupError('Please enter a valid student email address.');
      return;
    }
    if (!signupPassword) {
      setSignupError('Please create a password.');
      return;
    }
    if (signupPassword.length < 6) {
      setSignupError('Password must be at least 6 characters long.');
      return;
    }
    if (signupPassword !== confirmPassword) {
      setSignupError('Passwords do not match. Please verify.');
      return;
    }

    setSignupLoading(true);
    setTimeout(() => {
      setSignupLoading(false);

      const storedUsers = JSON.parse(localStorage.getItem('it_sim_users') || '[]');
      const exists = storedUsers.some(
        (u) => u.email.toLowerCase() === studentEmail.toLowerCase().trim()
      );

      if (exists) {
        setSignupError('An account with this student email already exists.');
        return;
      }

      const newUser = {
        name: fullName.trim(),
        email: studentEmail.trim(),
        password: signupPassword
      };

      storedUsers.push(newUser);
      localStorage.setItem('it_sim_users', JSON.stringify(storedUsers));

      setSignupSuccess(`Account created successfully for ${fullName}! You can now log in.`);
      
      // Auto-fill login email for convenience
      setLoginEmail(studentEmail);
      setFullName('');
      setStudentEmail('');
      setSignupPassword('');
      setConfirmPassword('');

      if (onSignupSuccess) {
        onSignupSuccess(newUser);
      }
    }, 600);
  };

  const handleFocusSignup = () => {
    if (fullNameInputRef.current) {
      fullNameInputRef.current.focus();
      fullNameInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="login-signup-container">
      <div className="cards-wrapper">
        {/* ================= LEFT CARD: WELCOME BACK (LOGIN) ================= */}
        <section className="auth-card" aria-label="Login form">
          <h2 className="card-title">Welcome back</h2>

          {loginError && (
            <div className="alert-message error" role="alert">
              <AlertCircle size={16} />
              <span>{loginError}</span>
            </div>
          )}

          {loginSuccess && (
            <div className="alert-message success" role="status">
              <CheckCircle2 size={16} />
              <span>{loginSuccess}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="auth-form" noValidate>
            <div className="form-group">
              <label htmlFor="login-email" className="form-label">
                Email address
              </label>
              <input
                id="login-email"
                type="email"
                className="form-input"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                autoComplete="email"
                placeholder=""
                disabled={loginLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="login-password" className="form-label">
                Password
              </label>
              <div className="input-with-icon">
                <input
                  id="login-password"
                  type={showLoginPassword ? 'text' : 'password'}
                  className="form-input"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  autoComplete="current-password"
                  placeholder=""
                  disabled={loginLoading}
                />
                {loginPassword && (
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    tabIndex="-1"
                    title={showLoginPassword ? 'Hide password' : 'Show password'}
                    aria-label={showLoginPassword ? 'Hide password' : 'Show password'}
                  >
                    {showLoginPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                )}
              </div>
            </div>

            <div className="login-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loginLoading}
              >
                {loginLoading ? 'Logging In...' : 'Log In'}
              </button>
            </div>

            <div className="card-footer-link">
              <button
                type="button"
                className="link-btn"
                onClick={handleFocusSignup}
              >
                <span>New student? Create an account</span>
                <ArrowRight size={15} className="link-arrow" />
              </button>
            </div>
          </form>
        </section>

        {/* ================= RIGHT CARD: CREATE STUDENT ACCOUNT ================= */}
        <section className="auth-card" aria-label="Sign up form">
          <h2 className="card-title">Create Student Account</h2>

          {signupError && (
            <div className="alert-message error" role="alert">
              <AlertCircle size={16} />
              <span>{signupError}</span>
            </div>
          )}

          {signupSuccess && (
            <div className="alert-message success" role="status">
              <CheckCircle2 size={16} />
              <span>{signupSuccess}</span>
            </div>
          )}

          <form onSubmit={handleSignupSubmit} className="auth-form" noValidate>
            <div className="form-group">
              <label htmlFor="signup-fullname" className="form-label">
                Full name
              </label>
              <input
                ref={fullNameInputRef}
                id="signup-fullname"
                type="text"
                className="form-input"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                autoComplete="name"
                disabled={signupLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="signup-email" className="form-label">
                Student email
              </label>
              <input
                id="signup-email"
                type="email"
                className="form-input"
                placeholder="student@example.com"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                autoComplete="email"
                disabled={signupLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="signup-password" className="form-label">
                Password
              </label>
              <div className="input-with-icon">
                <input
                  id="signup-password"
                  type={showSignupPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="Create a password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  autoComplete="new-password"
                  disabled={signupLoading}
                />
                {signupPassword && (
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowSignupPassword(!showSignupPassword)}
                    tabIndex="-1"
                    title={showSignupPassword ? 'Hide password' : 'Show password'}
                    aria-label={showSignupPassword ? 'Hide password' : 'Show password'}
                  >
                    {showSignupPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="signup-confirm-password" className="form-label">
                Confirm password
              </label>
              <div className="input-with-icon">
                <input
                  id="signup-confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="Repeat password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  disabled={signupLoading}
                />
                {confirmPassword && (
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    tabIndex="-1"
                    title={showConfirmPassword ? 'Hide password' : 'Show password'}
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                )}
              </div>
            </div>

            <div className="signup-actions">
              <button
                type="submit"
                className="btn btn-signup"
                disabled={signupLoading}
              >
                {signupLoading ? 'Creating account...' : 'Sign Up'}
              </button>
            </div>
          </form>
        </section>
      </div>

      <style>{`
        .login-signup-container {
          min-height: calc(100vh - 60px);
          background-color: #f3f6fa;
          padding: 48px 24px;
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }

        .cards-wrapper {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 36px;
          max-width: 1040px;
          width: 100%;
        }

        .auth-card {
          background-color: #ffffff;
          border-radius: 12px;
          padding: 36px 36px 40px 36px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03);
          display: flex;
          flex-direction: column;
        }

        .card-title {
          font-size: 20px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 24px;
          letter-spacing: -0.2px;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .form-label {
          font-size: 14px;
          font-weight: 500;
          color: #64748b;
          user-select: none;
        }

        .input-with-icon {
          position: relative;
          display: flex;
          align-items: center;
        }

        .form-input {
          width: 100%;
          height: 44px;
          background-color: #f1f5f9;
          border: 1px solid transparent;
          border-radius: 8px;
          padding: 0 14px;
          font-size: 14px;
          color: #1e293b;
          transition: all 0.15s ease-in-out;
          outline: none;
        }

        .form-input::placeholder {
          color: #94a3b8;
          font-size: 14px;
        }

        .form-input:focus {
          background-color: #ffffff;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
        }

        .form-input:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .password-toggle-btn {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.15s ease;
        }

        .password-toggle-btn:hover {
          color: #475569;
        }

        .login-actions {
          margin-top: 8px;
        }

        /* Log In Button - Specific width & vibrant blue matching screenshot */
        .btn {
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease-in-out;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .btn-primary {
          background-color: #2563eb;
          color: #ffffff;
          height: 42px;
          min-width: 145px;
          padding: 0 24px;
        }

        .btn-primary:hover:not(:disabled) {
          background-color: #1d4ed8;
        }

        .btn-primary:active:not(:disabled) {
          background-color: #1e40af;
          transform: translateY(1px);
        }

        /* Sign Up Button - Full width & dark green matching screenshot */
        .signup-actions {
          margin-top: 10px;
        }

        .btn-signup {
          width: 100%;
          height: 44px;
          background-color: #15803d;
          color: #ffffff;
          font-weight: 600;
        }

        .btn-signup:hover:not(:disabled) {
          background-color: #166534;
        }

        .btn-signup:active:not(:disabled) {
          background-color: #14532d;
          transform: translateY(1px);
        }

        .btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        /* Footer link matching screenshot: "New student? Create an account ->" */
        .card-footer-link {
          margin-top: 14px;
        }

        .link-btn {
          background: none;
          border: none;
          color: #2563eb;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 0;
          transition: color 0.15s ease, transform 0.15s ease;
        }

        .link-btn:hover {
          color: #1d4ed8;
          text-decoration: underline;
        }

        .link-arrow {
          transition: transform 0.15s ease;
        }

        .link-btn:hover .link-arrow {
          transform: translateX(3px);
        }

        /* Alerts */
        .alert-message {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 16px;
        }

        .alert-message.error {
          background-color: #fef2f2;
          color: #b91c1c;
          border: 1px solid #fecaca;
        }

        .alert-message.success {
          background-color: #f0fdf4;
          color: #15803d;
          border: 1px solid #bbf7d0;
        }

        /* Responsive layout */
        @media (max-width: 820px) {
          .cards-wrapper {
            grid-template-columns: 1fr;
            max-width: 520px;
            gap: 28px;
          }

          .login-signup-container {
            padding: 24px 16px;
          }

          .auth-card {
            padding: 24px 20px 28px 20px;
          }

          .btn-primary {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

