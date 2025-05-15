
"use client";

import React from 'react';
import { MoveUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BackToTopButton({ className }: { className?: string }) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={cn(
        'p-3 rounded-lg shadow-lg flex items-center space-x-2 transition-all duration-300 ease-in-out',
        'bg-neutral-800 text-neutral-200 hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-neutral-900',
        className // Positioning classes will be passed from parent
      )}
      aria-label="Scroll back to top"
    >
      <span>Sh*t I've gone too far, send me back up</span>
      <MoveUp className="h-5 w-5 text-yellow-400" />
    </button>
  );
}

