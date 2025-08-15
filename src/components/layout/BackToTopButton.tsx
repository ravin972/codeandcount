
"use client";

import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Button
      variant="outline"
      onClick={scrollToTop}
      className={cn(
        'fixed bottom-24 right-6 z-40 rounded-full transition-all duration-300 ease-in-out md:bottom-6',
        'h-12 w-12 md:h-auto md:w-auto md:px-4 md:py-2',
        'border-white/20 bg-white/10 text-primary-foreground backdrop-blur-lg',
        'shadow-lg shadow-black/20 hover:shadow-primary/40 hover:border-primary/50',
        'transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background',
        isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
      )}
      aria-label="Scroll back to top"
      data-interactive-cursor="true"
    >
      <ArrowUp className="h-5 w-5" />
      <span className="ml-2 hidden md:inline">
        Send me back up
      </span>
    </Button>
  );
}
