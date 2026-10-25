'use client';

import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { registerGsap, prefersReducedMotion } from '@/src/animations/tokens';

function splineD(points: { x: number; y: number }[]): string {
  if (points.length < 2) return '';
  let d = `M${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const cp1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
    const cp2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };
    d += `C${cp1.x.toFixed(1)} ${cp1.y.toFixed(1)} ${cp2.x.toFixed(1)} ${cp2.y.toFixed(1)} ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

function loopAround(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  startAngle: number,
  dir = 1,
  tiltDeg = -6
) {
  const points = [];
  const tiltRad = (tiltDeg * Math.PI) / 180;
  for (let i = 0; i <= 16; i++) {
    const angle = startAngle + (i / 16) * dir * 1.1 * Math.PI * 2;
    const scale = 1 + (i / 16) * 0.07;
    const x = Math.cos(angle) * rx * scale;
    const y = Math.sin(angle) * ry * scale;
    points.push({
      x: cx + x * Math.cos(tiltRad) - y * Math.sin(tiltRad),
      y: cy + x * Math.sin(tiltRad) + y * Math.cos(tiltRad),
    });
  }
  return points;
}

function generateScribblePoints(w: number, h: number) {
  const rnd = Math.random;
  const edgePoint = (edge: number) => {
    const t = 0.15 + 0.7 * rnd();
    if (edge === 0) return { x: t, y: -0.15 };
    if (edge === 1) return { x: 1.15, y: t };
    if (edge === 2) return { x: t, y: 1.15 };
    return { x: -0.15, y: t };
  };

  const startEdge = Math.floor(4 * rnd());
  const endEdge = (startEdge + 1 + Math.floor(3 * rnd())) % 4;
  const points = [edgePoint(startEdge)];
  const internalCount = 3 + Math.floor(2 * rnd());
  const loopIdx = 1 + Math.floor(rnd() * (internalCount - 1));
  let prev = points[0];

  for (let i = 0; i < internalCount; i++) {
    const pt = { x: 0.15 + 0.7 * rnd(), y: 0.15 + 0.7 * rnd() };
    if (i === loopIdx) {
      const radius = (0.2 + 0.1 * rnd()) * Math.min(w, h);
      const angle = Math.atan2((prev.y - pt.y) * h, (prev.x - pt.x) * w);
      const loop = loopAround(
        0,
        0,
        radius,
        radius * (0.8 + 0.3 * rnd()),
        angle,
        rnd() < 0.5 ? 1 : -1,
        (rnd() - 0.5) * 16
      );
      points.push(...loop.map((p) => ({ x: pt.x + p.x / w, y: pt.y + p.y / h })));
    } else {
      points.push(pt);
    }
    prev = points[points.length - 1];
  }
  points.push(edgePoint(endEdge));
  return points;
}

export interface BandScribbleProps {
  mode?: 'beat' | 'scroll' | 'idle';
  route?: (parent: HTMLElement) => { x: number; y: number }[];
  durationMs?: number;
  paused?: boolean;
  tone?: string;
  width?: number;
  start?: string;
  end?: string;
  className?: string;
}

export function BandScribble({
  mode = 'scroll',
  route,
  durationMs = 4000,
  paused = false,
  tone = 'pink',
  width,
  start = 'top 85%',
  end = 'bottom 60%',
  className = '',
}: BandScribbleProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const animRef = useRef<Animation | null>(null);

  useLayoutEffect(() => {
    const anim = animRef.current;
    if (anim && mode === 'beat') {
      if (paused) {
        anim.pause();
      } else if (anim.playState === 'paused') {
        anim.play();
      }
    }
  }, [paused, mode]);

  useLayoutEffect(() => {
    const svg = svgRef.current;
    const path = pathRef.current;
    const parent = svg?.parentElement;
    if (!svg || !path || !parent) return;

    registerGsap();
    const reduced = prefersReducedMotion();
    const normPoints = generateScribblePoints(parent.clientWidth || 1, parent.clientHeight || 1);

    const updateView = () => {
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      if (!w || !h) return false;

      svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
      path.style.strokeWidth = `${
        width ??
        (mode === 'beat'
          ? Math.min(22, Math.max(10, 0.075 * Math.min(w, h)))
          : Math.min(40, Math.max(16, (2.2 * window.innerWidth) / 100)))
      }px`;

      const pts =
        mode === 'scroll' && route
          ? route(parent)
          : normPoints.map((p) => ({ x: p.x * w, y: p.y * h }));

      path.setAttribute('d', splineD(pts));
      return true;
    };

    if (!updateView()) return;
    const ro = new ResizeObserver(() => updateView());
    ro.observe(parent);

    const setProgress = (drawn: number, offset = 0) => {
      path.style.strokeDasharray = `${Math.max(0, drawn - offset)} 2000`;
      path.style.strokeDashoffset = String(-offset);
      path.style.visibility = drawn - offset > 0.5 ? '' : 'hidden';
    };

    if (reduced) {
      setProgress(1000);
      return () => ro.disconnect();
    }

    let cleanup = () => {};

    if (mode === 'beat') {
      setProgress(0);
      path.style.visibility = '';
      path.style.strokeDasharray = '1000 2000';
      const anim = path.animate(
        [{ strokeDashoffset: 1000 }, { strokeDashoffset: 0 }],
        { duration: durationMs, easing: 'cubic-bezier(0.45, 0, 0.35, 1)', fill: 'forwards' }
      );
      animRef.current = anim;
      if (paused) anim.pause();
      cleanup = () => anim.cancel();
    } else if (mode === 'scroll') {
      const state = { drawn: 0 };
      setProgress(0);
      const tween = gsap.to(state, {
        drawn: 1000,
        ease: 'none',
        onUpdate: () => setProgress(state.drawn),
        scrollTrigger: {
          trigger: parent,
          start,
          end,
          scrub: 0.8,
          onRefresh: () => updateView(),
        },
      });
      cleanup = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
      document.fonts?.ready?.then(() => updateView());
    }

    return () => {
      ro.disconnect();
      cleanup();
      animRef.current = null;
    };
  }, [mode, durationMs, tone, width, start, end, route, paused]);

  return (
    <svg
      ref={svgRef}
      className={`BandScribble-module__QwOmAG__svg ${className}`.trim()}
      data-tone={tone}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
    >
      <path
        ref={pathRef}
        className="BandScribble-module__QwOmAG__path"
        pathLength={1000}
        style={{ visibility: 'hidden' }}
      />
    </svg>
  );
}
