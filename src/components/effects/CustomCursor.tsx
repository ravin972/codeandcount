
"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || isMobile === true) {
      if (dotRef.current) gsap.set(dotRef.current, { opacity: 0, scale: 0 });
      if (ringRef.current) gsap.set(ringRef.current, { opacity: 0, scale: 0 });
      return;
    }

    const dotEl = dotRef.current;
    const ringEl = ringRef.current;

    if (!dotEl || !ringEl) return;

    let firstMove = true;

    // Set initial state
    gsap.set([dotEl, ringEl], { xPercent: -50, yPercent: -50, opacity: 0, scale: 1 });
    gsap.set(dotEl, { scale: 1 });
    gsap.set(ringEl, { scale: 1 });

    const onMouseMove = (e: MouseEvent) => {
      if (firstMove) {
        gsap.to([dotEl, ringEl], { opacity: 1, duration: 0.3 });
        firstMove = false;
      }
      gsap.to(dotEl, { x: e.clientX, y: e.clientY, duration: 0.2, ease: 'power2.out' });
      gsap.to(ringEl, { x: e.clientX, y: e.clientY, duration: 0.4, ease: 'power2.out' });
    };

    const onMouseOver = (e: MouseEvent) => {
      if (e.target && (e.target as HTMLElement).closest('a, button, [role="button"], [data-interactive-cursor="true"]')) {
        gsap.to(dotEl, { scale: 3, duration: 0.3, ease: 'power2.out' });
        gsap.to(ringEl, { scale: 1.5, duration: 0.3, ease: 'power2.out' });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const relatedTarget = e.relatedTarget as HTMLElement | null;

      const isLeavingInteractive = target.closest('a, button, [role="button"], [data-interactive-cursor="true"]');
      const isEnteringInteractive = relatedTarget?.closest('a, button, [role="button"], [data-interactive-cursor="true"]');

      if (isLeavingInteractive && !isEnteringInteractive) {
        gsap.to(dotEl, { scale: 1, duration: 0.3, ease: 'power2.out' });
        gsap.to(ringEl, { scale: 1, duration: 0.3, ease: 'power2.out' });
      }
    };

    document.body.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseover', onMouseOver);
    document.body.addEventListener('mouseout', onMouseOut);

    return () => {
      document.body.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseover', onMouseOver);
      document.body.removeEventListener('mouseout', onMouseOut);
      gsap.killTweensOf([dotEl, ringEl]);
      gsap.to([dotEl, ringEl], { opacity: 0, scale: 0, duration: 0.2 });
    };
  }, [isMounted, isMobile]);

  if (!isMounted || isMobile === true) {
    return null;
  }

  return (
    <>
      <div
        ref={ringRef}
        className={cn(
          "fixed w-10 h-10 rounded-full pointer-events-none z-[9999]",
          "border-2 border-primary/50",
          "opacity-0"
        )}
      />
      <div
        ref={dotRef}
        className={cn(
          "fixed w-2 h-2 rounded-full pointer-events-none z-[9999]",
          "bg-primary",
          "opacity-0"
        )}
      />
    </>
  );
};

export default CustomCursor;
