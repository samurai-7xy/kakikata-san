'use client';

import { createContext, useState, useEffect, ReactNode } from 'react';

type SettingsContextType = {
  rubyMode: string;
  setRubyMode: (mode: string) => void;
};

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [rubyMode, setRubyMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('rubyMode');
      return savedMode ? savedMode : 'furigana';
    }
    return 'furigana';
  });

  useEffect(() => {
    localStorage.setItem('rubyMode', rubyMode);
  }, [rubyMode]);

  return (
    <SettingsContext.Provider value={{ rubyMode, setRubyMode }}>
      {children}
    </SettingsContext.Provider>
  );
}
