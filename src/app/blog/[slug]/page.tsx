
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, CalendarDays, Tag, Clock3, Dot } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { blogPosts } from '@/lib/blog-data';

export const dynamic = 'force-dynamic';

interface BlogPostPageProps {
  params: { slug: string };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params;
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="bg-card rounded-xl shadow-xl p-8 md:p-12 border border-border">
          <h1 className="text-4xl font-bold">Post Not Found</h1>
          <p className="mt-4 text-muted-foreground">The blog post you are looking for does not exist.</p>
          <Button asChild className="mt-8">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
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
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
            </Link>
          </Button>
          <Badge variant="default" className="mb-4">{post.category}</Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">{post.title}</h1>
          <div className="flex items-center text-sm text-muted-foreground mt-6">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={post.authorAvatar} alt={post.author} data-ai-hint={post.dataAiHintAuthor}/>
              <AvatarFallback>{post.author.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <span>By {post.author}</span>
              <div className="flex items-center text-xs">
                <CalendarDays className="h-4 w-4 mr-1" />
                <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                {post.readTime && (
                  <>
                    <Dot className="h-4 w-4 mx-1 opacity-50" />
                    <Clock3 className="h-3.5 w-3.5 mr-1" />
                    <span>{post.readTime}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-3xl mx-auto bg-card rounded-xl shadow-xl p-6 md:p-8 border border-border">
          <Image 
            src={post.imageUrl} 
            alt={post.title} 
            width={1200} 
            height={600} 
            className="w-full rounded-lg shadow-lg mb-10 aspect-[2/1] object-cover"
            data-ai-hint={post.dataAiHintImage}
            priority
          />
          
          <div 
            className="prose prose-lg lg:prose-xl max-w-none text-foreground prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-primary/80"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />

          <Separator className="my-10" />

          <div className="flex flex-wrap items-center gap-2">
            <Tag className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium text-muted-foreground">Tags:</span>
            {post.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
          </div>
        </div>
      </article>
    </div>
  );
}

    
