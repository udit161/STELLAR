import React, { useState, useEffect } from 'react';
import { 
  X, 
  Crown, 
  Search, 
  Server, 
  Palette, 
  Code, 
  Monitor, 
  Rocket, 
  Cpu, 
  Globe, 
  ShieldCheck, 
  Sparkles,
  Users,
  Layers
} from 'lucide-react';
import { useT, useLanguage } from '../context/LanguageContext';
import './AboutModal.css';

/**
 * Original Debugg DYNASTY. Logo Component
 * Renders the exact typography matching the user's provided logo image.
 */
function DebuggDynastyLogo({ size = 'medium' }) {
  return (
    <div className={`debugg-logo-original ${size}`}>
      <span className="text-debugg">Debugg</span>
      <span className="text-dynasty">DYNASTY.</span>
    </div>
  );
}

/**
 * Inline India Flag Badge for About Modal (Left Side of Team Logo)
 */
function IndiaBadgeInline() {
  const t = useT();
  const spokes = Array.from({ length: 24 }).map((_, i) => {
    const angle = (i * 360) / 24;
    const rad = (angle * Math.PI) / 180;
    return {
      x1: 50 + 6 * Math.cos(rad),
      y1: 50 + 6 * Math.sin(rad),
      x2: 50 + 43 * Math.cos(rad),
      y2: 50 + 43 * Math.sin(rad),
    };
  });

  return (
    <div className="india-badge-inline-wrap">
      <div className="india-blob-frame">
        <div className="india-blob-halo" />
        <div className="india-blob-ring" />
        <div className="india-blob-ring-mask" />
        <div className="india-blob-inset">
          <div className="india-chakra-container">
            <svg className="india-chakra-svg" viewBox="0 0 100 100" width="24" height="24" aria-label="Ashoka Chakra">
              <circle cx="50" cy="50" r="46" fill="none" stroke="#000080" strokeWidth="4" />
              <circle cx="50" cy="50" r="6" fill="#000080" />
              {spokes.map((s, i) => (
                <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke="#000080" strokeWidth="2.8" strokeLinecap="round" />
              ))}
            </svg>
          </div>
        </div>
      </div>
      <span className="badge-sublabel india-label">{t.indiaBadge || 'INDIA'}</span>
    </div>
  );
}

/**
 * ISRO-Style Abstract Morphing Blob Badge for Debugg DYNASTY (Center)
 */
function DebuggDynastyIsroBadge({ onClick }) {
  const { isHindi } = useLanguage();
  return (
    <div 
      className="debugg-isro-badge-wrap"
      onClick={onClick}
      title={isHindi ? "टीम विवरण खोलने के लिए क्लिक करें" : "Click to open Team Debugg Dynasty tab"}
    >
      <div className="isro-blob-frame">
        <div className="isro-blob-ring" />
        <div className="isro-blob-inset">
          <DebuggDynastyLogo size="small" />
        </div>
      </div>
    </div>
  );
}

/**
 * Inline Official ISRO Logo Badge for About Modal (Right Side of Team Logo)
 */
function IsroBadgeInline() {
  const t = useT();
  return (
    <div className="isro-official-badge-inline-wrap">
      <div className="isro-official-blob-frame">
        <div className="isro-official-blob-ring" />
        <div className="isro-official-blob-inset">
          <img src="/isro_official.svg" alt="ISRO" className="isro-official-img" />
        </div>
      </div>
      <span className="badge-sublabel isro-label">{t.isroBadge || 'ISRO'}</span>
    </div>
  );
}

const TEAM_MEMBERS = [
  {
    name: 'Udit',
    roleKey: 'memberUditRole',
    defaultRole: 'Team Leader and AI & UI Lead',
    roleKeyHi: 'memberUditRoleHi',
    defaultRoleHi: 'टीम लीडर और AI & UI लीड',
    tag: 'Leader & AI/UI',
    icon: Crown,
    color: '#84cc16', // Team Lime Primary
    bgGradient: 'linear-gradient(135deg, rgba(132, 204, 22, 0.22), rgba(15, 23, 42, 0.9))',
    borderColor: 'rgba(132, 204, 22, 0.55)',
    highlight: true,
  },
  {
    name: 'Aadhya',
    roleKey: 'memberAadhyaRole',
    defaultRole: 'Researcher',
    roleKeyHi: 'memberAadhyaRoleHi',
    defaultRoleHi: 'शोधकर्ता (Researcher)',
    tag: 'Research & EO',
    icon: Search,
    color: '#38bdf8', // Sky Blue
    bgGradient: 'linear-gradient(135deg, rgba(56, 189, 248, 0.18), rgba(15, 23, 42, 0.9))',
    borderColor: 'rgba(56, 189, 248, 0.4)',
  },
  {
    name: 'Aman',
    roleKey: 'memberAmanRole',
    defaultRole: 'Backend Lead',
    roleKeyHi: 'memberAmanRoleHi',
    defaultRoleHi: 'बैकएंड लीड (Backend Lead)',
    tag: 'Backend Arch',
    icon: Server,
    color: '#10b981', // Emerald Green
    bgGradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.18), rgba(15, 23, 42, 0.9))',
    borderColor: 'rgba(16, 185, 129, 0.4)',
  },
  {
    name: 'Swastika',
    roleKey: 'memberSwastikaRole',
    defaultRole: 'Visual Content Designer',
    roleKeyHi: 'memberSwastikaRoleHi',
    defaultRoleHi: 'विजुअल कंटेंट डिजाइनर',
    tag: 'UI/UX & Assets',
    icon: Palette,
    color: '#ec4899', // Pink / Rose
    bgGradient: 'linear-gradient(135deg, rgba(236, 72, 153, 0.18), rgba(15, 23, 42, 0.9))',
    borderColor: 'rgba(236, 72, 153, 0.4)',
  },
  {
    name: 'Akash',
    roleKey: 'memberAkashRole',
    defaultRole: 'Backend Dev',
    roleKeyHi: 'memberAkashRoleHi',
    defaultRoleHi: 'बैकएंड डेवलपर',
    tag: 'Database & API',
    icon: Code,
    color: '#a855f7', // Purple
    bgGradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.18), rgba(15, 23, 42, 0.9))',
    borderColor: 'rgba(168, 85, 247, 0.4)',
  },
  {
    name: 'Nishant',
    roleKey: 'memberNishantRole',
    defaultRole: 'Frontend Dev',
    roleKeyHi: 'memberNishantRoleHi',
    defaultRoleHi: 'फ्रंटएंड डेवलपर',
    tag: 'Client Engineer',
    icon: Monitor,
    color: '#00f2fe', // Cyan Liquid
    bgGradient: 'linear-gradient(135deg, rgba(0, 242, 254, 0.18), rgba(15, 23, 42, 0.9))',
    borderColor: 'rgba(0, 242, 254, 0.4)',
  },
];

export function AboutModal({ isOpen, onClose }) {
  const t = useT();
  const { isHindi } = useLanguage();

  // Active Sub-Tab: 'platform' vs 'team'
  const [activeTab, setActiveTab] = useState('platform');

  // Reset tab when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab('platform');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="about-modal-backdrop lime-theme" onClick={onClose}>
      <div className="about-modal-dialog lime-dialog" onClick={(e) => e.stopPropagation()}>
        
        {/* Top Header Bar with Sub-Tab Switcher */}
        <div className="about-modal-header">
          <div className="about-modal-brand">
            <div>
              <div className="about-title-row">
                <span className="lime-brand-title">{t.aboutSatQuery || 'SatQuery AI'}</span>
              </div>
              <p className="about-sub-heading">
                {isHindi ? 'स्वायत्त उपग्रह बहु-एजेंट खुफिया मंच' : 'Autonomous Satellite Intelligence & Multi-Agent Platform'}
              </p>
            </div>
          </div>

          {/* Sub-Tab Navigation Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="about-subtab-bar">
              <button 
                className={`subtab-btn ${activeTab === 'platform' ? 'active' : ''}`}
                onClick={() => setActiveTab('platform')}
              >
                <Cpu size={14} />
                <span>{isHindi ? 'प्लेटफ़ॉर्म' : 'Platform'}</span>
              </button>

              <button 
                className={`subtab-btn ${activeTab === 'team' ? 'active' : ''}`}
                onClick={() => setActiveTab('team')}
              >
                <Users size={14} />
                <span>{isHindi ? 'टीम विवरण' : 'Team Debugg Dynasty'}</span>
              </button>
            </div>

            <button className="about-close-btn" onClick={onClose} title={t.closeModal || 'Close'}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Main Scrollable Content */}
        <div className="about-modal-body">

          {/* ── TAB 1: PLATFORM DESCRIPTION + TRIO BADGES (INDIA | TEAM LOGO | ISRO) BELOW ── */}
          {activeTab === 'platform' && (
            <div className="platform-tab-content">
              
              {/* App Overview Card */}
              <div className="about-section-card app-overview-lime">
                <div className="about-section-title">
                  <h3>{isHindi ? 'सैटक्वेरी एआई के बारे में' : 'About SatQuery AI'}</h3>
                </div>

                <p className="about-description-text">
                  {t.aboutDescription || 
                    'SatQuery AI is a state-of-the-art earth observation intelligence platform powered by a compiled LangGraph multi-agent orchestrator. It routes queries through specialist VQA, spatial grounding, change detection, and cross-modal SAR-optical fusion models.'}
                </p>

                <div className="about-feature-chips">
                  <span className="about-chip lime">
                    <Cpu size={13} /> {isHindi ? 'LangGraph बहु-एजेंट' : 'LangGraph Multi-Agent'}
                  </span>
                  <span className="about-chip lime">
                    <Globe size={13} /> {isHindi ? 'STAC सेंटिनल-2 & लैंडसैट-9' : 'STAC Sentinel-2 & Landsat-9'}
                  </span>
                  <span className="about-chip lime">
                    <ShieldCheck size={13} /> {isHindi ? 'इसरो अनुपालित टेलीमेट्री' : 'ISRO Telemetry Compliant'}
                  </span>
                  <span className="about-chip lime">
                    <Layers size={13} /> {isHindi ? 'SAR-ऑप्टिकल फ्यूजन' : 'SAR-Optical Fusion'}
                  </span>
                </div>
              </div>

              {/* ── TRIO BADGES ROW: INDIA (LEFT) | DEBUGG DYNASTY (CENTER) | ISRO (RIGHT) ── */}
              <div className="about-badges-trio-row">
                {/* Left: India Flag Badge */}
                <IndiaBadgeInline />

                {/* Center: Debugg Dynasty Team Logo Badge */}
                <DebuggDynastyIsroBadge onClick={() => setActiveTab('team')} />

                {/* Right: ISRO Official Badge */}
                <IsroBadgeInline />
              </div>

            </div>
          )}

          {/* ── TAB 2: TEAM DEBUGG DYNASTY MEMBERS INFORMATION ── */}
          {activeTab === 'team' && (
            <div className="team-tab-content">
              
              <div className="about-section-card team-section-lime">
                <div className="team-header-row">
                  <div className="team-title-wrap">
                    <div className="team-dynasty-badge lime">
                      <Users size={18} color="#84cc16" />
                      <span>{t.teamName || 'DEBUGG DYNASTY'}</span>
                    </div>
                    <h3 className="team-main-heading">
                      {isHindi ? 'टीम डिबग राजवंश से मिलें' : 'Meet Team Debugg Dynasty'}
                    </h3>
                  </div>
                  <span className="team-count-pill lime">6 {isHindi ? 'इंजीनियर' : 'Engineers'}</span>
                </div>

                {/* Team Grid: 6 Member Cards (Udit, Aadhya, Aman, Swastika, Akash, Nishant) */}
                <div className="team-grid">
                  {TEAM_MEMBERS.map((member) => {
                    const IconComponent = member.icon;
                    const roleText = isHindi 
                      ? (t[member.roleKeyHi] || member.defaultRoleHi)
                      : (t[member.roleKey] || member.defaultRole);

                    return (
                      <div 
                        key={member.name} 
                        className={`team-card ${member.highlight ? 'highlight-leader-lime' : ''}`}
                        style={{
                          background: member.bgGradient,
                          borderColor: member.borderColor
                        }}
                      >
                        <div className="team-card-top">
                          <div 
                            className="team-avatar-icon" 
                            style={{ background: `${member.color}22`, color: member.color, borderColor: member.borderColor }}
                          >
                            <IconComponent size={20} />
                          </div>
                          <span className="team-member-tag" style={{ color: member.color, borderColor: `${member.color}44` }}>
                            #{member.tag}
                          </span>
                        </div>

                        <div className="team-card-info">
                          <h4 className="team-member-name">
                            {member.name}
                            {member.highlight && <Crown size={15} className="leader-crown-icon" color="#84cc16" />}
                          </h4>
                          <p className="team-member-role">{roleText}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer Bar */}
        <div className="about-modal-footer">
          <span className="about-footer-text">
            Engineered by <strong className="lime-highlight">Debugg Dynasty</strong> for Satellite Intelligence
          </span>
          <button className="about-done-btn lime-btn" onClick={onClose}>
            {isHindi ? 'ठीक है' : 'Got it'}
          </button>
        </div>

      </div>
    </div>
  );
}

export default AboutModal;
