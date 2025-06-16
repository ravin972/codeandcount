
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Palette, Laptop, Search, Puzzle, ShoppingCart, Calculator, Wrench, GalleryThumbnails } from "lucide-react";
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const servicesDetails = [
  { 
    name: 'Brand Identity', 
    description: 'We craft compelling brand narratives and visual identities that capture attention and build lasting connections. From logo design to comprehensive brand guidelines, we define your unique voice.',
    icon: <Palette className="h-12 w-12 mb-4 text-primary" />,
    points: [
      "Logo Design & Systems",
      "Brand Strategy & Positioning",
      "Visual Identity Guidelines",
      "Marketing Collateral Design"
    ],
    type: 'web_ai'
  },
  { 
    name: 'Websites & Mobile Apps', 
    description: 'Our team designs and develops bespoke websites and mobile applications that are not only visually stunning but also highly functional, user-friendly, and optimized for performance across all devices.',
    icon: <Laptop className="h-12 w-12 mb-4 text-primary" />,
    points: [
      "UI/UX Design & Prototyping",
      "Custom Web Development",
      "Mobile App Development (iOS & Android)",
      "Responsive Design & Accessibility"
    ],
    type: 'web_ai'
  },
  { 
    name: 'SEO & Digital Marketing', 
    description: 'Boost your online visibility and reach your target audience effectively with our data-driven SEO and digital marketing strategies. We help you climb search rankings and maximize ROI.',
    icon: <Search className="h-12 w-12 mb-4 text-primary" />,
    points: [
      "Keyword Research & Analysis",
      "On-Page & Off-Page SEO",
      "Content Marketing Strategy",
      "PPC Campaign Management"
    ],
    type: 'web_ai'
  },
  { 
    name: 'Craft CMS Development', 
    description: 'Leverage the power and flexibility of Craft CMS. We specialize in creating custom Craft CMS websites that offer unparalleled content management capabilities and scalability for your business.',
    icon: <Puzzle className="h-12 w-12 mb-4 text-primary" />,
    points: [
      "Custom Craft CMS Builds",
      "Plugin Development & Integration",
      "Craft Commerce Solutions",
      "Performance Optimization"
    ],
    type: 'web_ai'
  },
  { 
    name: 'WordPress Solutions', 
    description: 'We build robust and scalable websites using WordPress, tailored to your business needs, from blogs and portfolios to complex platforms and e-commerce stores with WooCommerce.',
    icon: <ShoppingCart className="h-12 w-12 mb-4 text-primary" />,
    points: [
      "Custom WordPress Theme Development",
      "Plugin Customization & Development",
      "WooCommerce Integration & E-commerce",
      "Performance & Security Optimization"
    ],
    type: 'web_ai'
  },
  {
    name: 'Accounting',
    description: 'Our expert accounting services ensure your finances are managed with precision, providing clarity and supporting your business growth with robust financial strategies.',
    icon: <Calculator className="h-12 w-12 mb-4 text-primary" />,
    points: [
      "Bookkeeping & Financial Reporting",
      "Tax Planning & Preparation",
      "Payroll Services",
      "Financial Consulting & Analysis"
    ],
    type: 'accounting'
  },
];

type FilterType = 'all' | 'accounting' | 'web_ai';

export default function ServicesPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredServices = servicesDetails.filter(service => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'accounting') return service.type === 'accounting';
    if (activeFilter === 'web_ai') return service.type === 'web_ai';
    return true;
  });

  return (
    <div className="bg-background text-foreground">
      <header className="py-16 md:py-24 text-center bg-secondary/70 dark:bg-secondary/70 backdrop-blur-lg border-b border-white/10 dark:border-neutral-700/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 flex items-center justify-center">
            <Wrench className="h-12 w-12 mr-4 text-primary" />
            Our Expertise
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Delivering innovative solutions to power your digital success. We combine strategy, design, and technology to create exceptional outcomes.
          </p>
        </div>
      </header>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
           <div className="bg-background/70 dark:bg-neutral-900/70 backdrop-blur-lg rounded-xl shadow-xl p-8 md:p-12 border border-white/10 dark:border-neutral-700/30">
            <div className="mb-12 flex flex-wrap justify-center items-center gap-3 sm:gap-4">
                <Button 
                  onClick={() => setActiveFilter('all')} 
                  variant={activeFilter === 'all' ? 'default' : 'outline'}
                  className="rounded-full text-base h-12 px-10"
                >
                  <GalleryThumbnails className="mr-2 h-5 w-5" />
                  All Services
                </Button>
                <Button 
                  onClick={() => setActiveFilter('accounting')} 
                  variant={activeFilter === 'accounting' ? 'default' : 'outline'}
                  className="rounded-full text-base h-12 px-10"
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Account Management
                </Button>
                <Button 
                  onClick={() => setActiveFilter('web_ai')} 
                  variant={activeFilter === 'web_ai' ? 'default' : 'outline'}
                  className="rounded-full text-base h-12 px-10"
                >
                  <Laptop className="mr-2 h-5 w-5" />
                  Web & AI Solutions
                </Button>
              </div>

            {filteredServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
                {filteredServices.map((service) => (
                  <Card key={service.name} className="flex flex-col md:flex-row overflow-hidden transition-transform hover:scale-[1.02] duration-300" data-interactive-cursor="true">
                    <div className="md:w-1/3 p-6 flex flex-col items-center justify-center bg-secondary/30 md:border-r border-card-foreground/10">
                      {service.icon}
                      <CardTitle className="text-2xl font-semibold text-center">{service.name}</CardTitle>
                    </div>
                    <div className="md:w-2/3 p-6">
                      <CardContent className="pt-0">
                        <p className="text-muted-foreground mb-6">{service.description}</p>
                        <ul className="space-y-2">
                          {service.points.map((point, index) => (
                            <li key={index} className="flex items-center">
                              <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground text-xl py-10">No services found in this category. Check back later or select another category!</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
