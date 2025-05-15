
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

const NAVBAR_VISIBILITY_OFFSET = 60; // Distance from top to start applying scroll hide/show
const SCROLL_DELTA_THRESHOLD = 5; // Minimum scroll change (px) to trigger visibility change

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isNavVisible, setIsNavVisible] = React.useState(true);
  const lastScrollYRef = React.useRef(0);
  const isNavVisibleRef = React.useRef(true); // To prevent stale closure in event listener

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      lastScrollYRef.current = window.scrollY;
      const initialScrollY = window.scrollY;
      // Initially, show if near top
      const shouldBeVisibleInitially = initialScrollY <= NAVBAR_VISIBILITY_OFFSET;
      setIsNavVisible(shouldBeVisibleInitially);
      isNavVisibleRef.current = shouldBeVisibleInitially;
    }

    const handleScroll = () => {
      if (typeof window === 'undefined') return;

      const currentScrollY = window.scrollY;
      const previousScrollY = lastScrollYRef.current;

      if (Math.abs(currentScrollY - previousScrollY) < SCROLL_DELTA_THRESHOLD) {
        return; // Not enough scroll to trigger change
      }

      let shouldShow;
      if (currentScrollY <= NAVBAR_VISIBILITY_OFFSET) { // If at top or scrolled to top
        shouldShow = true;
      } else if (currentScrollY < previousScrollY) { // Scrolling UP - SHOW
        shouldShow = true;
      } else { // Scrolling DOWN (currentScrollY > previousScrollY) - HIDE
        shouldShow = false;
      }
      
      if (shouldShow !== isNavVisibleRef.current) {
        setIsNavVisible(shouldShow);
        isNavVisibleRef.current = shouldShow;
      }

      lastScrollYRef.current = currentScrollY;
    };

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
      <div className="p-3 md:p-4"> {/* Padding around the glassmorphic bar */}
        <div
          className="container mx-auto flex h-16 items-center justify-between rounded-full 
                     bg-background/70 px-4 py-2 shadow-xl backdrop-blur-lg 
                     sm:px-6" // The actual glassmorphic bar
        >
          {/* Logo - Left */}
          <Link href="/" className="text-3xl font-bold text-foreground hover:opacity-80 transition-opacity" onClick={() => setIsMobileMenuOpen(false)}>
            C<span className="text-primary">2</span>
          </Link>

          {/* Navigation Links - Center (Desktop) */}
          <nav className="hidden md:flex flex-grow justify-center items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary px-2.5 py-1.5 rounded-md",
                  pathname === link.href ? "text-primary bg-primary/10" : "text-foreground/80 hover:bg-accent/50"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA and Theme Toggle - Right (Desktop) */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            <Button asChild size="sm" className="rounded-full">
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
