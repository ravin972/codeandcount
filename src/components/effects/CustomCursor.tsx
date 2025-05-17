
"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('hsl(180, 100%, 25%)'); // Default fallback, matches current teal

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !cursorRef.current) {
      return;
    }

    const cursorEl = cursorRef.current;
    const computedPrimaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
    if (computedPrimaryColor) {
      setPrimaryColor(`hsl(${computedPrimaryColor})`);
    }
    
    // Initial setup: centered, invisible, at base scale, and filled
    gsap.set(cursorEl, { 
      xPercent: -50, 
      yPercent: -50, 
      opacity: 0, 
      scale: 1,
      backgroundColor: primaryColor, // Initial fill
      borderWidth: '0px',
      borderColor: 'transparent'
    });

    let firstMove = true;

    const onMouseMove = (e: MouseEvent) => {
      if (firstMove) {
        gsap.to(cursorEl, { 
          opacity: 1, // Use 1 for full opacity, adjust if needed
          duration: 0.3,
          backgroundColor: primaryColor, // Ensure it's filled on first appearance
          borderWidth: '0px'
        });
        firstMove = false;
      }
      gsap.to(cursorEl, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: 'power2.out',
      });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], [data-interactive-cursor="true"]')) {
        gsap.to(cursorEl, { 
          scale: 2.5, 
          backgroundColor: 'transparent',
          borderWidth: '1px',
          borderColor: primaryColor,
          duration: 0.3, 
          ease: 'power2.out' 
        });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const relatedTargetIsInteractive = (e.relatedTarget as HTMLElement)?.closest('a, button, [role="button"], [data-interactive-cursor="true"]');

      if (target.closest('a, button, [role="button"], [data-interactive-cursor="true"]') && !relatedTargetIsInteractive) {
        gsap.to(cursorEl, { 
          scale: 1, 
          backgroundColor: primaryColor, // Revert to filled
          borderWidth: '0px',
          borderColor: 'transparent',
          duration: 0.3, 
          ease: 'power2.out' 
        });
      }
    };

    document.body.addEventListener('mousemove', onMouseMove, { passive: true });
    document.body.addEventListener('mouseover', onMouseOver);
    document.body.addEventListener('mouseout', onMouseOut);

    return () => {
      document.body.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseover', onMouseOver);
      document.body.removeEventListener('mouseout', onMouseOut);
      gsap.to(cursorEl, { opacity: 0, scale: 0.5, duration: 0.2 }); 
    };
  }, [isMounted, primaryColor]); // Add primaryColor to dependency array

  if (!isMounted) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className={cn(
        "fixed w-3 h-3 rounded-full pointer-events-none z-[9999]", // Removed bg-primary and shadow-md
        "border" // Add border class for GSAP to control its properties
      )}
      style={{ opacity: 0 }} // Start fully transparent, GSAP handles fade-in and initial fill
    />
  );
};

export default CustomCursor;
