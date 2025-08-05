
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, GalleryThumbnails, Calculator, Laptop } from 'lucide-react';
import { portfolioItems } from '@/lib/portfolio-data';
import { cn } from '@/lib/utils';


type FilterType = 'all' | 'accounting' | 'web_ai';

const ProjectCard = ({ item }: { item: (typeof portfolioItems)[0] }) => (
  <Card key={item.id} className="overflow-hidden flex flex-col group shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1" data-interactive-cursor="true">
    <div className="relative overflow-hidden ripple-container">
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

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredProjects = portfolioItems.filter(item => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'accounting') return item.type === 'accounting';
    if (activeFilter === 'web_ai') return item.type === 'webdev' || item.type === 'ai'; // 'ai' type can be added if needed later
    return true;
  });

  return (
    <div className="bg-background text-foreground">
      <header className="py-16 md:py-24 text-center bg-secondary border-b border-border">
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
          <div className="bg-card rounded-xl shadow-xl p-8 md:p-12 border border-border">
            
            <div className="mb-12 flex flex-wrap justify-center items-center gap-3 sm:gap-4">
              <Button 
                onClick={() => setActiveFilter('all')} 
                variant={activeFilter === 'all' ? 'default' : 'outline'}
                className="rounded-full text-base h-12 px-10"
              >
                <GalleryThumbnails className="mr-2 h-5 w-5" />
                All Projects
              </Button>
              <Button 
                onClick={() => setActiveFilter('accounting')} 
                variant={activeFilter === 'accounting' ? 'default' : 'outline'}
                className="rounded-full text-base h-12 px-10"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Account Management
              </Button>
              <Button 
                onClick={() => setActiveFilter('web_ai')} 
                variant={activeFilter === 'web_ai' ? 'default' : 'outline'}
                className="rounded-full text-base h-12 px-10"
              >
                 <Laptop className="mr-2 h-5 w-5" />
                Websites & AI Solutions
              </Button>
            </div>
            
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((item) => <ProjectCard key={item.id} item={item} />)}
              </div>
            ) : (
               <p className="text-center text-muted-foreground text-xl py-10">No projects found in this category. Check back later or select another category!</p>
            )}

          </div>
        </div>
      </section>
    </div>
  );
}
    
