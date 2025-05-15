import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Apex Agency - Web Design & Branding',
    template: '%s | Apex Agency',
  },
  description: 'Apex Agency is a sophisticated web design and branding agency specializing in Craft CMS, Shopify, and SEO.',
  openGraph: {
    title: 'Apex Agency - Web Design & Branding',
    description: 'Sophisticated web design and branding solutions.',
    type: 'website',
    locale: 'en_US',
    url: 'https://apexagency.example.com', // Replace with actual URL
    siteName: 'Apex Agency',
    images: [
      {
        url: 'https://placehold.co/1200x630.png?text=Apex+Agency', // Replace with actual OG image
        width: 1200,
        height: 630,
        alt: 'Apex Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apex Agency - Web Design & Branding',
    description: 'Sophisticated web design and branding solutions.',
    // site: '@apexagency', // Replace with actual Twitter handle
    // creator: '@creatorhandle', // Replace with actual creator handle
    images: ['https://placehold.co/1200x630.png?text=Apex+Agency'], // Replace
  },
  // PWA related meta tags (basic)
  manifest: '/manifest.json', // Create this file later if full PWA is needed
  themeColor: '#008080', // Teal accent
  // Add more meta tags as needed: icons, apple-touch-icon etc.
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(geistSans.variable, geistMono.variable)}>
      <body className="antialiased flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
