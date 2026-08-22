'use client';

import React from 'react';
import Link from 'next/link';

interface LumiNanoLogoProps {
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  href?: string;
  subTitle?: string;
  subIcon?: React.ReactNode;
}

export function LumiNanoLogo({
  showIcon = true,
  size = 'md',
  className = '',
  href = '/dashboard',
  subTitle,
  subIcon,
}: LumiNanoLogoProps) {
  const iconContainerSize =
    size === 'sm'
      ? 'w-7 h-7 rounded-lg'
      : size === 'lg'
      ? 'w-10 h-10 rounded-2xl'
      : 'w-8 h-8 rounded-xl';
  const textSize = size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-xl';

  const logoContent = (
    <div className={`flex items-center gap-2.5 group select-none ${className}`}>
      {showIcon && (
        <div className={`${iconContainerSize} bg-slate-900 dark:bg-slate-950 border border-slate-700/60 p-1 flex items-center justify-center shadow-md shadow-indigo-500/10 shrink-0 group-hover:scale-105 transition-transform duration-200`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icon.svg" alt="LumiNano Logo" className="w-full h-full object-contain" />
        </div>
      )}
      <span className={`font-extrabold ${textSize} tracking-tight leading-none`}>
        <span className="text-[#818cf8]">Lumi</span>
        <span className="text-[#38bdf8]">Nano</span>
      </span>

      {subTitle && (
        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-medium">
          <span className="text-slate-500 dark:text-slate-600 font-light text-base ml-0.5">/</span>
          <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200 font-bold text-sm">
            {subIcon}
            <span>{subTitle}</span>
          </div>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="no-underline hover:opacity-90 transition">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}

export default LumiNanoLogo;
