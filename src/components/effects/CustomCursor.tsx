
"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const CustomCursor: React.FC = () => {
  const mainCursorRef = useRef<HTMLDivElement>(null);
  const followerCursorRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const position = useRef({ x: 0, y: 0 });
  const mainCursorPosition = useRef({ x: 0, y: 0 });
  const followerCursorPosition = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    if (isMobile) {
      if (mainCursorRef.current) mainCursorRef.current.style.display = 'none';
      if (followerCursorRef.current) followerCursorRef.current.style.display = 'none';
      return;
    } else {
      if (mainCursorRef.current) mainCursorRef.current.style.display = 'block';
      if (followerCursorRef.current) followerCursorRef.current.style.display = 'block';
    }

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
    };

    const onMouseOver = (e: MouseEvent) => {
      if (e.target && (e.target as HTMLElement).closest('a, button, [role="button"], [data-interactive-cursor="true"]')) {
        gsap.to(followerCursorRef.current, {
          scale: 2.0,
          duration: 0.4,
          ease: 'power2.out'
        });
        gsap.to(mainCursorRef.current, {
           scale: 0,
           duration: 0.4,
           ease: 'power2.out'
        });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
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
      />
    </>
  );
};

export default CustomCursor;
