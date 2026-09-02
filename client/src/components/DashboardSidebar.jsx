import React, { useState } from 'react';
import {
  Satellite,
  Layers,
  Sparkles,
  BarChart3,
  MapPin,
  Flame,
  Clock,
  Radio,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Compass,
  Database,
  Cpu,
  RefreshCw,
} from 'lucide-react';
import './DashboardSidebar.css';

function DashboardSidebar({ activeTab, onSelectTab, onSelectPresetAoi }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedAoi, setSelectedAoi] = useState('Bengaluru Urban');

  const navItems = [
    { id: 'vqa', label: 'Satellite Visual QA', icon: Sparkles, badge: 'Agentic' },
    { id: 'change_det', label: 'Change Detection', icon: RefreshCw, badge: 'Bi-temporal' },
    { id: 'map_studio', label: 'Geo Layer Studio', icon: Layers },
    { id: 'indices', label: 'Spectral Indices (NDVI)', icon: BarChart3 },
    { id: 'disasters', label: 'Disaster & Fire Radar', icon: Flame, alert: true },
    { id: 'archive', label: 'Mission History', icon: Clock },
  ];

  const presets = [
    { name: 'Bengaluru Urban', coords: '12.9716° N, 77.5946° E', state: 'Karnataka' },
    { name: 'Punjab Wheat Belt', coords: '30.9010° N, 75.8573° E', state: 'Ludhiana' },
    { name: 'Brahmaputra Basin', coords: '26.2006° N, 92.9376° E', state: 'Assam' },
    { name: 'Western Ghats Forest', coords: '13.4140° N, 75.2500° E', state: 'Eco-zone' },
  ];

  const handleAoiClick = (preset) => {
    setSelectedAoi(preset.name);
    if (onSelectPresetAoi) {
      onSelectPresetAoi(preset);
    }
  };

  return (
    <aside className={`dashboard-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Brand Header */}
      <div className="sidebar-brand-container">
        <div className="brand-logo-orbit">
          <Satellite className="brand-satellite-icon" size={24} />
          <div className="orbit-ring"></div>
        </div>
        {!isCollapsed && (
          <div className="brand-info">
            <div className="brand-name-row">
              <span className="brand-title">SatQuery</span>
              <span className="brand-badge-ai">AI</span>
            </div>
            <span className="brand-subtitle">Autonomous Earth AI</span>
          </div>
        )}
        <button
          className="sidebar-toggle-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          aria-label="Toggle Sidebar"
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Constellation Live Status Indicator */}
      {!isCollapsed && (
        <div className="constellation-live-card">
          <div className="live-status-header">
            <div className="live-dot-pulse"></div>
            <span className="live-status-text">CONSTELLATION TELEMETRY</span>
          </div>
          <div className="constellation-chips">
            <span className="sensor-chip active">Sentinel-2A (10m)</span>
            <span className="sensor-chip">Landsat-9 (OLI-2)</span>
            <span className="sensor-chip">SAR C-Band</span>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <div className="sidebar-nav-section">
        <div className="nav-section-title">
          {!isCollapsed && <span>OBSERVATION MODES</span>}
        </div>
        <nav className="nav-items-list">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                className={`nav-item-btn ${isActive ? 'active' : ''}`}
                onClick={() => onSelectTab(item.id)}
                title={item.label}
              >
                <div className="nav-icon-wrapper">
                  <Icon size={18} />
                </div>
                {!isCollapsed && (
                  <span className="nav-item-label">{item.label}</span>
                )}
                {!isCollapsed && item.badge && (
                  <span className="nav-item-badge">{item.badge}</span>
                )}
                {!isCollapsed && item.alert && (
                  <span className="nav-alert-indicator">Live</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* AOI Quick Presets */}
      {!isCollapsed && (
        <div className="sidebar-aoi-section">
          <div className="nav-section-title">
            <span>SAVED AOI PRESETS</span>
            <Compass size={13} className="text-muted" />
          </div>
          <div className="aoi-presets-list">
            {presets.map((preset) => (
              <button
                key={preset.name}
                className={`aoi-preset-item ${selectedAoi === preset.name ? 'selected' : ''}`}
                onClick={() => handleAoiClick(preset)}
              >
                <div className="aoi-pin-icon">
                  <MapPin size={14} />
                </div>
                <div className="aoi-meta">
                  <span className="aoi-name">{preset.name}</span>
                  <span className="aoi-coords">{preset.coords}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* System Telemetry & Agent Status Footer */}
      <div className="sidebar-footer">
        {!isCollapsed ? (
          <div className="agent-status-panel">
            <div className="agent-header">
              <div className="agent-chip">
                <Cpu size={13} />
                <span>Geospatial Agent v2.4</span>
              </div>
              <span className="agent-ready-tag">ONLINE</span>
            </div>
            <div className="agent-specs">
              <div className="spec-item">
                <span className="spec-label">Ground Res:</span>
                <span className="spec-value">10m Optical</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Cloud Threshold:</span>
                <span className="spec-value">&lt; 15%</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="collapsed-footer-indicator" title="Agent Online">
            <div className="live-dot-pulse"></div>
          </div>
        )}
      </div>
    </aside>
  );
}

export default DashboardSidebar;
