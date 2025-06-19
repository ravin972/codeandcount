
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  CheckCircle, Palette, Laptop, Search, Puzzle, ShoppingCart, Calculator, Wrench, 
  GalleryThumbnails, Brain, BarChart3, ReceiptText, Users2, FileText, LayoutDashboard, 
  ShieldCheck, DatabaseZap, BriefcaseBusiness, Smartphone, Globe, Bot, Database,
  ImageIcon, MailOpen, BarChartBig, BrainCircuit, SearchCode,
  MousePointerClick, Share2, PenTool, Mail as MailIcon, TrendingUp, Star, Megaphone, Link as LinkIcon, Clapperboard, Store, Volume2, MessageSquareText
} from "lucide-react";
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ServiceDetail {
  name: string;
  description: string;
  icon: JSX.Element;
  points: string[];
  type: 'web_ai' | 'accounting' | 'digital_marketing';
}


const servicesDetails: ServiceDetail[] = [
  { 
    name: 'Websites & Mobile Apps (Legacy)', 
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
    name: 'SEO Strategy (Legacy Web & AI Focus)', 
    description: 'Boost your online visibility and reach your target audience effectively with our data-driven SEO and digital marketing strategies, integrated with web and AI solutions.',
    icon: <Search className="h-12 w-12 mb-4 text-primary" />,
    points: [
      "Technical SEO for Web Performance",
      "AI-driven Content Optimization",
      "Schema Markup & Structured Data",
      "Voice Search Optimization"
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
    icon: <Wrench className="h-12 w-12 mb-4 text-primary" />,
    points: [
      "Custom WordPress Theme Development",
      "Plugin Customization & Development",
      "WooCommerce Integration & E-commerce",
      "Performance & Security Optimization"
    ],
    type: 'web_ai'
  },
  {
    name: 'Financial Reporting & Analysis',
    description: 'Delivering clear insights into your financial performance with comprehensive reports and analysis.',
    icon: <BarChart3 className="h-12 w-12 mb-4 text-primary" />,
    points: [
      "Monthly & quarterly financial reports",
      "Cash flow statements",
      "Budget vs. actual analysis",
      "Profit & loss summaries",
      "Balance sheet preparation"
    ],
    type: 'accounting'
  },
  {
    name: 'Accounts Payable & Receivable',
    description: 'Managing your payables and receivables efficiently to optimize cash flow and financial health.',
    icon: <ReceiptText className="h-12 w-12 mb-4 text-primary" />,
    points: [
      "Vendor invoice processing",
      "Payment scheduling & approvals",
      "Receivables tracking & aging reports",
      "Credit control support",
      "Client & vendor account reconciliation"
    ],
    type: 'accounting'
  },
  {
    name: 'Payroll Processing',
    description: 'Accurate and compliant payroll services to ensure your employees are paid correctly and on time.',
    icon: <Users2 className="h-12 w-12 mb-4 text-primary" />,
    points: [
      "Employee salary calculations",
      "Payslip generation",
      "Statutory deductions (PF, ESI, TDS)",
      "Bonus, leave, and overtime handling",
      "Salary structuring & compliance"
    ],
    type: 'accounting'
  },
  {
    name: 'Tax Preparation & Support',
    description: 'Navigating tax complexities with expert preparation and support for GST, income tax, and TDS.',
    icon: <FileText className="h-12 w-12 mb-4 text-primary" />,
    points: [
      "GST/VAT filings & records",
      "Income tax computation support",
      "TDS return assistance",
      "Advance tax calculation",
      "Liaison with tax professionals"
    ],
    type: 'accounting'
  },
  {
    name: 'Custom Dashboards & Reports',
    description: 'Visualizing your financial data through custom dashboards for real-time insights and KPI tracking.',
    icon: <LayoutDashboard className="h-12 w-12 mb-4 text-primary" />,
    points: [
      "Real-time financial dashboards",
      "KPI and performance tracking",
      "Budget and cost reports",
      "Google Sheets / Excel dashboard setup",
      "Custom MIS reports"
    ],
    type: 'accounting'
  },
  {
    name: 'Compliance & Audit Support',
    description: 'Ensuring your business meets regulatory requirements with thorough compliance and audit support.',
    icon: <ShieldCheck className="h-12 w-12 mb-4 text-primary" />,
    points: [
      "Internal & external audit coordination",
      "Statutory reports & registers",
      "Financial document verification",
      "MCA, ROC, and SEBI compliance",
      "Year-end financial closing support"
    ],
    type: 'accounting'
  },
  {
    name: 'Data Entry & Bookkeeping Services',
    description: 'Your data, perfectly organized. Meticulous data entry and bookkeeping to maintain accurate financial records.',
    icon: <DatabaseZap className="h-12 w-12 mb-4 text-primary" />,
    points: [
      "Daily transaction entry",
      "Voucher creation and classification",
      "Ledger maintenance (sales, purchase, cash, bank)",
      "Bank statement and expense entries",
      "Manual to digital data conversion",
      "Bills and receipts recording"
    ],
    type: 'accounting'
  },
  {
    name: 'Additional Business-Critical Services',
    description: 'A suite of essential services to support various operational aspects of your business finances.',
    icon: <BriefcaseBusiness className="h-12 w-12 mb-4 text-primary" />,
    points: [
        "Petty Cash Management: Cash log maintenance, Expense voucher handling, Daily reconciliation",
        "Banking & Reconciliation: Bank statement reconciliation, Online banking operations, Cheque/NEFT/UPI records",
        "Inventory & Asset Accounting: Inventory tracking, Stock valuation, Asset depreciation reports",
        "Loan, EMI & Investment Monitoring: Loan schedules, Interest accounting, Investment yield tracking",
        "Vendor & Client Master Management: KYC and contact details recording, Contract period tracking, Data validation and standardization"
    ],
    type: 'accounting'
  },
  {
    name: 'EPFO Services for Company Members',
    description: 'Simplified compliance and support for all employees regarding EPF.',
    icon: <ShieldCheck className="h-12 w-12 mb-4 text-primary" />,
    points: [
      "EPF account registration for employees",
      "Monthly ECR preparation & upload",
      "UAN generation & activation",
      "PF withdrawal support (online & offline)",
      "KYC update & linking services",
      "Employee transfer & exit formalities",
      "Liaison with EPFO officers for issue resolution"
    ],
    type: 'accounting'
  },
  {
    name: 'Payroll & HR Services',
    description: 'Comprehensive payroll processing and HR-related statutory compliance.',
    icon: <FileText className="h-12 w-12 mb-4 text-primary" />,
    points: [
      "Employee payroll processing",
      "Salary structure management",
      "Payslip & Form 16 generation",
      "Statutory deductions (PF, ESI, TDS)",
      "Attendance, leave & bonus tracking"
    ],
    type: 'accounting'
  },
  {
    name: 'AI Chatbots & Agents (MCP)',
    description: 'Automate conversations and workflows with intelligence.',
    icon: <Bot className="h-12 w-12 mb-4 text-primary" />,
    points: [
      "AI-powered website/live chat bots",
      "WhatsApp & Messenger bots",
      "AI customer support agents",
      "MCP-based business assistants",
      "CRM and lead generation bots"
    ],
    type: 'web_ai'
  },
  {
    name: 'Cybersecurity Solutions',
    description: 'Protect what matters — your data, users, and operations.',
    icon: <ShieldCheck className="h-12 w-12 mb-4 text-primary" />,
    points: [
      "Website & server security",
      "Penetration testing",
      "Network & endpoint security",
      "Data breach prevention",
      "Compliance (GDPR, ISO) advisory"
    ],
    type: 'web_ai'
  },
  {
    name: 'Database Management',
    description: 'Reliable storage, faster access, cleaner control.',
    icon: <Database className="h-12 w-12 mb-4 text-primary" />,
    points: [
      "SQL/NoSQL database setup",
      "Backup & disaster recovery",
      "Performance optimization",
      "Cloud-based database solutions",
      "Data migration services"
    ],
    type: 'web_ai'
  },
  {
    name: 'Logo & Branding Design',
    description: 'Make your identity unforgettable.',
    icon: <Palette className="h-12 w-12 mb-4 text-primary" />,
    points: [
      "Logo creation",
      "Business card & stationery design",
      "Brand color palette & typography",
      "Rebranding and redesign services"
    ],
    type: 'web_ai'
  },
  {
    name: 'Graphic Designing',
    description: 'Visuals that communicate, captivate, and convert.',
    icon: <ImageIcon className="h-12 w-12 mb-4 text-primary" />,
    points: [
      "Social media creatives",
      "Brochure & flyer design",
      "Infographics",
      "Poster/banner design",
      "UI mockups & wireframes"
    ],
    type: 'web_ai'
  },
  {
    name: 'Digital Card & Invitation Design',
    description: 'Creative, clickable, and completely customizable.',
    icon: <MailOpen className="h-12 w-12 mb-4 text-primary" />,
    points: [
      "Digital wedding cards",
      "Business invitations",
      "E-invites for events",
      "QR code integration",
      "Animated invitation cards"
    ],
    type: 'web_ai'
  },
  {
    name: 'E-Commerce Development',
    description: 'Comprehensive e-commerce solutions to sell online effectively.',
    icon: <ShoppingCart className="h-12 w-12 mb-4 text-primary" />,
    points: [
      "Multi-vendor marketplace setup",
      "Payment gateway integration",
      "Order & inventory management",
      "Customer account systems"
    ],
    type: 'web_ai'
  },
  {
    name: 'Business Intelligence (BI) Tools',
    description: 'Turn data into actionable insights with custom BI tools.',
    icon: <BarChartBig className="h-12 w-12 mb-4 text-primary" />,
    points: [
      "Custom dashboard creation",
      "Data analytics & visualization",
      "Power BI / Tableau integration",
      "Business forecasting models"
    ],
    type: 'web_ai'
  },
  {
    name: 'Machine Learning & AI Solutions',
    description: 'Leverage AI and ML to solve complex business challenges.',
    icon: <BrainCircuit className="h-12 w-12 mb-4 text-primary" />,
    points: [
      "Predictive analytics",
      "Image/text recognition models",
      "Recommendation systems",
      "Natural Language Processing (NLP) apps"
    ],
    type: 'web_ai'
  },
  {
    name: 'Pay-Per-Click (PPC) Advertising',
    description: 'Drive targeted traffic and instant conversions with strategic ad campaigns.',
    icon: <MousePointerClick className="h-12 w-12 mb-4 text-primary" />,
    points: [
      "Google Ads (Search, Display, Shopping)",
      "Bing Ads",
      "Remarketing & Retargeting",
      "A/B Testing for Ad Copies",
      "Conversion Tracking"
    ],
    type: 'digital_marketing'
  },
  {
    name: 'Social Media Marketing (SMM)',
    description: 'Engage your audience and boost brand presence across popular social platforms.',
    icon: <Share2 className="h-12 w-12 mb-4 text-primary" />,
    points: [
      "Facebook, Instagram, LinkedIn, X (Twitter), Pinterest",
      "Content strategy, design & publishing",
      "Paid ad campaigns & targeting",
      "Influencer collaborations",
      "Performance tracking & reporting"
    ],
    type: 'digital_marketing'
  },
  {
    name: 'Content Marketing',
    description: 'Attract, inform, and convert your target audience through high-value, engaging content.',
    icon: <PenTool className="h-12 w-12 mb-4 text-primary" />,
    points: [
      "SEO blog writing & web content",
      "Infographics, eBooks, case studies",
      "Video scripts & content strategy",
      "Email newsletters",
      "Content calendar management"
    ],
    type: 'digital_marketing'
  },
  {
    name: 'Email Marketing & Automation',
    description: 'Build and nurture customer relationships with personalized and automated email flows.',
    icon: <MailIcon className="h-12 w-12 mb-4 text-primary" />,
    points: [
      "Lead list segmentation",
      "Drip campaigns & auto-responders",
      "Newsletters & promotional emails",
      "A/B testing & performance analytics",
      "Tools: Mailchimp, HubSpot, Zoho, etc."
    ],
    type: 'digital_marketing'
  },
  {
    name: 'Conversion Rate Optimization (CRO)',
    description: 'Maximize your return on investment by optimizing your existing website traffic for conversions.',
    icon: <TrendingUp className="h-12 w-12 mb-4 text-primary" />,
    points: [
      "Landing page design & testing",
      "Heatmaps & behavior tracking",
      "Funnel analysis",
      "CTA design & testing",
      "Form/user journey optimization"
    ],
    type: 'digital_marketing'
  },
  {
    name: 'Online Reputation Management (ORM)',
    description: 'Protect and enhance your brand’s online image through proactive monitoring and strategic responses.',
    icon: <Star className="h-12 w-12 mb-4 text-primary" />,
    points: [
      "Review generation & response strategy",
      "Negative content removal/suppression",
      "Sentiment monitoring & alerts",
      "Online PR outreach"
    ],
    type: 'digital_marketing'
  },
  {
    name: 'Influencer Marketing',
    description: 'Boost your reach and credibility by collaborating with authentic voices in your niche.',
    icon: <Megaphone className="h-12 w-12 mb-4 text-primary" />,
    points: [
      "Influencer research & vetting",
      "Campaign strategy & execution",
      "Co-branded content creation",
      "ROI & engagement analytics"
    ],
    type: 'digital_marketing'
  },
  {
    name: 'Affiliate Marketing',
    description: 'Grow sales and expand your market reach through performance-based partnerships.',
    icon: <LinkIcon className="h-12 w-12 mb-4 text-primary" />,
    points: [
      "Affiliate program setup",
      "Partner onboarding & communication",
      "Commission structure planning",
      "Link tracking & reporting"
    ],
    type: 'digital_marketing'
  },
  {
    name: 'Analytics & Reporting (Digital Marketing)',
    description: 'Make data-driven marketing decisions with clear, actionable insights and comprehensive reporting.',
    icon: <BarChartBig className="h-12 w-12 mb-4 text-primary" />,
    points: [
      "Google Analytics (GA4) setup",
      "Tag Manager implementation",
      "Monthly dashboards & KPIs",
      "ROI-focused reporting"
    ],
    type: 'digital_marketing'
  },
  {
    name: 'Video Marketing',
    description: 'Engage your audience with compelling visual content that drives clicks and conversions.',
    icon: <Clapperboard className="h-12 w-12 mb-4 text-primary" />,
    points: [
      "Brand & promo videos",
      "Product demos & tutorials",
      "Reels, Shorts, TikTok content",
      "YouTube channel setup & optimization",
      "Video SEO & keyword targeting"
    ],
    type: 'digital_marketing'
  },
  {
    name: 'Search Engine Optimization (SEO)',
    description: 'Increase visibility and drive long-term traffic through strategic SEO.',
    icon: <SearchCode className="h-12 w-12 mb-4 text-primary" />,
    points: [
      "Keyword research & competitor analysis",
      "On-page SEO (titles, meta, URLs)",
      "Technical SEO (speed, mobile, indexing)",
      "Off-page SEO (backlinks, citations)",
      "Local SEO for maps & listings"
    ],
    type: 'digital_marketing' 
  },
  {
    name: 'Marketplace Optimization',
    description: 'Grow your visibility and sales on major e-commerce platforms like Amazon & Flipkart.',
    icon: <Store className="h-12 w-12 mb-4 text-primary" />,
    points: [
      "Product listing optimization",
      "Marketplace SEO & paid ads",
      "Reviews & ratings management",
      "Inventory and pricing sync"
    ],
    type: 'digital_marketing'
  },
  {
    name: 'WhatsApp Business Services',
    description: 'Leverage WhatsApp for enhanced customer communication, engagement, and automation. Our services cover profile setup, automated messaging, campaign management, and API integration to streamline your business operations on this popular platform.',
    icon: <MessageSquareText className="h-12 w-12 mb-4 text-primary" />,
    points: [
      "WhatsApp Business Profile Setup (Verified Account, Info, Catalog)",
      "Auto-Reply & Greeting Message System (Welcome, FAQ, Away)",
      "Broadcast & Campaign Management (Segmentation, Scheduling, Templates)",
      "Work Scheduling & Task Automation (Booking, Reminders, Calendar Sync)",
      "WhatsApp API Integration (CRM, Website, ERP, Chatbots)",
      "Analytics & Reporting (Delivery/Open Rates, Interactions, Campaign Performance)",
      "Multi-Agent Chat System (Team Inbox, Assignments, Internal Notes)",
      "Ideal For: E-commerce, Event Planners, Travel, Real Estate, Service Companies",
      "Add-On Services: Custom Chatbot Development, Facebook/Instagram Integration, QR Codes, Payment Links"
    ],
    type: 'digital_marketing'
  }
];

type FilterType = 'all' | 'accounting' | 'web_ai' | 'digital_marketing';

// Fisher-Yates shuffle algorithm
const shuffleArray = <T extends any[]>(array: T): T => {
  const newArray = [...array] as T;
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

interface ServicesPageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function ServicesPage({ searchParams }: ServicesPageProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [displayedServices, setDisplayedServices] = useState<ServiceDetail[]>([]);

  useEffect(() => {
    let servicesToDisplay = servicesDetails;
    if (activeFilter !== 'all') {
      servicesToDisplay = servicesDetails.filter(service => service.type === activeFilter);
    }
    setDisplayedServices(shuffleArray(servicesToDisplay));
  }, [activeFilter]);


  const renderServicePoint = (point: string, serviceName: string, pointIndex: number) => {
    if (serviceName === 'Additional Business-Critical Services' && point.includes(':')) {
      const [subService, detailsString] = point.split(/:(.*)/s);
      const detailItems = detailsString ? detailsString.split(',').map(d => d.trim()) : [];
      return (
        <li key={`${serviceName}-point-${pointIndex}`} className="flex items-start">
          <CheckCircle className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
          <div>
            <span className="font-medium text-foreground">{subService.trim()}:</span>
            {detailItems.length > 0 && (
              <ul className="list-disc list-inside pl-5 text-sm text-muted-foreground">
                {detailItems.map((item, i) => <li key={`${serviceName}-detail-${pointIndex}-${i}`}>{item}</li>)}
              </ul>
            )}
          </div>
        </li>
      );
    }
    if (serviceName === 'WhatsApp Business Services' && (point.startsWith("Ideal For:") || point.startsWith("Add-On Services:"))) {
      const [titlePart, itemsPart] = point.split(/:(.*)/s);
      const items = itemsPart ? itemsPart.split(',').map(item => item.trim()) : [];
      return (
        <li key={`${serviceName}-point-${pointIndex}`} className="flex items-start">
          <CheckCircle className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
          <div>
            <span className="font-medium text-foreground">{titlePart.trim()}:</span>
            {items.length > 0 && (
                 <ul className="list-disc list-inside pl-5 text-sm text-muted-foreground">
                    {items.map((item, i) => <li key={`${serviceName}-${titlePart}-detail-${i}`}>{item}</li>)}
                 </ul>
            )}
          </div>
        </li>
      );
    }
    return (
      <li key={`${serviceName}-point-${pointIndex}`} className="flex items-start">
        <CheckCircle className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
        <span>{point}</span>
      </li>
    );
  };

  return (
    <div className="bg-background text-foreground">
      <header className="py-16 md:py-24 text-center bg-secondary border-b border-border">
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
           <div className="bg-card rounded-xl shadow-xl p-8 md:p-12 border border-border">
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
                <Button 
                  onClick={() => setActiveFilter('digital_marketing')} 
                  variant={activeFilter === 'digital_marketing' ? 'default' : 'outline'}
                  className="rounded-full text-base h-12 px-10"
                >
                  <Volume2 className="mr-2 h-5 w-5" />
                  Digital Marketing
                </Button>
              </div>

            {displayedServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8">
                {displayedServices.map((service) => (
                  <Card key={service.name} className="flex flex-col md:flex-row overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1" data-interactive-cursor="true">
                    <div className="md:w-1/4 p-6 flex flex-col items-center justify-center bg-secondary/50 dark:bg-secondary/30 md:border-r border-border">
                      {service.icon}
                      <CardTitle className="text-xl font-semibold text-center mt-2">{service.name}</CardTitle>
                    </div>
                    <div className="md:w-3/4 p-6">
                      <CardContent className="pt-0">
                        <p className="text-muted-foreground mb-6">{service.description}</p>
                        <ul className="space-y-3">
                          {service.points.map((point, index) => renderServicePoint(point, service.name, index))}
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
