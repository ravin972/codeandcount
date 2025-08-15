
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Phone, Mail, MapPin, Copyright, Github, Linkedin, Instagram } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';
import { BackToTopButton } from '@/components/layout/BackToTopButton';

// Define X/Twitter Icon as SVG
const XIcon = () => (
  <svg viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
    <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6905H306.438L611.412 515.685L658.88 583.579L1055.08 1150.3H892.656L569.141 687.854L569.165 687.828Z" fill="currentColor"/>
  </svg>
);

const footerSections = {
  cta: {
    title: "Let's Build Your Next Big Idea",
    buttonText: "Start a project",
    buttonLink: "/contact#start-project",
  },
  quickLinks: [
      { text: "Home", href: "/" },
      { text: "Services", href: "/services" },
      { text: "Work", href: "/work" },
      { text: "About", href: "/about" },
      { text: "Blog", href: "/blog" },
      { text: "Contact", href: "/contact" },
      { text: "Play Hex Test!", href: "/hex-test" },
  ],
  contactInfo: {
    phone1: "+91-8685941423",
    phone2: "+91-7737770374",
    email: "hello@codeandcount.com",
    addressLine1: "spaze i tech park, Sec-49",
    addressLine2: "Gurugram, Haryana, India"
  },
  socialLinks: [
    { name: "GitHub", href: "https://github.com/codeandcount", icon: <Github /> },
    { name: "LinkedIn", href: "https://linkedin.com/company/codeandcount", icon: <Linkedin /> },
    { name: "X", href: "https://x.com/codeandcount", icon: <XIcon /> },
    { name: "Instagram", href: "https://instagram.com/codeandcount", icon: <Instagram /> },
  ]
};

const foundingYear = 2020;

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn(
      "relative pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden",
      "bg-gradient-bloom-cta-light dark:bg-gradient-bloom-cta"
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Main CTA */}
        <h2 className={cn(
          "text-4xl md:text-5xl lg:text-6xl font-bold mb-6",
          "text-foreground dark:text-primary-foreground" 
        )}>{footerSections.cta.title}</h2>

        <Button
          size="lg"
          asChild
          className={cn(
            "group w-full max-w-sm mx-auto text-base py-3 px-8",
            "transition-all duration-300 ease-in-out shadow-lg hover:shadow-2xl active:shadow-md transform hover:-translate-y-0.5 active:translate-y-px",
            "bg-background text-primary hover:bg-neutral-200 dark:bg-primary-foreground dark:text-primary dark:hover:bg-primary-foreground/90"
          )}
          data-interactive-cursor="true"
        >
          <Link href={footerSections.cta.buttonLink}>
            {footerSections.cta.buttonText}
            <ArrowUpRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </Button>

        {/* Divider */}
        <div className="my-10 md:my-14 border-t dark:border-primary-foreground/20 border-foreground/20 w-1/2 mx-auto"></div>

        {/* Footer Links & Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-sm">
          {/* Quick Links */}
          <div className="md:text-left">
            <h3 className={cn("text-xl font-semibold mb-4", "text-foreground dark:text-primary-foreground")}>Quick Links</h3>
            <ul className="space-y-2">
              {footerSections.quickLinks.map((link) => (
                <li key={link.text}>
                  <Link href={link.href} className={cn("transition-colors duration-200", "text-muted-foreground dark:text-primary-foreground/80 hover:text-primary dark:hover:text-primary-foreground")}>
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:text-left">
            <h3 className={cn("text-xl font-semibold mb-4", "text-foreground dark:text-primary-foreground")}>Contact Us</h3>
            <ul className="space-y-2">
              <li>
                <a href={`tel:${footerSections.contactInfo.phone1.replace(/\s/g, '')}`} className={cn("flex items-center md:justify-start justify-center transition-colors duration-200", "text-muted-foreground dark:text-primary-foreground/80 hover:text-primary dark:hover:text-primary-foreground")}>
                  <Phone className="h-4 w-4 mr-2 flex-shrink-0" /> {footerSections.contactInfo.phone1}
                </a>
              </li>
               <li>
                <a href={`tel:${footerSections.contactInfo.phone2.replace(/\s/g, '')}`} className={cn("flex items-center md:justify-start justify-center transition-colors duration-200", "text-muted-foreground dark:text-primary-foreground/80 hover:text-primary dark:hover:text-primary-foreground")}>
                  <Phone className="h-4 w-4 mr-2 flex-shrink-0" /> {footerSections.contactInfo.phone2}
                </a>
              </li>
              <li>
                <a href={`mailto:${footerSections.contactInfo.email}`} className={cn("flex items-center md:justify-start justify-center transition-colors duration-200", "text-muted-foreground dark:text-primary-foreground/80 hover:text-primary dark:hover:text-primary-foreground")}>
                  <Mail className="h-4 w-4 mr-2 flex-shrink-0" /> {footerSections.contactInfo.email}
                </a>
              </li>
              <li className={cn("flex items-start md:justify-start justify-center", "text-muted-foreground dark:text-primary-foreground/80")}>
                <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-left">{footerSections.contactInfo.addressLine1},<br/>{footerSections.contactInfo.addressLine2}</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="md:text-left">
             <div className="flex items-center justify-between md:justify-start mb-4 gap-4">
                <h3 className={cn("text-xl font-semibold", "text-foreground dark:text-primary-foreground")}>Connect With Us</h3>
                <BackToTopButton className="md:hidden" />
             </div>
            <div className="flex md:justify-start justify-center space-x-4">
              {footerSections.socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "transition-all duration-200 ease-in-out",
                    "text-muted-foreground dark:text-primary-foreground/80 hover:text-primary dark:hover:text-primary-foreground hover:scale-110"
                  )}
                  aria-label={social.name}
                >
                  {React.cloneElement(social.icon, { className: "h-6 w-6" })}
                </Link>
              ))}
            </div>
             <div className="hidden md:block mt-8">
               <BackToTopButton />
             </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={cn("mt-12 pt-8 border-t text-xs", "dark:border-primary-foreground/20 border-foreground/20 text-muted-foreground dark:text-primary-foreground/70")}>
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="mb-2 sm:mb-0">
              <span>&copy; CodeAndCount.com {foundingYear} - {currentYear}. All Rights Reserved.</span>
            </div>
            <div>
              <Link href="/privacy-policy" className={cn("transition-colors duration-200", "hover:text-foreground/80 dark:hover:text-primary-foreground/50")}>
                Privacy Policy
              </Link>
            </div>
          </div>
           <div className="mt-4 flex items-center justify-center">
            <Link href="/" className={cn("text-lg font-bold transition-opacity flex items-center", "text-foreground dark:text-primary-foreground hover:opacity-80")}>
              <span className="text-primary font-bold text-lg">&lt;/&gt;</span>
              <span>Code<span className="text-primary">&amp;</span>Count</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
