
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, GalleryThumbnails, Calculator, Laptop } from 'lucide-react';
import { cn } from '@/lib/utils';

const portfolioItems = [
  {
    id: 'divyasangrah-spiritual-marketplace',
    title: 'DivyaSangrah Spiritual Marketplace',
    category: 'E‑commerce · Spiritual Services',
    type: 'webdev',
    imageUrl: 'https://placehold.co/600x450.png',
    dataAiHint: 'spiritual storefront',
    description: 'An all-in-one online store offering puja items, astrology consultations, and religious service bookings. Crafted for spiritual ambience and performance.',
    tags: ['Shopify', 'Religious E-commerce', 'Booking System'],
    liveUrl: 'https://divyasangrah.com',
  },
  {
    id: 'itverbs-technology-solutions',
    title: 'ITVerbs Technology Solutions',
    category: 'Corporate IT Solutions',
    type: 'webdev',
    imageUrl: 'https://placehold.co/600x450.png',
    dataAiHint: 'corporate it',
    description: 'Corporate portal for AI solutions, cloud services, and development projects. Includes career hub, portfolio sections, and contact workflows.',
    tags: ['IT Website', 'AI Services', 'Tech Branding'],
    liveUrl: 'https://www.itverbstechnologysolutions.com',
  },
  {
    id: 'buztrix-traveltech',
    title: 'BuzTrix TravelTech India Pvt. Ltd.',
    category: 'Travel SaaS Platform',
    type: 'webdev',
    imageUrl: 'https://placehold.co/600x450.png',
    dataAiHint: 'travel saas',
    description: 'Developed for B2B travel operations. Offers hotel & flight APIs, lead tracking dashboards, and bulk booking systems.',
    tags: ['API Integration', 'Travel CRM', 'Booking Portal'],
    liveUrl: 'http://buztrixtraveltechindiapvtltd.com',
  },
  {
    id: 'brista-travels',
    title: 'Brista Travels Pvt. Ltd.',
    category: 'Travel & Tours Website',
    type: 'webdev',
    imageUrl: 'https://placehold.co/600x450.png',
    dataAiHint: 'travel booking',
    description: 'Travel booking site highlighting packages, destination guides, and lead forms with WhatsApp integration.',
    tags: ['UX Design', 'Lead Funnels', 'Destination Portfolio'],
    liveUrl: 'http://bristatravelspvtltd.com',
  },
  {
    id: 'taskslate-productivity-tool',
    title: 'TaskSlate Productivity Tool',
    category: 'Productivity SaaS',
    type: 'webdev',
    imageUrl: 'https://placehold.co/600x450.png',
    dataAiHint: 'productivity app',
    description: 'Multi-user task manager with role permissions, calendar views, and file sharing. Built for freelancers and small businesses.',
    tags: ['Web App', 'Workflow SaaS', 'Productivity Tools'],
    liveUrl: 'https://taskslate.in',
  },
  {
    id: 'parivartan-by-divyasangrah',
    title: 'Parivartan by DivyaSangrah',
    category: 'NGO · Community Portal',
    type: 'webdev',
    imageUrl: 'https://placehold.co/600x450.png',
    dataAiHint: 'ngo community',
    description: 'Platform for event listings, donations, and volunteer participation. Built for scalability and public involvement.',
    tags: ['NGO Website', 'Donation Integration', 'Event Platform'],
    liveUrl: 'https://parivartan.divyasangrah.com',
  },
  {
    id: 'anandam-wellness-hub',
    title: 'Anandam Wellness Hub',
    category: 'Health & Spirituality',
    type: 'webdev',
    imageUrl: 'https://placehold.co/600x450.png',
    dataAiHint: 'wellness portal',
    description: 'Wellness portal with articles, guided meditations, and subscription content. Calm UI with blog and member area.',
    tags: ['CMS', 'Wellness UX', 'Blog Membership'],
    liveUrl: 'https://anandam.divyasangrah.com',
  },
  {
    id: 'divinepartners-consulting',
    title: 'DivinePartners Consulting',
    category: 'Corporate · Consulting',
    type: 'webdev',
    imageUrl: 'https://placehold.co/600x450.png',
    dataAiHint: 'consulting website',
    description: 'Clean and professional consultancy website. Features services, dynamic forms, and CRM integrations.',
    tags: ['Corporate Design', 'Forms', 'Client Management'],
    liveUrl: 'https://divinepartners.com',
  },
  {
    id: 'venkwara-infotech',
    title: 'Venkwara Infotech Pvt. Ltd.',
    category: 'IT & Web Services',
    type: 'webdev',
    imageUrl: 'https://placehold.co/600x450.png',
    dataAiHint: 'it services website',
    description: 'Technology-focused site showcasing development and infrastructure projects. Includes client portfolios and contact automation.',
    tags: ['Enterprise Web', 'Tech Branding', 'DevOps'],
    liveUrl: 'https://venkwarainfotechpvtltd.com',
  },
  {
    id: 'talentgrowth-id',
    title: 'TalentGrowth ID',
    category: 'Career & HR Tech',
    type: 'webdev',
    imageUrl: 'https://placehold.co/600x450.png',
    dataAiHint: 'career platform',
    description: 'Indonesia-based talent development platform. Personalized job matching, growth tracking, and candidate profiling system.',
    tags: ['EdTech', 'Career Platform', 'Job Board'],
    liveUrl: 'https://www.talentgrowth.id/',
  },
  {
    id: 'nirogitanman-healthcare',
    title: 'Nirogitanman Healthcare',
    category: 'Health Portal · Ayurvedic Wellness',
    type: 'webdev',
    imageUrl: 'https://placehold.co/600x450.png',
    dataAiHint: 'ayurvedic healthcare',
    description: 'Online consultation portal with Ayurveda-based health products and doctor booking. Simple UI and multilingual support.',
    tags: ['Healthcare UX', 'Booking Integration', 'Ayurvedic E‑commerce'],
    liveUrl: 'https://nirogitanman.com/',
  },
  {
    id: 'indialends',
    title: 'IndiaLends',
    category: 'Fintech · Loan Marketplace',
    type: 'webdev',
    imageUrl: 'https://placehold.co/600x450.png',
    dataAiHint: 'fintech loan',
    description: 'Smart credit platform offering personal loans, credit cards, and financial education. Built with API-backed services and real-time checks.',
    tags: ['Fintech UX', 'API', 'Loan Application'],
    liveUrl: 'https://www.indialends.com/',
  },
  {
    id: 'aadideva-venture',
    title: 'AadiDeva Venture',
    category: 'Travel & Adventure · Tour Booking',
    type: 'webdev',
    imageUrl: 'https://placehold.co/600x450.png',
    dataAiHint: 'adventure booking',
    description: 'An adventure tourism platform offering curated trekking, cultural trips, and personalized travel experiences across India. Built to inspire explorers and manage bookings with ease.',
    tags: ['Adventure Travel', 'Tour Portal', 'Booking Integration'],
    liveUrl: '#',
  },
  {
    id: 'multi-currency-invoice-generation',
    title: 'Multi-Currency Invoice Generation',
    category: 'Financial Tools · International Invoicing',
    type: 'accounting',
    imageUrl: 'https://placehold.co/600x450.png',
    dataAiHint: 'invoice currency',
    description: 'Create invoices in USD, EUR, GBP, AED, and more with auto currency conversion and dual-currency display.',
    tags: ["Invoicing", "Multi-Currency", "Forex", "Billing"],
    liveUrl: '#',
  },
  {
    id: 'international-tax-compliance',
    title: 'International Tax Compliance Solution',
    category: 'Taxation · Global Trade',
    type: 'accounting',
    imageUrl: 'https://placehold.co/600x450.png',
    dataAiHint: 'tax compliance',
    description: 'Navigate GST with Export Invoice Format, LUT assistance, and country-specific tax breakdowns for seamless global trade.',
    tags: ["Taxation", "GST", "Export", "LUT", "VAT"],
    liveUrl: '#',
  },
  {
    id: 'professional-invoice-customization',
    title: 'Professional Invoice Customization',
    category: 'Branding · Billing Solutions',
    type: 'accounting',
    imageUrl: 'https://placehold.co/600x450.png',
    dataAiHint: 'invoice design',
    description: 'Offer branded invoice templates, multi-language options, and direct PDF download/email delivery to clients for a professional touch.',
    tags: ["Invoice Design", "Branding", "Multi-language", "PDF Invoices"],
    liveUrl: '#',
  },
  {
    id: 'payment-integration-international',
    title: 'International Payment Gateway Integration',
    category: 'Fintech · Global Payments',
    type: 'accounting',
    imageUrl: 'https://placehold.co/600x450.png',
    dataAiHint: 'payment gateway',
    description: 'Integrate payment gateways like PayPal, Stripe, Wise, Razorpay International, with payment reminders and a secure tracking dashboard.',
    tags: ["Payment Gateway", "PayPal", "Stripe", "International Payments"],
    liveUrl: '#',
  },
  {
    id: 'invoice-automation-scheduling',
    title: 'Invoice Automation & Scheduling System',
    category: 'Automation · Billing Efficiency',
    type: 'accounting',
    imageUrl: 'https://placehold.co/600x450.png',
    dataAiHint: 'invoice automation',
    description: 'Automate monthly/recurring invoices, schedule dispatch via Email or WhatsApp, and send auto payment confirmations.',
    tags: ["Automation", "Recurring Billing", "Scheduled Invoices", "WhatsApp Billing"],
    liveUrl: '#',
  },
  {
    id: 'record-keeping-reporting-suite',
    title: 'Advanced Record Keeping & Reporting Suite',
    category: 'Accounting · Financial Reporting',
    type: 'accounting',
    imageUrl: 'https://placehold.co/600x450.png',
    dataAiHint: 'financial reports',
    description: 'Export/import invoice records, generate monthly/quarterly billing summaries, and integrate with Zoho, QuickBooks, Tally.',
    tags: ["Accounting", "Reporting", "Zoho", "QuickBooks", "Tally"],
    liveUrl: '#',
  },
  {
    id: 'import-export-documentation-support',
    title: 'Import/Export Documentation Support',
    category: 'Global Trade · Logistics',
    type: 'accounting',
    imageUrl: 'https://placehold.co/600x450.png',
    dataAiHint: 'export documents',
    description: 'Support for commercial invoice preparation, packing lists, shipping bills, and client KYC/agreement documentation tracking.',
    tags: ["Export Documentation", "Import Documentation", "Logistics", "Trade Compliance"],
    liveUrl: '#',
  }
];

type FilterType = 'all' | 'accounting' | 'web_ai';

const ProjectCard = ({ item }: { item: typeof portfolioItems[0] }) => (
  <Card key={item.id} className="overflow-hidden flex flex-col group hover:-translate-y-1" data-interactive-cursor="true"> {/* Card uses solid bg */}
    <div className="relative overflow-hidden">
      <Image 
        src={item.imageUrl} 
        alt={item.title} 
        width={600} 
        height={450} 
        className="w-full h-72 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        data-ai-hint={item.dataAiHint} 
      />
    </div>
    <CardHeader>
      <CardTitle className="text-2xl font-semibold group-hover:text-primary transition-colors">{item.title}</CardTitle>
      <CardDescription>{item.category}</CardDescription>
    </CardHeader>
    <CardContent className="flex-grow">
      <p className="text-muted-foreground mb-4 line-clamp-3">{item.description}</p>
      <div className="flex flex-wrap gap-2">
        {item.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
      </div>
    </CardContent>
    <CardFooter>
      <Button variant="outline" asChild className="w-full">
        <Link href={`/work/${item.id}`}>
          View Project Details <Eye className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </CardFooter>
  </Card>
);

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredProjects = portfolioItems.filter(item => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'accounting') return item.type === 'accounting';
    if (activeFilter === 'web_ai') return item.type === 'webdev' || item.type === 'ai'; // 'ai' type can be added if needed later
    return true;
  });

  return (
    <div className="bg-background text-foreground">
      <header className="py-16 md:py-24 text-center bg-secondary border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 flex items-center justify-center">
            <GalleryThumbnails className="h-12 w-12 mr-4 text-primary" />
            Our Work
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            We take pride in our diverse portfolio, showcasing successful collaborations with clients across various industries. Explore our projects and see the CodeAndCount.com difference.
          </p>
        </div>
      </header>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-xl shadow-xl p-8 md:p-12 border border-border">
            
            <div className="mb-12 flex flex-wrap justify-center items-center gap-3 sm:gap-4">
              <Button 
                onClick={() => setActiveFilter('all')} 
                variant={activeFilter === 'all' ? 'default' : 'outline'}
                className="rounded-full text-base h-12 px-10"
              >
                <GalleryThumbnails className="mr-2 h-5 w-5" />
                All Projects
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
                Websites & AI Solutions
              </Button>
            </div>
            
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((item) => <ProjectCard key={item.id} item={item} />)}
              </div>
            ) : (
               <p className="text-center text-muted-foreground text-xl py-10">No projects found in this category. Check back later or select another category!</p>
            )}

          </div>
        </div>
      </section>
    </div>
  );
}
