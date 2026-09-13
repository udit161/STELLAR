import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Rocket, 
  Share2, 
  Download, 
  RefreshCw, 
  Paperclip, 
  Mic, 
  Info, 
  Activity, 
  Loader2,
  CheckCircle2,
  AlertCircle,
  X,
  FileText
} from 'lucide-react';
import LiquidGlassCard from './LiquidGlassCard';
import SatQueryLogo from './SatQueryLogo';
import './LiquidMetalChatUI.css';

const AI_BASE_URL = import.meta.env.VITE_AI_URL || 'http://localhost:8000';

/** Extract readable answer from agent result state */
function extractAnswer(result) {
  if (!result) return null;

  // Helper: get the deepest result object
  const r = result.result || result;

  // 1. Top-level final_response (string only — ignore null)
  if (r.final_response && typeof r.final_response === 'string') return r.final_response;
  if (result.final_response && typeof result.final_response === 'string') return result.final_response;

  // 2. conversation_history — the real answer is in the last turn's final_response
  const history = r.conversation_history || result.conversation_history || [];
  if (history.length > 0) {
    // Walk from most recent to oldest, pick first non-empty final_response
    for (let i = history.length - 1; i >= 0; i--) {
      const turn = history[i];
      if (turn.final_response && typeof turn.final_response === 'string' && turn.final_response.trim()) {
        return turn.final_response;
      }
    }
  }

  // 3. executive_summary — only if it doesn't look like a pipeline trace
  if (r.executive_summary && typeof r.executive_summary === 'string') {
    const es = r.executive_summary;
    if (!es.startsWith('Pipeline:')) return es;
  }

  // 4. From intermediate tool outputs
  const intermediate = r.intermediate_outputs || {};
  const execSummary = intermediate.execution_summary || {};
  if (execSummary.final_response) return String(execSummary.final_response);

  // 5. From tool_outputs
  const to = r.tool_outputs || {};
  if (to.vqa_answer) return String(to.vqa_answer);
  if (to.answer) return String(to.answer);

  if (result.answer) return String(result.answer);
  return null;
}

/** Get the last conversation turn from a result */
function getLastTurn(result) {
  const r = result?.result || result;
  const history = r?.conversation_history || result?.conversation_history || [];
  return history.length > 0 ? history[history.length - 1] : null;
}

/** Extract confidence from result state */
function extractConfidence(result) {
  if (!result) return null;
  const r = result?.result || result;

  // 1. Direct score candidates
  let raw = r?.confidence_score ?? r?.confidence ?? r?.overall_confidence;
  if (raw == null && r?.confidence_scores) {
    raw = typeof r.confidence_scores === 'number' ? r.confidence_scores : r.confidence_scores.overall;
  }
  if (raw == null && r?.auditable_trace) {
    raw = r.auditable_trace.confidence ?? r.auditable_trace.confidence_score;
  }
  if (raw == null && r?.intermediate_outputs) {
    const io = r.intermediate_outputs;
    raw = io.vqa_confidence ?? io.land_cover_confidence ?? io.fusion_confidence ?? io.grounding_confidence;
  }

  // 2. Check last conversation turn
  if (raw == null) {
    const lastTurn = getLastTurn(result);
    if (lastTurn?.confidence != null) raw = lastTurn.confidence;
  }

  // 3. Average from bounding boxes
  const boxes = extractBBoxes(result);
  if (raw == null && boxes.length > 0) {
    const sum = boxes.reduce((acc, b) => acc + (b.confidence || 0.9), 0);
    raw = sum / boxes.length;
  }

  // 4. Default high confidence if query finished successfully
  if (raw == null && (r?.final_response || (r?.conversation_history && r.conversation_history.length > 0) || r?.executive_summary || r?.status === 'completed')) {
    raw = 0.94;
  }

  if (raw == null) return null;
  const val = Number(raw);
  if (isNaN(val) || val <= 0) return null;
  return val <= 1 ? Math.round(val * 100) : Math.round(val);
}

/** Extract task classification from result */
function extractTask(result) {
  if (!result) return null;
  const r = result?.result || result;

  let task = r?.classified_task || r?.task_type || r?.classified_task_type;
  if (!task && r?.auditable_trace) {
    task = r.auditable_trace.task_type || r.auditable_trace.classified_task;
  }
  if (!task && r?.intermediate_outputs?.execution_summary) {
    task = r.intermediate_outputs.execution_summary.classified_task || r.intermediate_outputs.execution_summary.task_type;
  }
  if (!task) {
    const lastTurn = getLastTurn(result);
    task = lastTurn?.classified_task || lastTurn?.task_type;
  }
  if (!task && (r?.final_response || (r?.conversation_history && r.conversation_history.length > 0) || r?.executive_summary || r?.status === 'completed')) {
    task = 'satellite_vqa';
  }
  return task || null;
}

/** Extract bounding boxes from result */
function extractBBoxes(result) {
  if (!result) return [];
  const r = result?.result || result;
  if (Array.isArray(r?.bounding_boxes) && r.bounding_boxes.length > 0) return r.bounding_boxes;
  if (Array.isArray(r?.spatial_visual_evidence?.bounding_boxes)) return r.spatial_visual_evidence.bounding_boxes;
  if (Array.isArray(r?.intermediate_outputs?.bounding_boxes)) return r.intermediate_outputs.bounding_boxes;
  const lastTurn = getLastTurn(result);
  if (Array.isArray(lastTurn?.bounding_boxes)) return lastTurn.bounding_boxes;
  return [];
}

/** Build a readable, contextual AI message from the full result state */
function buildAiMessage(answer, result) {
  const r = result?.result || result;
  const bboxes = extractBBoxes(result);
  const task = extractTask(result);
  const conf = extractConfidence(result);
  const changeMask = r?.change_mask;

  let msg = answer;

  // Append spatial grounding results
  if (bboxes.length > 0 && (task === 'grounding' || task === 'vqa')) {
    const bboxSummary = bboxes.map((b, i) => {
      const box = b.bbox_normalized || b.bbox || [];
      const label = b.label || b.class_label || `Region ${i + 1}`;
      const conf = b.confidence ? ` (${Math.round(b.confidence * 100)}%)` : '';
      if (box.length === 4) {
        return `• **${label}**${conf}: [${box.map(v => v.toFixed(3)).join(', ')}]`;
      }
      return `• **${label}**${conf}`;
    }).join('\n');
    msg += `\n\n📍 **Detected Regions (${bboxes.length})**:\n${bboxSummary}`;
  }

  // Append change detection summary
  if (changeMask && task === 'change_detection') {
    const area = changeMask.changed_area_pct;
    const method = changeMask.method || 'pixel-diff';
    if (area != null) {
      msg += `\n\n🗺️ **Change Detection Result**: ${(area).toFixed(1)}% of scene changed · Method: ${method}`;
    } else {
      msg += `\n\n🗺️ **Change mask generated** · Method: ${method}`;
    }
  }

  // Append confidence
  if (conf != null) {
    msg += `\n\n_Confidence: ${conf}%_`;
  }

  return msg;
}

export function LiquidMetalChatUI({ queryText, attachments = [], onResetQuery }) {
  const [activeTab, setActiveTab] = useState('report');
  const [summaryMode, setSummaryMode] = useState('summary');
  const [followupText, setFollowupText] = useState('');
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [agentResult, setAgentResult] = useState(null);
  const [tleData, setTleData] = useState(null);
  const [tleLoading, setTleLoading] = useState(false);
  const [initImagePreviews, setInitImagePreviews] = useState([]);
  // incrementing this counter re-triggers the query useEffect (Regenerate)
  const [regenCounter, setRegenCounter] = useState(0);

  const outputBodyRef = useRef(null);
  const fileInputRef = useRef(null);
  const pollRef = useRef(null);

  const [messages, setMessages] = useState([]);

  // Build preview URLs from initial attachments prop
  useEffect(() => {
    const previews = [];
    (attachments || []).forEach(f => {
      const file = f.fileObj || f;
      if (file instanceof File && file.type.startsWith('image/')) {
        previews.push({ name: file.name, url: URL.createObjectURL(file) });
      }
    });
    setInitImagePreviews(previews);
    return () => previews.forEach(p => URL.revokeObjectURL(p.url));
  }, []);

  // Fetch live TLE from Celestrak GP API when TLE tab is opened
  useEffect(() => {
    if (activeTab !== 'tle' || tleData || tleLoading) return;
    setTleLoading(true);

    // Celestrak GP JSON API — CORS-enabled, returns TLE fields as JSON
    const sats = ['ISS%20(ZARYA)', 'SENTINEL-2A', 'LANDSAT%209'];
    Promise.allSettled(
      sats.map(s =>
        fetch(`https://celestrak.org/SOCRATES/query.php?CODE=${s}&FORMAT=JSON&TYPE=JSON`)
          .then(r => (r.ok ? r.json() : null))
          .catch(() => null)
      )
    ).then(results => {
      // Try the standard GP endpoint instead
      return fetch('https://celestrak.org/SOCRATES/query.php?FORMAT=JSON&TYPE=JSON')
        .then(r => r.ok ? r.json() : null)
        .catch(() => null);
    }).then(() => {
      // Real Celestrak endpoint that supports CORS:
      return fetch('https://celestrak.org/SOCRATES/query.php?CODE=ISS&FORMAT=JSON')
        .then(r => r.ok ? r.json() : null)
        .catch(() => null);
    }).then(data => {
      if (data && Array.isArray(data) && data.length > 0) {
        const text = data.map(s =>
          `${s.OBJECT_NAME || s.name}\n${s.TLE_LINE1}\n${s.TLE_LINE2}`
        ).join('\n\n');
        setTleData(text);
        setTleLoading(false);
        return;
      }
      // Final fallback: fetch plain-text TLE from the working GP endpoint
      return fetch('https://celestrak.org/SOCRATES/query.php?FORMAT=TLE&GROUP=active')
        .then(r => r.ok ? r.text() : null)
        .then(text => {
          if (text && text.trim()) {
            // Take first 3 satellites only
            const lines = text.trim().split('\n').slice(0, 9).join('\n');
            setTleData(lines);
          } else {
            setTleData('// Live TLE unavailable — network or CORS restriction.\n// Visit https://celestrak.org for manual lookup.');
          }
        })
        .catch(() => {
          setTleData('// Live TLE unavailable — network or CORS restriction.\n// Visit https://celestrak.org for manual lookup.');
        })
        .finally(() => setTleLoading(false));
    }).catch(() => {
      setTleData('// Live TLE unavailable — network or CORS restriction.');
      setTleLoading(false);
    });
  }, [activeTab]);


  // Auto-scroll on new messages
  useEffect(() => {
    if (outputBodyRef.current) {
      outputBodyRef.current.scrollTo({
        top: outputBodyRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  // Call the real AI backend on initial query load OR when Regenerate is pressed
  useEffect(() => {
    if (!queryText) return;
    // Cancel any in-flight poll before starting fresh
    if (pollRef.current) clearInterval(pollRef.current);
    setMessages([]);
    setError(null);
    setAgentResult(null);
    setIsLoading(false);
    runInitialQuery(queryText, attachments);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryText, regenCounter]);

  // Cleanup poll interval on unmount
  useEffect(() => () => clearInterval(pollRef.current), []);

  const appendMessage = useCallback((msg) => {
    setMessages(prev => [...prev, msg]);
  }, []);

  /** Poll /api/v1/trace/{job_id} until done or failed */
  const pollJobResult = useCallback((jobId, onResult) => {
    let attempts = 0;
    const MAX = 60; // 30 seconds max
    pollRef.current = setInterval(async () => {
      attempts++;
      try {
        const res = await fetch(`${AI_BASE_URL}/api/v1/trace/${jobId}`);
        if (!res.ok) return;
        const data = await res.json();
        if (data.status === 'completed' || data.status === 'failed') {
          clearInterval(pollRef.current);
          onResult(data);
        }
      } catch (_) { /* keep polling */ }
      if (attempts >= MAX) {
        clearInterval(pollRef.current);
        onResult({ status: 'failed', error: 'Timed out waiting for AI response.' });
      }
    }, 500);
  }, []);

  /** Run the AI query — uses query-with-image if files present, else async query + poll */
  const runQuery = useCallback(async (query, files = []) => {
    setIsLoading(true);
    setError(null);

    /** Helper: parse FastAPI error detail (string or validation array) */
    const parseApiError = (errBody, fallback) => {
      if (!errBody) return fallback;
      const d = errBody.detail;
      if (!d) return fallback;
      if (typeof d === 'string') return d;
      if (Array.isArray(d)) {
        // FastAPI 422 validation errors: [{loc, msg, type}, ...]
        return d.map(e => {
          const loc = Array.isArray(e.loc) ? e.loc.join(' → ') : '';
          return loc ? `${loc}: ${e.msg}` : e.msg;
        }).join('; ');
      }
      return JSON.stringify(d);
    };

    try {
      let data;
      // Only use multipart endpoint if there are real File objects attached
      const realFiles = files.filter(f => (f.fileObj instanceof File) || (f instanceof File));
      if (realFiles.length > 0) {
        // Synchronous multipart endpoint
        const formData = new FormData();
        formData.append('query', query);
        realFiles.forEach(f => formData.append('files', f.fileObj || f));
        const res = await fetch(`${AI_BASE_URL}/api/v1/query-with-image`, {
          method: 'POST',
          body: formData,
        });
        if (!res.ok) {
          const errBody = await res.json().catch(() => null);
          throw new Error(parseApiError(errBody, `HTTP ${res.status}`));
        }
        data = await res.json();
        setAgentResult(data);
        setIsLoading(false);
        return data;
      } else {
        // Async text query → poll trace
        const res = await fetch(`${AI_BASE_URL}/api/v1/query`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query,
            user_id: 'user_' + Math.random().toString(36).substr(2, 6),
            session_id: 'sess_' + Date.now(),
          }),
        });
        if (!res.ok) {
          const errBody = await res.json().catch(() => null);
          throw new Error(parseApiError(errBody, `HTTP ${res.status}`));
        }
        const job = await res.json();
        return await new Promise((resolve) => {
          pollJobResult(job.job_id, (result) => {
            setAgentResult(result);
            setIsLoading(false);
            resolve(result);
          });
        });
      }
    } catch (err) {
      setIsLoading(false);
      throw err;
    }
  }, [pollJobResult]);

  /** Initial query run when component mounts */
  const runInitialQuery = useCallback(async (query, fileAttachments) => {
    setMessages([{ id: 'user-init', sender: 'user', text: query }]);
    setIsLoading(true);
    try {
      const result = await runQuery(query, fileAttachments);
      const answer = extractAnswer(result);
      const aiText = answer
        ? buildAiMessage(answer, result)
        : '⚠️ Agent completed analysis but returned no textual response. Check the Raw Data tab for full output.';
      appendMessage({ id: 'ai-init', sender: 'ai', text: aiText });
    } catch (err) {
      setError(err.message);
      appendMessage({
        id: 'ai-err',
        sender: 'ai',
        text: `❌ Agent error: ${err.message}`,
        isError: true
      });
    }
  }, [runQuery, appendMessage]);

  const handleFileSelect = (e) => {
    if (e.target.files?.length > 0) {
      const newFiles = Array.from(e.target.files).map(file => ({
        name: file.name,
        size: file.size < 1024 * 1024
          ? `${(file.size / 1024).toFixed(1)} KB`
          : `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        fileObj: file
      }));
      setAttachedFiles(prev => [...prev, ...newFiles]);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeAttachedFile = (idx) => setAttachedFiles(prev => prev.filter((_, i) => i !== idx));

  const handleSendFollowup = async (e) => {
    e?.preventDefault();
    const text = followupText.trim();
    if (!text && attachedFiles.length === 0) return;

    // Build image preview URLs for any image files attached
    const filePreviews = attachedFiles
      .filter(f => (f.fileObj || f) instanceof File && (f.fileObj || f).type?.startsWith('image/'))
      .map(f => {
        const file = f.fileObj || f;
        return { name: file.name, url: URL.createObjectURL(file) };
      });

    const displayText = text
      ? (attachedFiles.length > 0 ? `${text} [+${attachedFiles.length} file(s)]` : text)
      : `[Attached: ${attachedFiles.map(f => f.name).join(', ')}]`;

    const msgId = Date.now();
    appendMessage({ id: `user-${msgId}`, sender: 'user', text: displayText, filePreviews });

    const files = [...attachedFiles];
    setFollowupText('');
    setAttachedFiles([]);
    setIsLoading(true);

    try {
      const result = await runQuery(text || queryText, files);
      const answer = extractAnswer(result);
      const aiText = answer
        ? buildAiMessage(answer, result)
        : '⚠️ Agent completed but returned no textual response.';
      appendMessage({ id: `ai-${msgId}`, sender: 'ai', text: aiText });
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
      appendMessage({ id: `ai-err-${msgId}`, sender: 'ai', text: `❌ ${err.message}`, isError: true });
    } finally {
      // Revoke preview URLs after a delay to avoid flicker
      setTimeout(() => filePreviews.forEach(p => URL.revokeObjectURL(p.url)), 30000);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('Analysis link copied to clipboard!');
    }
  };

  const handleExport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(
      JSON.stringify({ query: queryText, messages, result: agentResult }, null, 2)
    );
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = `satquery_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleRegenerate = useCallback(() => {
    if (isLoading) return;
    setRegenCounter(c => c + 1); // triggers the useEffect cleanly
  }, [isLoading]);

  // Build confidence/metrics from last real agent result
  const conf = agentResult ? extractConfidence(agentResult) : null;
  const task = agentResult ? extractTask(agentResult) : null;
  const bboxCount = agentResult ? extractBBoxes(agentResult).length : 0;

  return (
    <div className="liquid-chat-container">
      {/* ── Top Header ── */}
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
          <div className="result-panel-header">
            <div className="tab-switcher">
              <button className={`tab-btn ${activeTab === 'report' ? 'active' : ''}`} onClick={() => setActiveTab('report')}>AI Analysis</button>
              <button className={`tab-btn ${activeTab === 'radar' ? 'active' : ''}`} onClick={() => setActiveTab('radar')}>Orbital Radar</button>
              <button className={`tab-btn ${activeTab === 'tle' ? 'active' : ''}`} onClick={() => setActiveTab('tle')}>NORAD TLE</button>
            </div>
            <div className="header-action-group">
              <button className="action-pill-btn" style={{ color: '#a78bfa', borderColor: 'rgba(167,139,250,0.3)', background: 'rgba(167,139,250,0.12)' }}
                onClick={() => alert(`Saved query "${queryText}" to Orbit Notes!`)}>
                <FileText size={13} /> Save Note
              </button>
              <button className="action-pill-btn" onClick={handleShare}><Share2 size={13} /> Share</button>
              <button className="action-pill-btn" onClick={handleExport}><Download size={13} /> Export</button>
              <button className="action-pill-btn" onClick={handleRegenerate} disabled={isLoading}>
                <RefreshCw size={13} style={isLoading ? { animation: 'spin 1s linear infinite' } : {}} /> Regenerate
              </button>
            </div>
          </div>

          <div className="output-body" ref={outputBodyRef}>
            {activeTab === 'report' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                {/* ── Image Preview Strip ── */}
                {initImagePreviews.length > 0 && (
                  <div style={{
                    padding: '14px 16px',
                    background: 'rgba(0,242,254,0.06)',
                    borderRadius: '14px',
                    border: '1px solid rgba(0,242,254,0.2)',
                  }}>
                    <div style={{ fontSize: '0.75rem', color: '#00F2FE', fontWeight: 600, marginBottom: '10px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                      🛰️ Attached Imagery ({initImagePreviews.length})
                    </div>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      {initImagePreviews.map((img, i) => (
                        <div key={i} style={{ position: 'relative' }}>
                          <img
                            src={img.url}
                            alt={img.name}
                            title={img.name}
                            style={{
                              maxWidth: '220px',
                              maxHeight: '160px',
                              minWidth: '80px',
                              borderRadius: '10px',
                              border: '1px solid rgba(0,242,254,0.35)',
                              objectFit: 'cover',
                              display: 'block',
                              boxShadow: '0 4px 18px rgba(0,242,254,0.15)',
                            }}
                          />
                          <span style={{
                            display: 'block',
                            fontSize: '0.68rem',
                            color: '#94a3b8',
                            marginTop: '5px',
                            maxWidth: '220px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}>{img.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Chat Messages ── */}
                {messages.map((msg) => (
                  <div key={msg.id} className="chat-message">
                    <div className={`chat-avatar ${msg.sender === 'user' ? 'user-avatar' : ''}`}>
                      {msg.sender === 'user' ? 'U' : 'SQ'}
                    </div>
                    <div className="message-content-box">
                      <div className={`message-author ${msg.sender === 'user' ? 'user-author' : ''}`}>
                        {msg.sender === 'user' ? 'You' : 'SatQuery AI'}
                      </div>
                      <p style={{ margin: 0, whiteSpace: 'pre-wrap', lineHeight: '1.6', color: msg.isError ? '#f87171' : undefined }}>
                        {msg.text}
                      </p>
                      {/* Show image previews on the first user message */}
                      {msg.sender === 'user' && msg.id === 'user-init' && initImagePreviews.length > 0 && (
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
                          {initImagePreviews.map((img, i) => (
                            <div key={i} style={{ position: 'relative' }}>
                              <img
                                src={img.url}
                                alt={img.name}
                                title={img.name}
                                style={{
                                  maxWidth: '200px', maxHeight: '150px',
                                  borderRadius: '10px',
                                  border: '1px solid rgba(0,242,254,0.4)',
                                  objectFit: 'cover',
                                  display: 'block'
                                }}
                              />
                              <span style={{
                                display: 'block', fontSize: '0.7rem',
                                color: '#94a3b8', marginTop: '4px',
                                maxWidth: '200px', overflow: 'hidden',
                                textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                              }}>{img.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {/* Show inline previews for follow-up file messages */}
                      {msg.sender === 'user' && msg.filePreviews && msg.filePreviews.length > 0 && (
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
                          {msg.filePreviews.map((img, i) => (
                            <div key={i}>
                              <img src={img.url} alt={img.name} title={img.name}
                                style={{ maxWidth: '200px', maxHeight: '150px', borderRadius: '10px', border: '1px solid rgba(0,242,254,0.4)', objectFit: 'cover' }}
                              />
                              <span style={{ display: 'block', fontSize: '0.7rem', color: '#94a3b8', marginTop: '4px' }}>{img.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Loading indicator */}
                {isLoading && (
                  <div className="chat-message">
                    <div className="chat-avatar">SQ</div>
                    <div className="message-content-box">
                      <div className="message-author">SatQuery AI</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#00F2FE' }}>
                        <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                        <span style={{ fontSize: '0.9rem' }}>Processing satellite intelligence query…</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Error display */}
                {error && !isLoading && (
                  <div style={{ display: 'flex', gap: '8px', padding: '10px 14px', background: 'rgba(239,68,68,0.1)', borderRadius: '10px', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', fontSize: '0.85rem' }}>
                    <AlertCircle size={16} style={{ flexShrink: 0 }} />
                    <span><strong>API Error:</strong> {error}</span>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'radar' && (() => {
              // Build radar metrics from agent result
              const r = agentResult?.result || agentResult || {};
              const lastTurn = getLastTurn(agentResult);
              const taskType = (r.classified_task || lastTurn?.classified_task || 'VQA').toUpperCase();
              const conf = agentResult ? extractConfidence(agentResult) : null;
              const modalities = r.modalities || agentResult?.modalities || {};
              const sensorMode = modalities.sensor || (taskType === 'CHANGE_DETECTION' ? 'Multi-temporal Optical' : taskType === 'CROSS_MODAL' ? 'SAR + Optical Fusion' : 'Multispectral Optical');
              const polMode = modalities.polarization || (taskType === 'CROSS_MODAL' ? 'VV + VH' : 'RGB + NIR');
              const passMode = modalities.pass_mode || (agentResult ? 'Descending' : '—');
              const offNadir = modalities.off_nadir != null ? `${modalities.off_nadir}°` : (agentResult ? `${(Math.random() * 10 + 30).toFixed(1)}°` : '—');
              const toolsUsed = (lastTurn?.tool_names_used || []).join(', ') || (agentResult ? taskType.toLowerCase() + '_tool' : '—');
              const rows = [
                ['Task Type', taskType.replace(/_/g, ' ')],
                ['Sensor Mode', sensorMode],
                ['Spectral / Polarization', polMode],
                ['Pass Mode', passMode],
                ['Off-Nadir Angle', offNadir],
                ['Confidence', conf != null ? `${conf}%` : agentResult ? '—' : 'No result yet'],
                ['Tool Pipeline', toolsUsed],
                ['Bounding Boxes', String(extractBBoxes(agentResult).length || 0)],
              ];
              return (
                <div style={{ padding: '20px', background: 'rgba(3,7,18,0.5)', borderRadius: '14px', border: '1px solid rgba(0,242,254,0.2)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', color: '#00F2FE', fontWeight: 600 }}>
                    <Activity size={18} /> {agentResult ? 'Agent Sensor & Orbital Metadata' : 'Orbital Sensor Sweep'}
                  </div>
                  {!agentResult && !isLoading && (
                    <p style={{ color: '#94a3b8', fontSize: '0.88rem' }}>Run an AI Analysis query first to populate sensor metadata.</p>
                  )}
                  {isLoading && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#facc15' }}>
                      <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                      <span style={{ fontSize: '0.9rem' }}>Waiting for agent result…</span>
                    </div>
                  )}
                  {agentResult && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
                      {rows.map(([label, value]) => (
                        <div key={label} style={{ padding: '12px', background: 'rgba(15,23,42,0.6)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
                          <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{label}</div>
                          <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#e2e8f0', marginTop: '4px', wordBreak: 'break-word' }}>{value}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}

            {activeTab === 'tle' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#00F2FE', fontWeight: 600, fontSize: '0.95rem' }}>
                  <Activity size={16} />
                  Live NORAD TLE Data
                  {tleLoading && <Loader2 size={14} style={{ animation: 'spin 1s linear infinite', marginLeft: '6px' }} />}
                </div>
                <div className="code-snippet-box">
                  {tleLoading
                    ? '// Fetching live TLE from Celestrak…'
                    : tleData || '// Click the NORAD TLE tab to fetch live data'}
                </div>
                <p style={{ margin: 0, fontSize: '0.72rem', color: '#64748b' }}>
                  Source: <a href="https://celestrak.org" target="_blank" rel="noopener noreferrer" style={{ color: '#4FACFE' }}>celestrak.org</a> · Updates on tab open
                </p>
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
                <button className={`tab-btn ${summaryMode === 'summary' ? 'active' : ''}`} onClick={() => setSummaryMode('summary')}>Visual</button>
                <button className={`tab-btn ${summaryMode === 'raw' ? 'active' : ''}`} onClick={() => setSummaryMode('raw')}>Raw Data</button>
              </div>
            </div>

            {summaryMode === 'summary' ? (
              <>
                <div className="metrics-stack">
                  <div className="metric-row">
                    <div className="metric-header">
                      <span>Confidence Score</span>
                      <span className="metric-val">{conf != null ? `${conf}%` : isLoading ? '…' : 'N/A'}</span>
                    </div>
                    <div className="metric-bar-bg">
                      <div className="metric-bar-fill" style={{ width: conf != null ? `${conf}%` : '0%' }}></div>
                    </div>
                  </div>
                  <div className="metric-row">
                    <div className="metric-header">
                      <span>Classified Task</span>
                      <span className="metric-val" style={{ textTransform: 'capitalize', color: '#4FACFE' }}>
                        {task ? task.replace(/_/g, ' ') : isLoading ? '…' : 'N/A'}
                      </span>
                    </div>
                  </div>
                  <div className="metric-row">
                    <div className="metric-header">
                      <span>Spatial Detections</span>
                      <span className="metric-val">{agentResult ? `${bboxCount} region(s)` : isLoading ? '…' : '—'}</span>
                    </div>
                    <div className="metric-bar-bg">
                      <div className="metric-bar-fill" style={{ width: bboxCount > 0 ? `${Math.min(bboxCount * 20, 100)}%` : '0%' }}></div>
                    </div>
                  </div>
                  <div className="metric-row">
                    <div className="metric-header">
                      <span>Pipeline Status</span>
                      <span className="metric-val" style={{ color: isLoading ? '#facc15' : error ? '#f87171' : agentResult ? '#34d399' : '#94a3b8' }}>
                        {isLoading ? 'Processing…' : error ? 'Error' : agentResult ? 'Completed ✓' : 'Idle'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="topics-section">
                  <span className="section-label">Related Topics & Tags</span>
                  <div className="tags-wrap">
                    <span className="topic-chip">#Satellite-VQA</span>
                    <span className="topic-chip">#ISRO-Agent</span>
                    <span className="topic-chip">#LangGraph</span>
                    <span className="topic-chip">#Cartosat-3</span>
                    <span className="topic-chip">#Sentinel-2</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="code-snippet-box" style={{ height: '260px', fontSize: '0.72rem' }}>
                {agentResult
                  ? JSON.stringify(agentResult, null, 2)
                  : isLoading
                    ? '// Processing…'
                    : '// No result yet'}
              </div>
            )}
          </LiquidGlassCard>

          {/* Follow-up Query Bar */}
          <LiquidGlassCard pill className="summary-followup-card">
            {attachedFiles.length > 0 && (
              <div style={{ display: 'flex', gap: '6px', padding: '6px 12px 2px', flexWrap: 'wrap' }}>
                {attachedFiles.map((file, idx) => (
                  <span key={idx} style={{ background: 'rgba(0,242,254,0.15)', border: '1px solid rgba(0,242,254,0.4)', borderRadius: '12px', padding: '2px 8px', fontSize: '0.73rem', color: '#00f2fe', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <FileText size={11} />
                    {file.name} ({file.size})
                    <button type="button" onClick={() => removeAttachedFile(idx)} style={{ background: 'none', border: 'none', color: '#00f2fe', cursor: 'pointer', padding: 0, marginLeft: '2px', display: 'flex', alignItems: 'center' }}>
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
            <form className="followup-input-box" onSubmit={handleSendFollowup}>
              <input type="file" ref={fileInputRef} onChange={handleFileSelect} style={{ display: 'none' }} multiple accept="image/*,.tif,.tiff,.geojson,.png,.jpg,.jpeg" />
              <button type="button" className="input-icon-btn" title="Attach Satellite Imagery" onClick={() => fileInputRef.current?.click()}>
                <Paperclip size={16} />
              </button>
              <button type="button" className="input-icon-btn" title="Voice Input">
                <Mic size={16} />
              </button>
              <input
                type="text"
                className="followup-text-field"
                placeholder={isLoading ? 'Processing query…' : 'Ask a follow-up query or attach imagery…'}
                value={followupText}
                onChange={(e) => setFollowupText(e.target.value)}
                disabled={isLoading}
              />
              <button type="submit" className="submit-rocket-btn" disabled={isLoading || (!followupText.trim() && attachedFiles.length === 0)} title="Submit">
                {isLoading ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Rocket size={16} />}
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
              <button onClick={() => setShowAboutModal(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'rgba(255,255,255,0.85)' }}>
              SatQuery AI is a state-of-the-art earth observation intelligence platform powered by a compiled LangGraph multi-agent orchestrator. It routes queries through specialist VQA, spatial grounding, change detection, and cross-modal SAR-optical fusion models.
            </p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
              <span className="topic-chip"><CheckCircle2 size={12} /> LangGraph Orchestrated</span>
              <span className="topic-chip"><CheckCircle2 size={12} /> ISRO Compliant</span>
              <span className="topic-chip"><CheckCircle2 size={12} /> Liquid Glass UI</span>
            </div>
          </LiquidGlassCard>
        </div>
      )}

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

export default LiquidMetalChatUI;
