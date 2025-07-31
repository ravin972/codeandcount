
"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import '../../styles/scroller.css'; // We will create this new CSS file

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

const InfiniteScrollerWithMouseFollower: React.FC = () => {
  return (
    <section 
      className="relative bg-background/50 dark:bg-neutral-900/50 py-20 md:py-32 overflow-hidden border-y border-border/50"
      style={{
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
      data-interactive-cursor="true"
    >
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
    </section>
  );
};

export default InfiniteScrollerWithMouseFollower;
