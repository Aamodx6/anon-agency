'use client';

import React, { useEffect, useRef } from 'react';

interface Coin {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  angle: number;
  vAngle: number;
  color: string;
}

export function HeroCoins() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const hero = canvas.parentElement;
    if (!hero) return;

    let width = (canvas.width = hero.clientWidth);
    let height = (canvas.height = hero.clientHeight);

    const onResize = () => {
      width = canvas.width = hero.clientWidth;
      height = canvas.height = hero.clientHeight;
    };
    window.addEventListener('resize', onResize);

    const coins: Coin[] = [];
    const gravity = 0.45;
    const bounce = 0.55;
    const friction = 0.98;

    const spawnCoin = (x: number, y: number) => {
      coins.push({
        x: x || Math.random() * width,
        y: y || -20,
        vx: (Math.random() - 0.5) * 6,
        vy: Math.random() * 4 + 2,
        radius: Math.min(24, Math.max(16, width * 0.016)),
        angle: Math.random() * Math.PI * 2,
        vAngle: (Math.random() - 0.5) * 0.15,
        color: '#ffcc00'
      });
    };

    // Spawn 8 initial coins with stagger
    for (let i = 0; i < 7; i++) {
      setTimeout(() => {
        spawnCoin(width * (0.15 + Math.random() * 0.7), -30);
      }, i * 350);
    }

    // Spawn on user click
    const onHeroClick = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      for (let i = 0; i < 3; i++) {
        spawnCoin(clickX + (Math.random() - 0.5) * 40, clickY - 20);
      }
    };
    hero.addEventListener('click', onHeroClick);

    let animId: number;
    const render = () => {
      animId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, width, height);

      // Floor line calculation (near the bottom meta rule)
      const floorY = height - 70;

      for (let i = 0; i < coins.length; i++) {
        const c = coins[i];
        c.vy += gravity;
        c.x += c.vx;
        c.y += c.vy;
        c.angle += c.vAngle;
        c.vx *= friction;

        // Floor collision
        if (c.y + c.radius > floorY) {
          c.y = floorY - c.radius;
          c.vy = -c.vy * bounce;
          c.vAngle *= 0.8;
          if (Math.abs(c.vy) < 1) c.vy = 0;
        }

        // Walls
        if (c.x - c.radius < 20) {
          c.x = 20 + c.radius;
          c.vx = -c.vx * bounce;
        } else if (c.x + c.radius > width - 20) {
          c.x = width - 20 - c.radius;
          c.vx = -c.vx * bounce;
        }

        // Draw gold coin with "a." awake mark
        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate(c.angle);

        // Outer rim
        ctx.beginPath();
        ctx.arc(0, 0, c.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#ff003d';
        ctx.fill();
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();

        // Inner circle
        ctx.beginPath();
        ctx.arc(0, 0, c.radius * 0.75, 0, Math.PI * 2);
        ctx.fillStyle = '#161d25';
        ctx.fill();

        // "A." Anon mark
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold ${c.radius * 0.7}px Syne, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('A.', 0, -1);

        ctx.restore();
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      hero.removeEventListener('click', onHeroClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="HeroCoins-canvas"
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5
      }}
    />
  );
}
