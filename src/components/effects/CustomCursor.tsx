
"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [primaryColorForFill, setPrimaryColorForFill] = useState('hsl(var(--primary))'); // Default fallback

  useEffect(() => {
    setIsMounted(true);
    const computedPrimaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
    if (computedPrimaryColor) {
      setPrimaryColorForFill(`hsl(${computedPrimaryColor})`);
    }
  }, []);

  useEffect(() => {
    if (!isMounted || !cursorRef.current) {
      return;
    }

    const cursorEl = cursorRef.current;
    
    // Initial setup: centered, invisible, at base scale, and filled
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
      if (!cursorRef.current) return;
      if (firstMove) {
        gsap.to(cursorRef.current, { 
          opacity: 1,
          duration: 0.3,
          backgroundColor: primaryColorForFill,
          borderWidth: '0px'
        });
        firstMove = false;
      }
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: 'power2.out',
      });
    };

    const onMouseOver = (e: MouseEvent) => {
      if (!cursorRef.current) return;
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], [data-interactive-cursor="true"]')) {
        gsap.to(cursorRef.current, { 
          scale: 2.5, 
          backgroundColor: 'transparent',
          borderWidth: '0.5px',
          borderColor: '#ffffff', // White border
          duration: 0.3, 
          ease: 'power2.out' 
        });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      if (!cursorRef.current) return;
      const target = e.target as HTMLElement;
      const relatedTargetIsInteractive = (e.relatedTarget as HTMLElement)?.closest('a, button, [role="button"], [data-interactive-cursor="true"]');

      if (target.closest('a, button, [role="button"], [data-interactive-cursor="true"]') && !relatedTargetIsInteractive) {
        gsap.to(cursorRef.current, { 
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
      if (cursorRef.current) {
        gsap.to(cursorRef.current, { opacity: 0, scale: 0.5, duration: 0.2 }); 
      }
    };
  }, [isMounted, primaryColorForFill]);

  if (!isMounted) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className={cn(
        "fixed w-3 h-3 rounded-full pointer-events-none z-[9999]",
        "border" 
      )}
      style={{ opacity: 0 }} 
    />
  );
};

export default CustomCursor;
