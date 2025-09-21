
"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bird, Play, RefreshCw, Gamepad2, AlertTriangle, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// Game Constants
const BIRD_SIZE = 30;
const GAME_WIDTH = 500;
const GAME_HEIGHT = 600;
const GRAVITY = 0.5;
const JUMP_STRENGTH = -8;
const PIPE_WIDTH = 60;
const PIPE_GAP = 180;
const PIPE_SPEED = 3;
const PIPE_INTERVAL = 1500; // ms

export default function FlappyBlockPage() {
    const [birdPosition, setBirdPosition] = useState(GAME_HEIGHT / 2 - BIRD_SIZE / 2);
    const [birdVelocity, setBirdVelocity] = useState(0);
    const [pipes, setPipes] = useState<{ x: number, topHeight: number }[]>([]);
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(true);
    const [gameStarted, setGameStarted] = useState(false);

    const gameLoopRef = useRef<number>();
    const pipeTimerRef = useRef<NodeJS.Timeout>();

    const startGame = useCallback(() => {
        setBirdPosition(GAME_HEIGHT / 2 - BIRD_SIZE / 2);
        setBirdVelocity(0);
        setPipes([]);
        setScore(0);
        setIsGameOver(false);
        setGameStarted(true);
    }, []);

    const gameLoop = useCallback(() => {
        if (isGameOver) return;

        // Bird physics
        setBirdVelocity(v => v + GRAVITY);
        setBirdPosition(p => {
            const newPos = p + birdVelocity;
            if (newPos > GAME_HEIGHT - BIRD_SIZE || newPos < 0) {
                setIsGameOver(true);
                return p;
            }
            return newPos;
        });

        // Pipe movement
        setPipes(currentPipes => {
            const newPipes = currentPipes.map(pipe => ({ ...pipe, x: pipe.x - PIPE_SPEED }));
            
            // Check for collision
            const currentPipe = newPipes[0];
            if (currentPipe) {
                const birdLeft = GAME_WIDTH / 4;
                const birdRight = birdLeft + BIRD_SIZE;
                const pipeLeft = currentPipe.x;
                const pipeRight = currentPipe.x + PIPE_WIDTH;

                if (birdRight > pipeLeft && birdLeft < pipeRight) {
                    if (birdPosition < currentPipe.topHeight || birdPosition + BIRD_SIZE > currentPipe.topHeight + PIPE_GAP) {
                        setIsGameOver(true);
                    }
                }

                // Scoring
                if (currentPipe.x + PIPE_WIDTH < birdLeft && !currentPipe.passed) {
                    setScore(s => s + 1);
                    return newPipes.map((p, i) => i === 0 ? { ...p, passed: true } : p);
                }
            }

            return newPipes.filter(pipe => pipe.x > -PIPE_WIDTH);
        });

        gameLoopRef.current = requestAnimationFrame(gameLoop);
    }, [isGameOver, birdVelocity, birdPosition]);

    const flap = useCallback(() => {
        if (!isGameOver && gameStarted) {
            setBirdVelocity(JUMP_STRENGTH);
        }
    }, [isGameOver, gameStarted]);

    useEffect(() => {
        if (!isGameOver && gameStarted) {
            gameLoopRef.current = requestAnimationFrame(gameLoop);
        }
        return () => {
            if (gameLoopRef.current) {
                cancelAnimationFrame(gameLoopRef.current);
            }
        };
    }, [gameStarted, isGameOver, gameLoop]);

    useEffect(() => {
        if (!isGameOver && gameStarted) {
            pipeTimerRef.current = setInterval(() => {
                const topHeight = Math.random() * (GAME_HEIGHT - PIPE_GAP - 100) + 50;
                setPipes(p => [...p, { x: GAME_WIDTH, topHeight }]);
            }, PIPE_INTERVAL);
        }
        return () => {
            if (pipeTimerRef.current) {
                clearInterval(pipeTimerRef.current);
            }
        };
    }, [gameStarted, isGameOver]);
    
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.code === 'Space' || e.key === ' ') {
                e.preventDefault();
                if (isGameOver) {
                    startGame();
                } else {
                    flap();
                }
            }
        };
        const handleTouch = () => {
            if (isGameOver) {
                startGame();
            } else {
                flap();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        window.addEventListener('touchstart', handleTouch);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
            window.removeEventListener('touchstart', handleTouch);
        };
    }, [isGameOver, flap, startGame]);

    return (
        <div className="bg-background text-foreground min-h-screen py-8 flex flex-col items-center justify-center">
             <header className="text-center mb-6 w-full max-w-lg px-4">
                <div className="bg-secondary rounded-xl shadow-xl p-6 border border-border">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight flex items-center justify-center">
                        <Bird className="h-10 w-10 mr-3 text-primary" />
                        FLAPPY BLOCK
                    </h1>
                </div>
            </header>

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-lg w-full">
                <Card className="text-center" data-interactive-cursor="true">
                    {!gameStarted || isGameOver ? (
                        <CardContent className="pt-6">
                            <CardTitle className="text-3xl mb-4">
                                {gameStarted && isGameOver ? <AlertTriangle className="inline h-8 w-8 mr-2 text-destructive" /> : <Gamepad2 className="inline h-8 w-8 mr-2 text-primary" />}
                                {gameStarted && isGameOver ? "GAME OVER" : "Ready to Play?"}
                            </CardTitle>
                            {gameStarted && isGameOver && (
                                <CardDescription className="text-xl mt-2">
                                    Your Score: {score}
                                </CardDescription>
                            )}
                            {!gameStarted && (
                                <CardDescription className="text-md text-muted-foreground pt-2 max-w-sm mx-auto">
                                    Click, touch, or press Spacebar to flap the block and navigate through the pipes.
                                </CardDescription>
                            )}
                            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                                <Button size="lg" onClick={startGame}>
                                    {gameStarted && isGameOver ? <RefreshCw className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
                                    {gameStarted && isGameOver ? "Play Again" : "Start Game"}
                                </Button>
                                <Button size="lg" variant="outline" asChild>
                                    <Link href="/games"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Games</Link>
                                </Button>
                            </div>
                        </CardContent>
                    ) : (
                        <CardContent className="pt-6 relative" style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}>
                            <div className="absolute top-4 right-4 text-3xl font-bold text-white" style={{ textShadow: '2px 2px 4px #000' }}>{score}</div>
                            <div 
                                className="absolute bg-primary rounded"
                                style={{
                                    left: GAME_WIDTH / 4,
                                    top: birdPosition,
                                    width: BIRD_SIZE,
                                    height: BIRD_SIZE,
                                    transition: 'top 0.05s linear'
                                }}
                            />
                            {pipes.map((pipe, i) => (
                                <React.Fragment key={i}>
                                    <div
                                        className="absolute bg-green-600 border-2 border-green-800 rounded-t"
                                        style={{
                                            left: pipe.x,
                                            top: 0,
                                            width: PIPE_WIDTH,
                                            height: pipe.topHeight
                                        }}
                                    />
                                    <div
                                        className="absolute bg-green-600 border-2 border-green-800 rounded-b"
                                        style={{
                                            left: pipe.x,
                                            top: pipe.topHeight + PIPE_GAP,
                                            width: PIPE_WIDTH,
                                            height: GAME_HEIGHT - pipe.topHeight - PIPE_GAP
                                        }}
                                    />
                                </React.Fragment>
                            ))}
                        </CardContent>
                    )}
                </Card>
            </main>
        </div>
    );
}

