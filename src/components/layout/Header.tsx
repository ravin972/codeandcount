
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Briefcase, Users, Rss, Mail, Sparkles, ArrowUpRight, Home } from 'lucide-react'; 
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';

const navLinks = [
  { href: '/services', label: 'Services', icon: <Briefcase className="h-5 w-5" /> },
  { href: '/work', label: 'Work', icon: <Sparkles className="h-5 w-5" /> },
  { href: '/about', label: 'About', icon: <Users className="h-5 w-5" /> },
  { href: '/blog', label: 'Blog', icon: <Rss className="h-5 w-5" /> },
  { href: '/contact', label: 'Contact', icon: <Mail className="h-5 w-5" /> },
];

const CONDENSE_THRESHOLD = 10; 

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isCondensed, setIsCondensed] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsCondensed(currentScrollY > CONDENSE_THRESHOLD);
    };

    handleScroll(); 

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 ease-in-out",
        isCondensed ? "py-2" : "py-3 md:py-4" 
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between rounded-full shadow-xl bg-card text-card-foreground border border-border transition-all duration-300 ease-in-out",
          "w-full", 
          isCondensed
            ? "h-14 px-3 py-1 sm:px-4 md:w-1/2 md:mx-auto" 
            : "h-16 px-4 py-2 sm:px-6 md:container md:mx-auto" 
        )}
      >
        {/* Logo */}
        <Link 
          href="/" 
          className={cn(
            "font-bold hover:opacity-80 transition-all duration-300 ease-in-out whitespace-nowrap", 
            isCondensed ? "text-xl" : "text-2xl"
          )} 
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Code<span className="text-primary">&amp;</span>Count
        </Link>

        {/* Desktop Nav */}
        <nav className={cn(
          "hidden md:flex flex-grow justify-center items-center transition-all duration-300 ease-in-out",
          isCondensed ? "space-x-2 lg:space-x-3" : "space-x-1.5 lg:space-x-2.5" 
        )}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "font-medium transition-all duration-300 ease-in-out hover:text-primary rounded-md relative text-xs lg:text-sm", 
                isCondensed ? "px-1.5 py-1 lg:px-2" : "px-2 py-1.5 lg:px-2.5", 
                pathname === link.href || pathname.startsWith(link.href + '/') ? "text-primary bg-primary/10" : "text-card-foreground/80 hover:bg-accent/50"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA and Theme Toggle */}
        <div className={cn(
          "hidden md:flex items-center transition-all duration-300 ease-in-out group", 
          isCondensed ? "space-x-2 lg:space-x-2.5" : "space-x-2.5 lg:space-x-3" 
        )}>
          <Button
            variant="default"
            size={isCondensed ? "sm" : "default"} 
            className={cn(
              "rounded-full relative transition-all duration-300 ease-in-out group", 
              isCondensed ? "pl-3 pr-8 h-8 text-xs" : "pl-4 pr-10 h-9 text-sm" 
            )}
            onClick={() => router.push('/contact#start-project')}
          >
            <span>Start a project</span>
            <ArrowUpRight
              className={cn(
                "absolute top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out group-hover:rotate-45", 
                isCondensed ? "right-2 h-3.5 w-3.5" : "right-2.5 h-4 w-4" 
              )}
            />
          </Button>
          <ThemeToggle />
        </div>

        {/* Mobile Menu Trigger */}
        <div className="md:hidden flex items-center space-x-3">
          <ThemeToggle />
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="border-transparent hover:border-border rounded-full">
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
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    router.push('/contact#start-project');
                  }}
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

