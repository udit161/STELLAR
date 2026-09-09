import React, { useState, useEffect } from 'react';
import {
  LogOut,
} from 'lucide-react';
import { TopologyBackground } from './components/TopologyBackground';
import TwinklingStars from './components/TwinklingStars';
import ScatterAndReassembleText from './components/ScatterAndReassembleText';
import GlassSidebar from './components/GlassSidebar';
import LiquidMetalQueryBar from './components/LiquidMetalQueryBar';
import ISROBadge from './components/ISROBadge';
import IndiaFlagBadge from './components/IndiaFlagBadge';

import Scene from './pages/Scene';
import { isAuthenticated, getUser, logout } from './services/authService';
import './index.css';

function App() {
  const [authed, setAuthed] = useState(isAuthenticated());
  const [currentUser, setCurrentUser] = useState(getUser());
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

  const handleLaunchQuery = () => {
    console.log('Satellite AI Query launched from Liquid Metal Bar');
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

      {/* Metal Liquid Glass Query Action Bar */}
      <LiquidMetalQueryBar onLaunchQuery={handleLaunchQuery} />
      <ISROBadge />
      <IndiaFlagBadge />

    </>
  );
}

export default App;

