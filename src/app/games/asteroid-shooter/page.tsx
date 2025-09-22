
"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Rocket, Play, RefreshCw, Gamepad2, AlertTriangle, ArrowLeft, Maximize, RotateCcw, RotateCw, ArrowUp } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// --- Game Configuration ---
const SHIP_SIZE = 30;
const TURN_SPEED = 360; // degrees per second
const SHIP_THRUST = 5; // acceleration
const FRICTION = 0.7;
const LASER_SPEED = 500;
const LASER_MAX_DIST = 0.6;
const ASTEROID_NUM = 1;
const ASTEROID_SPEED = 50;
const ASTEROID_SIZE = 100;
const ASTEROID_JAG = 0.4;
const ASTEROID_VERTICES = 10;
const SHIP_INVINCIBILITY_DUR = 3;
const SHIP_BLINK_DUR = 0.1;
const GAME_LIVES = 3;
const STARFIELD_STARS = 100;
const PARTICLE_LIFESPAN = 1;
const PARTICLE_COUNT = 30;

export default function AsteroidShooterPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const gameDataRef = useRef<any>({});
    const gameContainerRef = useRef<HTMLDivElement>(null);
    
    const [gameState, setGameState] = useState<'start' | 'playing' | 'gameOver'>('start');
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [lives, setLives] = useState(GAME_LIVES);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const gameStateRef = useRef(gameState);

    useEffect(() => {
        setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }, []);

    useEffect(() => {
        gameStateRef.current = gameState;
    }, [gameState]);

    // --- Utility Functions ---
    const distBetweenPoints = (x1:number, y1:number, x2:number, y2:number) => Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

    const newShip = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return null;
        return {
            x: canvas.width / 2,
            y: canvas.height / 2,
            r: SHIP_SIZE / 2,
            a: 90 / 180 * Math.PI, // angle
            rot: 0,
            thrusting: false,
            thrust: { x: 0, y: 0 },
            blinkTime: Math.ceil(SHIP_BLINK_DUR * 60),
            blinkNum: Math.ceil(SHIP_INVINCIBILITY_DUR / SHIP_BLINK_DUR),
            canShoot: true,
            lasers: []
        };
    }, []);

    const newAsteroid = useCallback((x:number, y:number, r:number) => {
        const lvlMult = 1 + 0.1 * gameDataRef.current.level;
        const roid = { x, y, r,
            xv: Math.random() * ASTEROID_SPEED * lvlMult / 60 * (Math.random() < 0.5 ? 1 : -1),
            yv: Math.random() * ASTEROID_SPEED * lvlMult / 60 * (Math.random() < 0.5 ? 1 : -1),
            a: Math.random() * Math.PI * 2,
            vert: Math.floor(Math.random() * (ASTEROID_VERTICES + 1) + ASTEROID_VERTICES / 2),
            offs: [] as number[]
        };
        for (let i = 0; i < roid.vert; i++) roid.offs.push(Math.random() * ASTEROID_JAG * 2 + 1 - ASTEROID_JAG);
        return roid;
    }, []);

    const createAsteroidBelt = useCallback(() => {
        const gameData = gameDataRef.current;
        const canvas = canvasRef.current!;
        gameData.asteroids = [];
        for (let i = 0; i < ASTEROID_NUM + gameData.level; i++) {
            let x, y;
            do {
                x = Math.floor(Math.random() * canvas.width);
                y = Math.floor(Math.random() * canvas.height);
            } while (gameData.ship && distBetweenPoints(gameData.ship.x, gameData.ship.y, x, y) < ASTEROID_SIZE * 2 + gameData.ship.r);
            gameData.asteroids.push(newAsteroid(x, y, Math.ceil(ASTEROID_SIZE / 2)));
        }
    }, [newAsteroid]);

     const createStarfield = useCallback(() => {
        const stars = [];
        const canvas = canvasRef.current;
        if (!canvas) return [];
        for(let i=0; i < STARFIELD_STARS; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 1.5,
                a: Math.random() * 0.5 + 0.5
            });
        }
        return stars;
    }, []);
    
    const newLevel = useCallback(() => {
        gameDataRef.current.level++;
        createAsteroidBelt();
    }, [createAsteroidBelt]);

    const initGame = useCallback((newGame: boolean) => {
        const gameData = gameDataRef.current;
        const canvas = canvasRef.current!;
        gameData.ship = newShip();
        gameData.asteroids = [];
        gameData.particles = [];
        gameData.level = 0;
        
        if (newGame) {
            setScore(0);
            setLives(GAME_LIVES);
            newLevel();
            setGameState('playing');
        } else {
            setGameState('start');
        }
    }, [newShip, newLevel]);


    const gameLoop = useCallback(() => {
        const ctx = canvasRef.current?.getContext('2d');
        const canvas = canvasRef.current;
        if (!ctx || !canvas) return;
        
        // RENDER BACKGROUND
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#fff';
        if(gameDataRef.current.stars) {
             for (const star of gameDataRef.current.stars) {
                ctx.globalAlpha = star.a;
                ctx.beginPath(); ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2); ctx.fill();
            }
        }
        ctx.globalAlpha = 1.0;

        if (gameStateRef.current === 'playing') {
            update();
            renderGame();
        }
        requestAnimationFrame(gameLoop);
    }, []);

    useEffect(() => {
        const storedHighScore = parseInt(localStorage.getItem('asteroidHighScore') || '0');
        setHighScore(storedHighScore);

        const canvas = canvasRef.current!;
        const handleResize = () => {
             const container = canvas.parentElement!;
             const aspectRatio = 4 / 3;
             let newWidth = container.clientWidth;
             let newHeight = newWidth / aspectRatio;
             if (newHeight > container.clientHeight) {
                newHeight = container.clientHeight;
                newWidth = newHeight * aspectRatio;
             }
             canvas.width = newWidth;
             canvas.height = newHeight;
             gameDataRef.current.stars = createStarfield();
        }

        window.addEventListener('resize', handleResize);
        handleResize();

        gameDataRef.current.stars = createStarfield();
        initGame(false);

        const animationFrameId = requestAnimationFrame(gameLoop);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        }
    }, [initGame, createStarfield, gameLoop]);


    const update = () => {
        const gameData = gameDataRef.current;
        const canvas = canvasRef.current!;
        if (!gameData.ship) return;
        const { ship, asteroids, particles } = gameData;
        
        const handleScreenWrap = (obj: any) => {
            if (obj.x < 0 - obj.r) obj.x = canvas.width + obj.r;
            else if (obj.x > canvas.width + obj.r) obj.x = 0 - obj.r;
            if (obj.y < 0 - obj.r) obj.y = canvas.height + obj.r;
            else if (obj.y > canvas.height + obj.r) obj.y = 0 - obj.r;
        };
        
        const createExplosion = (x:number, y:number) => {
            for(let i = 0; i < PARTICLE_COUNT; i++) {
                const angle = Math.random() * 2 * Math.PI;
                const speed = Math.random() * 3;
                gameData.particles.push({ x, y, xv: Math.cos(angle) * speed, yv: Math.sin(angle) * speed, alpha: 1.0 });
            }
        };

        const destroyAsteroid = (index: number) => {
            const roid = asteroids[index];
            createExplosion(roid.x, roid.y);
            
            setScore(s => {
                let newScore;
                if (roid.r > ASTEROID_SIZE / 4) {
                    gameData.asteroids.push(newAsteroid(roid.x, roid.y, Math.ceil(roid.r / 2)));
                    gameData.asteroids.push(newAsteroid(roid.x, roid.y, Math.ceil(roid.r / 2)));
                    newScore = s + 20;
                } else {
                    newScore = s + 50;
                }
                if (newScore > highScore) {
                    setHighScore(newScore);
                    localStorage.setItem('asteroidHighScore', newScore.toString());
                }
                return newScore;
            });
            asteroids.splice(index, 1);
        };
        
        const shipHit = () => {
            createExplosion(ship.x, ship.y);
            setLives(l => {
                const newLives = l - 1;
                if (newLives <= 0) {
                    setGameState('gameOver');
                } else {
                    gameData.ship = newShip();
                }
                return newLives;
            });
        };

        // Update Ship
        if (ship.thrusting) {
            ship.thrust.x += SHIP_THRUST * Math.cos(ship.a) / 60;
            ship.thrust.y -= SHIP_THRUST * Math.sin(ship.a) / 60;
        } else {
            ship.thrust.x -= FRICTION * ship.thrust.x / 60;
            ship.thrust.y -= FRICTION * ship.thrust.y / 60;
        }
        ship.a += ship.rot; ship.x += ship.thrust.x; ship.y += ship.thrust.y;
        handleScreenWrap(ship);

        // Update Lasers
        for (let i = ship.lasers.length - 1; i >= 0; i--) {
            const laser = ship.lasers[i];
            laser.dist += Math.sqrt(Math.pow(laser.xv, 2) + Math.pow(laser.yv, 2));
            laser.x += laser.xv; laser.y += laser.yv;
            if (laser.dist > canvas.width * LASER_MAX_DIST) { ship.lasers.splice(i, 1); continue; }
            
            for (let j = asteroids.length - 1; j >= 0; j--) {
                if (distBetweenPoints(laser.x, laser.y, asteroids[j].x, asteroids[j].y) < asteroids[j].r) {
                    destroyAsteroid(j);
                    ship.lasers.splice(i, 1);
                    break;
                }
            }
        }

        if(ship.blinkNum > 0) {
            ship.blinkTime--;
            if(ship.blinkTime === 0) {
                ship.blinkTime = Math.ceil(SHIP_BLINK_DUR * 60);
                ship.blinkNum--;
            }
        }
        
        // Update Asteroids
        for(let i = asteroids.length - 1; i >= 0; i--) {
            const roid = asteroids[i];
            roid.x += roid.xv; roid.y += roid.yv;
            handleScreenWrap(roid);
            if (ship.blinkNum === 0 && distBetweenPoints(ship.x, ship.y, roid.x, roid.y) < ship.r + roid.r) {
                shipHit();
            }
        }

        // Update particles
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.xv; p.y += p.yv;
            p.alpha -= 1.0 / (PARTICLE_LIFESPAN * 60);
            if (p.alpha <= 0) particles.splice(i, 1);
        }
        
        if (asteroids.length === 0) newLevel();
    }

    const renderGame = () => {
        const gameData = gameDataRef.current;
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext('2d')!;
        if (!gameData.ship) return;
        const { ship, asteroids, particles } = gameData;
        
        const drawShip = (x:number, y:number, a:number, color = 'white', scale = 1.0) => {
            const shipR = (SHIP_SIZE / 2) * scale;
            ctx.strokeStyle = color; ctx.lineWidth = SHIP_SIZE / 20 * scale;
            
            ctx.beginPath();
            ctx.moveTo( x + 4 / 3 * shipR * Math.cos(a), y - 4 / 3 * shipR * Math.sin(a) );
            ctx.lineTo( x - shipR * (2 / 3 * Math.cos(a) - Math.sin(a)), y + shipR * (2 / 3 * Math.sin(a) + Math.cos(a)) );
            ctx.lineTo( x - shipR * (2 / 3 * Math.cos(a)), y + shipR * (2 / 3 * Math.sin(a)) );
            ctx.lineTo( x - shipR * (2 / 3 * Math.cos(a) + Math.sin(a)), y + shipR * (2 / 3 * Math.sin(a) - Math.cos(a)) );
            ctx.closePath();
            ctx.fillStyle = "slategrey"; ctx.fill(); ctx.stroke();

            ctx.beginPath();
            ctx.moveTo( x + shipR * (Math.cos(a) * 0.5 + Math.sin(a) * 1.5), y - shipR * (Math.sin(a) * 0.5 - Math.cos(a) * 1.5) );
            ctx.lineTo( x - shipR * (Math.cos(a) * 1.5 - Math.sin(a) * 1.2), y + shipR * (Math.sin(a) * 1.5 + Math.cos(a) * 1.2) );
            ctx.lineTo( x - shipR * (Math.cos(a) * 1.5 + Math.sin(a) * 1.2), y + shipR * (Math.sin(a) * 1.5 - Math.cos(a) * 1.2) );
            ctx.lineTo( x + shipR * (Math.cos(a) * 0.5 - Math.sin(a) * 1.5), y - shipR * (Math.sin(a) * 0.5 + Math.cos(a) * 1.5) );
            ctx.closePath();
            ctx.fillStyle = "darkgrey"; ctx.fill(); ctx.stroke();
            
            if (ship && ship.thrusting && scale === 1.0) {
                ctx.fillStyle = 'red'; ctx.strokeStyle = 'yellow'; ctx.lineWidth = SHIP_SIZE / 10;
                ctx.beginPath();
                ctx.moveTo( x - shipR * (1 / 3 * Math.cos(a) + 0.5 * Math.sin(a)), y + shipR * (1 / 3 * Math.sin(a) - 0.5 * Math.cos(a)) );
                ctx.lineTo( x - shipR * 5 / 3 * Math.cos(a), y + shipR * 5 / 3 * Math.sin(a) );
                ctx.lineTo( x - shipR * (1 / 3 * Math.cos(a) - 0.5 * Math.sin(a)), y + shipR * (1 / 3 * Math.sin(a) + 0.5 * Math.cos(a)) );
                ctx.closePath(); ctx.fill(); ctx.stroke();
            }
        };

        if(particles) {
            for(const p of particles) {
                ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
                ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, Math.PI * 2); ctx.fill();
            }
        }

        const blinkOn = ship.blinkNum % 2 === 0;
        if (blinkOn) drawShip(ship.x, ship.y, ship.a);
        
        for (const laser of ship.lasers) {
            ctx.fillStyle = 'salmon';
            ctx.beginPath(); ctx.arc(laser.x, laser.y, SHIP_SIZE / 15, 0, Math.PI * 2); ctx.fill();
        }
        
        for (const roid of asteroids) {
            ctx.strokeStyle = 'slategrey'; ctx.lineWidth = SHIP_SIZE / 20;
            ctx.beginPath();
            ctx.moveTo( roid.x + roid.r * roid.offs[0] * Math.cos(roid.a), roid.y + roid.r * roid.offs[0] * Math.sin(roid.a) );
            for (let j = 1; j < roid.vert; j++) {
                ctx.lineTo( roid.x + roid.r * roid.offs[j] * Math.cos(roid.a + j * Math.PI * 2 / roid.vert), roid.y + roid.r * roid.offs[j] * Math.sin(roid.a + j * Math.PI * 2 / roid.vert) );
            }
            ctx.closePath(); ctx.stroke();
        }

        for(let i = 0; i < lives; i++) {
            drawShip(SHIP_SIZE + i * SHIP_SIZE * 1.2, SHIP_SIZE, 90 / 180 * Math.PI, 'white', 0.8);
        }
    }

    const handleShoot = (isShooting: boolean) => {
        const gameData = gameDataRef.current;
        if (!gameData.ship) return;
        if(isShooting) {
            if (gameData.ship.canShoot && gameData.ship.lasers.length < 5) {
                gameData.ship.lasers.push({
                    x: gameData.ship.x + 4 / 3 * gameData.ship.r * Math.cos(gameData.ship.a),
                    y: gameData.ship.y - 4 / 3 * gameData.ship.r * Math.sin(gameData.ship.a),
                    xv: LASER_SPEED * Math.cos(gameData.ship.a) / 60,
                    yv: -LASER_SPEED * Math.sin(gameData.ship.a) / 60,
                    dist: 0
                });
                gameData.ship.canShoot = false;
            }
        } else {
            gameData.ship.canShoot = true;
        }
    }

    const handleRotate = (dir: 'left' | 'right' | 'stop') => {
        const gameData = gameDataRef.current;
        if (!gameData.ship) return;
        if (dir === 'left') gameData.ship.rot = TURN_SPEED / 180 * Math.PI / 60;
        else if (dir === 'right') gameData.ship.rot = -TURN_SPEED / 180 * Math.PI / 60;
        else gameData.ship.rot = 0;
    }

    const handleThrust = (isThrusting: boolean) => {
        const gameData = gameDataRef.current;
        if (!gameData.ship) return;
        gameData.ship.thrusting = isThrusting;
    }


    useEffect(() => {
        const handleKeyDown = (ev: KeyboardEvent) => {
            const gameData = gameDataRef.current;
            if (gameStateRef.current === 'start' || gameStateRef.current === 'gameOver') {
                if (ev.key === 'Enter') initGame(true);
                return;
            }
            if (!gameData.ship) return;

            switch (ev.key) {
                case ' ': handleShoot(true); break;
                case 'ArrowLeft': handleRotate('left'); break;
                case 'ArrowRight': handleRotate('right'); break;
                case 'ArrowUp': handleThrust(true); break;
            }
        };

        const handleKeyUp = (ev: KeyboardEvent) => {
            const gameData = gameDataRef.current;
            if (!gameData.ship) return;
            switch (ev.key) {
                case ' ': handleShoot(false); break;
                case 'ArrowLeft': case 'ArrowRight': handleRotate('stop'); break;
                case 'ArrowUp': handleThrust(false); break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, [initGame]);

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
            <header className="text-center mb-6 w-full max-w-4xl px-4">
                <div className="bg-secondary rounded-xl shadow-xl p-6 border border-border">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center justify-center">
                        <Rocket className="h-10 w-10 mr-3 text-primary" />
                        ASTEROID SHOOTER
                    </h1>
                </div>
            </header>
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl w-full flex justify-center">
                <Card ref={gameContainerRef} className="w-full text-center relative overflow-hidden aspect-[4/3] shadow-2xl shadow-primary/20 border-primary/50 bg-black" data-interactive-cursor="true">
                    <CardHeader className="absolute top-2 left-4 right-4 z-20 flex flex-row justify-between items-center text-left">
                        <p className="text-white font-bold text-xl" style={{ textShadow: '2px 2px 4px #000' }}>SCORE: {score}</p>
                        <p className="text-white font-bold text-xl" style={{ textShadow: '2px 2px 4px #000' }}>HIGH: {highScore}</p>
                    </CardHeader>
                    <CardContent className="p-0 h-full w-full">
                        {gameState !== 'playing' && (
                            <div className="absolute inset-0 bg-black/70 z-10 flex flex-col items-center justify-center p-4 text-center">
                                {gameState === 'start' && <>
                                    <CardTitle className="text-4xl mb-4 flex items-center text-shadow-[0_0_10px_#ff00ff]"><Gamepad2 className="inline h-10 w-10 mr-3 text-primary" />ASTEROID SHOOTER</CardTitle>
                                    <CardDescription className="text-md text-white/80 pt-4 max-w-sm mx-auto leading-relaxed">
                                       ARROW KEYS TO MOVE<br />SPACE TO SHOOT
                                    </CardDescription>
                                    <Button size="lg" className="mt-8" onClick={() => initGame(true)}><Play className="mr-2 h-5 w-5" /> START GAME</Button>
                                </>}
                                {gameState === 'gameOver' && <>
                                    <CardTitle className={cn("text-4xl mb-4 flex items-center text-destructive")}><AlertTriangle className="inline h-10 w-10 mr-3" /> GAME OVER</CardTitle>
                                    <Button size="lg" className="mt-8" onClick={() => initGame(true)}><RefreshCw className="mr-2 h-5 w-5" /> PLAY AGAIN</Button>
                                </>}
                            </div>
                        )}
                        <canvas ref={canvasRef} id="gameCanvas" className='w-full h-full' />
                    </CardContent>
                     <CardFooter className={cn("absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col gap-4")}>
                       <div className={cn("w-full justify-between items-center", isTouchDevice ? "flex" : "hidden")}>
                            <div className="flex gap-2">
                                <Button onTouchStart={() => handleRotate('left')} onTouchEnd={() => handleRotate('stop')} variant="outline" size="lg" className="h-16 w-16 text-3xl select-none"><RotateCcw /></Button>
                                <Button onTouchStart={() => handleRotate('right')} onTouchEnd={() => handleRotate('stop')} variant="outline" size="lg" className="h-16 w-16 text-3xl select-none"><RotateCw /></Button>
                            </div>
                             <div className="flex gap-2">
                                <Button onTouchStart={() => handleThrust(true)} onTouchEnd={() => handleThrust(false)} variant="outline" size="lg" className="h-16 w-16 text-3xl select-none"><ArrowUp /></Button>
                                <Button onTouchStart={() => handleShoot(true)} onTouchEnd={() => handleShoot(false)} variant="destructive" size="lg" className="h-16 w-16 text-3xl select-none">FIRE</Button>
                            </div>
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

    