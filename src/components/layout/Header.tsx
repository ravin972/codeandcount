
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Briefcase, Users, Rss, Mail, Sparkles, ArrowUpRight } from 'lucide-react'; // Added ArrowUpRight
import { usePathname, useRouter } from 'next/navigation'; // Added useRouter
import { cn } from '@/lib/utils';
import React from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';

const navLinks = [
  { href: '/services', label: 'Services', icon: <Briefcase className="h-5 w-5" />, badgeText: '13' }, // Added badgeText
  { href: '/work', label: 'Work', icon: <Sparkles className="h-5 w-5" /> },
  { href: '/about', label: 'About', icon: <Users className="h-5 w-5" /> },
  { href: '/blog', label: 'Blog', icon: <Rss className="h-5 w-5" /> },
  { href: '/contact', label: 'Contact', icon: <Mail className="h-5 w-5" /> },
];

const NAVBAR_VISIBILITY_OFFSET = 60; 
const SCROLL_DELTA_THRESHOLD = 5;    
const SERVICES_SECTION_HIDE_THRESHOLD = 500; 
const CONDENSE_THRESHOLD = 100; 

export function Header() {
  const pathname = usePathname();
  const router = useRouter(); // Added router
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  
  const [isNavVisible, setIsNavVisible] = React.useState(true);
  const [isCondensed, setIsCondensed] = React.useState(false);
  const lastScrollYRef = React.useRef(0);

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
      
      const scrollDirection = (currentScrollY > previousScrollY) ? 'down' : 'up';

      if (Math.abs(currentScrollY - previousScrollY) < SCROLL_DELTA_THRESHOLD && currentScrollY > NAVBAR_VISIBILITY_OFFSET) {
        // Not enough scroll
      }

      let shouldBeVisibleState: boolean;
      let shouldBeCondensedState: boolean;

      if (currentScrollY > SERVICES_SECTION_HIDE_THRESHOLD) {
        shouldBeVisibleState = false; 
      } else if (currentScrollY <= NAVBAR_VISIBILITY_OFFSET) {
        shouldBeVisibleState = true;  
      } else {
        shouldBeVisibleState = (scrollDirection === 'up');
      }
      
      if (shouldBeVisibleState && currentScrollY > CONDENSE_THRESHOLD && currentScrollY < SERVICES_SECTION_HIDE_THRESHOLD) {
        shouldBeCondensedState = true;
      } else {
        shouldBeCondensedState = false;
      }

      if (shouldBeVisibleState !== isNavVisibleRef.current) {
        setIsNavVisible(shouldBeVisibleState);
      }
      if (shouldBeCondensedState !== isCondensedRef.current) {
        setIsCondensed(shouldBeCondensedState);
      }

      lastScrollYRef.current = currentScrollY;
    };
    
    if (typeof window !== 'undefined') {
        const initialScrollY = window.scrollY;
        lastScrollYRef.current = initialScrollY;
        
        let initialVisibleState: boolean;
        if (initialScrollY > SERVICES_SECTION_HIDE_THRESHOLD) {
            initialVisibleState = false;
        } else if (initialScrollY <= NAVBAR_VISIBILITY_OFFSET) {
            initialVisibleState = true;
        } else {
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
  }, []); 

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-transform duration-300 ease-in-out",
        isNavVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="p-3 md:p-4"> 
        <div
          className={cn(
            "container mx-auto flex h-16 items-center justify-between rounded-full px-4 py-2 shadow-xl backdrop-blur-lg bg-background/70", 
            "sm:px-6"
          )}
        >
          <Link href="/" className="text-3xl font-bold text-foreground hover:opacity-80 transition-opacity" onClick={() => setIsMobileMenuOpen(false)}>
            C<span className="text-primary">2</span>
          </Link>

          <nav className={cn(
            "hidden md:flex flex-grow justify-center items-center transition-all duration-300 ease-in-out",
            isCondensed ? "space-x-0.5 lg:space-x-1" : "space-x-1 lg:space-x-2"
            )}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-all duration-300 ease-in-out hover:text-primary rounded-md relative", // Added relative for badge
                  isCondensed ? "px-2 py-1" : "px-2.5 py-1.5",
                  pathname === link.href ? "text-primary bg-primary/10" : "text-foreground/80 hover:bg-accent/50"
                )}
              >
                {link.label}
                {link.badgeText && (
                  <span className={cn(
                    "absolute bg-primary text-primary-foreground text-[10px] font-bold rounded-full leading-none flex items-center justify-center",
                    "h-4 w-4 min-w-[1rem]", // Consistent size for badge
                    isCondensed ? "-top-1 -right-1.5" : "-top-1.5 -right-2.5" // Adjusted positioning
                  )}>
                    {link.badgeText}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          <div className={cn(
            "hidden md:flex items-center transition-all duration-300 ease-in-out",
            isCondensed ? "space-x-2 lg:space-x-2" : "space-x-3 lg:space-x-4"
            )}>
            <Button
              variant="default" // Ensure it picks up primary color
              size="sm" 
              className={cn(
                "rounded-full relative", // Added relative for icon positioning
                isCondensed ? "pl-3 pr-8 py-1 text-xs h-8" : "pl-4 pr-10 h-9" // Adjusted padding for icon
              )}
              onClick={() => router.push('/contact#start-project')}
            >
              <span>Start a project</span>
              <ArrowUpRight
                className={cn(
                  "absolute top-1/2 -translate-y-1/2",
                  isCondensed ? "right-2 h-3 w-3" : "right-2.5 h-4 w-4"
                )}
              />
            </Button>
            <ThemeToggle />
          </div>

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
                          "flex items-center space-x-3 rounded-md p-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground relative",
                          pathname === link.href ? "bg-accent text-accent-foreground" : "text-foreground/80"
                        )}
                      >
                        {link.icon}
                        <span>{link.label}</span>
                        {link.badgeText && (
                          <span className="ml-auto bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full leading-none">
                            {link.badgeText}
                          </span>
                        )}
                      </Link>
                    ))}
                  </nav>
                  <Button 
                    asChild 
                    className="w-full rounded-full" 
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      // router.push('/contact#start-project') // Already an <Link>
                    }}
                  >
                    <Link href="/contact#start-project" className="flex items-center justify-center">
                      Start a project
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
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
