
"use client";

import React from 'react';
import Script from 'next/script';
import { Mail, Phone, MapPin, CalendarDays, MessageSquare, ExternalLink, ArrowRight } from 'lucide-react'; 
import { ContactForm } from '@/components/forms/ContactForm';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function ContactPage() {
  const mapAddress = "spaze i tech park, Sec-49, Gurugram, Haryana, India";
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapAddress)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const calComCalLink = "ravin-pandey-f7vkoq/30min"; 
  const calComNamespace = "30min";

  const calComScriptContent = `
    (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
    if (typeof Cal !== "undefined") {
      Cal("init", "${calComNamespace}", {origin:"https://cal.com"});
      if (Cal.ns && Cal.ns["${calComNamespace}"]) {
        Cal.ns["${calComNamespace}"]("ui", {"theme":"auto","styles":{"branding":{"brandColor":"hsl(var(--primary))"}},"hideEventTypeDetails":false,"layout":"month_view"});
      } else {
        console.warn("Cal.com namespace '${calComNamespace}' not available for UI config immediately after init. This might indicate a race condition.");
      }
    } else {
      console.error("Cal function was not defined after IIFE execution.");
    }
  `;

  return (
    <>
      <Script
        id="cal-com-embed-script"
        strategy="lazyOnload" // Or "afterInteractive"
        dangerouslySetInnerHTML={{ __html: calComScriptContent }}
      />
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

        {/* Booking Section with Cal.com Element Click */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Book a Meeting</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
             Choose a time that works for you to discuss your project requirements and how we can help.
            </p>
            <Button
              data-cal-namespace={calComNamespace}
              data-cal-link={calComCalLink}
              data-cal-config='{"layout":"month_view"}'
              size="lg"
              className={cn(
                "group w-full max-w-xs mx-auto text-base py-3 px-8",
                "transition-all duration-300 ease-in-out shadow-lg hover:shadow-2xl active:shadow-md transform hover:-translate-y-0.5 active:translate-y-px",
                "bg-primary text-primary-foreground"
              )}
              data-interactive-cursor="true"
            >
              Schedule Your Meeting
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
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
                        +91-9729041423
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
