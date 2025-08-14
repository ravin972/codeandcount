
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
import { cn } from '@/lib/utils';
import { blogPosts as initialBlogPosts } from '@/lib/blog-data';

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
                 <Button
                    size="lg"
                    className={cn(
                        "group w-full max-w-xs mx-auto text-base py-3 px-8",
                        "transition-all duration-300 ease-in-out shadow-lg hover:shadow-2xl active:shadow-md transform hover:-translate-y-0.5 active:translate-y-px",
                        "bg-primary text-primary-foreground"
                    )}
                    data-interactive-cursor="true"
                  >
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
