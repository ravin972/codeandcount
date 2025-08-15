"use client";

import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function BackToTopButton({
  className,
  size,
}: {
  className?: string;
  size?: 'default' | 'sm' | 'lg' | 'icon';
}) {
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
      size={size}
      onClick={scrollToTop}
      className={cn(
        'rounded-full transition-all duration-300 ease-in-out',
        'border-white/20 bg-white/10 text-primary-foreground backdrop-blur-lg',
        'shadow-lg shadow-black/20 hover:shadow-primary/40 hover:border-primary/50',
        'transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background',
        isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none',
        className
      )}
      aria-label="Scroll back to top"
      data-interactive-cursor="true"
    >
      <ArrowUp className="h-5 w-5" />
      <span className={cn('ml-2', size === 'icon' ? 'hidden' : 'inline')}>
        Send me back up
      </span>
    </Button>
  );
}
