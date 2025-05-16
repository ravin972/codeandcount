
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
    imageUrl: 'https://images.unsplash.com/photo-1547398123-828a28902e57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxmdXR1cmlzdGljJTIwZGVzaWdufGVufDB8fHx8MTc0NzM3NjYzN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    dataAiHintImage: 'futuristic design',
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
    imageUrl: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxzZW8lMjBjaGFydCUyMGdyYXBofGVufDB8fHx8MTc0NzM3NjYzN3ww&ixlib=rb-4.1.0&q=80&w=1080',
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
    imageUrl: 'https://images.unsplash.com/photo-1698621193747-e8788c620dbc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxjbXMlMjBpbnRlcmZhY2V8ZW58MHx8fHwxNzQ3Mzc2NjM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
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
  {
    slug: 'ai-in-digital-marketing-the-new-frontier',
    title: 'AI in Digital Marketing: The New Frontier',
    date: '2024-05-22',
    author: 'Sam Lee',
    authorAvatar: 'https://placehold.co/40x40.png?text=SL',
    dataAiHintAuthor: 'marketing expert',
    excerpt: 'How AI is revolutionizing digital marketing strategies, from content creation to customer analytics.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHintImage: 'artificial intelligence marketing',
    category: 'Digital Marketing',
    readTime: '8 min read',
  },
  {
    slug: 'the-importance-of-user-experience-ux-in-web-design',
    title: 'The Importance of User Experience (UX) in Web Design',
    date: '2024-05-10',
    author: 'Alex Chen',
    authorAvatar: 'https://placehold.co/40x40.png?text=AC',
    dataAiHintAuthor: 'professional person',
    excerpt: 'A deep dive into why UX is paramount for website success and how to optimize it for your users.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHintImage: 'user experience interface',
    category: 'Web Design',
    readTime: '7 min read',
  },
  {
    slug: 'wordpress-vs-headless-cms-which-is-right-for-you',
    title: 'WordPress vs. Headless CMS: Which is Right for You?',
    date: '2024-04-28',
    author: 'Maria Rodriguez',
    authorAvatar: 'https://placehold.co/40x40.png?text=MR',
    dataAiHintAuthor: 'software developer',
    excerpt: 'Comparing traditional WordPress with modern headless CMS solutions to help you choose the best fit.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHintImage: 'cms comparison chart',
    category: 'CMS',
    readTime: '9 min read',
  },
  {
    slug: 'mastering-tailwind-css-tips-and-tricks',
    title: 'Mastering Tailwind CSS: Tips and Tricks',
    date: '2024-04-15',
    author: 'Sam Lee',
    authorAvatar: 'https://placehold.co/40x40.png?text=SL',
    dataAiHintAuthor: 'marketing expert',
    excerpt: 'Unlock the full potential of Tailwind CSS with these advanced tips, tricks, and best practices.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHintImage: 'tailwind css code',
    category: 'Web Development',
    readTime: '6 min read',
  },
  {
    slug: 'the-rise-of-server-components-in-nextjs',
    title: 'The Rise of Server Components in Next.js',
    date: '2024-04-02',
    author: 'Maria Rodriguez',
    authorAvatar: 'https://placehold.co/40x40.png?text=MR',
    dataAiHintAuthor: 'software developer',
    excerpt: 'Understanding Next.js Server Components and how they are changing the landscape of React development.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHintImage: 'nextjs server components',
    category: 'Next.js',
    readTime: '8 min read',
  },
  {
    slug: 'effective-content-strategy-for-saas-businesses',
    title: 'Effective Content Strategy for SaaS Businesses',
    date: '2024-03-20',
    author: 'Alex Chen',
    authorAvatar: 'https://placehold.co/40x40.png?text=AC',
    dataAiHintAuthor: 'professional person',
    excerpt: 'Key elements of a successful content strategy tailored for SaaS companies looking to grow.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHintImage: 'saas content strategy',
    category: 'Content Strategy',
    readTime: '7 min read',
  },
  {
    slug: 'optimizing-images-for-web-performance',
    title: 'Optimizing Images for Web Performance',
    date: '2024-03-05',
    author: 'Sam Lee',
    authorAvatar: 'https://placehold.co/40x40.png?text=SL',
    dataAiHintAuthor: 'marketing expert',
    excerpt: 'Best practices for image optimization to improve website speed and user experience.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHintImage: 'image optimization tools',
    category: 'Web Performance',
    readTime: '5 min read',
  },
  {
    slug: 'introduction-to-genkit-ai-for-nextjs-developers',
    title: 'Introduction to Genkit AI for Next.js Developers',
    date: '2024-02-18',
    author: 'Maria Rodriguez',
    authorAvatar: 'https://placehold.co/40x40.png?text=MR',
    dataAiHintAuthor: 'software developer',
    excerpt: 'A beginner-friendly guide to integrating Genkit AI into your Next.js applications.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHintImage: 'ai integration code',
    category: 'AI Development',
    readTime: '9 min read',
  },
  {
    slug: 'creating-accessible-forms-a-practical-guide',
    title: 'Creating Accessible Forms: A Practical Guide',
    date: '2024-02-01',
    author: 'Alex Chen',
    authorAvatar: 'https://placehold.co/40x40.png?text=AC',
    dataAiHintAuthor: 'professional person',
    excerpt: 'Step-by-step instructions on how to design and build web forms that are usable by everyone.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHintImage: 'accessible form ui',
    category: 'Accessibility',
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

    
