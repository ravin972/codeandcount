
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MessageSquareText } from 'lucide-react'; // Using MessageSquareText for a slightly different look
import { cn } from '@/lib/utils';

export default function FloatingWhatsAppButton() {
  const whatsappNumber = "919729041423"; // Your WhatsApp number
  const defaultMessage = "Hello, I'd like to inquire about...";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <Button
      asChild
      className={cn(
        "fixed bottom-6 right-6 z-40 h-14 w-auto min-w-[60px] p-4 rounded-full shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105",
        "bg-[#25D366] hover:bg-[#1DAE51] text-white focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366]/80"
      )}
      aria-label="Chat on WhatsApp"
      data-interactive-cursor="true"
    >
      <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
        <MessageSquareText className="h-6 w-6" />
        <span className="ml-2 hidden sm:inline">Chat on WhatsApp</span>
      </Link>
    </Button>
  );
}
