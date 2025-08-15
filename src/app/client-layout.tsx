
"use client";

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ui/theme-provider";
import CustomCursor from '@/components/effects/CustomCursor';
import { BackToTopButton } from '@/components/layout/BackToTopButton';

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <div className="antialiased flex flex-col min-h-screen">
        <CustomCursor />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Toaster />
        {/* FloatingWhatsAppButton is now managed inside the footer to avoid overlap issues */}
      </div>
    </ThemeProvider>
  );
}
