
"use client";

import React, { useEffect } from 'react';
import { getCalApi } from "@calcom/embed-react";
import { Mail, Phone, MapPin, CalendarDays, MessageSquare } from 'lucide-react'; 
import { ContactForm } from '@/components/forms/ContactForm';

export default function ContactPage() {
  const mapAddress = "spaze i tech park, Sec-49, Gurugram, Haryana, India";
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapAddress)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const calComCalLink = "ravin-pandey-f7vkoq/30min"; 

  useEffect(() => {
    (async function () {
      try {
        const cal = await getCalApi({ namespace: "contactPageCalEmbed" }); // Unique namespace for this embed
        if (cal && typeof cal === 'function') {
          cal("inline", {
            elementOrSelector: "#cal-embed-container",
            calLink: calComCalLink,
            config: { layout: "month_view", hideEventTypeDetails: false }
          });
          // Apply theme and primary color styling after inline embed is initialized
          cal("ui", {
            theme: "auto", // Respects light/dark mode of the parent page
            styles: { branding: { brandColor: "hsl(var(--primary))" } } // Uses your site's primary color
          });
        } else {
          console.error("Cal.com API (cal function) not available or not a function after getCalApi.");
        }
      } catch (e) {
        console.error("Error initializing Cal.com embed:", e);
      }
    })();
  }, [calComCalLink]); // Rerun if calComCalLink changes, though it's static here

  return (
    <>
      <div className="bg-background text-foreground">
        <header className="py-16 md:py-24 text-center bg-secondary border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 flex items-center justify-center">
              <CalendarDays className="h-12 w-12 mr-4 text-primary" />
              Let's Connect
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Schedule a call or send us a message. We're excited to hear about your project.
            </p>
          </div>
        </header>

        {/* Booking Section with Cal.com Embed */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Book a Meeting</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
             Choose a time that works for you to discuss your project requirements and how we can help.
            </p>
            <div id="cal-embed-container" className="min-h-[700px] w-full max-w-4xl mx-auto rounded-lg overflow-hidden border border-border shadow-xl bg-card">
              {/* Cal.com inline embed will be rendered here */}
            </div>
          </div>
        </section>

        {/* Separator */}
        <div className="my-8 md:my-12 text-center">
          <p className="text-2xl font-semibold text-muted-foreground">- OR -</p>
        </div>

        {/* Contact Form & Details Section */}
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 bg-card rounded-xl shadow-xl p-8 md:p-12 border border-border">
              {/* Contact Form Section */}
              <div id="start-project">
                <h2 className="text-3xl font-bold mb-6 flex items-center">
                  <MessageSquare className="h-8 w-8 mr-3 text-primary" />
                  Or Send Us a Message
                </h2>
                <p className="text-muted-foreground mb-8">
                  Fill out the form below, and one of our team members will get back to you shortly.
                </p>
                <ContactForm />
              </div>

              {/* Contact Information Section */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Other Ways to Reach Us</h2>
                <p className="text-muted-foreground mb-8">
                  Alternatively, you can reach us through the following channels:
                </p>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-primary/10 p-3 rounded-md">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-foreground">Email Us</h3>
                      <a href="mailto:hello@codeandcount.com" className="text-muted-foreground hover:text-primary transition-colors">
                        hello@codeandcount.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-primary/10 p-3 rounded-md">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-foreground">Call Us</h3>
                      <a href="tel:+918685941423" className="text-muted-foreground hover:text-primary transition-colors">
                        +91-8685941423
                      </a>
                       <br/>
                      <a href="tel:+917737770374" className="text-muted-foreground hover:text-primary transition-colors">
                        +91-7737770374
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-primary/10 p-3 rounded-md">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-foreground">Visit Us</h3>
                      <p className="text-muted-foreground">
                        {mapAddress.split(', Sec-')[0]}<br />
                        {mapAddress.split(', ').slice(1).join(', ')}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Embedded Map */}
                <div className="mt-10 aspect-video rounded-lg shadow-md overflow-hidden border border-border">
                   <iframe
                      src={mapEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border:0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Office Location Map - Spaze iTech Park, Gurugram"
                    ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
