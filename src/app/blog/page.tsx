
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CalendarDays, ArrowRight, Newspaper, Clock3, Dot, PlusCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const initialBlogPosts = [
  {
    slug: 'the-future-of-web-design-trends-for-2024',
    title: 'The Future of Web Design: Trends for 2024',
    date: '2024-07-15',
    author: 'Alex Chen',
    authorAvatar: 'https://placehold.co/40x40.png',
    dataAiHintAuthor: 'professional person',
    excerpt: 'Discover the cutting-edge web design trends shaping the digital landscape in 2024, from AI integration to immersive experiences.',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=400&fit=crop&q=80',
    category: 'Web Design',
    readTime: '6 min read',
    content: `<p>The world of web design is in constant flux, driven by technological advancements and evolving user expectations. As we look ahead to 2024, several key trends are set to redefine how we create and interact with websites.</p><h2 class="text-2xl font-semibold my-4">1. AI-Powered Design and Personalization</h2><p>Artificial intelligence is no longer a futuristic concept but a practical tool in a designer's arsenal. AI can assist in generating design layouts, suggesting color palettes, and even creating A/B testing variations. More importantly, AI will enable hyper-personalization, tailoring website content and experiences to individual users in real-time.</p><h2 class="text-2xl font-semibold my-4">2. Immersive 3D Graphics and WebGL</h2><p>With advancements in browser capabilities and technologies like WebGL, expect to see more websites incorporating immersive 3D graphics and interactive elements. This trend moves beyond flat design, offering users more engaging and memorable experiences.</p><h2 class="text-2xl font-semibold my-4">3. Microinteractions and Delightful Details</h2><p>Subtle animations, hover effects, and thoughtful microinteractions will continue to be crucial for enhancing user experience. These small details can significantly improve usability and add a touch of personality to a website, making interactions more intuitive and enjoyable.</p><h2 class="text-2xl font-semibold my-4">4. Accessibility and Inclusive Design</h2><p>Designing for everyone is not just a trend but a necessity. In 2024, there will be an even stronger emphasis on creating accessible websites that cater to users of all abilities. This includes considerations for WCAG compliance, keyboard navigation, screen reader compatibility, and more.</p><h2 class="text-2xl font-semibold my-4">5. Sustainable Web Design</h2><p>As environmental concerns grow, sustainable web design practices are gaining traction. This involves optimizing websites for performance to reduce energy consumption, choosing eco-friendly hosting, and designing with efficiency in mind.</p><p>Staying ahead of these trends will be key for businesses and designers looking to create impactful and effective digital presences in the coming year.</p>`,
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
    authorAvatar: 'https://placehold.co/40x40.png', dataAiHintAuthor: 'professional person',
    excerpt: 'Learn the fundamental principles of creating a memorable and effective brand identity that resonates with your target audience.',
    imageUrl: 'https://placehold.co/600x400.png', dataAiHintImage: 'brand moodboard',
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
    authorAvatar: 'https://placehold.co/40x40.png', dataAiHintAuthor: 'marketing expert',
    excerpt: 'How AI is revolutionizing digital marketing strategies, from content creation to customer analytics.',
    imageUrl: 'https://placehold.co/600x400.png', dataAiHintImage: 'artificial intelligence marketing',
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
    authorAvatar: 'https://placehold.co/40x40.png', dataAiHintAuthor: 'professional person',
    excerpt: 'A deep dive into why UX is paramount for website success and how to optimize it for your users.',
    imageUrl: 'https://placehold.co/600x400.png', dataAiHintImage: 'user experience interface',
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
    authorAvatar: 'https://placehold.co/40x40.png', dataAiHintAuthor: 'software developer',
    excerpt: 'Comparing traditional WordPress with modern headless CMS solutions to help you choose the best fit.',
    imageUrl: 'https://placehold.co/600x400.png', dataAiHintImage: 'cms comparison chart',
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
    authorAvatar: 'https://placehold.co/40x40.png', dataAiHintAuthor: 'marketing expert',
    excerpt: 'Unlock the full potential of Tailwind CSS with these advanced tips, tricks, and best practices.',
    imageUrl: 'https://placehold.co/600x400.png', dataAiHintImage: 'tailwind css code',
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
    authorAvatar: 'https://placehold.co/40x40.png', dataAiHintAuthor: 'software developer',
    excerpt: 'Understanding Next.js Server Components and how they are changing the landscape of React development.',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=400&fit=crop&q=80',
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
    authorAvatar: 'https://placehold.co/40x40.png', dataAiHintAuthor: 'professional person',
    excerpt: 'Key elements of a successful content strategy tailored for SaaS companies looking to grow.',
    imageUrl: 'https://placehold.co/600x400.png', dataAiHintImage: 'saas content strategy',
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
    authorAvatar: 'https://placehold.co/40x40.png', dataAiHintAuthor: 'marketing expert',
    excerpt: 'Best practices for image optimization to improve website speed and user experience.',
    imageUrl: 'https://placehold.co/600x400.png', dataAiHintImage: 'image optimization tools',
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
    authorAvatar: 'https://placehold.co/40x40.png', dataAiHintAuthor: 'software developer',
    excerpt: 'A beginner-friendly guide to integrating Genkit AI into your Next.js applications.',
    imageUrl: 'https://placehold.co/600x400.png', dataAiHintImage: 'ai integration code',
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
    authorAvatar: 'https://placehold.co/40x40.png', dataAiHintAuthor: 'professional person',
    excerpt: 'Step-by-step instructions on how to design and build web forms that are usable by everyone.',
    imageUrl: 'https://placehold.co/600x400.png', dataAiHintImage: 'accessible form ui',
    category: 'Accessibility',
    readTime: '7 min read',
    content: '<p>Content for accessible forms guide...</p>',
    tags: ['Accessibility', 'Web Forms', 'UX']
  },
];

const newPostSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long."),
  content: z.string().min(50, "Content must be at least 50 characters long."),
  author: z.string().min(2, "Author name must be at least 2 characters long."),
  category: z.string().min(2, "Category must be at least 2 characters long."),
});
type NewPostFormValues = z.infer<typeof newPostSchema>;

// Helper to generate a simple slug
const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-')       // Replace spaces with -
    .replace(/[^\w-]+/g, '')  // Remove all non-word chars
    .replace(/--+/g, '-')      // Replace multiple - with single -
    .replace(/^-+/, '')        // Trim - from start of text
    .replace(/-+$/, '');       // Trim - from end of text
};

export default function BlogPage() {
  const [posts, setPosts] = useState(initialBlogPosts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<NewPostFormValues>({
    resolver: zodResolver(newPostSchema),
    defaultValues: {
      title: "",
      content: "",
      author: "Your Name", // Default author
      category: "General",
    },
  });

  const onSubmit = (data: NewPostFormValues) => {
    const newSlug = generateSlug(data.title);
    const newPost = {
      slug: newSlug,
      title: data.title,
      excerpt: data.content.substring(0, 150) + "...", 
      content: `<p>${data.content.replace(/\n/g, '</p><p>')}</p>`,
      author: data.author,
      authorAvatar: 'https://placehold.co/40x40.png', 
      dataAiHintAuthor: 'person',
      imageUrl: 'https://placehold.co/600x400.png', 
      dataAiHintImage: 'abstract background',
      category: data.category,
      date: new Date().toISOString().split('T')[0], 
      readTime: `${Math.ceil(data.content.split(/\s+/).length / 200)} min read`,
      tags: [data.category, "User Submitted"],
    };

    setPosts(prevPosts => [newPost, ...prevPosts]);
    toast({
      title: "Blog Post Added (Session Only)",
      description: "Your new blog post has been added to the list for this session. It will be lost on page refresh.",
    });
    form.reset();
    setIsDialogOpen(false);
  };


  return (
    <div className="bg-background text-foreground">
      <header className="py-16 md:py-24 text-center bg-secondary border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight flex items-center justify-center">
              <Newspaper className="h-12 w-12 mr-4 text-primary" />
              CodeAndCount Insights
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Stay updated with the latest trends, tips, and thoughts from the CodeAndCount.com team.
          </p>
          
          <div className="mt-8 flex justify-center">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="default" size="lg" className="rounded-full">
                  <PlusCircle className="mr-2 h-5 w-5" /> Create New Post
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create a New Blog Post</DialogTitle>
                  <DialogDescription>
                    Fill in the details for your new blog post. Remember, this post is only for the current session and won't be saved permanently.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">Title</Label>
                    <Input id="title" {...form.register("title")} className="col-span-3" placeholder="Your amazing blog post title" />
                    {form.formState.errors.title && <p className="col-span-4 text-sm text-destructive text-right">{form.formState.errors.title.message}</p>}
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="author" className="text-right">Author</Label>
                    <Input id="author" {...form.register("author")} className="col-span-3" placeholder="Your name" />
                     {form.formState.errors.author && <p className="col-span-4 text-sm text-destructive text-right">{form.formState.errors.author.message}</p>}
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">Category</Label>
                    <Input id="category" {...form.register("category")} className="col-span-3" placeholder="e.g., Web Development" />
                    {form.formState.errors.category && <p className="col-span-4 text-sm text-destructive text-right">{form.formState.errors.category.message}</p>}
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="content" className="text-right pt-2">Content</Label>
                    <Textarea id="content" {...form.register("content")} className="col-span-3 min-h-[150px]" placeholder="Write your blog post content here..." />
                    {form.formState.errors.content && <p className="col-span-4 text-sm text-destructive text-right">{form.formState.errors.content.message}</p>}
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                       <Button type="button" variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" disabled={form.formState.isSubmitting}>
                      {form.formState.isSubmitting ? "Publishing..." : "Publish Post"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
           <div className="bg-card rounded-xl shadow-xl p-8 md:p-12 border border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Card key={post.slug} className="overflow-hidden flex flex-col group shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1" data-interactive-cursor="true">
                  <Link href={`/blog/${post.slug}`} className="block ripple-container">
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
        </div>
      </section>
    </div>
  );
}
