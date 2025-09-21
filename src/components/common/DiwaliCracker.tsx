
"use client";

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Flame } from 'lucide-react';

const Cracker = () => {
    const [particles, setParticles] = useState<any[]>([]);

    useEffect(() => {
        const newParticles = Array.from({ length: 50 }).map((_, i) => {
            const angle = Math.random() * 360;
            const radius = Math.random() * 150 + 50;
            const x = Math.cos(angle * (Math.PI / 180)) * radius;
            const y = Math.sin(angle * (Math.PI / 180)) * radius;
            const size = Math.random() * 10 + 5;
            const delay = Math.random() * 0.5;
            const duration = Math.random() * 0.5 + 0.5;

            const colors = ['hsl(var(--primary))', 'hsl(var(--accent))', '#FFD700', '#FFFFFF'];
            const color = colors[Math.floor(Math.random() * colors.length)];

            return {
                id: i,
                style: {
                    transform: `translate(${x}px, ${y}px)`,
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: color,
                    animationDelay: `${delay}s`,
                    animationDuration: `${duration}s`
                }
            };
        });
        setParticles(newParticles);
    }, []);

    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {particles.map(p => (
                <div key={p.id} className="cracker-particle" style={p.style} />
            ))}
        </div>
    );
};

export default function DiwaliCracker() {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background pointer-events-none">
            <Cracker />
            <h2 className="relative text-3xl sm:text-5xl lg:text-6xl font-bold text-amber-400 animate-text-glow-and-fade flex items-center gap-2">
                Happy Diwali 2025!
                <Flame className="inline-block text-orange-500" />
            </h2>
        </div>
    );
}
