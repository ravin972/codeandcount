
"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const InfiniteScrollerWithMouseFollower: React.FC = () => {
  const scrollerContainerRef = useRef<HTMLDivElement>(null); // The div that moves
  const textRef1 = useRef<HTMLSpanElement>(null); // First text span
  const textRef2 = useRef<HTMLSpanElement>(null); // Second text span (duplicate)
  const mouseFollowerRef = useRef<HTMLDivElement>(null);
  const interactiveSectionRef = useRef<HTMLDivElement>(null); // Ref for the main section

  const scrollText = "Let's work together. "; // Trailing space for seamless loop

  useEffect(() => {
    const follower = mouseFollowerRef.current;
    const section = interactiveSectionRef.current;

    if (follower) {
      gsap.set(follower, { xPercent: -50, yPercent: -50, scale: 1 }); // Center the follower and set base scale
      const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      const mouse = { x: pos.x, y: pos.y };
      const speed = 0.1; 

      const xSet = gsap.quickSetter(follower, "x", "px");
      const ySet = gsap.quickSetter(follower, "y", "px");

      const handleMouseMoveForPosition = (e: MouseEvent) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      };
      window.addEventListener("mousemove", handleMouseMoveForPosition);

      const ticker = gsap.ticker.add(() => {
        const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
        pos.x += (mouse.x - pos.x) * dt;
        pos.y += (mouse.y - pos.y) * dt;
        xSet(pos.x);
        ySet(pos.y);
      });

      // Mouse move listener for scaling effects
      const interactiveElementsSelector = 'button, [role="button"], a[class*="inline-flex items-center justify-center"][href]';
      
      const updateFollowerScale = (e: MouseEvent) => {
        if (!follower) return;

        const target = e.target as HTMLElement;
        let newScale = 1.0;
        let newScaleTargetType = 'default';

        if (target.closest(interactiveElementsSelector)) {
          newScale = 2.5; // Larger scale for buttons/CTAs
          newScaleTargetType = 'interactive';
        } else if (section && section.contains(target)) {
          newScale = 1.5; // Moderate scale for the scroller section
          newScaleTargetType = 'section';
        }
        
        // Animate only if the scale or target type has changed
        if (String(follower.dataset.currentGsapScaleTargetType) !== newScaleTargetType) {
          gsap.to(follower, { scale: newScale, duration: 0.2, ease: 'power1.out' });
          follower.dataset.currentGsapScaleTargetType = newScaleTargetType;
        }
      };
      document.body.addEventListener('mousemove', updateFollowerScale);
      
      // Cleanup
      return () => {
        window.removeEventListener("mousemove", handleMouseMoveForPosition);
        document.body.removeEventListener('mousemove', updateFollowerScale);
        gsap.ticker.remove(ticker);
      };
    }
  }, []); // Empty dependency array ensures this runs once on mount


  useEffect(() => {
    // Infinite Scroller Logic
    const container = scrollerContainerRef.current;
    const el1 = textRef1.current;
    const el2 = textRef2.current;

    if (container && el1 && el2) {
        gsap.delayedCall(0.1, () => {
            const elWidth = el1.offsetWidth;
            if (elWidth === 0) return; 

            gsap.set(el2, { x: elWidth });
            gsap.to(container, {
                x: -elWidth,
                duration: elWidth / 70, 
                ease: 'none',
                repeat: -1,
            });
        });
    }
  }, [scrollText]); 

  return (
    <section 
      ref={interactiveSectionRef} // Assign ref to the section
      className="relative bg-black text-white py-20 md:py-32 overflow-hidden cursor-none group"
    >
      <div className="relative flex whitespace-nowrap" ref={scrollerContainerRef}>
        <span ref={textRef1} className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold uppercase pr-2">
          {scrollText}
        </span>
        <span ref={textRef2} className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold uppercase pr-2">
          {scrollText}
        </span>
      </div>
      <div
        ref={mouseFollowerRef}
        className="fixed top-0 left-0 w-5 h-5 bg-white rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{ mixBlendMode: 'difference' }} // GSAP will handle scale
      ></div>
    </section>
  );
};

export default InfiniteScrollerWithMouseFollower;
