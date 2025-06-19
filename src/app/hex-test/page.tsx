
"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Eye, Play, RefreshCw, Gamepad2, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

const INITIAL_TIME_PER_LEVEL = 10; // seconds
const MAX_GRID_DIMENSION = 6; // Max 6x6 grid

// Helper to generate a random hex color
const generateRandomHexColor = (): string => {
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += Math.floor(Math.random() * 16).toString(16);
  }
  return color.toUpperCase();
};

// Helper to convert hex to RGB
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

// Helper to convert RGB to hex
const rgbToHex = (r: number, g: number, b: number): string => {
  return ('#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)).toUpperCase();
};

// Helper to calculate a slightly different color
const calculateSlightlyDifferentColor = (baseHex: string, level: number): string => {
  const rgb = hexToRgb(baseHex);
  if (!rgb) return generateRandomHexColor(); // Fallback

  const difference = Math.max(5, 35 - level * 2); 

  let { r, g, b } = rgb;
  const channelToChange = Math.floor(Math.random() * 3);
  const changeDirection = Math.random() < 0.5 ? -1 : 1;

  if (channelToChange === 0) {
    r = Math.max(0, Math.min(255, r + changeDirection * difference));
  } else if (channelToChange === 1) {
    g = Math.max(0, Math.min(255, g + changeDirection * difference));
  } else {
    b = Math.max(0, Math.min(255, b + changeDirection * difference));
  }
  return rgbToHex(r, g, b);
};

export default function HexTestPage() {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME_PER_LEVEL);
  const [timeForCurrentLevel, setTimeForCurrentLevel] = useState(INITIAL_TIME_PER_LEVEL);
  const [gridColors, setGridColors] = useState<string[]>([]);
  const [correctHexIndex, setCorrectHexIndex] = useState<number | null>(null);
  const [isGameOver, setIsGameOver] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [message, setMessage] = useState<{text: string, type: 'success' | 'error' | 'info'} | null>(null);
  const [revealCorrectHex, setRevealCorrectHex] = useState<string | null>(null);
  const [revealChosenHex, setRevealChosenHex] = useState<string | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const messageTimerRef = useRef<NodeJS.Timeout | null>(null);

  const getGridDimensions = useCallback(() => {
    const dimension = Math.min(MAX_GRID_DIMENSION, Math.floor(level / 2) + 2);
    return dimension;
  }, [level]);

  const setupNewLevel = useCallback(() => {
    if (messageTimerRef.current) clearTimeout(messageTimerRef.current);
    setMessage(null);
    setRevealCorrectHex(null);
    setRevealChosenHex(null);

    const dimension = getGridDimensions();
    const totalHexagons = dimension * dimension;
    
    const baseColor = generateRandomHexColor();
    const oddOneOutColor = calculateSlightlyDifferentColor(baseColor, level);
    const newCorrectHexIndex = Math.floor(Math.random() * totalHexagons);

    const newGridColors = Array(totalHexagons).fill(baseColor);
    newGridColors[newCorrectHexIndex] = oddOneOutColor;
    
    setGridColors(newGridColors);
    setCorrectHexIndex(newCorrectHexIndex);
    const currentTimeForLevel = Math.max(3, INITIAL_TIME_PER_LEVEL - Math.floor(level / 4));
    setTimeForCurrentLevel(currentTimeForLevel);
    setTimeLeft(currentTimeForLevel);
  }, [level, getGridDimensions]);

  const showTemporaryMessage = (text: string, type: 'success' | 'error' | 'info', duration: number = 1500) => {
    setMessage({ text, type });
    if (messageTimerRef.current) clearTimeout(messageTimerRef.current);
    messageTimerRef.current = setTimeout(() => {
      setMessage(null);
    }, duration);
  };
  
  const startGame = useCallback(() => {
    setScore(0);
    setIsGameOver(false);
    setGameStarted(true);
    if (messageTimerRef.current) clearTimeout(messageTimerRef.current);
    setMessage(null);
    setRevealCorrectHex(null);
    setRevealChosenHex(null);
    setLevel(1); 
  }, []);

  useEffect(() => {
    if (!isGameOver && gameStarted) {
      setupNewLevel();
    }
  }, [level, isGameOver, gameStarted, setupNewLevel]);

   useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (!isGameOver && gameStarted && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 0.1) { 
            clearInterval(timerRef.current!);
            setIsGameOver(true);
            if (correctHexIndex !== null && gridColors.length > 0) {
              setRevealCorrectHex(gridColors[correctHexIndex]);
            }
            setRevealChosenHex(null); 
            showTemporaryMessage("TIME'S UP!", 'error', 3000);
            return 0;
          }
          return prevTime - 0.1; 
        });
      }, 100); 
    } else if (timeLeft <= 0 && !isGameOver && gameStarted) {
        clearInterval(timerRef.current!);
        setIsGameOver(true);
        if (correctHexIndex !== null && gridColors.length > 0) {
          setRevealCorrectHex(gridColors[correctHexIndex]);
        }
        setRevealChosenHex(null);
        showTemporaryMessage("TIME'S UP!", 'error', 3000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (messageTimerRef.current) {
        clearTimeout(messageTimerRef.current);
      }
    };
  }, [isGameOver, gameStarted, timeLeft, correctHexIndex, gridColors]);

  const handleCardClick = (index: number) => {
    if (isGameOver) return;

    if (index === correctHexIndex) {
      setScore((s) => s + level * 10);
      showTemporaryMessage("CORRECT!", 'success');
      setLevel((l) => l + 1); 
    } else {
      setIsGameOver(true);
      if (correctHexIndex !== null) {
        setRevealCorrectHex(gridColors[correctHexIndex]);
      }
      setRevealChosenHex(gridColors[index]);
      showTemporaryMessage("INCORRECT!", 'error', 3000);
    }
  };
  
  return (
    <div className="bg-background text-foreground min-h-screen py-8 flex flex-col items-center">
      <header className="text-center mb-8 md:mb-12 w-full max-w-3xl px-4">
        <div className="bg-secondary rounded-xl shadow-xl p-6 md:p-8 border border-border">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight flex items-center justify-center">
            <Eye className="h-10 w-10 mr-3 text-primary" />
            HEX TEST
          </h1>
          <p className="text-lg text-muted-foreground mt-2">Test your colour vision</p>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-md w-full">
        {!gameStarted || isGameOver ? (
          <Card className="text-center" data-interactive-cursor="true"> {/* Card uses solid bg */}
            <CardHeader>
              <CardTitle className="text-3xl">
                {gameStarted && isGameOver ? <AlertTriangle className="inline h-8 w-8 mr-2 text-destructive" /> : <Gamepad2 className="inline h-8 w-8 mr-2 text-primary" />} 
                {gameStarted && isGameOver ? "GAME OVER" : "HEX TEST"}
              </CardTitle>
              {gameStarted && isGameOver && (
                <CardDescription className="text-xl mt-2">
                  Score: {score} &nbsp;&nbsp;|&nbsp;&nbsp; Level: {level -1 > 0 ? level -1 : 1}
                </CardDescription>
              )}
               {!gameStarted && (
                <CardDescription className="text-md text-muted-foreground pt-2">
                 Find the card with the slightly different shade. Each level gets harder (more cards / smaller colour differences).
                </CardDescription>
              )}
              
              {(gameStarted && isGameOver && (revealCorrectHex || revealChosenHex)) && (
                <div className="mt-4 text-sm text-left mx-auto max-w-xs p-3 bg-muted rounded-md">
                  {revealCorrectHex && (
                    <p className="flex items-center justify-between">
                      <span>Correct:</span>
                      <span className="flex items-center">
                        <span style={{ backgroundColor: revealCorrectHex, width: '16px', height: '16px', display: 'inline-block', marginRight: '8px', border: '1px solid var(--border)', borderRadius: '3px' }}></span>
                        <code>{revealCorrectHex}</code>
                      </span>
                    </p>
                  )}
                  {revealChosenHex && (
                    <p className="flex items-center justify-between mt-1">
                      <span>You Picked:</span>
                      <span className="flex items-center">
                        <span style={{ backgroundColor: revealChosenHex, width: '16px', height: '16px', display: 'inline-block', marginRight: '8px', border: '1px solid var(--border)', borderRadius: '3px' }}></span>
                        <code>{revealChosenHex}</code>
                      </span>
                    </p>
                  )}
                </div>
              )}
            </CardHeader>
            <CardContent>
              <Button size="lg" onClick={startGame} className="w-full md:w-auto">
                {gameStarted && isGameOver ? <RefreshCw className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
                {gameStarted && isGameOver ? "PLAY AGAIN" : "PLAY"}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card data-interactive-cursor="true"> {/* Card uses solid bg */}
            <CardHeader className="p-4">
              <div className="flex justify-between items-center gap-4 mb-3">
                <span className="text-sm font-semibold text-muted-foreground">LEVEL {level}</span>
                <span className="text-sm font-semibold text-muted-foreground">SCORE {score}</span>
              </div>
              <Progress value={(timeLeft / timeForCurrentLevel) * 100} className="w-full h-2" />
               {message && (
                <div className={cn(
                  "mt-3 p-2 rounded-md text-center text-xs font-semibold h-8 flex items-center justify-center", 
                  message.type === 'success' && "bg-green-500/20 text-green-700 dark:text-green-300",
                  message.type === 'error' && "bg-red-500/20 text-red-700 dark:text-red-300",
                  message.type === 'info' && "bg-blue-500/20 text-blue-700 dark:text-blue-300"
                )}>
                  {message.text}
                </div>
              )}
              {!message && <div className="h-8 mt-3"></div>} 
            </CardHeader>
            <CardContent className="p-4">
              <div 
                className="grid gap-1 sm:gap-1.5 justify-center aspect-square" 
                style={{ gridTemplateColumns: `repeat(${getGridDimensions()}, minmax(0, 1fr))` }}
              >
                {gridColors.map((color, index) => (
                  <div
                    key={index}
                    onClick={() => handleCardClick(index)}
                    className="flex items-center justify-center cursor-pointer transition-all duration-150 ease-in-out hover:opacity-70 rounded-md border border-white/5 dark:border-black/10"
                    style={{
                      width: '100%', 
                      paddingBottom: '100%', 
                      backgroundColor: color,
                    }}
                    aria-label={`Card ${index + 1}`}
                    data-interactive-cursor="true"
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
