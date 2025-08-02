
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquareQuote } from 'lucide-react';
import { testimonials as testimonialsData } from '@/app/page';

export default function TestimonialsPage() {
  return (
    <div className="bg-background text-foreground">
      <header className="py-16 md:py-24 text-center bg-secondary border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 flex items-center justify-center">
            <MessageSquareQuote className="h-12 w-12 mr-4 text-primary" />
            Client Voices
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Hear directly from our valued partners about their experiences working with CodeAndCount.com.
          </p>
        </div>
      </header>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-xl shadow-xl p-8 md:p-12 border border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonialsData.map((testimonial) => (
                <Card key={testimonial.name} className="shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1" data-interactive-cursor="true">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.dataAiHint} />
                        <AvatarFallback>{testimonial.name.substring(0,2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="text-lg font-semibold text-foreground">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                      </div>
                    </div>
                    <blockquote className="text-foreground italic border-l-4 border-primary pl-4 py-2">
                      "{testimonial.quote}"
                    </blockquote>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
