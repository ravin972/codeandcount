
"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const CustomCursor: React.FC = () => {
<<<<<<< HEAD
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useIsMobile();
  const mousePos = useRef({ x: 0, y: 0 });
=======
  const mainCursorRef = useRef<HTMLDivElement>(null);
  const followerCursorRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const position = useRef({ x: 0, y: 0 });
  const mainCursorPosition = useRef({ x: 0, y: 0 });
  const followerCursorPosition = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number | null>(null);
>>>>>>> 17bbe71 (1. in this form only subject option available after in select enquiry op)

  // Mount check to avoid SSR issues
  useEffect(() => {
<<<<<<< HEAD
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Disable cursor on mobile or if not mounted
    if (!isMounted || isMobile) {
      if (dotRef.current) gsap.set(dotRef.current, { opacity: 0, scale: 0 });
      if (ringRef.current) gsap.set(ringRef.current, { opacity: 0, scale: 0 });
=======
    if (isMobile) {
      if (mainCursorRef.current) mainCursorRef.current.style.display = 'none';
      if (followerCursorRef.current) followerCursorRef.current.style.display = 'none';
>>>>>>> 17bbe71 (1. in this form only subject option available after in select enquiry op)
      return;
    } else {
      if (mainCursorRef.current) mainCursorRef.current.style.display = 'block';
      if (followerCursorRef.current) followerCursorRef.current.style.display = 'block';
    }

<<<<<<< HEAD
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
=======
    const onMouseMove = (e: MouseEvent) => {
      position.current = { x: e.clientX, y: e.clientY };
    };

    const animateCursors = () => {
      const { x, y } = position.current;
      mainCursorPosition.current.x += (x - mainCursorPosition.current.x) * 0.9;
      mainCursorPosition.current.y += (y - mainCursorPosition.current.y) * 0.9;

      followerCursorPosition.current.x += (x - followerCursorPosition.current.x) * 0.1;
      followerCursorPosition.current.y += (y - followerCursorPosition.current.y) * 0.1;

      if (mainCursorRef.current) {
        mainCursorRef.current.style.transform = `translate3d(${mainCursorPosition.current.x - 2}px, ${mainCursorPosition.current.y - 2}px, 0)`;
      }
      if (followerCursorRef.current) {
        followerCursorRef.current.style.transform = `translate3d(${followerCursorPosition.current.x - 12}px, ${followerCursorPosition.current.y - 12}px, 0)`;
      }

      animationFrameId.current = requestAnimationFrame(animateCursors);
>>>>>>> 17bbe71 (1. in this form only subject option available after in select enquiry op)
    };

    // Handle hover effects on interactive elements
    const onMouseOver = (e: MouseEvent) => {
      if (e.target && (e.target as HTMLElement).closest('a, button, [role="button"], [data-interactive-cursor="true"]')) {
<<<<<<< HEAD
        gsap.to(ringEl, { 
          scale: 1.5,
          duration: 0.3,
          ease: 'power2.out'
        });
        gsap.to(dotEl, { 
          scale: 0.7,
          duration: 0.3,
          ease: 'power2.out'
=======
        gsap.to(followerCursorRef.current, { 
          scale: 2.0,
          duration: 0.4, 
          ease: 'power2.out' 
        });
        gsap.to(mainCursorRef.current, {
           scale: 0,
           duration: 0.4, 
           ease: 'power2.out'
>>>>>>> 17bbe71 (1. in this form only subject option available after in select enquiry op)
        });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
<<<<<<< HEAD
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
        ref={ringRef}
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
=======
      const target = e.target as HTMLElement;
      const relatedTarget = e.relatedTarget as HTMLElement | null;
      const isLeavingInteractive = target.closest('a, button, [role="button"], [data-interactive-cursor="true"]');
      const isEnteringInteractive = relatedTarget?.closest('a, button, [role="button"], [data-interactive-cursor="true"]');

      if (isLeavingInteractive && !isEnteringInteractive) {
        gsap.to(followerCursorRef.current, { 
          scale: 1, 
          duration: 0.4, 
          ease: 'power2.out' 
        });
        gsap.to(mainCursorRef.current, { 
          scale: 1, 
          duration: 0.4, 
          ease: 'power2.out' 
        });
      }
    };

    const onMouseDown = () => {
        gsap.to(followerCursorRef.current, { 
            scale: 0.8, 
            duration: 0.2, 
            ease: 'power2.out' 
        });
    };

    const onMouseUp = () => {
        gsap.to(followerCursorRef.current, { 
            scale: 1, 
            duration: 0.2, 
            ease: 'power2.out' 
        });
    };
    
    document.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseover', onMouseOver);
    document.body.addEventListener('mouseout', onMouseOut);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);

    animationFrameId.current = requestAnimationFrame(animateCursors);

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      document.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseover', onMouseOver);
      document.body.removeEventListener('mouseout', onMouseOut);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [isMobile]);

  return (
    <>
      <div
        ref={mainCursorRef}
        className="fixed top-0 left-0 w-1 h-1 rounded-full bg-primary pointer-events-none z-[9999]"
      />
      <div
        ref={followerCursorRef}
        className="fixed top-0 left-0 w-6 h-6 rounded-full border-2 border-primary pointer-events-none z-[9999] transition-transform duration-300 ease-out"
        style={{mixBlendMode: 'difference'}}
>>>>>>> 17bbe71 (1. in this form only subject option available after in select enquiry op)
      />
    </>
  );
};

export default CustomCursor;
