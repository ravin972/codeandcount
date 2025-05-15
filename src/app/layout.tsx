
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import { ThemeProvider } from "@/components/ThemeProvider";

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
    default: 'CodeAndCount.com - Web & App Development',
    template: '%s | CodeAndCount.com',
  },
  description: 'CodeAndCount.com is a modern web and app development agency, creating powerful digital solutions.',
  openGraph: {
    title: 'CodeAndCount.com - Web & App Development',
    description: 'Modern web and app development solutions.',
    type: 'website',
    locale: 'en_US',
    url: 'https://codeandcount.com.example', // Replace with actual URL
    siteName: 'CodeAndCount.com',
    images: [
      {
        url: 'https://placehold.co/1200x630.png?text=CodeAndCount', // Replace with actual OG image
        width: 1200,
        height: 630,
        alt: 'CodeAndCount.com',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CodeAndCount.com - Web & App Development',
    description: 'Modern web and app development solutions.',
    // site: '@codeandcount', // Replace with actual Twitter handle
    // creator: '@creatorhandle', // Replace with actual creator handle
    images: ['https://placehold.co/1200x630.png?text=CodeAndCount'], // Replace
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
    <html lang="en" className={cn(geistSans.variable, geistMono.variable)} suppressHydrationWarning>
      <body className="antialiased flex flex-col min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
