'use client';

import React from 'react';

interface LumiNanoIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  size?: number;
}

export default function LumiNanoIcon({ className, size = 24, ...props }: LumiNanoIconProps) {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
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
