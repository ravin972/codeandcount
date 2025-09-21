
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../../styles/globals.css';
import { cn } from '@/lib/utils';
import ClientLayout from './client-layout';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// SVG Favicon with "C2" text on a green background
const faviconSvg = `
<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" rx="20" fill="hsl(145, 65%, 45%)"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="50" dy=".3em" font-weight="bold" fill="white" text-anchor="middle">C2</text>
</svg>
`;
const faviconDataUrl = `data:image/svg+xml;base64,${btoa(faviconSvg)}`;


export const metadata: Metadata = {
  title: {
    default: 'CodeAndCount – Web Development, AI Solutions & Accounting Services',
    template: '%s | CodeAndCount.com',
  },
  description: 'CodeAndCount.com: Premier agency in Gurugram, India for custom web development, AI solutions, digital marketing, and expert accounting services to elevate your business.',
  keywords: [
    'CodeAndCount.com',
    'Custom Web Development Gurugram',
    'AI Solutions India',
    'Expert Accounting Services Gurugram',
    'Digital Marketing Agency India',
    'Mobile App Development Company',
    'Next.js and React Development',
    'Craft CMS and WordPress Experts',
    'SEO and SEM Services India',
    'UI/UX Design and Branding',
    'E-commerce Website Development',
    'SaaS Application Development',
    'Fintech Solutions Provider',
    'Bookkeeping and Payroll Services',
    'GST and Tax Compliance Gurugram',
    'AI Chatbot Development',
    'Online Games Development',
    'Ravin Pandey',
    'Gurugram Web Design',
    'Best accounting firm in Gurugram'
  ],
  authors: [{ name: 'CodeAndCount.com Team', url: 'https://codeandcount.com' }],
  creator: 'CodeAndCount.com',
  publisher: 'CodeAndCount.com',
  openGraph: {
    title: 'CodeAndCount | Web Development, AI, & Accounting in Gurugram',
    description: 'Partner with CodeAndCount for cutting-edge web development, AI-powered tools, and comprehensive financial management from Gurugram, India.',
    url: 'https://codeandcount.com', 
    siteName: 'CodeAndCount.com',
    images: [
      {
        url: 'https://placehold.co/1200x630/2563eb/ffffff.png?text=CodeAndCount',
        width: 1200,
        height: 630,
        alt: 'CodeAndCount.com - Web, AI, & Accounting Solutions',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CodeAndCount | Top-Tier Web, AI, & Accounting Services in India',
    description: 'From stunning websites and intelligent AI to precise accounting, CodeAndCount provides the digital and financial expertise your business needs to succeed.',
    creator: '@codeandcount',
    images: ['https://placehold.co/1200x600/2563eb/ffffff.png?text=CodeAndCount'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' },
  ],
  icons: {
    icon: faviconDataUrl,
    shortcut: faviconDataUrl,
    apple: faviconDataUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(inter.variable)} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
    
