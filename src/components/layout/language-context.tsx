'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  en,
  getDictionary,
  isLanguage,
  LANGUAGE_STORAGE_KEY,
  type Dictionary,
  type Language,
} from '@/lib/i18n';

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  dict: Dictionary;
}

// Default to EN so components render correctly outside the provider (tests,
// static first paint) without a hydration mismatch.
const LanguageContext = createContext<LanguageContextValue>({
  lang: 'en',
  setLang: () => {},
  dict: en,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('en');

  // Read the stored preference after mount only — first paint is always EN,
  // matching the server-rendered HTML.
  useEffect(() => {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (isLanguage(stored)) {
      setLangState(stored);
      document.documentElement.lang = stored;
    }
  }, []);

  const setLang = useCallback((next: Language) => {
    setLangState(next);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
    document.documentElement.lang = next;
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, dict: getDictionary(lang) }),
    [lang, setLang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  return useContext(LanguageContext);
}
