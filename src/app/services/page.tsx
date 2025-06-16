
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  CheckCircle, Palette, Laptop, Search, Puzzle, ShoppingCart, Calculator, Wrench, 
  GalleryThumbnails, Brain, BarChart3, ReceiptText, Users2, FileText, LayoutDashboard, 
  ShieldCheck, DatabaseZap, BriefcaseBusiness 
} from "lucide-react";
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ServiceDetail {
  name: string;
  description: string;
  icon: JSX.Element;
  points: string[];
  type: 'web_ai' | 'accounting';
}


const servicesDetails: ServiceDetail[] = [
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
    name: '📄 Financial Reporting & Analysis',
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
    name: '💰 Accounts Payable & Receivable',
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
    name: '👨‍💼 Payroll Processing',
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
    name: '🧾 Tax Preparation & Support',
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
    name: '📈 Custom Dashboards & Reports',
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
    name: '📚 Compliance & Audit Support',
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
    name: '✍️ Data Entry & Bookkeeping Services',
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
    name: '🧩 Additional Business-Critical Services',
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
  }
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
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8"> {/* Changed to 1 column for better readability of detailed cards */}
                {filteredServices.map((service) => (
                  <Card key={service.name} className="flex flex-col md:flex-row overflow-hidden transition-transform hover:scale-[1.01] duration-300" data-interactive-cursor="true">
                    <div className="md:w-1/4 p-6 flex flex-col items-center justify-center bg-secondary/30 md:border-r border-card-foreground/10">
                      {service.icon}
                      <CardTitle className="text-xl font-semibold text-center mt-2">{service.name}</CardTitle>
                    </div>
                    <div className="md:w-3/4 p-6">
                      <CardContent className="pt-0">
                        <p className="text-muted-foreground mb-6">{service.description}</p>
                        <ul className="space-y-3">
                          {service.points.map((point, index) => {
                            if (service.name === '🧩 Additional Business-Critical Services' && point.includes(':')) {
                              const [subService, details] = point.split(/:(.*)/s);
                              const detailItems = details.split(',').map(d => d.trim());
                              return (
                                <li key={`${service.name}-point-${index}`} className="flex items-start">
                                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
                                  <div>
                                    <span className="font-medium text-foreground">{subService.replace('🔹 ', '')}:</span>
                                    <ul className="list-disc list-inside pl-5 text-sm text-muted-foreground">
                                      {detailItems.map((item, i) => <li key={i}>{item}</li>)}
                                    </ul>
                                  </div>
                                </li>
                              );
                            }
                            return (
                              <li key={`${service.name}-point-${index}`} className="flex items-start">
                                <CheckCircle className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
                                <span>{point}</span>
                              </li>
                            );
                          })}
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


    