
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ExternalLink, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

const portfolioItems = [
  {
    id: 'divyasangrah-spiritual-marketplace',
    title: 'DivyaSangrah Spiritual Marketplace',
    category: 'E‑commerce · Spiritual Services',
    imageUrl: 'https://images.unsplash.com/photo-1639575668826-d6378418b110?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxwYW5kaXR8ZW58MHx8fHwxNzUwNDExMTIxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    dataAiHint: 'spiritual storefront',
    description: 'An all-in-one online store offering puja items, astrology consultations, and religious service bookings. Crafted for spiritual ambience and performance.',
    longDescription: 'An all-in-one online store offering puja items, astrology consultations, and religious service bookings. Crafted for spiritual ambience and performance, this platform integrates Shopify for e-commerce with a custom booking system for services, providing a seamless user experience for spiritual seekers.',
    tags: ['Shopify', 'Religious E-commerce', 'Booking System', 'Astrology', 'Puja Items'],
    client: 'DivyaSangrah',
    date: '2024-01-15',
    liveUrl: 'https://divyasangrah.com',
    servicesProvided: ['Shopify Development', 'E-commerce Strategy', 'Booking System Integration', 'UI/UX Design', 'Payment Gateway Setup'],
    results: 'Successfully launched a comprehensive spiritual marketplace, leading to increased service bookings and product sales. Enhanced user engagement through intuitive design.',
    gallery: [
        { src: 'https://placehold.co/800x600.png', alt: 'Marketplace Homepage', dataAiHint: 'storefront home' },
        { src: 'https://placehold.co/800x600.png', alt: 'Astrology Consultation Booking', dataAiHint: 'service booking' },
        { src: 'https://placehold.co/800x600.png', alt: 'Puja Items Store', dataAiHint: 'puja items' },
    ]
  },
  {
    id: 'itverbs-technology-solutions',
    title: 'ITVerbs Technology Solutions',
    category: 'Corporate IT Solutions',
    imageUrl: 'https://images.unsplash.com/photo-1556740714-a8395b3bf30f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MXwxfHNlYXJjaHw4fHxpdCUyMHRlY2glMjB8ZW58MHx8fHwxNzUwNDExMTg1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    dataAiHint: 'corporate it',
    description: 'Corporate portal for AI solutions, cloud services, and development projects. Includes career hub, portfolio sections, and contact workflows.',
    longDescription: 'A comprehensive corporate portal for ITVerbs, showcasing their expertise in AI, cloud services, and custom development. The platform features a dynamic career hub, detailed portfolio sections, and streamlined contact workflows to facilitate client engagement and talent acquisition.',
    tags: ['IT Website', 'AI Services', 'Tech Branding', 'Cloud Solutions', 'Career Portal'],
    client: 'ITVerbs Technology Solutions',
    date: '2024-02-01',
    liveUrl: 'https://www.itverbstechnologysolutions.com',
    servicesProvided: ['Corporate Website Design', 'AI Solutions Showcase', 'Cloud Services Info', 'Portfolio Development', 'Contact Integration'],
    results: 'Enhanced online presence and lead generation for IT services. Streamlined recruitment process through the integrated career hub.',
    gallery: [
        { src: 'https://placehold.co/800x600.png', alt: 'AI Solutions Page', dataAiHint: 'ai solutions' },
        { src: 'https://placehold.co/800x600.png', alt: 'Career Hub Interface', dataAiHint: 'career portal' },
        { src: 'https://placehold.co/800x600.png', alt: 'Client Portfolio Display', dataAiHint: 'client work' },
    ]
  },
  {
    id: 'buztrix-traveltech',
    title: 'BuzTrix TravelTech India Pvt. Ltd.',
    category: 'Travel SaaS Platform',
    imageUrl: 'https://images.unsplash.com/photo-1726197799856-cdff7a9037b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxNXx8dHJhdmVsJTIwYW5kJTIwdG91cnxlbnwwfHx8fDE3NTA0MTEyNTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    dataAiHint: 'travel saas',
    description: 'Developed for B2B travel operations. Offers hotel & flight APIs, lead tracking dashboards, and bulk booking systems.',
    longDescription: 'A robust B2B SaaS platform tailored for the travel industry. BuzTrix TravelTech features seamless integration with hotel and flight APIs, a comprehensive lead tracking dashboard, and efficient bulk booking systems, empowering travel agencies to optimize their operations.',
    tags: ['API Integration', 'Travel CRM', 'Booking Portal', 'SaaS Development', 'B2B Platform'],
    client: 'BuzTrix TravelTech India Pvt. Ltd.',
    date: '2023-12-10',
    liveUrl: 'http://buztrixtraveltechindiapvtltd.com',
    servicesProvided: ['SaaS App Development', 'Third-party API Integration', 'CRM Dashboard Design', 'Bulk Booking System', 'User Role Management'],
    results: 'Streamlined B2B travel operations for numerous clients, improving booking efficiency and lead management.',
    gallery: [
        { src: 'https://placehold.co/800x600.png', alt: 'Travel API Dashboard', dataAiHint: 'saas dashboard' },
        { src: 'https://placehold.co/800x600.png', alt: 'Lead Tracking System', dataAiHint: 'lead tracking' },
        { src: 'https://placehold.co/800x600.png', alt: 'Bulk Booking Interface', dataAiHint: 'b2b portal' },
    ]
  },
  {
    id: 'brista-travels',
    title: 'Brista Travels Pvt. Ltd.',
    category: 'Travel & Tours Website',
    imageUrl: 'https://images.unsplash.com/photo-1500835556837-99ac94a94552?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHx0cmF2ZWx8ZW58MHx8fHwxNzUwNDExMzM5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    dataAiHint: 'travel booking',
    description: 'Travel booking site highlighting packages, destination guides, and lead forms with WhatsApp integration.',
    longDescription: 'Brista Travels\' website is designed to attract and convert travelers with stunning destination showcases, detailed package information, and easy-to-use lead generation forms integrated with WhatsApp for quick communication.',
    tags: ['UX Design', 'Lead Funnels', 'Destination Portfolio', 'Travel Website', 'WhatsApp Integration'],
    client: 'Brista Travels Pvt. Ltd.',
    date: '2023-11-05',
    liveUrl: 'http://bristatravelspvtltd.com',
    servicesProvided: ['Travel Website Design', 'UX/UI for Tourism', 'Lead Generation Forms', 'WhatsApp Integration', 'CMS'],
    results: 'Increased lead generation by 30% through optimized user funnels and direct WhatsApp engagement.',
    gallery: [
        { src: 'https://placehold.co/800x600.png', alt: 'Travel Package Display', dataAiHint: 'tour packages' },
        { src: 'https://placehold.co/800x600.png', alt: 'Destination Guide Page', dataAiHint: 'destination info' },
        { src: 'https://placehold.co/800x600.png', alt: 'Lead Form with WhatsApp', dataAiHint: 'booking form' },
    ]
  },
  {
    id: 'taskslate-productivity-tool',
    title: 'TaskSlate Productivity Tool',
    category: 'Productivity SaaS',
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHx0ZWNofGVufDB8fHx8MTc1MDQwNTQyNnww&ixlib=rb-4.1.0&q=80&w=1080',
    dataAiHint: 'productivity app',
    description: 'Multi-user task manager with role permissions, calendar views, and file sharing. Built for freelancers and small businesses.',
    longDescription: 'TaskSlate is a web-based productivity SaaS application designed for freelancers and small teams. It features robust multi-user task management, role-based permissions, intuitive calendar views, and secure file sharing capabilities to enhance workflow efficiency.',
    tags: ['Web App', 'Workflow SaaS', 'Productivity Tools', 'Task Management', 'Collaboration'],
    client: 'TaskSlate Inc.',
    date: '2023-10-20',
    liveUrl: 'https://taskslate.in',
    servicesProvided: ['SaaS App Development', 'User Authentication', 'Calendar Integration', 'File Management', 'Real-time Collaboration'],
    results: 'Empowered small businesses and freelancers with an effective tool for task management and team collaboration.',
    gallery: [
        { src: 'https://placehold.co/800x600.png', alt: 'Task Management Dashboard', dataAiHint: 'project tasks' },
        { src: 'https://placehold.co/800x600.png', alt: 'Calendar View', dataAiHint: 'team calendar' },
        { src: 'https://placehold.co/800x600.png', alt: 'File Sharing Interface', dataAiHint: 'document cloud' },
    ]
  },
  {
    id: 'parivartan-by-divyasangrah',
    title: 'Parivartan by DivyaSangrah',
    category: 'E-commerce · Apparel Store',
    imageUrl: 'https://images.unsplash.com/photo-1555529771-835f59fc5efe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxhcHBhcmVsfGVufDB8fHx8MTc1MDQxMTgzOHww&ixlib=rb-4.1.0&q=80&w=1080',
    dataAiHint: 'apparel store',
    description: 'An online apparel store by DivyaSangrah, offering a unique collection of clothing and accessories. Designed for a seamless shopping experience.',
    longDescription: "Parivartan by DivyaSangrah is an e-commerce platform dedicated to apparel, offering a unique collection of clothing and accessories. The store is designed to provide a seamless and enjoyable online shopping experience, showcasing fashion items with style and elegance.",
    tags: ['E-commerce', 'Apparel', 'Fashion', 'Online Shopping', 'Clothing Store'],
    client: 'DivyaSangrah',
    date: '2023-09-15',
    liveUrl: 'https://parivartan.divyasangrah.com',
    servicesProvided: ['E-commerce Platform Development', 'Online Store Design', 'Product Catalog Management', 'Payment Gateway Integration', 'Fashion E-commerce'],
    results: "Successfully launched a stylish online apparel store, attracting fashion-conscious customers and increasing online sales.",
    gallery: [
        { src: 'https://placehold.co/800x600.png', alt: 'Apparel Collection Showcase', dataAiHint: 'clothing collection' },
        { src: 'https://placehold.co/800x600.png', alt: 'Product Detail Page', dataAiHint: 'fashion product' },
        { src: 'https://placehold.co/800x600.png', alt: 'Online Store Checkout', dataAiHint: 'ecommerce checkout' },
    ]
  },
  {
    id: 'anandam-wellness-hub', 
    title: 'Anandam by DivyaSangrah',
    category: 'Food & Restaurant · Online Ordering',
    imageUrl: 'https://images.unsplash.com/photo-1625398407796-82650a8c135f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxpbmRpYW4lMjBmb29kfGVufDB8fHx8MTc1MDQxMjQ4M3ww&ixlib=rb-4.1.0&q=80&w=1080', 
    dataAiHint: 'food restaurant', 
    description: 'Online store for delicious meals and restaurant services. Features menu display, online ordering, and table reservations.', 
    longDescription: 'Anandam by DivyaSangrah offers a delightful online experience for food lovers. Browse our extensive menu, place orders for delivery or pickup, and even book a table. The platform is designed for ease of use, showcasing delicious food photography and providing a seamless ordering process.', 
    tags: ['Online Ordering', 'Restaurant Website', 'Food Delivery', 'Menu Management'], 
    client: 'DivyaSangrah', 
    date: '2023-08-01', 
    liveUrl: 'https://anandam.divyasangrah.com', 
    servicesProvided: ['Online Ordering System', 'Menu Management Integration', 'Restaurant Website Design', 'Payment Gateway Setup', 'Table Reservation Feature'], 
    results: 'Successfully launched an intuitive online food ordering platform, increasing takeaway orders and streamlining the reservation process. Positive customer feedback on ease of use and menu presentation.', 
    gallery: [ 
        { src: 'https://placehold.co/800x600.png', alt: 'Restaurant Menu Page', dataAiHint: 'food menu' },
        { src: 'https://placehold.co/800x600.png', alt: 'Online Ordering System', dataAiHint: 'order food' },
        { src: 'https://placehold.co/800x600.png', alt: 'Table Reservation Interface', dataAiHint: 'restaurant booking' },
    ]
  },
  {
    id: 'divinepartners-consulting',
    title: 'DivinePartners Consulting',
    category: 'Corporate · Consulting',
    imageUrl: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjb25zdWx0YW5jeXxlbnwwfHx8fDE3NTA0MTI2NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    dataAiHint: 'consulting website',
    description: 'Clean and professional consultancy website. Features services, dynamic forms, and CRM integrations.',
    longDescription: 'DivinePartners Consulting required a polished and professional online presence. We delivered a clean website that clearly outlines their services, incorporates dynamic lead capture forms, and integrates seamlessly with their CRM for efficient client management.',
    tags: ['Corporate Design', 'Forms', 'Client Management', 'Consulting Website', 'CRM Integration'],
    client: 'DivinePartners Consulting',
    date: '2023-07-10',
    liveUrl: 'https://divinepartners.com',
    servicesProvided: ['Professional Web Design', 'Dynamic Form Creation', 'CRM Integration', 'Service Page Layouts', 'Mobile Responsive Dev'],
    results: 'Improved professional image and streamlined lead management process, resulting in better client acquisition.',
    gallery: [
        { src: 'https://placehold.co/800x600.png', alt: 'Consulting Services Page', dataAiHint: 'consulting services' },
        { src: 'https://placehold.co/800x600.png', alt: 'Dynamic Contact Form', dataAiHint: 'inquiry form' },
        { src: 'https://placehold.co/800x600.png', alt: 'CRM Integration Diagram', dataAiHint: 'crm flow' },
    ]
  },
  {
    id: 'venkwara-infotech',
    title: 'Venkwara Infotech Pvt. Ltd.',
    category: 'IT & Web Services',
    imageUrl: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxhY2NvdW50YW5jeXxlbnwwfHx8fDE3NTA0MTM1Njh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    dataAiHint: 'it services website',
    description: 'Technology-focused site showcasing development and infrastructure projects. Includes client portfolios and contact automation.',
    longDescription: 'Venkwara Infotech\'s website serves as a showcase for their extensive development and IT infrastructure projects. The site features detailed client portfolios and automated contact systems to effectively demonstrate their capabilities and engage potential clients.',
    tags: ['Enterprise Web', 'Tech Branding', 'DevOps', 'IT Solutions', 'Client Portfolio'],
    client: 'Venkwara Infotech Pvt. Ltd.',
    date: '2023-06-05',
    liveUrl: 'https://venkwarainfotechpvtltd.com',
    servicesProvided: ['Tech Website Development', 'Client Portfolio Design', 'Contact Automation', 'DevOps Solutions', 'Infrastructure Projects'],
    results: 'Successfully showcased complex IT projects, enhancing credibility and attracting enterprise-level clients.',
    gallery: [
        { src: 'https://placehold.co/800x600.png', alt: 'Development Projects Showcase', dataAiHint: 'dev projects' },
        { src: 'https://placehold.co/800x600.png', alt: 'Infrastructure Solutions', dataAiHint: 'cloud infra' },
        { src: 'https://placehold.co/800x600.png', alt: 'Automated Contact System', dataAiHint: 'contact automation' },
    ]
  },
  {
    id: 'talentgrowth-id',
    title: 'TalentGrowth ID',
    category: 'Career & HR Tech',
    imageUrl: 'https://images.unsplash.com/photo-1675654567523-b19d60eb4d3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx0YWxlbnQlMjBncm93dGglMjBpdHxlbnwwfHx8fDE3NTA0MzM5NDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    dataAiHint: 'career platform',
    description: 'Indonesia-based talent development platform. Personalized job matching, growth tracking, and candidate profiling system.',
    longDescription: 'TalentGrowth ID is an innovative Indonesian platform for talent development. It offers personalized job matching, career growth tracking, and detailed candidate profiling systems to connect job seekers with opportunities and help companies find the right talent.',
    tags: ['EdTech', 'Career Platform', 'Job Board', 'HR Technology', 'Talent Matching'],
    client: 'TalentGrowth Indonesia',
    date: '2024-03-01',
    liveUrl: 'https://www.talentgrowth.id/',
    servicesProvided: ['Platform Development', 'Matching Algorithm', 'Growth Tracking', 'Candidate Profiling', 'Job Board'],
    results: 'Launched a unique talent development platform in the Indonesian market, connecting skilled individuals with employers.',
    gallery: [
        { src: 'https://placehold.co/800x600.png', alt: 'Job Matching Interface', dataAiHint: 'talent search' },
        { src: 'https://placehold.co/800x600.png', alt: 'Candidate Profile', dataAiHint: 'candidate profile' },
        { src: 'https://placehold.co/800x600.png', alt: 'Growth Tracking Dashboard', dataAiHint: 'growth dashboard' },
    ]
  },
  {
    id: 'nirogitanman-healthcare',
    title: 'Nirogitanman Healthcare',
    category: 'Health Portal · Ayurvedic Wellness',
    imageUrl: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxoZWFsdGglMjB8ZW58MHx8fHwxNzUwNDM0MjcwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    dataAiHint: 'ayurvedic healthcare',
    description: 'Online consultation portal with Ayurveda-based health products and doctor booking. Simple UI and multilingual support.',
    longDescription: 'Nirogitanman Healthcare provides an accessible online portal for Ayurvedic wellness. It features online doctor consultations, a marketplace for Ayurveda-based products, and an easy-to-use booking system, all with a simple UI and multilingual support for broader reach.',
    tags: ['Healthcare UX', 'Booking Integration', 'Ayurvedic E‑commerce', 'Telemedicine', 'Multilingual Website'],
    client: 'Nirogitanman Healthcare',
    date: '2024-04-10',
    liveUrl: 'https://nirogitanman.com/',
    servicesProvided: ['Healthcare Portal Dev', 'Doctor Booking System', 'Ayurvedic E-commerce', 'Multilingual Support', 'UI/UX Design'],
    results: 'Successfully launched an online Ayurvedic consultation and product platform, making traditional healthcare more accessible.',
    gallery: [
        { src: 'https://placehold.co/800x600.png', alt: 'Doctor Consultation Booking', dataAiHint: 'online consultation' },
        { src: 'https://placehold.co/800x600.png', alt: 'Ayurvedic Product Store', dataAiHint: 'ayurveda products' },
        { src: 'https://placehold.co/800x600.png', alt: 'Multilingual Interface', dataAiHint: 'multilingual ui' },
    ]
  },
  {
    id: 'indialends',
    title: 'IndiaLends',
    category: 'Fintech · Loan Marketplace',
    imageUrl: 'https://placehold.co/1200x800.png',
    dataAiHint: 'fintech loan',
    description: 'Smart credit platform offering personal loans, credit cards, and financial education. Built with API-backed services and real-time checks.',
    longDescription: 'IndiaLends is a leading fintech platform in India, offering a smart credit marketplace for personal loans, credit cards, and financial literacy resources. The platform is built with robust API-backed services and real-time credit checking capabilities to provide users with quick and reliable financial solutions.',
    tags: ['Fintech UX', 'API', 'Loan Application', 'Credit Marketplace', 'Financial Education'],
    client: 'IndiaLends',
    date: '2024-05-20',
    liveUrl: 'https://www.indialends.com/',
    servicesProvided: ['Fintech Platform Dev', 'Financial API Integration', 'Loan Workflow Design', 'Credit Marketplace', 'Secure Data Handling'],
    results: 'Contributed to a high-traffic fintech platform, enhancing its loan and credit card application processes.',
    gallery: [
        { src: 'https://placehold.co/800x600.png', alt: 'Loan Application Form', dataAiHint: 'loan form' },
        { src: 'https://placehold.co/800x600.png', alt: 'Credit Card Comparison', dataAiHint: 'card comparison' },
        { src: 'https://placehold.co/800x600.png', alt: 'Financial Education Section', dataAiHint: 'finance education' },
    ]
  },
  {
    id: 'aadideva-venture',
    title: 'AadiDeva Venture',
    category: 'Travel & Adventure · Tour Booking',
    imageUrl: 'https://placehold.co/1200x800.png',
    dataAiHint: 'adventure booking',
    description: 'An adventure tourism platform offering curated trekking, cultural trips, and personalized travel experiences across India. Built to inspire explorers and manage bookings with ease.',
    longDescription: 'AadiDeva Venture is an online platform dedicated to adventure tourism in India. It offers a curated selection of trekking expeditions, cultural tours, and personalized travel itineraries, designed to inspire exploration and simplify the booking process for adventurers.',
    tags: ['Adventure Travel', 'Tour Portal', 'Booking Integration', 'Travel Experiences', 'Indian Tourism'],
    client: 'AadiDeva Venture',
    date: '2023-08-25',
    liveUrl: '#', 
    servicesProvided: ['Adventure Tourism Platform', 'Tour Curation', 'Online Booking System', 'Itinerary Builder', 'Travel CMS'],
    results: 'Launched an engaging platform for adventure travel, attracting explorers and streamlining tour bookings.',
    gallery: [
        { src: 'https://placehold.co/800x600.png', alt: 'Trekking Package Showcase', dataAiHint: 'trekking tour' },
        { src: 'https://placehold.co/800x600.png', alt: 'Cultural Trip Booking', dataAiHint: 'culture trip' },
        { src: 'https://placehold.co/800x600.png', alt: 'Personalized Travel Planner', dataAiHint: 'travel planner' },
    ]
  },
  {
    id: 'multi-currency-invoice-generation',
    title: 'Multi-Currency Invoice Generation',
    category: 'Financial Tools · International Invoicing',
    imageUrl: 'https://placehold.co/1200x800.png',
    dataAiHint: 'invoice currency',
    description: 'Create invoices in USD, EUR, GBP, AED, and more with auto currency conversion and dual-currency display.',
    longDescription: 'Efficiently generate invoices in multiple currencies like USD, EUR, GBP, AED, etc. Features automatic currency conversion using real-time exchange rates and options for dual-currency display (e.g., INR + Foreign Currency) to cater to international clients.',
    tags: ["Invoicing", "Multi-Currency", "Forex", "Billing"],
    client: 'Global Businesses',
    date: '2024-06-01',
    liveUrl: '#',
    servicesProvided: ["Multi-Currency Invoicing", "Real-time Exchange Rates", "Dual-Currency Display", "International Billing Solutions"],
    results: "Streamlined international invoicing processes, improving clarity and payment efficiency for businesses with global clientele.",
    gallery: [
        { src: 'https://placehold.co/800x600.png', alt: 'Currency Settings Interface', dataAiHint: 'currency settings' },
        { src: 'https://placehold.co/800x600.png', alt: 'Sample Multi-Currency Invoice', dataAiHint: 'invoice preview' },
        { src: 'https://placehold.co/800x600.png', alt: 'Exchange Rate Integration Display', dataAiHint: 'exchange rates' },
    ]
  },
  {
    id: 'international-tax-compliance',
    title: 'International Tax Compliance Solution',
    category: 'Taxation · Global Trade',
    imageUrl: 'https://placehold.co/1200x800.png',
    dataAiHint: 'tax compliance',
    description: 'Navigate GST with Export Invoice Format, LUT assistance, and country-specific tax breakdowns for seamless global trade.',
    longDescription: 'Ensures international tax compliance with features like GST-compliant Export Invoice Format, assistance with Letter of Undertaking (LUT), and detailed country-specific tax breakdowns (VAT, GST, etc.) for businesses involved in global trade.',
    tags: ["Taxation", "GST", "Export", "LUT", "VAT"],
    client: 'Exporters & Importers',
    date: '2024-06-05',
    liveUrl: '#',
    servicesProvided: ["Export Tax Compliance", "GST Export Invoicing", "LUT Assistance", "International VAT/GST Handling"],
    results: "Simplified tax compliance for international transactions, reducing errors and ensuring adherence to global tax regulations.",
    gallery: [
        { src: 'https://placehold.co/800x600.png', alt: 'Tax Compliance Dashboard', dataAiHint: 'tax form' },
        { src: 'https://placehold.co/800x600.png', alt: 'Export Document Sample', dataAiHint: 'export document' },
        { src: 'https://placehold.co/800x600.png', alt: 'Compliance Checklist Feature', dataAiHint: 'compliance checklist' },
    ]
  },
  {
    id: 'professional-invoice-customization',
    title: 'Professional Invoice Customization',
    category: 'Branding · Billing Solutions',
    imageUrl: 'https://placehold.co/1200x800.png',
    dataAiHint: 'invoice design',
    description: 'Offer branded invoice templates, multi-language options, and direct PDF download/email delivery to clients for a professional touch.',
    longDescription: 'Enhance your brand\'s professionalism with customizable invoice templates. Supports multi-language options for invoices, and allows for easy PDF download and direct email delivery to clients.',
    tags: ["Invoice Design", "Branding", "Multi-language", "PDF Invoices"],
    client: 'Service Businesses',
    date: '2024-06-10',
    liveUrl: '#',
    servicesProvided: ["Custom Invoice Templates", "Branded Invoicing", "Multi-Language Support", "PDF Generation & Delivery"],
    results: "Improved brand perception and client communication through professional and customizable invoicing.",
    gallery: [
        { src: 'https://placehold.co/800x600.png', alt: 'Invoice Template Editor', dataAiHint: 'template editor' },
        { src: 'https://placehold.co/800x600.png', alt: 'Branded Invoice Example', dataAiHint: 'branded invoice' },
        { src: 'https://placehold.co/800x600.png', alt: 'Multi-Language Invoice Options', dataAiHint: 'language options' },
    ]
  },
  {
    id: 'payment-integration-international',
    title: 'International Payment Gateway Integration',
    category: 'Fintech · Global Payments',
    imageUrl: 'https://placehold.co/1200x800.png',
    dataAiHint: 'payment gateway',
    description: 'Integrate payment gateways like PayPal, Stripe, Wise, Razorpay International, with payment reminders and a secure tracking dashboard.',
    longDescription: 'Facilitate seamless international payments by integrating popular gateways such as PayPal, Stripe, Wise, and Razorpay International. Includes features like payment due reminders, follow-ups, and a secure payment tracking dashboard.',
    tags: ["Payment Gateway", "PayPal", "Stripe", "International Payments"],
    client: 'Online Sellers & Freelancers',
    date: '2024-06-15',
    liveUrl: '#',
    servicesProvided: ["Payment Gateway Integration", "International Payment Processing", "Automated Reminders", "Payment Tracking"],
    results: "Increased international sales and faster payment collection by offering diverse and secure payment options.",
    gallery: [
        { src: 'https://placehold.co/800x600.png', alt: 'Payment Gateway Selection', dataAiHint: 'gateway logos' },
        { src: 'https://placehold.co/800x600.png', alt: 'Secure Payment Form', dataAiHint: 'payment form' },
        { src: 'https://placehold.co/800x600.png', alt: 'Payment Tracking Dashboard', dataAiHint: 'tracking dashboard' },
    ]
  },
  {
    id: 'invoice-automation-scheduling',
    title: 'Invoice Automation & Scheduling System',
    category: 'Automation · Billing Efficiency',
    imageUrl: 'https://placehold.co/1200x800.png',
    dataAiHint: 'invoice automation',
    description: 'Automate monthly/recurring invoices, schedule dispatch via Email or WhatsApp, and send auto payment confirmations.',
    longDescription: 'Streamline your billing process with invoice automation. Auto-generate monthly or recurring invoices, schedule their dispatch through Email or WhatsApp, and send automatic payment confirmation messages to clients.',
    tags: ["Automation", "Recurring Billing", "Scheduled Invoices", "WhatsApp Billing"],
    client: 'Subscription Businesses',
    date: '2024-06-20',
    liveUrl: '#',
    servicesProvided: ["Recurring Invoice Automation", "Scheduled Dispatch (Email/WhatsApp)", "Automated Payment Confirmations", "Billing Workflow Optimization"],
    results: "Reduced manual effort and improved cash flow through efficient invoice automation and scheduling.",
    gallery: [
        { src: 'https://placehold.co/800x600.png', alt: 'Invoice Scheduling Interface', dataAiHint: 'scheduling interface' },
        { src: 'https://placehold.co/800x600.png', alt: 'Automation Rules Setup', dataAiHint: 'automation rules' },
        { src: 'https://placehold.co/800x600.png', alt: 'Notification Settings Panel', dataAiHint: 'notification settings' },
    ]
  },
  {
    id: 'record-keeping-reporting-suite',
    title: 'Advanced Record Keeping & Reporting Suite',
    category: 'Accounting · Financial Reporting',
    imageUrl: 'https://placehold.co/1200x800.png',
    dataAiHint: 'financial reports',
    description: 'Export/import invoice records, generate monthly/quarterly billing summaries, and integrate with Zoho, QuickBooks, Tally.',
    longDescription: 'Maintain accurate financial records with features to export/import invoice data. Generate monthly/quarterly billing summary reports and integrate seamlessly with popular accounting tools like Zoho, QuickBooks, and Tally.',
    tags: ["Accounting", "Reporting", "Zoho", "QuickBooks", "Tally"],
    client: 'Small & Medium Enterprises',
    date: '2024-06-25',
    liveUrl: '#',
    servicesProvided: ["Invoice Data Management", "Billing Summary Reports", "Accounting Software Integration", "Financial Record Keeping"],
    results: "Enhanced financial visibility and simplified accounting processes through robust record keeping and reporting.",
    gallery: [
        { src: 'https://placehold.co/800x600.png', alt: 'Financial Report Dashboard', dataAiHint: 'report dashboard' },
        { src: 'https://placehold.co/800x600.png', alt: 'Data Export Options', dataAiHint: 'data export' },
        { src: 'https://placehold.co/800x600.png', alt: 'Accounting Tool Integration Logos', dataAiHint: 'integration logos' },
    ]
  },
  {
    id: 'import-export-documentation-support',
    title: 'Import/Export Documentation Support',
    category: 'Global Trade · Logistics',
    imageUrl: 'https://placehold.co/1200x800.png',
    dataAiHint: 'export documents',
    description: 'Support for commercial invoice preparation, packing lists, shipping bills, and client KYC/agreement documentation tracking.',
    longDescription: 'Comprehensive support for import/export documentation, including commercial invoice preparation, packing lists, shipping bills, and tracking of client KYC and agreement documentation to ensure smooth international trade operations.',
    tags: ["Export Documentation", "Import Documentation", "Logistics", "Trade Compliance"],
    client: 'Trading Companies',
    date: '2024-06-30',
    liveUrl: '#',
    servicesProvided: ["Commercial Invoice Prep", "Packing List Generation", "Shipping Bill Assistance", "KYC & Agreement Tracking"],
    results: "Facilitated smoother import/export operations by ensuring accurate and compliant documentation.",
    gallery: [
        { src: 'https://placehold.co/800x600.png', alt: 'Sample Export Document', dataAiHint: 'document template' },
        { src: 'https://placehold.co/800x600.png', alt: 'Logistics Workflow Diagram', dataAiHint: 'logistics checklist' },
        { src: 'https://placehold.co/800x600.png', alt: 'Compliance Verification Badge', dataAiHint: 'compliance seal' },
    ]
  }
];

export async function generateStaticParams() {
  return portfolioItems
    .filter(item => typeof item.id === 'string' && item.id.length > 0)
    .map((item) => ({
      projectId: item.id,
    }));
}

interface ProjectDetailPageProps {
  params: { projectId: string };
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { projectId } = params;
  const project = portfolioItems.find(item => item.id === projectId);

  if (!project) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="bg-card rounded-xl shadow-xl p-8 md:p-12 border border-border">
          <h1 className="text-4xl font-bold">Project Not Found</h1>
          <p className="mt-4 text-muted-foreground">The blog post you are looking for does not exist.</p>
          <Button asChild className="mt-8">
            <Link href="/work">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portfolio
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground">
      <header className="py-12 bg-secondary border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="outline" asChild className="mb-8">
            <Link href="/work">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portfolio
            </Link>
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{project.title}</h1>
          <p className="text-xl text-muted-foreground mt-2">{project.category}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map(tag => <Badge key={tag} variant="default">{tag}</Badge>)}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 bg-card rounded-xl shadow-xl p-6 md:p-8 border border-border">
            <Image 
              src={project.imageUrl} 
              alt={project.title} 
              width={1200} 
              height={800} 
              className="w-full rounded-lg shadow-xl mb-8 aspect-[3/2] object-cover"
              data-ai-hint={project.dataAiHint}
              priority 
            />
            <h2 className="text-3xl font-semibold mb-4">Project Overview</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p>{project.longDescription}</p>
            </div>

            {project.gallery && project.gallery.length > 0 && (
              <div className="mt-12">
                <h3 className="text-2xl font-semibold mb-6">Project Gallery</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {project.gallery.map((image, index) => (
                    <div key={index} className="overflow-hidden rounded-lg shadow-md border border-border">
                      <Image 
                        src={image.src} 
                        alt={image.alt} 
                        width={800} 
                        height={600} 
                        className="w-full h-auto object-cover aspect-[4/3]"
                        data-ai-hint={image.dataAiHint}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="lg:col-span-1 space-y-8">
            <Card className="p-6"> {/* Card uses solid bg */}
              <h3 className="text-xl font-semibold mb-4 text-card-foreground">Project Details</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><strong>Client:</strong> {project.client}</li>
                <li><strong>Date:</strong> {new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</li>
                <li><strong>Category:</strong> {project.category}</li>
              </ul>
              {project.liveUrl && project.liveUrl !== '#' && (
                <Button asChild className="w-full mt-6">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    View Live Project <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              )}
               {project.liveUrl && project.liveUrl === '#' && (
                <Button variant="outline" className="w-full mt-6" disabled>
                  Private Project
                </Button>
              )}
            </Card>

            <Card className="p-6"> {/* Card uses solid bg */}
              <h3 className="text-xl font-semibold mb-4 text-card-foreground">Services Provided</h3>
              <ul className="space-y-2 text-sm">
                {project.servicesProvided.map(service => (
                  <li key={service} className="flex items-center text-muted-foreground">
                    <CheckCircle className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                    {service}
                  </li>
                ))}
              </ul>
            </Card>

            {project.results && (
                 <Card className="p-6"> {/* Card uses solid bg */}
                    <h3 className="text-xl font-semibold mb-4 text-card-foreground">Key Results</h3>
                    <div className="prose prose-sm text-muted-foreground">
                        <p>{project.results}</p>
                    </div>
                </Card>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}

