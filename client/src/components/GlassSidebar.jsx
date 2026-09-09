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
  Plus,
  Image as ImageIcon,
  Tag,
  Save,
  Edit3
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

const INITIAL_NOTES = [
  {
    id: 1,
    title: 'ISRO Cartosat-3 Orbit & Node Telemetry',
    content: 'Inclination: 97.5° SSO. Operating altitude ~509 km. High-resolution panchromatic & multispectral sensors active with Doppler frequency correction.',
    tag: 'Telemetry',
    color: '#a78bfa',
    image: '/sat_orbit.jpg',
    date: 'Sep 10, 2026'
  },
  {
    id: 2,
    title: 'Sentinel-2 Infrared Coastal Scan Analysis',
    content: 'Multispectral false-color infrared highlights active coral reef ecosystems and coastal erosion patterns along Australian shoreline.',
    tag: 'Earth Scan',
    color: '#38bdf8',
    image: '/earth_scan.jpg',
    date: 'Sep 09, 2026'
  }
];

function GlassSidebar({ activeNav, onNavChange, onSelectQuery }) {
  const [active, setActive] = useState(activeNav || null);
  const [historyList, setHistoryList] = useState(INITIAL_HISTORY);
  const [historyFilter, setHistoryFilter] = useState('');
  
  // Note Taking State
  const [notesList, setNotesList] = useState(INITIAL_NOTES);
  const [noteFilter, setNoteFilter] = useState('');
  const [isCreatingNote, setIsCreatingNote] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState(null);
  
  // New Note Form State
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [noteTag, setNoteTag] = useState('Telemetry');
  const [noteImage, setNoteImage] = useState('/sat_orbit.jpg');

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

  // Note Taking Actions
  const handleSaveNote = (e) => {
    e?.preventDefault();
    if (!noteTitle.trim() || !noteContent.trim()) return;

    if (editingNoteId) {
      setNotesList(prev => prev.map(n => n.id === editingNoteId ? {
        ...n,
        title: noteTitle.trim(),
        content: noteContent.trim(),
        tag: noteTag,
        image: noteImage
      } : n));
      setEditingNoteId(null);
    } else {
      const newNote = {
        id: Date.now(),
        title: noteTitle.trim(),
        content: noteContent.trim(),
        tag: noteTag,
        color: noteTag === 'Telemetry' ? '#a78bfa' : noteTag === 'Earth Scan' ? '#38bdf8' : '#fbbf24',
        image: noteImage,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      setNotesList(prev => [newNote, ...prev]);
    }

    setNoteTitle('');
    setNoteContent('');
    setIsCreatingNote(false);
  };

  const handleEditNote = (note) => {
    setEditingNoteId(note.id);
    setNoteTitle(note.title);
    setNoteContent(note.content);
    setNoteTag(note.tag);
    setNoteImage(note.image || '/sat_orbit.jpg');
    setIsCreatingNote(true);
  };

  const handleDeleteNote = (id, e) => {
    e?.stopPropagation();
    setNotesList(prev => prev.filter(n => n.id !== id));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setNoteImage(uploadEvent.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredHistory = historyList.filter(item => 
    item.query.toLowerCase().includes(historyFilter.toLowerCase()) ||
    item.tag.toLowerCase().includes(historyFilter.toLowerCase()) ||
    item.desc.toLowerCase().includes(historyFilter.toLowerCase())
  );

  const filteredNotes = notesList.filter(note => 
    note.title.toLowerCase().includes(noteFilter.toLowerCase()) ||
    note.content.toLowerCase().includes(noteFilter.toLowerCase()) ||
    note.tag.toLowerCase().includes(noteFilter.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        if (active !== 'history' && active !== 'documents') {
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

      {/* ── Center Transparent Big Documents & Notes Center Modal (Purple Theme) ── */}
      {active === 'documents' && (
        <div className="history-modal-backdrop" onClick={() => setActive(null)}>
          <div className="docs-center-card" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="docs-card-header">
              <div className="docs-title-purple">
                <div className="docs-purple-icon-badge">
                  <FileText size={20} />
                </div>
                <div>
                  <h2 className="docs-main-heading">Orbit Notes & Documents</h2>
                  <p className="docs-sub-heading">Create custom research notes & save satellite imagery from AI queries</p>
                </div>
              </div>

              <div className="docs-header-actions">
                <button 
                  className="docs-create-note-btn" 
                  onClick={() => {
                    setIsCreatingNote(!isCreatingNote);
                    setEditingNoteId(null);
                    setNoteTitle('');
                    setNoteContent('');
                  }}
                >
                  <Plus size={15} /> {isCreatingNote ? 'Cancel' : 'New Note'}
                </button>
                <button className="history-close-btn" onClick={() => setActive(null)} title="Close">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Note Creation / Editing Editor */}
            {isCreatingNote ? (
              <form className="note-editor-form" onSubmit={handleSaveNote}>
                <div className="editor-row">
                  <input 
                    type="text"
                    className="note-title-input"
                    placeholder="Note Title (e.g. Cartosat-3 Solar Array Inspection)..."
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)}
                    required
                  />
                  <select 
                    className="note-tag-select"
                    value={noteTag}
                    onChange={(e) => setNoteTag(e.target.value)}
                  >
                    <option value="Telemetry">#Telemetry</option>
                    <option value="Earth Scan">#Earth Scan</option>
                    <option value="Debris Risk">#Debris Risk</option>
                    <option value="General">#General</option>
                  </select>
                </div>

                <textarea 
                  className="note-content-textarea"
                  placeholder="Type your notes, orbital calculations, or satellite analysis observations..."
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  rows={4}
                  required
                />

                {/* Preset Image Picker + File Upload */}
                <div className="image-picker-row">
                  <span className="picker-label"><ImageIcon size={14} /> Attach Satellite Image:</span>
                  <div className="preset-thumbs">
                    <img 
                      src="/sat_orbit.jpg" 
                      alt="Orbit" 
                      className={`thumb-item ${noteImage === '/sat_orbit.jpg' ? 'selected' : ''}`}
                      onClick={() => setNoteImage('/sat_orbit.jpg')}
                    />
                    <img 
                      src="/earth_scan.jpg" 
                      alt="Earth Scan" 
                      className={`thumb-item ${noteImage === '/earth_scan.jpg' ? 'selected' : ''}`}
                      onClick={() => setNoteImage('/earth_scan.jpg')}
                    />
                    <img 
                      src="/deep_space.jpg" 
                      alt="Deep Space" 
                      className={`thumb-item ${noteImage === '/deep_space.jpg' ? 'selected' : ''}`}
                      onClick={() => setNoteImage('/deep_space.jpg')}
                    />
                  </div>
                  <label className="upload-custom-lbl">
                    Upload Custom
                    <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
                  </label>
                </div>

                <button type="submit" className="save-note-submit-btn">
                  <Save size={15} /> {editingNoteId ? 'Update Note' : 'Save Note'}
                </button>
              </form>
            ) : (
              /* Search Filter Bar Purple */
              <div className="docs-search-bar-purple">
                <Search size={16} style={{ color: '#a78bfa' }} />
                <input 
                  type="text" 
                  className="history-filter-input"
                  placeholder="Search saved notes by title, tag, or content..."
                  value={noteFilter}
                  onChange={(e) => setNoteFilter(e.target.value)}
                />
                {noteFilter && (
                  <button className="history-filter-clear" onClick={() => setNoteFilter('')}>
                    <X size={13} />
                  </button>
                )}
              </div>
            )}

            {/* Saved Notes Grid */}
            {!isCreatingNote && (
              <div className="notes-grid-list">
                {filteredNotes.length > 0 ? (
                  filteredNotes.map((note) => (
                    <div key={note.id} className="note-card-item">
                      {note.image && (
                        <div className="note-img-preview-box">
                          <img src={note.image} alt={note.title} className="note-card-img" />
                          <span className="note-purple-tag">#{note.tag}</span>
                        </div>
                      )}
                      <div className="note-card-body">
                        <div className="note-card-top">
                          <h3 className="note-card-title">{note.title}</h3>
                          <div className="note-card-actions">
                            <button className="note-action-icon" onClick={() => handleEditNote(note)} title="Edit Note">
                              <Edit3 size={14} />
                            </button>
                            <button className="note-action-icon delete" onClick={(e) => handleDeleteNote(note.id, e)} title="Delete Note">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                        <p className="note-card-content">{note.content}</p>
                        <span className="note-card-date">{note.date}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="history-empty-box">
                    <FileText size={36} style={{ color: 'rgba(167, 139, 250, 0.4)', marginBottom: '10px' }} />
                    <p style={{ margin: 0, fontWeight: 600 }}>No notes created yet</p>
                    <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>Click "+ New Note" to save satellite intelligence & images!</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default GlassSidebar;
