"use client";

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Gamepad2, Eye, Bird, Rows, Sparkles, Construction, ArrowRight, ToyBrick } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const games = [
  {
    title: 'Super Retro Platformer',
    description: 'Jump and run through a classic-style platformer world. Stomp on enemies, collect coins, and reach the flagpole!',
    icon: <ToyBrick className="h-10 w-10 text-primary" />,
    href: '/games/super-retro-platformer',
    status: 'available',
  },
  {
    title: 'Hex Test',
    description: 'How sharp is your color vision? Find the hexagon with the slightly different shade before time runs out. It gets harder each level!',
    icon: <Eye className="h-10 w-10 text-primary" />,
    href: '/games/hex-test',
    status: 'available',
  },
  {
    title: 'Flappy Bird',
    description: 'Navigate the bird through a series of pipes. A simple yet maddeningly addictive test of your timing and reflexes.',
    icon: <Bird className="h-10 w-10 text-primary" />,
    href: '/games/flappy-block',
    status: 'available',
  },
  {
    title: 'Blocktris',
    description: 'The timeless puzzle game of falling blocks. Arrange the geometric shapes to clear lines and score points. How long can you last?',
    icon: <Rows className="h-10 w-10 text-primary" />,
    href: '/games/blocktris',
    status: 'available',
  },
];

export default function GamesPage() {
  return (
    <div className="bg-background text-foreground">
      <header className="py-16 md:py-24 text-center bg-secondary border-b border-border relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-accent/5 -z-1"
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 flex items-center justify-center">
            <Gamepad2 className="h-12 w-12 mr-4 text-primary" />
            Retro Game Zone
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Take a break and dive into some classic retro games. Built for fun, right here in your browser.
          </p>
        </div>
      </header>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.map((game) => (
              <Card
                key={game.title}
                className={cn(
                  "flex flex-col shadow-lg transition-all duration-300 ease-in-out",
                  game.status === 'available' ? 'hover:shadow-xl hover:-translate-y-1' : 'opacity-70 bg-secondary/50'
                )}
                data-interactive-cursor={game.status === 'available'}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    {game.icon}
                    {game.status === 'coming-soon' && (
                      <Badge variant="outline">
                        <Construction className="h-3 w-3 mr-1.5" />
                        Coming Soon
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-2xl font-semibold pt-2">{game.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription>{game.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  {game.status === 'available' ? (
                    <Button asChild className="w-full group">
                      <Link href={game.href}>
                        Play Game <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  ) : (
                    <Button className="w-full" disabled>
                      Coming Soon
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
