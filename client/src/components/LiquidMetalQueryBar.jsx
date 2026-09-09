import React, { useState, useEffect } from 'react';
import { Rocket } from 'lucide-react';
import './LiquidMetalQueryBar.css';

function LiquidMetalQueryBar({ onLaunchQuery }) {
  const [isLaunching, setIsLaunching] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleLaunch = (e) => {
    e?.stopPropagation();
    if (isLaunching) return;

    setIsLaunching(true);

    if (onLaunchQuery) {
      onLaunchQuery();
    }

    // Reset launch state after animation finishes (1s)
    setTimeout(() => {
      setIsLaunching(false);
    }, 1000);
  };

  return (
    <div className="liquid-bar-dock">
      {/* Decorative Ambient Floating Particles */}
      <span className="ambient-particle particle-tl" aria-hidden="true" />
      <span className="ambient-particle particle-tr" aria-hidden="true" />
      <span className="ambient-particle particle-bl" aria-hidden="true" />
      <span className="ambient-particle particle-br" aria-hidden="true" />

      {/* Main Glass Action Bar Container */}
      <div
        className="liquid-bar-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleLaunch}
        role="region"
        aria-label="Satellite Intelligence Liquid Action Launcher"
      >
        {/* Liquid Metal Continuous Shimmer */}
        <div className="liquid-shimmer-overlay" aria-hidden="true" />

        {/* Ambient Telemetry Status Indicator (Left) */}
        <div className="liquid-left-indicator">
          <div className="indicator-pulse-dot" aria-hidden="true" />
          <span className="indicator-label">SATQUERY AI</span>
        </div>

        {/* Rocket Action Button (Right) */}
        <button
          className={`rocket-launch-button ${isLaunching ? 'launching' : ''}`}
          onClick={handleLaunch}
          aria-label="Launch Satellite AI Query"
          title="Launch Autonomous Satellite AI Agent"
        >
          <Rocket
            className={`rocket-icon-svg ${isLaunching ? 'launching' : ''}`}
            size={28}
          />
        </button>

        {/* Launch Particle Trail Effect */}
        {isLaunching && (
          <div className="launch-trail-container" aria-hidden="true">
            <span className="trail-particle active-0" />
            <span className="trail-particle active-1" />
            <span className="trail-particle active-2" />
            <span className="trail-particle active-3" />
          </div>
        )}
      </div>
    </div>
  );
}

export default LiquidMetalQueryBar;
