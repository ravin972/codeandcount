
"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Rows, Play, RefreshCw, Gamepad2, AlertTriangle, ArrowLeft, ArrowRight, ArrowDown, RotateCw, Maximize } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// --- Game Configuration ---
const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30; // Keep this for logical calculations

const COLORS = [
    null, '#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#6366f1', '#a855f7'
];
const SHAPES = [
    [], // 0 index is empty
    [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]], // I
    [[2,0,0],[2,2,2],[0,0,0]], // L
    [[0,0,3],[3,3,3],[0,0,0]], // J
    [[4,4],[4,4]], // O
    [[0,5,5],[5,5,0],[0,0,0]], // S
    [[0,6,0],[6,6,6],[0,0,0]], // T
    [[7,7,0],[0,7,7],[0,0,0]] // Z
];

export default function BlocktrisPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const gameContainerRef = useRef<HTMLDivElement>(null);
    const gameStateRef = useRef<'start' | 'playing' | 'gameOver'>('start');
    const boardRef = useRef<number[][]>([]);
    const currentPieceRef = useRef<any>(null);
    const fallCounterRef = useRef(0);
    const fallIntervalRef = useRef(1000);
    const lastTimeRef = useRef(0);

    const [score, setScore] = useState(0);
    const [lines, setLines] = useState(0);
    const [level, setLevel] = useState(1);
    const [gameState, setGameState] = useState<'start' | 'playing' | 'gameOver'>('start');
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }, []);

    const createBoard = () => Array.from({ length: ROWS }, () => Array(COLS).fill(0));

    const spawnPiece = useCallback(() => {
        const index = Math.floor(Math.random() * (SHAPES.length - 1)) + 1;
        const newPiece = {
            shape: SHAPES[index],
            color: COLORS[index],
            x: Math.floor(COLS / 2) - Math.floor(SHAPES[index][0].length / 2),
            y: 0
        };
        
        if (!isValidMove(newPiece.shape, newPiece.x, newPiece.y)) {
            setGameState('gameOver');
        } else {
            currentPieceRef.current = newPiece;
        }
    }, []);

    const resetGame = useCallback(() => {
        boardRef.current = createBoard();
        setScore(0);
        setLines(0);
        setLevel(1);
        fallIntervalRef.current = 1000;
        fallCounterRef.current = 0;
        lastTimeRef.current = 0;
        spawnPiece();
        setGameState('start');
    }, [spawnPiece]);

    useEffect(() => {
        gameStateRef.current = gameState;
    }, [gameState]);
    
    const isValidMove = (shape: number[][], x: number, y: number): boolean => {
        for (let row = 0; row < shape.length; row++) {
            for (let col = 0; col < shape[row].length; col++) {
                if (shape[row][col] !== 0) {
                    const boardX = x + col;
                    const boardY = y + row;
                    if (boardX < 0 || boardX >= COLS || boardY >= ROWS || (boardY >= 0 && boardRef.current[boardY] && boardRef.current[boardY][boardX] !== 0)) {
                        return false;
                    }
                }
            }
        }
        return true;
    };

    const lockPiece = useCallback(() => {
        if (!currentPieceRef.current) return;
        currentPieceRef.current.shape.forEach((row: number[], r: number) => {
            row.forEach((value, c) => {
                if (value !== 0) {
                    const boardX = currentPieceRef.current.x + c;
                    const boardY = currentPieceRef.current.y + r;
                    if (boardY >= 0) {
                        boardRef.current[boardY][boardX] = value;
                    }
                }
            });
        });

        // Clear lines
        let linesCleared = 0;
        for (let r = ROWS - 1; r >= 0; r--) {
            if (boardRef.current[r].every(cell => cell !== 0)) {
                linesCleared++;
                boardRef.current.splice(r, 1);
                boardRef.current.unshift(Array(COLS).fill(0));
                r++; // Re-check the same row index
            }
        }

        if (linesCleared > 0) {
            setScore(s => s + (linesCleared === 1 ? 100 : linesCleared === 2 ? 300 : linesCleared === 3 ? 500 : 800) * level);
            setLines(l => {
                const totalLines = l + linesCleared;
                const currentLevel = level;
                if (totalLines >= currentLevel * 10) {
                    setLevel(lvl => lvl + 1);
                    fallIntervalRef.current = Math.max(200, 1000 - (currentLevel) * 100);
                }
                return totalLines;
            });
        }
        spawnPiece();
    }, [level, spawnPiece]);


    const gameLoop = useCallback((time = 0) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        const deltaTime = time - lastTimeRef.current;
        lastTimeRef.current = time;

        if (gameStateRef.current === 'playing') {
            fallCounterRef.current += deltaTime;
            if (fallCounterRef.current > fallIntervalRef.current) {
                if (currentPieceRef.current) {
                    const { shape, x, y } = currentPieceRef.current;
                    if (isValidMove(shape, x, y + 1)) {
                        currentPieceRef.current.y++;
                    } else {
                        lockPiece();
                    }
                }
                fallCounterRef.current = 0;
            }
        }
        
        // --- Drawing ---
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const drawBlock = (x: number, y: number, color: string) => {
            ctx.fillStyle = color;
            ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, 3);
            ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, 3, BLOCK_SIZE);
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.fillRect(x * BLOCK_SIZE + BLOCK_SIZE - 3, y * BLOCK_SIZE, 3, BLOCK_SIZE);
            ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE + BLOCK_SIZE - 3, BLOCK_SIZE, 3);
        };
        
        boardRef.current.forEach((row, r) => {
            row.forEach((value, c) => {
                if (value !== 0) drawBlock(c, r, COLORS[value]!);
            });
        });

        if (currentPieceRef.current) {
            currentPieceRef.current.shape.forEach((row: number[], r: number) => {
                row.forEach((value, c) => {
                    if (value !== 0) {
                        drawBlock(currentPieceRef.current.x + c, currentPieceRef.current.y + r, currentPieceRef.current.color);
                    }
                });
            });
        }
        
        requestAnimationFrame(gameLoop);
    }, [lockPiece]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = COLS * BLOCK_SIZE;
        canvas.height = ROWS * BLOCK_SIZE;
        resetGame();
        
        const animationFrameId = requestAnimationFrame(gameLoop);
        
        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [resetGame, gameLoop]);
    
    const handleStart = () => {
        resetGame();
        setGameState('playing');
    }

    const move = (dir: number) => {
        if (gameStateRef.current !== 'playing' || !currentPieceRef.current) return;
        const { shape, x, y } = currentPieceRef.current;
        if (isValidMove(shape, x + dir, y)) {
            currentPieceRef.current.x += dir;
        }
    };
    
    const rotate = () => {
        if (gameStateRef.current !== 'playing' || !currentPieceRef.current) return;
        const { shape, x, y } = currentPieceRef.current;
        const N = shape.length;
        const newShape = Array.from({ length: N }, () => Array(N).fill(0));
        for(let r = 0; r < N; r++) {
            for(let c = 0; c < N; c++) {
                newShape[c][N - 1 - r] = shape[r][c];
            }
        }
        let kickX = 0;
        if(!isValidMove(newShape, x, y)){
            kickX = x + N > COLS ? -1 : (x < 0 ? 1: 0);
             if(!isValidMove(newShape, x+kickX, y)){
                kickX = x + N > COLS ? -2 : (x < -1 ? 2: 0);
            }
        }
        if(isValidMove(newShape, x + kickX, y)){
            currentPieceRef.current.shape = newShape;
            currentPieceRef.current.x += kickX;
        }
    };

    const drop = (hard = false) => {
        if (gameStateRef.current !== 'playing' || !currentPieceRef.current) return;
        if (hard) {
             while(isValidMove(currentPieceRef.current.shape, currentPieceRef.current.x, currentPieceRef.current.y + 1)) {
                currentPieceRef.current.y++;
            }
            lockPiece();
        } else {
             if (isValidMove(currentPieceRef.current.shape, currentPieceRef.current.x, currentPieceRef.current.y + 1)) {
                currentPieceRef.current.y++;
                fallCounterRef.current = 0;
             }
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (gameStateRef.current === 'start' || gameStateRef.current === 'gameOver') {
                if (e.code === 'Enter') handleStart();
                return;
            }
            if (gameStateRef.current !== 'playing') return;

            if (e.code === 'ArrowLeft') move(-1);
            else if (e.code === 'ArrowRight') move(1);
            else if (e.code === 'ArrowDown') drop();
            else if (e.code === 'ArrowUp' || e.code === 'KeyX') rotate();
            else if (e.code === 'Space') drop(true);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleFullScreen = () => {
        if (gameContainerRef.current) {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                gameContainerRef.current.requestFullscreen();
            }
        }
    };

    return (
        <div className="bg-background text-foreground min-h-screen py-8 flex flex-col items-center justify-center">
            <header className="text-center mb-6 w-full max-w-lg px-4">
                <div className="bg-secondary rounded-xl shadow-xl p-6 border border-border">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight flex items-center justify-center">
                        <Rows className="h-10 w-10 mr-3 text-primary" />
                        BLOCKTRIS
                    </h1>
                </div>
            </header>

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-lg w-full flex justify-center">
                <Card ref={gameContainerRef} className="text-center relative bg-card" data-interactive-cursor="true">
                    <CardContent className="pt-6 relative flex items-center justify-center" style={{ width: COLS * BLOCK_SIZE, height: ROWS * BLOCK_SIZE }}>
                        {gameState !== 'playing' && (
                            <div className="absolute inset-0 bg-black/70 z-10 flex flex-col items-center justify-center p-4">
                                {gameState === 'start' && (
                                    <>
                                        <CardTitle className="text-3xl mb-4 flex items-center"><Gamepad2 className="inline h-8 w-8 mr-2 text-primary" />BLOCKTRIS</CardTitle>
                                        <CardDescription className="text-md text-white/80 pt-2 max-w-sm mx-auto">Use arrow keys to move & rotate. Press Enter to start.</CardDescription>
                                        <Button size="lg" className="mt-6" onClick={handleStart}>
                                            <Play className="mr-2 h-5 w-5" /> Start Game
                                        </Button>
                                    </>
                                )}
                                {gameState === 'gameOver' && (
                                    <>
                                        <CardTitle className="text-3xl mb-4 text-destructive flex items-center"><AlertTriangle className="inline h-8 w-8 mr-2" />GAME OVER</CardTitle>
                                        <Button size="lg" className="mt-6" onClick={handleStart}>
                                            <RefreshCw className="mr-2 h-5 w-5" /> Play Again
                                        </Button>
                                    </>
                                )}
                            </div>
                        )}
                        <canvas ref={canvasRef} id="gameCanvas" className="rounded-md" />
                    </CardContent>
                    <CardFooter className={cn("p-4 border-t", isTouchDevice ? "block" : "hidden")}>
                        <div className="grid grid-cols-3 gap-2 w-full">
                           <Button onMouseDown={() => move(-1)} variant="outline" size="lg" className="h-16 text-2xl"><ArrowLeft /></Button>
                           <Button onMouseDown={rotate} variant="outline" size="lg" className="h-16 text-2xl"><RotateCw /></Button>
                           <Button onMouseDown={() => move(1)} variant="outline" size="lg" className="h-16 text-2xl"><ArrowRight /></Button>
                           <Button onMouseDown={() => drop()} variant="outline" size="lg" className="h-16 text-2xl col-span-3"><ArrowDown /></Button>
                        </div>
                    </CardFooter>
                     <CardFooter className="p-4 border-t flex flex-col items-center justify-center gap-4">
                         <div className="text-left w-full text-sm text-muted-foreground">
                            <p><strong>Score:</strong> {score}</p>
                            <p><strong>Lines:</strong> {lines}</p>
                            <p><strong>Level:</strong> {level}</p>
                         </div>
                         <div className="flex gap-4">
                            <Button size="lg" variant="outline" asChild>
                                <Link href="/games"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Games</Link>
                            </Button>
                             <Button size="lg" variant="outline" onClick={handleFullScreen}>
                                <Maximize className="mr-2 h-4 w-4" /> Full Screen
                            </Button>
                        </div>
                     </CardFooter>
                </Card>
            </main>
        </div>
    );
}

    