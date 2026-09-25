import React, { useState, useRef, useEffect } from 'react';
import { Rocket, Plus, FileText, Image as ImageIcon, X, Eye, Paperclip } from 'lucide-react';
import { useT } from '../context/LanguageContext';
import './LiquidMetalQueryBar.css';

const DEFAULT_PROMPTS = [
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

  // Reset when prompt list changes (e.g. language toggle)
  useEffect(() => {
    setPromptIdx(0);
    setDisplayed('');
    setPhase('typing');
    charIdxRef.current = 0;
  }, [prompts]);

  useEffect(() => {
    if (!prompts || prompts.length === 0) return;
    const current = prompts[promptIdx % prompts.length];
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
  const t = useT();
  const prompts = t.queryBarPrompts || DEFAULT_PROMPTS;
  const [query, setQuery]             = useState('');
  const [attachments, setAttachments] = useState([]);
  const [isLaunching, setIsLaunching] = useState(false);
  const [isFocused, setIsFocused]     = useState(false);
  const [isDragOver, setIsDragOver]   = useState(false);
  const inputRef      = useRef(null);
  const fileInputRef  = useRef(null);
  const ghostText     = useTypewriter(prompts);

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
      const isImage = file.type ? file.type.startsWith('image/') : true;
      const fileName = file.name || `Pasted_Satellite_Image_${Date.now()}.png`;
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setAttachments(prev => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            name: fileName,
            size: file.size < 1024 * 1024 
              ? `${(file.size / 1024).toFixed(1)} KB` 
              : `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
            isImage,
            type: file.type || (isImage ? 'image/png' : 'document'),
            data: loadEvent.target.result,
            fileObj: file
          }
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handlePaste = (e) => {
    e?.preventDefault();
    e?.stopPropagation();

    const clipboardData = e.clipboardData || e.originalEvent?.clipboardData;
    if (!clipboardData) return;

    const items = clipboardData.items;
    const filesToProcess = [];

    if (items && items.length > 0) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.kind === 'file' || (item.type && item.type.startsWith('image/'))) {
          const file = item.getAsFile();
          if (file) {
            const fileName = file.name && file.name !== 'image.png'
              ? file.name
              : `Pasted_Satellite_Image_${Date.now()}.png`;
            const namedFile = new File([file], fileName, { type: file.type || 'image/png' });
            filesToProcess.push(namedFile);
            break;
          }
        }
      }
    } else if (clipboardData.files && clipboardData.files.length > 0) {
      filesToProcess.push(clipboardData.files[0]);
    }

    if (filesToProcess.length > 0) {
      processFiles(filesToProcess);
    }
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

  // Image preview tab state (only relevant when attachments exist)
  const imageAttachments = attachments.filter(a => a.isImage);
  const [previewTab, setPreviewTab] = useState('image');
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);

  return (
    <div className="liquid-bar-dock">
      <span className="ambient-particle particle-tl" aria-hidden="true" />
      <span className="ambient-particle particle-tr" aria-hidden="true" />
      <span className="ambient-particle particle-bl" aria-hidden="true" />
      <span className="ambient-particle particle-br" aria-hidden="true" />

      {/* ── Image Preview Panel (shown above bar when images are attached) ── */}
      {imageAttachments.length > 0 && (
        <div className="qb-image-preview-panel" onClick={e => e.stopPropagation()}>
          {/* Panel Header with tabs */}
          <div className="qb-preview-header">
            <div className="qb-preview-tabs">
              <button
                className={`qb-preview-tab ${previewTab === 'image' ? 'active' : ''}`}
                onClick={() => setPreviewTab('image')}
              >
                <ImageIcon size={12} />
                Image Preview
                <span className="qb-preview-badge">{imageAttachments.length}</span>
              </button>
              <button
                className={`qb-preview-tab ${previewTab === 'files' ? 'active' : ''}`}
                onClick={() => setPreviewTab('files')}
              >
                <Paperclip size={12} />
                All Files
                <span className="qb-preview-badge">{attachments.length}</span>
              </button>
            </div>
            <button
              className="qb-preview-close"
              onClick={e => { e.stopPropagation(); setAttachments([]); }}
              title="Remove all attachments"
            >
              <X size={13} />
            </button>
          </div>

          {/* Image Preview Tab */}
          {previewTab === 'image' && (
            <div className="qb-image-tab-body">
              {/* Thumbnail strip if multiple images */}
              {imageAttachments.length > 1 && (
                <div className="qb-thumb-strip">
                  {imageAttachments.map((img, i) => (
                    <button
                      key={img.id}
                      className={`qb-thumb-btn ${selectedImgIdx === i ? 'active' : ''}`}
                      onClick={() => setSelectedImgIdx(i)}
                      title={img.name}
                    >
                      <img src={img.data} alt={img.name} className="qb-thumb-img" />
                    </button>
                  ))}
                </div>
              )}
              {/* Main Image View */}
              {imageAttachments[Math.min(selectedImgIdx, imageAttachments.length - 1)] && (
                <div className="qb-main-image-wrap">
                  <img
                    src={imageAttachments[Math.min(selectedImgIdx, imageAttachments.length - 1)].data}
                    alt={imageAttachments[Math.min(selectedImgIdx, imageAttachments.length - 1)].name}
                    className="qb-main-image"
                  />
                  <div className="qb-image-meta">
                    <span className="qb-image-filename">
                      {imageAttachments[Math.min(selectedImgIdx, imageAttachments.length - 1)].name}
                    </span>
                    <span className="qb-image-size">
                      {imageAttachments[Math.min(selectedImgIdx, imageAttachments.length - 1)].size}
                    </span>
                    <button
                      className="qb-image-remove-btn"
                      onClick={e => removeAttachment(imageAttachments[Math.min(selectedImgIdx, imageAttachments.length - 1)].id, e)}
                      title="Remove this image"
                    >
                      <X size={11} /> Remove
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* All Files Tab */}
          {previewTab === 'files' && (
            <div className="qb-files-tab-body">
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
                    title={t.removeAttachment}
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Non-image doc chips only shown when no image tab panel is visible */}
      {imageAttachments.length === 0 && attachments.length > 0 && (
        <div className="liquid-attachments-shelf" onClick={(e) => e.stopPropagation()}>
          {attachments.map((att) => (
            <div key={att.id} className="attachment-chip">
              <div className="attachment-chip-doc-icon">
                <FileText size={13} />
              </div>
              <div className="attachment-chip-text">
                <span className="attachment-chip-name" title={att.name}>{att.name}</span>
                <span className="attachment-chip-size">{att.size}</span>
              </div>
              <button
                type="button"
                className="attachment-chip-remove"
                onClick={(e) => removeAttachment(att.id, e)}
                title={t.removeAttachment}
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
        aria-label={t.queryBarAria}
      >
        <div className="liquid-shimmer-overlay" aria-hidden="true" />

        {/* Pulse dot */}
        <div className="indicator-pulse-dot" aria-hidden="true" />

        {/* Attachment '+' Button */}
        <button
          type="button"
          className="liquid-attach-btn"
          onClick={handleAttachClick}
          title={t.attachTooltip}
          aria-label={t.attachTooltip}
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
            onPaste={handlePaste}
            placeholder=""
            aria-label={t.queryInputAria}
            autoComplete="off"
            spellCheck="false"
          />
        </div>

        {/* Rocket / Send button */}
        <button
          className={`rocket-launch-button ${isLaunching ? 'launching' : ''} ${canSubmit ? 'has-query' : ''}`}
          onClick={handleLaunch}
          aria-label={t.launchQuery}
          title={t.launchQuery}
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

