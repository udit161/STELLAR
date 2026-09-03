import React, { useState } from 'react';
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
} from 'lucide-react';
import './index.css';

function App() {
  const [query, setQuery] = useState('');
  const [activeNav, setActiveNav] = useState('home');

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
    <div className="app-container">

      <div className="space-backdrop">
        <div className="space-star star-1"></div>
        <div className="space-star star-2"></div>
        <div className="space-star star-3"></div>
        <div className="space-star star-4"></div>
        <div className="space-star star-5"></div>
      </div>

      {/* Left Very Dark Deep Blue Floating Pill Sidebar */}
      <aside className="floating-sidebar-wrapper">
        <div className="dark-blue-pill-sidebar">
          {/* Subtle top shine / gloss highlight */}
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

      {/* Main Content Area: Centered in Middle */}
      <main className="main-content">
        <div className="center-stage">
          {/* Middle Center Logo Block */}
          <div className="logo-center-container">
            <div className="logo-halo-aura" />
            <div className="logo-image-frame">
              {/* Static text layer */}
              <img
                src="/satquery-text.png"
                alt="SATQUERY AI - Earth observation, spoken fluently."
                className="bold-hero-logo"
              />
            </div>
          </div>

          {/* Center Query Box */}
          <div className="query-box-wrapper">
            <div className="query-box">
              <div className="query-prefix-icon">
                <Sparkles size={18} className="sparkle-icon" />
              </div>
              <input
                type="text"
                className="query-input"
                placeholder="Ask about any satellite scene, coordinates, or change detection..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
              />
              <button
                className={`query-send-btn ${query.trim() ? 'active' : ''}`}
                onClick={handleSend}
                title="Submit Query"
              >
                <ArrowUp size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Subtle Bottom Telemetry Indicator */}
        <div className="bottom-telemetry-badge">
          <div className="telemetry-live-dot"></div>
          <span>STAC Sentinel-2 & Landsat-9 Constellations Online</span>
        </div>
      </main>
    </div>
  );
}

export default App;
