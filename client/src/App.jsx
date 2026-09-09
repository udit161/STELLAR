import React, { useState, useEffect } from 'react';
import {
  ArrowUp,
  Sparkles,
  LogOut,
} from 'lucide-react';
import { TopologyBackground } from './components/TopologyBackground';
import TwinklingStars from './components/TwinklingStars';
import ScatterAndReassembleText from './components/ScatterAndReassembleText';
import GlassSidebar from './components/GlassSidebar';
import ISROBadge from './components/ISROBadge';
import IndiaFlagBadge from './components/IndiaFlagBadge';
import Scene from './pages/Scene';
import { isAuthenticated, getUser, logout } from './services/authService';
import './index.css';

function App() {
  const [authed, setAuthed] = useState(isAuthenticated());
  const [currentUser, setCurrentUser] = useState(getUser());
  const [query, setQuery] = useState('');
  const [activeNav, setActiveNav] = useState('chat');
  const [showIntro, setShowIntro] = useState(true);

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    setAuthed(true);
  };

  const handleLogout = () => {
    logout();
    setAuthed(false);
    setCurrentUser(null);
  };

  // First thing visitors see on the website: ConstellationField WebGL Intro Scene
  if (showIntro) {
    return <Scene onEnter={() => setShowIntro(false)} />;
  }

  const handleSend = (e) => {
    e?.preventDefault();
    if (!query.trim()) return;
    console.log('Query submitted:', query);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      <TopologyBackground />
      <TwinklingStars />
      <div className="app-container">

        {/* Glassmorphic Liquid Metal Sidebar */}
        <GlassSidebar activeNav={activeNav} onNavChange={setActiveNav} />

        {/* Main Content Area */}
        <main className="main-content">
          <div className="center-stage">
            <ScatterAndReassembleText />
          </div>
        </main>

        {/* Logout button */}
        <button
          className="logout-fab"
          onClick={handleLogout}
          title={`Logout${currentUser?.username ? ` (${currentUser.username})` : ''}`}
        >
          <LogOut size={18} />
        </button>

      </div>

      {/* Bottom Center Liquid Glass Query Bar — outside app-container to escape stacking context */}
      <div className="glass-bar-dock">
        <div className="glass-bar-container">
          <div className="glass-bar-inner">
            <div className="glass-wave2" />
            <div className="glass-sparkle-icon">
              <Sparkles size={18} />
            </div>
            <input
              type="text"
              className="glass-bar-input"
              placeholder="Ask about any satellite scene, coordinates, or change detection..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            <button
              className={`glass-bar-send ${query.trim() ? 'active' : ''}`}
              onClick={handleSend}
              title="Submit Query"
            >
              <ArrowUp size={16} />
            </button>
          </div>
          <div className="glass-telemetry">
            <div className="telemetry-live-dot"></div>
            <span>STAC Sentinel-2 &amp; Landsat-9 Constellations Online</span>
          </div>
        </div>
      </div>
      <ISROBadge />
      <IndiaFlagBadge />
    </>
  );
}

export default App;

