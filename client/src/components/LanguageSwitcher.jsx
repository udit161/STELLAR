import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import './LanguageSwitcher.css';

/**
 * LanguageSwitcher — pill toggle button for EN ↔ हि
 * Reads from and writes to LanguageContext.
 */
export default function LanguageSwitcher() {
  const { language, toggleLanguage, isHindi } = useLanguage();

  return (
    <button
      id="language-switcher-btn"
      className={`lang-switcher-pill ${isHindi ? 'lang-hi' : 'lang-en'}`}
      onClick={toggleLanguage}
      title={isHindi ? 'Switch to English' : 'हिंदी में बदलें'}
      aria-label={isHindi ? 'Switch to English' : 'Switch to Hindi'}
    >
      <span className="lang-globe">🌐</span>
      <span className={`lang-opt ${!isHindi ? 'lang-opt-active' : ''}`}>EN</span>
      <span className="lang-divider">|</span>
      <span className={`lang-opt ${isHindi ? 'lang-opt-active' : ''}`}>हि</span>
    </button>
  );
}
