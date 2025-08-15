
"use client";

import { cn } from '@/lib/utils';

export default function Preloader() {
  return (
    <div
      className={cn(
        'fixed inset-0 z-[10000] flex items-center justify-center bg-background animate-preloader-fade-out [animation-delay:1.5s]'
      )}
    >
      <div className="perspective-container text-3xl sm:text-5xl lg:text-6xl font-bold">
         <span className="text-primary font-bold animate-flip-in" style={{ animationDelay: '0.2s' }}>&lt;/&gt;</span>
        <span className="animate-flip-in inline-block" style={{ animationDelay: '0.3s' }}>C</span>
        <span className="animate-flip-in inline-block" style={{ animationDelay: '0.4s' }}>o</span>
        <span className="animate-flip-in inline-block" style={{ animationDelay: '0.5s' }}>d</span>
        <span className="animate-flip-in inline-block" style={{ animationDelay: '0.6s' }}>e</span>
        <span className="text-primary animate-flip-in inline-block" style={{ animationDelay: '0.7s' }}>&amp;</span>
        <span className="animate-flip-in inline-block" style={{ animationDelay: '0.8s' }}>C</span>
        <span className="animate-flip-in inline-block" style={{ animationDelay: '0.9s' }}>o</span>
        <span className="animate-flip-in inline-block" style={{ animationDelay: '1.0s' }}>u</span>
        <span className="animate-flip-in inline-block" style={{ animationDelay: '1.1s' }}>n</span>
        <span className="animate-flip-in inline-block" style={{ animationDelay: '1.2s' }}>t</span>
      </div>
    </div>
  );
}
