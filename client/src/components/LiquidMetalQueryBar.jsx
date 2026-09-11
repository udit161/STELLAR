import React, { useState, useRef, useEffect } from 'react';
import { Rocket, Plus, FileText, Image as ImageIcon, X } from 'lucide-react';
import './LiquidMetalQueryBar.css';

const PROMPTS = [
  'Ask anything…',
  'Track a satellite orbit…',
  'Query ISS position…',
  'Find debris in LEO…',
  'Predict orbital decay…',
  'Analyse telemetry data…',
  'Search by NORAD ID…',
  'Check solar activity…',
];

const TYPE_SPEED   = 55;   // ms per character typed
const DELETE_SPEED = 28;   // ms per character deleted
const PAUSE_AFTER  = 1800; // ms pause at full word before deleting
const PAUSE_BEFORE = 400;  // ms pause after fully deleted

function useTypewriter(prompts) {
  const [displayed, setDisplayed]   = useState('');
  const [promptIdx, setPromptIdx]   = useState(0);
  const [phase, setPhase]           = useState('typing'); // 'typing' | 'pausing' | 'deleting' | 'waiting'
  const charIdxRef = useRef(0);

  useEffect(() => {
    const current = prompts[promptIdx];
    let timer;

    if (phase === 'typing') {
      if (charIdxRef.current < current.length) {
        timer = setTimeout(() => {
          charIdxRef.current += 1;
          setDisplayed(current.slice(0, charIdxRef.current));
        }, TYPE_SPEED);
      } else {
        timer = setTimeout(() => setPhase('pausing'), PAUSE_AFTER);
      }
    } else if (phase === 'pausing') {
      setPhase('deleting');
    } else if (phase === 'deleting') {
      if (charIdxRef.current > 0) {
        timer = setTimeout(() => {
          charIdxRef.current -= 1;
          setDisplayed(current.slice(0, charIdxRef.current));
        }, DELETE_SPEED);
      } else {
        timer = setTimeout(() => {
          setPromptIdx((i) => (i + 1) % prompts.length);
          setPhase('typing');
        }, PAUSE_BEFORE);
      }
    }

    return () => clearTimeout(timer);
  }, [phase, displayed, promptIdx, prompts]);

  return displayed;
}

function LiquidMetalQueryBar({ onLaunchQuery }) {
  const [query, setQuery]             = useState('');
  const [attachments, setAttachments] = useState([]);
  const [isLaunching, setIsLaunching] = useState(false);
  const [isFocused, setIsFocused]     = useState(false);
  const [isDragOver, setIsDragOver]   = useState(false);
  const inputRef      = useRef(null);
  const fileInputRef  = useRef(null);
  const ghostText     = useTypewriter(PROMPTS);

  const handleLaunch = (e) => {
    e?.stopPropagation();
    if (isLaunching || (!query.trim() && attachments.length === 0)) return;
    setIsLaunching(true);
    const finalQuery = query.trim() || 'Analyze attached telemetry and imagery data';
    if (onLaunchQuery) onLaunchQuery(finalQuery, attachments);
    setTimeout(() => {
      setIsLaunching(false);
      setQuery('');
      setAttachments([]);
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleLaunch(e);
  };

  const focusInput = () => inputRef.current?.focus();

  const handleAttachClick = (e) => {
    e?.stopPropagation();
    fileInputRef.current?.click();
  };

  const processFiles = (files) => {
    const fileList = Array.from(files);
    fileList.forEach(file => {
      const isImage = file.type.startsWith('image/');
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setAttachments(prev => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            name: file.name,
            size: file.size < 1024 * 1024 
              ? `${(file.size / 1024).toFixed(1)} KB` 
              : `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
            isImage,
            type: file.type || (isImage ? 'image' : 'document'),
            data: loadEvent.target.result
          }
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
      e.target.value = '';
    }
  };

  const removeAttachment = (id, e) => {
    e?.stopPropagation();
    setAttachments(prev => prev.filter(item => item.id !== id));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  // Show ghost text only when input is empty
  const showGhost = !query;
  const canSubmit = query.trim().length > 0 || attachments.length > 0;

  return (
    <div className="liquid-bar-dock">
      <span className="ambient-particle particle-tl" aria-hidden="true" />
      <span className="ambient-particle particle-tr" aria-hidden="true" />
      <span className="ambient-particle particle-bl" aria-hidden="true" />
      <span className="ambient-particle particle-br" aria-hidden="true" />

      {/* Attachments Shelf above Query Bar */}
      {attachments.length > 0 && (
        <div className="liquid-attachments-shelf" onClick={(e) => e.stopPropagation()}>
          {attachments.map((att) => (
            <div key={att.id} className="attachment-chip">
              {att.isImage ? (
                <img src={att.data} alt={att.name} className="attachment-chip-thumb" />
              ) : (
                <div className="attachment-chip-doc-icon">
                  <FileText size={13} />
                </div>
              )}
              <div className="attachment-chip-text">
                <span className="attachment-chip-name" title={att.name}>{att.name}</span>
                <span className="attachment-chip-size">{att.size}</span>
              </div>
              <button 
                type="button" 
                className="attachment-chip-remove" 
                onClick={(e) => removeAttachment(att.id, e)}
                title="Remove attachment"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div
        className={`liquid-bar-container ${isFocused ? 'focused' : ''} ${isDragOver ? 'drag-over' : ''}`}
        onClick={focusInput}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        role="search"
        aria-label="Satellite Intelligence Query Bar"
      >
        <div className="liquid-shimmer-overlay" aria-hidden="true" />

        {/* Pulse dot */}
        <div className="indicator-pulse-dot" aria-hidden="true" />

        {/* Attachment '+' Button */}
        <button
          type="button"
          className="liquid-attach-btn"
          onClick={handleAttachClick}
          title="Attach telemetry document, dataset, or satellite picture"
          aria-label="Attach documents or photos"
        >
          <Plus size={16} />
        </button>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.pdf,.doc,.docx,.txt,.csv,.json"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />

        {/* Input + ghost-text wrapper */}
        <div className="liquid-input-wrap">
          {/* Typewriter ghost text (shown when input is empty) */}
          {showGhost && (
            <span className="liquid-ghost-text" aria-hidden="true">
              {ghostText}
              <span className="liquid-ghost-cursor" />
            </span>
          )}

          {/* Real input — sits on top of ghost */}
          <input
            ref={inputRef}
            className="liquid-bar-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder=""
            aria-label="Type your satellite query"
            autoComplete="off"
            spellCheck="false"
          />
        </div>

        {/* Rocket / Send button */}
        <button
          className={`rocket-launch-button ${isLaunching ? 'launching' : ''} ${canSubmit ? 'has-query' : ''}`}
          onClick={handleLaunch}
          aria-label="Launch Satellite AI Query"
          title="Launch query"
          disabled={!canSubmit}
        >
          <Rocket
            className={`rocket-icon-svg ${isLaunching ? 'launching' : ''}`}
            size={16}
          />
        </button>

        {isLaunching && (
          <div className="launch-trail-container" aria-hidden="true">
            <span className="trail-particle active-0" />
            <span className="trail-particle active-1" />
            <span className="trail-particle active-2" />
            <span className="trail-particle active-3" />
          </div>
        )}
      </div>
    </div>
  );
}

export default LiquidMetalQueryBar;

