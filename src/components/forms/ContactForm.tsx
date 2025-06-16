
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Loader2 } from "lucide-react";
import React from "react";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  company: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(1000, { message: "Message must not exceed 1000 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

// This is a mock server action. In a real app, this would send an email or save to a database.
async function submitContactForm(data: ContactFormValues): Promise<{ success: boolean; message: string }> {
  console.log("Form data submitted:", data);
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Simulate potential error
  // if (Math.random() > 0.7) {
  //   return { success: false, message: "An unexpected error occurred. Please try again." };
  // }

  return { success: true, message: "Your message has been sent successfully! We'll be in touch soon." };
}


export function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setIsSubmitting(true);
    try {
      const result = await submitContactForm(values);
      if (result.success) {
        toast({
          title: "Success!",
          description: result.message,
        });
        form.reset();
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Shankritya Pandey" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Your Company Inc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your project, goals, or any questions you have..."
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Please provide as much detail as possible.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send Message <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
      jsx
      <a
        href="https://wa.me/919729041423?text=Hello%2C%20I%27d%20like%20to%20inquire%20about..." // Replace with your WhatsApp number and URL-encoded message
        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-green-500 text-white hover:bg-green-600 h-10 py-2 px-4"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.04-1.865-1.609-4.032-1.609-6.253 0-6.514 5.286-11.799 11.801-11.799 3.122 0 6.044 1.24 8.246 3.441 2.201 2.201 3.44 5.122 3.44 8.242 0 6.517-5.287 11.801-11.801 11.801-.947 0-1.88-.13-2.75-.39l-6.55 1.688zm6.597-3.807c.42-.16 2.653-1.053 3.043-1.518.39-.465.673-.957.763-1.157.09-.2.056-.373-.124-.533-.18-.16-.403-.483-.64-.773-.237-.29-.51-.69-.726-.756-.214-.066-.4-.003-.553.147-.153.15-.353.483-.523.673-.17.19-.34.203-.63.073-.29-.13-.983-.363-1.87-.943-.756-.49-1.25-1.12-1.39-1.363-.14-.243-.01-.373.127-.503.11-.11.243-.29.363-.433.12-.14.163-.233.23-.383.07-.15.036-.283-.018-.383-.05-.1-.403-.973-.556-1.323-.153-.35-.31-.29-.403-.24-.09.05-.2.04-.3.04-.1 0-.233.01-.373.01-.14 0-.4.05-.613.24-.21.19-.803.783-.803 1.913 0 1.13.823 2.223.943 2.383.12.16.23.263.443.563 1.063 1.453 2.413 2.043 3.163 2.39.21.1.4.06.553-.09z" />
        </svg>
        Chat on WhatsApp
      </a>
    </Form>
  );
}
