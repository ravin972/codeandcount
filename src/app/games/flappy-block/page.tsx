"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bird, Play, RefreshCw, Gamepad2, AlertTriangle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// --- Game Configuration ---
let canvasWidth: number, canvasHeight: number;
const birdWidth = 44;
const birdHeight = 34;
const pipeWidth = 80;
const pipeGap = 200;
const gravity = 0.5;
const flapStrength = 9;
const pipeSpeed = 4;
const groundHeight = 60;
let pipeSpawnInterval = 100; // frames

export default function FlappyBlockPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const gameLoopRef = useRef<number>();
    const birdRef = useRef<any>();
    const pipesRef = useRef<any[]>([]);
    const frameCountRef = useRef(0);
    const groundXRef = useRef(0);

    const [score, setScore] = useState(0);
    const [gameState, setGameState] = useState<'start' | 'playing' | 'gameOver'>('start');

    // --- Bird Class ---
    class BirdClass {
        x: number;
        y: number;
        velocity: number;

        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
            this.velocity = 0;
        }

        draw(ctx: CanvasRenderingContext2D, frameCount: number) {
            ctx.save();
            ctx.translate(this.x + birdWidth / 2, this.y + birdHeight / 2);
            const rotation = Math.atan(this.velocity / 15);
            ctx.rotate(rotation);

            // Body
            ctx.fillStyle = '#facc15'; // yellow-400
            ctx.beginPath();
            ctx.ellipse(0, 0, birdWidth / 2, birdHeight / 2, 0, 0, Math.PI * 2);
            ctx.fill();

            // Wing
            const wingAngle = Math.sin(frameCount * 0.4) * 0.5;
            ctx.fillStyle = '#fbbf24'; // amber-400
            ctx.beginPath();
            ctx.moveTo(-8, 0);
            ctx.quadraticCurveTo(0, -15 + wingAngle * 10, 15, 0);
            ctx.closePath();
            ctx.fill();

            // Eye
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(8, -4, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = 'black';
            ctx.beginPath();
            ctx.arc(9, -4, 2, 0, Math.PI * 2);
            ctx.fill();

            // Beak
            ctx.fillStyle = '#f97316'; // orange-500
            ctx.beginPath();
            ctx.moveTo(18, 0);
            ctx.lineTo(28, -3);
            ctx.lineTo(28, 3);
            ctx.closePath();
            ctx.fill();

            ctx.restore();
        }

        update() {
            this.velocity += gravity;
            this.y += this.velocity;
        }

        flap() {
            this.velocity = -flapStrength;
        }
    }

    // --- Pipe Class ---
    class PipeClass {
        x: number;
        y: number;
        width: number;
        height: number;
        passed: boolean;
        isTop: boolean;

        constructor(isTop: boolean, height: number) {
            this.x = canvasWidth;
            this.y = isTop ? 0 : canvasHeight - height;
            this.width = pipeWidth;
            this.height = height;
            this.passed = false;
            this.isTop = isTop;
        }

        draw(ctx: CanvasRenderingContext2D) {
            const gradient = ctx.createLinearGradient(this.x, 0, this.x + this.width, 0);
            gradient.addColorStop(0, '#16a34a'); // green-600
            gradient.addColorStop(0.5, '#4ade80'); // green-400
            gradient.addColorStop(1, '#16a34a');
            ctx.fillStyle = gradient;
            ctx.fillRect(this.x, this.y, this.width, this.height);

            const rimHeight = 30;
            const rimY = this.isTop ? this.height - rimHeight : this.y;
            ctx.fillRect(this.x - 5, rimY, this.width + 10, rimHeight);

            ctx.strokeStyle = '#14532d'; // green-900
            ctx.lineWidth = 4;
            ctx.strokeRect(this.x, this.y, this.width, this.height);
            ctx.strokeRect(this.x - 5, rimY, this.width + 10, rimHeight);
        }

        update() {
            this.x -= pipeSpeed;
        }
    }

    const initializeGame = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const aspectRatio = 9 / 16;
        const parent = canvas.parentElement;
        if (!parent) return;

        const maxHeight = parent.clientHeight;
        const maxWidth = parent.clientWidth;
        
        canvasHeight = maxHeight;
        canvasWidth = Math.min(maxWidth, canvasHeight * aspectRatio);

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        birdRef.current = new BirdClass(canvasWidth / 4, canvasHeight / 2);
        pipesRef.current = [];
        setScore(0);
        frameCountRef.current = 0;
        groundXRef.current = 0;
        setGameState('start');
    }, []);

    const gameLoop = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx || !canvas) return;

        const bird = birdRef.current;
        const pipes = pipesRef.current;
        let localFrameCount = frameCountRef.current;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        
        // Draw Background
        const bgGradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
        bgGradient.addColorStop(0, '#38bdf8'); // sky-400
        bgGradient.addColorStop(1, '#7dd3fc'); // sky-300
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        
        ctx.fillStyle = '#a16207'; // yellow-700
        ctx.fillRect(0, canvasHeight - groundHeight, canvasWidth, groundHeight);
        
        ctx.fillStyle = '#16a34a'; // green-600
        for (let i = 0; i < canvasWidth / 10 + 2; i++) {
            const x = (i * 20 - groundXRef.current % 20);
            ctx.beginPath();
            ctx.moveTo(x, canvasHeight - groundHeight);
            ctx.lineTo(x + 10, canvasHeight - groundHeight - 10);
            ctx.lineTo(x + 20, canvasHeight - groundHeight);
            ctx.fill();
        }

        pipes.forEach(pipe => pipe.draw(ctx));
        bird.draw(ctx, localFrameCount);

        if (gameState === 'playing') {
            localFrameCount++;
            bird.update();
            groundXRef.current = (groundXRef.current + pipeSpeed / 2) % canvasWidth;

            if (localFrameCount % pipeSpawnInterval === 0) {
                const minHeight = 60;
                const maxHeight = canvasHeight - pipeGap - minHeight - groundHeight;
                const topPipeHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
                const bottomPipeHeight = canvasHeight - topPipeHeight - pipeGap - groundHeight;
                pipes.push(new PipeClass(true, topPipeHeight));
                pipes.push(new PipeClass(false, bottomPipeHeight));
            }

            for (let i = pipes.length - 1; i >= 0; i--) {
                pipes[i].update();
                if (pipes[i].x + pipeWidth < 0) {
                    pipes.splice(i, 1);
                }
            }

            // Collision check
            if (bird.y + birdHeight / 2 > canvasHeight - groundHeight || bird.y - birdHeight / 2 < 0) {
                setGameState('gameOver');
            }
            for (const pipe of pipes) {
                if (
                    bird.x < pipe.x + pipe.width &&
                    bird.x + birdWidth > pipe.x &&
                    bird.y < pipe.y + pipe.height &&
                    bird.y + birdHeight > pipe.y
                ) {
                    setGameState('gameOver');
                }
            }

            // Update score
            let newScore = 0;
            for (const pipe of pipes) {
                if (!pipe.passed && pipe.x + pipe.width < bird.x) {
                    newScore += 0.5;
                    pipe.passed = true;
                }
            }
            if (newScore > 0) setScore(s => s + newScore);

        } else {
            bird.y = canvasHeight / 2 + Math.sin(localFrameCount / 10) * 5;
            localFrameCount++;
        }
        
        frameCountRef.current = localFrameCount;
        gameLoopRef.current = requestAnimationFrame(gameLoop);
    }, [gameState]);


    useEffect(() => {
        initializeGame();
        window.addEventListener('resize', initializeGame);

        gameLoopRef.current = requestAnimationFrame(gameLoop);

        return () => {
            window.removeEventListener('resize', initializeGame);
            if (gameLoopRef.current) {
                cancelAnimationFrame(gameLoopRef.current);
            }
        };
    }, [initializeGame, gameLoop]);
    
    const handleInput = useCallback(() => {
        if (gameState === 'start') {
            setGameState('playing');
            birdRef.current?.flap();
        } else if (gameState === 'playing') {
            birdRef.current?.flap();
        } else if (gameState === 'gameOver') {
            initializeGame();
        }
    }, [gameState, initializeGame]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Space') {
                e.preventDefault();
                handleInput();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleInput]);

    return (
        <div className="bg-background text-foreground min-h-screen py-8 flex flex-col items-center justify-center">
             <header className="text-center mb-6 w-full max-w-lg px-4">
                <div className="bg-secondary rounded-xl shadow-xl p-6 border border-border">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight flex items-center justify-center">
                        <Bird className="h-10 w-10 mr-3 text-primary" />
                        FLAPPY BIRD
                    </h1>
                </div>
            </header>

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-lg w-full">
                <Card className="text-center" data-interactive-cursor="true">
                    <CardContent className="pt-6 relative aspect-[9/16] max-h-[90vh] flex items-center justify-center" onClick={handleInput}>
                        {gameState !== 'playing' && (
                            <div className="absolute inset-0 bg-black/50 z-10 flex flex-col items-center justify-center p-4">
                                {gameState === 'start' && (
                                    <>
                                    <CardTitle className="text-3xl mb-4 flex items-center">
                                        <Gamepad2 className="inline h-8 w-8 mr-2 text-primary" />
                                        Ready to Play?
                                    </CardTitle>
                                    <CardDescription className="text-md text-white/80 pt-2 max-w-sm mx-auto">
                                        Click, touch, or press Spacebar to flap the bird and navigate through the pipes.
                                    </CardDescription>
                                    <Button size="lg" className="mt-6" onClick={(e) => { e.stopPropagation(); handleInput(); }}>
                                       <Play className="mr-2 h-5 w-5" /> Start Game
                                    </Button>
                                    </>
                                )}
                                {gameState === 'gameOver' && (
                                    <>
                                        <CardTitle className="text-3xl mb-4 text-destructive flex items-center">
                                            <AlertTriangle className="inline h-8 w-8 mr-2" />
                                            GAME OVER
                                        </CardTitle>
                                         <CardDescription className="text-xl mt-2 text-white">
                                            Your Score: {Math.floor(score)}
                                        </CardDescription>
                                        <Button size="lg" className="mt-6" onClick={(e) => { e.stopPropagation(); handleInput(); }}>
                                           <RefreshCw className="mr-2 h-5 w-5" /> Play Again
                                        </Button>
                                    </>
                                )}
                            </div>
                        )}
                        {gameState === 'playing' && (
                             <div className="absolute top-4 right-4 text-3xl font-bold text-white z-20" style={{ textShadow: '2px 2px 4px #000' }}>{Math.floor(score)}</div>
                        )}
                        <canvas ref={canvasRef} id="gameCanvas" className="rounded-md" />
                    </CardContent>
                     <CardContent className="border-t pt-4">
                         <Button size="lg" variant="outline" asChild>
                            <Link href="/games"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Games</Link>
                        </Button>
                     </CardContent>
                </Card>
            </main>
        </div>
    );
}
