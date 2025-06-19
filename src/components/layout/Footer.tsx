
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
    title: "Do you like what you see?",
    description: "Let's discuss how CodeAndCount.com can help you achieve your business goals. We partner with clients of all sizes, across diverse industries, to deliver exceptional results.",
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
          "dark:text-primary-foreground text-foreground"
        )}>{footerSections.cta.title}</h2>
        <p className={cn(
          "text-lg md:text-xl max-w-2xl mx-auto mb-10",
          "dark:text-primary-foreground/90 text-muted-foreground"
        )}>
          {footerSections.cta.description}
        </p>
        <Button 
          size="lg" 
          asChild 
          className={cn(
            "rounded-full group text-base md:text-lg py-3 px-8 md:py-4 md:px-10",
            "bg-primary-foreground text-primary hover:bg-primary-foreground/90" // This should work for both light (white bg, primary text) and dark (white bg, primary text)
          )}
        >
          <Link href={footerSections.cta.buttonLink}>
            {footerSections.cta.buttonText}
            <ArrowUpRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </Button>

        {/* Divider */}
        <div className="my-10 md:my-14 border-t dark:border-primary-foreground/20 border-foreground/20 w-1/2 mx-auto"></div>
        
         <div className="mt-6 mb-10 md:mb-14 flex justify-center">
          <BackToTopButton 
            className={cn(
              "dark:bg-primary-foreground/10 dark:text-primary-foreground dark:hover:bg-primary-foreground/20 dark:focus:ring-primary-foreground/50",
              "bg-foreground/10 text-foreground hover:bg-foreground/20 focus:ring-foreground/50",
              "focus:ring-offset-transparent" 
            )}
          />
        </div>

        {/* Footer Links & Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-sm">
          {/* Quick Links */}
          <div className="md:text-left">
            <h3 className={cn("text-xl font-semibold mb-4", "dark:text-primary-foreground text-foreground")}>Quick Links</h3>
            <ul className="space-y-2">
              {footerSections.quickLinks.map((link) => (
                <li key={link.text}>
                  <Link href={link.href} className={cn("transition-colors duration-200", "dark:text-primary-foreground/80 text-muted-foreground hover:dark:text-primary-foreground hover:text-primary")}>
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:text-left">
            <h3 className={cn("text-xl font-semibold mb-4", "dark:text-primary-foreground text-foreground")}>Contact Us</h3>
            <ul className="space-y-2">
              <li>
                <a href={`tel:${footerSections.contactInfo.phone1.replace(/\s/g, '')}`} className={cn("flex items-center md:justify-start justify-center transition-colors duration-200", "dark:text-primary-foreground/80 text-muted-foreground hover:dark:text-primary-foreground hover:text-primary")}>
                  <Phone className="h-4 w-4 mr-2 flex-shrink-0" /> {footerSections.contactInfo.phone1}
                </a>
              </li>
               <li>
                <a href={`tel:${footerSections.contactInfo.phone2.replace(/\s/g, '')}`} className={cn("flex items-center md:justify-start justify-center transition-colors duration-200", "dark:text-primary-foreground/80 text-muted-foreground hover:dark:text-primary-foreground hover:text-primary")}>
                  <Phone className="h-4 w-4 mr-2 flex-shrink-0" /> {footerSections.contactInfo.phone2}
                </a>
              </li>
              <li>
                <a href={`mailto:${footerSections.contactInfo.email}`} className={cn("flex items-center md:justify-start justify-center transition-colors duration-200", "dark:text-primary-foreground/80 text-muted-foreground hover:dark:text-primary-foreground hover:text-primary")}>
                  <Mail className="h-4 w-4 mr-2 flex-shrink-0" /> {footerSections.contactInfo.email}
                </a>
              </li>
              <li className={cn("flex items-start md:justify-start justify-center", "dark:text-primary-foreground/80 text-muted-foreground")}>
                <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" /> 
                <span className="text-left">{footerSections.contactInfo.addressLine1},<br/>{footerSections.contactInfo.addressLine2}</span>
              </li>
            </ul>
          </div>
          
          {/* Social Links */}
          <div className="md:text-left">
            <div className="flex items-center justify-center md:justify-between mb-4">
                <h3 className={cn("text-xl font-semibold", "dark:text-primary-foreground text-foreground")}>Connect With Us</h3>
             </div>
            <div className="flex md:justify-start justify-center space-x-4">
              {footerSections.socialLinks.map((social) => (
                <Link 
                  key={social.name} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={cn("transition-colors duration-200", "dark:text-primary-foreground/80 text-muted-foreground hover:dark:text-primary-foreground hover:text-primary")}
                  aria-label={social.name}
                >
                  {React.cloneElement(social.icon, { className: "h-6 w-6" })}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={cn("mt-10 md:mt-14 pt-8 border-t text-xs", "dark:border-primary-foreground/20 border-foreground/20 dark:text-primary-foreground/70 text-muted-foreground")}>
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="mb-2 sm:mb-0">
              <span>&copy; CodeAndCount.com {foundingYear} - {currentYear}. All Rights Reserved.</span>
            </div>
            <div>
              <Link href="/privacy-policy" className={cn("transition-colors duration-200", "hover:dark:text-primary-foreground/50 hover:text-foreground/80")}>
                Privacy Policy
              </Link>
            </div>
          </div>
           <div className="mt-4">
            <Link href="/" className={cn("text-lg font-bold transition-opacity", "dark:text-primary-foreground text-foreground hover:opacity-80")}>
              Code<span className="text-accent dark:text-accent">And</span>Count
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
