
"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const InfiniteScrollerWithMouseFollower: React.FC = () => {
  const scrollerContainerRef1 = useRef<HTMLDivElement>(null);
  const textRef1_1 = useRef<HTMLDivElement>(null);
  const textRef1_2 = useRef<HTMLDivElement>(null);

  const scrollerContainerRef2 = useRef<HTMLDivElement>(null);
  const textRef2_1 = useRef<HTMLDivElement>(null);
  const textRef2_2 = useRef<HTMLDivElement>(null);
  
  const interactiveSectionRef = useRef<HTMLDivElement>(null);

  const scrollTextContent = (
    <Link href="/contact#start-project" className="inline-flex items-center group/link">
      <span className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold uppercase pr-4 md:pr-6 lg:pr-8 text-muted-foreground group-hover/link:text-primary transition-colors duration-300">
        Let's work together.
      </span>
      <span className={cn(
        "ml-2 md:ml-4 mt-1 md:mt-2 flex-shrink-0",
        "w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20", 
        "rounded-full bg-primary flex items-center justify-center",
        "transition-transform duration-300 ease-in-out group-hover/link:scale-110"
      )}>
        <ArrowUpRight className="text-primary-foreground w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
      </span>
    </Link>
  );

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
        gsap.killTweensOf(container1); 
        gsap.set(container1, { x: 0 }); 
        gsap.set(el1_1, { x: 0 });    
        gsap.set(el1_2, { x: 0 });

        const elWidth1 = el1_1.offsetWidth;
        if (elWidth1 === 0) {
          // console.warn("GSAP Scroller: Row 1 text width is 0. Animation might not be seamless yet.");
          return; // Wait for width
        }
        
        gsap.set(el1_2, { x: elWidth1 });
        anim1 = gsap.to(container1, {
            x: -elWidth1,
            duration: elWidth1 / 70, 
            ease: 'none',
            repeat: -1,
        });
      }
    };

    const setupRow2Animation = () => {
      if (container2 && el2_1 && el2_2) {
        gsap.killTweensOf(container2); 
        gsap.set(container2, { x: 0 }); 
        gsap.set(el2_1, { x: 0 });    
        gsap.set(el2_2, { x: 0 });

        const elWidth2 = el2_1.offsetWidth;
        if (elWidth2 === 0) {
          // console.warn("GSAP Scroller: Row 2 text width is 0. Animation might not be seamless yet.");
          return; // Wait for width
        }
            
        gsap.set(el2_2, { x: -elWidth2 }); 
        anim2 = gsap.to(container2, {
            x: elWidth2,
            duration: elWidth2 / 50, 
            ease: 'none',
            repeat: -1,
        });
      }
    };
    
    let rafId: number;
    const attemptInitialization = () => {
      if (textRef1_1.current && textRef1_1.current.offsetWidth > 0 && textRef2_1.current && textRef2_1.current.offsetWidth > 0) {
        setupRow1Animation();
        setupRow2Animation();
      } else {
        // If elements don't have width yet (e.g., fonts not loaded), try again next frame
        rafId = requestAnimationFrame(attemptInitialization);
      }
    };
    
    // Use document.fonts.ready for font loading, then attempt initialization.
    document.fonts.ready.then(() => {
        attemptInitialization();
    }).catch(error => {
        // console.error("Font loading error or timeout for scroller, attempting init anyway:", error);
        // Fallback to attempt initialization even if fonts.ready fails (e.g. timeout)
        attemptInitialization();
    });

    window.addEventListener('resize', attemptInitialization);

    return () => {
        window.removeEventListener('resize', attemptInitialization);
        cancelAnimationFrame(rafId);
        anim1?.kill();
        anim2?.kill();
        if (container1) gsap.killTweensOf(container1);
        if (container2) gsap.killTweensOf(container2);
    };
  }, []); 

  return (
    <section 
      ref={interactiveSectionRef}
      className="relative bg-background dark:bg-neutral-900 py-20 md:py-32 overflow-hidden"
      data-interactive-cursor="true"
    >
      {/* Row 1: Right-to-Left Scroll */}
      <div className="relative flex whitespace-nowrap" ref={scrollerContainerRef1}>
        <div ref={textRef1_1} className="inline-block">
          {scrollTextContent}
        </div>
        <div ref={textRef1_2} className="inline-block">
          {scrollTextContent}
        </div>
      </div>
      {/* Row 2: Left-to-Right Scroll */}
      <div className="relative flex whitespace-nowrap mt-2 md:mt-4" ref={scrollerContainerRef2}>
        <div ref={textRef2_1} className="inline-block">
          {scrollTextContent}
        </div>
        <div ref={textRef2_2} className="inline-block">
          {scrollTextContent}
        </div>
      </div>
    </section>
  );
};

export default InfiniteScrollerWithMouseFollower;

