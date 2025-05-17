
"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !cursorRef.current) {
      return;
    }

    const cursorEl = cursorRef.current;
    // Initial setup: centered, invisible, and at base scale
    gsap.set(cursorEl, { xPercent: -50, yPercent: -50, opacity: 0, scale: 1 });

    let firstMove = true;

    const onMouseMove = (e: MouseEvent) => {
      if (firstMove) {
        gsap.to(cursorEl, { opacity: 0.85, duration: 0.3 }); // Fade in on first move
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
        gsap.to(cursorEl, { scale: 2.5, duration: 0.3, ease: 'power2.out' });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if the relatedTarget (where the mouse is going) is NOT also an interactive element
      // This prevents shrinking when moving between interactive elements.
      const relatedTargetIsInteractive = (e.relatedTarget as HTMLElement)?.closest('a, button, [role="button"], [data-interactive-cursor="true"]');

      if (target.closest('a, button, [role="button"], [data-interactive-cursor="true"]') && !relatedTargetIsInteractive) {
        gsap.to(cursorEl, { scale: 1, duration: 0.3, ease: 'power2.out' });
      }
    };

    document.body.addEventListener('mousemove', onMouseMove, { passive: true });
    document.body.addEventListener('mouseover', onMouseOver);
    document.body.addEventListener('mouseout', onMouseOut);

    return () => {
      document.body.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseover', onMouseOver);
      document.body.removeEventListener('mouseout', onMouseOut);
      gsap.to(cursorEl, { opacity: 0, scale: 0.5, duration: 0.2 }); // Animate out
    };
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className={cn(
        "fixed w-3 h-3 rounded-full bg-primary pointer-events-none z-[9999] opacity-75", // Default size w-3 h-3
        "shadow-md" // Subtle shadow for the smaller cursor
      )}
      style={{ opacity: 0 }} // Start fully transparent, GSAP handles fade-in
    />
  );
};

export default CustomCursor;

