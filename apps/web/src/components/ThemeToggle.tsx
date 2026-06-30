'use client';

import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center bg-luminano-point border border-luminano-border rounded-full p-1 shadow-xl transition-all duration-350 select-none">
      
      {/* 캡슐 슬라이더 레이아웃 */}
      <div 
        className="relative flex items-center bg-background/40 rounded-full w-[146px] h-[32px] p-0.5 cursor-pointer" 
        onClick={toggleTheme}
      >
        
        {/* 슬라이딩 활성화 배경 */}
        <div 
          className={`absolute top-0.5 bottom-0.5 rounded-full w-[68px] bg-luminano-accent shadow-md transition-all duration-300 ease-out transform ${
            theme === 'dark' ? 'translate-x-[71px]' : 'translate-x-0.5'
          }`}
        />

        {/* 라이트 테마 버튼 구역 */}
        <div className={`flex-1 flex items-center justify-center gap-1.5 text-[10px] font-bold z-10 transition-colors duration-300 ${
          theme === 'light' ? 'text-white' : 'text-slate-450 hover:text-slate-300'
        }`}>
          <Sun className="w-3.5 h-3.5" />
          <span>Light</span>
        </div>

        {/* 다크 테마 버튼 구역 */}
        <div className={`flex-1 flex items-center justify-center gap-1.5 text-[10px] font-bold z-10 transition-colors duration-300 ${
          theme === 'dark' ? 'text-slate-950' : 'text-slate-500 hover:text-slate-700'
        }`}>
          <Moon className="w-3.5 h-3.5" />
          <span>Dark</span>
        </div>

      </div>

    </div>
  );
}
