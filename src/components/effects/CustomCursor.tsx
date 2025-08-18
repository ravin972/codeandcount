
"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useIsMobile } from '@/hooks/use-mobile';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const position = useRef({ x: 0, y: 0 });
  const cursorPosition = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    if (isMobile) {
      if (cursorRef.current) cursorRef.current.style.display = 'none';
      return;
    } else {
      if (cursorRef.current) cursorRef.current.style.display = 'block';
    }

    const onMouseMove = (e: MouseEvent) => {
      position.current = { x: e.clientX, y: e.clientY };
    };

    const animateCursor = () => {
      const { x, y } = position.current;
      cursorPosition.current.x += (x - cursorPosition.current.x) * 0.15;
      cursorPosition.current.y += (y - cursorPosition.current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorPosition.current.x}px, ${cursorPosition.current.y}px, 0)`;
      }

      animationFrameId.current = requestAnimationFrame(animateCursor);
    };

    const onMouseOver = (e: MouseEvent) => {
      if (e.target && (e.target as HTMLElement).closest('a, button, [role="button"], [data-interactive-cursor="true"]')) {
        gsap.to(cursorRef.current, {
          width: '32px',
          height: '32px',
          duration: 0.4,
          ease: 'power3.out'
        });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const relatedTarget = e.relatedTarget as HTMLElement | null;
      const isLeavingInteractive = target.closest('a, button, [role="button"], [data-interactive-cursor="true"]');
      const isEnteringInteractive = relatedTarget?.closest('a, button, [role="button"], [data-interactive-cursor="true"]');

      if (isLeavingInteractive && !isEnteringInteractive) {
        gsap.to(cursorRef.current, {
          width: '8px',
          height: '8px',
          duration: 0.4,
          ease: 'power3.out'
        });
      }
    };
    
    document.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseover', onMouseOver);
    document.body.addEventListener('mouseout', onMouseOut);
    animationFrameId.current = requestAnimationFrame(animateCursor);

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      document.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseover', onMouseOver);
      document.body.removeEventListener('mouseout', onMouseOut);
    };
  }, [isMobile]);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-2 h-2 rounded-full bg-foreground pointer-events-none z-[9999]"
      style={{
        transform: 'translate(-50%, -50%)',
        mixBlendMode: 'difference',
      }}
    />
  );
};

export default CustomCursor;
