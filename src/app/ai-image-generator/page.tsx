
"use client";

import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { generateImage, GenerateImageInput } from '@/ai/flows/generate-image-flow';
import { Loader2, Sparkles, Image as ImageIcon, Download, RefreshCw, Hourglass, Activity, History } from 'lucide-react';
import NextImage from 'next/image';
import { Progress } from '@/components/ui/progress';
import { useApiUsageTracker } from '@/hooks/use-api-usage-tracker';

const imageGeneratorSchema = z.object({
  prompt: z.string().min(5, { message: "Prompt must be at least 5 characters." }).max(1000, { message: "Prompt must not exceed 1000 characters." }),
});

type ImageGeneratorFormValues = z.infer<typeof imageGeneratorSchema>;

interface QueuedPrompt {
  id: number;
  prompt: string;
}

interface CachedImage {
    imageDataUri: string;
    timestamp: number;
}

const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds
const CACHE_KEY = 'imageGeneratorCache';

export default function AIImageGeneratorPage() {
  const [generatedImageDataUri, setGeneratedImageDataUri] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [retryDelay, setRetryDelay] = useState(0);
  const [maxDelay, setMaxDelay] = useState(0);
  const [promptQueue, setPromptQueue] = useState<QueuedPrompt[]>([]);
  const [currentlyProcessing, setCurrentlyProcessing] = useState<QueuedPrompt | null>(null);
  const { usage, incrementUsage, timeUntilReset, DAILY_LIMIT } = useApiUsageTracker('imageGenerator');

  const retryIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const nextId = useRef(0);
  const { toast } = useToast();

  const form = useForm<ImageGeneratorFormValues>({
    resolver: zodResolver(imageGeneratorSchema),
    defaultValues: { prompt: "" },
  });
  
  // --- Caching Logic ---
  const getCache = (): Record<string, CachedImage> => {
    try {
        const cached = localStorage.getItem(CACHE_KEY);
        return cached ? JSON.parse(cached) : {};
    } catch (error) {
        console.error("Failed to read from cache:", error);
        return {};
    }
  };

  const setCache = (prompt: string, imageDataUri: string) => {
    try {
        const cache = getCache();
        cache[prompt] = { imageDataUri, timestamp: Date.now() };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    } catch (error) {
        console.error("Failed to write to cache:", error);
    }
  };


  // Effect to manage the retry delay countdown
  useEffect(() => {
    if (retryDelay > 0) {
      retryIntervalRef.current = setInterval(() => {
        setRetryDelay(prev => Math.max(0, prev - 1));
      }, 1000);
    } else {
      if (retryIntervalRef.current) {
        clearInterval(retryIntervalRef.current);
      }
    }
    return () => {
      if (retryIntervalRef.current) {
        clearInterval(retryIntervalRef.current);
      }
    };
  }, [retryDelay]);

  // Effect to process the queue
  useEffect(() => {
    if (!isProcessing && promptQueue.length > 0 && retryDelay <= 0) {
      const nextPrompt = promptQueue[0];
      setPromptQueue(prev => prev.slice(1));
      processPrompt(nextPrompt);
    }
  }, [isProcessing, promptQueue, retryDelay]);

  const processPrompt = async (queuedPrompt: QueuedPrompt) => {
    setIsProcessing(true);
    setGeneratedImageDataUri(null);
    setCurrentlyProcessing(queuedPrompt);
    incrementUsage();

    try {
      const input: GenerateImageInput = { prompt: queuedPrompt.prompt };
      const result = await generateImage(input);
      if (result && result.imageDataUri) {
        setGeneratedImageDataUri(result.imageDataUri);
        setCache(queuedPrompt.prompt, result.imageDataUri); // Save successful result to cache
        setCurrentlyProcessing(null); // Success, clear current
      } else {
        throw new Error("The AI did not return a valid image. Please try a different prompt.");
      }
    } catch (error) {
      let errorMessage = "An unexpected error occurred. Please try again.";
      let isRateLimitError = false;

      if (error instanceof Error && (error.message.includes("429") || error.message.includes("rate limit"))) {
        isRateLimitError = true;
        const retryMatch = error.message.match(/Please retry in ([\d.]+)s/);
        let delay = 30;
        if (retryMatch && retryMatch[1]) {
          delay = Math.ceil(parseFloat(retryMatch[1]));
        }
        setRetryDelay(delay);
        setMaxDelay(delay);
        errorMessage = `API limit reached. Your request has been re-queued. Please wait.`;
        // Re-add the failed prompt to the front of the queue
        setPromptQueue(prev => [queuedPrompt, ...prev]);
        setCurrentlyProcessing(null); // Clear current, as it's re-queued
      } else {
        // For non-rate-limit errors, we don't re-queue
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        setCurrentlyProcessing(null);
      }
      
      console.error("AI Image Generation Error Details:", error);

      toast({
        title: isRateLimitError ? "Rate Limit Reached" : "Image Generation Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const onSubmit = async (data: ImageGeneratorFormValues) => {
    // Check cache first
    const cache = getCache();
    const cachedItem = cache[data.prompt];
    if (cachedItem && (Date.now() - cachedItem.timestamp < CACHE_TTL)) {
      setGeneratedImageDataUri(cachedItem.imageDataUri);
      toast({
        title: "Cached Result",
        description: "This image was retrieved from the cache and didn't use your API quota.",
      });
      form.reset();
      return;
    }

    const newQueuedPrompt: QueuedPrompt = {
      id: nextId.current++,
      prompt: data.prompt,
    };
    setPromptQueue(prev => [...prev, newQueuedPrompt]);
    form.reset();
  };

  const handleDownloadImage = () => {
    if (!generatedImageDataUri) return;
    try {
      const link = document.createElement('a');
      link.href = generatedImageDataUri;
      const mimeType = generatedImageDataUri.substring(generatedImageDataUri.indexOf(':') + 1, generatedImageDataUri.indexOf(';'));
      const extension = mimeType.split('/')[1] || 'png';
      link.download = `ai-generated-image-${Date.now()}.${extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Download Failed",
        description: "Could not download the image. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getQueuePosition = (id: number) => {
    return promptQueue.findIndex(p => p.id === id) + 1;
  };
  
  const totalQueueLength = (isProcessing ? 1 : 0) + promptQueue.length;
  const estimatedWaitTime = (promptQueue.length * 15) + retryDelay; // Avg 15s per request + retry delay

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
                Enter a detailed prompt. Your request will be added to a queue and processed.
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
                <Button type="submit" className="w-full md:w-auto text-base py-3 px-6" disabled={isProcessing && retryDelay > 0}>
                   <Sparkles className="mr-2 h-5 w-5" />
                   Add to Queue
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <Card className="mt-10">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2 h-6 w-6 text-primary" />
                Daily Usage Statistics
              </CardTitle>
              <CardDescription>
                This is a client-side estimate of your daily API requests.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm font-medium">
                  <span>Requests Used Today:</span>
                  <span className="text-foreground">{usage.count} / {DAILY_LIMIT}</span>
                </div>
                <Progress value={(usage.count / DAILY_LIMIT) * 100} className="w-full h-2" />
                <div className="text-xs text-muted-foreground text-center">
                  Quota resets in {timeUntilReset}
                </div>
              </div>
            </CardContent>
          </Card>

          {(isProcessing || promptQueue.length > 0 || retryDelay > 0) && (
            <Card className="mt-10">
                <CardHeader>
                    <CardTitle className="flex items-center">
                      {isProcessing ? <Loader2 className="mr-2 h-6 w-6 animate-spin text-primary" /> : <Hourglass className="mr-2 h-6 w-6 text-primary" />}
                      {retryDelay > 0 ? "Rate Limit Reached - Paused" : (isProcessing ? "Processing Request..." : "Request Queued")}
                    </CardTitle>
                    <CardDescription>
                       {totalQueueLength} {totalQueueLength > 1 ? 'requests' : 'request'} in queue. Estimated wait: {estimatedWaitTime}s
                    </CardDescription>
                </CardHeader>
                <CardContent>
                   {retryDelay > 0 && (
                     <>
                      <Label className="text-sm text-muted-foreground">Waiting for API... ({retryDelay}s)</Label>
                      <Progress value={((maxDelay - retryDelay) / maxDelay) * 100} className="w-full mt-2 h-2" />
                     </>
                   )}
                   <div className="mt-4 space-y-2">
                    {currentlyProcessing && (
                      <div className="p-3 bg-primary/10 rounded-md">
                        <p className="font-semibold text-primary">Now Processing:</p>
                        <p className="text-sm text-muted-foreground truncate">"{currentlyProcessing.prompt}"</p>
                      </div>
                    )}
                    {promptQueue.map((item, index) => (
                      <div key={item.id} className="p-3 bg-muted/50 rounded-md">
                        <p className="font-semibold">#{index + 1} in Queue:</p>
                        <p className="text-sm text-muted-foreground truncate">"{item.prompt}"</p>
                      </div>
                    ))}
                   </div>
                </CardContent>
             </Card>
          )}

          {!isProcessing && generatedImageDataUri && (
            <Card className="mt-10" data-interactive-cursor="true">
              <CardHeader>
                <CardTitle>Generated Image</CardTitle>
                <CardDescription>
                  Here's the image created by the AI based on your prompt.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full aspect-video relative border rounded-md overflow-hidden shadow-lg">
                  <NextImage 
                    src={generatedImageDataUri} 
                    alt="AI generated image" 
                    fill
                    style={{objectFit: 'contain'}}
                    unoptimized={generatedImageDataUri.startsWith('data:')} 
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <Button onClick={handleDownloadImage} variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download Image
                </Button>
                <p className="text-xs text-muted-foreground text-center sm:text-right">
                  Image generated using Gemini. Submit a new prompt to create another.
                </p>
              </CardFooter>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
