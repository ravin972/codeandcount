
"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ToyBrick, Play, RefreshCw, Gamepad2, AlertTriangle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { default as ToneType } from 'tone';

// --- Game Configuration ---
const GRAVITY = 0.6;
const MOVE_SPEED = 0.3;
const MAX_SPEED = 4.5;
const FRICTION = 0.88;
const JUMP_POWER = -12;
let TILE_SIZE = 32;

const levelMap = [
    '                                                                                                                                                                         ',
    '                                                                                                                                                                         ',
    '                                    ?b?                                                                                                                                ',
    '                                                                                                                                                                         ',
    '                                                                                                                                    pp                                   ',
    '                                   bbbb                                                                     bb?bb                   pp                                   ',
    '                                                                                                                                                                         ',
    '                   bb      Mb?b                pp                                                                                                                        ',
    '                                               pp                                                                                                                        ',
    '                                                                                                               g   g                                                     ',
    '                           g   g g                                   g                                                                                                   ',
    'gggggggggggggg gg gggggg          gggggg      bbbbbb       ?   ?   ?      ggggg     gggggggg      gggggggggggggggg   ggggggggg ggggggg gggg   gggggggg g       g F         ',
    'gggggggggggggg gg gggggg ggggg    gggggg                   b   b   b      ggggg     gggggggg      gggggggggggggggg   ggggggggg ggggggg gggg   gggggggg g       g g         ',
    'gggggggggggggg gg gggggg ggggg    gggggg      bbbbbb       b   b   b      ggggg     gggggggg      gggggggggggggggg   ggggggggg ggggggg gggg   gggggggg g       g g         ',
    'gggggggggggggg gg gggggg ggggg    gggggg      bbbbbb                      gggggggggggggggggg      gggggggggggggggg   ggggggggg ggggggg gggg   gggggggg ggggggggg g         '
];

export default function SuperRetroPlatformerPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const gameDataRef = useRef<any>({});
    const toneRef = useRef<typeof ToneType | null>(null);

    const [gameState, setGameState] = useState<'start' | 'playing' | 'dead_start' | 'win' | 'gameOver'>('start');
    const [score, setScore] = useState(0);
    const [coins, setCoins] = useState(0);
    const [lives, setLives] = useState(3);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    
    const gameStateRef = useRef(gameState);
    useEffect(() => {
        gameStateRef.current = gameState;
    }, [gameState]);


    useEffect(() => {
        setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
        
        import('tone').then(module => {
            toneRef.current = module.default;
            initGame();
        });
        
        window.addEventListener('resize', initGame);
        
        let animationFrameId: number;
        const renderLoop = () => { gameLoop(); animationFrameId = requestAnimationFrame(renderLoop); };
        renderLoop();
        
        return () => { 
            window.removeEventListener('resize', initGame);
            cancelAnimationFrame(animationFrameId); 
            if (toneRef.current) {
                const Tone = toneRef.current;
                if (Tone.Transport.state === 'started') {
                    Tone.Transport.stop();
                    Tone.Transport.cancel();
                }
            }
        };
    }, []);

    // --- Sound Engine ---
    const initSounds = useCallback(() => {
        const Tone = toneRef.current;
        if (!Tone || gameDataRef.current.sounds) return;

        const sounds = {
            jump: new Tone.Synth({ oscillator: { type: 'triangle' }, envelope: { attack: 0.005, decay: 0.1, sustain: 0, release: 0.1 } }).toDestination(),
            coin: new Tone.Synth({ oscillator: { type: 'square' }, envelope: { attack: 0.005, decay: 0.1, sustain: 0.1, release: 0.1 } }).toDestination(),
            stomp: new Tone.MembraneSynth().toDestination(),
            powerup: new Tone.Synth({ oscillator: { type: 'triangle' }, envelope: { attack: 0.01, decay: 0.2, sustain: 0.2, release: 0.2 } }).toDestination(),
            powerdown: new Tone.Synth({ oscillator: { type: 'sawtooth' }, envelope: { attack: 0.01, decay: 0.3, sustain: 0, release: 0.2 } }).toDestination(),
            death: new Tone.Synth({ oscillator: { type: 'fmsquare' }, envelope: { attack: 0.01, decay: 0.5, sustain: 0, release: 0.5 } }).toDestination(),
            win: new Tone.Synth({ oscillator: { type: 'sine' }, envelope: { attack: 0.01, decay: 0.5, sustain: 0, release: 0.5 } }).toDestination(),
            powerupAppear: new Tone.Synth({ oscillator: { type: 'sine' }, envelope: { attack: 0.01, decay: 0.1, sustain: 0, release: 0.1 } }).toDestination(),
        };
        const musicSynth = new Tone.Synth().toDestination();
        const musicPattern = new Tone.Sequence((time, note) => {
            musicSynth.triggerAttackRelease(note, "8n", time);
        }, ["C4", ["E4", "G4"], "C5", ["E5", "G4"], "C4", ["G4", "E4"], "C5", ["G5", "E4"]], "4n");
        musicPattern.loop = true;
        
        gameDataRef.current.sounds = sounds;
        gameDataRef.current.musicPattern = musicPattern;
    }, []);

    const playSound = useCallback((sound: string) => {
        const Tone = toneRef.current;
        const sounds = gameDataRef.current.sounds;
        if (!sounds || !Tone || Tone.context.state !== 'running') return;

        try {
            if (sound === 'jump') sounds.jump.triggerAttackRelease('C5', '8n');
            else if (sound === 'coin') sounds.coin.triggerAttackRelease('E6', '16n');
            else if (sound === 'stomp') sounds.stomp.triggerAttackRelease('C2', '8n');
            else if (sound === 'powerup') sounds.powerup.triggerAttackRelease('G5', '4n');
            else if (sound === 'powerdown') sounds.powerdown.triggerAttackRelease('G4', '4n');
            else if (sound === 'death') sounds.death.triggerAttackRelease('C3', '2n');
            else if (sound === 'win') sounds.win.triggerAttackRelease('G5', '1n');
            else if (sound === 'powerupAppear') sounds.powerupAppear.triggerAttackRelease('A5', '16n');
        } catch (error) {
            console.error(`Error playing sound ${sound}:`, error);
        }
    }, []);
    
    const toggleMusic = useCallback((play: boolean) => {
        const Tone = toneRef.current;
        if (!Tone || !gameDataRef.current.musicPattern) return;
        if(play) { 
            if (Tone.Transport.state !== 'started') {
                Tone.Transport.start(); 
            }
            if (gameDataRef.current.musicPattern.state !== 'started') {
                 gameDataRef.current.musicPattern.start(0);
            }
        } else { 
            if (Tone.Transport.state === 'started') {
                Tone.Transport.stop(); 
            }
        }
    }, []);

    // --- Game Logic Classes and Functions ---
    const initGame = useCallback((fullReset = true) => {
        const canvas = canvasRef.current;
        if (!canvas || !toneRef.current) return;

        const ar = 16 / 9;
        let cH = window.innerHeight * 0.7;
        let cW = cH * ar;
        if (cW > window.innerWidth * 0.95) { cW = window.innerWidth * 0.95; cH = cW / ar; }
        canvas.width = cW; canvas.height = cH;
        TILE_SIZE = canvas.height / 15;
        
        if (fullReset) {
            setScore(0);
            setLives(3);
            setCoins(0);
            setGameState('start');
        }

        gameDataRef.current.keys = { left: false, right: false, up: false };
        gameDataRef.current.camera = { x: 0 };
        gameDataRef.current.player = new Player(0,0);
        
        gameDataRef.current.clouds = Array.from({length: 10}, () => new Cloud(Math.random() * cW * 3, Math.random() * cH * 0.5));
        
        if (toneRef.current && !gameDataRef.current.sounds) initSounds();
        initLevel(fullReset);
        toggleMusic(false);
    }, [initSounds, toggleMusic]);

    const initLevel = (isFullReset: boolean) => {
        const gameData = gameDataRef.current;
        gameData.platforms = [];
        gameData.enemies = [];
        gameData.items = [];
        gameData.flagpole = null;

        levelMap.forEach((row, r) => {
            for (let c = 0; c < row.length; c++) {
                const char = row[c]; const x = c * TILE_SIZE; const y = r * TILE_SIZE;
                if (char === 'g') gameData.platforms.push(new Platform(x, y, 'g'));
                if (char === 'b') gameData.platforms.push(new Platform(x, y, 'b'));
                if (char === '?' || char === 'M') gameData.platforms.push(new Platform(x, y, char));
                if (char === 'p') { gameData.platforms.push(new Platform(x, y, 'p')); gameData.platforms.push(new Platform(x, y-TILE_SIZE, 'p')); }
                if (char === 'F') gameData.flagpole = new Flagpole(x, y - TILE_SIZE * 4);
            }
        });

        if (gameData.player) {
            gameData.player.reset(TILE_SIZE * 3, TILE_SIZE * 10);
        }
        gameData.enemies.push(new Enemy(TILE_SIZE * 20, TILE_SIZE * 10));
        gameData.enemies.push(new Enemy(TILE_SIZE * 30, TILE_SIZE * 10));
        gameData.enemies.push(new Enemy(TILE_SIZE * 55, TILE_SIZE * 10));
        gameData.enemies.push(new Enemy(TILE_SIZE * 57, TILE_SIZE * 10));
        gameData.enemies.push(new Enemy(TILE_SIZE * 100, TILE_SIZE * 10));
        gameData.enemies.push(new Enemy(TILE_SIZE * 102, TILE_SIZE * 10));
        
        if(isFullReset){
            setScore(0);
            setCoins(0);
            setLives(3);
        }
    };

    class Player {
        x=0; y=0; dx=0; dy=0; width=0; height=0; onGround=false; size='small'; invincible=false; invincibleTimer=0; animFrame=0; facing=1;
        constructor(x:number, y:number) { this.reset(x, y); }
        reset(x:number, y:number) { this.x = x; this.y = y; this.dx = 0; this.dy = 0; this.width = TILE_SIZE * 0.8; this.height = TILE_SIZE * 0.9; this.onGround = false; this.size = 'small'; this.invincible = false; this.invincibleTimer = 0; this.animFrame = 0; this.facing = 1; }
        draw(ctx: CanvasRenderingContext2D) {
            if (this.invincible && Math.floor(this.invincibleTimer / 5) % 2 === 0) return;
            const height = this.size === 'small' ? this.height : this.height * 2;
            ctx.save(); ctx.translate(this.x, this.y);
            if (this.facing < 0) { ctx.scale(-1, 1); ctx.translate(-this.width, 0); }
            const isSkidding = this.onGround && Math.abs(this.dx) > 2 && ((this.dx > 0 && gameDataRef.current.keys.left) || (this.dx < 0 && gameDataRef.current.keys.right));
            ctx.fillStyle = '#dc2626'; ctx.fillRect(-this.width * 0.1, 0, this.width * 1.2, height * 0.25); ctx.fillRect(0, height * 0.2, this.width, height * 0.1);
            ctx.fillStyle = '#fcd34d'; ctx.fillRect(0, height * 0.25, this.width, height * 0.3);
            ctx.fillStyle = '#000000'; ctx.fillRect(this.width * 0.6, height * 0.35, this.width * 0.2, this.width * 0.15);
            ctx.fillStyle = '#f97316'; ctx.fillRect(0, height * 0.55, this.width, height * 0.45);
            ctx.fillStyle = '#854d0e';
            if (isSkidding) { ctx.fillRect(this.width * -0.2, height - (height * 0.1), this.width * 0.6, height * 0.1); }
            else if (!this.onGround) { ctx.fillRect(this.width * 0.1, height, this.width * 0.8, height * 0.1); }
            else if (Math.abs(this.dx) > 0.5) { this.animFrame = (this.animFrame + 0.25) % 2; if (Math.floor(this.animFrame) === 0) { ctx.fillRect(this.width * 0.5, height, this.width * 0.5, height * 0.1); } else { ctx.fillRect(0, height, this.width * 0.5, height * 0.1); } }
            else { ctx.fillRect(this.width * 0.1, height, this.width * 0.3, height * 0.1); ctx.fillRect(this.width * 0.6, height, this.width * 0.3, height * 0.1); }
            ctx.restore();
        }
        update() {
            const keys = gameDataRef.current.keys; if (keys.left) { this.dx -= MOVE_SPEED; this.facing = -1; }
            if (keys.right) { this.dx += MOVE_SPEED; this.facing = 1; }
            if (keys.up && this.onGround) { this.dy = JUMP_POWER; this.onGround = false; playSound('jump'); }
            if (!keys.up && this.dy < -4) { this.dy = -4; }
            this.dy += GRAVITY; this.dx *= FRICTION; if(Math.abs(this.dx) > MAX_SPEED) this.dx = MAX_SPEED * Math.sign(this.dx);
            this.x += this.dx; this.handleHorizontalCollisions(); this.y += this.dy; this.handleVerticalCollisions();
            if (this.invincible) { this.invincibleTimer--; if (this.invincibleTimer <= 0) this.invincible = false; }
            if (this.y > canvasRef.current!.height + TILE_SIZE * 2) this.die();
        }
        handleHorizontalCollisions() {
            gameDataRef.current.platforms.forEach((p:Platform) => { if (this.x < p.x + p.width && this.x + this.width > p.x && this.y < p.y + p.height && this.y + this.height > p.y) { if (this.dx > 0) this.x = p.x - this.width; else if (this.dx < 0) this.x = p.x + p.width; this.dx = 0; } });
        }
        handleVerticalCollisions() {
            this.onGround = false;
            for (let i = gameDataRef.current.platforms.length - 1; i >= 0; i--) {
                const p = gameDataRef.current.platforms[i];
                if (this.x < p.x + p.width && this.x + this.width > p.x && this.y < p.y + p.height && this.y + this.height > p.y) {
                    if (this.dy > 0 && this.y + this.height - this.dy <= p.y) { this.y = p.y - this.height; this.dy = 0; this.onGround = true; }
                    else if (this.dy < 0 && this.y - this.dy >= p.y + p.height) { this.y = p.y + p.height; this.dy = 0.1; if (p.type === '?' || p.type === 'M') { p.hit(this.facing); } else if (p.type === 'b' && this.size === 'big') { gameDataRef.current.platforms.splice(i, 1); } }
                }
            }
        }
        powerUp() { if (this.size === 'small') { this.size = 'big'; this.y -= this.height; this.height *= 2; playSound('powerup'); } else { setScore(s => s + 500); } }
        takeDamage() { if (this.invincible) return; if (this.size === 'big') { this.size = 'small'; this.height /= 2; this.invincible = true; this.invincibleTimer = 90; playSound('powerdown'); } else { this.die(); } }
        die() { 
            playSound('death'); toggleMusic(false);
            setLives(l => {
                const newLives = l - 1;
                if (newLives > 0) {
                    setGameState('dead_start');
                } else {
                    setGameState('gameOver');
                }
                return newLives;
            });
        }
    }
    class Enemy { x=0; y=0; dx=-1; width=0; height=0; stomped=false; animFrame=0; constructor(x:number, y:number) { this.x = x; this.y = y; this.width = TILE_SIZE; this.height = TILE_SIZE; }
        draw(ctx: CanvasRenderingContext2D) { ctx.save(); ctx.translate(this.x, this.y); ctx.fillStyle = '#854d0e'; const h = this.stomped ? this.height / 2 : this.height; ctx.fillRect(0, this.height - h, this.width, h); if(!this.stomped) { this.animFrame = (this.animFrame + 0.1) % 2; ctx.fillStyle = '#a16207'; if (Math.floor(this.animFrame) === 0) { ctx.fillRect(0, this.height, this.width * 0.4, this.height * 0.2); } else { ctx.fillRect(this.width * 0.6, this.height, this.width * 0.4, this.height * 0.2); } } ctx.restore(); }
        update() { if (this.stomped) return; this.x += this.dx; let onPlatform = false, turnAround = false;
            gameDataRef.current.platforms.forEach((p:Platform) => { if (this.x < p.x + p.width && this.x + this.width > p.x && this.y + this.height >= p.y && this.y < p.y) { this.y = p.y - this.height; onPlatform = true; const nextX = this.x + (this.dx > 0 ? this.width : 0) + this.dx; if(!gameDataRef.current.platforms.some((p2:Platform) => p2 !== p && nextX >= p2.x && nextX <= p2.x + p2.width && p2.y === p.y)) turnAround = true; } });
            if(turnAround) this.dx *= -1; if(!onPlatform) this.y += 5;
        }
    }
    class Item { x=0; y=0; type:string; width=0; height=0; dx=0; dy=0; constructor(x:number,y:number,type:string, dir:number) { this.x = x; this.y = y; this.type = type; this.width = TILE_SIZE; this.height = TILE_SIZE; this.dx = 1.5 * dir; this.dy = -3; }
        draw(ctx: CanvasRenderingContext2D) { if(this.type === 'mushroom') { ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.moveTo(this.x, this.y + this.height); ctx.lineTo(this.x, this.y + this.height / 2); ctx.quadraticCurveTo(this.x + this.width / 2, this.y - this.height / 4, this.x + this.width, this.y + this.height / 2); ctx.lineTo(this.x + this.width, this.y + this.height); ctx.closePath(); ctx.fill(); ctx.fillStyle = 'white'; ctx.fillRect(this.x + this.width * 0.2, this.y + this.height * 0.2, this.width * 0.2, this.width*0.2); ctx.fillRect(this.x + this.width * 0.6, this.y + this.height * 0.2, this.width * 0.2, this.width*0.2); } }
        update() { this.dy += GRAVITY/2; this.x += this.dx; this.y += this.dy; gameDataRef.current.platforms.forEach((p:Platform) => { if (this.x < p.x + p.width && this.x + this.width > p.x && this.y < p.y + p.height && this.y + this.height > p.y) { if(this.dy > 0 && this.y + this.height - this.dy <= p.y) { this.y = p.y - this.height; this.dy = 0; } else if(this.dx !== 0) { this.dx *= -1; } } }); }
    }
    class Platform { x=0; y=0; width=0; height=0; type:string; originalType:string; constructor(x:number, y:number, type:string) { this.x = x; this.y = y; this.width = TILE_SIZE; this.height = TILE_SIZE; this.type = type; this.originalType = type;}
        draw(ctx: CanvasRenderingContext2D) { let color = '#d97706'; if (this.type === 'b') color = '#f97316'; if (this.type === '?' || this.type === 'M') color = '#f59e0b'; if (this.type === 'used') color = '#a16207'; if (this.type === 'p') color = '#16a34a'; ctx.fillStyle = color; ctx.fillRect(this.x, this.y, this.width, this.height); if (this.type === 'b') { ctx.fillStyle = 'rgba(0,0,0,0.2)'; ctx.fillRect(this.x, this.y, this.width, this.height/4); ctx.fillRect(this.x, this.y, this.width/4, this.height); } }
        hit(dir: number) { if(this.type === '?') { setCoins(c => c + 1); setScore(s => s + 100); playSound('coin'); this.type = 'used'; } else if(this.type === 'M') { playSound('powerupAppear'); gameDataRef.current.items.push(new Item(this.x, this.y - TILE_SIZE, 'mushroom', dir)); this.type = 'used'; } }
    }
    class Flagpole { x=0; y=0; width=0; height=0; constructor(x:number,y:number) { this.x = x; this.y = y; this.width = TILE_SIZE/4; this.height = TILE_SIZE*5; } draw(ctx: CanvasRenderingContext2D) { ctx.fillStyle = '#d1d5db'; ctx.fillRect(this.x, this.y, this.width, this.height); } }
    class Cloud { x=0; y=0; speed=0; constructor(x:number,y:number) { this.x = x; this.y = y; this.speed = 0.2 + Math.random() * 0.3; }
        draw(ctx: CanvasRenderingContext2D) { ctx.fillStyle = 'rgba(255,255,255,0.9)'; ctx.fillRect(this.x, this.y, TILE_SIZE * 2, TILE_SIZE); ctx.fillRect(this.x + TILE_SIZE*0.5, this.y-TILE_SIZE*0.5, TILE_SIZE, TILE_SIZE); }
        update(camera: any) { this.x -= this.speed; if (this.x < -TILE_SIZE*3 - camera.x) this.x = canvasRef.current!.width + TILE_SIZE*2 + camera.x; }
    }

    const gameLoop = useCallback(() => {
        const ctx = canvasRef.current?.getContext('2d');
        const canvas = canvasRef.current;
        if (!ctx || !canvas || !gameDataRef.current.player) return;
        
        const currentGameState = gameStateRef.current;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#5d94f5'; ctx.fillRect(0, 0, canvas.width, canvas.height);

        const gameData = gameDataRef.current;
        const { player, camera, clouds, platforms, flagpole, items, enemies } = gameData;

        ctx.save(); ctx.translate(-camera.x * 0.5, 0); clouds.forEach((c:Cloud) => c.draw(ctx)); ctx.restore();

        if (currentGameState === 'playing') {
            player.update();
            enemies.forEach((e:Enemy, i:number) => { e.update(); if (player.x < e.x + e.width && player.x + player.width > e.x && player.y < e.y + e.height && player.y + player.height > e.y) { if (player.dy > 0.1 && player.y + player.height - player.dy <= e.y && !e.stomped) { e.stomped = true; player.dy = -6; setScore(s => s + 200); playSound('stomp'); setTimeout(() => enemies.splice(i, 1), 200); } else if (!e.stomped) { player.takeDamage(); } } });
            items.forEach((item:Item, i:number) => { item.update(); if(player.x < item.x + item.width && player.x + player.width > item.x && player.y < item.y + item.height && player.y + player.height > item.y) { player.powerUp(); items.splice(i, 1); } });
            if (flagpole && player.x + player.width > flagpole.x && currentGameState !== 'win') { setGameState('win'); playSound('win'); toggleMusic(false); }
            camera.x = player.x - canvas.width / 2.5; if(camera.x < 0) camera.x = 0;
            clouds.forEach((c:Cloud) => c.update(camera));
        }
        if(currentGameState === 'win') { player.dx = 0; player.x = flagpole.x; if(player.onGround === false) { player.y += 5; player.handleVerticalCollisions();} }
        if(currentGameState === 'dead_start') { gameData.deadTimer = (gameData.deadTimer || 0) + 1; if(gameData.deadTimer > 120) { initLevel(false); setGameState('playing'); gameData.deadTimer = 0; toggleMusic(true); } }
        
        ctx.save(); ctx.translate(-camera.x, 0);
        platforms.forEach((p:Platform) => p.draw(ctx));
        if(flagpole) flagpole.draw(ctx);
        items.forEach((i:Item) => i.draw(ctx));
        enemies.forEach((e:Enemy) => e.draw(ctx));
        player.draw(ctx);
        ctx.restore();
    }, [playSound, toggleMusic]);

    const handleStartGame = useCallback(() => {
        const Tone = toneRef.current;
        if (gameStateRef.current === 'start') {
            if (Tone && Tone.context.state === 'suspended') {
                Tone.start();
            }
            initGame(true); // Full reset for start
            setGameState('playing');
            toggleMusic(true);
        } else if (gameStateRef.current === 'gameOver' || gameStateRef.current === 'win') {
            initGame(true);
            setGameState('playing');
            toggleMusic(true);
        }
    }, [initGame, toggleMusic]);
    
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.repeat) return;
            const keys = gameDataRef.current.keys;
            if (!keys) return;
            if (e.code === 'ArrowLeft' || e.code === 'KeyA') keys.left = true;
            if (e.code === 'ArrowRight' || e.code === 'KeyD') keys.right = true;
            if (e.code === 'ArrowUp' || e.code === 'KeyW' || e.code === 'Space') keys.up = true;
            if (e.code === 'Enter') handleStartGame();
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            const keys = gameDataRef.current.keys;
            if (!keys) return;
            if (e.code === 'ArrowLeft' || e.code === 'KeyA') keys.left = false;
            if (e.code === 'ArrowRight' || e.code === 'KeyD') keys.right = false;
            if (e.code === 'ArrowUp' || e.code === 'KeyW' || e.code === 'Space') keys.up = false;
        };
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, [handleStartGame]);

    const handleTouch = (key: 'left' | 'right' | 'up', isDown: boolean) => {
      if (gameDataRef.current.keys) {
        gameDataRef.current.keys[key] = isDown;
      }
      if (isDown && (gameStateRef.current === 'start' || gameStateRef.current === 'gameOver' || gameStateRef.current === 'win')) {
        handleStartGame();
      }
    };

    return (
        <div className="bg-background text-foreground min-h-screen py-8 flex flex-col items-center justify-center">
            <header className="text-center mb-6 w-full max-w-4xl px-4">
                <div className="bg-secondary rounded-xl shadow-xl p-6 border border-border">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center justify-center">
                        <ToyBrick className="h-10 w-10 mr-3 text-primary" />
                        Super Retro Platformer
                    </h1>
                </div>
            </header>

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl w-full flex justify-center">
                <Card className="text-center relative aspect-video" data-interactive-cursor="true">
                    <CardHeader className="absolute top-2 left-2 z-20 text-left">
                        <p className="text-white font-bold" style={{ textShadow: '2px 2px 4px #000' }}>Score: {score}</p>
                        <p className="text-white font-bold" style={{ textShadow: '2px 2px 4px #000' }}>Coins: {coins}</p>
                    </CardHeader>
                    <CardHeader className="absolute top-2 right-2 z-20 text-right">
                         <p className="text-white font-bold" style={{ textShadow: '2px 2px 4px #000' }}>Lives: {lives}</p>
                    </CardHeader>
                    <CardContent className="p-0 relative h-full w-full flex items-center justify-center">
                        {gameState !== 'playing' && (
                            <div className="absolute inset-0 bg-black/70 z-10 flex flex-col items-center justify-center p-4 text-center">
                                {gameState === 'start' && <>
                                    <CardTitle className="text-3xl mb-4 flex items-center"><Gamepad2 className="inline h-8 w-8 mr-2 text-primary" />Ready to Play?</CardTitle>
                                    <CardDescription className="text-md text-white/80 pt-2 max-w-sm mx-auto">Use Arrow Keys or A/D to move, Space/W to jump. Press Enter to start.</CardDescription>
                                    <Button size="lg" className="mt-6" onClick={handleStartGame}><Play className="mr-2 h-5 w-5" /> Start Game</Button>
                                </>}
                                {(gameState === 'gameOver' || gameState === 'win') && <>
                                    <CardTitle className={cn("text-3xl mb-4 flex items-center", gameState === 'gameOver' && "text-destructive")}>{gameState === 'gameOver' ? <AlertTriangle className="inline h-8 w-8 mr-2" /> : "🎉"} {gameState === 'gameOver' ? 'GAME OVER' : 'YOU WIN!'}</CardTitle>
                                    <CardDescription className="text-xl mt-2 text-white">Final Score: {score}</CardDescription>
                                    <Button size="lg" className="mt-6" onClick={handleStartGame}><RefreshCw className="mr-2 h-5 w-5" /> Play Again</Button>
                                </>}
                            </div>
                        )}
                        <canvas ref={canvasRef} id="gameCanvas" />
                    </CardContent>
                    <CardFooter className={cn("p-4 border-t flex flex-col items-center justify-center gap-4")}>
                        <div className={cn("w-full max-w-sm justify-between items-center", isTouchDevice ? "flex" : "hidden")}>
                            <div className="flex gap-4">
                                <Button onTouchStart={(e) => {e.preventDefault(); handleTouch('left', true)}} onTouchEnd={(e) => {e.preventDefault(); handleTouch('left', false)}} variant="outline" size="lg" className="h-16 w-16 rounded-full text-3xl select-none">←</Button>
                                <Button onTouchStart={(e) => {e.preventDefault(); handleTouch('right', true)}} onTouchEnd={(e) => {e.preventDefault(); handleTouch('right', false)}} variant="outline" size="lg" className="h-16 w-16 rounded-full text-3xl select-none">→</Button>
                            </div>
                            <Button onTouchStart={(e) => {e.preventDefault(); handleTouch('up', true)}} onTouchEnd={(e) => {e.preventDefault(); handleTouch('up', false)}} variant="destructive" size="lg" className="h-20 w-20 rounded-full text-3xl font-bold select-none">A</Button>
                        </div>
                         <Button size="lg" variant="outline" asChild>
                            <Link href="/games"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Games</Link>
                        </Button>
                     </CardFooter>
                </Card>
            </main>
        </div>
    );
}


    

    