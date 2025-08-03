
"use client";

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export default function Preloader() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed inset-0 z-[10000] flex items-center justify-center bg-background animate-preloader-fade-out [animation-delay:1.5s] pointer-events-none'
      )}
    >
      <div className="text-4xl md:text-6xl font-bold">
        <span className="animate-preloader-fade-in-up inline-block" style={{ animationDelay: '0.2s' }}>Code</span>
        <span className="text-primary animate-preloader-fade-in-up inline-block" style={{ animationDelay: '0.4s' }}>&amp;</span>
        <span className="animate-preloader-fade-in-up inline-block" style={{ animationDelay: '0.6s' }}>Count</span>
      </div>
    </div>
  );
}
