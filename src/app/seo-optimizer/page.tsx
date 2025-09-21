
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { rewriteCopyForSEO, RewriteCopyForSEOInput } from '@/ai/flows/seo-rewrite';
import { Loader2, Sparkles, Copy } from 'lucide-react';

const seoOptimizerSchema = z.object({
  text: z.string().min(10, { message: "Text must be at least 10 characters." }).max(5000, { message: "Text must not exceed 5000 characters." }),
  keywords: z.string().min(3, { message: "Keywords must be at least 3 characters." }).max(200, { message: "Keywords must not exceed 200 characters." }),
});

type SEOOptimizerFormValues = z.infer<typeof seoOptimizerSchema>;

export default function SEOOptimizerPage() {
  const [rewrittenText, setRewrittenText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<SEOOptimizerFormValues>({
    resolver: zodResolver(seoOptimizerSchema),
    defaultValues: {
      text: "",
      keywords: "",
    },
  });

  const onSubmit = async (data: SEOOptimizerFormValues) => {
    setIsLoading(true);
    setRewrittenText(null);
    try {
      const input: RewriteCopyForSEOInput = {
        text: data.text,
        keywords: data.keywords,
      };
      const result = await rewriteCopyForSEO(input);
      if (result && result.rewrittenText) {
        setRewrittenText(result.rewrittenText);
        // Toast for success is removed as per guidelines (only for errors)
      } else {
        toast({
          title: "Error Rewriting Text",
          description: "Failed to rewrite text. The AI might not have returned a result.",
          variant: "destructive",
        });
      }
    } catch (error) {
      let errorMessage = "An unexpected error occurred while rewriting the text. Please try again.";
       if (error instanceof Error) {
        errorMessage = error.message;
        if (error.cause && typeof error.cause === 'string') {
          errorMessage += ` (Cause: ${error.cause})`;
        } else if (error.cause && typeof (error.cause as any).message === 'string') {
          errorMessage += ` (Cause: ${(error.cause as any).message})`;
        }
      } else if (typeof error === 'object' && error !== null && 'message' in error) {
        errorMessage = String((error as {message: string}).message);
      }
      console.error("SEO Rewrite Error Details:", error);
      toast({
        title: "SEO Rewrite Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const handleCopyToClipboard = () => {
    if (rewrittenText) {
      try {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(rewrittenText).then(() => {
            toast({
              title: "Copied!",
              description: "Rewritten text copied to clipboard.",
            });
          });
        } else {
          // Fallback for non-secure contexts
          const textArea = document.createElement("textarea");
          textArea.value = rewrittenText;
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          toast({
            title: "Copied!",
            description: "Rewritten text copied to clipboard.",
          });
        }
      } catch (err) {
        console.error('Failed to copy text: ', err);
        toast({
          title: "Copy Failed",
          description: "Could not copy text to clipboard.",
          variant: "destructive",
        });
      }
    }
  };


  return (
    <div className="bg-background text-foreground">
      <header className="py-16 text-center bg-secondary border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 flex items-center justify-center">
            <Sparkles className="h-10 w-10 mr-3 text-primary" />
            AI SEO Optimizer
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Enhance your content for search engines. Enter your text and target keywords, and let our AI craft an optimized version.
          </p>
        </div>
      </header>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <Card data-interactive-cursor="true">
            <CardHeader>
              <CardTitle>Rewrite Your Content</CardTitle>
              <CardDescription>
                Provide the original text and the keywords you want to incorporate.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="text-input" className="text-base font-medium">Original Text</Label>
                  <Textarea
                    id="text-input"
                    placeholder="Paste your original content here..."
                    className="mt-2 min-h-[150px] text-base bg-background/80 dark:bg-neutral-800/80"
                    {...form.register("text")}
                  />
                  {form.formState.errors.text && (
                    <p className="text-sm text-destructive mt-1">{form.formState.errors.text.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="keywords-input" className="text-base font-medium">Target Keywords</Label>
                  <Input
                    id="keywords-input"
                    placeholder="e.g., web design, branding, Craft CMS"
                    className="mt-2 text-base bg-background/80 dark:bg-neutral-800/80"
                    {...form.register("keywords")}
                  />
                  {form.formState.errors.keywords && (
                    <p className="text-sm text-destructive mt-1">{form.formState.errors.keywords.message}</p>
                  )}
                   <p className="text-xs text-muted-foreground mt-1">Separate keywords with commas.</p>
                </div>
                <Button type="submit" className="w-full md:w-auto text-base py-3 px-6" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Optimizing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Rewrite with AI
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {rewrittenText && (
            <Card className="mt-10" data-interactive-cursor="true">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Optimized Content</CardTitle>
                  <CardDescription>
                    Here's the AI-powered rewritten version of your text.
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={handleCopyToClipboard}>
                  <Copy className="mr-2 h-4 w-4" /> Copy
                </Button>
              </Header>
              <CardContent>
                <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none p-4 border rounded-md bg-muted min-h-[150px] whitespace-pre-wrap">
                  {rewrittenText}
                </div>
              </CardContent>
               <CardFooter>
                <p className="text-xs text-muted-foreground">Review the rewritten text carefully and make any necessary adjustments to ensure it aligns with your brand voice and intent.</p>
              </CardFooter>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
