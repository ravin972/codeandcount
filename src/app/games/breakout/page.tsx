
"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Sparkles, Play, RefreshCw, Gamepad2, AlertTriangle, ArrowLeft, Maximize, Loader2, Volume2, VolumeX } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import {
  generateBreakoutLevel,
  getBreakoutCoachTip,
  getBreakoutEndGameMessage,
  generateBreakoutAudio
} from '@/ai/flows/breakout-game-flow';

export default function BreakoutGamePage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const gameContainerRef = useRef<HTMLDivElement>(null);
    const { toast } = useToast();

    // Game state refs for logic that doesn't need to trigger re-renders
    const gameDataRef = useRef<any>({
        score: 0,
        lives: 3,
        bricks: [],
        brickCount: 0,
        customBrickPattern: null,
        ballX: 0, ballY: 0, dx: 0, dy: 0,
        paddleX: 0, paddleY: 0,
    });
    
    // React state for UI updates
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [isMuted, setIsMuted] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [levelPrompt, setLevelPrompt] = useState('');
    const [coachTip, setCoachTip] = useState('');
    const [isCoachTipVisible, setIsCoachTipVisible] = useState(false);
    const [aiEndGameMessage, setAiEndGameMessage] = useState('');
    const [currentGameState, setCurrentGameState] = useState<'start' | 'playing' | 'gameOver'>('start');
    
    // --- Game Constants ---
    const ballRadius = 10;
    const paddleHeight = 15;
    const paddleWidth = 120;
    const brickRowCount = 6;
    const brickColumnCount = 7;
    const brickWidth = 75;
    const brickHeight = 25;
    const brickPadding = 10;
    const brickOffsetTop = 50;
    const brickOffsetLeft = 30;
    const ballSpeed = 5;
    const brickColors = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#a855f7"];

    // --- Audio Playback ---
    const playAudio = useCallback(async (text: string) => {
      if (isMuted) return;
      try {
        const { media } = await generateBreakoutAudio(text);
        if (media) {
          const audio = new Audio(media);
          audio.play();
        }
      } catch (error) {
        console.error("Failed to play audio:", error);
      }
    }, [isMuted]);

    const initBricks = (pattern: number[][] | null) => {
        const bricks = [];
        let brickCount = 0;
        for (let c = 0; c < brickColumnCount; c++) {
            bricks[c] = [];
            for (let r = 0; r < brickRowCount; r++) {
                const isBrick = pattern ? (pattern[r]?.[c] === 1) : true;
                if (isBrick) brickCount++;
                bricks[c][r] = { x: 0, y: 0, status: isBrick ? 1 : 0, color: brickColors[r % brickColors.length] };
            }
        }
        gameDataRef.current.bricks = bricks;
        gameDataRef.current.brickCount = brickCount;
    };

    const resetBallAndPaddle = useCallback(() => {
        const canvas = canvasRef.current!;
        gameDataRef.current.ballX = canvas.width / 2;
        gameDataRef.current.ballY = canvas.height - 100;
        gameDataRef.current.dx = ballSpeed * (Math.random() < 0.5 ? 1 : -1);
        gameDataRef.current.dy = -ballSpeed;
        gameDataRef.current.paddleX = (canvas.width - paddleWidth) / 2;
        gameDataRef.current.paddleY = canvas.height - paddleHeight - 20;
    }, []);

    const resetGame = useCallback((brickPattern: number[][] | null) => {
        gameDataRef.current.score = 0;
        gameDataRef.current.lives = 3;
        setScore(0);
        setLives(3);
        setAiEndGameMessage('');
        resetBallAndPaddle();
        initBricks(brickPattern);
        setCurrentGameState('playing');
    }, [resetBallAndPaddle]);

    // --- AI Integrations ---
    const handleGenerateLevel = async () => {
        if (!levelPrompt) {
            toast({ title: "Prompt is empty!", description: "Please describe the level you want to create.", variant: "destructive" });
            return;
        }
        setIsGenerating(true);
        try {
            const result = await generateBreakoutLevel(levelPrompt);
            if (result && result.layout) {
                gameDataRef.current.customBrickPattern = result.layout;
                resetGame(result.layout);
            } else {
                throw new Error("Invalid layout generated.");
            }
        } catch (error) {
            console.error("Error generating level:", error);
            toast({ title: "Generation Failed", description: "Sorry, I couldn't create that. Please try a different description.", variant: "destructive" });
        } finally {
            setIsGenerating(false);
        }
    };
    
    const showCoachTip = useCallback(async () => {
        setIsCoachTipVisible(true);
        setCoachTip("Coach is thinking...");
        try {
            const { tip } = await getBreakoutCoachTip("The player just missed the ball and lost a life.");
            setCoachTip(tip);
            playAudio(tip);
        } catch (error) {
            setCoachTip("Keep your eye on the ball!");
        } finally {
            setTimeout(() => setIsCoachTipVisible(false), 4000);
        }
    }, [playAudio]);

    const showEndGameMessage = useCallback(async (isWin: boolean) => {
        setAiEndGameMessage("✨ Calculating final message...");
        try {
            const { message } = await getBreakoutEndGameMessage({ isWin, score: gameDataRef.current.score });
            setAiEndGameMessage(message);
            playAudio(message);
        } catch (error) {
            setAiEndGameMessage(isWin ? "You are a true champion!" : "The bricks will be back!");
        }
    }, [playAudio]);

    // --- Game Over / Win Logic ---
    const handleWin = useCallback(() => {
        setCurrentGameState('gameOver');
        showEndGameMessage(true);
    }, [showEndGameMessage]);

    const handleGameOver = useCallback(() => {
        setCurrentGameState('gameOver');
        showEndGameMessage(false);
    }, [showEndGameMessage]);

    // --- Game Loop and Drawing ---
    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d')!;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (currentGameState === 'playing') {
            // Draw Bricks
            for (let c = 0; c < brickColumnCount; c++) {
                for (let r = 0; r < brickRowCount; r++) {
                    if (gameDataRef.current.bricks[c][r].status === 1) {
                        const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                        const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                        gameDataRef.current.bricks[c][r].x = brickX;
                        gameDataRef.current.bricks[c][r].y = brickY;
                        ctx.beginPath();
                        ctx.rect(brickX, brickY, brickWidth, brickHeight);
                        ctx.fillStyle = gameDataRef.current.bricks[c][r].color;
                        ctx.fill();
                        ctx.closePath();
                    }
                }
            }

            // Draw Ball
            ctx.beginPath();
            ctx.arc(gameDataRef.current.ballX, gameDataRef.current.ballY, ballRadius, 0, Math.PI * 2);
            ctx.fillStyle = "#FFFFFF";
            ctx.fill();
            ctx.closePath();

            // Draw Paddle
            ctx.beginPath();
            ctx.rect(gameDataRef.current.paddleX, gameDataRef.current.paddleY, paddleWidth, paddleHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();

            // Collision Detection
            const { ballX, ballY, bricks, paddleX, paddleY } = gameDataRef.current;
            for (let c = 0; c < brickColumnCount; c++) {
                for (let r = 0; r < brickRowCount; r++) {
                    const b = bricks[c][r];
                    if (b.status === 1) {
                        if (ballX > b.x && ballX < b.x + brickWidth && ballY > b.y && ballY < b.y + brickHeight) {
                            gameDataRef.current.dy = -gameDataRef.current.dy;
                            b.status = 0;
                            const newScore = gameDataRef.current.score + 10;
                            gameDataRef.current.score = newScore;
                            gameDataRef.current.brickCount--;
                            setScore(newScore);
                            if (gameDataRef.current.brickCount <= 0) {
                                handleWin();
                            }
                        }
                    }
                }
            }

            if (ballX > paddleX && ballX < paddleX + paddleWidth && ballY + ballRadius > paddleY && ballY < paddleY + paddleHeight) {
                gameDataRef.current.ballY = paddleY - ballRadius;
                let collidePoint = ballX - (paddleX + paddleWidth / 2);
                collidePoint = collidePoint / (paddleWidth / 2);
                let angleRad = collidePoint * (Math.PI / 3);
                gameDataRef.current.dx = ballSpeed * Math.sin(angleRad);
                gameDataRef.current.dy = -ballSpeed * Math.cos(angleRad);
            }

            // Update Ball Position
            gameDataRef.current.ballX += gameDataRef.current.dx;
            gameDataRef.current.ballY += gameDataRef.current.dy;

            // Wall Collisions
            if (gameDataRef.current.ballX + ballRadius > canvas.width || gameDataRef.current.ballX - ballRadius < 0) {
                gameDataRef.current.dx = -gameDataRef.current.dx;
            }
            if (gameDataRef.current.ballY - ballRadius < 0) {
                gameDataRef.current.dy = -gameDataRef.current.dy;
            }
            if (gameDataRef.current.ballY + ballRadius > canvas.height) {
                const newLives = gameDataRef.current.lives - 1;
                gameDataRef.current.lives = newLives;
                setLives(newLives);
                if (newLives <= 0) {
                    handleGameOver();
                } else {
                    showCoachTip();
                    resetBallAndPaddle();
                }
            }
        }
        
        requestAnimationFrame(draw);
    }, [currentGameState, handleGameOver, handleWin, resetBallAndPaddle, showCoachTip]);

    useEffect(() => {
        const animationFrameId = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(animationFrameId);
    }, [draw]);

    const handleStartClick = () => {
        if (currentGameState === 'start' || currentGameState === 'gameOver') {
            resetGame(null);
        }
    };
    
    // --- Mouse Handler ---
    const mouseMoveHandler = useCallback((e: MouseEvent) => {
        const container = gameContainerRef.current;
        const canvas = canvasRef.current;
        if (!container || !canvas) return;
        const rect = container.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const relativeX = (e.clientX - rect.left) * scaleX;
        if (relativeX > 0 && relativeX < canvas.width) {
            gameDataRef.current.paddleX = relativeX - paddleWidth / 2;
            if (gameDataRef.current.paddleX < 0) gameDataRef.current.paddleX = 0;
            if (gameDataRef.current.paddleX + paddleWidth > canvas.width) gameDataRef.current.paddleX = canvas.width - paddleWidth;
        }
    }, []);

    useEffect(() => {
        window.addEventListener("mousemove", mouseMoveHandler, false);
        return () => window.removeEventListener("mousemove", mouseMoveHandler, false);
    }, [mouseMoveHandler]);

    // Canvas Resizing
    useEffect(() => {
        const resizeCanvas = () => {
            const canvas = canvasRef.current;
            const container = gameContainerRef.current;
            if (!canvas || !container) return;
            
            const aspectRatio = 4 / 5;
            let newWidth = container.clientWidth;
            let newHeight = container.clientHeight;

            if (newWidth / newHeight > aspectRatio) {
                newWidth = newHeight * aspectRatio;
            } else {
                newHeight = newWidth / aspectRatio;
            }
            canvas.width = 640;
            canvas.height = 800;
            canvas.style.width = `${newWidth}px`;
            canvas.style.height = `${newHeight}px`;
            
            resetBallAndPaddle();
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        return () => window.removeEventListener('resize', resizeCanvas);
    }, [resetBallAndPaddle]);

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
                        <Sparkles className="h-10 w-10 mr-3 text-primary" />
                        AI BREAKOUT
                    </h1>
                </div>
            </header>

            <main ref={gameContainerRef} className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-lg w-full">
                <Card className="text-center bg-black aspect-[4/5] relative" data-interactive-cursor="true">
                    <CardHeader className="absolute top-2 left-4 right-4 z-20 flex justify-between items-center text-white font-bold text-lg" style={{ textShadow: '2px 2px 4px #000' }}>
                        <div>SCORE: {score}</div>
                        <div>LIVES: {lives}</div>
                        <Button variant="ghost" size="icon" onClick={() => setIsMuted(m => !m)} className="text-white hover:bg-white/10">
                            {isMuted ? <VolumeX /> : <Volume2 />}
                        </Button>
                    </CardHeader>
                    
                    {isCoachTipVisible && (
                        <div className="absolute bottom-20 left-4 right-4 p-4 bg-primary/80 text-primary-foreground border-2 border-white rounded-lg shadow-lg z-10 animate-in fade-in">
                            {coachTip}
                        </div>
                    )}

                    <CardContent className="p-0 h-full w-full" onClick={handleStartClick}>
                        {(currentGameState === 'start' || currentGameState === 'gameOver') && (
                            <div className="absolute inset-0 bg-black/70 z-10 flex flex-col items-center justify-center p-4">
                                {currentGameState === 'start' && <>
                                    <CardTitle className="text-3xl mb-4 flex items-center"><Gamepad2 className="inline h-8 w-8 mr-2 text-primary" />AI BREAKOUT</CardTitle>
                                    <CardDescription className="text-md text-white/80 pt-2 max-w-sm mx-auto">
                                        Move mouse to control paddle.
                                        <br/><br/>Click to start a classic level.
                                    </CardDescription>
                                    <div className="mt-6 flex flex-col items-center gap-4 w-full max-w-sm">
                                        <Input
                                            type="text"
                                            placeholder="Or describe a level (e.g., a pyramid)"
                                            value={levelPrompt}
                                            onChange={(e) => setLevelPrompt(e.target.value)}
                                            onClick={(e) => e.stopPropagation()}
                                            className="bg-background/80 dark:bg-neutral-800/80 text-center"
                                        />
                                        <Button size="lg" onClick={(e) => {e.stopPropagation(); handleGenerateLevel();}} disabled={isGenerating}>
                                            {isGenerating ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Generating...</> : <><Sparkles className="mr-2 h-5 w-5" /> Generate Level</>}
                                        </Button>
                                    </div>
                                </>}
                                {currentGameState === 'gameOver' && <>
                                    <CardTitle className="text-3xl mb-4 flex items-center"><AlertTriangle className="inline h-8 w-8 mr-2 text-destructive" />{score >= brickColumnCount * brickRowCount * 10 ? "YOU WIN!" : "GAME OVER"}</CardTitle>
                                    <CardDescription className="text-lg text-white/90 mt-2">{aiEndGameMessage}</CardDescription>
                                    <p className='mt-4 text-muted-foreground'>Click to play again</p>
                                </>}
                            </div>
                        )}
                        <canvas ref={canvasRef} id="gameCanvas" className="w-full h-full" />
                    </CardContent>
                     <CardFooter className="p-4 border-t flex-wrap justify-center gap-4">
                         <Button size="lg" variant="outline" asChild>
                            <Link href="/games"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Games</Link>
                        </Button>
                         <Button size="lg" variant="outline" onClick={handleFullScreen}>
                            <Maximize className="mr-2 h-4 w-4" /> Full Screen
                        </Button>
                     </CardFooter>
                </Card>
            </main>
        </div>
    );
}

    