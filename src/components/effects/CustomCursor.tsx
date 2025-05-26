
"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  // Initialize with a fallback or ensure it's only used when valid
  const [primaryColorForFill, setPrimaryColorForFill] = useState('hsl(var(--primary))');
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const computedColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
      if (computedColor && CSS.supports('color', `hsl(${computedColor})`)) {
        setPrimaryColorForFill(`hsl(${computedColor})`);
      } else if (computedColor && CSS.supports('color', computedColor) ) { // If it's a hex or rgb, try to use it directly if supported
        setPrimaryColorForFill(computedColor);
      }
      else {
        // Fallback if CSS var is not found or invalid
        setPrimaryColorForFill('rgba(178, 255, 3, 0.8)'); // Default to a lime green if primary is not set
      }
    }
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted || isMobile === undefined || isMobile === true || primaryColorForFill.startsWith('hsl(var')) {
      if (cursorRef.current) {
        // Ensure cursor is hidden if it was visible and then conditions changed
        gsap.set(cursorRef.current, { opacity: 0, scale: 0, borderWidth: '0px' });
      }
      return; // Bail out if not ready, on mobile, or color not resolved
    }

    let animationFrameId: number;
    let onMouseMoveHandler: ((e: MouseEvent) => void) | null = null;
    let onMouseOverHandler: ((e: MouseEvent) => void) | null = null;
    let onMouseOutHandler: ((e: MouseEvent) => void) | null = null;
    
    const initializeCursorAndListeners = () => {
      const cursorEl = cursorRef.current;
      if (!cursorEl || !(cursorEl instanceof HTMLElement)) {
        // console.warn("CustomCursor: Ref is not an HTMLElement or is null in RAF. Skipping GSAP init.");
        return;
      }

      // Initial setup: centered, invisible, at base scale, and filled
      gsap.set(cursorEl, { 
        xPercent: -50, 
        yPercent: -50, 
        opacity: 0, 
        scale: 1,
        backgroundColor: primaryColorForFill, // Use resolved color
        borderWidth: '0px', // Explicitly set initial border width
        borderColor: 'transparent' // Explicitly set initial border color
      });

      let firstMove = true;

      onMouseMoveHandler = (e: MouseEvent) => {
        if (!cursorRef.current) return;
        if (firstMove) {
          gsap.to(cursorRef.current, {
            opacity: 1,
            duration: 0.3,
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

      onMouseOverHandler = (e: MouseEvent) => {
        if (!cursorRef.current) return;
        const target = e.target as HTMLElement;
        if (target.closest('a, button, [role="button"], [data-interactive-cursor="true"]')) {
          gsap.to(cursorRef.current, {
            scale: 2.8,
            backgroundColor: 'transparent',
            borderWidth: '0.2px',
            borderColor: '#ffffff', // White border on hover
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      };

      onMouseOutHandler = (e: MouseEvent) => {
        if (!cursorRef.current) return;
        const target = e.target as HTMLElement;
        const relatedTarget = e.relatedTarget as HTMLElement | null;
        
        const isLeavingInteractive = target.closest('a, button, [role="button"], [data-interactive-cursor="true"]');
        const isEnteringInteractive = relatedTarget?.closest('a, button, [role="button"], [data-interactive-cursor="true"]');

        if (isLeavingInteractive && !isEnteringInteractive) {
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

      document.body.addEventListener('mousemove', onMouseMoveHandler, { passive: true });
      document.body.addEventListener('mouseover', onMouseOverHandler);
      document.body.addEventListener('mouseout', onMouseOutHandler);
    };
    
    // Schedule initialization
    animationFrameId = requestAnimationFrame(initializeCursorAndListeners);

    // Cleanup function
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (onMouseMoveHandler) document.body.removeEventListener('mousemove', onMouseMoveHandler);
      if (onMouseOverHandler) document.body.removeEventListener('mouseover', onMouseOverHandler);
      if (onMouseOutHandler) document.body.removeEventListener('mouseout', onMouseOutHandler);

      if (cursorRef.current instanceof HTMLElement) {
        gsap.killTweensOf(cursorRef.current);
        gsap.to(cursorRef.current, { opacity: 0, scale: 0, duration: 0.2 });
      }
    };
  }, [isMounted, isMobile, primaryColorForFill]); // primaryColorForFill ensures effect re-runs if color changes post-initialization


  if (!isMounted || isMobile === undefined || isMobile === true) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className={cn(
        "fixed w-3 h-3 rounded-full pointer-events-none z-[9999]",
        "border" 
      )}
      style={{ opacity: 0 }} // Initial opacity set by style, then controlled by GSAP
    />
  );
};

export default CustomCursor;
