
"use client";

import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Flame, Sparkles, Copy, Gift } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';

export default function DiwaliOffer() {
  const [isOpen, setIsOpen] = useState(false);
  const diyaRef = useRef<HTMLButtonElement>(null);
  const { toast } = useToast();
  const DISCOUNT_CODE = "DIWALI25";

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
    navigator.clipboard.writeText(DISCOUNT_CODE);
    toast({
      title: "Copied!",
      description: `Discount code "${DISCOUNT_CODE}" copied to clipboard.`,
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
            Happy Diwali from CodeAndCount!
          </DialogTitle>
          <DialogDescription>
            To celebrate the festival of lights, here's a special offer just for you.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-6 text-center">
            <p className="text-muted-foreground mb-2">Enjoy a festive discount on all our services!</p>
            <div className="flex items-center justify-center space-x-2 my-4">
                <Gift className="h-5 w-5 text-primary" />
                <p className="text-lg font-bold">Get 25% OFF</p>
            </div>
            <div 
              className="mt-4 flex items-center justify-between rounded-lg border-2 border-dashed border-primary/50 bg-background p-3"
            >
              <p className="text-lg font-mono font-semibold tracking-widest text-primary">
                {DISCOUNT_CODE}
              </p>
              <Button variant="ghost" size="sm" onClick={handleCopyCode}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
        </div>

        <DialogFooter className="sm:justify-center">
          <DialogClose asChild>
            <Button type="button" variant="default">
              Continue Shopping
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
