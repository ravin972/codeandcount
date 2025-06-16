
import { ContactForm } from '@/components/forms/ContactForm';
import { Mail, Phone, MapPin, MailQuestion } from 'lucide-react';

export default function ContactPage() {
  const mapAddress = "spaze i tech park, Sec-49, Gurugram, Haryana, India";
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapAddress)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="bg-background text-foreground">
      <header className="py-16 md:py-24 text-center bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 flex items-center justify-center">
            <MailQuestion className="h-12 w-12 mr-4 text-primary" />
            Get in Touch
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            We're excited to hear about your project. Let's create something amazing together.
          </p>
        </div>
      </header>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form Section */}
            <div id="start-project">
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below, and one of our team members will get back to you shortly.
              </p>
              <ContactForm />
            </div>

            {/* Contact Information Section */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
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
                    <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary transition-colors">
                      +1 (234) 567-890
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
              <div className="mt-10 aspect-video rounded-lg shadow-md overflow-hidden">
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
  );
}
