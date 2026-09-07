import React, { useState } from 'react';
import StarfieldCanvas from './StarfieldCanvas';
import AstronautHead from './AstronautHead';
import AuthCard from './AuthCard';
import './ApogeeAuth.css';

export function AuthPage({ onSuccess }) {
  const [mode, setMode] = useState('signin');

  return (
    <div className="apogee-viewport-wrapper">
      <StarfieldCanvas />
      <div className="nebula-wash" aria-hidden="true" />

      <main className="apogee-viewport-container">
        <div className="apogee-layout">
          {/* Left Column: Hero & Interactive Astronaut Head */}
          <section className="hero-stage" aria-label="Apogee Mission Control Briefing">
            <div className="brand-badge">
              <span className="brand-badge-dot" aria-hidden="true" />
              <span className="brand-badge-text">Apogee Orbital v2.4</span>
            </div>

            <AstronautHead />

            <div className="hero-title-group">
              <h1 className="hero-heading">Explore the Celestial Frontier</h1>
              <p className="hero-subtitle">
                Chart your course through deep space telemetry, satellite imagery, and high-dimensional orbital data.
              </p>
            </div>

            <div className="hero-telemetry">
              <div className="telemetry-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M2 12h20" />
                </svg>
                <span>STAC Sentinel-2</span>
              </div>
              <div className="telemetry-divider" />
              <div className="telemetry-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                <span>99.99% Telemetry</span>
              </div>
            </div>
          </section>

          {/* Right Column: Liquid Metal Glass Auth Card */}
          <AuthCard mode={mode} setMode={setMode} onSuccess={onSuccess} />
        </div>
      </main>
    </div>
  );
}

export default AuthPage;
