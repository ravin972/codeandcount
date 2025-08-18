
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  contactNumber: z.string().optional(),
  queryType: z.string({ required_error: "Please select an enquiry type." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }).optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(5000, { message: "Message must not exceed 5000 characters." }),
}).refine(data => {
    if (data.queryType === 'Other') {
        return data.subject && data.subject.length >= 5;
    }
    return true;
}, {
    message: "Subject must be at least 5 characters.",
    path: ["subject"],
});


type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      contactNumber: "",
      subject: "",
      message: "",
    },
  });

  const queryType = form.watch("queryType");

 async function onSubmit(values: ContactFormValues) {
    setIsSubmitting(true);
    
    // If queryType is not 'Other', use it as the subject.
    const submissionValues = {
        ...values,
        subject: values.queryType === 'Other' ? values.subject : values.queryType,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(submissionValues),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast({
          title: "Message Sent Successfully!",
          description: "Thank you for reaching out. We'll get back to you shortly.",
        });
        form.reset();
      } else {
        throw new Error(result.error || "Failed to send message.");
      }

    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again or contact us directly.",
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
                <Input placeholder="Your Name" {...field} />
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
                <Input type="email" placeholder="Your Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Number</FormLabel>
              <FormControl>
                <Input placeholder="Your Contact Number" {...field} />
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
              <FormLabel>Select Enquiry</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="What is your inquiry about?" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Web Development">Web Development</SelectItem>
                  <SelectItem value="AI Solutions">AI Solutions</SelectItem>
                  <SelectItem value="Account Management">Account Management</SelectItem>
                  <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                  <SelectItem value="Career/HR Services">Career/HR Services</SelectItem>
                  <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
       {queryType === 'Other' && (
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Input placeholder="Subject of your message" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Your message box where you give details..."
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Button 
            type="submit" 
            className={cn(
              "group w-full sm:w-auto text-base py-3 px-6",
              "transition-all duration-300 ease-in-out shadow-lg hover:shadow-2xl active:shadow-md transform hover:-translate-y-0.5 active:translate-y-px",
              "bg-primary text-primary-foreground"
            )} 
            disabled={isSubmitting}
            data-interactive-cursor="true"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send Message <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
