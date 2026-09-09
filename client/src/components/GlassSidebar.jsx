import React, { useState } from 'react';
import {
  Search,
  Clock,
  FileText,
  Settings,
  User,
} from 'lucide-react';
import './GlassSidebar.css';

const NAV_ITEMS = [
  { id: 'search',    icon: Search,   label: 'Search' },
  { id: 'history',   icon: Clock,    label: 'History' },
  { id: 'documents', icon: FileText,  label: 'Documents' },
  { id: 'settings',  icon: Settings,  label: 'Settings' },
  { id: 'profile',   icon: User,      label: 'Profile' },
];

function GlassSidebar({ activeNav, onNavChange }) {
  const [active, setActive] = useState(activeNav || 'search');

  const handleSelect = (id) => {
    setActive(id);
    if (onNavChange) onNavChange(id);
  };

  return (
    <div className="glass-sidebar-wrapper">
      <div className="glass-sidebar">
        {/* Floating Nav Pills */}
        <nav className="glass-sidebar-nav">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;

            return (
              <button
                key={item.id}
                className={`glass-nav-pill ${isActive ? 'active' : ''}`}
                data-item={item.id}
                onClick={() => handleSelect(item.id)}
                title={item.label}
                aria-label={item.label}
              >
                <span className="glass-nav-pill-icon">
                  <Icon size={18} />
                </span>
                <span className="glass-nav-pill-label">
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Floating Indicator Dots */}
        <div className="glass-sidebar-dots">
          {NAV_ITEMS.map((item) => (
            <span
              key={item.id}
              className={`glass-dot ${active === item.id ? 'active' : ''}`}
              data-color={item.id}
              onClick={() => handleSelect(item.id)}
              title={item.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default GlassSidebar;
