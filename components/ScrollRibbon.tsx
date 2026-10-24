'use client';

import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const CSS = {
  construct: 'ScrollRibbon-module__wSfOTW__construct',
  cross: 'ScrollRibbon-module__wSfOTW__cross',
  dotInk: 'ScrollRibbon-module__wSfOTW__dotInk',
  faint: 'ScrollRibbon-module__wSfOTW__faint',
  guides: 'ScrollRibbon-module__wSfOTW__guides',
  handles: 'ScrollRibbon-module__wSfOTW__handles',
  ink: 'ScrollRibbon-module__wSfOTW__ink',
  nodes: 'ScrollRibbon-module__wSfOTW__nodes',
  outline: 'ScrollRibbon-module__wSfOTW__outline',
  sketch: 'ScrollRibbon-module__wSfOTW__sketch',
  svg: 'ScrollRibbon-module__wSfOTW__svg',
};

export interface ScrollRibbonProps {
  figure?: 'form' | string;
  stage?: 'brief' | 'sketch' | 'design' | 'build' | 'launch' | 'full' | string;
  align?: 'start' | 'end' | string;
  avoid?: 'strict' | 'soft' | string;
  weight?: 'fill' | 'line' | string;
  driver?: 'parent' | 'section' | 'deck' | 'time' | string;
  start?: string;
  end?: string;
  className?: string;
}

const STAGE_CONFIG = {
  metrics: [0, 0.16] as [number, number],
  bearings: [0.03, 0.2] as [number, number],
  sketch: [0.06, 0.3] as [number, number],
  construct: [0.14, 0.38] as [number, number],
  outline: [0.3, 0.62] as [number, number],
  nodes: true,
  handles: true,
  ink: [0.48, 0.86] as [number, number],
  dotInk: [0.72, 0.86] as [number, number],
  retract: [0.87, 1] as [number, number],
};

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const normRange = (v: number, range: [number, number]) => clamp01((v - range[0]) / Math.max(1e-6, range[1] - range[0]));
const elasticScale = (v: number) => 1 + 2.7 * Math.pow(v - 1, 3) + 1.7 * Math.pow(v - 1, 2);

function createSvgElem<K extends keyof SVGElementTagNameMap>(tag: K, attrs: Record<string, string | number> = {}): SVGElementTagNameMap[K] {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const [k, val] of Object.entries(attrs)) {
    el.setAttribute(k, String(val));
  }
  return el;
}

export function ScrollRibbon({
  figure = 'form',
  stage = 'full',
  align = 'end',
  avoid = 'soft',
  weight = 'fill',
  driver = 'parent',
  start = 'top 85%',
  end = '+=150%',
  className,
}: ScrollRibbonProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    interface AnimPath {
      node: SVGPathElement;
      kind: 'open' | 'loop';
      len: number;
      from: number;
      draw: [number, number];
      retract?: [number, number];
    }

    interface AnimNode {
      node: SVGElement;
      x: number;
      y: number;
      at: number;
      retract?: [number, number];
    }

    let animPaths: AnimPath[] = [];
    let animNodes: AnimNode[] = [];
    let progressVal = 0;

    const buildGraphics = () => {
      const parent = svg.parentElement;
      const w = parent?.clientWidth ?? 1400;
      const h = parent?.clientHeight ?? 860;
      svg.replaceChildren();
      animPaths = [];
      animNodes = [];
      if (!w || !h) return false;

      svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
      svg.dataset.weight = weight;
      svg.dataset.figure = figure;
      svg.dataset.stage = stage;

      // Base design space: 1400 x 860
      // Optimal Awake placement for "form":
      // scale factor relative to standard 1400x860 canvas
      const scaleX = w / 1400;
      const scaleY = h / 860;
      const scale = Math.min(scaleX, scaleY);

      // Coordinates from exact Awake geometry:
      // Rectangle: x: 70 -> 433.71, y: 393.09 -> 756.80
      // Circle: center (446.25, 380.55), radius: 225.75
      const rectX0 = 70 * scaleX;
      const rectX1 = 433.71 * scaleX;
      const rectY0 = 393.09 * scaleY;
      const rectY1 = 756.80 * scaleY;

      const circleCx = 446.25 * scaleX;
      const circleCy = 380.55 * scaleY;
      const circleR = 225.75 * scale;

      const maskId = `draft-clip-${Math.random().toString(36).slice(2, 9)}`;

      const defs = createSvgElem('defs');
      const mask = createSvgElem('mask', {
        id: `${maskId}-m`,
        maskUnits: 'userSpaceOnUse',
        x: 0,
        y: 0,
        width: w,
        height: h,
      });
      mask.append(createSvgElem('rect', { x: 0, y: 0, width: w, height: h, fill: '#fff', stroke: 'none' }));
      defs.append(mask);

      const gGuides = createSvgElem('g', { class: CSS.guides });
      const gConstruct = createSvgElem('g', { class: CSS.construct });
      const gSketch = createSvgElem('g', { class: CSS.sketch });
      const gInk = createSvgElem('g', { class: CSS.ink, 'clip-path': `url(#${maskId})` });
      const gOutline = createSvgElem('g', { class: CSS.outline });
      const gHandles = createSvgElem('g', { class: CSS.handles });
      const gNodes = createSvgElem('g', { class: CSS.nodes });

      // ClipPath for the ink wash fill
      const clipPath = createSvgElem('clipPath', { id: maskId });
      const clipPathD = [
        `M${rectX0.toFixed(2)} ${rectY0.toFixed(2)}L${rectX1.toFixed(2)} ${rectY0.toFixed(2)}L${rectX1.toFixed(2)} ${rectY1.toFixed(2)}L${rectX0.toFixed(2)} ${rectY1.toFixed(2)}Z`,
        `M${circleCx.toFixed(2)} ${(circleCy - circleR).toFixed(2)}C${(circleCx + circleR * 0.5523).toFixed(2)} ${(circleCy - circleR).toFixed(2)} ${(circleCx + circleR).toFixed(2)} ${(circleCy - circleR * 0.5523).toFixed(2)} ${(circleCx + circleR).toFixed(2)} ${circleCy.toFixed(2)}C${(circleCx + circleR).toFixed(2)} ${(circleCy + circleR * 0.5523).toFixed(2)} ${(circleCx + circleR * 0.5523).toFixed(2)} ${(circleCy + circleR).toFixed(2)} ${circleCx.toFixed(2)} ${(circleCy + circleR).toFixed(2)}C${(circleCx - circleR * 0.5523).toFixed(2)} ${(circleCy + circleR).toFixed(2)} ${(circleCx - circleR).toFixed(2)} ${(circleCy + circleR * 0.5523).toFixed(2)} ${(circleCx - circleR).toFixed(2)} ${circleCy.toFixed(2)}C${(circleCx - circleR).toFixed(2)} ${(circleCy - circleR * 0.5523).toFixed(2)} ${(circleCx - circleR * 0.5523).toFixed(2)} ${(circleCy - circleR).toFixed(2)} ${circleCx.toFixed(2)} ${(circleCy - circleR).toFixed(2)}Z`,
      ].join(' ');
      clipPath.append(createSvgElem('path', { d: clipPathD, 'clip-rule': 'evenodd' }));
      defs.append(clipPath);

      svg.append(defs, gGuides, gConstruct, gSketch, gInk, gOutline, gHandles, gNodes);

      const addPath = (parentGroup: SVGGElement, d: string, draw: [number, number], retract?: [number, number]) => {
        const p = createSvgElem('path', { d });
        parentGroup.append(p);
        let len = 1000;
        try {
          len = p.getTotalLength() || 1000;
        } catch {}
        animPaths.push({ node: p, kind: 'open', len, from: 0, draw, retract });
      };

      // 1. Guides & Construction Grid: Clean 3x3 CAD Architectural Grid matching awakeagency.dev
      // Horizontal metric rules (spanning full bleed across canvas):
      const guideY1 = 154.8 * scaleY; // Top circle tangent (through top anchor node)
      const guideY2 = 756.8 * scaleY; // Bottom rectangle baseline

      addPath(gGuides, `M0 ${guideY1.toFixed(2)}H${w}`, STAGE_CONFIG.metrics, STAGE_CONFIG.retract);
      addPath(gGuides, `M0 ${rectY0.toFixed(2)}H${w}`, STAGE_CONFIG.metrics, STAGE_CONFIG.retract);
      addPath(gGuides, `M0 ${guideY2.toFixed(2)}H${w}`, STAGE_CONFIG.metrics, STAGE_CONFIG.retract);

      // Vertical bearing & crosshair lines (spanning full bleed from top to bottom):
      const guideX1 = 70 * scaleX; // Left rectangle bearing line
      const guideX2 = 672 * scaleX; // Right circle bearing line

      addPath(gGuides, `M${guideX1.toFixed(2)} 0V${h}`, STAGE_CONFIG.bearings, STAGE_CONFIG.retract);
      addPath(gGuides, `M${circleCx.toFixed(2)} 0V${h}`, STAGE_CONFIG.bearings, STAGE_CONFIG.retract);
      addPath(gGuides, `M${guideX2.toFixed(2)} 0V${h}`, STAGE_CONFIG.bearings, STAGE_CONFIG.retract);

      // 2. Construction: Compass circle and center cross marker

      const compassCircle = createSvgElem('path', {
        d: `M${circleCx.toFixed(2)} ${(circleCy - circleR).toFixed(2)}A${circleR.toFixed(2)} ${circleR.toFixed(2)} 0 1 1 ${circleCx.toFixed(2)} ${(circleCy + circleR).toFixed(2)}A${circleR.toFixed(2)} ${circleR.toFixed(2)} 0 1 1 ${circleCx.toFixed(2)} ${(circleCy - circleR).toFixed(2)}Z`,
      });
      gConstruct.append(compassCircle);
      let circleLen = 1418;
      try {
        circleLen = compassCircle.getTotalLength() || 1418;
      } catch {}
      animPaths.push({ node: compassCircle, kind: 'loop', len: circleLen, from: circleLen * 0.5, draw: STAGE_CONFIG.construct, retract: STAGE_CONFIG.retract });

      // Crosshair marker at center of compass circle
      const crossMarker = createSvgElem('path', { d: 'M-4 0H4M0 -4V4', class: CSS.cross });
      gConstruct.append(crossMarker);
      animNodes.push({ node: crossMarker, x: circleCx, y: circleCy, at: STAGE_CONFIG.construct[0], retract: STAGE_CONFIG.retract });

      // 3. Sketch paths: Hand-drawn wavy lines along the shapes
      const sketchBox = `M${(rectX0 - 1.7).toFixed(1)} ${(rectY0 + 29).toFixed(1)}L${(rectX0 - 1.7).toFixed(1)} ${rectY0.toFixed(1)}L${rectX1.toFixed(1)} ${rectY0.toFixed(1)}L${rectX1.toFixed(1)} ${rectY1.toFixed(1)}L${rectX0.toFixed(1)} ${rectY1.toFixed(1)}Z`;
      addPath(gSketch, sketchBox, STAGE_CONFIG.sketch, STAGE_CONFIG.retract);

      const sketchArc = `M${circleCx.toFixed(1)} ${(circleCy - circleR).toFixed(1)}C${(circleCx + circleR * 0.55).toFixed(1)} ${(circleCy - circleR).toFixed(1)} ${(circleCx + circleR).toFixed(1)} ${(circleCy - circleR * 0.55).toFixed(1)} ${(circleCx + circleR).toFixed(1)} ${circleCy.toFixed(1)}C${(circleCx + circleR).toFixed(1)} ${(circleCy + circleR * 0.55).toFixed(1)} ${(circleCx + circleR * 0.55).toFixed(1)} ${(circleCy + circleR).toFixed(1)} ${circleCx.toFixed(1)} ${(circleCy + circleR).toFixed(1)}C${(circleCx - circleR * 0.55).toFixed(1)} ${(circleCy + circleR).toFixed(1)} ${(circleCx - circleR).toFixed(1)} ${(circleCy + circleR * 0.55).toFixed(1)} ${(circleCx - circleR).toFixed(1)} ${circleCy.toFixed(1)}C${(circleCx - circleR).toFixed(1)} ${(circleCy - circleR * 0.55).toFixed(1)} ${(circleCx - circleR * 0.55).toFixed(1)} ${(circleCy - circleR).toFixed(1)} ${circleCx.toFixed(1)} ${(circleCy - circleR).toFixed(1)}Z`;
      addPath(gSketch, sketchArc, STAGE_CONFIG.sketch, STAGE_CONFIG.retract);

      // 4. Vector Outlines: Rectangle and Circle
      const outlineBox = createSvgElem('path', {
        d: `M${rectX0.toFixed(2)} ${rectY0.toFixed(2)}L${rectX1.toFixed(2)} ${rectY0.toFixed(2)}L${rectX1.toFixed(2)} ${rectY1.toFixed(2)}L${rectX0.toFixed(2)} ${rectY1.toFixed(2)}Z`,
      });
      gOutline.append(outlineBox);
      let boxLen = 1455;
      try {
        boxLen = outlineBox.getTotalLength() || 1455;
      } catch {}
      animPaths.push({ node: outlineBox, kind: 'loop', len: boxLen, from: boxLen * 0.4, draw: STAGE_CONFIG.outline, retract: STAGE_CONFIG.retract });

      const outlineCircle = createSvgElem('path', {
        d: `M${circleCx.toFixed(2)} ${(circleCy - circleR).toFixed(2)}C${(circleCx + circleR * 0.5523).toFixed(2)} ${(circleCy - circleR).toFixed(2)} ${(circleCx + circleR).toFixed(2)} ${(circleCy - circleR * 0.5523).toFixed(2)} ${(circleCx + circleR).toFixed(2)} ${circleCy.toFixed(2)}C${(circleCx + circleR).toFixed(2)} ${(circleCy + circleR * 0.5523).toFixed(2)} ${(circleCx + circleR * 0.5523).toFixed(2)} ${(circleCy + circleR).toFixed(2)} ${circleCx.toFixed(2)} ${(circleCy + circleR).toFixed(2)}C${(circleCx - circleR * 0.5523).toFixed(2)} ${(circleCy + circleR).toFixed(2)} ${(circleCx - circleR).toFixed(2)} ${(circleCy + circleR * 0.5523).toFixed(2)} ${(circleCx - circleR).toFixed(2)} ${circleCy.toFixed(2)}C${(circleCx - circleR).toFixed(2)} ${(circleCy - circleR * 0.5523).toFixed(2)} ${(circleCx - circleR * 0.5523).toFixed(2)} ${(circleCy - circleR).toFixed(2)} ${circleCx.toFixed(2)} ${(circleCy - circleR).toFixed(2)}Z`,
      });
      gOutline.append(outlineCircle);
      let circOutlineLen = 1418;
      try {
        circOutlineLen = outlineCircle.getTotalLength() || 1418;
      } catch {}
      animPaths.push({ node: outlineCircle, kind: 'loop', len: circOutlineLen, from: 0, draw: STAGE_CONFIG.outline, retract: STAGE_CONFIG.retract });

      // 5. Ink Wash: Shaded sectors clipped inside the contours
      const inkBox = outlineBox.cloneNode(true) as SVGPathElement;
      inkBox.style.strokeWidth = `${(rectX1 - rectX0) * 1.04}px`;
      inkBox.style.strokeLinecap = 'butt';
      gInk.append(inkBox);
      animPaths.push({ node: inkBox, kind: 'loop', len: boxLen, from: 0, draw: STAGE_CONFIG.ink, retract: STAGE_CONFIG.retract });

      const inkCirc = outlineCircle.cloneNode(true) as SVGPathElement;
      inkCirc.style.strokeWidth = `${circleR * 2 * 1.04}px`;
      inkCirc.style.strokeLinecap = 'butt';
      gInk.append(inkCirc);
      animPaths.push({ node: inkCirc, kind: 'loop', len: circOutlineLen, from: 0, draw: STAGE_CONFIG.ink, retract: STAGE_CONFIG.retract });

      // 6. Bezier Handles & Circle control points
      // 8 points around circle
      const kCircle = circleR * 0.5523;
      const handlePoints = [
        { from: { x: circleCx, y: circleCy - circleR }, to: { x: circleCx + kCircle, y: circleCy - circleR } },
        { from: { x: circleCx + circleR, y: circleCy }, to: { x: circleCx + circleR, y: circleCy - kCircle } },
        { from: { x: circleCx + circleR, y: circleCy }, to: { x: circleCx + circleR, y: circleCy + kCircle } },
        { from: { x: circleCx, y: circleCy + circleR }, to: { x: circleCx + kCircle, y: circleCy + circleR } },
        { from: { x: circleCx, y: circleCy + circleR }, to: { x: circleCx - kCircle, y: circleCy + circleR } },
        { from: { x: circleCx - circleR, y: circleCy }, to: { x: circleCx - circleR, y: circleCy + kCircle } },
        { from: { x: circleCx - circleR, y: circleCy }, to: { x: circleCx - circleR, y: circleCy - kCircle } },
        { from: { x: circleCx, y: circleCy - circleR }, to: { x: circleCx - kCircle, y: circleCy - circleR } },
      ];

      handlePoints.forEach(({ from, to }, idx) => {
        const at = STAGE_CONFIG.outline[0] + 0.05 + idx * 0.01;
        addPath(gHandles, `M${from.x.toFixed(2)} ${from.y.toFixed(2)}L${to.x.toFixed(2)} ${to.y.toFixed(2)}`, [at, at + 0.06], STAGE_CONFIG.retract);

        const circle = createSvgElem('circle', { r: 2.5, cx: 0, cy: 0 });
        gHandles.append(circle);
        animNodes.push({ node: circle, x: to.x, y: to.y, at: at + 0.048, retract: STAGE_CONFIG.retract });
      });

      // 7. Selection Anchor Nodes (7x7 squares)
      const anchorPoints = [
        // Box corners
        { x: rectX0, y: rectY0 },
        { x: rectX1, y: rectY0 },
        { x: rectX1, y: rectY1 },
        { x: rectX0, y: rectY1 },
        // Circle cardinal anchors
        { x: circleCx, y: circleCy - circleR },
        { x: circleCx + circleR, y: circleCy },
        { x: circleCx, y: circleCy + circleR },
        { x: circleCx - circleR, y: circleCy },
      ];

      anchorPoints.forEach((p, idx) => {
        const at = STAGE_CONFIG.outline[0] + idx * 0.015;
        const rectNode = createSvgElem('rect', { x: -3.5, y: -3.5, width: 7, height: 7 });
        gNodes.append(rectNode);
        animNodes.push({ node: rectNode, x: p.x, y: p.y, at, retract: STAGE_CONFIG.retract });
      });

      return true;
    };

    const renderProgress = (progress: number) => {
      progressVal = progress;
      for (const item of animPaths) {
        const drawNorm = normRange(progress, item.draw);
        const retractNorm = item.retract ? normRange(progress, item.retract) : 0;
        const len = item.len;
        const st = item.node.style;

        if (drawNorm <= 0 || retractNorm >= 1) {
          st.visibility = 'hidden';
          continue;
        }
        st.visibility = 'visible';

        if (item.kind === 'open') {
          const drawn = Math.max(0, drawNorm - retractNorm) * len;
          st.strokeDasharray = `${drawn} ${2 * len + 1}`;
          st.strokeDashoffset = String(-retractNorm * len);
        } else {
          if (retractNorm > 0) {
            st.strokeDasharray = `${(1 - retractNorm) * len} ${retractNorm * len}`;
            st.strokeDashoffset = String(-(retractNorm * len * 0.5));
          } else {
            const drawn = drawNorm * len;
            st.strokeDasharray = `${drawn} ${len - drawn}`;
            st.strokeDashoffset = String(-(item.from - drawn * 0.5));
          }
        }
      }

      for (const item of animNodes) {
        let scaleVal = elasticScale(clamp01((progress - item.at) / 0.04));
        if (progress < item.at) scaleVal = 0;
        if (item.retract) {
          scaleVal *= 1 - clamp01((progress - item.retract[0]) / Math.max(0.04, (item.retract[1] - item.retract[0]) * 0.5));
        }
        item.node.style.visibility = scaleVal <= 0.001 ? 'hidden' : 'visible';
        item.node.setAttribute('transform', `translate(${item.x} ${item.y}) scale(${Math.max(0, scaleVal)})`);
      }
    };

    buildGraphics();
    renderProgress(0);

    const triggerTarget = driver === 'section' ? svg.closest('section') ?? svg.parentElement ?? svg : svg.parentElement ?? svg;

    const st = ScrollTrigger.create({
      trigger: triggerTarget,
      start,
      end,
      scrub: 0.8,
      onUpdate: (self) => {
        renderProgress(self.progress);
      },
    });

    const onResize = () => {
      buildGraphics();
      renderProgress(progressVal);
    };
    window.addEventListener('resize', onResize);

    return () => {
      st.kill();
      window.removeEventListener('resize', onResize);
    };
  }, [figure, stage, align, avoid, weight, driver, start, end]);

  return (
    <svg
      ref={svgRef}
      className={[CSS.svg, className].filter(Boolean).join(' ')}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
      data-ribbon=""
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
