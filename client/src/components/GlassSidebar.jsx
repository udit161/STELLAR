import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Clock,
  FileText,
  Settings,
  User,
  Trash2,
  X,
  ChevronRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import './GlassSidebar.css';

const NAV_ITEMS = [
  { id: 'search',    icon: Search,   label: 'Search' },
  { id: 'history',   icon: Clock,    label: 'History' },
  { id: 'documents', icon: FileText,  label: 'Documents' },
  { id: 'settings',  icon: Settings,  label: 'Settings' },
  { id: 'profile',   icon: User,      label: 'Profile' },
];

const INITIAL_HISTORY = [
  { id: 1, query: 'Track ISRO Cartosat-3 orbit', time: '12m ago', tag: 'ISRO' },
  { id: 2, query: 'Query ISS position & TLE catalog', time: '1h ago', tag: 'NORAD' },
  { id: 3, query: 'Find space debris in Low Earth Orbit', time: '3h ago', tag: 'Debris' },
  { id: 4, query: 'Predict Chandrayaan-3 trajectory decay', time: 'Yesterday', tag: 'Moon' },
  { id: 5, query: 'Analyse Sentinel-2 SAR radar imagery', time: '2 days ago', tag: 'Radar' },
];

function GlassSidebar({ activeNav, onNavChange, onSelectQuery }) {
  const [active, setActive] = useState(activeNav || null);
  const [historyList, setHistoryList] = useState(INITIAL_HISTORY);
  const [historyFilter, setHistoryFilter] = useState('');
  const sidebarRef = useRef(null);

  const handleSelect = (id, e) => {
    if (e) e.stopPropagation();
    const nextActive = active === id ? null : id;
    setActive(nextActive);
    if (onNavChange) onNavChange(nextActive);
  };

  const handleHistoryClick = (queryText) => {
    if (onSelectQuery) onSelectQuery(queryText);
    setActive(null);
  };

  const clearHistory = () => {
    setHistoryList([]);
  };

  const filteredHistory = historyList.filter(item => 
    item.query.toLowerCase().includes(historyFilter.toLowerCase()) ||
    item.tag.toLowerCase().includes(historyFilter.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setActive(null);
        if (onNavChange) onNavChange(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onNavChange]);

  return (
    <div className="glass-sidebar-wrapper" ref={sidebarRef}>
      <div className="glass-sidebar">
        {/* Floating Nav Pills */}
        <nav className="glass-sidebar-nav">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;

            return (
              <div key={item.id} className="nav-item-rel-wrap">
                <button
                  className={`glass-nav-pill ${isActive ? 'active' : ''}`}
                  data-item={item.id}
                  onClick={(e) => handleSelect(item.id, e)}
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

                {/* ── Recent History Flyout Panel ── */}
                {isActive && item.id === 'history' && (
                  <div className="sidebar-flyout-panel history-flyout" onClick={(e) => e.stopPropagation()}>
                    <div className="flyout-header">
                      <span className="flyout-title">
                        <Clock size={15} /> Recent Query History
                      </span>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        {historyList.length > 0 && (
                          <button className="flyout-icon-btn" onClick={clearHistory} title="Clear History">
                            <Trash2 size={14} />
                          </button>
                        )}
                        <button className="flyout-icon-btn" onClick={() => setActive(null)} title="Close">
                          <X size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Filter Input */}
                    <div className="flyout-search-wrap">
                      <Search size={13} style={{ color: 'rgba(255,255,255,0.4)' }} />
                      <input 
                        type="text" 
                        className="flyout-search-input" 
                        placeholder="Search history..."
                        value={historyFilter}
                        onChange={(e) => setHistoryFilter(e.target.value)}
                      />
                    </div>

                    {/* History List Items */}
                    <div className="history-list-box">
                      {filteredHistory.length > 0 ? (
                        filteredHistory.map((item) => (
                          <div 
                            key={item.id} 
                            className="history-item-row"
                            onClick={() => handleHistoryClick(item.query)}
                          >
                            <div className="history-item-left">
                              <span className="history-item-query">{item.query}</span>
                              <span className="history-item-meta">{item.time} • <span className="history-tag">#{item.tag}</span></span>
                            </div>
                            <ChevronRight size={14} className="history-arrow" />
                          </div>
                        ))
                      ) : (
                        <div className="empty-history-text">
                          No recent search history found.
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* ── Documents Flyout ── */}
                {isActive && item.id === 'documents' && (
                  <div className="sidebar-flyout-panel docs-flyout" onClick={(e) => e.stopPropagation()}>
                    <div className="flyout-header">
                      <span className="flyout-title">
                        <FileText size={15} /> Orbit Documents
                      </span>
                      <button className="flyout-icon-btn" onClick={() => setActive(null)}>
                        <X size={14} />
                      </button>
                    </div>
                    <div className="history-list-box">
                      <div className="history-item-row">
                        <div className="history-item-left">
                          <span className="history-item-query">NORAD Satellite Catalog 2026</span>
                          <span className="history-item-meta">PDF • 14.2 MB</span>
                        </div>
                        <ExternalLink size={13} style={{ color: '#00F2FE' }} />
                      </div>
                      <div className="history-item-row">
                        <div className="history-item-left">
                          <span className="history-item-query">ISRO Earth Observation Guide</span>
                          <span className="history-item-meta">DOCX • 8.6 MB</span>
                        </div>
                        <ExternalLink size={13} style={{ color: '#00F2FE' }} />
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Settings Flyout ── */}
                {isActive && item.id === 'settings' && (
                  <div className="sidebar-flyout-panel settings-flyout" onClick={(e) => e.stopPropagation()}>
                    <div className="flyout-header">
                      <span className="flyout-title">
                        <Settings size={15} /> System Preferences
                      </span>
                      <button className="flyout-icon-btn" onClick={() => setActive(null)}>
                        <X size={14} />
                      </button>
                    </div>
                    <div className="setting-toggle-row">
                      <span>Real-time Doppler Doppler Sync</span>
                      <input type="checkbox" defaultChecked />
                    </div>
                    <div className="setting-toggle-row">
                      <span>High Precision TLE Calculation</span>
                      <input type="checkbox" defaultChecked />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

export default GlassSidebar;
