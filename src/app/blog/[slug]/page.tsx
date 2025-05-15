
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, CalendarDays, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

// Mock data - in a real app, this would come from a CMS or database
const blogPosts = [
  {
    slug: 'the-future-of-web-design-trends-for-2024',
    title: 'The Future of Web Design: Trends for 2024',
    date: '2024-07-15',
    author: 'Alex Chen',
    authorAvatar: 'https://placehold.co/40x40.png?text=AC',
    dataAiHintAuthor: 'professional person',
    excerpt: 'Discover the cutting-edge web design trends shaping the digital landscape in 2024, from AI integration to immersive experiences.',
    imageUrl: 'https://placehold.co/1200x600.png',
    dataAiHintImage: 'futuristic design',
    category: 'Web Design',
    content: `
      <p>The world of web design is in constant flux, driven by technological advancements and evolving user expectations. As we look ahead to 2024, several key trends are set to redefine how we create and interact with websites.</p>
      
      <h2 class="text-2xl font-semibold my-4">1. AI-Powered Design and Personalization</h2>
      <p>Artificial intelligence is no longer a futuristic concept but a practical tool in a designer's arsenal. AI can assist in generating design layouts, suggesting color palettes, and even creating A/B testing variations. More importantly, AI will enable hyper-personalization, tailoring website content and experiences to individual users in real-time.</p>

      <h2 class="text-2xl font-semibold my-4">2. Immersive 3D Graphics and WebGL</h2>
      <p>With advancements in browser capabilities and technologies like WebGL, expect to see more websites incorporating immersive 3D graphics and interactive elements. This trend moves beyond flat design, offering users more engaging and memorable experiences.</p>

      <h2 class="text-2xl font-semibold my-4">3. Microinteractions and Delightful Details</h2>
      <p>Subtle animations, hover effects, and thoughtful microinteractions will continue to be crucial for enhancing user experience. These small details can significantly improve usability and add a touch of personality to a website, making interactions more intuitive and enjoyable.</p>

      <h2 class="text-2xl font-semibold my-4">4. Accessibility and Inclusive Design</h2>
      <p>Designing for everyone is not just a trend but a necessity. In 2024, there will be an even stronger emphasis on creating accessible websites that cater to users of all abilities. This includes considerations for WCAG compliance, keyboard navigation, screen reader compatibility, and more.</p>

      <h2 class="text-2xl font-semibold my-4">5. Sustainable Web Design</h2>
      <p>As environmental concerns grow, sustainable web design practices are gaining traction. This involves optimizing websites for performance to reduce energy consumption, choosing eco-friendly hosting, and designing with efficiency in mind.</p>

      <p>Staying ahead of these trends will be key for businesses and designers looking to create impactful and effective digital presences in the coming year.</p>
    `,
    tags: ['Web Design', 'Future Trends', 'AI', '3D Graphics', 'Accessibility']
  },
  // Add more mock posts if needed
];

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}


export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find(p => p.slug === params.slug);

  if (!post) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-4xl font-bold">Post Not Found</h1>
        <p className="mt-4 text-muted-foreground">The blog post you are looking for does not exist.</p>
        <Button asChild className="mt-8">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground">
      <header className="py-12 bg-secondary">
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
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
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
