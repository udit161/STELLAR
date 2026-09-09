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
  { id: 1, query: 'Track ISRO Cartosat-3 orbit', time: '12m ago', tag: 'ISRO', desc: 'Real-time telemetry and Doppler shift analysis for LEO orbit node.' },
  { id: 2, query: 'Query ISS position & TLE catalog', time: '1h ago', tag: 'NORAD', desc: 'NORAD Two-Line Element sets updated with current ISS altitude.' },
  { id: 3, query: 'Find space debris in Low Earth Orbit', time: '3h ago', tag: 'Debris', desc: 'Collision avoidance risk calculations for active satellite mesh.' },
  { id: 4, query: 'Predict Chandrayaan-3 trajectory decay', time: 'Yesterday', tag: 'Moon', desc: 'Lunar transfer trajectory & apogee distance modeling.' },
  { id: 5, query: 'Analyse Sentinel-2 SAR radar imagery', time: '2 days ago', tag: 'Radar', desc: 'Multispectral false-color infrared terrain scan inspection.' },
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
    item.tag.toLowerCase().includes(historyFilter.toLowerCase()) ||
    item.desc.toLowerCase().includes(historyFilter.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        if (active !== 'history') {
          setActive(null);
          if (onNavChange) onNavChange(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [active, onNavChange]);

  return (
    <>
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
                        <span>Real-time Doppler Sync</span>
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

      {/* ── Center Transparent Big History Card Modal ── */}
      {active === 'history' && (
        <div className="history-modal-backdrop" onClick={() => setActive(null)}>
          <div className="history-center-card" onClick={(e) => e.stopPropagation()}>
            <div className="history-card-header">
              <div className="history-title-amber">
                <div className="history-amber-icon-badge">
                  <Clock size={20} />
                </div>
                <div>
                  <h2 className="history-main-heading">Recent Query History</h2>
                  <p className="history-sub-heading">Select any past query to re-launch satellite intelligence</p>
                </div>
              </div>

              <div className="history-header-actions">
                {historyList.length > 0 && (
                  <button className="history-clear-btn" onClick={clearHistory} title="Clear All History">
                    <Trash2 size={15} /> Clear History
                  </button>
                )}
                <button className="history-close-btn" onClick={() => setActive(null)} title="Close">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Amber Filter Input Bar */}
            <div className="history-search-bar-amber">
              <Search size={16} style={{ color: '#fbbf24' }} />
              <input 
                type="text" 
                className="history-filter-input"
                placeholder="Search history by query keyword, NORAD ID, or mission tag..."
                value={historyFilter}
                onChange={(e) => setHistoryFilter(e.target.value)}
                autoFocus
              />
              {historyFilter && (
                <button className="history-filter-clear" onClick={() => setHistoryFilter('')}>
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Big History Grid / List */}
            <div className="history-big-list">
              {filteredHistory.length > 0 ? (
                filteredHistory.map((item) => (
                  <div 
                    key={item.id} 
                    className="history-big-item-card"
                    onClick={() => handleHistoryClick(item.query)}
                  >
                    <div className="history-item-top">
                      <span className="history-query-title">"{item.query}"</span>
                      <span className="history-amber-tag">#{item.tag}</span>
                    </div>
                    <p className="history-query-desc">{item.desc}</p>
                    <div className="history-item-bottom">
                      <span className="history-time-badge">
                        <Clock size={12} /> {item.time}
                      </span>
                      <span className="history-launch-prompt">
                        Launch Query <ChevronRight size={14} />
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="history-empty-box">
                  <Clock size={36} style={{ color: 'rgba(251, 191, 36, 0.4)', marginBottom: '10px' }} />
                  <p style={{ margin: 0, fontWeight: 600 }}>No history entries found</p>
                  <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>Try clearing your search filter or launch a new query!</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default GlassSidebar;
