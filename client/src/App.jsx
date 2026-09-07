import React, { useState, useEffect } from 'react';
import {
  Home,
  Bell,
  FileText,
  Search,
  Users,
  User,
  ArrowUp,
  Sparkles,
  Layers,
  Activity,
  Globe,
  CornerDownLeft,
  LogOut,
} from 'lucide-react';
import { TopologyBackground } from './components/TopologyBackground';
import TwinklingStars from './components/TwinklingStars';
import ScatterAndReassembleText from './components/ScatterAndReassembleText';
import ISROBadge from './components/ISROBadge';
import IndiaFlagBadge from './components/IndiaFlagBadge';
import AuthPage from './pages/AuthPage';
import { isAuthenticated, getUser, logout } from './services/authService';
import './index.css';

function App() {
  const [authed, setAuthed] = useState(isAuthenticated());
  const [currentUser, setCurrentUser] = useState(getUser());
  const [query, setQuery] = useState('');
  const [activeNav, setActiveNav] = useState('home');

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    setAuthed(true);
  };

  const handleLogout = () => {
    logout();
    setAuthed(false);
    setCurrentUser(null);
  };

  // If not authenticated, show login/signup page
  if (!authed) {
    return <AuthPage onAuthSuccess={handleAuthSuccess} />;
  }

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'documents', icon: FileText, label: 'Documents' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'community', icon: Users, label: 'Community' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

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

        {/* Left Very Dark Deep Blue Floating Pill Sidebar */}
        <aside className="floating-sidebar-wrapper">
          <div className="dark-blue-pill-sidebar">
            <div className="pill-gloss-highlight" />
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  className={`pill-nav-btn ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveNav(item.id)}
                  title={item.label}
                  aria-label={item.label}
                >
                  <Icon size={24} className="pill-icon" />
                </button>
              );
            })}
          </div>
        </aside>

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

