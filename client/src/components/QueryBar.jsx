import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowUpRight,
  UploadCloud,
  Layers,
  Sliders,
  Calendar,
  Sparkles,
  MapPin,
  FileCode,
  CheckCircle2,
  X,
  Compass,
  AlertCircle,
  Eye,
} from 'lucide-react';
import './QueryBar.css';

function QueryBar({ onExecuteQuery, currentAoi, initialQuery = '' }) {
  const [queryText, setQueryText] = useState(initialQuery);
  const [sensor, setSensor] = useState('Sentinel-2');
  const [dateRange, setDateRange] = useState('2023 - 2024');
  const [cloudCover, setCloudCover] = useState('< 15%');
  const [showFilters, setShowFilters] = useState(false);
  const [attachedFile, setAttachedFile] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (initialQuery) {
      setQueryText(initialQuery);
    }
  }, [initialQuery]);

  const quickPrompts = [
    {
      label: '🌱 Agricultural NDVI Index',
      query: 'Calculate NDVI spectral index for Punjab wheat farms and show vegetation health variance between Jan 2023 and Jan 2024.',
      tag: 'Sentinel-2',
    },
    {
      label: '🏗️ Urban Sprawl & Growth',
      query: 'Detect urban expansion and built-up land use changes in Bengaluru periphery from 2020 to 2024 using bi-temporal optical imagery.',
      tag: 'Change Det',
    },
    {
      label: '🌊 Flood Inundation Mapping',
      query: 'Assess submerged infrastructure and flooded agricultural areas in Brahmaputra River Basin during peak monsoon 2023.',
      tag: 'SAR C-Band',
    },
    {
      label: '🔥 Wildfire & Thermal Hotspot',
      query: 'Identify active thermal anomalies and burn scar perimeter in Western Ghats forest reserve with cloud-filtered analysis.',
      tag: 'Landsat-9',
    },
  ];

  const handlePromptClick = (prompt) => {
    setQueryText(prompt.query);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!queryText.trim()) return;

    if (onExecuteQuery) {
      onExecuteQuery({
        query: queryText,
        sensor,
        dateRange,
        cloudCover,
        attachedFile,
        aoi: currentAoi || 'Default Global',
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachedFile({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      });
    }
  };

  const removeFile = () => {
    setAttachedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="query-bar-container">
      {/* Quick Prompt Chips */}
      <div className="quick-prompts-scroller">
        <div className="quick-prompts-label">
          <Sparkles size={13} className="sparkle-icon" />
          <span>Suggested Inquiries:</span>
        </div>
        <div className="quick-prompts-pills">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              className="quick-prompt-pill"
              onClick={() => handlePromptClick(p)}
              type="button"
            >
              <span className="prompt-pill-text">{p.label}</span>
              <span className="prompt-pill-tag">{p.tag}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Glassmorphic Input Box */}
      <div className={`query-input-card ${isFocused ? 'focused' : ''}`}>
        {/* Top bar with active AOI indicator and file attachment pill */}
        <div className="query-context-header">
          <div className="context-aoi-badge">
            <MapPin size={12} className="text-cyan" />
            <span className="aoi-label">Target AOI:</span>
            <span className="aoi-val">{currentAoi?.name || 'Bengaluru Urban (12.97° N, 77.59° E)'}</span>
          </div>

          {attachedFile && (
            <div className="attached-file-pill">
              <FileCode size={12} className="text-emerald" />
              <span className="file-name">{attachedFile.name} ({attachedFile.size})</span>
              <button onClick={removeFile} className="remove-file-btn" type="button">
                <X size={11} />
              </button>
            </div>
          )}

          <div className="sensor-quick-badge">
            <span className="sensor-name">{sensor}</span>
            <span className="sensor-res">10m</span>
          </div>
        </div>

        {/* Text Input Area */}
        <div className="query-textarea-wrapper">
          <textarea
            ref={textareaRef}
            rows={2}
            className="query-textarea"
            placeholder="Ask anything about Earth observation, detect land-use changes, compute NDVI index, or enter coordinates..."
            value={queryText}
            onChange={(e) => setQueryText(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
          />

          <button
            className={`query-submit-btn ${queryText.trim() ? 'active' : ''}`}
            onClick={handleSubmit}
            disabled={!queryText.trim()}
            title="Execute Geospatial Query"
            type="button"
          >
            <span className="submit-text">Query</span>
            <ArrowUpRight size={18} />
          </button>
        </div>

        {/* Query Controls & Filters Toolbar */}
        <div className="query-toolbar">
          <div className="toolbar-actions-left">
            {/* Upload AOI / GeoJSON */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              style={{ display: 'none' }}
              accept=".geojson,.json,.kml,.zip,.tif,.tiff"
            />
            <button
              className="toolbar-btn"
              onClick={() => fileInputRef.current?.click()}
              title="Upload GeoJSON / Shapefile / GeoTIFF"
              type="button"
            >
              <UploadCloud size={14} />
              <span>Attach ROI File</span>
            </button>

            {/* Filter Toggle Button */}
            <button
              className={`toolbar-btn ${showFilters ? 'active' : ''}`}
              onClick={() => setShowFilters(!showFilters)}
              type="button"
            >
              <Sliders size={14} />
              <span>Telemetry Parameters</span>
            </button>
          </div>

          <div className="toolbar-hint-right">
            <span className="kbd-shortcut">↵ Enter</span>
            <span className="shortcut-desc">to query SatQuery Agent</span>
          </div>
        </div>

        {/* Expandable Parameters Drawer */}
        {showFilters && (
          <div className="query-filters-drawer">
            <div className="filter-group">
              <label className="filter-label">CONSTELLATION SENSOR</label>
              <select
                className="filter-select"
                value={sensor}
                onChange={(e) => setSensor(e.target.value)}
              >
                <option value="Sentinel-2">Sentinel-2 (MSI Multi-Spectral)</option>
                <option value="Landsat-9">Landsat-8/9 (OLI-2 / TIRS-2)</option>
                <option value="Sentinel-1 SAR">Sentinel-1 (SAR C-Band Radar)</option>
                <option value="MODIS Terra/Aqua">MODIS (Daily Global Surface)</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">TEMPORAL WINDOW</label>
              <select
                className="filter-select"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="2023 - 2024">2023 - 2024 (1 Year Window)</option>
                <option value="2020 - 2024">2020 - 2024 (Long-term Sprawl)</option>
                <option value="Past 30 Days">Past 30 Days (Recent Acquisitions)</option>
                <option value="Monsoon 2023">Monsoon 2023 (Jun - Sep)</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">MAX CLOUD COVER</label>
              <select
                className="filter-select"
                value={cloudCover}
                onChange={(e) => setCloudCover(e.target.value)}
              >
                <option value="< 10%">&lt; 10% (Clear Skies)</option>
                <option value="< 15%">&lt; 15% (Optimal Quality)</option>
                <option value="< 30%">&lt; 30% (Standard)</option>
                <option value="All Cloud Levels">All Cloud Levels (SAR Recommended)</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QueryBar;
