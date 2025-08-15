
"use client";

import React from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function BackToTopButton({ className }: { className?: string }) {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  React.useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <Button
      variant="outline"
      size="lg"
      onClick={scrollToTop}
      className={cn(
        'fixed bottom-24 right-6 z-40 rounded-full shadow-lg transition-all duration-300 ease-in-out',
        'bg-card/80 backdrop-blur-md hover:bg-accent/80 hover:text-accent-foreground focus:ring-2 focus:ring-offset-2 focus:ring-primary/80',
        'transform hover:scale-105',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none',
        className
      )}
      aria-label="Scroll back to top"
      data-interactive-cursor="true"
    >
      <ArrowUp className="h-5 w-5 mr-2" />
      <span>Send me back up</span>
    </Button>
  );
}
