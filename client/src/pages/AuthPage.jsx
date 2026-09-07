import React, { useState } from 'react';
import {
  Satellite,
  Eye,
  EyeOff,
  ArrowRight,
  User,
  Mail,
  Lock,
  Sparkles,
  AlertCircle,
  Globe,
} from 'lucide-react';
import { TopologyBackground } from '../components/TopologyBackground';
import { login, signup } from '../services/authService';
import './AuthPage.css';

export default function AuthPage({ onAuthSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Login fields
  const [loginId, setLoginId] = useState('');
  const [loginPass, setLoginPass] = useState('');

  // Signup fields
  const [signupEmail, setSignupEmail] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupFullName, setSignupFullName] = useState('');
  const [signupPass, setSignupPass] = useState('');
  const [signupConfirm, setSignupConfirm] = useState('');

  const switchMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginId.trim() || !loginPass.trim()) {
      setError('Please enter your credentials.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const data = await login({
        username_or_email: loginId.trim(),
        password: loginPass,
      });
      onAuthSuccess(data.user);
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!signupEmail.trim() || !signupUsername.trim() || !signupPass.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    if (signupPass.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (signupPass !== signupConfirm) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const data = await signup({
        email: signupEmail.trim(),
        username: signupUsername.trim(),
        password: signupPass,
        full_name: signupFullName.trim() || null,
      });
      onAuthSuccess(data.user);
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TopologyBackground />
      <div className="auth-page">
        {/* Ambient glow orbs */}
        <div className="auth-glow auth-glow-1" />
        <div className="auth-glow auth-glow-2" />

        <div className="auth-card">
          {/* Top glass sheen */}
          <div className="auth-card-sheen" />
          <div className="auth-card-wave" />

          {/* Header */}
          <div className="auth-header">
            <div className="auth-logo-orbit">
              <div className="auth-logo-ring" />
              <Satellite size={28} className="auth-logo-icon" />
            </div>
            <h1 className="auth-title">SatQuery AI</h1>
            <p className="auth-subtitle">
              {mode === 'login'
                ? 'Sign in to your mission control'
                : 'Create your command center account'}
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="auth-error">
              <AlertCircle size={14} />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          {mode === 'login' && (
            <form className="auth-form" onSubmit={handleLogin}>
              <div className="auth-field">
                <label className="auth-label">Username or Email</label>
                <div className="auth-input-wrap">
                  <User size={16} className="auth-input-icon" />
                  <input
                    id="login-id"
                    type="text"
                    className="auth-input"
                    placeholder="commander@isro.gov.in"
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                    autoFocus
                  />
                </div>
              </div>
              <div className="auth-field">
                <label className="auth-label">Password</label>
                <div className="auth-input-wrap">
                  <Lock size={16} className="auth-input-icon" />
                  <input
                    id="login-pass"
                    type={showPassword ? 'text' : 'password'}
                    className="auth-input"
                    placeholder="••••••••"
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                  />
                  <button
                    type="button"
                    className="auth-eye-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <button
                id="login-submit"
                type="submit"
                className={`auth-submit ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                {loading ? (
                  <span className="auth-spinner" />
                ) : (
                  <>
                    Access Mission Control
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Signup Form */}
          {mode === 'signup' && (
            <form className="auth-form" onSubmit={handleSignup}>
              <div className="auth-field">
                <label className="auth-label">Email</label>
                <div className="auth-input-wrap">
                  <Mail size={16} className="auth-input-icon" />
                  <input
                    id="signup-email"
                    type="email"
                    className="auth-input"
                    placeholder="you@example.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    autoFocus
                  />
                </div>
              </div>
              <div className="auth-field">
                <label className="auth-label">Username</label>
                <div className="auth-input-wrap">
                  <User size={16} className="auth-input-icon" />
                  <input
                    id="signup-username"
                    type="text"
                    className="auth-input"
                    placeholder="satcommander"
                    value={signupUsername}
                    onChange={(e) => setSignupUsername(e.target.value)}
                  />
                </div>
              </div>
              <div className="auth-field">
                <label className="auth-label">Full Name <span className="auth-optional">(optional)</span></label>
                <div className="auth-input-wrap">
                  <Globe size={16} className="auth-input-icon" />
                  <input
                    id="signup-fullname"
                    type="text"
                    className="auth-input"
                    placeholder="Dr. Vikram Sarabhai"
                    value={signupFullName}
                    onChange={(e) => setSignupFullName(e.target.value)}
                  />
                </div>
              </div>
              <div className="auth-field">
                <label className="auth-label">Password</label>
                <div className="auth-input-wrap">
                  <Lock size={16} className="auth-input-icon" />
                  <input
                    id="signup-pass"
                    type={showPassword ? 'text' : 'password'}
                    className="auth-input"
                    placeholder="Min 6 characters"
                    value={signupPass}
                    onChange={(e) => setSignupPass(e.target.value)}
                  />
                  <button
                    type="button"
                    className="auth-eye-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div className="auth-field">
                <label className="auth-label">Confirm Password</label>
                <div className="auth-input-wrap">
                  <Lock size={16} className="auth-input-icon" />
                  <input
                    id="signup-confirm"
                    type={showPassword ? 'text' : 'password'}
                    className="auth-input"
                    placeholder="Re-enter password"
                    value={signupConfirm}
                    onChange={(e) => setSignupConfirm(e.target.value)}
                  />
                </div>
              </div>
              <button
                id="signup-submit"
                type="submit"
                className={`auth-submit ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                {loading ? (
                  <span className="auth-spinner" />
                ) : (
                  <>
                    Launch Account
                    <Sparkles size={16} />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Toggle */}
          <div className="auth-switch">
            <span className="auth-switch-text">
              {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
            </span>
            <button className="auth-switch-btn" onClick={switchMode}>
              {mode === 'login' ? 'Create Account' : 'Sign In'}
            </button>
          </div>

          {/* Footer badge */}
          <div className="auth-badge">
            <Satellite size={11} />
            <span>Secured by SatQuery Ground Station</span>
          </div>
        </div>
      </div>
    </>
  );
}
