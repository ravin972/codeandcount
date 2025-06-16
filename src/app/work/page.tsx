
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, GalleryThumbnails, Calculator, Laptop, Brain } from 'lucide-react';

const portfolioItems = [
  {
    id: 'project-genesis',
    title: 'Project Genesis Rebrand',
    category: 'Brand Identity',
    type: 'webdev',
    imageUrl: 'https://placehold.co/600x450.png',
    dataAiHint: 'modern branding',
    description: 'A complete visual and strategic overhaul for a cutting-edge tech startup, positioning them as market leaders.',
    tags: ['Branding', 'Logo Design', 'Strategy'],
  },
  {
    id: 'e-commerce-nova',
    title: 'E-commerce Nova Platform',
    category: 'Websites',
    type: 'webdev',
    imageUrl: 'https://placehold.co/600x450.png',
    dataAiHint: 'ecommerce website',
    description: 'Developed a high-conversion e-commerce platform for a luxury fashion brand, focusing on user experience and scalability.',
    tags: ['Web Development', 'Shopify', 'UI/UX'],
  },
  {
    id: 'seo-summit',
    title: 'SEO Summit Campaign',
    category: 'SEO',
    type: 'webdev',
    imageUrl: 'https://placehold.co/600x450.png',
    dataAiHint: 'seo analytics',
    description: 'Executed a comprehensive SEO strategy that significantly boosted organic traffic and search rankings for a B2B client.',
    tags: ['SEO', 'Content Marketing', 'Analytics'],
  },
  {
    id: 'craftcms-chronicle',
    title: 'CraftCMS Chronicle Site',
    category: 'Craft CMS',
    type: 'webdev',
    imageUrl: 'https://placehold.co/600x450.png',
    dataAiHint: 'cms dashboard',
    description: 'Built a flexible and powerful content publishing platform using Craft CMS for a media organization.',
    tags: ['Craft CMS', 'Web Development', 'Content Strategy'],
  },
  {
    id: 'mobile-app-voyager',
    title: 'Voyager Mobile App',
    category: 'Mobile Apps',
    type: 'webdev',
    imageUrl: 'https://placehold.co/600x450.png',
    dataAiHint: 'mobile app ui',
    description: 'Designed and developed an intuitive travel planning mobile app for iOS and Android.',
    tags: ['Mobile App', 'UI/UX', 'iOS', 'Android'],
  },
  {
    id: 'shopify-bloom',
    title: 'Bloom Shopify Store',
    category: 'Shopify',
    type: 'webdev',
    imageUrl: 'https://placehold.co/600x450.png',
    dataAiHint: 'shopify store product',
    description: 'Created a visually appealing and user-friendly Shopify store for a boutique flower shop, enhancing online sales.',
    tags: ['Shopify', 'E-commerce', 'Web Design'],
  },
  {
    id: 'accounting-streamline',
    title: 'Streamlined Financial Reporting',
    category: 'Financial Systems',
    type: 'accounting',
    imageUrl: 'https://placehold.co/600x450.png',
    dataAiHint: 'financial report chart',
    description: 'Implemented a new accounting system for a mid-sized firm, improving reporting efficiency by 40%.',
    tags: ['Accounting', 'Financial Systems', 'Reporting'],
  },
  {
    id: 'tax-optimizer-pro',
    title: 'Tax Optimizer Pro Solution',
    category: 'Tax Advisory',
    type: 'accounting',
    imageUrl: 'https://placehold.co/600x450.png',
    dataAiHint: 'tax documents calculator',
    description: 'Developed a custom tax optimization solution that saved a client 15% on their annual tax burden.',
    tags: ['Tax', 'Financial Planning', 'Software'],
  },
  {
    id: 'ai-content-gen',
    title: 'AI Content Generator Tool',
    category: 'AI Development',
    type: 'ai',
    imageUrl: 'https://placehold.co/600x450.png',
    dataAiHint: 'ai robot writing',
    description: 'Built a custom AI tool for generating marketing copy, increasing content output speed significantly.',
    tags: ['AI', 'NLP', 'Content Creation', 'Genkit'],
  },
  {
    id: 'ai-seo-analyzer',
    title: 'Advanced SEO Analyzer (AI)',
    category: 'AI & SEO',
    type: 'ai',
    imageUrl: 'https://placehold.co/600x450.png',
    dataAiHint: 'ai brain analytics',
    description: 'Developed an AI-powered SEO analysis tool providing deep insights and actionable recommendations.',
    tags: ['AI', 'SEO', 'Analytics', 'Genkit'],
  }
];

export default function WorkPage() {
  const accountingProjects = portfolioItems.filter(item => item.type === 'accounting');
  const webDevProjects = portfolioItems.filter(item => item.type === 'webdev');
  const aiProjects = portfolioItems.filter(item => item.type === 'ai');

  const ProjectCard = ({ item }: { item: typeof portfolioItems[0] }) => (
    <Card key={item.id} className="overflow-hidden flex flex-col group hover:-translate-y-1" data-interactive-cursor="true">
      <div className="relative overflow-hidden">
        <Image 
          src={item.imageUrl} 
          alt={item.title} 
          width={600} 
          height={450} 
          className="w-full h-72 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          data-ai-hint={item.dataAiHint} 
        />
      </div>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold group-hover:text-primary transition-colors">{item.title}</CardTitle>
        <CardDescription>{item.category}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground mb-4 line-clamp-3">{item.description}</p>
        <div className="flex flex-wrap gap-2">
          {item.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" asChild className="w-full">
          <Link href={`/work/${item.id}`}>
            View Project Details <Eye className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="bg-background text-foreground">
      <header className="py-16 md:py-24 text-center bg-secondary/70 dark:bg-secondary/70 backdrop-blur-lg border-b border-white/10 dark:border-neutral-700/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 flex items-center justify-center">
            <GalleryThumbnails className="h-12 w-12 mr-4 text-primary" />
            Our Work
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            We take pride in our diverse portfolio, showcasing successful collaborations with clients across various industries. Explore our projects and see the CodeAndCount.com difference.
          </p>
        </div>
      </header>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-background/70 dark:bg-neutral-900/70 backdrop-blur-lg rounded-xl shadow-xl p-8 md:p-12 border border-white/10 dark:border-neutral-700/30">
            
            {accountingProjects.length > 0 && (
              <div className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 flex items-center">
                  <Calculator className="h-10 w-10 mr-4 text-primary" />
                  Accounting & Financial Solutions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {accountingProjects.map((item) => <ProjectCard key={item.id} item={item} />)}
                </div>
              </div>
            )}

            {webDevProjects.length > 0 && (
              <div className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 flex items-center">
                  <Laptop className="h-10 w-10 mr-4 text-primary" />
                  Web Development & Digital Solutions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {webDevProjects.map((item) => <ProjectCard key={item.id} item={item} />)}
                </div>
              </div>
            )}
            
            {aiProjects.length > 0 && (
              <div> {/* No mb-16 for the last section if it's rendered */}
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 flex items-center">
                  <Brain className="h-10 w-10 mr-4 text-primary" />
                  AI-Powered Tools & Innovations
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {aiProjects.map((item) => <ProjectCard key={item.id} item={item} />)}
                </div>
              </div>
            )}
            
            {accountingProjects.length === 0 && webDevProjects.length === 0 && aiProjects.length === 0 && (
               <p className="text-center text-muted-foreground text-xl py-10">More projects coming soon. Check back later!</p>
            )}

          </div>
        </div>
      </section>
    </div>
  );
}
