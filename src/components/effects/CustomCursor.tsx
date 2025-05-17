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
    // Start small, centered, and invisible
    gsap.set(cursorEl, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0.5 }); 

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursorEl, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2, // Smooth follow duration
        ease: 'power2.out',
        opacity: 0.85, // Desired final opacity
        scale: 1,      // Scale to full size
      });
    };
    
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      // Optional: Animate out if the component unmounts or window loses focus
      // gsap.to(cursorEl, { opacity: 0, scale: 0.5, duration: 0.2 });
    };
  }, [isMounted]);

  if (!isMounted) {
    return null; 
  }

  return (
    <div
      ref={cursorRef}
      className={cn(
        "fixed w-5 h-5 rounded-full bg-primary pointer-events-none z-[9999]", // z-index to be on top
        "shadow-lg" // A subtle shadow for depth
      )}
      style={{ opacity: 0 }} // Initial style for GSAP to animate from
    />
  );
};

export default CustomCursor;
