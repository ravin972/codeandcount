
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
import { portfolioItems } from '@/lib/portfolio-data';
import { Badge } from '@/components/ui/badge';
import DiwaliCracker from '@/components/common/DiwaliCracker';

gsap.registerPlugin(ScrollTrigger);


const services = [
  {
    name: 'Accounting & Financial Management',
    description: 'Strategic accounting, tax compliance, and payroll management. Custom dashboards for real-time business insights. Expertise in FinTech, retail, and hospitality sectors.',
    icon: <Calculator className="h-10 w-10 text-primary mb-4" />
  },
  {
    name: 'Web & AI Development',
    description: 'Custom websites, SaaS platforms, and mobile apps. AI-powered tools like chatbots, automation, and analytics. UI/UX design with modern, mobile-first interfaces.',
    icon: <Laptop className="h-10 w-10 text-primary mb-4" />
  },
  {
    name: 'Digital Marketing & SEO',
    description: 'Search engine optimization (SEO) for higher rankings. Paid advertising campaigns (Google, Meta, LinkedIn). Social media strategy & content creation.',
    icon: <Volume2 className="h-10 w-10 text-primary mb-4" />
  }
];

const clientLogos: { name: string; icon?: JSX.Element; imageUrl?: string; dataAiHint?: string }[] = [
    {
        name: 'Tradyne Perfumes',
        imageUrl: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop,q=95/AR03Dr4n5jfnXDLk/tradyne-logo-perfume-photoroom-AMq89KLo9Gfk4xM2.png',
        dataAiHint: 'perfume logo',
    },
    {
        name: 'Philotes',
        imageUrl: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,fit=crop,q=95/Yg2yJ37ryafQolWr/whatsapp_image_2025-08-02_at_12.41.54_pm-removebg-preview-photoroom-Y4Lv0DByVLhEqR7N.png',
        dataAiHint: 'footwear logo',
    },
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

// Fisher-Yates shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
};

type LoadingStep = 'preloading' | 'cracker' | 'done';

export default function HomePage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [itemWidth, setItemWidth] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [loadingStep, setLoadingStep] = useState<LoadingStep>('preloading');
  const [shuffledProjects, setShuffledProjects] = useState(portfolioItems);

  useEffect(() => {
    // Only run on the client
    setShuffledProjects(shuffleArray([...portfolioItems]));
  }, []);


  // Preloader and animation sequence logic
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasLoaded = sessionStorage.getItem('preloader_has_run');
      if (hasLoaded) {
        setLoadingStep('done');
      } else {
        // Start preloader
        const preloaderTimer = setTimeout(() => {
          // Preloader finished, now show cracker
          setLoadingStep('cracker');
          
          // Cracker animation will last for 3s (from its own CSS)
          const crackerTimer = setTimeout(() => {
            setLoadingStep('done');
            sessionStorage.setItem('preloader_has_run', 'true');
          }, 3000);

          return () => clearTimeout(crackerTimer);
        }, 2500); // Preloader duration

        return () => clearTimeout(preloaderTimer);
      }
    }
  }, []);

  // GSAP Animations
  useEffect(() => {
    if (loadingStep !== 'done') return; // Don't run animations until loading is fully complete

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

    // Featured Work Section
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
    // For simplicity, the individual cards inside the scroller are not animated here with scrolltrigger
    // to avoid conflicts with the horizontal scrolling itself.
    createAnimation('.blog-section-controls', { delay: 0.2 });


    // Cleanup ScrollTrigger instances on component unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [loadingStep]);



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
    if (loadingStep !== 'done') return;
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
  }, [checkScrollability, loadingStep]);


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
      {loadingStep === 'preloading' && <Preloader />}
      {loadingStep === 'cracker' && <DiwaliCracker />}

      <div className={cn(loadingStep !== 'done' && "opacity-0")}>
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
                  Code&Count – Web Development, AI Solutions & Accounting Services
                </h1>
              </div>

              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 hero-paragraph">
                Crafting digital experiences that turn your ideas into reality. We blend web development, AI innovation, and expert accounting to simplify your path to success.
              </p>
              <Button
                asChild
                size="lg"
                className={cn(
                    "group w-full max-w-xs mx-auto text-base py-3 px-8 hero-button",
                    "transition-all duration-300 ease-in-out shadow-lg hover:shadow-2xl active:shadow-md transform hover:-translate-y-0.5 active:translate-y-px",
                    "bg-primary text-primary-foreground"
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
              We offer a full suite of digital and financial solutions to help your business thrive.
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
              <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-10 client-logos-title">Trusted by Leading Brands</h2>
               <div className="scroller" data-speed="slow" data-direction="left">
                <div className="scroller__inner">
                    {[...clientLogos, ...clientLogos].map((logo, index) => (
                      <div key={`${logo.name}-${index}`} title={logo.name} className="flex-shrink-0 mx-8 transition-transform duration-300 ease-in-out transform hover:scale-110 group client-logo-item" data-interactive-cursor="true">
                        {logo.imageUrl ? (
                          <Image
                            src={logo.imageUrl}
                            alt={`${logo.name} logo`}
                            width={140}
                            height={56}
                            className="object-contain h-14 w-auto max-w-[160px] group-hover:opacity-80 transition-opacity"
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
          </div>
        </section>

        {/* Featured Work Section */}
        <section id="work" className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative inline-grid place-items-center w-full text-center mb-4 case-studies-title">
              <h2 className="col-start-1 row-start-1 relative z-[1] text-4xl md:text-5xl font-bold text-center text-foreground">Featured Projects</h2>
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground text-center mb-12 max-w-2xl mx-auto case-studies-description">
              Explore our success stories across multiple industries.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {shuffledProjects.slice(0, 3).map((project) => (
                <Card key={project.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out flex flex-col group hover:-translate-y-1 case-study-card" data-interactive-cursor="true">
                  <div className="ripple-container">
                    <Image src={project.imageUrl} alt={project.title} width={600} height={400} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out" data-ai-hint={project.dataAiHint} />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl font-semibold">{project.title}</CardTitle>
                    <CardDescription>{project.category}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{project.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" asChild className="rounded-full">
                      <Link href={`/work/${project.id}`}>
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
                      <h2 className="text-4xl font-bold text-center mb-4 text-foreground testimonials-title">Client Testimonials</h2>
                      <p className="text-xl md:text-2xl text-muted-foreground text-center mb-12 max-w-2xl mx-auto testimonials-description">
                          Real feedback from partners who trust us.
                      </p>
                      <div className="scroller" data-speed="slow" data-direction="left">
                          <div className="scroller__inner">
                              {[...testimonials.slice(0,2), ...testimonials.slice(0,2)].map((testimonial, index) => (
                                  <Card key={`${testimonial.name}-${index}`} className="w-[450px] flex-shrink-0 mx-4 shadow-lg" data-interactive-cursor="true">
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
                      <div className="text-center mt-8">
                        <Button variant="link" asChild>
                            <Link href="/testimonials">Read More Reviews <ArrowRight className="ml-1 h-4 w-4" /></Link>
                        </Button>
                      </div>
                  </div>
              </div>
          </section>

        {/* SEO Optimizer Tool Section */}
        <section id="seo-tool" className="py-16 md:py-20 bg-background text-foreground seo-tool-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Sparkles className="h-12 w-12 text-primary mx-auto mb-6" />
            <div className="relative inline-grid place-items-center w-full text-center mb-6">
              <h2 className="col-start-1 row-start-1 relative z-[1] text-4xl md:text-5xl font-bold">Boost Your SEO with AI</h2>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Unlock higher rankings with our AI SEO Optimizer – rewrite content, target keywords, and track results.
            </p>
            
            <div className="relative inline-block">
                <Button
                    asChild
                    size="lg"
                    className={cn(
                        "group w-full max-w-xs mx-auto text-base py-3 px-8",
                        "transition-all duration-300 ease-in-out shadow-lg hover:shadow-2xl active:shadow-md transform hover:-translate-y-0.5 active:translate-y-px",
                        "bg-primary text-primary-foreground"
                    )}
                    data-interactive-cursor="true"
                >
                  <Link href="/seo-optimizer">
                    Try SEO Optimizer <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
            </div>
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
              
              <div className="relative inline-block">
                <Button
                    asChild
                    size="lg"
                    className={cn(
                        "group w-full max-w-xs mx-auto text-base py-3 px-8",
                        "transition-all duration-300 ease-in-out shadow-lg hover:shadow-2xl active:shadow-md transform hover:-translate-y-0.5 active:translate-y-px",
                        "bg-primary text-primary-foreground"
                    )}
                    data-interactive-cursor="true"
                >
                    <Link href="/ai-image-generator">Try AI Image Generator <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
            </div>
            </div>
        </section>

        {/* Ready to Elevate Section */}
        <section className="py-20 relative overflow-hidden bg-gradient-bloom-cta-light dark:bg-gradient-bloom-cta ready-to-elevate-section">
          <div 
            aria-hidden="true"
            className="absolute inset-0 w-full h-full -z-10" 
          />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground dark:text-primary-foreground">Let’s Build Your Next Big Idea</h2>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-muted-foreground dark:text-primary-foreground/90">
              From startups to enterprises, we partner with you to develop, market, and scale your brand from Gurugram, Haryana, India.
            </p>
            <Button 
              size="lg" 
              asChild 
              className={cn(
                  "group w-full max-w-xs mx-auto text-base py-3 px-6",
                  "transition-all duration-300 ease-in-out shadow-lg hover:shadow-2xl active:shadow-md transform hover:-translate-y-0.5 active:translate-y-px",
                  "bg-background text-primary hover:bg-neutral-200 dark:bg-primary-foreground dark:text-primary dark:hover:bg-primary-foreground/90"
              )}
              data-interactive-cursor="true"
            >
              <Link href="/contact#start-project">
                Start Your Project <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
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
                 <h2 className="text-4xl md:text-5xl font-bold leading-tight text-foreground">
                  Latest Insights from Our Blog
                </h2>
                <div className="space-y-4">
                  <Button
                    variant="default"
                    size="lg"
                    asChild
                    className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full group pl-6 pr-4 py-3 text-base"
                  >
                    <Link href="/blog">
                      Read More Articles
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
                  {homepageBlogPosts.slice(0, 3).map((post, index) => (
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
