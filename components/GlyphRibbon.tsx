'use client';

import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { registerGsap, prefersReducedMotion } from '@/src/animations/tokens';

export const GLYPH_RIBBONS = [
  {
    name: 'a-outer',
    d: 'M21.8196 29.2139C20.7519 29.2139 20.2876 28.8867 20.2876 27.6246V17.2011C20.2876 11.6388 16.8058 8.60057 10.7705 8.60057C5.0603 8.60057 1.29989 11.3584 0.742796 16.0326H4.54962C5.01387 13.602 7.24226 12.0127 10.5848 12.0127C14.2988 12.0127 16.4808 13.8824 16.4808 16.9674V18.6034H9.51707C3.29616 18.6034 0 21.2677 0 26.0354C0 30.3824 3.52828 33 8.72785 33C12.8132 33 15.1809 31.1771 16.6665 29.0269C16.7129 31.364 17.7807 32.7195 20.9376 32.7195H23.0267V29.2139H21.8196Z',
  },
  {
    name: 'a-bowl',
    d: 'M16.4808 22.9972C16.4808 26.9703 13.7417 29.728 9.0064 29.728C5.84952 29.728 3.85325 28.1388 3.85325 25.8017C3.85325 23.0907 5.75667 21.8286 9.14567 21.8286H16.4808V22.9972Z',
  },
  {
    name: 'w',
    d: 'M30.7502 32.7195H34.9284L40.8708 15.0043L46.5811 32.7195H50.7593L58.6515 8.88102H54.7982L48.6237 28.279L42.7278 8.88102H39.1995L32.9786 28.279L27.0827 8.88102H23.0901L30.7502 32.7195Z',
  },
  {
    name: 'k',
    d: 'M85.843 32.7195H89.6498V26.4561L94.4315 21.5014L102.277 32.7195H106.873L96.9849 18.7436L106.223 8.88102H101.535L89.6498 21.5482V0H85.843V32.7195Z',
  },
  {
    name: 'e-outer',
    d: 'M119.104 33C124.582 33 128.482 29.4943 129.41 24.7266H125.557C124.768 27.8116 122.168 29.5878 118.825 29.5878C114.322 29.5878 111.49 26.4093 111.351 21.8754V21.5482H129.735C129.781 20.9873 129.828 20.4263 129.828 19.9122C129.642 12.8541 125.278 8.60057 118.593 8.60057C111.908 8.60057 107.358 13.5552 107.358 20.8003C107.358 28.0921 112.001 33 119.104 33Z',
  },
  {
    name: 'e-arch',
    d: 'M111.583 18.3697C111.954 14.4901 115.158 11.966 118.639 11.966C122.586 11.966 125.371 14.2564 125.742 18.3697H111.583Z',
  },
];

interface Placement {
  glyph: number;
  anchor: number;
  fx: number;
  fy: number;
  deg: number;
  mirror: number;
  spread: number;
}

const cSpread = 0.5;
const mSpread = 0.85;

function createPlacement(
  glyph = Math.floor(Math.random() * GLYPH_RIBBONS.length),
  spreadRange: [number, number] = [cSpread, mSpread]
): Placement {
  return {
    glyph,
    anchor: Math.random(),
    fx: 0.15 + 0.7 * Math.random(),
    fy: 0.15 + 0.7 * Math.random(),
    deg: 360 * Math.random(),
    mirror: Math.random() < 0.5 ? -1 : 1,
    spread: spreadRange[0] + Math.random() * (spreadRange[1] - spreadRange[0]),
  };
}

function solvePlacement(
  pathEl: SVGPathElement,
  placement: Placement,
  w: number,
  h: number,
  cache: Map<number, { x: number; y: number }[]>,
  maxExtent = 1.5
) {
  const bbox = pathEl.getBBox();
  const minBox = Math.min(bbox.width, bbox.height) || 1;
  const maxBox = Math.max(bbox.width, bbox.height) || 1;
  const maxDim = Math.max(w, h);
  const scale = Math.min((maxDim * placement.spread) / minBox, (maxDim * maxExtent) / maxBox);
  const rad = (placement.deg * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  const transformPoint = (x: number, y: number) => {
    const sx = x * scale * placement.mirror;
    const sy = y * scale;
    return {
      x: sx * cos - sy * sin,
      y: sx * sin + sy * cos,
    };
  };

  let points = cache.get(placement.glyph);
  if (!points) {
    const totalLen = pathEl.getTotalLength();
    points = [];
    for (let i = 0; i < 200; i++) {
      points.push(pathEl.getPointAtLength((i / 199) * totalLen));
    }
    cache.set(placement.glyph, points);
  }

  const anchorPt = points[Math.min(points.length - 1, Math.floor(placement.anchor * points.length))];
  const anchorTransformed = transformPoint(anchorPt.x, anchorPt.y);
  const tx = placement.fx * w - anchorTransformed.x;
  const ty = placement.fy * h - anchorTransformed.y;

  let inside = 0;
  for (const pt of points) {
    const t = transformPoint(pt.x, pt.y);
    const px = t.x + tx;
    const py = t.y + ty;
    if (px >= 0 && px <= w && py >= 0 && py <= h) inside++;
  }

  const totalLenScaled = pathEl.getTotalLength() * scale;
  const visible = ((inside / points.length) * totalLenScaled) / Math.hypot(w, h);

  return {
    transform: `translate(${tx} ${ty}) rotate(${placement.deg}) scale(${scale * placement.mirror} ${scale})`,
    scale,
    visible,
  };
}

export function GlyphRibbon({
  play,
  drift = 'auto',
  delay = 0,
  className,
}: {
  play?: boolean;
  drift?: 'scroll' | 'auto';
  delay?: number;
  className?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const outerGRef = useRef<SVGGElement>(null);
  const innerGRef = useRef<SVGGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const animRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const svg = svgRef.current;
    const outerG = outerGRef.current;
    const innerG = innerGRef.current;
    const path = pathRef.current;
    if (!svg || !outerG || !innerG || !path) return;

    registerGsap();
    if (prefersReducedMotion()) return;

    let placement = createPlacement();
    const cache = new Map<number, { x: number; y: number }[]>();

    const applyPlacement = (p: Placement, solved: any, w: number, h: number) => {
      innerG.setAttribute('transform', solved.transform);
      path.style.strokeWidth = String(gsap.utils.clamp(16, 64, 0.03 * w) / solved.scale);
      svg.dataset.glyph = GLYPH_RIBBONS[p.glyph].name;
      gsap.set(outerG, { svgOrigin: `${w / 2} ${h / 2}` });
    };

    const solveAndApply = () => {
      const rect = svg.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      if (!w || !h) return;
      svg.setAttribute('viewBox', `0 0 ${w} ${h}`);

      let bestP: Placement | null = null;
      let bestSolved: any = null;
      const glyphIdx = Math.floor(Math.random() * GLYPH_RIBBONS.length);
      path.setAttribute('d', GLYPH_RIBBONS[glyphIdx].d);

      for (let i = 0; i < 10; i++) {
        const p = createPlacement(glyphIdx);
        const solved = solvePlacement(path, p, w, h, cache);
        if (!bestSolved || solved.visible > bestSolved.visible) {
          bestP = p;
          bestSolved = solved;
        }
        if (solved.visible >= 0.85) break;
      }

      if (bestP && bestSolved) {
        placement = bestP;
        applyPlacement(bestP, bestSolved, w, h);
      }
    };

    path.setAttribute('d', GLYPH_RIBBONS[placement.glyph].d);
    solveAndApply();

    const pathLen = path.getTotalLength() || 1000;
    gsap.set(path, { strokeDasharray: pathLen, strokeDashoffset: pathLen });

    let killed = false;
    const loop = (initialDelay = 0) => {
      if (killed) return;
      solveAndApply();
      const len = path.getTotalLength() || 1000;
      const tl = gsap.timeline({
        delay: initialDelay,
        onComplete: () => loop(0.5),
      });
      tl.fromTo(
        path,
        { strokeDasharray: len, strokeDashoffset: len },
        { strokeDashoffset: 0, duration: 2.2, ease: 'power2.inOut' }
      ).to(path, { strokeDashoffset: -len, duration: 1.6, ease: 'power2.inOut' }, '+=4.5');
      animRef.current = tl;
    };

    if (play) {
      loop(delay);
    }

    const ctx = gsap.context(() => {
      if (drift === 'auto') {
        gsap.to(outerG, {
          rotation: '+=5',
          duration: 26,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      }
    }, svg);

    return () => {
      killed = true;
      animRef.current?.kill();
      ctx.revert();
    };
  }, [play, drift, delay]);

  return (
    <svg
      ref={svgRef}
      className={`GlyphRibbon-module___k1tSG__svg ${className || ''}`.trim()}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
      viewBox="0 0 1113 889"
    >
      <g ref={outerGRef}>
        <g ref={innerGRef}>
          <path ref={pathRef} className="GlyphRibbon-module___k1tSG__path" />
        </g>
      </g>
    </svg>
  );
}
