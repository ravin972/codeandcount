
"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Flame } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

// Dynamically import components that are not critical for the initial render
const CustomCursor = dynamic(() => import('@/components/effects/CustomCursor'), { ssr: false });
const FloatingWhatsAppButton = dynamic(() => import('@/components/common/FloatingWhatsAppButton'), { ssr: false });
const FloatingGameZoneButton = dynamic(() => import('@/components/common/FloatingGameZoneButton'), { ssr: false });
const BackToTopButton = dynamic(() => import('@/components/layout/BackToTopButton').then(mod => mod.BackToTopButton), { ssr: false });
const DiwaliOffer = dynamic(() => import('@/components/common/DiwaliOffer'), {
  ssr: false,
  loading: () => <Skeleton className="fixed bottom-8 left-8 h-16 w-16 rounded-full" />
});


const FloatingDiya = ({ side }: { side: 'left' | 'right' }) => (
  <div className={cn(
    "fixed bottom-1/4 z-40 h-12 w-12 text-white/80 drop-shadow-[0_0_8px_rgba(255,193,7,0.7)] pointer-events-none",
    "animate-float",
    side === 'left' ? 'left-4' : 'right-4',
    side === 'right' && 'animation-delay-[-2s]'
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
        <FloatingGameZoneButton />
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
