
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

export const metadata: Metadata = {
  title: {
    default: 'CodeAndCount – Web Development, AI Solutions & Accounting Services',
    template: '%s | CodeAndCount.com',
  },
  description: 'CodeAndCount.com: Premier agency in Gurugram, India for custom web development, AI solutions, digital marketing, and expert accounting services to elevate your business.',
  keywords: [
    'Web Development Gurugram',
    'AI Solutions India',
    'Accounting Services Gurugram',
    'Digital Marketing Agency',
    'Mobile App Development',
    'Next.js Development',
    'Craft CMS',
    'WordPress Development',
    'SEO Services India',
    'UI/UX Design',
    'Gurugram',
    'India',
    'Fintech Solutions',
    'SaaS Development'
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
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(inter.variable)} suppressHydrationWarning>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

    