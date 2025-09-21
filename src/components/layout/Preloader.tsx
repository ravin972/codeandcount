
"use client";

import { cn } from '@/lib/utils';
import { Flame } from 'lucide-react';

export default function Preloader() {
  return (
    <div
      className={cn(
        'fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background animate-preloader-fade-out [animation-delay:2.4s]'
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
      <div className="perspective-container text-lg sm:text-xl lg:text-2xl font-semibold mt-4 text-amber-500">
        <span className="animate-flip-in inline-block" style={{ animationDelay: '1.5s' }}>H</span>
        <span className="animate-flip-in inline-block" style={{ animationDelay: '1.55s' }}>a</span>
        <span className="animate-flip-in inline-block" style={{ animationDelay: '1.6s' }}>p</span>
        <span className="animate-flip-in inline-block" style={{ animationDelay: '1.65s' }}>p</span>
        <span className="animate-flip-in inline-block" style={{ animationDelay: '1.7s' }}>y</span>
        <span className="animate-flip-in inline-block ml-2" style={{ animationDelay: '1.8s' }}>D</span>
        <span className="animate-flip-in inline-block" style={{ animationDelay: '1.85s' }}>i</span>
        <span className="animate-flip-in inline-block" style={{ animationDelay: '1.9s' }}>w</span>
        <span className="animate-flip-in inline-block" style={{ animationDelay: '1.95s' }}>a</span>
        <span className="animate-flip-in inline-block" style={{ animationDelay: '2.0s' }}>l</span>
        <span className="animate-flip-in inline-block" style={{ animationDelay: '2.05s' }}>i</span>
        <span className="animate-flip-in inline-block ml-2" style={{ animationDelay: '2.1s' }}>2</span>
        <span className="animate-flip-in inline-block" style={{ animationDelay: '2.15s' }}>0</span>
        <span className="animate-flip-in inline-block" style={{ animationDelay: '2.2s' }}>2</span>
        <span className="animate-flip-in inline-block" style={{ animationDelay: '2.25s' }}>5</span>
         <Flame className="inline-block animate-flip-in text-orange-500 ml-1" style={{ animationDelay: '2.3s' }} />
      </div>
    </div>
  );
}
