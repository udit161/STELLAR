import React from 'react';
import {
  Satellite,
  Layers,
  Sparkles,
  TrendingUp,
  Activity,
  Globe2,
  ShieldAlert,
  Cpu,
  ArrowRight,
  Maximize2,
  CheckCircle,
  Clock,
  Waves,
} from 'lucide-react';
import './IntroHero.css';

function IntroHero({ onSelectFeature, activeQueryData, isAgentProcessing }) {
  const capabilities = [
    {
      id: 'vqa',
      title: 'Satellite Visual QA',
      desc: 'Ask conversational questions over multi-spectral optical & SAR scenes.',
      icon: Sparkles,
      color: 'cyan',
      tag: 'LLM + Vision',
      sampleQuery: 'Identify newly constructed industrial warehouses near Whitefield Bengaluru since 2021.',
    },
    {
      id: 'change',
      title: 'Bi-Temporal Change Detection',
      desc: 'Automated Siamese-diff analysis detecting urban sprawl, deforestation & water shrinkage.',
      icon: TrendingUp,
      color: 'emerald',
      tag: 'Pixel & Vector Diff',
      sampleQuery: 'Highlight vegetation loss and new road infrastructure across Western Ghats corridor.',
    },
    {
      id: 'indices',
      title: 'Spectral Indices Engine',
      desc: 'Instant computation of NDVI (Vegetation), NDWI (Water), and NDBI (Built-up) rasters.',
      icon: Layers,
      color: 'indigo',
      tag: 'B4/B8 Normalized',
      sampleQuery: 'Calculate NDVI anomaly score for wheat farming zones in Ludhiana district.',
    },
    {
      id: 'hazards',
      title: 'Real-Time Disaster Radar',
      desc: 'Multi-satellite detection of active wildfire hot spots, flood inundation & burn scars.',
      icon: ShieldAlert,
      color: 'amber',
      tag: 'Thermal + SAR',
      sampleQuery: 'Map inundated settlements and damaged cropland in Assam flood zone with SAR radar.',
    },
  ];

  return (
    <div className="intro-hero-container">
      {/* Top Banner Telemetry Bar */}
      <div className="top-telemetry-strip">
        <div className="telemetry-pill">
          <Globe2 size={13} className="text-cyan" />
          <span>ORBITAL TRACKER:</span>
          <strong className="telemetry-value">SENTINEL-2B / LANDSAT-9</strong>
        </div>

        <div className="telemetry-pill">
          <Activity size={13} className="text-emerald" />
          <span>PASS REVISIT:</span>
          <strong className="telemetry-value">5 DAYS (CONSTELLATION)</strong>
        </div>

        <div className="telemetry-pill">
          <Cpu size={13} className="text-indigo" />
          <span>SPECTRAL BANDS:</span>
          <strong className="telemetry-value">13 BANDS (VNIR/SWIR/TIR)</strong>
        </div>
      </div>

      {/* Main Title & Value Proposition */}
      <div className="hero-heading-block">
        <div className="hero-eyebrow">
          <span className="eyebrow-badge">
            <Satellite size={12} />
            SatQuery AI Platform
          </span>
          <span className="eyebrow-highlight">Earth Observation Intelligence</span>
        </div>

        <h1 className="hero-main-title">
          Autonomous Satellite <br />
          <span className="gradient-text-hero">Visual QA & Change Detection</span>
        </h1>

        <p className="hero-lead-text">
          Query high-resolution satellite constellations in natural language. Run agentic multi-temporal change detection, compute spectral indices, and audit geospatial shifts in real-time.
        </p>
      </div>

      {/* If an agent query was executed, show the live agent reasoning modal/preview */}
      {activeQueryData ? (
        <div className="agent-execution-result-card animate-float">
          <div className="result-card-header">
            <div className="result-status-badge">
              <div className="live-dot-pulse"></div>
              <span>{isAgentProcessing ? 'AI AGENT PROCESSING TASK' : 'ANALYSIS COMPLETE'}</span>
            </div>
            <span className="result-sensor-tag">{activeQueryData.sensor || 'Sentinel-2 MSI'}</span>
          </div>

          <div className="result-query-echo">
            <span className="query-echo-label">Active Query:</span>
            <p className="query-echo-text">"{activeQueryData.query}"</p>
          </div>

          <div className="agent-steps-timeline">
            <div className="agent-step-item completed">
              <CheckCircle size={14} className="step-icon done" />
              <span>Catalog Ingestion (STAC Sentinel-2 / Landsat-9 API)</span>
            </div>
            <div className="agent-step-item completed">
              <CheckCircle size={14} className="step-icon done" />
              <span>Atmospheric Correction & Cloud Masking (&lt; 15%)</span>
            </div>
            <div className={`agent-step-item ${isAgentProcessing ? 'active-step' : 'completed'}`}>
              <Activity size={14} className={`step-icon ${isAgentProcessing ? 'pulse' : 'done'}`} />
              <span>Bi-Temporal Feature Extraction & Spectral Diff Analysis</span>
            </div>
            <div className={`agent-step-item ${isAgentProcessing ? 'pending' : 'completed'}`}>
              <CheckCircle size={14} className="step-icon" />
              <span>Multi-Modal Synthesis & GeoJSON Layer Generation</span>
            </div>
          </div>

          <div className="result-sample-preview">
            <div className="preview-stat-card">
              <span className="stat-label">Area of Interest</span>
              <span className="stat-val">{activeQueryData.aoi?.name || 'Bengaluru Urban'}</span>
            </div>
            <div className="preview-stat-card">
              <span className="stat-label">Temporal Baseline</span>
              <span className="stat-val">{activeQueryData.dateRange || '2023 - 2024'}</span>
            </div>
            <div className="preview-stat-card">
              <span className="stat-label">Detection Confidence</span>
              <span className="stat-val stat-emerald">94.8%</span>
            </div>
          </div>
        </div>
      ) : (
        /* Capability Showcase Grid */
        <div className="capabilities-grid">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.id}
                className={`capability-card ${cap.color}`}
                onClick={() => onSelectFeature && onSelectFeature(cap.sampleQuery)}
              >
                <div className="cap-header">
                  <div className={`cap-icon-box ${cap.color}`}>
                    <Icon size={20} />
                  </div>
                  <span className="cap-tag">{cap.tag}</span>
                </div>

                <h3 className="cap-title">{cap.title}</h3>
                <p className="cap-desc">{cap.desc}</p>

                <div className="cap-action-hint">
                  <span className="hint-text">Load sample query</span>
                  <ArrowRight size={14} className="hint-arrow" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default IntroHero;
