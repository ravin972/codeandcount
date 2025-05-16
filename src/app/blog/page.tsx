
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CalendarDays, ArrowRight, Newspaper, Clock3, Dot } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const blogPosts = [
  {
    slug: 'the-future-of-web-design-trends-for-2024',
    title: 'The Future of Web Design: Trends for 2024',
    date: '2024-07-15',
    author: 'Alex Chen',
    authorAvatar: 'https://placehold.co/40x40.png?text=AC',
    dataAiHintAuthor: 'professional person',
    excerpt: 'Discover the cutting-edge web design trends shaping the digital landscape in 2024, from AI integration to immersive experiences.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHintImage: 'futuristic web design',
    category: 'Web Design',
    readTime: '6 min read',
  },
  {
    slug: 'unlocking-seo-success-a-comprehensive-guide',
    title: 'Unlocking SEO Success: A Comprehensive Guide',
    date: '2024-07-01',
    author: 'Sam Lee',
    authorAvatar: 'https://placehold.co/40x40.png?text=SL',
    dataAiHintAuthor: 'marketing expert',
    excerpt: 'Navigate the complexities of SEO with our in-depth guide, covering everything from keyword research to technical optimization.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHintImage: 'seo chart graph',
    category: 'SEO',
    readTime: '10 min read',
  },
  {
    slug: 'why-craft-cms-is-our-go-to-for-flexible-websites',
    title: 'Why Craft CMS is Our Go-To for Flexible Websites',
    date: '2024-06-20',
    author: 'Maria Rodriguez',
    authorAvatar: 'https://placehold.co/40x40.png?text=MR',
    dataAiHintAuthor: 'software developer',
    excerpt: 'Explore the benefits of Craft CMS and why it stands out as a powerful, flexible, and user-friendly content management system.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHintImage: 'cms interface',
    category: 'Craft CMS',
    readTime: '4 min read',
  },
  {
    slug: 'building-a-strong-brand-identity-key-principles',
    title: 'Building a Strong Brand Identity: Key Principles',
    date: '2024-06-05',
    author: 'Alex Chen',
    authorAvatar: 'https://placehold.co/40x40.png?text=AC',
    dataAiHintAuthor: 'professional person',
    excerpt: 'Learn the fundamental principles of creating a memorable and effective brand identity that resonates with your target audience.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHintImage: 'brand moodboard',
    category: 'Branding',
    readTime: '7 min read',
  },
];

export default function BlogPage() {
  return (
    <div className="bg-background text-foreground">
      <header className="py-16 md:py-24 text-center bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 flex items-center justify-center">
            <Newspaper className="h-12 w-12 mr-4 text-primary" />
            CodeAndCount Insights
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Stay updated with the latest trends, tips, and thoughts from the CodeAndCount.com team.
          </p>
        </div>
      </header>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.slug} className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out flex flex-col group hover:-translate-y-1">
                <Link href={`/blog/${post.slug}`} className="block">
                  <Image 
                    src={post.imageUrl} 
                    alt={post.title} 
                    width={600} 
                    height={400} 
                    className="w-full h-64 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    data-ai-hint={post.dataAiHintImage}
                  />
                </Link>
                <CardHeader>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <Badge variant="outline" className="w-fit">{post.category}</Badge>
                    <span className="flex items-center">
                       <Clock3 className="h-3.5 w-3.5 mr-1" /> {post.readTime}
                    </span>
                  </div>
                  <Link href={`/blog/${post.slug}`} className="block">
                    <CardTitle className="text-2xl font-semibold leading-tight group-hover:text-primary transition-colors">{post.title}</CardTitle>
                  </Link>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                </CardContent>
                <CardFooter className="flex flex-col items-start space-y-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={post.authorAvatar} alt={post.author} data-ai-hint={post.dataAiHintAuthor} />
                      <AvatarFallback>{post.author.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <span>By {post.author}</span>
                    <Dot className="h-4 w-4 mx-1 opacity-50" />
                    <CalendarDays className="h-4 w-4 mr-1" />
                    <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                  </div>
                  <Button variant="link" asChild className="p-0 h-auto text-sm">
                    <Link href={`/blog/${post.slug}`}>
                      Read More <ArrowRight className="ml-1 h-4 w-4" />
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

    