
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Phone, Mail, MapPin, Copyright } from 'lucide-react'; 
import React from 'react';
import { cn } from '@/lib/utils';

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
  }
};

const foundingYear = 2020;

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn(
      "relative text-primary-foreground py-16 md:py-24 overflow-hidden",
      "bg-gradient-bloom-cta-light dark:bg-gradient-bloom-cta" 
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Main CTA */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{footerSections.cta.title}</h2>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-primary-foreground/90">
          {footerSections.cta.description}
        </p>
        <Button 
          size="lg" 
          asChild 
          className={cn(
            "rounded-full group text-base md:text-lg py-3 px-8 md:py-4 md:px-10",
            "bg-primary-foreground text-primary hover:bg-primary-foreground/90 dark:bg-background dark:text-foreground dark:hover:bg-background/90"
            // For light theme: White button, primary text. For dark theme: Dark button, light text.
          )}
        >
          <Link href={footerSections.cta.buttonLink}>
            {footerSections.cta.buttonText}
            <ArrowUpRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </Button>

        {/* Divider */}
        <div className="my-12 md:my-16 border-t border-primary-foreground/20 w-1/2 mx-auto"></div>

        {/* Quick Links & Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerSections.quickLinks.map((link) => (
                <li key={link.text}>
                  <Link href={link.href} className="hover:text-primary-foreground/70 transition-colors duration-200">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>
                <a href={`tel:${footerSections.contactInfo.phone1.replace(/\s/g, '')}`} className="flex items-center justify-center hover:text-primary-foreground/70 transition-colors duration-200">
                  <Phone className="h-4 w-4 mr-2 flex-shrink-0" /> {footerSections.contactInfo.phone1}
                </a>
              </li>
               <li>
                <a href={`tel:${footerSections.contactInfo.phone2.replace(/\s/g, '')}`} className="flex items-center justify-center hover:text-primary-foreground/70 transition-colors duration-200">
                  <Phone className="h-4 w-4 mr-2 flex-shrink-0" /> {footerSections.contactInfo.phone2}
                </a>
              </li>
              <li>
                <a href={`mailto:${footerSections.contactInfo.email}`} className="flex items-center justify-center hover:text-primary-foreground/70 transition-colors duration-200">
                  <Mail className="h-4 w-4 mr-2 flex-shrink-0" /> {footerSections.contactInfo.email}
                </a>
              </li>
              <li className="flex items-center justify-center">
                <MapPin className="h-4 w-4 mr-2 flex-shrink-0" /> 
                <span>{footerSections.contactInfo.addressLine1}, {footerSections.contactInfo.addressLine2}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 md:mt-16 pt-8 border-t border-primary-foreground/20 text-xs text-primary-foreground/70">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="mb-2 sm:mb-0">
              <span>&copy; CodeAndCount.com {foundingYear} - {currentYear}. All Rights Reserved.</span>
            </div>
            <div>
              <Link href="/privacy-policy" className="hover:text-primary-foreground/50 transition-colors duration-200">
                Privacy Policy
              </Link>
            </div>
          </div>
           <div className="mt-4">
            <Link href="/" className="text-lg font-bold hover:opacity-80 transition-opacity">
              Code<span className="text-accent dark:text-accent">And</span>Count {/* Using accent for 'And' */}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
