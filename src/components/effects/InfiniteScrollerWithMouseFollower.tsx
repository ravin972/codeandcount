
"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const InfiniteScrollerWithMouseFollower: React.FC = () => {
  const scrollerContainerRef = useRef<HTMLDivElement>(null); // The div that moves
  const textRef1 = useRef<HTMLSpanElement>(null); // First text span
  const textRef2 = useRef<HTMLSpanElement>(null); // Second text span (duplicate)
  const mouseFollowerRef = useRef<HTMLDivElement>(null);

  const scrollText = "Let's work together. "; // Trailing space for seamless loop

  useEffect(() => {
    // Mouse Follower Logic
    const follower = mouseFollowerRef.current;
    if (follower) {
      gsap.set(follower, { xPercent: -50, yPercent: -50 }); // Center the follower on cursor
      const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      const mouse = { x: pos.x, y: pos.y };
      const speed = 0.1; // Smoothing factor for follower movement

      const xSet = gsap.quickSetter(follower, "x", "px");
      const ySet = gsap.quickSetter(follower, "y", "px");

      const handleMouseMove = (e: MouseEvent) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      };
      window.addEventListener("mousemove", handleMouseMove);

      // GSAP ticker for smooth animation independent of scroll
      gsap.ticker.add(() => {
        const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
        pos.x += (mouse.x - pos.x) * dt;
        pos.y += (mouse.y - pos.y) * dt;
        xSet(pos.x);
        ySet(pos.y);
      });
      
      // Cleanup
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        // Potentially kill GSAP ticker if it was added specifically for this component
        // and not globally. For quickSetter, this is often not needed to kill tweens.
      };
    }
  }, []);


  useEffect(() => {
    // Infinite Scroller Logic
    const container = scrollerContainerRef.current;
    const el1 = textRef1.current;
    const el2 = textRef2.current;

    if (container && el1 && el2) {
        // Use a small delay to ensure offsetWidth is calculated correctly after render
        gsap.delayedCall(0.1, () => {
            const elWidth = el1.offsetWidth;
            if (elWidth === 0) return; // Element not rendered or width is zero

            // Position el2 right after el1
            gsap.set(el2, { x: elWidth });

            // Animate the container (which holds el1 and el2)
            // Moves left by the width of one text element, then repeats
            gsap.to(container, {
                x: -elWidth,
                duration: elWidth / 70, // Adjust speed: lower divisor = faster scroll
                ease: 'none',
                repeat: -1,
            });
        });
    }
  }, [scrollText]); // Re-run if scrollText changes, though it's constant here

  return (
    <section className="relative bg-black text-white py-20 md:py-32 overflow-hidden cursor-none group">
      {/* Wrapper for the horizontally scrolling elements */}
      <div className="relative flex whitespace-nowrap" ref={scrollerContainerRef}>
        <span ref={textRef1} className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold uppercase pr-2"> {/* pr-2 for spacing between repeats */}
          {scrollText}
        </span>
        <span ref={textRef2} className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold uppercase pr-2">
          {scrollText}
        </span>
      </div>
      <div
        ref={mouseFollowerRef}
        className="fixed top-0 left-0 w-5 h-5 bg-white rounded-full pointer-events-none z-[9999] hidden md:block group-hover:scale-150 transition-transform duration-300 ease-out"
        style={{ mixBlendMode: 'difference' }}
      ></div>
    </section>
  );
};

export default InfiniteScrollerWithMouseFollower;
