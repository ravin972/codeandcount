
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Briefcase, Users, Rss, Mail, Sparkles, ArrowUpRight, Home } from 'lucide-react'; 
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import React, { useState, useEffect } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';

const navLinks = [
  { href: '/services', label: 'Services', icon: <Briefcase className="h-5 w-5" /> },
  { href: '/work', label: 'Work', icon: <Sparkles className="h-5 w-5" /> },
  { href: '/about', label: 'About', icon: <Users className="h-5 w-5" /> },
  { href: '/blog', label: 'Blog', icon: <Rss className="h-5 w-5" /> },
  { href: '/contact', label: 'Contact', icon: <Mail className="h-5 w-5" /> },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="relative h-24">
      <div className={cn(
        "fixed top-0 left-0 right-0 z-50 p-4 md:p-6 transition-all duration-300 ease-in-out",
        "flex items-center justify-between"
      )}>
        
        {/* Logo Section (Top Left) */}
        <div className="flex-shrink-0">
           <Link 
            href="/" 
            className="font-bold text-2xl hover:opacity-80 transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Code<span className="text-primary">&amp;</span>Count
          </Link>
        </div>

        {/* Centered Desktop Navigation */}
        <nav className={cn(
          "hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
          "transition-all duration-300 ease-in-out",
          hasScrolled ? "opacity-100 translate-y-[-50%]" : "opacity-0 translate-y-[-75%]",
        )}>
           <div className="flex items-center justify-center gap-1 bg-card/80 backdrop-blur-md border border-border shadow-lg rounded-full px-3 py-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "font-medium transition-colors duration-200 rounded-full text-sm", 
                    "px-3 py-1.5", 
                    pathname === link.href || pathname.startsWith(link.href + '/') 
                      ? "text-primary bg-primary/10" 
                      : "text-card-foreground/80 hover:bg-accent/50 hover:text-accent-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
           </div>
        </nav>

        {/* CTA & Theme Toggle Section (Top Right) */}
        <div className="hidden md:flex items-center gap-3">
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
          <ThemeToggle />
        </div>

        {/* Mobile Menu Trigger */}
        <div className="md:hidden flex items-center space-x-3">
          <ThemeToggle />
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
