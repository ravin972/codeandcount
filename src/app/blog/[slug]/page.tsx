
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, CalendarDays, Tag, Clock3, Dot } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

// Mock data - in a real app, this would come from a CMS or database
const blogPosts = [
  {
    slug: 'the-future-of-web-design-trends-for-2024',
    title: 'The Future of Web Design: Trends for 2024',
    date: '2024-07-15',
    author: 'Alex Chen',
    authorAvatar: 'https://placehold.co/40x40.png',
    dataAiHintAuthor: 'professional person',
    excerpt: 'Discover the cutting-edge web design trends shaping the digital landscape in 2024, from AI integration to immersive experiences.',
    imageUrl: 'https://images.unsplash.com/photo-1547398123-828a28902e57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxmdXR1cmlzdGljJTIwZGVzaWdufGVufDB8fHx8MTc0NzM3NjYzN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    dataAiHintImage: 'futuristic design',
    category: 'Web Design',
    readTime: '6 min read',
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
   {
    slug: 'unlocking-seo-success-a-comprehensive-guide',
    title: 'Unlocking SEO Success: A Comprehensive Guide',
    date: '2024-07-01',
    author: 'Sam Lee',
    authorAvatar: 'https://placehold.co/40x40.png',
    dataAiHintAuthor: 'marketing expert',
    excerpt: 'Navigate the complexities of SEO with our in-depth guide, covering everything from keyword research to technical optimization.',
    imageUrl: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxzZW8lMjBjaGFydCUyMGdyYXBofGVufDB8fHx8MTc0NzM3NjYzN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    dataAiHintImage: 'seo chart graph',
    category: 'SEO',
    readTime: '10 min read',
    content: `<p>Content for SEO Guide...</p>`,
    tags: ['SEO', 'Digital Marketing', 'Keywords']
  },
  {
    slug: 'why-craft-cms-is-our-go-to-for-flexible-websites',
    title: 'Why Craft CMS is Our Go-To for Flexible Websites',
    date: '2024-06-20',
    author: 'Maria Rodriguez',
    authorAvatar: 'https://placehold.co/40x40.png',
    dataAiHintAuthor: 'software developer',
    excerpt: 'Explore the benefits of Craft CMS and why it stands out as a powerful, flexible, and user-friendly content management system.',
    imageUrl: 'https://images.unsplash.com/photo-1698621193747-e8788c620dbc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxjbXMlMjBpbnRlcmZhY2V8ZW58MHx8fHwxNzQ3Mzc2NjM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    dataAiHintImage: 'cms interface',
    category: 'Craft CMS',
    readTime: '4 min read',
    content: `<p>Content for Craft CMS...</p>`,
    tags: ['Craft CMS', 'Web Development', 'CMS']
  },
  {
    slug: 'building-a-strong-brand-identity-key-principles',
    title: 'Building a Strong Brand Identity: Key Principles',
    date: '2024-06-05',
    author: 'Alex Chen',
    authorAvatar: 'https://placehold.co/40x40.png',
    dataAiHintAuthor: 'professional person',
    excerpt: 'Learn the fundamental principles of creating a memorable and effective brand identity that resonates with your target audience.',
    imageUrl: 'https://placehold.co/1200x600.png',
    dataAiHintImage: 'brand moodboard',
    category: 'Branding',
    readTime: '7 min read',
    content: '<p>Content for branding principles...</p>',
    tags: ['Branding', 'Design', 'Strategy']
  },
  {
    slug: 'ai-in-digital-marketing-the-new-frontier',
    title: 'AI in Digital Marketing: The New Frontier',
    date: '2024-05-22',
    author: 'Sam Lee',
    authorAvatar: 'https://placehold.co/40x40.png',
    dataAiHintAuthor: 'marketing expert',
    excerpt: 'How AI is revolutionizing digital marketing strategies, from content creation to customer analytics.',
    imageUrl: 'https://placehold.co/1200x600.png',
    dataAiHintImage: 'artificial intelligence marketing',
    category: 'Digital Marketing',
    readTime: '8 min read',
    content: '<p>Content for AI in digital marketing...</p>',
    tags: ['AI', 'Digital Marketing', 'Technology']
  },
  {
    slug: 'the-importance-of-user-experience-ux-in-web-design',
    title: 'The Importance of User Experience (UX) in Web Design',
    date: '2024-05-10',
    author: 'Alex Chen',
    authorAvatar: 'https://placehold.co/40x40.png',
    dataAiHintAuthor: 'professional person',
    excerpt: 'A deep dive into why UX is paramount for website success and how to optimize it for your users.',
    imageUrl: 'https://placehold.co/1200x600.png',
    dataAiHintImage: 'user experience interface',
    category: 'Web Design',
    readTime: '7 min read',
    content: '<p>Content for UX importance...</p>',
    tags: ['UX', 'Web Design', 'User Experience']
  },
  {
    slug: 'wordpress-vs-headless-cms-which-is-right-for-you',
    title: 'WordPress vs. Headless CMS: Which is Right for You?',
    date: '2024-04-28',
    author: 'Maria Rodriguez',
    authorAvatar: 'https://placehold.co/40x40.png',
    dataAiHintAuthor: 'software developer',
    excerpt: 'Comparing traditional WordPress with modern headless CMS solutions to help you choose the best fit.',
    imageUrl: 'https://placehold.co/1200x600.png',
    dataAiHintImage: 'cms comparison chart',
    category: 'CMS',
    readTime: '9 min read',
    content: '<p>Content for WordPress vs Headless CMS...</p>',
    tags: ['WordPress', 'Headless CMS', 'Web Development']
  },
  {
    slug: 'mastering-tailwind-css-tips-and-tricks',
    title: 'Mastering Tailwind CSS: Tips and Tricks',
    date: '2024-04-15',
    author: 'Sam Lee',
    authorAvatar: 'https://placehold.co/40x40.png',
    dataAiHintAuthor: 'marketing expert',
    excerpt: 'Unlock the full potential of Tailwind CSS with these advanced tips, tricks, and best practices.',
    imageUrl: 'https://placehold.co/1200x600.png',
    dataAiHintImage: 'tailwind css code',
    category: 'Web Development',
    readTime: '6 min read',
    content: '<p>Content for Tailwind CSS tips...</p>',
    tags: ['Tailwind CSS', 'CSS', 'Frontend']
  },
  {
    slug: 'the-rise-of-server-components-in-nextjs',
    title: 'The Rise of Server Components in Next.js',
    date: '2024-04-02',
    author: 'Maria Rodriguez',
    authorAvatar: 'https://placehold.co/40x40.png',
    dataAiHintAuthor: 'software developer',
    excerpt: 'Understanding Next.js Server Components and how they are changing the landscape of React development.',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&h=600&fit=crop&q=80',
    category: 'Next.js',
    readTime: '8 min read',
    content: '<p>Content for Next.js Server Components...</p>',
    tags: ['Next.js', 'React', 'Server Components']
  },
  {
    slug: 'effective-content-strategy-for-saas-businesses',
    title: 'Effective Content Strategy for SaaS Businesses',
    date: '2024-03-20',
    author: 'Alex Chen',
    authorAvatar: 'https://placehold.co/40x40.png',
    dataAiHintAuthor: 'professional person',
    excerpt: 'Key elements of a successful content strategy tailored for SaaS companies looking to grow.',
    imageUrl: 'https://placehold.co/1200x600.png',
    dataAiHintImage: 'saas content strategy',
    category: 'Content Strategy',
    readTime: '7 min read',
    content: '<p>Content for SaaS content strategy...</p>',
    tags: ['SaaS', 'Content Marketing', 'Strategy']
  },
  {
    slug: 'optimizing-images-for-web-performance',
    title: 'Optimizing Images for Web Performance',
    date: '2024-03-05',
    author: 'Sam Lee',
    authorAvatar: 'https://placehold.co/40x40.png',
    dataAiHintAuthor: 'marketing expert',
    excerpt: 'Best practices for image optimization to improve website speed and user experience.',
    imageUrl: 'https://placehold.co/1200x600.png',
    dataAiHintImage: 'image optimization tools',
    category: 'Web Performance',
    readTime: '5 min read',
    content: '<p>Content for image optimization...</p>',
    tags: ['Web Performance', 'Image Optimization', 'SEO']
  },
  {
    slug: 'introduction-to-genkit-ai-for-nextjs-developers',
    title: 'Introduction to Genkit AI for Next.js Developers',
    date: '2024-02-18',
    author: 'Maria Rodriguez',
    authorAvatar: 'https://placehold.co/40x40.png',
    dataAiHintAuthor: 'software developer',
    excerpt: 'A beginner-friendly guide to integrating Genkit AI into your Next.js applications.',
    imageUrl: 'https://placehold.co/1200x600.png',
    dataAiHintImage: 'ai integration code',
    category: 'AI Development',
    readTime: '9 min read',
    content: '<p>Content for Genkit AI intro...</p>',
    tags: ['Genkit', 'AI', 'Next.js', 'Firebase']
  },
  {
    slug: 'creating-accessible-forms-a-practical-guide',
    title: 'Creating Accessible Forms: A Practical Guide',
    date: '2024-02-01',
    author: 'Alex Chen',
    authorAvatar: 'https://placehold.co/40x40.png',
    dataAiHintAuthor: 'professional person',
    excerpt: 'Step-by-step instructions on how to design and build web forms that are usable by everyone.',
    imageUrl: 'https://placehold.co/1200x600.png',
    dataAiHintImage: 'accessible form ui',
    category: 'Accessibility',
    readTime: '7 min read',
    content: '<p>Content for accessible forms guide...</p>',
    tags: ['Accessibility', 'Web Forms', 'UX']
  },
];


export async function generateStaticParams() {
  return blogPosts
    .filter(post => typeof post.slug === 'string' && post.slug.length > 0)
    .map((post) => ({
      slug: post.slug,
    }));
}

interface BlogPostPageProps {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function BlogPostPage({ params, searchParams }: BlogPostPageProps) {
  const { slug } = params;
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="bg-background/70 dark:bg-neutral-900/70 backdrop-blur-lg rounded-xl shadow-xl p-8 md:p-12 border border-white/10 dark:border-neutral-700/30">
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
      <header className="py-12 bg-secondary/70 dark:bg-secondary/70 backdrop-blur-lg border-b border-white/10 dark:border-neutral-700/30">
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
        <div className="max-w-3xl mx-auto bg-background/70 dark:bg-neutral-900/70 backdrop-blur-lg rounded-xl shadow-xl p-6 md:p-8 border border-white/10 dark:border-neutral-700/30">
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
