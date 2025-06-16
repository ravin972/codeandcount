
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ExternalLink, CheckCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card'; // Import Card for consistency

// Mock data - in a real app, this would come from a CMS or database
const portfolioItems = [
  {
    id: 'project-genesis',
    title: 'Project Genesis Rebrand',
    category: 'Brand Identity',
    imageUrl: 'https://placehold.co/1200x800.png',
    dataAiHint: 'branding showcase',
    description: 'A complete visual and strategic overhaul for a cutting-edge tech startup, positioning them as market leaders. We focused on creating a modern, approachable brand that resonates with their target audience of innovators and early adopters.',
    longDescription: "The challenge was to differentiate Project Genesis in a crowded market. Our process involved deep market research, competitor analysis, and stakeholder interviews. We developed a comprehensive brand strategy, followed by a new logo, color palette, typography system, and a full suite of marketing collateral. The new identity was launched with a targeted campaign, resulting in a significant increase in brand awareness and lead generation.",
    tags: ['Branding', 'Logo Design', 'Strategy', 'Marketing Collateral', 'Tech Startup'],
    client: 'Tech Innovators Inc.',
    date: '2023-05-15',
    liveUrl: 'https://example.com/project-genesis', // Placeholder
    servicesProvided: ['Brand Strategy', 'Visual Identity Design', 'Logo Creation', 'Style Guide Development', 'Print Design'],
    results: '200% increase in brand recognition, 150% uplift in website engagement, Successfully secured Series A funding post-rebrand.',
    gallery: [
        { src: 'https://placehold.co/800x600.png', alt: 'Logo Concept', dataAiHint: 'logo sketch' },
        { src: 'https://placehold.co/800x600.png', alt: 'Website Mockup', dataAiHint: 'website ui' },
        { src: 'https://placehold.co/800x600.png', alt: 'Brand Guidelines', dataAiHint: 'brochure design' },
    ]
  },
  // Add more mock projects if needed
];

export async function generateStaticParams() {
  return portfolioItems
    .filter(item => typeof item.id === 'string' && item.id.length > 0)
    .map((item) => ({
      projectId: item.id,
    }));
}

export default function ProjectDetailPage({ params }: { params: { projectId: string } }) {
  const project = portfolioItems.find(item => item.id === params.projectId);

  if (!project) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="bg-background/70 dark:bg-neutral-900/70 backdrop-blur-lg rounded-xl shadow-xl p-8 md:p-12 border border-white/10 dark:border-neutral-700/30">
          <h1 className="text-4xl font-bold">Project Not Found</h1>
          <p className="mt-4 text-muted-foreground">The project you are looking for does not exist.</p>
          <Button asChild className="mt-8">
            <Link href="/work">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portfolio
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground">
      <header className="py-12 bg-secondary/70 dark:bg-secondary/70 backdrop-blur-lg border-b border-white/10 dark:border-neutral-700/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="outline" asChild className="mb-8">
            <Link href="/work">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portfolio
            </Link>
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{project.title}</h1>
          <p className="text-xl text-muted-foreground mt-2">{project.category}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map(tag => <Badge key={tag} variant="default">{tag}</Badge>)}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 bg-background/70 dark:bg-neutral-900/70 backdrop-blur-lg rounded-xl shadow-xl p-6 md:p-8 border border-white/10 dark:border-neutral-700/30">
            <Image 
              src={project.imageUrl} 
              alt={project.title} 
              width={1200} 
              height={800} 
              className="w-full rounded-lg shadow-xl mb-8"
              data-ai-hint={project.dataAiHint}
              priority 
            />
            <h2 className="text-3xl font-semibold mb-4">Project Overview</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p>{project.description}</p>
              <p>{project.longDescription}</p>
            </div>

            {project.gallery && project.gallery.length > 0 && (
              <div className="mt-12">
                <h3 className="text-2xl font-semibold mb-6">Project Gallery</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {project.gallery.map((image, index) => (
                    <div key={index} className="overflow-hidden rounded-lg shadow-md">
                      <Image 
                        src={image.src} 
                        alt={image.alt} 
                        width={800} 
                        height={600} 
                        className="w-full h-auto object-cover aspect-[4/3]"
                        data-ai-hint={image.dataAiHint}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="lg:col-span-1 space-y-8">
            <Card className="p-6"> {/* Using Card component for glassmorphism */}
              <h3 className="text-xl font-semibold mb-4 text-card-foreground">Project Details</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><strong>Client:</strong> {project.client}</li>
                <li><strong>Date:</strong> {new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</li>
                <li><strong>Category:</strong> {project.category}</li>
              </ul>
              {project.liveUrl && (
                <Button asChild className="w-full mt-6">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    View Live Project <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              )}
            </Card>

            <Card className="p-6"> {/* Using Card component for glassmorphism */}
              <h3 className="text-xl font-semibold mb-4 text-card-foreground">Services Provided</h3>
              <ul className="space-y-2 text-sm">
                {project.servicesProvided.map(service => (
                  <li key={service} className="flex items-center text-muted-foreground">
                    <CheckCircle className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                    {service}
                  </li>
                ))}
              </ul>
            </Card>

            {project.results && (
                 <Card className="p-6"> {/* Using Card component for glassmorphism */}
                    <h3 className="text-xl font-semibold mb-4 text-card-foreground">Key Results</h3>
                    <div className="prose prose-sm text-muted-foreground">
                        <p>{project.results}</p>
                    </div>
                </Card>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}
