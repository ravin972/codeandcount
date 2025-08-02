
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Briefcase, Users, Rss, Mail, Sparkles, ArrowUpRight } from 'lucide-react'; 
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import React, { useState, useEffect, useRef } from 'react';
import { ThemeToggleButton } from '@/components/ui/theme-toggle-button';
import { gsap } from 'gsap';

const navLinks = [
  { href: '/services', label: 'Services', icon: <Briefcase className="h-5 w-5" /> },
  { href: '/work', label: 'Work', icon: <Sparkles className="h-5 w-5" /> },
  { href: '/about', label: 'About', icon: <Users className="h-5 w-5" /> },
  { href: '/blog', label: 'Blog', icon: <Rss className="h-5 w-5" /> },
  { href: '/contact', label: 'Contact', icon: <Mail className="h-5 w-5" /> },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const headerElement = headerRef.current;
    if (!headerElement) return;

    // Selectors for animation targets
    const logoEl = headerElement.querySelector('.header-logo');
    const navItems = gsap.utils.toArray(headerElement.querySelectorAll('.nav-link-item'));
    const ctaSection = headerElement.querySelector('.header-cta-section');

    // Set initial states
    gsap.set(logoEl, { opacity: 0, scale: 0.9 });
    gsap.set(navItems, { opacity: 0, y: -20 });
    gsap.set(ctaSection, { opacity: 0, x: 50 });

    // Create a timeline for a synchronized animation sequence
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      delay: 0.2 // Small delay before starting the whole animation
    });

    tl.to(logoEl, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
    })
    .to(navItems, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1, // Stagger the animation for each nav item
    }, "-=0.5") // Overlap with the logo animation slightly
    .to(ctaSection, {
      opacity: 1,
      x: 0,
      duration: 0.8,
    }, "-=0.6"); // Overlap this animation as well

  }, []);

  return (
    <header ref={headerRef} className="relative h-24">
      <div className="fixed top-0 left-0 right-0 z-50 p-4 md:p-6 flex items-center justify-between pointer-events-none">
        
        {/* Logo Section (Top Left) */}
        <div className="flex-shrink-0 header-logo" style={{ pointerEvents: 'auto' }}>
           <Link 
            href="/" 
            className="font-bold text-2xl hover:opacity-80 transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Code<span className="text-primary">&amp;</span>Count
          </Link>
        </div>

        {/* Centered Desktop Navigation */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ pointerEvents: 'auto' }}>
           <div className="flex items-center justify-center gap-1 bg-card/80 backdrop-blur-md border border-border shadow-lg rounded-full px-3 py-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "font-medium transition-colors duration-200 rounded-full text-sm", 
                    "px-3 py-1.5 nav-link-item", // Added class for animation targeting
                    pathname === link.href || pathname.startsWith(link.href + '/') 
                      ? "text-primary bg-primary/10" 
                      : "text-card-foreground/80 hover:bg-accent/50 hover:text-accent-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
           </div>
        </div>

        {/* CTA & Theme Toggle Section (Top Right) */}
        <div className="hidden md:flex items-center gap-3 header-cta-section" style={{ pointerEvents: 'auto' }}>
          <Button
            asChild
            variant="default"
            size="default" 
            className="rounded-full group"
          >
            <Link href="/contact#start-project">
              <span>Start a project</span>
              <ArrowUpRight className="ml-1 h-4 w-4 transition-transform duration-300 ease-in-out group-hover:rotate-45" />
            </Link>
          </Button>
          <ThemeToggleButton variant="circle-blur" start="top-right" />
        </div>

        {/* Mobile Menu Trigger */}
        <div className="md:hidden flex items-center space-x-3" style={{ pointerEvents: 'auto' }}>
          <ThemeToggleButton variant="circle-blur" start="top-right" />
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs p-6"> 
              <SheetHeader>
                <SheetTitle className="sr-only">Main Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-6 mt-4"> 
                <Link href="/" className="text-2xl font-bold text-foreground self-start hover:opacity-80 transition-opacity whitespace-nowrap" onClick={() => setIsMobileMenuOpen(false)}>
                  Code<span className="text-primary">&amp;</span>Count
                </Link>
                <nav className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center space-x-3 rounded-md p-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground relative",
                        pathname === link.href || pathname.startsWith(link.href + '/') ? "bg-accent text-accent-foreground" : "text-foreground/80"
                      )}
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </Link>
                  ))}
                </nav>
                <Button 
                  asChild 
                  className="w-full rounded-full group" 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link href="/contact#start-project" className="flex items-center justify-center">
                    Start a project
                    <ArrowUpRight className="ml-2 h-4 w-4 transition-all duration-300 ease-in-out group-hover:rotate-45" />
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
