
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowUpRight, Sparkles, ArrowRight, Eye, Dot, ChevronLeft, ChevronRight, Calculator, Laptop, Volume2, Building, Briefcase, Network, Users, Globe, ImageIcon } from 'lucide-react';
import InfiniteScrollerWithMouseFollower from '@/components/effects/InfiniteScrollerWithMouseFollower';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Preloader from '@/components/layout/Preloader';
import { testimonials } from '@/lib/testimonial-data';
import { blogPosts as homepageBlogPosts } from '@/lib/blog-data';

gsap.registerPlugin(ScrollTrigger);


const services = [
  {
    name: 'Account Management',
    description: 'Expert financial management, compliance, and strategic accounting services to ensure your business thrives.',
    icon: <Calculator className="h-10 w-10 text-primary mb-4" />
  },
  {
    name: 'Web & AI Solutions',
    description: 'Cutting-edge web development, AI-powered tools, and creative design to build exceptional digital experiences.',
    icon: <Laptop className="h-10 w-10 text-primary mb-4" />
  },
  {
    name: 'Digital Marketing',
    description: 'Strategic digital marketing services to boost your online presence, engage audiences, and drive growth.',
    icon: <Volume2 className="h-10 w-10 text-primary mb-4" />
  }
];

const clientLogos: { name: string; icon?: JSX.Element; imageUrl?: string; dataAiHint?: string }[] = [
  {
    name: 'PVT LTD',
    imageUrl: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=372,h=96,fit=crop,trim=142.47311827956992;0;228.49462365591398;0/AR0LWLPr10FjjMp5/2-removebg-preview-A3Q2jb6yZziVroXJ.png',
    dataAiHint: 'company logo',
  },
  {
    name: 'DivyaSangrah',
    imageUrl: 'https://divyasangrah.com/wp-content/uploads/2025/03/cropped-retinal-ds-1-e1743144896585-163x88.webp', 
    dataAiHint: 'divyasangrah logo', 
  },
  { 
    name: 'Brista', 
    imageUrl: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=336,fit=crop,q=95/dJoZM81RP9czxrg9/upscalemedia-brista---edited-mk3vP2Nz3LfxQ76o.png',
    dataAiHint: 'travel company logo', 
  },
  { 
    name: 'BuzTrix TravelTech', 
    imageUrl: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=506,fit=crop,q=95/A3Q2voGEaNURrw8k/buztrix-traveltech-india-pvt-ltd-2-dWxvZaL7bGT6XrLb.png',
    dataAiHint: 'travel tech logo', 
  },
  { 
    name: 'Parivartan by DivyaSangrah', 
    imageUrl: 'https://parivartan.divyasangrah.com/wp-content/uploads/2025/06/parivartan_white_logo-removebg-preview-e1750404043261.png',
    dataAiHint: 'ngo logo', 
  },
];

const caseStudies = [
  {
    id: 'divyasangrah-spiritual-marketplace',
    title: 'DivyaSangrah Spiritual Marketplace',
    category: 'E‑commerce · Spiritual Services',
    imageUrl: 'https://images.unsplash.com/photo-1610979573089-78f2429d47d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxOXx8aGluZHUlMjBzcGlyaXR1YWx8ZW58MHx8fHwxNzUwNDEwNTExfDA&ixlib=rb-4.1.0&q=80&w=1080', 
    dataAiHint: 'spiritual storefront',
    description: 'An all-in-one online store offering puja items, astrology consultations, and religious service bookings. Crafted for spiritual ambience and performance.',
  },
  {
    id: 'itverbs-technology-solutions',
    title: 'ITVerbs Technology Solutions',
    category: 'Corporate IT Solutions',
    imageUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHx0ZWNofGVufDB8fHx8MTc1MDQwNTQyNnww&ixlib=rb-4.1.0&q=80&w=1080', 
    dataAiHint: 'corporate it',
    description: 'Corporate portal for AI solutions, cloud services, and development projects. Includes career hub, portfolio sections, and contact workflows.',
  },
  {
    id: 'buztrix-traveltech',
    title: 'BuzTrix TravelTech India Pvt. Ltd.',
    category: 'Travel SaaS Platform',
    imageUrl: 'https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHx0cmF2ZWwlMjBpbWFnZXxlbnwwfHx8fDE3NTA0MDk5MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080', 
    dataAiHint: 'travel saas',
    description: 'Developed for B2B travel operations. Offers hotel & flight APIs, lead tracking dashboards, and bulk booking systems.',
  },
];

export default function HomePage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [itemWidth, setItemWidth] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Preloader logic moved here
  useEffect(() => {
    // Make sure we're on the client side
    if (typeof window !== 'undefined') {
      // Check if the preloader has already run in this session
      const hasLoaded = sessionStorage.getItem('preloader_has_run');
      if (hasLoaded) {
        setIsLoading(false);
      } else {
        const timer = setTimeout(() => {
          setIsLoading(false);
          sessionStorage.setItem('preloader_has_run', 'true');
        }, 2500); // 2.5 seconds for 3D animation
        return () => clearTimeout(timer);
      }
    }
  }, []);

  // Animations
  useEffect(() => {
    if (isLoading) return; // Don't run animations while preloader is active

    // Helper function for creating animations
    const createAnimation = (target: gsap.TweenTarget, vars: gsap.TweenVars) => {
      gsap.from(target, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: target as gsap.DOMTarget,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
        },
        ...vars,
      });
    };

    // Hero Section
    createAnimation('.hero-title', { delay: 0.2 });
    createAnimation('.hero-paragraph', { delay: 0.4 });
    createAnimation('.hero-button', { delay: 0.6 });

    // Services Section
    createAnimation('.services-title', {});
    createAnimation('.services-description', { delay: 0.2 });
    gsap.utils.toArray<HTMLElement>('.service-card').forEach((card, index) => {
      createAnimation(card, { delay: 0.1 * index });
    });
    
    // Client Logos Section
    createAnimation('.client-logos-title', {});
    gsap.utils.toArray<HTMLElement>('.client-logo-item').forEach((logo, index) => {
      createAnimation(logo, { delay: 0.1 * index, y: 20 });
    });

    // Case Studies Section
    createAnimation('.case-studies-title', {});
    createAnimation('.case-studies-description', { delay: 0.2 });
    gsap.utils.toArray<HTMLElement>('.case-study-card').forEach((card, index) => {
      createAnimation(card, { delay: 0.1 * index });
    });
    createAnimation('.case-studies-button', { delay: 0.3 });

    // Testimonials Section
    createAnimation('.testimonials-section .bg-card', { y:0, opacity:1, duration: 0.1, delay:0}); // Animate the container card first
    createAnimation('.testimonials-title', {delay: 0.1});
    createAnimation('.testimonials-description', { delay: 0.2});
    // Testimonial cards are now animated by CSS
    
    // SEO Optimizer Tool Section
    createAnimation('.seo-tool-section .text-primary', { y:0, opacity: 1, scale: 0.8, duration: 0.6, ease: 'elastic.out(1, 0.5)'});
    createAnimation('.seo-tool-section h2', { delay: 0.2 });
    createAnimation('.seo-tool-section p', { delay: 0.3 });
    createAnimation('.seo-tool-section .rounded-full', { delay: 0.4 });

    // AI Image Generator Tool Section
    createAnimation('.image-gen-tool-section .text-primary', { y:0, opacity: 1, scale: 0.8, duration: 0.6, ease: 'elastic.out(1, 0.5)'});
    createAnimation('.image-gen-tool-section h2', { delay: 0.2 });
    createAnimation('.image-gen-tool-section p', { delay: 0.3 });
    createAnimation('.image-gen-tool-section .rounded-full', { delay: 0.4 });

    // Ready to Elevate Section
    createAnimation('.ready-to-elevate-section h2', {});
    createAnimation('.ready-to-elevate-section p', { delay: 0.2 });
    createAnimation('.ready-to-elevate-section .rounded-full', { delay: 0.3 });
    
    // Blog Section
    createAnimation('.blog-section-intro', {});
    // Note: Horizontal scroll items might need different/no scrolltrigger or careful trigger points.
    // For simplicity, the individual cards inside the scroller are not animated here with scrolltrigger
    // to avoid conflicts with the horizontal scrolling itself.
    createAnimation('.blog-section-controls', { delay: 0.2 });


    // Cleanup ScrollTrigger instances on component unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isLoading]);



  const checkScrollability = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 5); 
      setCanScrollRight(scrollLeft < (scrollWidth - clientWidth) - 5);
    } else {
      setCanScrollLeft(false);
      setCanScrollRight(false);
    }
  }, []);

  useEffect(() => {
    if (isLoading) return;
    const container = scrollContainerRef.current;
    
    const calculateItemWidth = () => {
      if (cardRef.current && container) {
        const cardElement = cardRef.current;
        const style = window.getComputedStyle(cardElement.parentElement!); // Get parent to include margin
        const marginRight = parseFloat(style.marginRight || '0');
        const marginLeft = parseFloat(style.marginLeft || '0'); // Though we use space-x, good to be robust
        
        const calculatedWidth = cardElement.offsetWidth + marginRight + marginLeft;

        if (calculatedWidth > 0) {
          setItemWidth(calculatedWidth);
        } else {
          setItemWidth(300); // Fallback width if calculation fails early
        }
        checkScrollability(); 
      } else {
        setItemWidth(300); // Fallback
        checkScrollability();
      }
    };
    
    calculateItemWidth(); // Initial calculation
    
    if (container) {
      container.addEventListener('scroll', checkScrollability, { passive: true });
    }
    window.addEventListener('resize', calculateItemWidth); 

    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScrollability);
      }
      window.removeEventListener('resize', calculateItemWidth);
    };
  }, [checkScrollability, isLoading]);


  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current && itemWidth > 0) {
      const scrollValue = direction === 'left' ? -itemWidth : itemWidth;
      scrollContainerRef.current.scrollBy({
        left: scrollValue,
        behavior: 'smooth',
      });
      // checkScrollability might not update immediately after scrollBy due to 'smooth'
      // It's better to rely on the scroll event listener or a timeout if immediate update is critical
      setTimeout(checkScrollability, 350); // Give time for smooth scroll to progress
    }
  };


  return (
    <div className="bg-background text-foreground">
      {isLoading && <Preloader />}

      <div className={cn(isLoading && "opacity-0")}>
        {/* Hero Section */}
        <section className="py-20 md:py-32 relative overflow-hidden bg-gradient-main-hero-light dark:bg-gradient-main-hero">
          <div
            aria-hidden="true"
            className="absolute top-[-10rem] left-[-15rem] w-[30rem] h-[30rem] md:w-[40rem] md:h-[40rem] bg-gradient-blob-1 opacity-30 dark:opacity-20 blur-3xl -z-10"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-[-5rem] right-[-10rem] w-[25rem] h-[25rem] md:w-[35rem] md:h-[35rem] bg-gradient-blob-2 opacity-20 dark:opacity-15 blur-3xl -z-10"
          />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="relative rounded-3xl p-8 md:p-12 lg:p-16">
              <div className="mb-6 hero-title">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-text-dynamic bg-clip-text text-transparent">
                  Crafting digital experience.
                </h1>
              </div>

              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 hero-paragraph">
              CodeAndCount.com helps turn your ideas into reality — from web development to smart accounting. We simplify success with digital innovation, custom software, and expert financial solutions.
              </p>
              <Button
                asChild
                size="lg"
                className={cn(
                    "group w-full max-w-xs mx-auto text-base py-3 px-8 hero-button",
                    "transition-all duration-300 ease-in-out shadow-lg hover:shadow-2xl active:shadow-md transform hover:-translate-y-0.5 active:translate-y-px",
                    "bg-gradient-to-br from-primary to-green-400 dark:from-primary dark:to-accent text-primary-foreground"
                )}
                data-interactive-cursor="true"
              >
                <Link href="/contact#start-project">
                  Start Your Project <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative inline-grid place-items-center w-full text-center mb-4 services-title">
              <h2 className="col-start-1 row-start-1 relative z-[1] text-4xl md:text-5xl font-bold text-center text-foreground">Our Core Services</h2>
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground text-center mt-4 mb-12 max-w-2xl mx-auto services-description">
              We offer a comprehensive suite of services to bring your vision to life.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <Card key={service.name} className="shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1 service-card" data-interactive-cursor="true">
                  <CardHeader>
                    {service.icon}
                    <CardTitle className="text-2xl font-semibold">{service.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Client Logos Section */}
        <section id="trusted-by-leaders" className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-card rounded-xl shadow-xl p-8 md:p-12 border border-border">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-10 client-logos-title">Trusted by Industry Leaders</h2>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                {clientLogos.map((logo) => (
                  <div key={logo.name} title={logo.name} className="transition-transform duration-300 ease-in-out transform hover:scale-110 group client-logo-item" data-interactive-cursor="true">
                    {logo.imageUrl ? (
                      <Image
                        src={logo.imageUrl}
                        alt={logo.name}
                        width={120}
                        height={48}
                        className="object-contain h-12 w-auto max-w-[150px] group-hover:opacity-80 transition-opacity"
                        data-ai-hint={logo.dataAiHint}
                      />
                    ) : (
                      logo.icon
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section id="work" className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative inline-grid place-items-center w-full text-center mb-4 case-studies-title">
              <h2 className="col-start-1 row-start-1 relative z-[1] text-4xl md:text-5xl font-bold text-center text-foreground">Featured Work</h2>
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground text-center mb-12 max-w-2xl mx-auto case-studies-description">
              Explore how we've helped businesses like yours succeed.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((study) => (
                <Card key={study.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out flex flex-col group hover:-translate-y-1 case-study-card" data-interactive-cursor="true">
                  <div className="ripple-container">
                    <Image src={study.imageUrl} alt={study.title} width={600} height={400} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out" data-ai-hint={study.dataAiHint} />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl font-semibold">{study.title}</CardTitle>
                    <CardDescription>{study.category}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{study.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" asChild className="rounded-full">
                      <Link href={`/work/${study.id}`}>
                        View Case Study <Eye className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="text-center mt-12 case-studies-button">
              <Button size="lg" variant="outline" asChild className="rounded-full group">
                <Link href="/work">
                  Explore All Projects <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
          <section id="testimonials" className="py-16 bg-background testimonials-section">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="bg-card rounded-xl shadow-xl p-8 md:p-12 border border-border">
                      <h2 className="text-4xl font-bold text-center mb-4 text-foreground testimonials-title">What Our Clients Say</h2>
                      <p className="text-xl md:text-2xl text-muted-foreground text-center mb-12 max-w-2xl mx-auto testimonials-description">
                          Real stories from satisfied partners across the globe.
                      </p>
                      <div className="scroller" data-speed="slow" data-direction="left">
                          <div className="scroller__inner">
                              {[...testimonials, ...testimonials].map((testimonial, index) => (
                                  <Card key={`${testimonial.name}-${index}`} className="w-[350px] flex-shrink-0 mx-4 shadow-lg" data-interactive-cursor="true">
                                      <CardContent className="pt-6">
                                          <div className="flex items-start space-x-4 mb-4">
                                              <Avatar className="h-12 w-12">
                                                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.dataAiHint} />
                                                  <AvatarFallback>{testimonial.name.substring(0,2)}</AvatarFallback>
                                              </Avatar>
                                              <div>
                                                  <h4 className="text-base font-semibold text-foreground">{testimonial.name}</h4>
                                                  <p className="text-xs text-muted-foreground">{testimonial.title}</p>
                                              </div>
                                          </div>
                                          <blockquote className="text-sm text-foreground italic border-l-2 border-primary pl-3 py-1">
                                              "{testimonial.quote}"
                                          </blockquote>
                                      </CardContent>
                                  </Card>
                              ))}
                          </div>
                      </div>
                  </div>
              </div>
          </section>

        {/* SEO Optimizer Tool Section */}
        <section id="seo-tool" className="py-16 md:py-20 bg-background text-foreground seo-tool-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Sparkles className="h-12 w-12 text-primary mx-auto mb-6" />
            <div className="relative inline-grid place-items-center w-full text-center mb-6">
              <h2 className="col-start-1 row-start-1 relative z-[1] text-4xl md:text-5xl font-bold">Boost Your SEO with Our AI Optimizer</h2>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Unlock the power of AI to rewrite your content, incorporate strategic keywords, and climb search engine rankings. Try our free SEO Optimizer tool today!
            </p>
            
            <Button
                asChild
                size="lg"
                className={cn(
                    "group w-full max-w-xs mx-auto text-base py-3 px-8",
                    "transition-all duration-300 ease-in-out shadow-lg hover:shadow-2xl active:shadow-md transform hover:-translate-y-0.5 active:translate-y-px",
                    "bg-gradient-to-br from-primary to-green-400 dark:from-primary dark:to-accent text-primary-foreground"
                )}
                data-interactive-cursor="true"
              >
              <Link href="/seo-optimizer">
                Try SEO Optimizer <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </section>

        {/* AI Image Generator Tool Section */}
        <section id="image-gen-tool" className="py-16 md:py-20 bg-secondary text-foreground image-gen-tool-section">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <ImageIcon className="h-12 w-12 text-primary mx-auto mb-6" />
              <div className="relative inline-grid place-items-center w-full text-center mb-6">
                <h2 className="col-start-1 row-start-1 relative z-[1] text-4xl md:text-5xl font-bold">Unleash Creativity with AI Image Generation</h2>
              </div>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                Transform your ideas into stunning visuals. Describe any image, and our AI will bring it to life. Explore the future of digital art!
              </p>
              
              <Button
                asChild
                size="lg"
                className={cn(
                    "group w-full max-w-xs mx-auto text-base py-3 px-8",
                    "transition-all duration-300 ease-in-out shadow-lg hover:shadow-2xl active:shadow-md transform hover:-translate-y-0.5 active:translate-y-px",
                    "bg-gradient-to-br from-primary to-green-400 dark:from-primary dark:to-accent text-primary-foreground"
                )}
                data-interactive-cursor="true"
              >
                <Link href="/ai-image-generator">
                  Try AI Image Generator <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
        </section>

        {/* Ready to Elevate Section */}
        <section className="py-20 relative overflow-hidden bg-gradient-bloom-cta-light dark:bg-gradient-bloom-cta ready-to-elevate-section">
          <div 
            aria-hidden="true"
            className="absolute inset-0 w-full h-full -z-10" 
          />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground dark:text-primary-foreground">Ready to Elevate Your Brand?</h2>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-muted-foreground dark:text-primary-foreground/90">
              Let's discuss how CodeAndCount.com can help you achieve your business goals. We partner with clients of all sizes, across diverse industries, to deliver exceptional results.
            </p>
            <Button 
              size="lg" 
              asChild 
              className={cn(
                  "group w-full max-w-xs mx-auto text-base py-3 px-8",
                  "transition-all duration-300 ease-in-out shadow-lg hover:shadow-2xl active:shadow-md transform hover:-translate-y-0.5 active:translate-y-px",
                  "bg-gradient-to-br from-primary-foreground to-neutral-200 text-primary hover:bg-primary-foreground/90 dark:bg-gradient-to-br dark:from-primary dark:to-accent dark:text-primary-foreground"
              )}
              data-interactive-cursor="true"
            >
              <Link href="/contact#start-project">
                Get in Touch <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </section>
        
        <InfiniteScrollerWithMouseFollower />
        
        {/* Blog Section */}
        <section className="py-16 md:py-24 bg-background text-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
              <div className="lg:w-1/3 flex-shrink-0 space-y-6 blog-section-intro mb-8 lg:mb-0">
                <p className="text-sm font-semibold text-primary flex items-center">
                  <Dot className="h-5 w-5 mr-1 -ml-1" /> Blog
                </p>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight text-foreground">
                  The latest from CodeAndCount.com
                </h2>
                <div className="space-y-4">
                  <Button
                    variant="default"
                    size="lg"
                    asChild
                    className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full group pl-6 pr-4 py-3 text-base"
                  >
                    <Link href="/blog">
                      View the blog
                      <span className="ml-2 bg-primary-foreground/20 p-1.5 rounded-full inline-flex items-center justify-center">
                        <ArrowUpRight className="h-4 w-4 text-primary-foreground" />
                      </span>
                    </Link>
                  </Button>
                  <div className="flex space-x-3 blog-section-controls">
                    <Button variant="outline" size="icon" onClick={() => handleScroll('left')} disabled={!canScrollLeft || itemWidth === 0} className="bg-card border-border hover:bg-accent disabled:opacity-50 rounded-full">
                      <ChevronLeft className="h-5 w-5" />
                      <span className="sr-only">Scroll Left</span>
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleScroll('right')} disabled={!canScrollRight || itemWidth === 0} className="bg-card border-border hover:bg-accent disabled:opacity-50 rounded-full">
                      <ChevronRight className="h-5 w-5" />
                      <span className="sr-only">Scroll Right</span>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="lg:w-2/3 lg:flex-1 min-w-0">
                <div ref={scrollContainerRef} className="flex space-x-6 overflow-x-auto pb-4 -mb-4 scrollbar-hide">
                  {homepageBlogPosts.slice(0, 6).map((post, index) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="block flex-shrink-0 w-[80vw] sm:w-[50vw] md:w-[40vw] lg:w-[calc(50%-0.75rem)] group" 
                    >
                      <div ref={index === 0 ? cardRef : null} className="h-full">
                        <Card className="h-full flex flex-col shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1" data-interactive-cursor="true">
                          <div className="ripple-container">
                            <Image
                              src={post.imageUrl}
                              alt={post.title}
                              width={600}
                              height={400}
                              className="w-full h-48 object-cover rounded-t-lg transition-transform duration-300 ease-in-out group-hover:scale-105"
                              data-ai-hint={post.dataAiHintImage}
                            />
                          </div>
                          <CardContent className="p-4 flex-grow flex flex-col">
                            <p className="text-xs text-muted-foreground mb-1 flex items-center">
                              <Dot className="h-4 w-4 mr-0.5 -ml-1 text-primary" /> {post.readTime}
                            </p>
                            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                              {post.title}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-3 flex-grow">
                              {post.excerpt}
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <div className="h-0.5 w-1/3 sm:w-1/4 md:w-1/6 mx-auto my-12 md:my-16 lg:my-20 bg-primary rounded-full" />
      </div>
    </div>
  );
}
