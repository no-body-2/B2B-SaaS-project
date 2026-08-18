// apps/web/src/context/ThemeContext.tsx

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemePreset, FontFamilyOption, ThemeUtil } from '../utils/theme.util';

interface ThemeContextType {
  theme: ThemePreset;
  font: FontFamilyOption;
  setTheme: (theme: ThemePreset) => void;
  setFont: (font: FontFamilyOption) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemePreset>('light');
  const [font, setFontState] = useState<FontFamilyOption>('inter');

  useEffect(() => {
    // LocalStorage에서 저장된 테마/폰트 로드
    const savedTheme = (localStorage.getItem('luminano_theme') as ThemePreset) || 'light';
    const savedFont = (localStorage.getItem('luminano_font') as FontFamilyOption) || 'inter';

    setThemeState(savedTheme);
    setFontState(savedFont);
    ThemeUtil.applyTheme(savedTheme, savedFont);
  }, []);

  const setTheme = (newTheme: ThemePreset) => {
    setThemeState(newTheme);
    localStorage.setItem('luminano_theme', newTheme);
    ThemeUtil.applyTheme(newTheme, font);
  };

  const setFont = (newFont: FontFamilyOption) => {
    setFontState(newFont);
    localStorage.setItem('luminano_font', newFont);
    ThemeUtil.applyTheme(theme, newFont);
  };

  const toggleTheme = () => {
    const nextTheme: ThemePreset = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, font, setTheme, setFont, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme은 ThemeProvider 내부에서만 사용할 수 있습니다.');
  }
  return context;
};
