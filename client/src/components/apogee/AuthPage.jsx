import React, { useState } from 'react';
import ScatterAndReassembleText from '../ScatterAndReassembleText';
import AstronautHead from './AstronautHead';
import AuthCard from './AuthCard';
import './ApogeeAuth.css';

export function AuthPage({ onSuccess }) {
  const [mode, setMode] = useState('signin');

  return (
    <div className="apogee-viewport-wrapper">
      {/* Header Mid: SatQuery AI Abstract Morphing Logo Card */}
      <header className="header-mid-bar">
        <div className="intro-abstract-card-container">
          <div className="intro-abstract-halo" />
          <div className="intro-abstract-ring" />
          <div className="intro-abstract-mask" />
          <div className="intro-abstract-card">
            <div className="intro-logo-scaled-inner">
              <ScatterAndReassembleText showMultilingual={false} singleLine={true} />
            </div>
          </div>
        </div>
      </header>

      <main className="apogee-viewport-container">
        <div className="apogee-layout">
          {/* Left Column: Hero & Interactive Astronaut Head with Cursor-Tracking Eyes */}
          <section className="hero-stage" aria-label="SatQuery AI Platform Briefing">
            <div className="brand-badge">
              <span className="brand-badge-dot" aria-hidden="true" />
              <span className="brand-badge-text">SatQuery AI Engine • Active</span>
            </div>

            <AstronautHead />

            <div className="hero-title-group">
              <h1 className="hero-heading">Autonomous Satellite Visual QA</h1>
              <p className="hero-subtitle">
                Instantly query any Earth observation scene, STAC Sentinel-2 &amp; Landsat-9 imagery, coordinates, or automated change detection through natural AI conversations.
              </p>
            </div>

            <div className="hero-telemetry">
              <div className="telemetry-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M2 12h20" />
                </svg>
                <span>STAC Sentinel-2 &amp; Landsat-9</span>
              </div>
              <div className="telemetry-divider" />
              <div className="telemetry-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                <span>ISRO Earth Observation</span>
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
