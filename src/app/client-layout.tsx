
"use client";

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ui/theme-provider";
import CustomCursor from '@/components/effects/CustomCursor';
import FloatingWhatsAppButton from '@/components/common/FloatingWhatsAppButton';
import { BackToTopButton } from '@/components/layout/BackToTopButton';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import DiwaliOffer from '@/components/common/DiwaliOffer';
import { Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

const FloatingDiya = ({ side }: { side: 'left' | 'right' }) => (
  <div className={cn(
    "fixed bottom-1/4 z-40 h-12 w-12 text-white/80 drop-shadow-[0_0_8px_rgba(255,193,7,0.7)] pointer-events-none",
    "animate-float",
    side === 'left' ? 'left-4' : 'right-4',
    side === 'right' && 'animation-delay-2s'
  )}>
    <Flame className="h-full w-full text-amber-400" />
  </div>
);


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
        <FloatingWhatsAppButton />
        <BackToTopButton />
        <Analytics />
        <SpeedInsights />
        <DiwaliOffer />
        <FloatingDiya side="left" />
        <FloatingDiya side="right" />
      </div>
    </ThemeProvider>
  );
}
