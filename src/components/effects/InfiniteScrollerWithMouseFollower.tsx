
"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const InfiniteScrollerWithMouseFollower: React.FC = () => {
  const scrollerContainerRef1 = useRef<HTMLDivElement>(null);
  const textRef1_1 = useRef<HTMLSpanElement>(null);
  const textRef1_2 = useRef<HTMLSpanElement>(null);

  const scrollerContainerRef2 = useRef<HTMLDivElement>(null);
  const textRef2_1 = useRef<HTMLSpanElement>(null);
  const textRef2_2 = useRef<HTMLSpanElement>(null);
  
  const mouseFollowerRef = useRef<HTMLDivElement>(null);
  const interactiveSectionRef = useRef<HTMLDivElement>(null);

  const scrollText = "Let's work together. "; // Trailing space for seamless loop

  useEffect(() => {
    const follower = mouseFollowerRef.current;
    const section = interactiveSectionRef.current;

    if (follower) {
      gsap.set(follower, { xPercent: -50, yPercent: -50, scale: 1 });
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

      const interactiveElementsSelector = 'button, [role="button"], a[class*="inline-flex items-center justify-center"][href]';
      
      const updateFollowerScale = (e: MouseEvent) => {
        if (!follower) return;

        const target = e.target as HTMLElement;
        let newScale = 1.0;
        let newScaleTargetType = 'default';

        if (target.closest(interactiveElementsSelector)) {
          newScale = 2.5;
          newScaleTargetType = 'interactive';
        } else if (section && section.contains(target)) {
          newScale = 1.5;
          newScaleTargetType = 'section';
        }
        
        if (String(follower.dataset.currentGsapScaleTargetType) !== newScaleTargetType) {
          gsap.to(follower, { scale: newScale, duration: 0.2, ease: 'power1.out' });
          follower.dataset.currentGsapScaleTargetType = newScaleTargetType;
        }
      };
      document.body.addEventListener('mousemove', updateFollowerScale);
      
      return () => {
        window.removeEventListener("mousemove", handleMouseMoveForPosition);
        document.body.removeEventListener('mousemove', updateFollowerScale);
        gsap.ticker.remove(ticker);
      };
    }
  }, []);


  useEffect(() => {
    // Row 1: Right-to-Left Scroll
    const container1 = scrollerContainerRef1.current;
    const el1_1 = textRef1_1.current;
    const el1_2 = textRef1_2.current;

    if (container1 && el1_1 && el1_2) {
        gsap.delayedCall(0.1, () => {
            const elWidth1 = el1_1.offsetWidth;
            if (elWidth1 === 0) return; 

            gsap.set(el1_2, { x: elWidth1 });
            gsap.to(container1, {
                x: -elWidth1,
                duration: elWidth1 / 70, // Base speed
                ease: 'none',
                repeat: -1,
            });
        });
    }

    // Row 2: Left-to-Right Scroll (Faster)
    const container2 = scrollerContainerRef2.current;
    const el2_1 = textRef2_1.current;
    const el2_2 = textRef2_2.current;

    if (container2 && el2_1 && el2_2) {
        gsap.delayedCall(0.1, () => {
            const elWidth2 = el2_1.offsetWidth;
            if (elWidth2 === 0) return;

            gsap.set(el2_1, { x: 0 }); // First part of text row 2
            gsap.set(el2_2, { x: -elWidth2 }); // Second part of text row 2, starts to the left
            
            gsap.to(container2, {
                x: elWidth2, // Scroll to the right by one text width
                duration: elWidth2 / 50, // Faster speed (smaller divisor)
                ease: 'none',
                repeat: -1,
            });
        });
    }
  }, [scrollText]); 

  return (
    <section 
      ref={interactiveSectionRef}
      className="relative bg-black text-white py-20 md:py-32 overflow-hidden cursor-none group"
    >
      <div className="relative flex whitespace-nowrap" ref={scrollerContainerRef1}>
        <span ref={textRef1_1} className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold uppercase pr-2">
          {scrollText}
        </span>
        <span ref={textRef1_2} className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold uppercase pr-2">
          {scrollText}
        </span>
      </div>
      <div className="relative flex whitespace-nowrap mt-2 md:mt-4" ref={scrollerContainerRef2}> {/* Added margin for separation */}
        <span ref={textRef2_1} className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold uppercase pr-2">
          {scrollText}
        </span>
        <span ref={textRef2_2} className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold uppercase pr-2">
          {scrollText}
        </span>
      </div>
      <div
        ref={mouseFollowerRef}
        className="fixed top-0 left-0 w-5 h-5 bg-white rounded-full pointer-events-none z-[9999] hidden md:block opacity-75"
        style={{ mixBlendMode: 'difference' }}
      ></div>
    </section>
  );
};

export default InfiniteScrollerWithMouseFollower;

    
