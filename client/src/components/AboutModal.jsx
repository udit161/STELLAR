import React, { useState, useEffect } from 'react';
import {
  X,
  Crown,
  Search,
  Server,
  Palette,
  Code,
  Monitor,
  Cpu,
  Globe,
  ShieldCheck,
  Users,
  Layers
} from 'lucide-react';
import { useT, useLanguage } from '../context/LanguageContext';
import './AboutModal.css';

/**
 * Social Icon Components
 */
function InstagramIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function GithubIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function LinkedinIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

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
    socials: {
      instagram: 'https://www.instagram.com/the.sketch.man66',
      github: 'https://github.com/udit161',
      linkedin: 'https://www.linkedin.com/in/udit-kumar-9aa031376/',
    },
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
    socials: {
      instagram: 'https://www.instagram.com/aadhya_singh006',
      github: 'https://github.com/aadhya-devcode',
      linkedin: 'https://www.linkedin.com/in/aadhya-singh-1b50403b8/',
    },
  },
  {
    name: 'Aman Deep',
    roleKey: 'memberAmanRole',
    defaultRole: 'Backend Lead',
    roleKeyHi: 'memberAmanRoleHi',
    defaultRoleHi: 'बैकएंड लीड (Backend Lead)',
    tag: 'Backend Arch',
    icon: Server,
    color: '#10b981', // Emerald Green
    bgGradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.18), rgba(15, 23, 42, 0.9))',
    borderColor: 'rgba(16, 185, 129, 0.4)',
    socials: {
      instagram: 'https://www.instagram.com/deep_aman_4610',
      github: 'https://github.com/ADSingh-alpha',
    },
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
    socials: {
      instagram: 'https://www.instagram.com/nishant____thakur_',
      github: 'https://github.com/singhnishant8688-code',
      linkedin: 'https://www.linkedin.com/in/nishant-singh-a8927b253/',
    },
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
                <span className="lime-brand-title">{t.aboutStellar || 'Stellar AI'}</span>
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
                  <h3>{isHindi ? 'सैटक्वेरी एआई के बारे में' : 'About Stellar AI'}</h3>
                </div>

                <p className="about-description-text">
                  {t.aboutDescription ||
                    'Stellar AI is a state-of-the-art earth observation intelligence platform powered by a compiled LangGraph multi-agent orchestrator. It routes queries through specialist VQA, spatial grounding, change detection, and cross-modal SAR-optical fusion models.'}
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

              {/* ── SOLO BADGE: DEBUGG DYNASTY (CENTER) ── */}
              <div className="about-badges-trio-row">
                {/* Debugg Dynasty Team Logo Badge */}
                <DebuggDynastyIsroBadge onClick={() => setActiveTab('team')} />
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
                  <span className="team-count-pill lime">4 {isHindi ? 'इंजीनियर' : 'Engineers'}</span>
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

                          {member.socials && (
                            <div className="team-social-links">
                              {member.socials.instagram && (
                                <a
                                  href={member.socials.instagram}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="team-social-btn"
                                  title="Instagram"
                                  style={{ color: member.color, borderColor: `${member.color}44`, background: `${member.color}15` }}
                                >
                                  <InstagramIcon size={14} />
                                </a>
                              )}
                              {member.socials.github && (
                                <a
                                  href={member.socials.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="team-social-btn"
                                  title="GitHub"
                                  style={{ color: member.color, borderColor: `${member.color}44`, background: `${member.color}15` }}
                                >
                                  <GithubIcon size={14} />
                                </a>
                              )}
                              {member.socials.linkedin && (
                                <a
                                  href={member.socials.linkedin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="team-social-btn"
                                  title="LinkedIn"
                                  style={{ color: member.color, borderColor: `${member.color}44`, background: `${member.color}15` }}
                                >
                                  <LinkedinIcon size={14} />
                                </a>
                              )}
                            </div>
                          )}
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
