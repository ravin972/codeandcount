
"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [primaryColorForFill, setPrimaryColorForFill] = useState('hsl(var(--primary))'); // Default fallback

  // Effect to set isMounted and fetch primary color
  useEffect(() => {
    setIsMounted(true);
    // Fetch primary color from CSS variables once mounted
    const computedColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
    if (computedColor) {
      setPrimaryColorForFill(`hsl(${computedColor})`);
    }
  }, []); // Runs once on client mount

  // Effect for ALL GSAP logic including initial setup and event listeners
  useEffect(() => {
    if (!isMounted || !cursorRef.current) {
      return; // Guard against null ref or non-mounted state
    }

    const cursorEl = cursorRef.current;

    // Initial setup: centered, invisible, at base scale, and filled
    // This will now run only when cursorEl is guaranteed to be non-null
    gsap.set(cursorEl, { 
      xPercent: -50, 
      yPercent: -50, 
      opacity: 0, 
      scale: 1,
      backgroundColor: primaryColorForFill,
      borderWidth: '0px',
      borderColor: 'transparent'
    });

    let firstMove = true;

    const onMouseMove = (e: MouseEvent) => {
      // cursorEl is already confirmed to be non-null from the effect's guard
      if (firstMove) {
        gsap.to(cursorEl, { 
          opacity: 1,
          duration: 0.3,
          backgroundColor: primaryColorForFill, 
          borderWidth: '0px' // Ensure border is reset on first move after initial set
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
      // cursorEl is already confirmed to be non-null
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], [data-interactive-cursor="true"]')) {
        gsap.to(cursorEl, { 
          scale: 2.8, 
          backgroundColor: 'transparent',
          borderWidth: '0.2px',
          borderColor: '#ffffff', 
          duration: 0.3, 
          ease: 'power2.out' 
        });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      // cursorEl is already confirmed to be non-null
      const target = e.target as HTMLElement;
      const relatedTarget = e.relatedTarget as HTMLElement | null;
      const isMovingToInteractive = relatedTarget?.closest('a, button, [role="button"], [data-interactive-cursor="true"]');

      if (target.closest('a, button, [role="button"], [data-interactive-cursor="true"]') && !isMovingToInteractive) {
        gsap.to(cursorEl, { 
          scale: 1, 
          backgroundColor: primaryColorForFill, 
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
      if (cursorRef.current) { // Check ref before cleanup animation
        gsap.to(cursorRef.current, { opacity: 0, scale: 0.5, duration: 0.2 }); 
      }
    };
  }, [isMounted, primaryColorForFill]); // Re-run if isMounted or primaryColorForFill changes

  if (!isMounted) {
    return null; // Prevents SSR rendering of the cursor div
  }

  return (
    <div
      ref={cursorRef}
      className={cn(
        "fixed w-3 h-3 rounded-full pointer-events-none z-[9999]",
        "border" 
      )}
      style={{ opacity: 0 }} // Initial style to prevent flash of unstyled content
    />
  );
};

export default CustomCursor;
