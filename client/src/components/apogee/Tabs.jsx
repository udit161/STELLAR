import React from 'react';

export function Tabs({ mode, setMode }) {
  const isSignup = mode === 'signup';

  return (
    <div className="auth-tab-nav" role="tablist" aria-label="Authentication Mode Selection">
      <div
        className="tab-pill-indicator"
        style={{ transform: isSignup ? 'translateX(100%)' : 'translateX(0)' }}
      />

      <button
        type="button"
        className={`auth-tab-btn ${!isSignup ? 'active' : ''}`}
        role="tab"
        aria-selected={!isSignup}
        aria-controls="panelSignin"
        tabIndex={!isSignup ? 0 : -1}
        onClick={() => setMode('signin')}
      >
        Sign In
      </button>

      <button
        type="button"
        className={`auth-tab-btn ${isSignup ? 'active' : ''}`}
        role="tab"
        aria-selected={isSignup}
        aria-controls="panelSignup"
        tabIndex={isSignup ? 0 : -1}
        onClick={() => setMode('signup')}
      >
        Create Account
      </button>
    </div>
  );
}

export default Tabs;
