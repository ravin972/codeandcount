
"use client";

import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Flame, Sparkles, Copy, Gift, UserPlus, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';

export default function DiwaliOffer() {
  const [isOpen, setIsOpen] = useState(false);
  const diyaRef = useRef<HTMLButtonElement>(null);
  const { toast } = useToast();
  const REFERRAL_CODE = "DIWALI2025";
  const whatsappNumber = "919729041423"; // Your WhatsApp number
  const whatsappMessage = `Hello! I'm claiming my Diwali referral reward. My referral code is ${REFERRAL_CODE}.`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;


  useEffect(() => {
    if (diyaRef.current) {
      gsap.to(diyaRef.current, {
        y: -10,
        duration: 2,
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <button
        ref={diyaRef}
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-8 left-8 z-40 h-16 w-16 rounded-full shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/80",
          "bg-gradient-to-tr from-amber-400 via-orange-500 to-red-500 text-white flex items-center justify-center"
        )}
        aria-label="Happy Diwali Offer"
        data-interactive-cursor="true"
      >
        <Flame className="h-8 w-8 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
      </button>

      <DialogContent className="sm:max-w-md bg-secondary border-primary/20">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl">
            <Sparkles className="h-6 w-6 mr-2 text-primary" />
            A Prosperous Diwali 2025!
          </DialogTitle>
          <DialogDescription>
            Celebrate with our special Referral Reward program.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-6 text-center space-y-6">
            <div className="flex items-center justify-center space-x-2">
                <Gift className="h-8 w-8 text-primary" />
                <p className="text-2xl font-bold">Get 25% OFF Your Next Project!</p>
            </div>
            
            <div className='text-left space-y-4 text-sm'>
              <p><strong className='text-foreground'>How it works:</strong></p>
              <p className='flex items-start'><UserPlus className='h-4 w-4 mr-2 mt-1 text-primary flex-shrink-0' /> Refer a new client to us. When they book a project by filling our contact form and scheduling a meeting, you get rewarded!</p>
              <p className='flex items-start'><Send className='h-4 w-4 mr-2 mt-1 text-primary flex-shrink-0' /> To claim your reward, just send us a screenshot of their confirmation on WhatsApp with your referral code.</p>
            </div>

            <div 
              className="mt-4 flex items-center justify-between rounded-lg border-2 border-dashed border-primary/50 bg-background p-3"
            >
              <p className="text-lg font-mono font-semibold tracking-widest text-primary">
                {REFERRAL_CODE}
              </p>
              <Button variant="ghost" size="sm" onClick={handleCopyCode}>
                <Copy className="h-4 w-4 mr-2" />
                Copy Code
              </Button>
            </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:justify-center">
          <Button asChild type="button" variant="default">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Send className="h-4 w-4 mr-2" /> Claim on WhatsApp
            </a>
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
