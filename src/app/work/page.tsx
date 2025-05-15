
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, GalleryThumbnails } from 'lucide-react';

const portfolioItems = [
  {
    id: 'project-genesis',
    title: 'Project Genesis Rebrand',
    category: 'Brand Identity',
    imageUrl: 'https://placehold.co/600x450.png',
    dataAiHint: 'modern branding',
    description: 'A complete visual and strategic overhaul for a cutting-edge tech startup, positioning them as market leaders.',
    tags: ['Branding', 'Logo Design', 'Strategy'],
  },
  {
    id: 'e-commerce-nova',
    title: 'E-commerce Nova Platform',
    category: 'Websites',
    imageUrl: 'https://placehold.co/600x450.png',
    dataAiHint: 'ecommerce website',
    description: 'Developed a high-conversion e-commerce platform for a luxury fashion brand, focusing on user experience and scalability.',
    tags: ['Web Development', 'Shopify', 'UI/UX'],
  },
  {
    id: 'seo-summit',
    title: 'SEO Summit Campaign',
    category: 'SEO',
    imageUrl: 'https://placehold.co/600x450.png',
    dataAiHint: 'seo analytics',
    description: 'Executed a comprehensive SEO strategy that significantly boosted organic traffic and search rankings for a B2B client.',
    tags: ['SEO', 'Content Marketing', 'Analytics'],
  },
  {
    id: 'craftcms-chronicle',
    title: 'CraftCMS Chronicle Site',
    category: 'Craft CMS',
    imageUrl: 'https://placehold.co/600x450.png',
    dataAiHint: 'cms dashboard',
    description: 'Built a flexible and powerful content publishing platform using Craft CMS for a media organization.',
    tags: ['Craft CMS', 'Web Development', 'Content Strategy'],
  },
  {
    id: 'mobile-app-voyager',
    title: 'Voyager Mobile App',
    category: 'Mobile Apps',
    imageUrl: 'https://placehold.co/600x450.png',
    dataAiHint: 'mobile app ui',
    description: 'Designed and developed an intuitive travel planning mobile app for iOS and Android.',
    tags: ['Mobile App', 'UI/UX', 'iOS', 'Android'],
  },
  {
    id: 'shopify-bloom',
    title: 'Bloom Shopify Store',
    category: 'Shopify',
    imageUrl: 'https://placehold.co/600x450.png',
    dataAiHint: 'shopify store product',
    description: 'Created a visually appealing and user-friendly Shopify store for a boutique flower shop, enhancing online sales.',
    tags: ['Shopify', 'E-commerce', 'Web Design'],
  },
];

export default function WorkPage() {
  return (
    <div className="bg-background text-foreground">
      <header className="py-16 md:py-24 text-center bg-secondary">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item) => (
              <Card key={item.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out flex flex-col group hover:-translate-y-1">
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
                  <p className="text-muted-foreground mb-4">{item.description}</p>
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
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
