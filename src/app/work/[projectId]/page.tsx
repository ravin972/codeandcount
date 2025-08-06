import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ExternalLink, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { portfolioItems } from '@/lib/portfolio-data';

export const dynamic = 'force-dynamic';

interface ProjectDetailPageProps {
  params: { projectId: string };
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { projectId } = params;
  const project = portfolioItems.find(item => item.id === projectId);

  if (!project) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="bg-card rounded-xl shadow-xl p-8 md:p-12 border border-border">
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
      <header className="py-12 bg-secondary border-b border-border">
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
          <div className="lg:col-span-2 bg-card rounded-xl shadow-xl p-6 md:p-8 border border-border">
            <Image 
              src={project.imageUrl} 
              alt={project.title} 
              width={1200} 
              height={800} 
              className="w-full rounded-lg shadow-xl mb-8 aspect-[3/2] object-cover"
              data-ai-hint={project.dataAiHint}
              priority 
            />
            <h2 className="text-3xl font-semibold mb-4">Project Overview</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p>{project.longDescription}</p>
            </div>

            {project.gallery && project.gallery.length > 0 && (
              <div className="mt-12">
                <h3 className="text-2xl font-semibold mb-6">Project Gallery</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {project.gallery.map((image, index) => (
                    <div key={index} className="overflow-hidden rounded-lg shadow-md border border-border">
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
            <Card className="p-6"> {/* Card uses solid bg */}
              <h3 className="text-xl font-semibold mb-4 text-card-foreground">Project Details</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><strong>Client:</strong> {project.client}</li>
                <li><strong>Date:</strong> {new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</li>
                <li><strong>Category:</strong> {project.category}</li>
              </ul>
              {project.liveUrl && project.liveUrl !== '#' && (
                <Button asChild className="w-full mt-6">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    View Live Project <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              )}
               {project.liveUrl && project.liveUrl === '#' && (
                <Button variant="outline" className="w-full mt-6" disabled>
                  Private Project
                </Button>
              )}
            </Card>

            <Card className="p-6"> {/* Card uses solid bg */}
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
                 <Card className="p-6"> {/* Card uses solid bg */}
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
