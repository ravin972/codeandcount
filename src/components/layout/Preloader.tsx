
"use client";

import { cn } from '@/lib/utils';

export default function Preloader() {
  return (
    <div
      className={cn(
        'fixed inset-0 z-[10000] flex items-center justify-center bg-background animate-preloader-fade-out [animation-delay:1.8s]'
      )}
    >
      <div className="perspective-container text-3xl sm:text-5xl lg:text-6xl font-bold">
         <span className="text-primary font-bold animate-flip-in" style={{ animationDelay: '0.2s' }}>&lt;/&gt;</span>
        <span className="animate-flip-in inline-block" style={{ animationDelay: '0.4s' }}>C</span>
        <span className="animate-flip-in inline-block" style={{ animationDelay: '0.5s' }}>o</span>
        <span className="animate-flip-in inline-block" style={{ animationDelay: '0.6s' }}>d</span>
        <span className="animate-flip-in inline-block" style={{ animationDelay: '0.7s' }}>e</span>
        <span className="text-primary animate-flip-in inline-block" style={{ animationDelay: '0.8s' }}>&amp;</span>
        <span className="animate-flip-in inline-block" style={{ animationDelay: '0.9s' }}>C</span>
        <span className="animate-flip-in inline-block" style={{ animationDelay: '1.0s' }}>o</span>
        <span className="animate-flip-in inline-block" style={{ animationDelay: '1.1s' }}>u</span>
        <span className="animate-flip-in inline-block" style={{ animationDelay: '1.2s' }}>n</span>
        <span className="animate-flip-in inline-block" style={{ animationDelay: '1.3s' }}>t</span>
      </div>
    </div>
  );
}
