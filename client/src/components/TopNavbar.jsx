import React, { useState } from 'react';
import {
  Bell,
  Settings,
  Shield,
  Layers,
  Search,
  Radio,
  ExternalLink,
  ChevronDown,
  User,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import './TopNavbar.css';

function TopNavbar({ activeTab, onOpenSettings }) {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'Sentinel-2B Pass Completed',
      time: '12 min ago',
      desc: 'New tile T43PGQ acquired over Bengaluru Urban. Cloud coverage: 4.2%.',
      unread: true,
    },
    {
      id: 2,
      title: 'Thermal Anomaly Alert',
      time: '45 min ago',
      desc: 'MODIS/VIIRS detected high-confidence hotspot in Bandipur reserve.',
      unread: true,
    },
  ];

  const getTabTitle = () => {
    switch (activeTab) {
      case 'change_det':
        return 'Bi-Temporal Change Detection Studio';
      case 'map_studio':
        return 'Multi-Spectral Layer & Map Studio';
      case 'indices':
        return 'Spectral Indices & NDVI Analysis Engine';
      case 'disasters':
        return 'Real-Time Disaster & Wildfire Early Warning';
      case 'archive':
        return 'Mission Archive & STAC Catalog Logs';
      default:
        return 'Satellite Visual QA & Intelligence Center';
    }
  };

  return (
    <header className="top-navbar-container">
      {/* Left: Active View Breadcrumb */}
      <div className="navbar-breadcrumbs">
        <div className="status-live-badge">
          <span className="pulsing-radar-dot"></span>
          <span>LIVE OBSERVATION</span>
        </div>
        <span className="breadcrumb-divider">/</span>
        <h2 className="current-view-title">{getTabTitle()}</h2>
      </div>

      {/* Right: Telemetry status & Actions */}
      <div className="navbar-actions-right">
        {/* Sensor Node Pill */}
        <div className="stac-endpoint-pill">
          <Radio size={13} className="text-emerald" />
          <span className="endpoint-label">STAC Node:</span>
          <span className="endpoint-status">Copernicus Hub (Ready)</span>
        </div>

        {/* Notifications Dropdown */}
        <div className="nav-action-relative">
          <button
            className={`nav-icon-action-btn ${showNotifications ? 'active' : ''}`}
            onClick={() => setShowNotifications(!showNotifications)}
            title="Satellite Alerts & Ingest Notifications"
            type="button"
          >
            <Bell size={17} />
            <span className="notification-bubble">2</span>
          </button>

          {showNotifications && (
            <div className="notifications-dropdown-menu">
              <div className="dropdown-header">
                <span className="dropdown-title">SATELLITE ALERTS & INGESTION</span>
                <span className="unread-count">2 New</span>
              </div>
              <div className="notifications-list">
                {notifications.map((n) => (
                  <div key={n.id} className="notification-item">
                    <div className="notif-header-row">
                      <span className="notif-item-title">{n.title}</span>
                      <span className="notif-time">{n.time}</span>
                    </div>
                    <p className="notif-desc">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile / Organization badge */}
        <div className="user-profile-badge">
          <div className="user-avatar-orbit">
            <User size={14} />
          </div>
          <div className="user-info-text">
            <span className="user-name">Geospatial Analyst</span>
            <span className="user-org">ISRO / Space Apps</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default TopNavbar;
