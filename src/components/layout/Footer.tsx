
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Phone, Mail, MapPin, Star, ExternalLinkIcon, Linkedin, XIcon, Copyright, Instagram } from 'lucide-react'; // Added Copyright
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const footerSections = {
  cta: {
    title: "Do you like what you see?",
    buttonText: "Start a project",
    buttonLink: "/contact#start-project",
    reviews: {
      rating: "5.0",
      count: "69 reviews",
      source: "Google"
    }
  },
  learn: {
    title: "Learn",
    links: [
      { text: "About", href: "/about" },
      { text: "Blog", href: "/blog" },
      { text: "FAQs", href: "/faq" }, 
    ]
  },
  explore: {
    title: "Explore",
    links: [
      { text: "Home", href: "/" },
      { text: "Work", href: "/work", new: true },
      { text: "Services", href: "/services" },
      { text: "Contact", href: "/contact" },
    ]
  },
  getInTouch: {
    title: "Get in touch",
    phone: "+1 (234) 567-890",
    email: "hello@codeandcount.com",
    address: [
      "123 Design Street",
      "Web City, WC 00000",
      "United States"
    ],
    otherLink: { text: "///your.unique.link", href: "#" } 
  }
};

const foundingYear = 2010; 

const socialMediaLinks = [
  { name: 'LinkedIn', href: 'https://linkedin.com/company/example', icon: <Linkedin className="h-5 w-5" /> },
  { name: 'X', href: 'https://x.com/example', icon: <XIcon className="h-5 w-5" /> },
  { name: 'Clutch/Other', href: 'https://clutch.co/example', icon: <Copyright className="h-5 w-5" /> }, // Changed icon
  { name: 'Instagram', href: 'https://instagram.com/example', icon: <Instagram className="h-5 w-5" /> },
  { name: 'Behance', href: 'https://behance.net/example', icon: <span className="font-bold text-sm leading-none">Bē</span> },
];


export function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const [isSocialBarVisible, setIsSocialBarVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (footerRef.current) {
        const footerRect = footerRef.current.getBoundingClientRect();
        const socialBarShouldBeVisible = footerRect.top < window.innerHeight && footerRect.bottom > 0;
        setIsSocialBarVisible(socialBarShouldBeVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Fixed Social Media Bar */}
      <div
        className={cn(
          "fixed top-1/2 -translate-y-1/2 left-6 z-40 flex-col space-y-3",
          "transition-opacity duration-300 ease-in-out",
          isSocialBarVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
          "hidden md:flex"
        )}
      >
        {socialMediaLinks.map((social) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            className="bg-primary text-primary-foreground p-3 rounded-full hover:bg-primary/90 transition-all duration-200 ease-in-out transform hover:scale-110 shadow-md"
            title={social.name}
          >
            {social.icon}
          </a>
        ))}
      </div>

      <footer ref={footerRef} className="bg-neutral-900 text-neutral-300 pt-16 md:pt-24 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Grid Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 md:mb-24">
            {/* Column 1: CTA */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">{footerSections.cta.title}</h2>
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full mb-6 group">
                <Link href={footerSections.cta.buttonLink}>
                  {footerSections.cta.buttonText}
                  <ArrowUpRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </Button>
              <div className="flex items-center space-x-2">
                <div className="bg-white text-black h-6 w-6 rounded-full flex items-center justify-center text-sm font-bold">G</div>
                <div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-xs text-neutral-400">
                    {footerSections.cta.reviews.rating} from {footerSections.cta.reviews.count}
                  </p>
                </div>
              </div>
            </div>

            {/* Column 2: Learn */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">{footerSections.learn.title}</h3>
              <ul className="space-y-2">
                {footerSections.learn.links.map((link) => (
                  <li key={link.text}>
                    <Link href={link.href} className="hover:text-primary transition-colors duration-200">
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Explore */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">{footerSections.explore.title}</h3>
              <ul className="space-y-2">
                {footerSections.explore.links.map((link) => (
                  <li key={link.text}>
                    <Link href={link.href} className="hover:text-primary transition-colors duration-200 flex items-center">
                      {link.text}
                      {link.new && (
                        <span className="ml-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs font-semibold rounded-full">NEW</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Get in touch */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">{footerSections.getInTouch.title}</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
                  <a href={`tel:${footerSections.getInTouch.phone.replace(/\s/g, '')}`} className="hover:text-primary transition-colors duration-200">
                    {footerSections.getInTouch.phone}
                  </a>
                </li>
                <li className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
                  <a href={`mailto:${footerSections.getInTouch.email}`} className="hover:text-primary transition-colors duration-200">
                    {footerSections.getInTouch.email}
                  </a>
                </li>
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 text-primary flex-shrink-0 mt-1" />
                  <div>
                    {footerSections.getInTouch.address.map((line, i) => (
                      <span key={i} className="block">{line}</span>
                    ))}
                  </div>
                </li>
                <li className="flex items-center">
                  <ExternalLinkIcon className="h-5 w-5 mr-3 text-primary flex-shrink-0" /> 
                  <a href={footerSections.getInTouch.otherLink.href} className="hover:text-primary transition-colors duration-200">
                    {footerSections.getInTouch.otherLink.text}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Crafting Since Section */}
          <div className="text-center mb-16 md:mb-24">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white leading-none">
              Crafting since {foundingYear}
            </h1>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-neutral-700 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-neutral-400">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Link href="/" className="text-2xl font-bold text-white hover:opacity-80 transition-opacity">
                C<span className="text-primary">2</span>
              </Link>
              <span>&copy; CodeAndCount.com {currentYear}</span>
            </div>
            <div className="flex space-x-4">
              <span>All Rights Reserved</span>
              <span className="text-neutral-600">|</span>
              <Link href="/privacy-policy" className="hover:text-primary transition-colors duration-200">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
