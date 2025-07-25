
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Loader2, MessageSquare } from "lucide-react";
import React from "react";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  company: z.string().optional(),
  queryType: z.string().min(1, { message: "Please select a query type." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(1000, { message: "Message must not exceed 1000 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const queryTypes = [
  "General Inquiry",
  "Project Proposal",
  "Service Question",
  "Technical Support",
  "Partnership Opportunity",
  "Feedback",
  "Careers",
  "Other",
];

export function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      queryType: "",
      message: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setIsSubmitting(true);
    try {
      const recipients = "pandeyravinder078@gmail.com,hello@codeandcount.com";
      const subject = encodeURIComponent(
        `${values.queryType} - Contact from ${values.name}`
      );
      const bodyLines = [
        `Name: ${values.name}`,
        `Email: ${values.email}`,
        `Company: ${values.company || 'N/A'}`,
        `Query Type: ${values.queryType}`,
        `------------------------------------`,
        `Message:`,
        values.message,
      ];
      const body = encodeURIComponent(bodyLines.join("\n"));

      window.location.href = `mailto:${recipients}?subject=${subject}&body=${body}`;

      toast({
        title: "Email Client Opened",
        description: "Please send the email using your default mail application. Your form details have been pre-filled.",
      });
      form.reset();
    } catch (error) {
      console.error("Mailto construction error:", error);
      toast({
        title: "Error",
        description: "Could not open your email client. Please try again or copy the email address.",
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
          name="queryType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason for Contact</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {queryTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Preparing Email...
              </>
            ) : (
              <>
                Send Message <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
          <span className="text-muted-foreground text-sm hidden sm:inline-block">or</span>
           <Button variant="outline" asChild className="w-full sm:w-auto">
            <a
              href="https://wa.me/919729041423?text=Hello%2C%20I%27d%20like%20to%20inquire%20about..." 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white hover:bg-green-600 hover:text-white"
            >
              <MessageSquare className="mr-2 h-5 w-5" /> 
              Chat on WhatsApp
            </a>
          </Button>
        </div>
      </form>
    </Form>
  );
}
