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
  Edit3,
  Paperclip,
  Copy,
  Check,
  Download,
  LogOut,
  FileCheck
} from 'lucide-react';
import './GlassSidebar.css';
import { useT, useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

const NOTE_TAGS = [
  { id: 'Telemetry', labelKey: 'tagTelemetry' },
  { id: 'Earth Scan', labelKey: 'tagEarthScan' },
  { id: 'Debris Risk', labelKey: 'tagDebrisRisk' },
  { id: 'Mission Log', labelKey: 'tagMissionLog' },
  { id: 'Research', labelKey: 'tagResearch' },
  { id: 'General', labelKey: 'tagGeneral' },
];

const getTagDisplay = (tagId, t, isHindi) => {
  const item = NOTE_TAGS.find(nt => nt.id.toLowerCase() === (tagId || '').toLowerCase());
  if (item && t[item.labelKey]) return t[item.labelKey];
  if (isHindi && item && translations.hi[item.labelKey]) return translations.hi[item.labelKey];
  return tagId;
};

const NAV_ITEMS = [
  { id: 'history',   icon: Clock,    labelKey: 'navHistory' },
  { id: 'documents', icon: FileText,  labelKey: 'navNotesDocs', title: 'Orbit Notes & Documents' },
  { id: 'settings',  icon: Settings,  labelKey: 'navSettings' },
  { id: 'profile',   icon: User,      labelKey: 'navProfile' },
];

const INITIAL_HISTORY = [
  {
    id: 1,
    query: 'Track ISRO Cartosat-3 orbit',
    query_hi: 'इसरो कार्टोसैट-3 कक्षा को ट्रैक करें',
    time: '12m ago',
    time_hi: '12 मिनट पहले',
    tag: 'ISRO',
    tag_hi: 'इसरो',
    desc: 'Real-time telemetry and Doppler shift analysis for LEO orbit node.',
    desc_hi: 'LEO ऑर्बिट नोड के लिए रीयल-टाइम टेलीमेट्री और डॉपलर शिफ्ट विश्लेषण।'
  },
  {
    id: 2,
    query: 'Query ISS position & TLE catalog',
    query_hi: 'ISS स्थिति और TLE कैटलॉग खोजें',
    time: '1h ago',
    time_hi: '1 घंटा पहले',
    tag: 'NORAD',
    tag_hi: 'नोराड',
    desc: 'NORAD Two-Line Element sets updated with current ISS altitude.',
    desc_hi: 'वर्तमान ISS ऊंचाई के साथ अद्यतित NORAD टू-लाइन एलिमेंट सेट।'
  },
  {
    id: 3,
    query: 'Find space debris in Low Earth Orbit',
    query_hi: 'लो अर्थ ऑर्बिट (LEO) में अंतरिक्ष मलबा खोजें',
    time: '3h ago',
    time_hi: '3 घंटे पहले',
    tag: 'Debris',
    tag_hi: 'मलबा',
    desc: 'Collision avoidance risk calculations for active satellite mesh.',
    desc_hi: 'सक्रिय उपग्रह मेश के लिए टकराव परिहार जोखिम गणनाएं।'
  },
  {
    id: 4,
    query: 'Predict Chandrayaan-3 trajectory decay',
    query_hi: 'चंद्रयान-3 प्रक्षेपवक्र क्षय का अनुमान लगाएं',
    time: 'Yesterday',
    time_hi: 'कल',
    tag: 'Moon',
    tag_hi: 'चंद्रमा',
    desc: 'Lunar transfer trajectory & apogee distance modeling.',
    desc_hi: 'चंद्र स्थानांतरण प्रक्षेपवक्र और अपोजी दूरी मॉडलिंग।'
  },
  {
    id: 5,
    query: 'Analyse Sentinel-2 SAR radar imagery',
    query_hi: 'सेंटिनल-2 SAR रडार इमेजरी का विश्लेषण करें',
    time: '2 days ago',
    time_hi: '2 दिन पहले',
    tag: 'Radar',
    tag_hi: 'रडार',
    desc: 'Multispectral false-color infrared terrain scan inspection.',
    desc_hi: 'मल्टीस्पेक्ट्रल फॉल्स-कलर इन्फ्रारेड भूभाग स्कैन निरीक्षण।'
  },
];

const INITIAL_NOTES = [
  {
    id: 1,
    title: 'ISRO Cartosat-3 Orbit & Node Telemetry',
    title_hi: 'इसरो कार्टोसैट-3 कक्षा और नोड टेलीमेट्री',
    content: 'Inclination: 97.5° SSO. Operating altitude ~509 km. High-resolution panchromatic & multispectral sensors active with Doppler frequency correction.',
    content_hi: 'झुकाव: 97.5° SSO। परिचालन ऊंचाई ~509 किमी। डॉपलर आवृत्ति सुधार के साथ उच्च-रिज़ॉल्यूशन पैनक्रोमैटिक और मल्टीस्पेक्ट्रल सेंसर सक्रिय।',
    tag: 'Telemetry',
    tag_hi: 'टेलीमेट्री',
    color: '#a78bfa',
    date: 'Sep 10, 2026',
    date_hi: '10 सित, 2026'
  },
  {
    id: 2,
    title: 'Sentinel-2 Infrared Coastal Scan Analysis',
    title_hi: 'सेंटिनल-2 इन्फ्रारेड तटीय स्कैन विश्लेषण',
    content: 'Multispectral false-color infrared highlights active coral reef ecosystems and coastal erosion patterns along Australian shoreline.',
    content_hi: 'मल्टीस्पेक्ट्रल फॉल्स-कलर इन्फ्रारेड ऑस्ट्रेलियाई तटरेखा के साथ सक्रिय कोरल रीफ पारिस्थितिकी तंत्र और तटीय कटाव पैटर्न को उजागर करता है।',
    tag: 'Earth Scan',
    tag_hi: 'पृथ्वी स्कैन',
    color: '#38bdf8',
    date: 'Sep 09, 2026',
    date_hi: '09 सित, 2026'
  }
];

function GlassSidebar({ activeNav, onNavChange, onSelectQuery, currentUser, onLogout }) {
  const t = useT();
  const { isHindi } = useLanguage();
  const [active, setActive] = useState(activeNav || null);
  const [historyList, setHistoryList] = useState(INITIAL_HISTORY);
  const [historyFilter, setHistoryFilter] = useState('');
  
  // Note Taking State with LocalStorage Persistence
  const [notesList, setNotesList] = useState(() => {
    try {
      const saved = localStorage.getItem('satquery_orbit_notes');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Strip image property from any previously saved notes
        return parsed.map(n => {
          const { image, ...rest } = n;
          return rest;
        });
      }
      return INITIAL_NOTES;
    } catch {
      return INITIAL_NOTES;
    }
  });
  const [noteFilter, setNoteFilter] = useState('');
  const [activeTagFilter, setActiveTagFilter] = useState('All');
  const [isCreatingNote, setIsCreatingNote] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  
  // New Note Form State
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [noteTag, setNoteTag] = useState('Telemetry');
  const [noteDocument, setNoteDocument] = useState(null); // { name, size, data }

  const sidebarRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem('satquery_orbit_notes', JSON.stringify(notesList));
    } catch (e) {
      console.error('Failed to persist notes:', e);
    }
  }, [notesList]);

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

    const currentTagObj = NOTE_TAGS.find(nt => nt.id === noteTag);
    const tagHi = translations.hi[currentTagObj?.labelKey] || noteTag;

    if (editingNoteId) {
      setNotesList(prev => prev.map(n => n.id === editingNoteId ? {
        ...n,
        title: noteTitle.trim(),
        content: noteContent.trim(),
        tag: noteTag,
        tag_hi: tagHi,
        document: noteDocument
      } : n));
      setEditingNoteId(null);
    } else {
      const newNote = {
        id: Date.now(),
        title: noteTitle.trim(),
        content: noteContent.trim(),
        tag: noteTag,
        tag_hi: tagHi,
        color: noteTag === 'Telemetry' ? '#a78bfa' : noteTag === 'Earth Scan' ? '#38bdf8' : noteTag === 'Debris Risk' ? '#f87171' : '#fbbf24',
        document: noteDocument,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        date_hi: new Date().toLocaleDateString('hi-IN', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      setNotesList(prev => [newNote, ...prev]);
    }

    setNoteTitle('');
    setNoteContent('');
    setNoteDocument(null);
    setIsCreatingNote(false);
  };

  const handleEditNote = (note) => {
    setEditingNoteId(note.id);
    setNoteTitle(note.title);
    setNoteContent(note.content);
    setNoteTag(note.tag);
    setNoteDocument(note.document || null);
    setIsCreatingNote(true);
  };

  const handleDeleteNote = (id, e) => {
    e?.stopPropagation();
    setNotesList(prev => prev.filter(n => n.id !== id));
  };

  const handleCopyNote = (note, e) => {
    e?.stopPropagation();
    const tagText = getTagDisplay(note.tag, t, isHindi);
    const textToCopy = `[${tagText}] ${note.title}\nDate: ${note.date}\n\n${note.content}${note.document ? `\nAttached Document: ${note.document.name}` : ''}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      setCopiedId(note.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleExportNotes = () => {
    const exportData = JSON.stringify(notesList, null, 2);
    const blob = new Blob([exportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `satquery_notes_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      setNoteDocument({
        name: file.name,
        size: file.size < 1024 * 1024 ? `${(file.size / 1024).toFixed(1)} KB` : `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        type: file.type || 'document',
        data: uploadEvent.target.result
      });
    };
    reader.readAsDataURL(file);
  };

  const filteredHistory = historyList.filter(item => {
    const q = isHindi ? (item.query_hi || item.query) : item.query;
    const tg = isHindi ? (item.tag_hi || item.tag) : item.tag;
    const d = isHindi ? (item.desc_hi || item.desc) : item.desc;
    const filter = historyFilter.toLowerCase();
    return (
      item.query.toLowerCase().includes(filter) ||
      item.tag.toLowerCase().includes(filter) ||
      item.desc.toLowerCase().includes(filter) ||
      q.toLowerCase().includes(filter) ||
      tg.toLowerCase().includes(filter) ||
      d.toLowerCase().includes(filter)
    );
  });

  const filteredNotes = notesList.filter(note => {
    const title = isHindi ? (note.title_hi || note.title) : note.title;
    const content = isHindi ? (note.content_hi || note.content) : note.content;
    const tag = isHindi ? (note.tag_hi || note.tag) : note.tag;
    const tagDisplay = getTagDisplay(note.tag, t, isHindi);
    const filter = noteFilter.toLowerCase();
    const matchesTag = activeTagFilter === 'All' || 
      note.tag.toLowerCase() === activeTagFilter.toLowerCase() || 
      tag.toLowerCase() === activeTagFilter.toLowerCase() ||
      tagDisplay.toLowerCase() === activeTagFilter.toLowerCase();
    const matchesKeyword = 
      note.title.toLowerCase().includes(filter) ||
      note.content.toLowerCase().includes(filter) ||
      note.tag.toLowerCase().includes(filter) ||
      title.toLowerCase().includes(filter) ||
      content.toLowerCase().includes(filter) ||
      tag.toLowerCase().includes(filter) ||
      tagDisplay.toLowerCase().includes(filter) ||
      (note.document && note.document.name.toLowerCase().includes(filter));
    return matchesTag && matchesKeyword;
  });

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
                    title={t[item.labelKey]}
                    aria-label={t[item.labelKey]}
                  >
                    <span className="glass-nav-pill-icon">
                      <Icon size={18} />
                    </span>
                    <span className="glass-nav-pill-label">
                      {t[item.labelKey]}
                    </span>
                  </button>

                  {/* ── Settings Flyout ── */}
                  {isActive && item.id === 'settings' && (
                    <div className="sidebar-flyout-panel settings-flyout" onClick={(e) => e.stopPropagation()}>
                      <div className="flyout-header">
                        <span className="flyout-title">
                          <Settings size={15} /> {t.systemPreferences}
                        </span>
                        <button className="flyout-icon-btn" onClick={() => setActive(null)}>
                          <X size={14} />
                        </button>
                      </div>
                      <div className="setting-toggle-row">
                        <span>{t.dopplerSync}</span>
                        <input type="checkbox" defaultChecked />
                      </div>
                      <div className="setting-toggle-row">
                        <span>{t.highPrecisionTLE}</span>
                        <input type="checkbox" defaultChecked />
                      </div>
                    </div>
                  )}

                  {/* ── Profile Flyout ── */}
                  {isActive && item.id === 'profile' && (
                    <div className="sidebar-flyout-panel profile-flyout" onClick={(e) => e.stopPropagation()}>
                      <div className="flyout-header">
                        <span className="flyout-title">
                          <User size={15} /> {t.missionOperator}
                        </span>
                        <button className="flyout-icon-btn" onClick={() => setActive(null)}>
                          <X size={14} />
                        </button>
                      </div>
                      <div className="profile-badge-row">
                        <div className="profile-avatar">
                          {currentUser?.username ? currentUser.username.charAt(0).toUpperCase() : 'ISRO'}
                        </div>
                        <div className="profile-meta">
                          <span className="profile-name">{currentUser?.username || 'ISRO Command Center'}</span>
                          <span className="profile-desc">{t.orbitalFlightDynamics}</span>
                        </div>
                      </div>
                      {onLogout && (
                        <button 
                          className="profile-signout-btn" 
                          onClick={() => { onLogout(); setActive(null); }}
                          title={t.signOut}
                        >
                          <LogOut size={14} /> {t.signOut}
                        </button>
                      )}
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
                  <h2 className="history-main-heading">{t.recentQueryHistory}</h2>
                  <p className="history-sub-heading">{t.historySubheading}</p>
                </div>
              </div>

              <div className="history-header-actions">
                {historyList.length > 0 && (
                  <button className="history-clear-btn" onClick={clearHistory} title={t.clearHistory}>
                    <Trash2 size={15} /> {t.clearHistory}
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
                placeholder={t.searchHistoryPlaceholder}
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
                filteredHistory.map((item) => {
                  const displayQuery = isHindi ? (item.query_hi || item.query) : item.query;
                  const displayTag   = isHindi ? (item.tag_hi || item.tag) : item.tag;
                  const displayDesc  = isHindi ? (item.desc_hi || item.desc) : item.desc;
                  const displayTime  = isHindi ? (item.time_hi || item.time) : item.time;
                  return (
                    <div 
                      key={item.id} 
                      className="history-big-item-card"
                      onClick={() => handleHistoryClick(displayQuery)}
                    >
                      <div className="history-item-top">
                        <span className="history-query-title">"{displayQuery}"</span>
                        <span className="history-amber-tag">#{displayTag}</span>
                      </div>
                      <p className="history-query-desc">{displayDesc}</p>
                      <div className="history-item-bottom">
                        <span className="history-time-badge">
                          <Clock size={12} /> {displayTime}
                        </span>
                        <span className="history-launch-prompt">
                          {t.launchQuery} <ChevronRight size={14} />
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="history-empty-box">
                  <Clock size={36} style={{ color: 'rgba(251, 191, 36, 0.4)', marginBottom: '10px' }} />
                  <p style={{ margin: 0, fontWeight: 600 }}>{t.noHistoryFound}</p>
                  <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>{t.clearSearchFilter}</span>
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
                  <h2 className="docs-main-heading">{t.orbitNotesDocs}</h2>
                  <p className="docs-sub-heading">{t.notesSubheading}</p>
                </div>
              </div>

              <div className="docs-header-actions">
                {notesList.length > 0 && (
                  <button className="docs-export-btn" onClick={handleExportNotes} title={t.exportNotes}>
                    <Download size={14} /> {t.exportNotes}
                  </button>
                )}
                <button 
                  className="docs-create-note-btn" 
                  onClick={() => {
                    setIsCreatingNote(!isCreatingNote);
                    setEditingNoteId(null);
                    setNoteTitle('');
                    setNoteContent('');
                    setNoteDocument(null);
                  }}
                >
                  <Plus size={15} /> {isCreatingNote ? t.cancel : t.newNote}
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
                  placeholder={t.noteTitlePlaceholder}
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)}
                    required
                  />
                  <select 
                    className="note-tag-select"
                    value={noteTag}
                    onChange={(e) => setNoteTag(e.target.value)}
                  >
                    {NOTE_TAGS.map(({ id, labelKey }) => (
                      <option key={id} value={id}>
                        #{t[labelKey] || id}
                      </option>
                    ))}
                  </select>
                </div>

                <textarea 
                  className="note-content-textarea"
                  placeholder={t.noteContentPlaceholder}
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  rows={4}
                  required
                />

                {/* Document Attachment Upload */}
                <div className="image-picker-row">
                  <label className="upload-custom-lbl doc-upload">
                    <Paperclip size={14} /> {t.attachDocument}
                    <input type="file" accept=".pdf,.txt,.json,.csv,.doc,.docx" onChange={handleFileUpload} style={{ display: 'none' }} />
                  </label>
                </div>

                {noteDocument && (
                  <div className="attached-doc-badge">
                    <FileCheck size={14} />
                    <span className="doc-name">{noteDocument.name} ({noteDocument.size})</span>
                    <button type="button" className="doc-remove-btn" onClick={() => setNoteDocument(null)}>
                      <X size={12} />
                    </button>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '12px' }}>
                  <button 
                    type="button"
                    className="history-clear-btn"
                    onClick={() => {
                      setIsCreatingNote(false);
                      setEditingNoteId(null);
                      setNoteTitle('');
                      setNoteContent('');
                      setNoteDocument(null);
                    }}
                  >
                    {t.cancel}
                  </button>
                  <button type="submit" className="save-note-submit-btn">
                    <Save size={15} /> {editingNoteId ? t.updateNote : t.saveNote2}
                  </button>
                </div>
              </form>
            ) : (
              <>
                {/* Search Filter Bar Purple */}
                <div className="docs-search-bar-purple">
                  <Search size={16} style={{ color: '#a78bfa' }} />
                  <input 
                    type="text" 
                    className="history-filter-input"
                  placeholder={t.searchNotesPlaceholder}
                    value={noteFilter}
                    onChange={(e) => setNoteFilter(e.target.value)}
                  />
                  {noteFilter && (
                    <button className="history-filter-clear" onClick={() => setNoteFilter('')}>
                      <X size={13} />
                    </button>
                  )}
                </div>

                {/* Quick Tag Filter Pills */}
                <div className="notes-tag-pills">
                  <button
                    className={`notes-tag-pill ${activeTagFilter === 'All' ? 'active' : ''}`}
                    onClick={() => setActiveTagFilter('All')}
                  >
                    {t.allNotes}
                  </button>
                  {NOTE_TAGS.map(({ id, labelKey }) => (
                    <button
                      key={id}
                      className={`notes-tag-pill ${activeTagFilter === id ? 'active' : ''}`}
                      onClick={() => setActiveTagFilter(id)}
                    >
                      #{t[labelKey] || id}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Saved Notes Grid */}
            {!isCreatingNote && (
              <div className="notes-grid-list">
                {filteredNotes.length > 0 ? (
                  filteredNotes.map((note) => {
                    const displayTitle = isHindi ? (note.title_hi || note.title) : note.title;
                    const displayTag = getTagDisplay(note.tag, t, isHindi);
                    const displayContent = isHindi ? (note.content_hi || note.content) : note.content;
                    const displayDate = isHindi ? (note.date_hi || note.date) : note.date;
                    return (
                      <div key={note.id} className="note-card-item">
                        <div className="note-card-body">
                          <div className="note-card-top">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                              <h3 className="note-card-title">{displayTitle}</h3>
                              <span className="note-purple-tag">#{displayTag}</span>
                            </div>
                            <div className="note-card-actions">
                              <button 
                                className="note-action-icon" 
                                onClick={(e) => handleCopyNote({ ...note, title: displayTitle, content: displayContent, tag: displayTag, date: displayDate }, e)} 
                                title={t.copyNoteText || "Copy Note Text"}
                              >
                                {copiedId === note.id ? <Check size={14} color="#34d399" /> : <Copy size={14} />}
                              </button>
                              <button className="note-action-icon" onClick={() => handleEditNote(note)} title={t.editNoteTitle || "Edit Note"}>
                                <Edit3 size={14} />
                              </button>
                              <button className="note-action-icon delete" onClick={(e) => handleDeleteNote(note.id, e)} title={t.deleteNoteTitle || "Delete Note"}>
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                          <p className="note-card-content">{displayContent}</p>
                          
                          {note.document && (
                            <div className="note-doc-pill">
                              <Paperclip size={12} />
                              <span>{note.document.name}</span>
                              <span className="note-doc-size">{note.document.size}</span>
                            </div>
                          )}

                          <span className="note-card-date">{displayDate}</span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="history-empty-box">
                    <FileText size={36} style={{ color: 'rgba(167, 139, 250, 0.4)', marginBottom: '10px' }} />
                    <p style={{ margin: 0, fontWeight: 600 }}>{t.noNotesYet}</p>
                    <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>{t.noNotesHint}</span>
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
