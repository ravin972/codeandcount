
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Gamepad2 } from 'lucide-react'; 
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function FloatingGameZoneButton() {
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Determine visibility based on pathname
    const shouldBeVisible = !pathname.startsWith('/games');
    setIsVisible(shouldBeVisible);

    if (shouldBeVisible && buttonRef.current) {
      // Floating animation for the button
      gsap.to(buttonRef.current, {
        y: -8,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5, // Start with a slight delay
      });
    }
  }, [pathname]);

  // Always render the component structure, but hide it based on state
  if (!isVisible) {
    return null;
  }

  return (
    <Button
      ref={buttonRef}
      asChild
      className={cn(
        "fixed bottom-28 left-8 z-50 h-16 w-16 rounded-full shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/80",
        "bg-gradient-to-tr from-accent via-primary/80 to-secondary text-white flex items-center justify-center"
      )}
      aria-label="Visit Game Zone"
      data-interactive-cursor="true"
    >
      <Link href="/games">
        <Gamepad2 className="h-8 w-8 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
      </Link>
    </Button>
  );
}
