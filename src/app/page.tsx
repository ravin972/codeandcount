
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowUpRight, Sparkles, ArrowRight, Eye, Dot, ChevronLeft, ChevronRight, Calculator, Laptop, Volume2, Building, Briefcase, Network, Users, Globe } from 'lucide-react';
import InfiniteScrollerWithMouseFollower from '@/components/effects/InfiniteScrollerWithMouseFollower';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';


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

const clientLogos = [
  { name: 'Client Alpha', icon: <Building className="h-12 w-12 text-muted-foreground group-hover:text-primary transition-colors" /> },
  { name: 'Client Beta', icon: <Briefcase className="h-12 w-12 text-muted-foreground group-hover:text-primary transition-colors" /> },
  { name: 'Client Gamma', icon: <Network className="h-12 w-12 text-muted-foreground group-hover:text-primary transition-colors" /> },
  { name: 'Client Delta', icon: <Users className="h-12 w-12 text-muted-foreground group-hover:text-primary transition-colors" /> },
  { name: 'Client Epsilon', icon: <Globe className="h-12 w-12 text-muted-foreground group-hover:text-primary transition-colors" /> },
];

const caseStudies = [
  {
    id: 'divyasangrah-spiritual-marketplace',
    title: 'DivyaSangrah Spiritual Marketplace',
    category: 'E‑commerce · Spiritual Services',
    imageUrl: 'https://images.unsplash.com/photo-1725075236549-cb936c4a8c21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxzcGlyaXR1YWwlMjBzdG9yZWZyb250fGVufDB8fHx8MTc1MDMxMjQ4N3ww&ixlib=rb-4.1.0&q=80&w=1080', 
    dataAiHint: 'spiritual storefront',
    description: 'An all-in-one online store offering puja items, astrology consultations, and religious service bookings. Crafted for spiritual ambience and performance.',
  },
  {
    id: 'itverbs-technology-solutions',
    title: 'ITVerbs Technology Solutions',
    category: 'Corporate IT Solutions',
    imageUrl: 'https://images.unsplash.com/photo-1608908271749-40decee4f0e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxjb3Jwb3JhdGUlMjBpdHxlbnwwfHx8fDE3NTAzMTI0ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080', 
    dataAiHint: 'corporate it',
    description: 'Corporate portal for AI solutions, cloud services, and development projects. Includes career hub, portfolio sections, and contact workflows.',
  },
  {
    id: 'buztrix-traveltech',
    title: 'BuzTrix TravelTech India Pvt. Ltd.',
    category: 'Travel SaaS Platform',
    imageUrl: 'https://images.unsplash.com/photo-1663832669455-9a5ff27107ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHx0cmF2ZWwlMjBzYWFzfGVufDB8fHx8MTc1MDMxMjQ4Nnww&ixlib=rb-4.1.0&q=80&w=1080', 
    dataAiHint: 'travel saas',
    description: 'Developed for B2B travel operations. Offers hotel & flight APIs, lead tracking dashboards, and bulk booking systems.',
  },
];

const testimonials = [
  {
    name: 'Priya Sharma',
    title: 'Managing Director, Jaipur Handlooms Pvt. Ltd.',
    avatar: 'https://images.unsplash.com/flagged/photo-1559289142-e88aab8191d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxpbmRpYW4lMjB3b21hbiUyMHByb2Zlc3Npb25hbHxlbnwwfHx8fDE3NTAzMTAyODF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    dataAiHint: 'indian woman professional',
    quote: "CodeAndCount.com has been pivotal for our digital growth. Their expertise and dedication are truly commendable. Our online sales have significantly increased!",
  },
  {
    name: 'Rohan Mehra',
    title: 'Founder, Bangalore Tech Startups',
    avatar: 'https://images.unsplash.com/photo-1654262609484-76d1a8f3b016?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxpbmRpYW4lMjBtYW4lMjBzdGFydHVwfGVufDB8fHx8MTc1MDMxMDI4MXww&ixlib=rb-4.1.0&q=80&w=1080',
    dataAiHint: 'indian man startup',
    quote: 'The team at CodeAndCount.com understood our vision perfectly and delivered a robust platform. Their innovative approach to web solutions is top-notch.',
  },
];

const homepageBlogPosts = [
  {
    slug: 'the-future-of-web-design-trends-for-2024',
    title: 'The Future of Web Design: Trends for 2024',
    imageUrl: 'https://images.unsplash.com/photo-1675044794037-9262cedb6d5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxmdXR1cmlzdGljJTIwZGVzaWdufGVufDB8fHx8MTc1MDMxMDI4MXww&ixlib=rb-4.1.0&q=80&w=1080',
    excerpt: 'Discover the cutting-edge web design trends shaping the digital landscape in 2024, from AI integration to immersive experiences.',
    readTime: '6 min read',
    category: 'Web Design',
    date: '2024-07-15',
    author: 'Alex Chen',
    dataAiHint: 'futuristic design',
  },
  {
    slug: 'unlocking-seo-success-a-comprehensive-guide',
    title: 'Unlocking SEO Success: A Comprehensive Guide',
    imageUrl: 'https://images.unsplash.com/photo-1666537072157-440346cea066?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxzZW8lMjBjaGFydCUyMGdyYXBofGVufDB8fHx8MTc1MDMxMDI4MXww&ixlib=rb-4.1.0&q=80&w=1080',
    excerpt: 'Navigate the complexities of SEO with our in-depth guide, covering everything from keyword research to technical optimization.',
    readTime: '10 min read',
    category: 'SEO',
    date: '2024-07-01',
    author: 'Sam Lee',
    dataAiHint: 'seo chart graph',
  },
  {
    slug: 'why-craft-cms-is-our-go-to-for-flexible-websites',
    title: 'Why Craft CMS is Our Go-To for Flexible Websites',
    imageUrl: 'https://images.unsplash.com/photo-1641567535859-c58187ac4954?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxjbXMlMjBpbnRlcmZhY2V8ZW58MHx8fHwxNzUwMzEwMjgxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    excerpt: 'Explore the benefits of Craft CMS and why it stands out as a powerful, flexible, and user-friendly content management system.',
    readTime: '4 min read',
    category: 'Craft CMS',
    date: '2024-06-20',
    author: 'Maria Rodriguez',
    dataAiHint: 'cms interface',
  },
  {
    slug: 'ai-in-digital-marketing-the-new-frontier',
    title: 'AI in Digital Marketing: The New Frontier',
    imageUrl: 'https://images.unsplash.com/photo-1571934732896-f47880a8bdfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8YXJ0aWZpY2lhbCUyMGludGVsbGlnZW5jZSUyMG1hcmtldGluZ3xlbnwwfHx8fDE3NTAzMTAyODJ8MA&ixlib=rb-4.1.0&q=80&w=1080', 
    dataAiHint: 'artificial intelligence marketing',
    excerpt: 'How AI is revolutionizing digital marketing strategies, from content creation to customer analytics.',
    readTime: '8 min read',
    category: 'Digital Marketing',
    date: '2024-05-22',
    author: 'Sam Lee',
  },
  {
    slug: 'the-importance-of-user-experience-ux-in-web-design',
    title: 'The Importance of User Experience (UX) in Web Design',
    imageUrl: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHx1c2VyJTIwZXhwZXJpZW5jZSUyMGludGVyZmFjZXxlbnwwfHx8fDE3NTAzMTAyODF8MA&ixlib=rb-4.1.0&q=80&w=1080', 
    dataAiHint: 'user experience interface',
    excerpt: 'A deep dive into why UX is paramount for website success and how to optimize it for your users.',
    readTime: '7 min read',
    category: 'Web Design',
    date: '2024-05-10',
    author: 'Alex Chen',
  },
  {
    slug: 'wordpress-vs-headless-cms-which-is-right-for-you',
    title: 'WordPress vs. Headless CMS: Which is Right for You?',
    imageUrl: 'https://images.unsplash.com/photo-1560306990-18fa759c8713?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxjbXMlMjBjb21wYXJpc29uJTIwY2hhcnR8ZW58MHx8fHwxNzUwMzEwMjgxfDA&ixlib=rb-4.1.0&q=80&w=1080', 
    dataAiHint: 'cms comparison chart',
    excerpt: 'Comparing traditional WordPress with modern headless CMS solutions to help you choose the best fit.',
    readTime: '9 min read',
    category: 'CMS',
    date: '2024-04-28',
    author: 'Maria Rodriguez',
  },
];


export default function HomePage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [itemWidth, setItemWidth] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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
    const container = scrollContainerRef.current;
    let animationFrameId: number;

    const calculateAndUpdateAll = () => {
      if (cardRef.current && container) {
        const cardElement = cardRef.current;
        const style = window.getComputedStyle(cardElement.parentElement!); 
        const marginRight = parseFloat(style.marginRight || '0');
        const marginLeft = parseFloat(style.marginLeft || '0');
        
        const calculatedWidth = cardElement.offsetWidth + marginRight + marginLeft;

        if (calculatedWidth > 0) {
          setItemWidth(calculatedWidth);
        } else {
          setItemWidth(0); 
        }
        checkScrollability(); 
      } else {
        setItemWidth(0);
        checkScrollability();
      }
    };
    
    const runCalculation = () => {
      calculateAndUpdateAll();
      animationFrameId = requestAnimationFrame(runCalculation);
    };
    
    animationFrameId = requestAnimationFrame(() => {
      requestAnimationFrame(runCalculation); 
    });
    
    if (container) {
      container.addEventListener('scroll', checkScrollability, { passive: true });
    }
    window.addEventListener('resize', calculateAndUpdateAll); 

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (container) {
        container.removeEventListener('scroll', checkScrollability);
      }
      window.removeEventListener('resize', calculateAndUpdateAll);
    };
  }, [checkScrollability]);


  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current && itemWidth > 0) {
      const scrollValue = direction === 'left' ? -itemWidth : itemWidth;
      scrollContainerRef.current.scrollBy({
        left: scrollValue,
        behavior: 'smooth',
      });
      setTimeout(checkScrollability, 350); 
    }
  };


  return (
    <div className="bg-background text-foreground">
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
            <div className="mb-6">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-primary-foreground">
                Crafting digital experience.
              </h1>
            </div>

            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            CodeAndCount.com helps turn your ideas into reality — from web development to smart accounting. We simplify success with digital innovation, custom software, and expert financial solutions.
            </p>
            <Button size="lg" asChild className="rounded-full">
              <Link href="/contact#start-project">
                Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative inline-grid place-items-center w-full text-center mb-4">
            <h2 className="col-start-1 row-start-1 relative z-[1] text-4xl md:text-5xl font-bold text-center text-foreground">Our Core Services</h2>
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground text-center mt-4 mb-12 max-w-2xl mx-auto">
            We offer a comprehensive suite of services to bring your vision to life.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.name} className="shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1" data-interactive-cursor="true">
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
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-10">Trusted by Industry Leaders</h2>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {clientLogos.map((logo) => (
                <div key={logo.name} title={logo.name} className="transition-transform duration-300 ease-in-out transform hover:scale-110 group" data-interactive-cursor="true">
                  {logo.icon}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="work" className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative inline-grid place-items-center w-full text-center mb-4">
            <h2 className="col-start-1 row-start-1 relative z-[1] text-4xl md:text-5xl font-bold text-center text-foreground">Featured Work</h2>
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Explore how we've helped businesses like yours succeed.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study) => (
              <Card key={study.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out flex flex-col group hover:-translate-y-1" data-interactive-cursor="true">
                <Image src={study.imageUrl} alt={study.title} width={600} height={400} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out" data-ai-hint={study.dataAiHint} />
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
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild className="rounded-full group">
              <Link href="/work">
                Explore All Projects <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-xl shadow-xl p-8 md:p-12 border border-border">
            <h2 className="text-4xl font-bold text-center mb-4 text-foreground">What Our Clients Say</h2>
            <p className="text-xl md:text-2xl text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Real stories from satisfied partners.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.name} className="shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1" data-interactive-cursor="true">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.dataAiHint} />
                        <AvatarFallback>{testimonial.name.substring(0,2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="text-lg font-semibold text-foreground">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                      </div>
                    </div>
                    <blockquote className="text-foreground italic border-l-4 border-primary pl-4 py-2">
                      "{testimonial.quote}"
                    </blockquote>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEO Optimizer Tool Section */}
      <section id="seo-tool" className="py-16 md:py-20 bg-background text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Sparkles className="h-12 w-12 text-primary mx-auto mb-6" />
          <div className="relative inline-grid place-items-center w-full text-center mb-6">
            <h2 className="col-start-1 row-start-1 relative z-[1] text-4xl md:text-5xl font-bold">Boost Your SEO with Our AI Optimizer</h2>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Unlock the power of AI to rewrite your content, incorporate strategic keywords, and climb search engine rankings. Try our free SEO Optimizer tool today!
          </p>
          
          <Button size="lg" asChild className="rounded-full">
            <Link href="/seo-optimizer">
              Try SEO Optimizer <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Ready to Elevate Section */}
      <section className="py-20 relative overflow-hidden bg-background">
         <div 
          aria-hidden="true"
          className="absolute inset-0 w-full h-full bg-gradient-bloom-cta-light dark:bg-gradient-bloom-cta -z-10"
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary-foreground">Ready to Elevate Your Brand?</h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-primary-foreground/90">
            Let's discuss how CodeAndCount.com can help you achieve your business goals. We partner with clients of all sizes, across diverse industries, to deliver exceptional results.
          </p>
          <Button size="lg" variant="default" asChild className="rounded-full bg-primary-foreground text-primary hover:bg-primary-foreground/90">
            <Link href="/contact#start-project">
              Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
      
      <div className="h-0.5 w-1/3 sm:w-1/4 md:w-1/6 mx-auto my-12 md:my-16 lg:my-20 bg-primary rounded-full" />
      <InfiniteScrollerWithMouseFollower />
      
      {/* Blog Section */}
      <section className="py-16 md:py-24 bg-background text-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 items-center">
            <div className="md:col-span-1 space-y-6">
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
                <div className="flex space-x-3">
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
            <div className="md:col-span-2 overflow-x-hidden md:overflow-x-visible md:overflow-y-visible overflow-y-hidden">
              <div ref={scrollContainerRef} className="flex space-x-6 overflow-x-auto overflow-y-visible pb-4 -mb-4 scrollbar-hide">
                {homepageBlogPosts.map((post, index) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="block flex-shrink-0 w-[80vw] sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1rem)] group" 
                  >
                     <div ref={index === 0 ? cardRef : null} className="h-full">
                      <Card className="h-full flex flex-col shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1" data-interactive-cursor="true">
                        <Image
                          src={post.imageUrl}
                          alt={post.title}
                          width={600}
                          height={400}
                          className="w-full h-48 object-cover rounded-t-lg transition-transform duration-300 ease-in-out group-hover:scale-105"
                          data-ai-hint={post.dataAiHint}
                        />
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
  );
}
