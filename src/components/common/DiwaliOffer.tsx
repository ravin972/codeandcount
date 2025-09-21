
"use client";

import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Flame, Sparkles, Copy, Gift, UserPlus, Send, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';

export default function DiwaliOffer() {
  const [isOpen, setIsOpen] = useState(false);
  const diyaRef = useRef<HTMLButtonElement>(null);
  const { toast } = useToast();
  const REFERRAL_CODE = "DIWALI2025";
  const whatsappNumber = "919729041423";
  const whatsappMessage = `Hello! I'm claiming my Diwali referral reward. My referral code is ${REFERRAL_CODE}.`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  useEffect(() => {
    // Floating animation for the Diya button
    if (diyaRef.current) {
      gsap.to(diyaRef.current, {
        y: -10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(REFERRAL_CODE);
    toast({
      title: "Copied!",
      description: `Referral code "${REFERRAL_CODE}" copied to clipboard.`,
    });
  };

  return (
    <>
      <button
        ref={diyaRef}
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-8 left-8 z-50 h-16 w-16 rounded-full shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/80",
          "bg-gradient-to-tr from-amber-400 via-orange-500 to-red-500 text-white flex items-center justify-center"
        )}
        aria-label="Happy Diwali Offer"
        data-interactive-cursor="true"
      >
        <Gift className="h-8 w-8 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md bg-secondary border-primary/20">
          <DialogHeader>
            <DialogTitle className="flex items-center text-2xl font-bold">
              <Sparkles className="h-6 w-6 mr-2 text-amber-500" />
              A Prosperous Diwali 2025!
            </DialogTitle>
            <DialogDescription>
              Celebrate with our special Referral Rewards program.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 text-center space-y-6">
              <div className="flex items-center justify-center space-x-3">
                  <Gift className="h-10 w-10 text-primary" />
                  <p className="text-3xl font-bold text-foreground">Get 25% OFF Your Next Project!</p>
              </div>
              
              <div className='text-left space-y-4 text-sm text-muted-foreground p-4 bg-background/50 rounded-lg border border-border'>
                <p className='font-semibold text-foreground'>How It Works:</p>
                <p className='flex items-start'><UserPlus className='h-5 w-5 mr-2 mt-0.5 text-primary flex-shrink-0' /> <span className='font-medium text-foreground'>Refer a new client.</span> When they fill out our contact form and schedule a meeting, you get rewarded.</p>
                <p className='flex items-start'><MessageSquare className='h-5 w-5 mr-2 mt-0.5 text-primary flex-shrink-0' /> <span className='font-medium text-foreground'>Claim your reward.</span> Send us a screenshot of their meeting confirmation on WhatsApp with your referral code below.</p>
              </div>

              <div 
                className="mt-2 flex items-center justify-between rounded-lg border-2 border-dashed border-primary/50 bg-background p-3"
              >
                <p className="text-lg font-mono font-semibold tracking-widest text-primary">
                  {REFERRAL_CODE}
                </p>
                <Button variant="outline" size="sm" onClick={handleCopyCode}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:justify-center pt-4">
            <Button asChild type="button" variant="default" size="lg">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Send className="h-4 w-4 mr-2" /> Claim on WhatsApp
              </a>
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="outline" size="lg">
                Close
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
