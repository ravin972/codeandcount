
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, CheckCircle, Eye, Calculator, Sparkles } from 'lucide-react';

const services = [
  { name: 'Brand Identity', description: 'Crafting unique visual identities that resonate.', icon: <CheckCircle className="h-10 w-10 text-primary mb-4" /> },
  { name: 'Websites & Apps', description: 'Designing and developing high-performance digital platforms.', icon: <CheckCircle className="h-10 w-10 text-primary mb-4" /> },
  { name: 'SEO Strategy', description: 'Optimizing your online presence for maximum visibility.', icon: <CheckCircle className="h-10 w-10 text-primary mb-4" /> },
  { name: 'Craft CMS Development', description: 'Building flexible and powerful websites with Craft CMS.', icon: <CheckCircle className="h-10 w-10 text-primary mb-4" /> },
  { name: 'Shopify Solutions', description: 'Creating engaging e-commerce experiences on Shopify.', icon: <CheckCircle className="h-10 w-10 text-primary mb-4" /> },
  { name: 'Accounting', description: 'Managing your finances with precision and expertise.', icon: <Calculator className="h-10 w-10 text-primary mb-4" /> },
];

const clientLogos = [
  { name: 'Client Alpha', src: 'https://placehold.co/150x60.png?text=Alpha', dataAiHint: 'logo abstract' },
  { name: 'Client Beta', src: 'https://placehold.co/150x60.png?text=Beta', dataAiHint: 'logo geometric' },
  { name: 'Client Gamma', src: 'https://placehold.co/150x60.png?text=Gamma', dataAiHint: 'logo modern' },
  { name: 'Client Delta', src: 'https://placehold.co/150x60.png?text=Delta', dataAiHint: 'logo minimalist' },
  { name: 'Client Epsilon', src: 'https://placehold.co/150x60.png?text=Epsilon', dataAiHint: 'logo corporate' },
];

const caseStudies = [
  {
    id: 'project-genesis',
    title: 'Project Genesis Rebrand',
    category: 'Brand Identity',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'branding portfolio',
    description: 'A complete overhaul of a tech startup\'s brand identity, resulting in a 200% increase in recognition.',
  },
  {
    id: 'e-commerce-nova',
    title: 'E-commerce Nova Platform',
    category: 'Websites',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'website design',
    description: 'Launched a scalable e-commerce platform for a fashion retailer, boosting sales by 150%.',
  },
  {
    id: 'seo-summit',
    title: 'SEO Summit Campaign',
    category: 'SEO',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'seo results',
    description: 'Elevated a local business to the top of search rankings for competitive keywords.',
  },
];

const testimonials = [
  {
    name: 'Jane Doe',
    title: 'CEO, Alpha Corp',
    avatar: 'https://placehold.co/100x100.png?text=JD',
    dataAiHint: 'person portrait',
    quote: "CodeAndCount.com transformed our online presence. Their team is professional, creative, and delivered outstanding results. We couldn't be happier!",
    videoUrl: 'https://vimeo.com/placeholder', // Placeholder
  },
  {
    name: 'John Smith',
    title: 'Founder, Beta Solutions',
    avatar: 'https://placehold.co/100x100.png?text=JS',
    dataAiHint: 'man smiling',
    quote: 'Working with CodeAndCount.com was a game-changer. Their insights into branding and web development are unparalleled. Highly recommended!',
    videoUrl: 'https://vimeo.com/placeholder', // Placeholder
  },
];

export default function HomePage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Crafting <span className="text-primary">Digital Excellence</span>.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            CodeAndCount.com is a web and app development powerhouse, dedicated to building impactful digital experiences that drive growth and elevate brands across industries.
          </p>
          <Button size="lg" asChild>
            <Link href="/contact#start-project">
              Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4">Our Core Services</h2>
          <p className="text-xl text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            We offer a comprehensive suite of services to bring your vision to life.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.name} className="shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1">
                <CardHeader>
                  {service.icon}
                  <CardTitle className="text-2xl font-semibold">{service.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logos Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-10">Trusted by Industry Leaders</h2>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {clientLogos.map((logo) => (
              <div key={logo.name} title={logo.name} className="opacity-70 hover:opacity-100 transition-opacity duration-300 ease-in-out transform hover:scale-105">
                <Image src={logo.src} alt={logo.name} width={150} height={60} data-ai-hint={logo.dataAiHint} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="work" className="py-16 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4">Featured Work</h2>
          <p className="text-xl text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Explore how we've helped businesses like yours succeed.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study) => (
              <Card key={study.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out flex flex-col group hover:-translate-y-1">
                <Image src={study.imageUrl} alt={study.title} width={600} height={400} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out" data-ai-hint={study.dataAiHint} />
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold">{study.title}</CardTitle>
                  <CardDescription>{study.category}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{study.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild>
                    <Link href={`/work/${study.id}`}>
                      View Case Study <Eye className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" variant="link" asChild>
              <Link href="/work">
                Explore All Projects <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4">What Our Clients Say</h2>
          <p className="text-xl text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Real stories from satisfied partners.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.dataAiHint} />
                      <AvatarFallback>{testimonial.name.substring(0,2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-lg font-semibold text-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </div>
                  <blockquote className="text-foreground italic border-l-4 border-primary pl-4 py-2">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="mt-4">
                    {/* Placeholder for Vimeo embed */}
                    <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                      <p className="text-muted-foreground">Vimeo Video Placeholder (View on <a href={testimonial.videoUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline">Vimeo</a>)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Optimizer Tool Section */}
      <section id="seo-tool" className="py-16 md:py-20 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Sparkles className="h-12 w-12 text-primary mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6">Boost Your SEO with Our AI Optimizer</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Unlock the power of AI to rewrite your content, incorporate strategic keywords, and climb search engine rankings. Try our free SEO Optimizer tool today!
          </p>
          <Button size="lg" asChild>
            <Link href="/seo-optimizer">
              Try SEO Optimizer <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Elevate Your Brand?</h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Let's discuss how CodeAndCount.com can help you achieve your business goals.
            We partner with clients of all sizes, across diverse industries, to deliver exceptional results.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact#start-project">
              Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
