
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
    if (!isMounted || isMobile) return; // Don't run if not mounted or on mobile

    const computedColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
    if (computedColor) {
      setPrimaryColorForFill(`hsl(${computedColor})`);
    }
  }, [isMounted, isMobile]);

  useEffect(() => {
    if (!isMounted || isMobile || !cursorRef.current) {
      // If on mobile or not mounted, ensure the cursor div is hidden if it somehow rendered
      if (cursorRef.current) {
        gsap.set(cursorRef.current, { opacity: 0, scale: 0 });
      }
      return;
    }

    const cursorEl = cursorRef.current;
    let animationFrameId: number;

    const initializeCursor = () => {
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
        if (firstMove) {
          gsap.to(cursorEl, {
            opacity: 1,
            duration: 0.3,
            backgroundColor: primaryColorForFill,
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

      // Cleanup function
      return () => {
        document.body.removeEventListener('mousemove', onMouseMove);
        document.body.removeEventListener('mouseover', onMouseOver);
        document.body.removeEventListener('mouseout', onMouseOut);
        if (cursorRef.current) {
          gsap.to(cursorRef.current, { opacity: 0, scale: 0.5, duration: 0.2 });
        }
      };
    };
    
    // Defer initialization to ensure DOM is ready
    animationFrameId = requestAnimationFrame(initializeCursor);

    return () => {
      cancelAnimationFrame(animationFrameId);
      // Ensure event listeners are cleaned up if initialization was deferred and then component unmounted
      // This might be redundant if the cleanup from initializeCursor runs, but safe to have.
      document.body.removeEventListener('mousemove', (e) => {}); // Placeholder for actual onMouseMove
      document.body.removeEventListener('mouseover', (e) => {}); // Placeholder
      document.body.removeEventListener('mouseout', (e) => {}); // Placeholder
    };

  }, [isMounted, primaryColorForFill, isMobile]);

  if (!isMounted || isMobile) {
    return null; // Don't render the cursor div on mobile or before mounted
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
