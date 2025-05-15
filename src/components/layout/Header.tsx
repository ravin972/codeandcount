
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Briefcase, Users, Rss, Mail, Sparkles } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import React from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';

const navLinks = [
  { href: '/services', label: 'Services', icon: <Briefcase className="h-5 w-5" /> },
  { href: '/work', label: 'Work', icon: <Sparkles className="h-5 w-5" /> },
  { href: '/about', label: 'About', icon: <Users className="h-5 w-5" /> },
  { href: '/blog', label: 'Blog', icon: <Rss className="h-5 w-5" /> },
  { href: '/contact', label: 'Contact', icon: <Mail className="h-5 w-5" /> },
];

const NAVBAR_VISIBILITY_OFFSET = 60; // Distance from top where scroll behavior changes from "always visible"
const SCROLL_DELTA_THRESHOLD = 5;    // Min scroll change to trigger visibility update
const SERVICES_SECTION_HIDE_THRESHOLD = 500; // Approx. scrollY to hide navbar (simulating services section reaching top)
const CONDENSE_THRESHOLD = 100; // ScrollY past which condensation applies if navbar is visible

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  
  const [isNavVisible, setIsNavVisible] = React.useState(true);
  const [isCondensed, setIsCondensed] = React.useState(false);
  const lastScrollYRef = React.useRef(0);

  // Refs for current state values to avoid stale closures in event listener
  const isNavVisibleRef = React.useRef(isNavVisible);
  const isCondensedRef = React.useRef(isCondensed);

  React.useEffect(() => {
    isNavVisibleRef.current = isNavVisible;
  }, [isNavVisible]);

  React.useEffect(() => {
    isCondensedRef.current = isCondensed;
  }, [isCondensed]);

  React.useEffect(() => {
    const handleScroll = () => {
      if (typeof window === 'undefined') return;

      const currentScrollY = window.scrollY;
      const previousScrollY = lastScrollYRef.current;
      
      // Determine scroll direction only if not at the very top
      const scrollDirection = (currentScrollY > previousScrollY) ? 'down' : 'up';

      if (Math.abs(currentScrollY - previousScrollY) < SCROLL_DELTA_THRESHOLD && currentScrollY > NAVBAR_VISIBILITY_OFFSET) {
        // Not enough scroll to trigger change, unless we are near the top or crossing a major threshold
      }

      let shouldBeVisibleState: boolean;
      let shouldBeCondensedState: boolean;

      // 1. Determine Visibility (isNavVisible)
      if (currentScrollY > SERVICES_SECTION_HIDE_THRESHOLD) {
        shouldBeVisibleState = false; // Definitively hide if past services section
      } else if (currentScrollY <= NAVBAR_VISIBILITY_OFFSET) {
        shouldBeVisibleState = true;  // Always visible at the very top
      } else {
        // Between top and services threshold: show on scroll up, hide on scroll down
        shouldBeVisibleState = (scrollDirection === 'up');
      }
      
      // 2. Determine Condensation (isCondensed)
      // Condense if visible, scrolled past CONDENSE_THRESHOLD, and before SERVICES_SECTION_HIDE_THRESHOLD
      if (shouldBeVisibleState && currentScrollY > CONDENSE_THRESHOLD && currentScrollY < SERVICES_SECTION_HIDE_THRESHOLD) {
        shouldBeCondensedState = true;
      } else {
        // Not condensed at the very top, when hidden, or when scrolling up into the zone below CONDENSE_THRESHOLD
        shouldBeCondensedState = false;
      }

      // Apply state changes if different from current
      if (shouldBeVisibleState !== isNavVisibleRef.current) {
        setIsNavVisible(shouldBeVisibleState);
      }
      if (shouldBeCondensedState !== isCondensedRef.current) {
        setIsCondensed(shouldBeCondensedState);
      }

      lastScrollYRef.current = currentScrollY;
    };
    
    // Initialize state based on initial scroll position
    if (typeof window !== 'undefined') {
        const initialScrollY = window.scrollY;
        lastScrollYRef.current = initialScrollY;
        
        let initialVisibleState: boolean;
        if (initialScrollY > SERVICES_SECTION_HIDE_THRESHOLD) {
            initialVisibleState = false;
        } else if (initialScrollY <= NAVBAR_VISIBILITY_OFFSET) {
            initialVisibleState = true;
        } else {
            // If loaded in the middle zone, default to visible. User must scroll down to hide it.
            initialVisibleState = true; 
        }
        setIsNavVisible(initialVisibleState);

        let initialCondensedState: boolean;
        if (initialVisibleState && initialScrollY > CONDENSE_THRESHOLD && initialScrollY < SERVICES_SECTION_HIDE_THRESHOLD) {
            initialCondensedState = true;
        } else {
            initialCondensedState = false;
        }
        setIsCondensed(initialCondensedState);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-transform duration-300 ease-in-out",
        isNavVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="p-3 md:p-4"> {/* Padding around the glassmorphic bar */}
        <div
          className={cn(
            "container mx-auto flex h-16 items-center justify-between rounded-full px-4 py-2 shadow-xl backdrop-blur-lg bg-background/70", // Glassmorphic bar
            "sm:px-6"
            // The "condense" effect is handled by adjusting child element spacing/padding directly
          )}
        >
          {/* Logo - Left */}
          <Link href="/" className="text-3xl font-bold text-foreground hover:opacity-80 transition-opacity" onClick={() => setIsMobileMenuOpen(false)}>
            C<span className="text-primary">2</span>
          </Link>

          {/* Navigation Links - Center (Desktop) */}
          <nav className={cn(
            "hidden md:flex flex-grow justify-center items-center transition-all duration-300 ease-in-out",
            isCondensed ? "space-x-0.5 lg:space-x-1" : "space-x-1 lg:space-x-2"
            )}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-all duration-300 ease-in-out hover:text-primary rounded-md",
                  isCondensed ? "px-2 py-1" : "px-2.5 py-1.5",
                  pathname === link.href ? "text-primary bg-primary/10" : "text-foreground/80 hover:bg-accent/50"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA and Theme Toggle - Right (Desktop) */}
          <div className={cn(
            "hidden md:flex items-center transition-all duration-300 ease-in-out",
            isCondensed ? "space-x-2 lg:space-x-2" : "space-x-3 lg:space-x-4"
            )}>
            <Button asChild 
              size="sm" 
              className={cn(
                "rounded-full transition-all duration-300 ease-in-out",
                isCondensed ? "px-3 py-1 text-xs h-8" : "h-9 px-4" // Adjusted for size 'sm'
              )}
            >
              <Link href="/contact#start-project">Start a project</Link>
            </Button>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Trigger & Theme Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="border-transparent hover:border-border rounded-full">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs bg-background p-6">
                <div className="flex flex-col space-y-6">
                  <Link href="/" className="text-2xl font-bold text-foreground self-start hover:opacity-80 transition-opacity" onClick={() => setIsMobileMenuOpen(false)}>
                    C<span className="text-primary">2</span>
                  </Link>
                  <nav className="flex flex-col space-y-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center space-x-3 rounded-md p-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                          pathname === link.href ? "bg-accent text-accent-foreground" : "text-foreground/80"
                        )}
                      >
                        {link.icon}
                        <span>{link.label}</span>
                      </Link>
                    ))}
                  </nav>
                  <Button asChild className="w-full rounded-full" onClick={() => setIsMobileMenuOpen(false)}>
                    <Link href="/contact#start-project">Start a project</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
