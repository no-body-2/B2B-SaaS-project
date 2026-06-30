'use client';

import React from 'react';

interface LumiNanoIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  size?: number;
}

export default function LumiNanoIcon({ className, size = 24, ...props }: LumiNanoIconProps) {
  return (
    <img 
      src="/icon.svg" 
      alt="LumiNano Icon"
      width={size} 
      height={size} 
      className={className} 
      {...props}
    />
  );
}
