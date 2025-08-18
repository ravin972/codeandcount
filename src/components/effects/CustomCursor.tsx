
"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useIsMobile();
  const mousePos = useRef({ x: 0, y: 0 });

  // Mount check to avoid SSR issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Disable cursor on mobile or if not mounted
    if (!isMounted || isMobile) {
      if (dotRef.current) gsap.set(dotRef.current, { opacity: 0, scale: 0 });
      if (ringRef.current) gsap.set(ringRef.current, { opacity: 0, scale: 0 });
      return;
    }

    const dotEl = dotRef.current;
    const ringEl = ringRef.current;

    if (!dotEl || !ringEl) return;

    let isFirstMove = true;

    // Set initial state (invisible and centered)
    gsap.set([dotEl, ringEl], { xPercent: -50, yPercent: -50, opacity: 0 });

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Make cursor visible on first move
      if (isFirstMove) {
        gsap.to([dotEl, ringEl], { opacity: 1, duration: 0.3 });
        isFirstMove = false;
      }

      // Dot follows mouse directly
      gsap.to(dotEl, { 
        x: mousePos.current.x, 
        y: mousePos.current.y, 
        duration: 0.2, 
        ease: 'power2.out' 
      });

      // Ring follows mouse with a slight delay for a smooth, trailing effect
      gsap.to(ringEl, { 
        x: mousePos.current.x, 
        y: mousePos.current.y, 
        duration: 0.4, 
        ease: 'power2.out' 
      });
    };

    // Handle hover effects on interactive elements
    const onMouseOver = (e: MouseEvent) => {
      if (e.target && (e.target as HTMLElement).closest('a, button, [role="button"], [data-interactive-cursor="true"]')) {
        gsap.to(ringEl, { 
          scale: 1.5,
          duration: 0.3,
          ease: 'power2.out'
        });
        gsap.to(dotEl, { 
          scale: 0.7,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      // Check if we are not moving to another interactive element
       if (e.target && (e.target as HTMLElement).closest('a, button, [role="button"], [data-interactive-cursor="true"]')) {
         if (!(e.relatedTarget as HTMLElement)?.closest('a, button, [role="button"], [data-interactive-cursor="true"]')) {
            gsap.to(ringEl, { scale: 1, duration: 0.3, ease: 'power2.out' });
            gsap.to(dotEl, { scale: 1, duration: 0.3, ease: 'power2.out' });
         }
      }
    };

    // Handle click animation
    const onMouseDown = () => {
      gsap.to(ringEl, { 
        scale: 0.8, 
        duration: 0.15, 
        ease: 'power1.inOut' 
      });
    };

    const onMouseUp = () => {
      gsap.to(ringEl, { 
        scale: 1.5, // Return to hover state if still over interactive element
        duration: 0.2, 
        ease: 'power1.inOut' 
      });
    };

    // Add event listeners
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseout', onMouseOut);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Cleanup function
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      
      // Kill GSAP tweens to prevent memory leaks
      gsap.killTweensOf([dotEl, ringEl]);
      gsap.to([dotEl, ringEl], { opacity: 0, scale: 0, duration: 0.2 });
    };
  }, [isMounted, isMobile]);

  // Don't render the cursor on server or for mobile users
  if (!isMounted || isMobile) {
    return null;
  }

  return (
    <>
      {/* The outer ring of the cursor */}
      <div
        ref={followerRef}
        className={cn(
          "fixed w-8 h-8 rounded-full pointer-events-none z-[9999]",
          "border border-primary/50",
          "opacity-0", // Initially hidden, made visible by GSAP
          "shadow-md" // Subtle shadow for depth
        )}
        style={{ willChange: 'transform' }} // Performance optimization
      />
      {/* The inner dot of the cursor */}
      <div
        ref={dotRef}
        className={cn(
          "fixed w-2 h-2 rounded-full pointer-events-none z-[9999]",
          "bg-primary",
          "opacity-0" // Initially hidden
        )}
        style={{ willChange: 'transform' }} // Performance optimization
      />
    </>
  );
};

export default CustomCursor;
