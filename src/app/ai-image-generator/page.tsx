
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { generateImage, GenerateImageInput } from '@/ai/flows/generate-image-flow';
import { Loader2, Sparkles, Image as ImageIcon } from 'lucide-react';
import NextImage from 'next/image'; // Renamed to avoid conflict with Lucide icon

const imageGeneratorSchema = z.object({
  prompt: z.string().min(5, { message: "Prompt must be at least 5 characters." }).max(1000, { message: "Prompt must not exceed 1000 characters." }),
});

type ImageGeneratorFormValues = z.infer<typeof imageGeneratorSchema>;

export default function AIImageGeneratorPage() {
  const [generatedImageDataUri, setGeneratedImageDataUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<ImageGeneratorFormValues>({
    resolver: zodResolver(imageGeneratorSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const onSubmit = async (data: ImageGeneratorFormValues) => {
    setIsLoading(true);
    setGeneratedImageDataUri(null);
    try {
      const input: GenerateImageInput = {
        prompt: data.prompt,
      };
      const result = await generateImage(input);
      if (result && result.imageDataUri) {
        setGeneratedImageDataUri(result.imageDataUri);
        toast({
          title: "Success!",
          description: "Image generated successfully.",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to generate image. The AI might not have returned a result.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("AI Image Generation Error:", error);
      let errorMessage = "An error occurred while generating the image. Please try again.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-background text-foreground">
      <header className="py-16 text-center bg-secondary border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 flex items-center justify-center">
            <Sparkles className="h-10 w-10 mr-3 text-primary" />
            AI Image Generator
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Bring your ideas to life! Describe an image, and our AI will generate it for you.
          </p>
        </div>
      </header>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          <Card data-interactive-cursor="true">
            <CardHeader>
              <CardTitle>Generate Your Image</CardTitle>
              <CardDescription>
                Enter a detailed prompt for the image you want to create.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="prompt-input" className="text-base font-medium">Image Prompt</Label>
                  <Input
                    id="prompt-input"
                    placeholder="e.g., A futuristic cityscape at sunset, neon lights, flying cars"
                    className="mt-2 text-base bg-background/80 dark:bg-neutral-800/80"
                    {...form.register("prompt")}
                  />
                  {form.formState.errors.prompt && (
                    <p className="text-sm text-destructive mt-1">{form.formState.errors.prompt.message}</p>
                  )}
                </div>
                <Button type="submit" className="w-full md:w-auto text-base py-3 px-6" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Generate Image
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {isLoading && (
             <Card className="mt-10">
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Loader2 className="mr-2 h-6 w-6 animate-spin text-primary" />
                        Generating Your Image...
                    </CardTitle>
                    <CardDescription>Please wait, this might take a few moments.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                        <ImageIcon className="h-16 w-16 text-muted-foreground animate-pulse" />
                    </div>
                </CardContent>
             </Card>
          )}

          {!isLoading && generatedImageDataUri && (
            <Card className="mt-10" data-interactive-cursor="true">
              <CardHeader>
                <CardTitle>Generated Image</CardTitle>
                <CardDescription>
                  Here's the image created by the AI based on your prompt.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video relative border rounded-md overflow-hidden shadow-lg">
                  <NextImage 
                    src={generatedImageDataUri} 
                    alt="AI generated image" 
                    layout="fill"
                    objectFit="contain" // Changed to contain to show full image without cropping
                    unoptimized={generatedImageDataUri.startsWith('data:')} // Important for data URIs
                  />
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-muted-foreground">Image generated using Gemini. Refresh the page or submit a new prompt to create another.</p>
              </CardFooter>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
