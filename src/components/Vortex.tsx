"use client";

import { useEffect, useRef, useCallback } from "react";

interface VortexProps {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  particleCount?: number;
  rangeY?: number;
  baseHue?: number;
  rangeHue?: number;
  baseSpeed?: number;
  rangeSpeed?: number;
  baseRadius?: number;
  rangeRadius?: number;
  backgroundColor?: string;
}

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  hue: number;
  ttl: number; maxTtl: number;
  radius: number; speed: number;
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function fadeInOut(t: number, m: number) {
  const half = m / 2;
  return 1 - Math.abs((t % m) - half) / half;
}

// Smooth pseudo-noise via summed sines — no external dependency needed
function flowAngle(x: number, y: number, t: number) {
  return (
    Math.sin(x * 0.0055 + t * 0.00028) * 2.5 +
    Math.cos(y * 0.0055 + t * 0.00022) * 2.5 +
    Math.sin((x - y) * 0.004 + t * 0.00035) * 1.2
  ) * Math.PI;
}

export function Vortex({
  children,
  className = "",
  containerClassName = "",
  particleCount = 500,
  rangeY = 400,
  baseHue = 220,
  rangeHue = 100,
  baseSpeed = 0.2,
  rangeSpeed = 1.2,
  baseRadius = 1,
  rangeRadius = 1.5,
  backgroundColor = "#000000",
}: VortexProps) {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const wrapRef    = useRef<HTMLDivElement>(null);
  const rafRef     = useRef<number>(0);
  const tickRef    = useRef(0);
  const partsRef   = useRef<Particle[]>([]);

  const spawn = useCallback((w: number, h: number): Particle => {
    const maxTtl = 60 + Math.random() * 160;
    return {
      x:      rand(0, w),
      y:      rand(h / 2 - rangeY / 2, h / 2 + rangeY / 2),
      vx: 0, vy: 0,
      hue:    baseHue + rand(0, rangeHue),
      ttl:    0,
      maxTtl,
      radius: baseRadius + rand(0, rangeRadius),
      speed:  baseSpeed  + rand(0, rangeSpeed),
    };
  }, [rangeY, baseHue, rangeHue, baseRadius, rangeRadius, baseSpeed, rangeSpeed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap   = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = wrap.offsetWidth;
      canvas.height = wrap.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    partsRef.current = Array.from({ length: particleCount }, () =>
      spawn(canvas.width, canvas.height)
    );

    const frame = () => {
      const t = ++tickRef.current;
      const { width: W, height: H } = canvas;

      // Trail — semi-transparent fill instead of clearRect
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = backgroundColor;
      ctx.globalAlpha = 0.18;
      ctx.fillRect(0, 0, W, H);
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < partsRef.current.length; i++) {
        const p = partsRef.current[i];
        p.ttl++;

        const angle = flowAngle(p.x, p.y, t);
        p.vx = p.vx * 0.94 + Math.cos(angle) * p.speed * 0.06;
        p.vy = p.vy * 0.94 + Math.sin(angle) * p.speed * 0.06;
        p.x += p.vx;
        p.y += p.vy;

        const alpha = fadeInOut(p.ttl, p.maxTtl) * 0.85;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},85%,65%,${alpha})`;
        ctx.fill();

        if (
          p.ttl >= p.maxTtl ||
          p.x < -20 || p.x > W + 20 ||
          p.y < -20 || p.y > H + 20
        ) {
          partsRef.current[i] = spawn(W, H);
        }
      }

      ctx.globalCompositeOperation = "source-over";
      rafRef.current = requestAnimationFrame(frame);
    };

    rafRef.current = requestAnimationFrame(frame);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [backgroundColor, particleCount, spawn]);

  return (
    <div ref={wrapRef} className={`relative overflow-hidden ${containerClassName}`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className={`relative z-10 ${className}`}>{children}</div>
    </div>
  );
}
