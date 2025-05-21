
"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile'; // Import the hook

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [primaryColorForFill, setPrimaryColorForFill] = useState('hsl(var(--primary))');
  const isMobile = useIsMobile(); // Use the hook

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || isMobile) return;

    const computedColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
    if (computedColor) {
      setPrimaryColorForFill(`hsl(${computedColor})`);
    }
  }, [isMounted, isMobile]);

  useEffect(() => {
    if (!isMounted || isMobile) {
      if (cursorRef.current) {
        // Ensure cursor is hidden if it was visible and then screen became mobile
        gsap.set(cursorRef.current, { opacity: 0, scale: 0 });
      }
      return;
    }

    let animationFrameId: number;
    let eventListenersCleanup: (() => void) | undefined;

    const initializeCursorAndListeners = () => {
      const cursorEl = cursorRef.current; // Fetch fresh ref value INSIDE the RAF callback
      if (!cursorEl) {
        // console.warn("CustomCursor: cursorRef.current is null inside RAF callback. Skipping GSAP operations.");
        return undefined; // Indicate that setup didn't complete
      }

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
        const currentRefVal = cursorRef.current;
        if (!currentRefVal) return;

        if (firstMove) {
          gsap.to(currentRefVal, {
            opacity: 1,
            duration: 0.3,
            // backgroundColor: primaryColorForFill, // Keep the initial set color
            // borderWidth: '0px'
          });
          firstMove = false;
        }
        gsap.to(currentRefVal, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.2,
          ease: 'power2.out',
        });
      };

      const onMouseOver = (e: MouseEvent) => {
        const currentRefVal = cursorRef.current;
        if (!currentRefVal) return;

        const target = e.target as HTMLElement;
        if (target.closest('a, button, [role="button"], [data-interactive-cursor="true"]')) {
          gsap.to(currentRefVal, {
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
        const currentRefVal = cursorRef.current;
        if (!currentRefVal) return;
        
        const target = e.target as HTMLElement;
        const relatedTarget = e.relatedTarget as HTMLElement | null;
        const isMovingToInteractive = relatedTarget?.closest('a, button, [role="button"], [data-interactive-cursor="true"]');

        if (target.closest('a, button, [role="button"], [data-interactive-cursor="true"]') && !isMovingToInteractive) {
          gsap.to(currentRefVal, {
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

      // Return the cleanup function for these listeners
      return () => {
        document.body.removeEventListener('mousemove', onMouseMove);
        document.body.removeEventListener('mouseover', onMouseOver);
        document.body.removeEventListener('mouseout', onMouseOut);
        if (cursorRef.current) { // Important: check ref again during cleanup
          gsap.to(cursorRef.current, { opacity: 0, scale: 0.5, duration: 0.2 });
        }
      };
    };
    
    animationFrameId = requestAnimationFrame(() => {
      eventListenersCleanup = initializeCursorAndListeners();
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (eventListenersCleanup) {
        eventListenersCleanup();
      } else if (cursorRef.current) {
        // Fallback cleanup if initializeCursorAndListeners didn't run (e.g., unmounted before RAF)
         gsap.to(cursorRef.current, { opacity: 0, scale: 0, duration: 0.2 });
      }
    };

  }, [isMounted, primaryColorForFill, isMobile]);

  if (!isMounted || isMobile) {
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
