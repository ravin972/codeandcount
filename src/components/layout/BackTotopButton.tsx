
"use client";

import React from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import type { VariantProps } from 'class-variance-authority';
import { buttonVariants } from '@/components/ui/button';

interface BackToTopButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  className?: string;
}

export function BackToTopButton({ className, size = 'lg', ...props }: BackToTopButtonProps) {
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
      size={size}
      onClick={scrollToTop}
      className={cn(
        'relative rounded-full transition-all duration-300 ease-in-out',
        'border-white/20 bg-white/10 text-primary-foreground backdrop-blur-lg',
        'shadow-lg shadow-black/20 hover:shadow-primary/40 hover:border-primary/50',
        'transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none',
        className
      )}
      aria-label="Scroll back to top"
      data-interactive-cursor="true"
      {...props}
    >
      <ArrowUp className="h-5 w-5 md:mr-2 text-primary" />
      <span className="text-primary-foreground/90 hidden md:inline">Send me back up</span>
    </Button>
  );
}
