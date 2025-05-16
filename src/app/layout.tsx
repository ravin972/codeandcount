
import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Changed from Geist, Geist_Mono
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import { ThemeProvider } from "@/components/ThemeProvider";
import { BackToTopButton } from '@/components/layout/BackToTopButton';

// Initialize Inter font
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', // Define a CSS variable for Inter
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
  manifest: '/manifest.json',
  themeColor: '#D1FE71',
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
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Toaster />
          {/* BackToTopButton is rendered here if it's meant to be fixed to the viewport globally */}
          {/* If it's part of the footer layout, it should be inside Footer.tsx */}
          {/* From previous steps, it seems it was moved into Footer.tsx, so it might not be needed here. */}
          {/* For now, I'm keeping it based on the provided file context, assuming it's fixed globally. */}
          {/* If it's truly inside the footer, this line can be removed. */}
          {/* <BackToTopButton /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
