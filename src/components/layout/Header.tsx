
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, Briefcase, Users, Rss, Mail, Sparkles, ArrowUpRight } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import React from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';

const mainNavLinks = [
  { href: '/services', label: 'Services', icon: <Briefcase className="h-5 w-5" />, badgeText: '13' },
  { href: '/work', label: 'Work', icon: <Sparkles className="h-5 w-5" /> },
  { href: '/about', label: 'About', icon: <Users className="h-5 w-5" /> },
  { href: '/blog', label: 'Blog', icon: <Rss className="h-5 w-5" /> },
  { href: '/contact', label: 'Contact', icon: <Mail className="h-5 w-5" /> },
];

const dropdownServices = [
  { name: 'Web Design', description: 'Deliver your business to a wider audience', href: '/services#brand-identity', icon: <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" /> },
  { name: 'Craft CMS', description: 'The most reliable way to build a website', href: '/services#craft-cms-development' },
  { name: 'Branding', description: 'Creating brands you\'re proud of', href: '/services#brand-identity' },
  { name: 'SEO', description: 'Get your brand seen online', href: '/services#seo-digital-marketing' },
  { name: 'Shopify', description: 'Custom Shopify store in 4 weeks', href: '/services#shopify-ecommerce' },
];


const CONDENSE_THRESHOLD = 10; 

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isCondensed, setIsCondensed] = React.useState(false);
  const lastScrollYRef = React.useRef(0);
  const isCondensedRef = React.useRef(isCondensed);

  const [isServicesMenuOpen, setIsServicesMenuOpen] = React.useState(false);
  const servicesMenuTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleServicesMenuEnter = () => {
    if (servicesMenuTimeoutRef.current) {
      clearTimeout(servicesMenuTimeoutRef.current);
      servicesMenuTimeoutRef.current = null;
    }
    setIsServicesMenuOpen(true);
  };

  const handleServicesMenuLeave = () => {
    servicesMenuTimeoutRef.current = setTimeout(() => {
      setIsServicesMenuOpen(false);
    }, 200); // 200ms delay
  };


  React.useEffect(() => {
    isCondensedRef.current = isCondensed;
  }, [isCondensed]);

  React.useEffect(() => {
    const handleScroll = () => {
      if (typeof window === 'undefined') return;
      const currentScrollY = window.scrollY;
      
      let shouldBeCondensed: boolean;
      if (currentScrollY > CONDENSE_THRESHOLD) {
        shouldBeCondensed = true;
      } else {
        shouldBeCondensed = false;
      }

      if (shouldBeCondensed !== isCondensedRef.current) {
        setIsCondensed(shouldBeCondensed);
      }
      lastScrollYRef.current = currentScrollY;
    };
    
    const setInitialState = () => {
        if (typeof window === 'undefined') return;
        const initialScrollY = window.scrollY;
        lastScrollYRef.current = initialScrollY;

        let initialCondensedState: boolean;
        if (initialScrollY > CONDENSE_THRESHOLD) {
            initialCondensedState = true;
        } else {
            initialCondensedState = false;
        }
        setIsCondensed(initialCondensedState);
    };

    setInitialState(); 

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', setInitialState, { passive: true }); 

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', setInitialState);
      if (servicesMenuTimeoutRef.current) {
        clearTimeout(servicesMenuTimeoutRef.current);
      }
    };
  }, [pathname]); 

  return (
    <header
      className={cn(
        "sticky top-0 z-50" 
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
            {mainNavLinks.map((link) => {
              if (link.label === 'Services') {
                return (
                  <DropdownMenu key={link.href} open={isServicesMenuOpen} onOpenChange={setIsServicesMenuOpen}>
                    <DropdownMenuTrigger asChild>
                      <div
                        onMouseEnter={handleServicesMenuEnter}
                        onMouseLeave={handleServicesMenuLeave}
                        className="relative"
                      >
                        <Link
                          href={link.href}
                          className={cn(
                            "text-sm font-medium transition-all duration-300 ease-in-out hover:text-primary rounded-md relative",
                            isCondensed ? "px-2 py-1" : "px-2.5 py-1.5",
                            pathname === link.href || pathname.startsWith(link.href + '/') ? "text-primary bg-primary/10" : "text-foreground/80 hover:bg-accent/50"
                          )}
                        >
                          {link.label}
                          {link.badgeText && (
                            <span className={cn(
                              "absolute bg-primary text-primary-foreground text-[10px] font-bold rounded-full leading-none flex items-center justify-center",
                              "h-4 w-4 min-w-[1rem]", 
                              isCondensed ? "-top-1 -right-1.5" : "-top-1.5 -right-2.5" 
                            )}>
                              {link.badgeText}
                            </span>
                          )}
                        </Link>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      onMouseEnter={handleServicesMenuEnter}
                      onMouseLeave={handleServicesMenuLeave}
                      className="w-[650px] bg-background shadow-2xl rounded-xl p-6 mt-2 border-border/50"
                      align="center"
                      sideOffset={isCondensed ? 8 : 10}
                    >
                      <div className="grid grid-cols-2 gap-x-8">
                        <div className="flex flex-col space-y-1">
                          {dropdownServices.map((service) => (
                            <Link
                              key={service.name}
                              href={service.href}
                              className="group block p-3 rounded-lg hover:bg-accent/70 transition-colors"
                              onClick={() => setIsServicesMenuOpen(false)}
                            >
                              <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-foreground">{service.name}</h3>
                                {service.icon && <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">{service.icon}</div>}
                              </div>
                              <p className="text-xs text-muted-foreground mt-0.5">{service.description}</p>
                            </Link>
                          ))}
                        </div>
                        <div className="bg-secondary p-4 rounded-lg flex flex-col justify-between">
                          <div>
                            <h3 className="text-sm font-semibold text-foreground mb-1">View all Services</h3>
                            <p className="text-xs text-muted-foreground mb-3">
                              We don't stop there, check out all the services we offer here at C2.
                            </p>
                             <Button variant="link" asChild className="text-xs p-0 h-auto" onClick={() => setIsServicesMenuOpen(false)}>
                                <Link href="/services">Explore Services <ArrowUpRight className="ml-1 h-3 w-3"/></Link>
                            </Button>
                          </div>
                          <div className="mt-4 overflow-hidden rounded-md aspect-[16/10]">
                            <Image 
                              src="https://placehold.co/400x250.png" 
                              alt="Person working on laptop" 
                              width={400} 
                              height={250} 
                              className="w-full h-full object-cover"
                              data-ai-hint="person working"
                            />
                          </div>
                        </div>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-all duration-300 ease-in-out hover:text-primary rounded-md relative",
                    isCondensed ? "px-2 py-1" : "px-2.5 py-1.5",
                    pathname === link.href || pathname.startsWith(link.href + '/') ? "text-primary bg-primary/10" : "text-foreground/80 hover:bg-accent/50"
                  )}
                >
                  {link.label}
                  {link.badgeText && (
                    <span className={cn(
                      "absolute bg-primary text-primary-foreground text-[10px] font-bold rounded-full leading-none flex items-center justify-center",
                      "h-4 w-4 min-w-[1rem]", 
                      isCondensed ? "-top-1 -right-1.5" : "-top-1.5 -right-2.5" 
                    )}>
                      {link.badgeText}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className={cn(
            "hidden md:flex items-center transition-all duration-300 ease-in-out",
            isCondensed ? "space-x-2 lg:space-x-2" : "space-x-3 lg:space-x-4"
            )}>
            <Button
              variant="default" 
              size="sm" 
              className={cn(
                "rounded-full relative", 
                isCondensed ? "pl-3 pr-8 py-1 text-xs h-8" : "pl-4 pr-10 h-9" 
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
                    {mainNavLinks.map((link) => (
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
                      router.push('/contact#start-project');
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
