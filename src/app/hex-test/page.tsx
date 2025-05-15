
"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Palette, Timer, Target, RefreshCw, Skull, Award, Eye, Info } from 'lucide-react';
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
  const [gridColors, setGridColors] = useState<string[]>([]);
  const [correctHexIndex, setCorrectHexIndex] = useState<number | null>(null);
  const [isGameOver, setIsGameOver] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [message, setMessage] = useState<{text: string, type: 'success' | 'error' | 'info'} | null>(null);
  const [revealCorrectHex, setRevealCorrectHex] = useState<string | null>(null);
  const [revealChosenHex, setRevealChosenHex] = useState<string | null>(null);


  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const getGridDimensions = useCallback(() => {
    const dimension = Math.min(MAX_GRID_DIMENSION, Math.floor(level / 2) + 2);
    return dimension;
  }, [level]);

  const setupNewLevel = useCallback(() => {
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
    setTimeLeft(INITIAL_TIME_PER_LEVEL + Math.max(0, 5 - Math.floor(level/3)));
  }, [level, getGridDimensions]);

  const startGame = useCallback(() => {
    setScore(0);
    setLevel(1);
    setIsGameOver(false);
    setGameStarted(true);
    setMessage(null);
    setRevealCorrectHex(null);
    setRevealChosenHex(null);
    // setupNewLevel() will be called by useEffect hook listening to 'level' if it's the first game
    // or if 'level' changes. If 'level' is already 1, it won't re-trigger setupNewLevel.
    // So, explicitly call it here for "Play Again" scenarios where level might reset to 1.
    if (level === 1) {
      setupNewLevel(); // Ensures level 1 setup on "Play Again"
    } else {
      setLevel(1); // This will trigger useEffect for setup
    }
  }, [setupNewLevel, level]); // Add level to dependencies

  useEffect(() => {
    if (!isGameOver && gameStarted) {
      setupNewLevel();
    }
  }, [level, isGameOver, gameStarted, setupNewLevel]);

   useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (!isGameOver && gameStarted) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current!);
            setIsGameOver(true);
            if (correctHexIndex !== null && gridColors.length > 0) {
              setRevealCorrectHex(gridColors[correctHexIndex]);
            }
            setRevealChosenHex(null); // No specific choice when time runs out
            setMessage({text: "Time's up! Game Over.", type: 'error'});
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isGameOver, gameStarted, correctHexIndex, gridColors]);

  const handleHexagonClick = (index: number) => {
    if (isGameOver) return;

    if (index === correctHexIndex) {
      setScore((s) => s + level * 10);
      setLevel((l) => l + 1);
      setMessage({text: "Correct! Next level.", type: 'success'});
    } else {
      setIsGameOver(true);
      if (correctHexIndex !== null) {
        setRevealCorrectHex(gridColors[correctHexIndex]);
      }
      setRevealChosenHex(gridColors[index]);
      setMessage({text: "Not quite! Game Over.", type: 'error'});
    }
  };
  
  const hexagonSize = 100 / getGridDimensions() - (getGridDimensions() > 3 ? 2 : 1) ;

  return (
    <div className="bg-background text-foreground min-h-screen py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight flex items-center justify-center">
          <Eye className="h-10 w-10 mr-3 text-primary" />
          Hex Color Challenge
        </h1>
        <p className="text-lg text-muted-foreground mt-2">Test your color perception skills!</p>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
        {!gameStarted || isGameOver ? (
          <Card className="shadow-xl text-center">
            <CardHeader>
              <CardTitle className="text-3xl">
                {gameStarted && isGameOver ? <Skull className="inline h-8 w-8 mr-2 text-destructive" /> : <Palette className="inline h-8 w-8 mr-2 text-primary" />} 
                {gameStarted && isGameOver ? "Game Over!" : "Ready to Play?"}
              </CardTitle>
              {!gameStarted && (
                <CardDescription className="text-md text-muted-foreground pt-2">
                  Test your ability to distinguish subtle differences in hexadecimal color codes.
                  Click the hexagon that has a slightly different shade.
                  Each level increases difficulty by having more hexagons or making the color difference subtler.
                  Good luck!
                </CardDescription>
              )}
              {gameStarted && isGameOver && (
                <>
                  <CardDescription className="text-xl mt-2">Your final score: {score}</CardDescription>
                  {message && <p className={cn("mt-2 font-semibold", message.type === 'error' ? 'text-destructive' : 'text-green-600')}>{message.text}</p>}
                  
                  {revealCorrectHex && (
                    <div className="mt-4 text-sm text-left mx-auto max-w-xs p-3 bg-muted/50 rounded-md">
                      <p className="flex items-center justify-between">
                        <span>Correct:</span>
                        <span className="flex items-center">
                          <span style={{ backgroundColor: revealCorrectHex, width: '16px', height: '16px', display: 'inline-block', marginRight: '8px', border: '1px solid #888', borderRadius: '3px' }}></span>
                          <code>{revealCorrectHex}</code>
                        </span>
                      </p>
                      {revealChosenHex && (
                        <p className="flex items-center justify-between mt-1">
                          <span>You Picked:</span>
                          <span className="flex items-center">
                            <span style={{ backgroundColor: revealChosenHex, width: '16px', height: '16px', display: 'inline-block', marginRight: '8px', border: '1px solid #888', borderRadius: '3px' }}></span>
                            <code>{revealChosenHex}</code>
                          </span>
                        </p>
                      )}
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground mt-4 pt-2 border-t border-border">
                    <Info size={14} className="inline mr-1" /> Tip: Higher levels feature more hexagons or smaller color differences. Keep practicing!
                  </p>
                </>
              )}
            </CardHeader>
            <CardContent>
              <Button size="lg" onClick={startGame} className="w-full md:w-auto">
                <RefreshCw className="mr-2 h-5 w-5" />
                {gameStarted && isGameOver ? "Play Again" : "Start Game"}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-xl">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
                <Badge variant="outline" className="text-lg p-2">
                  <Award className="mr-2 h-5 w-5 text-yellow-500" /> Score: {score}
                </Badge>
                <Badge variant="outline" className="text-lg p-2">
                  <Target className="mr-2 h-5 w-5 text-blue-500" /> Level: {level}
                </Badge>
                <Badge variant={timeLeft <=5 && timeLeft > 0 ? "destructive" : "outline"} className="text-lg p-2">
                  <Timer className="mr-2 h-5 w-5" /> Time: {timeLeft}s
                </Badge>
              </div>
               {message && (
                <div className={cn(
                  "p-2 rounded-md text-center text-sm font-semibold",
                  message.type === 'success' && "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200",
                  message.type === 'error' && "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200",
                  message.type === 'info' && "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200"
                )}>
                  {message.text}
                </div>
              )}
            </CardHeader>
            <CardContent>
              <div 
                className="grid gap-2 justify-center aspect-square"
                style={{ gridTemplateColumns: `repeat(${getGridDimensions()}, minmax(0, 1fr))` }}
              >
                {gridColors.map((color, index) => (
                  <div
                    key={index}
                    onClick={() => handleHexagonClick(index)}
                    className="flex items-center justify-center cursor-pointer transition-all duration-150 ease-in-out hover:scale-105 hover:opacity-80 rounded-md"
                    style={{
                      width: '100%', 
                      paddingBottom: '100%', 
                      backgroundColor: color,
                      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                      transform: 'scale(0.95)', 
                    }}
                    aria-label={`Hexagon ${index + 1}`}
                  />
                ))}
              </div>
            </CardContent>
            <CardFooter className="text-center">
              <p className="text-xs text-muted-foreground w-full">Find the hex with the slightly different shade!</p>
            </CardFooter>
          </Card>
        )}
      </main>
    </div>
  );
}
