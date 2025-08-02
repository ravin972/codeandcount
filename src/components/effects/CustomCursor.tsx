
"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [primaryColorForFill, setPrimaryColorForFill] = useState('hsl(var(--primary))');
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      try {
        const computedColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
        if (computedColor && CSS.supports('color', `hsl(${computedColor})`)) {
          setPrimaryColorForFill(`hsl(${computedColor})`);
        } else if (computedColor && CSS.supports('color', computedColor)) {
          setPrimaryColorForFill(computedColor);
        } else {
          setPrimaryColorForFill('rgba(178, 255, 3, 0.8)'); // Fallback
        }
      } catch (e) {
          setPrimaryColorForFill('rgba(178, 255, 3, 0.8)'); // Fallback on error
      }
    }
  }, [isMounted]);

  useEffect(() => {
    // Bail out if not ready, on mobile, or color not resolved
    if (!isMounted || isMobile === true || !primaryColorForFill || primaryColorForFill.startsWith('hsl(var')) {
      if (cursorRef.current) {
        gsap.set(cursorRef.current, { opacity: 0, scale: 0 });
      }
      return;
    }

    const cursorEl = cursorRef.current;
    if (!cursorEl) return;

    let firstMove = true;

    // Set initial state
    gsap.set(cursorEl, {
      xPercent: -50,
      yPercent: -50,
      opacity: 0,
      scale: 1,
      backgroundColor: primaryColorForFill,
    });

    const onMouseMove = (e: MouseEvent) => {
      if (firstMove) {
        gsap.to(cursorEl, { opacity: 1, duration: 0.3 });
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
      if (e.target && (e.target as HTMLElement).closest('a, button, [role="button"], [data-interactive-cursor="true"]')) {
        gsap.to(cursorEl, {
          scale: 2.5, // Zoom effect by scaling up
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const relatedTarget = e.relatedTarget as HTMLElement | null;

      const isLeavingInteractive = target.closest('a, button, [role="button"], [data-interactive-cursor="true"]');
      const isEnteringInteractive = relatedTarget?.closest('a, button, [role="button"], [data-interactive-cursor="true"]');

      if (isLeavingInteractive && !isEnteringInteractive) {
        gsap.to(cursorEl, {
          scale: 1, // Revert to normal scale
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    document.body.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseover', onMouseOver);
    document.body.addEventListener('mouseout', onMouseOut);

    return () => {
      document.body.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseover', onMouseOver);
      document.body.removeEventListener('mouseout', onMouseOut);
      gsap.killTweensOf(cursorEl);
      gsap.to(cursorEl, { opacity: 0, scale: 0, duration: 0.2 });
    };
  }, [isMounted, isMobile, primaryColorForFill]);

  if (!isMounted || isMobile === true) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className={cn(
        "fixed w-4 h-4 rounded-full pointer-events-none z-[9999]"
      )}
      style={{ opacity: 0 }}
    />
  );
};

export default CustomCursor;
