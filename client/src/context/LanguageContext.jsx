import React, { createContext, useContext, useState, useCallback } from 'react';
import { translations } from '../utils/translations';

const LS_KEY = 'satquery_language';

export const LanguageContext = createContext({
  language: 'en',
  toggleLanguage: () => {},
  isHindi: false,
  t: translations.en,
});

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try {
      return localStorage.getItem(LS_KEY) || 'en';
    } catch {
      return 'en';
    }
  });

  const toggleLanguage = useCallback(() => {
    setLanguage(prev => {
      const next = prev === 'en' ? 'hi' : 'en';
      try { localStorage.setItem(LS_KEY, next); } catch {}
      return next;
    });
  }, []);

  const t = translations[language] || translations.en;

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, isHindi: language === 'hi', t }}>
      {children}
    </LanguageContext.Provider>
  );
}

/** Convenience hook — returns { language, isHindi, toggleLanguage, t } */
export function useLanguage() {
  return useContext(LanguageContext);
}

/** Short-form hook — just returns the translation dictionary for the active language */
export function useT() {
  return useContext(LanguageContext).t;
}

