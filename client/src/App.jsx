import React, { useState } from 'react';
import { TopologyBackground } from './components/TopologyBackground';
import TwinklingStars from './components/TwinklingStars';
import ScatterAndReassembleText from './components/ScatterAndReassembleText';
import GlassSidebar from './components/GlassSidebar';
import LiquidMetalQueryBar from './components/LiquidMetalQueryBar';
import LiquidMetalChatUI from './components/LiquidMetalChatUI';
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
  const [querySubmitted, setQuerySubmitted] = useState(false);
  const [activeQuery, setActiveQuery] = useState('');
  const [activeAttachments, setActiveAttachments] = useState([]);

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

  const handleLaunchQuery = (queryText, attachments = []) => {
    console.log('Satellite AI Query launched:', queryText, attachments);
    setActiveQuery(queryText || 'Track ISRO satellite orbits');
    setActiveAttachments(attachments || []);
    setQuerySubmitted(true);
  };

  const handleResetQuery = () => {
    setQuerySubmitted(false);
    setActiveQuery('');
    setActiveAttachments([]);
  };

  return (
    <>
      <TopologyBackground />
      <TwinklingStars />
      <div className="app-container">

        {/* Glassmorphic Liquid Metal Sidebar with History Flyout */}
        <GlassSidebar 
          activeNav={activeNav} 
          onNavChange={setActiveNav} 
          onSelectQuery={handleLaunchQuery}
          currentUser={currentUser}
          onLogout={handleLogout}
        />

        {/* Main Content Area */}
        <main className="main-content">
          {!querySubmitted ? (
            <div className="center-stage">
              <ScatterAndReassembleText />
            </div>
          ) : (
            <LiquidMetalChatUI 
              queryText={activeQuery}
              attachments={activeAttachments}
              onResetQuery={handleResetQuery} 
            />
          )}
        </main>

      </div>

      {/* Metal Liquid Glass Query Action Bar (shown when not in active chat view) */}
      {!querySubmitted && (
        <LiquidMetalQueryBar onLaunchQuery={handleLaunchQuery} />
      )}

      {/* Badges shown only on initial home stage */}
      {!querySubmitted && (
        <>
          <ISROBadge />
          <IndiaFlagBadge />
        </>
      )}

    </>
  );
}

export default App;
