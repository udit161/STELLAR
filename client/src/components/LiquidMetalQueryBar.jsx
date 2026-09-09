import React, { useState, useRef } from 'react';
import { Rocket, Send } from 'lucide-react';
import './LiquidMetalQueryBar.css';

function LiquidMetalQueryBar({ onLaunchQuery }) {
  const [query, setQuery]         = useState('');
  const [isLaunching, setIsLaunching] = useState(false);
  const inputRef = useRef(null);

  const handleLaunch = (e) => {
    e?.stopPropagation();
    if (isLaunching || !query.trim()) return;

    setIsLaunching(true);
    if (onLaunchQuery) onLaunchQuery(query.trim());

    setTimeout(() => {
      setIsLaunching(false);
      setQuery('');
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleLaunch(e);
  };

  // Clicking anywhere on the bar focuses the input
  const focusInput = () => inputRef.current?.focus();

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
        onClick={focusInput}
        role="search"
        aria-label="Satellite Intelligence Query Bar"
      >
        {/* Liquid Metal Continuous Shimmer */}
        <div className="liquid-shimmer-overlay" aria-hidden="true" />

        {/* Pulse dot */}
        <div className="indicator-pulse-dot" aria-hidden="true" />

        {/* Text Input */}
        <input
          ref={inputRef}
          className="liquid-bar-input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask SatQuery AI…"
          aria-label="Type your satellite query"
          autoComplete="off"
          spellCheck="false"
        />

        {/* Rocket / Send Action Button */}
        <button
          className={`rocket-launch-button ${isLaunching ? 'launching' : ''} ${query.trim() ? 'has-query' : ''}`}
          onClick={handleLaunch}
          aria-label="Launch Satellite AI Query"
          title="Launch query"
          disabled={!query.trim()}
        >
          {query.trim()
            ? <Send className={`rocket-icon-svg ${isLaunching ? 'launching' : ''}`} size={16} />
            : <Rocket className={`rocket-icon-svg ${isLaunching ? 'launching' : ''}`} size={16} />
          }
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
