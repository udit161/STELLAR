import React, { useState, useRef, useEffect } from 'react';
import { Rocket, Send } from 'lucide-react';
import './LiquidMetalQueryBar.css';

const PROMPTS = [
  'Ask anything…',
  'Track a satellite orbit…',
  'Query ISS position…',
  'Find debris in LEO…',
  'Predict orbital decay…',
  'Analyse telemetry data…',
  'Search by NORAD ID…',
  'Check solar activity…',
];

const TYPE_SPEED   = 55;   // ms per character typed
const DELETE_SPEED = 28;   // ms per character deleted
const PAUSE_AFTER  = 1800; // ms pause at full word before deleting
const PAUSE_BEFORE = 400;  // ms pause after fully deleted

function useTypewriter(prompts) {
  const [displayed, setDisplayed]   = useState('');
  const [promptIdx, setPromptIdx]   = useState(0);
  const [phase, setPhase]           = useState('typing'); // 'typing' | 'pausing' | 'deleting' | 'waiting'
  const charIdxRef = useRef(0);

  useEffect(() => {
    const current = prompts[promptIdx];
    let timer;

    if (phase === 'typing') {
      if (charIdxRef.current < current.length) {
        timer = setTimeout(() => {
          charIdxRef.current += 1;
          setDisplayed(current.slice(0, charIdxRef.current));
        }, TYPE_SPEED);
      } else {
        timer = setTimeout(() => setPhase('pausing'), PAUSE_AFTER);
      }
    } else if (phase === 'pausing') {
      setPhase('deleting');
    } else if (phase === 'deleting') {
      if (charIdxRef.current > 0) {
        timer = setTimeout(() => {
          charIdxRef.current -= 1;
          setDisplayed(current.slice(0, charIdxRef.current));
        }, DELETE_SPEED);
      } else {
        timer = setTimeout(() => {
          setPromptIdx((i) => (i + 1) % prompts.length);
          setPhase('typing');
        }, PAUSE_BEFORE);
      }
    }

    return () => clearTimeout(timer);
  }, [phase, displayed, promptIdx, prompts]);

  return displayed;
}

function LiquidMetalQueryBar({ onLaunchQuery }) {
  const [query, setQuery]             = useState('');
  const [isLaunching, setIsLaunching] = useState(false);
  const [isFocused, setIsFocused]     = useState(false);
  const inputRef   = useRef(null);
  const ghostText  = useTypewriter(PROMPTS);

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

  const focusInput = () => inputRef.current?.focus();

  // Show ghost text only when input is empty
  const showGhost = !query;

  return (
    <div className="liquid-bar-dock">
      <span className="ambient-particle particle-tl" aria-hidden="true" />
      <span className="ambient-particle particle-tr" aria-hidden="true" />
      <span className="ambient-particle particle-bl" aria-hidden="true" />
      <span className="ambient-particle particle-br" aria-hidden="true" />

      <div
        className={`liquid-bar-container ${isFocused ? 'focused' : ''}`}
        onClick={focusInput}
        role="search"
        aria-label="Satellite Intelligence Query Bar"
      >
        <div className="liquid-shimmer-overlay" aria-hidden="true" />

        {/* Pulse dot */}
        <div className="indicator-pulse-dot" aria-hidden="true" />

        {/* Input + ghost-text wrapper */}
        <div className="liquid-input-wrap">
          {/* Typewriter ghost text (shown when input is empty) */}
          {showGhost && (
            <span className="liquid-ghost-text" aria-hidden="true">
              {ghostText}
              <span className="liquid-ghost-cursor" />
            </span>
          )}

          {/* Real input — sits on top of ghost */}
          <input
            ref={inputRef}
            className="liquid-bar-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder=""
            aria-label="Type your satellite query"
            autoComplete="off"
            spellCheck="false"
          />
        </div>

        {/* Rocket / Send button */}
        <button
          className={`rocket-launch-button ${isLaunching ? 'launching' : ''} ${query.trim() ? 'has-query' : ''}`}
          onClick={handleLaunch}
          aria-label="Launch Satellite AI Query"
          title="Launch query"
          disabled={!query.trim()}
        >
          {query.trim()
            ? <Send  className={`rocket-icon-svg ${isLaunching ? 'launching' : ''}`} size={16} />
            : <Rocket className={`rocket-icon-svg ${isLaunching ? 'launching' : ''}`} size={16} />
          }
        </button>

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
