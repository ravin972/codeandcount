
"use client";

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import '../../styles/scroller.css';
import { gsap } from 'gsap';

const scrollTextContent = (
  <Link href="/contact#start-project" className="inline-flex items-center group/link whitespace-nowrap px-8">
    <span className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold uppercase text-foreground/50 group-hover/link:text-primary transition-colors duration-300">
      Let's work together
    </span>
    <span className={cn(
      "ml-4 md:ml-6 flex-shrink-0",
      "w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20",
      "rounded-full bg-primary flex items-center justify-center",
      "transition-transform duration-300 ease-in-out group-hover/link:scale-110"
    )}>
      <ArrowUpRight className="text-primary-foreground w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
    </span>
  </Link>
);

const followerImages = [
  'https://images.unsplash.com/photo-1610979573089-78f2429d47d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxOXx8aGluZHUlMjBzcGlyaXR1YWx8ZW58MHx8fHwxNzUwNDEwNTExfDA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1531297484001-80022131f5a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHx0ZWNofGVufDB8fHx8MTc1MDQwNTQyNnww&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHx0cmF2ZWwlMjBpbWFnZXxlbnwwfHx8fDE3NTA0MDk5MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1675044794037-9262cedb6d5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxmdXR1cmlzdGljJTIwZGVzaWdufGVufDB8fHx8MTc1MDMxMDI4MXww&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1666537072157-440346cea066?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxzZW8lMjBjaGFydCUyMGdyYXBofGVufDB8fHx8MTc1MDMxMDI4MXww&ixlib=rb-4.1.0&q=80&w=1080',
];

const InfiniteScrollerWithMouseFollower: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    gsap.set(imageRefs.current, {
      xPercent: -50,
      yPercent: -50,
      scale: 0,
      opacity: 0,
    });

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const rect = container.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      
      gsap.to(imageRefs.current, {
        x: x,
        y: y,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.06,
      });
    };

    const onMouseEnter = () => {
      gsap.to(imageRefs.current, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
        stagger: 0.06,
      });
    };

    const onMouseLeave = () => {
      gsap.to(imageRefs.current, {
        scale: 0,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
        stagger: 0.06,
      });
    };

    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mouseleave', onMouseLeave);
    container.addEventListener('mousemove', onMouseMove);

    return () => {
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mouseleave', onMouseLeave);
      container.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-background/50 dark:bg-neutral-900/50 py-20 md:py-32 overflow-hidden border-y border-border/50"
      style={{
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
      data-interactive-cursor="true"
    >
      <div className="relative z-10">
        <div className="scroller" data-speed="slow">
          <div className="scroller__inner">
            {scrollTextContent}
            {scrollTextContent}
            {scrollTextContent}
            {scrollTextContent}
          </div>
        </div>
        <div className="scroller mt-4 md:mt-6" data-direction="right" data-speed="slow">
          <div className="scroller__inner">
            {scrollTextContent}
            {scrollTextContent}
            {scrollTextContent}
            {scrollTextContent}
          </div>
        </div>
      </div>

      {/* Mouse Follower Images */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        {followerImages.map((src, index) => (
          <Image
            key={index}
            ref={el => (imageRefs.current[index] = el)}
            src={src}
            alt="Showcase image"
            width={180}
            height={120}
            className="absolute top-0 left-0 w-[180px] h-[120px] object-cover rounded-lg shadow-xl"
          />
        ))}
      </div>
    </section>
  );
};

export default InfiniteScrollerWithMouseFollower;
