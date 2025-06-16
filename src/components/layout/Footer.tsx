
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Phone, Mail, MapPin, Star, Github, Instagram, Copyright, Linkedin, X, StarHalf } from 'lucide-react'; 
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { BackToTopButton } from './BackToTopButton';

const footerSections = {
  cta: {
    title: "Do you like what you see?",
    buttonText: "Start a project",
    buttonLink: "/contact#start-project",
    reviews: {
      rating: "4.5",
      count: "45+ reviews", 
      source: "Google"
    }
  },
  learn: {
    title: "Learn",
    links: [
      { text: "About", href: "/about" },
      { text: "Testimonials", href: "/testimonials" },
      { text: "Processes", href: "/processes" },
      { text: "FAQs", href: "/faq" },
      { text: "Blog", href: "/blog" },
    ]
  },
  explore: {
    title: "Explore",
    links: [
      { text: "Home", href: "/" },
      { text: "Work", href: "/work", new: true },
      { text: "Services", href: "/services" },
      { text: "Play Hex Eye Test!", href: "/hex-test", new: true },
      { text: "Contact", href: "/contact" },
    ]
  },
  getInTouch: {
    title: "Get in touch",
    phone1: "+91-8685941423",
    phone2: "+91-7737770374",
    email: "hello@codeandcount.com",
    address: [
      "spaze i tech park, Sec-49",
      "Gurugram, Haryana",
      "India"
    ]
  }
};

const foundingYear = 2020;

const socialMediaLinks = [
  { name: 'LinkedIn', href: 'https://linkedin.com/company/codeandcount', icon: <Linkedin className="h-4 w-4" /> },
  { name: 'X', href: 'https://x.com/codeandcount', icon: <X className="h-4 w-4" /> },
  { name: 'GitHub', href: 'https://github.com/codeandcount', icon: <Github className="h-4 w-4" /> },
  { name: 'Instagram', href: 'https://instagram.com/codeandcount', icon: <Instagram className="h-4 w-4" /> },
];


export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="bg-neutral-900/80 backdrop-blur-md border-t border-neutral-700/50 text-neutral-300 pt-16 md:pt-24 pb-8 relative">
        {/* Social Media Bar - Absolute Positioned */}
        <div
          className={cn(
            "absolute top-2 left-6 z-10 flex-col space-y-3", 
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
              className="bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary/90 transition-all duration-200 ease-in-out transform hover:scale-110 shadow-md flex items-center justify-center"
              title={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Back To Top Button - Absolute Positioned */}
        <BackToTopButton className="absolute top-2 right-6 z-10 hidden md:flex" />


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
                <div className="bg-blue-600 text-white h-6 w-6 rounded-full flex items-center justify-center text-sm font-bold">G</div>
                <div>
                  <div className="flex items-center">
                    {[...Array(4)].map((_, i) => (
                      <Star key={`full-${i}`} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    ))}
                    <StarHalf key="half" className="h-4 w-4 text-yellow-400 fill-yellow-400" />
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
                  <a href={`tel:${footerSections.getInTouch.phone1.replace(/\s/g, '')}`} className="hover:text-primary transition-colors duration-200">
                    {footerSections.getInTouch.phone1}
                  </a>
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
                  <a href={`tel:${footerSections.getInTouch.phone2.replace(/\s/g, '')}`} className="hover:text-primary transition-colors duration-200">
                    {footerSections.getInTouch.phone2}
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
                Code<span className="text-primary">&amp;</span>Count
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
