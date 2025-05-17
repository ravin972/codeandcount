
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import { ThemeProvider } from "@/components/ThemeProvider";
import CustomCursor from '@/components/effects/CustomCursor';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
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
    url: 'https://codeandcount.com.example',
    siteName: 'CodeAndCount.com',
    images: [
      {
        url: 'https://placehold.co/1200x630.png', // Removed text parameter
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
    images: ['https://placehold.co/1200x630.png'], // Removed text parameter
  },
  manifest: '/manifest.json',
  themeColor: '#b2ff03', 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(inter.variable)} suppressHydrationWarning>
      <body className="antialiased flex flex-col min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <CustomCursor />
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
