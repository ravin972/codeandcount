
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
    const container1 = scrollerContainerRef1.current;
    const el1_1 = textRef1_1.current;
    const el1_2 = textRef1_2.current;

    const container2 = scrollerContainerRef2.current;
    const el2_1 = textRef2_1.current;
    const el2_2 = textRef2_2.current;

    let anim1: gsap.core.Tween | null = null;
    let anim2: gsap.core.Tween | null = null;

    const setupRow1Animation = () => {
      if (container1 && el1_1 && el1_2) {
        gsap.killTweensOf(container1); // Kill previous animation
        gsap.set(container1, { x: 0 }); // Reset container position
        gsap.set(el1_1, { x: 0 });    // Reset span position for accurate width measurement
        gsap.set(el1_2, { x: 0 });

        const elWidth1 = el1_1.offsetWidth;
        if (elWidth1 === 0) {
          console.warn("GSAP Scroller: Row 1 text width is 0. Animation skipped.");
          return;
        }
        
        gsap.set(el1_2, { x: elWidth1 });
        anim1 = gsap.to(container1, {
            x: -elWidth1,
            duration: elWidth1 / 70, // Speed factor
            ease: 'none',
            repeat: -1,
        });
      }
    };

    const setupRow2Animation = () => {
      if (container2 && el2_1 && el2_2) {
        gsap.killTweensOf(container2); // Kill previous animation
        gsap.set(container2, { x: 0 }); // Reset container position
        gsap.set(el2_1, { x: 0 });    // Reset span position for accurate width measurement
        gsap.set(el2_2, { x: 0 });

        const elWidth2 = el2_1.offsetWidth;
        if (elWidth2 === 0) {
          console.warn("GSAP Scroller: Row 2 text width is 0. Animation skipped.");
          return;
        }
            
        gsap.set(el2_2, { x: -elWidth2 }); 
        anim2 = gsap.to(container2, {
            x: elWidth2,
            duration: elWidth2 / 50, // Faster speed factor
            ease: 'none',
            repeat: -1,
        });
      }
    };
    
    const initOrReinitAnimations = () => {
      // Use a small delay to allow layout stabilization after font load or resize
      gsap.delayedCall(0.1, () => {
        setupRow1Animation();
        setupRow2Animation();
      });
    };

    // Initial setup after fonts are ready (or fallback)
    document.fonts.ready.then(() => {
        initOrReinitAnimations();
    }).catch(error => {
        console.error("Font loading error or timeout for scroller, initializing anyway:", error);
        initOrReinitAnimations(); 
    });

    window.addEventListener('resize', initOrReinitAnimations);

    return () => {
        window.removeEventListener('resize', initOrReinitAnimations);
        anim1?.kill();
        anim2?.kill();
        // Fallback cleanup if refs are still valid
        if (container1) gsap.killTweensOf(container1);
        if (container2) gsap.killTweensOf(container2);
    };
  }, [scrollText]); // scrollText is a dependency, if it changes, animations re-initialize

  return (
    <section 
      ref={interactiveSectionRef}
      className="relative bg-black text-white py-20 md:py-32 overflow-hidden cursor-none group"
    >
      {/* Row 1: Right-to-Left Scroll */}
      <div className="relative flex whitespace-nowrap" ref={scrollerContainerRef1}>
        <span ref={textRef1_1} className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold uppercase pr-2">
          {scrollText}
        </span>
        <span ref={textRef1_2} className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold uppercase pr-2">
          {scrollText}
        </span>
      </div>
      {/* Row 2: Left-to-Right Scroll */}
      <div className="relative flex whitespace-nowrap mt-2 md:mt-4" ref={scrollerContainerRef2}>
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

