
"use client";

import { cn } from '@/lib/utils';

export default function Preloader() {
  return (
    <div
      className={cn(
        'fixed inset-0 z-[10000] flex items-center justify-center bg-background animate-preloader-fade-out [animation-delay:2.5s]'
      )}
    >
      <div className="perspective-container text-3xl sm:text-5xl lg:text-6xl font-bold">
        <span className="animate-flip-in inline-block" style={{ animationDelay: '0.2s' }}>C</span>
        <span className="animate-flip-in inline-block" style={{ animationDelay: '0.3s' }}>o</span>
        <span className="animate-flip-in inline-block" style={{ animationDelay: '0.4s' }}>d</span>
        <span className="animate-flip-in inline-block" style={{ animationDelay: '0.5s' }}>e</span>
        <span className="text-primary animate-flip-in inline-block" style={{ animationDelay: '0.6s' }}>&amp;</span>
        <span className="animate-flip-in inline-block" style={{ animationDelay: '0.7s' }}>C</span>
        <span className="animate-flip-in inline-block" style={{ animationDelay: '0.8s' }}>o</span>
        <span className="animate-flip-in inline-block" style={{ animationDelay: '0.9s' }}>u</span>
        <span className="animate-flip-in inline-block" style={{ animationDelay: '1.0s' }}>n</span>
        <span className="animate-flip-in inline-block" style={{ animationDelay: '1.1s' }}>t</span>
      </div>
    </div>
  );
}
