import React, { useState } from 'react';
import { 
  Rocket, 
  Share2, 
  Download, 
  RefreshCw, 
  Paperclip, 
  Mic, 
  Info, 
  ArrowLeft, 
  Activity, 
  Database, 
  Cpu, 
  Layers,
  CheckCircle2,
  X
} from 'lucide-react';
import LiquidGlassCard from './LiquidGlassCard';
import SatQueryLogo from './SatQueryLogo';
import './LiquidMetalChatUI.css';

export function LiquidMetalChatUI({ queryText, onResetQuery }) {
  const [activeTab, setActiveTab] = useState('report'); // 'report' | 'radar' | 'tle'
  const [summaryMode, setSummaryMode] = useState('summary'); // 'summary' | 'raw'
  const [followupText, setFollowupText] = useState('');
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: `Based on real-time orbital calculations and catalog telemetry for "${queryText}": The object is currently operating in Low Earth Orbit (LEO) at an inclination of ~51.64°. All onboard sub-systems report normal telemetry values.`
    }
  ]);

  const handleSendFollowup = (e) => {
    e?.preventDefault();
    if (!followupText.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: followupText.trim()
    };

    const aiMsg = {
      id: Date.now() + 1,
      sender: 'ai',
      text: `Processing follow-up query on "${followupText.trim()}". Telemetry node updated with live Doppler frequency adjustments and orbital decay parameters.`
    };

    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setFollowupText('');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('Analysis link copied to clipboard!');
    }
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ query: queryText, messages }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `satquery_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="liquid-chat-container">
      {/* ── Top Header Row (Logo, Compact Query Bar, Outside About button) ── */}
      <div className="liquid-chat-header-row">
        <SatQueryLogo onClick={onResetQuery} />

        <LiquidGlassCard pill className="top-query-bar">
          <span className="query-label">Active Query</span>
          <span className="current-query-text" title={queryText}>"{queryText}"</span>
        </LiquidGlassCard>

        <button className="action-pill-btn about-header-btn" onClick={() => setShowAboutModal(true)}>
          <Info size={14} /> About
        </button>
      </div>

      {/* ── Main Layout Grid ── */}
      <div className="chat-layout-grid">
        {/* ── Left Main Panel ── */}
        <LiquidGlassCard className="main-result-card">
          {/* Header & Tabs */}
          <div className="result-panel-header">
            <div className="tab-switcher">
              <button 
                className={`tab-btn ${activeTab === 'report' ? 'active' : ''}`}
                onClick={() => setActiveTab('report')}
              >
                AI Analysis
              </button>
              <button 
                className={`tab-btn ${activeTab === 'radar' ? 'active' : ''}`}
                onClick={() => setActiveTab('radar')}
              >
                Orbital Radar
              </button>
              <button 
                className={`tab-btn ${activeTab === 'tle' ? 'active' : ''}`}
                onClick={() => setActiveTab('tle')}
              >
                NORAD TLE
              </button>
            </div>

            <div className="header-action-group">
              <button className="action-pill-btn" onClick={handleShare}>
                <Share2 size={13} /> Share
              </button>
              <button className="action-pill-btn" onClick={handleExport}>
                <Download size={13} /> Export
              </button>
              <button className="action-pill-btn" onClick={() => setMessages(m => [...m])}>
                <RefreshCw size={13} /> Regenerate
              </button>
            </div>
          </div>

          {/* Body Content according to active tab */}
          <div className="output-body">
            {activeTab === 'report' && (
              <>
                {messages.map((msg) => (
                  <div key={msg.id} className="chat-message">
                    <div className={`chat-avatar ${msg.sender === 'user' ? 'user-avatar' : ''}`}>
                      {msg.sender === 'user' ? 'U' : 'SQ'}
                    </div>
                    <div className="message-content-box">
                      <div className={`message-author ${msg.sender === 'user' ? 'user-author' : ''}`}>
                        {msg.sender === 'user' ? 'You' : 'SatQuery AI'}
                      </div>
                      <p style={{ margin: '0 0 10px 0' }}>{msg.text}</p>
                      
                      {/* Generated Dummy Satellite Image Card */}
                      {msg.sender === 'ai' && (
                        <div className="dummy-img-card" style={{ marginTop: '12px', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(0, 242, 254, 0.25)', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
                          <img 
                            src="/sat_orbit.jpg" 
                            alt="Satellite Orbit Telemetry Rendering" 
                            style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }}
                          />
                          <div style={{ padding: '8px 12px', background: 'rgba(3, 7, 18, 0.75)', fontSize: '0.75rem', color: '#00F2FE', display: 'flex', justifyContent: 'space-between' }}>
                            <span>🛰️ LEO Satellite Telemetry Stream • Live Node</span>
                            <span>Scale 1:100,000</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Additional Earth Observation Multispectral Imagery Card */}
                <div className="dummy-img-card" style={{ marginTop: '8px', borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(0, 242, 254, 0.2)', background: 'rgba(0,0,0,0.3)' }}>
                  <div style={{ padding: '10px 14px', background: 'rgba(15, 23, 42, 0.6)', fontSize: '0.8rem', fontWeight: 600, color: '#e0e8f5', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00F2FE', boxShadow: '0 0 8px #00F2FE' }}></span>
                    Sentinel-2 Multispectral Infrared Terrain Capture
                  </div>
                  <img 
                    src="/earth_scan.jpg" 
                    alt="Multispectral Satellite Earth Observation Scan" 
                    style={{ width: '100%', height: '240px', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              </>
            )}

            {activeTab === 'radar' && (
              <div className="dummy-img-card" style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(0, 242, 254, 0.3)' }}>
                <img 
                  src="/earth_scan.jpg" 
                  alt="Live Orbital Radar & Earth Imagery Scan" 
                  style={{ width: '100%', height: '290px', objectFit: 'cover', display: 'block' }}
                />
              </div>
            )}

            {activeTab === 'tle' && (
              <div className="code-snippet-box">
{`ISS (ZARYA)
1 25544U 98067A   24065.54127315  .00014312  00000-0  25412-3 0  9993
2 25544  51.6415 142.1245 0004123 214.1254 210.4512 15.49812541421045`}
              </div>
            )}
          </div>
        </LiquidGlassCard>

        {/* ── Right Summary Column ── */}
        <div className="right-summary-column">
          <LiquidGlassCard className="summary-panel-card">
            <div className="summary-title-row">
              <span className="summary-title">Query Summary</span>
              <div className="tab-switcher" style={{ scale: '0.9' }}>
                <button 
                  className={`tab-btn ${summaryMode === 'summary' ? 'active' : ''}`}
                  onClick={() => setSummaryMode('summary')}
                >
                  Visual
                </button>
                <button 
                  className={`tab-btn ${summaryMode === 'raw' ? 'active' : ''}`}
                  onClick={() => setSummaryMode('raw')}
                >
                  Raw Data
                </button>
              </div>
            </div>

            {summaryMode === 'summary' ? (
              <>
                <div className="metrics-stack">
                  <div className="metric-row">
                    <div className="metric-header">
                      <span>Confidence Score</span>
                      <span className="metric-val">98.6%</span>
                    </div>
                    <div className="metric-bar-bg">
                      <div className="metric-bar-fill" style={{ width: '98.6%' }}></div>
                    </div>
                  </div>

                  <div className="metric-row">
                    <div className="metric-header">
                      <span>Active Telemetry Sources</span>
                      <span className="metric-val">14 Nodes</span>
                    </div>
                    <div className="metric-bar-bg">
                      <div className="metric-bar-fill" style={{ width: '82%' }}></div>
                    </div>
                  </div>

                  <div className="metric-row">
                    <div className="metric-header">
                      <span>Query Latency</span>
                      <span className="metric-val">118 ms</span>
                    </div>
                    <div className="metric-bar-bg">
                      <div className="metric-bar-fill" style={{ width: '94%' }}></div>
                    </div>
                  </div>

                  <div className="metric-row">
                    <div className="metric-header">
                      <span>Data Freshness</span>
                      <span className="metric-val" style={{ color: '#4FACFE' }}>Live (Real-Time)</span>
                    </div>
                  </div>
                </div>

                <div className="topics-section">
                  <span className="section-label">Related Topics & Tags</span>
                  <div className="tags-wrap">
                    <span className="topic-chip">#LEO-Orbit</span>
                    <span className="topic-chip">#ISRO-Nodes</span>
                    <span className="topic-chip">#DopplerShift</span>
                    <span className="topic-chip">#DebrisAvoidance</span>
                    <span className="topic-chip">#Cartosat-3</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="code-snippet-box" style={{ height: '240px' }}>
{`{
  "status": 200,
  "nodes_synced": 14,
  "latency_ms": 118,
  "confidence": 0.986,
  "catalog": "NORAD_2026_Q3",
  "sat_id": 25544
}`}
              </div>
            )}
          </LiquidGlassCard>

          {/* Follow-up Query Bar (Separate Card Below Query Summary) */}
          <LiquidGlassCard pill className="summary-followup-card">
            <form className="followup-input-box" onSubmit={handleSendFollowup}>
              <button type="button" className="input-icon-btn" title="Attach Telemetry Data">
                <Paperclip size={16} />
              </button>
              <button type="button" className="input-icon-btn" title="Voice Input">
                <Mic size={16} />
              </button>
              <input 
                type="text" 
                className="followup-text-field"
                placeholder="Ask a follow-up query..."
                value={followupText}
                onChange={(e) => setFollowupText(e.target.value)}
              />
              <button 
                type="submit" 
                className="submit-rocket-btn" 
                disabled={!followupText.trim()}
                title="Submit follow-up"
              >
                <Rocket size={16} />
              </button>
            </form>
          </LiquidGlassCard>
        </div>
      </div>

      {/* ── About Modal ── */}
      {showAboutModal && (
        <div className="about-modal-backdrop" onClick={() => setShowAboutModal(false)}>
          <LiquidGlassCard className="about-modal-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, color: '#00F2FE', fontSize: '1.2rem' }}>About SatQuery AI</h3>
              <button 
                onClick={() => setShowAboutModal(false)} 
                style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'rgba(255,255,255,0.85)' }}>
              SatQuery AI is a state-of-the-art space situational awareness platform engineered with a liquid-metal glassmorphic design system. It connects directly to satellite telemetry nodes and NORAD catalogs to provide real-time trajectory visualization and intelligence.
            </p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
              <span className="topic-chip"><CheckCircle2 size={12} inline /> Liquid Glass System</span>
              <span className="topic-chip"><CheckCircle2 size={12} inline /> Real-time NORAD</span>
            </div>
          </LiquidGlassCard>
        </div>
      )}
    </div>
  );
}

export default LiquidMetalChatUI;
