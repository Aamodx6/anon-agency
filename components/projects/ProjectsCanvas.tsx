'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { GRID_PROJECTS } from '@/data/projectsGrid';
import styles from './ProjectsCanvas.module.css';

const DIR = { drag: 1, wheel: 1, hover: 1, keys: 1 } as const;
const COLUMNS = 6;
const DESKTOP_CELL = 300;
const DESKTOP_CARD = 180;
const GRID_STEP = 340;
const ROTATIONS = [-4, -2, 1, 3, -1, 2, 4, 0];
const ASPECTS = [0.86, 0.92, 1, 0.88, 0.96, 0.9];

interface CardState {
  project: (typeof GRID_PROJECTS)[number];
  index: number;
  depth: number;
  rotation: number;
  aspect: number;
  tileX: number;
  tileY: number;
  element: HTMLDivElement | null;
  hovered: boolean;
  scale: number;
  visible: boolean;
  entered: boolean;
}

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));
const modulo = (value: number, divisor: number) =>
  ((value % divisor) + divisor) % divisor;
const smoothstep = (value: number) => value * value * (3 - 2 * value);

export function ProjectsCanvas() {
  const viewportRef = useRef<HTMLElement>(null);
  const cardStates = useMemo<CardState[]>(
    () =>
      GRID_PROJECTS.flatMap((project, index) =>
        [-1, 0, 1].flatMap((tileY) =>
          [-1, 0, 1].map((tileX) => ({
            project,
            index,
            depth: ((index * 7 + 3) % 11) / 10,
            rotation: ROTATIONS[index % ROTATIONS.length],
            aspect: ASPECTS[index % ASPECTS.length],
            tileX,
            tileY,
            element: null,
            hovered: false,
            scale: 1,
            visible: false,
            entered: false,
          }))
        )
      ),
    []
  );
  const camera = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const dragging = useRef(false);
  const moved = useRef(false);
  const pointerId = useRef<number | null>(null);
  const pointerStart = useRef({ x: 0, y: 0 });
  const pointerLast = useRef({ x: 0, y: 0 });
  const hoverLast = useRef<{ x: number; y: number } | null>(null);
  const pointerVelocity = useRef({ x: 0, y: 0 });
  const viewProgress = useRef(0);
  const viewTransition = useRef({ from: 0, to: 0, start: 0 });
  const zoom = useRef({ current: 1, target: 1 });
  const reducedMotion = useRef(false);
  const [view, setView] = useState<'canvas' | 'grid'>('canvas');
  const [zoomLabel, setZoomLabel] = useState(100);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyOverflowY = document.body.style.overflowY;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflowY = 'hidden';

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotion.current = motionQuery.matches;
    const onMotionPreferenceChange = (event: MediaQueryListEvent) => {
      reducedMotion.current = event.matches;
    };
    motionQuery.addEventListener('change', onMotionPreferenceChange);

    let width = viewport.clientWidth;
    let height = viewport.clientHeight;
    let cellWidth = DESKTOP_CELL;
    let cellHeight = DESKTOP_CELL;
    let cardWidth = DESKTOP_CARD;
    const rows = Math.ceil(GRID_PROJECTS.length / COLUMNS);
    const gridWidth = GRID_PROJECTS.length * GRID_STEP;
    let cardMetaHeight = 41;
    let gridCardHeight = DESKTOP_CARD / 0.86 + cardMetaHeight;

    const resize = () => {
      width = viewport.clientWidth;
      height = viewport.clientHeight;
      const mobile = width < 700;
      const tablet = width >= 700 && width < 1100;
      cellWidth = mobile ? 220 : tablet ? 260 : DESKTOP_CELL;
      cellHeight = mobile ? 230 : tablet ? 280 : DESKTOP_CELL;
      cardWidth = mobile ? 132 : tablet ? 156 : DESKTOP_CARD;
      cardMetaHeight = mobile ? 36 : 41;
      gridCardHeight = cardWidth / 0.86 + cardMetaHeight;
      cardStates.forEach((card) => {
        if (card.element) card.element.style.width = `${cardWidth}px`;
      });
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(viewport);

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (viewProgress.current > 0.5) {
        const wheelX = event.deltaX || event.deltaY;
        camera.current.targetX += wheelX * DIR.wheel;
        pointerVelocity.current.x = wheelX * DIR.wheel * 0.12;
      } else {
        camera.current.targetX += event.deltaX * DIR.wheel;
        camera.current.targetY += event.deltaY * DIR.wheel;
        pointerVelocity.current = {
          x: event.deltaX * DIR.wheel * 0.12,
          y: event.deltaY * DIR.wheel * 0.12,
        };
      }
    };
    viewport.addEventListener('wheel', onWheel, { passive: false });

    const onPointerMove = (event: PointerEvent) => {
      if (!dragging.current || event.pointerId !== pointerId.current) {
        if (event.pointerType !== 'mouse') return;
        const previous = hoverLast.current;
        hoverLast.current = { x: event.clientX, y: event.clientY };
        if (!previous) return;
        const dx = event.clientX - previous.x;
        const dy = event.clientY - previous.y;
        camera.current.targetX += dx * DIR.hover;
        camera.current.targetY += dy * DIR.hover;
        pointerVelocity.current = {
          x: dx * DIR.hover * 0.45,
          y: dy * DIR.hover * 0.45,
        };
        return;
      }
      const dx = event.clientX - pointerLast.current.x;
      const dy = event.clientY - pointerLast.current.y;
      pointerLast.current = { x: event.clientX, y: event.clientY };
      hoverLast.current = { x: event.clientX, y: event.clientY };
      if (
        Math.hypot(
          event.clientX - pointerStart.current.x,
          event.clientY - pointerStart.current.y
        ) > 5
      ) {
        moved.current = true;
      }
      camera.current.targetX += dx * DIR.drag;
      if (viewProgress.current <= 0.5) {
        camera.current.targetY += dy * DIR.drag;
      } else {
        pointerVelocity.current.y = 0;
      }
      pointerVelocity.current.x =
        pointerVelocity.current.x * 0.55 + dx * DIR.drag * 0.45;
      if (viewProgress.current <= 0.5) {
        pointerVelocity.current.y =
          pointerVelocity.current.y * 0.55 + dy * DIR.drag * 0.45;
      }
    };
    const onPointerUp = (event: PointerEvent) => {
      if (event.pointerId !== pointerId.current) return;
      dragging.current = false;
      viewport.removeAttribute('data-dragging');
      pointerId.current = null;
      if (reducedMotion.current) pointerVelocity.current = { x: 0, y: 0 };
    };
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);

    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        (event.target instanceof HTMLElement &&
          event.target.closest(
            'a, button, input, textarea, select, [contenteditable="true"]'
          ))
      ) {
        return;
      }
      const step = event.shiftKey ? 120 : 64;
      switch (event.key) {
        case 'ArrowLeft':
          camera.current.targetX -= step * DIR.keys;
          break;
        case 'ArrowRight':
          camera.current.targetX += step * DIR.keys;
          break;
        case 'ArrowUp':
          camera.current.targetY -= step * DIR.keys;
          break;
        case 'ArrowDown':
          camera.current.targetY += step * DIR.keys;
          break;
        default:
          return;
      }
      pointerVelocity.current = { x: 0, y: 0 };
      event.preventDefault();
    };
    window.addEventListener('keydown', onKeyDown);

    let frame = 0;
    let previousTime = performance.now();
    let previousX = camera.current.x;
    let previousY = camera.current.y;
    const animate = (now: number) => {
      const delta = Math.min(now - previousTime, 32) / 16.67;
      previousTime = now;
      const reduced = reducedMotion.current;
      const smoothing = reduced ? 0.25 : 0.08;

      if (!dragging.current) {
        const inertia = reduced ? 0.75 : 0.94;
        camera.current.targetX += pointerVelocity.current.x * delta;
        if (viewProgress.current <= 0.5) {
          camera.current.targetY += pointerVelocity.current.y * delta;
        } else {
          pointerVelocity.current.y = 0;
        }
        pointerVelocity.current.x *= Math.pow(inertia, delta);
        pointerVelocity.current.y *= Math.pow(inertia, delta);
      }
      camera.current.x += (camera.current.targetX - camera.current.x) * smoothing;
      camera.current.y += (camera.current.targetY - camera.current.y) * smoothing;
      zoom.current.current += (zoom.current.target - zoom.current.current) * 0.08;

      const transition = viewTransition.current;
      if (transition.from !== transition.to) {
        const progress = clamp((now - transition.start) / 600, 0, 1);
        viewProgress.current =
          transition.from + (transition.to - transition.from) * smoothstep(progress);
        if (progress === 1) transition.from = transition.to;
      }

      const mix = viewProgress.current;
      const velocityX = camera.current.x - previousX;
      const velocityY = camera.current.y - previousY;
      previousX = camera.current.x;
      previousY = camera.current.y;
      const currentZoom = zoom.current.current;
      const canvasWidth = COLUMNS * cellWidth;
      const canvasHeight = rows * cellHeight;
      const gridPeriodY = height + gridCardHeight + 80;
      viewport.style.setProperty('--dots-x', `${modulo(camera.current.x, 44)}px`);
      viewport.style.setProperty('--dots-y', `${modulo(camera.current.y, 44)}px`);

      for (const card of cardStates) {
        const element = card.element;
        if (!element) continue;
        if (mix > 0.995 && card.tileY !== 0) {
          if (card.visible) {
            element.style.visibility = 'hidden';
            element.style.willChange = 'auto';
            card.visible = false;
          }
          continue;
        }

        const column = card.index % COLUMNS;
        const row = Math.floor(card.index / COLUMNS);
        const depthOffsetX = (card.depth - 0.5) * 20;
        const depthOffsetY = (card.depth - 0.5) * 20;
        const canvasX = (column + 0.5) * cellWidth + depthOffsetX;
        const canvasY =
          (row + 0.5) * cellHeight +
          (column % 2) * (cellHeight / 2) +
          depthOffsetY;
        const wrappedCanvasX = modulo(canvasX + camera.current.x, canvasWidth);
        const wrappedCanvasY = modulo(canvasY + camera.current.y, canvasHeight);
        const canvasCenterX =
          wrappedCanvasX -
          canvasWidth / 2 +
          width / 2 +
          card.tileX * canvasWidth;
        const canvasCenterY =
          wrappedCanvasY -
          canvasHeight / 2 +
          height / 2 +
          card.tileY * canvasHeight;

        const gridX = (card.index + 0.5) * GRID_STEP;
        const wrappedGridX = modulo(gridX + camera.current.x, gridWidth);
        const gridCenterX =
          wrappedGridX -
          gridWidth / 2 +
          width / 2 +
          card.tileX * gridWidth;
        const gridCenterY = height / 2 + card.tileY * gridPeriodY;
        const rawCenterX = canvasCenterX + (gridCenterX - canvasCenterX) * mix;
        const rawCenterY = canvasCenterY + (gridCenterY - canvasCenterY) * mix;
        const centerX = width / 2 + (rawCenterX - width / 2) * currentZoom;
        const centerY = height / 2 + (rawCenterY - height / 2) * currentZoom;
        const scale = currentZoom * (1 + (1.45 - 1) * mix) * card.scale;
        const widthAtScale = cardWidth * scale;
        const heightAtScale = (cardWidth / card.aspect + cardMetaHeight) * scale;
        const cullMargin = Math.max(widthAtScale, heightAtScale);
        const visible =
          centerX > -cullMargin &&
          centerX < width + cullMargin &&
          centerY > -cullMargin &&
          centerY < height + cullMargin;

        if (!visible) {
          if (card.visible) {
            element.style.visibility = 'hidden';
            element.style.willChange = 'auto';
            card.visible = false;
          }
          continue;
        }
        if (!card.visible) {
          element.style.visibility = 'visible';
          element.style.willChange = 'transform, opacity';
          if (!card.entered) {
            element.setAttribute('data-enter', '');
            card.entered = true;
          }
          card.visible = true;
        }
        const edgeDistance = Math.min(
          centerX,
          width - centerX,
          centerY,
          height - centerY
        );
        const edgeFade = clamp(edgeDistance / 90, 0, 1);
        const opacity = 0.9 + edgeFade * 0.1;
        card.scale +=
          ((card.hovered ? 1.05 : 1) - card.scale) * (reduced ? 0.25 : 0.16);
        const tilt = reduced
          ? 0
          : clamp(velocityX * 0.35 + velocityY * 0.12, -10, 10) * (1 - mix);
        const skewX = reduced
          ? 0
          : clamp(velocityY * 0.18, -5, 5) * (1 - mix);
        const skewY = reduced
          ? 0
          : clamp(velocityX * 0.16, -5, 5) * (1 - mix);
        const rotation = card.rotation * (1 - mix) + tilt;

        element.style.transform = `translate3d(${centerX - cardWidth / 2}px, ${centerY - (cardWidth / card.aspect + cardMetaHeight) / 2}px, 0) rotate(${rotation}deg) skew(${skewX}deg, ${skewY}deg) scale(${scale})`;
        element.style.opacity = `${card.hovered ? 1 : opacity}`;
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      viewport.removeEventListener('wheel', onWheel);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      window.removeEventListener('keydown', onKeyDown);
      motionQuery.removeEventListener('change', onMotionPreferenceChange);
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflowY = originalBodyOverflowY;
    };
  }, [cardStates]);

  const beginDrag = (event: React.PointerEvent<HTMLElement>) => {
    if (event.button !== 0 || (event.target as HTMLElement).closest('button')) return;
    dragging.current = true;
    viewportRef.current?.setAttribute('data-dragging', '');
    moved.current = false;
    pointerId.current = event.pointerId;
    pointerStart.current = { x: event.clientX, y: event.clientY };
    pointerLast.current = { x: event.clientX, y: event.clientY };
    pointerVelocity.current = { x: 0, y: 0 };
  };

  const changeZoom = (amount: number) => {
    const next = clamp(zoom.current.target + amount, 0.6, 1.4);
    zoom.current.target = next;
    setZoomLabel(Math.round(next * 100));
  };

  const toggleView = (next: 'canvas' | 'grid') => {
    if (view === next) return;
    viewTransition.current = {
      from: viewProgress.current,
      to: next === 'grid' ? 1 : 0,
      start: performance.now(),
    };
    setView(next);
  };

  return (
    <section
      ref={viewportRef}
      className={styles.viewport}
      aria-label="Our projects"
      data-view={view}
      onPointerDown={beginDrag}
      onClickCapture={(event) => {
        if (moved.current) {
          event.preventDefault();
          event.stopPropagation();
          moved.current = false;
        }
      }}
    >
      <div className={styles.cardLayer}>
        {cardStates.map((card) => (
          <div
            key={`${card.project.slug}-${card.tileX}-${card.tileY}`}
            ref={(element) => {
              card.element = element;
            }}
            className={styles.card}
            data-project-card=""
            style={{
              width: `${DESKTOP_CARD}px`,
              ['--aspect' as string]: card.aspect,
              animationDelay: `${card.index * 24}ms`,
            }}
          >
            <Link
              href={`/projects/${card.project.slug}`}
              className={styles.link}
              aria-label={`${card.project.title}, ${card.project.discipline}`}
              aria-hidden={card.tileX !== 0 || card.tileY !== 0}
              tabIndex={card.tileX === 0 && card.tileY === 0 ? undefined : -1}
              onPointerEnter={() => {
                card.hovered = true;
              }}
              onPointerLeave={() => {
                card.hovered = false;
              }}
              draggable={false}
            >
              <span className={styles.content}>
                <span className={styles.image}>
                  <Image
                    src={card.project.baseImg}
                    alt={`${card.project.title}, ${card.project.discipline}`}
                    fill
                    sizes="(max-width: 700px) 132px, (max-width: 1100px) 156px, 180px"
                    loading="lazy"
                    draggable={false}
                  />
                  <Image
                    src={card.project.hoverImg}
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="(max-width: 700px) 132px, (max-width: 1100px) 156px, 180px"
                    loading="lazy"
                    className={styles.hoverImage}
                    draggable={false}
                  />
                </span>
                <span className={styles.meta}>
                  <span className={styles.category}>{card.project.discipline}</span>
                  <span className={styles.title}>{card.project.title}</span>
                </span>
              </span>
            </Link>
          </div>
        ))}
      </div>

      <div className={styles.controls} aria-label="Gallery controls">
        <div className={styles.zoomGroup}>
          <button
            type="button"
            className={styles.control}
            aria-label="Zoom out"
            onClick={() => changeZoom(-0.1)}
          >
            −
          </button>
          <span className={styles.zoomLabel} aria-live="polite">
            {zoomLabel}%
          </span>
          <button
            type="button"
            className={styles.control}
            aria-label="Zoom in"
            onClick={() => changeZoom(0.1)}
          >
            +
          </button>
        </div>
        <div className={styles.viewGroup}>
          <button
            type="button"
            className={styles.control}
            aria-label="Canvas view"
            aria-pressed={view === 'canvas'}
            onClick={() => toggleView('canvas')}
          >
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <circle cx="4" cy="5" r="1.5" />
              <circle cx="10" cy="9" r="1.5" />
              <circle cx="16" cy="4" r="1.5" />
              <circle cx="6" cy="16" r="1.5" />
              <circle cx="15" cy="15" r="1.5" />
            </svg>
          </button>
          <button
            type="button"
            className={styles.control}
            aria-label="Grid view"
            aria-pressed={view === 'grid'}
            onClick={() => toggleView('grid')}
          >
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <rect x="3" y="3" width="5" height="5" rx="1" />
              <rect x="12" y="3" width="5" height="5" rx="1" />
              <rect x="3" y="12" width="5" height="5" rx="1" />
              <rect x="12" y="12" width="5" height="5" rx="1" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
