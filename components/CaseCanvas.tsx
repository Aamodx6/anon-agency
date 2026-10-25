'use client';

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import { GridProject } from '@/data/projectsGrid';
import { CaseTile } from '@/components/CaseTile';
import { SwapArrow } from '@/components/SwapArrow';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(Observer);
}

export interface CaseCanvasConfig {
  seed: number;
  cell: { w: number; h: number };
  jitter: number;
  density: number;
  stagger: boolean;
  columnDrift: number;
  tile: { w: number; h: number };
  scale: [number, number];
  rotation: [number, number];
  ring: number;
  zoom: { min: number; max: number; speed: number };
  friction: number;
  parallax: number;
  edgeDrift: number;
  edgeDeadZone: number;
  maxNodes: number;
}

const DEFAULT_CONFIG: CaseCanvasConfig = {
  seed: 1337,
  cell: { w: 308, h: 412 },
  jitter: 0.16,
  density: 0.95,
  stagger: false,
  columnDrift: 0.85,
  tile: { w: 220, h: 300 },
  scale: [0.72, 1.08],
  rotation: [-6, 6],
  ring: 0,
  zoom: { min: 0.6, max: 2, speed: 0.0016 },
  friction: 0.92,
  parallax: 40,
  edgeDrift: 13,
  edgeDeadZone: 0.5,
  maxNodes: 150,
};

const BREAKPOINTS: { maxWidth: number; config: Partial<CaseCanvasConfig> }[] = [
  {
    maxWidth: 1023,
    config: {
      cell: { w: 238, h: 318 },
      tile: { w: 170, h: 232 },
      parallax: 24,
    },
  },
  {
    maxWidth: 767,
    config: {
      cell: { w: 196, h: 258 },
      tile: { w: 140, h: 192 },
      scale: [0.85, 1.05],
      rotation: [-4, 4],
      parallax: 0,
      edgeDrift: 0,
    },
  },
];

function mergeConfig(
  base: CaseCanvasConfig,
  override?: Partial<CaseCanvasConfig>
): CaseCanvasConfig {
  if (!override) return base;
  return {
    ...base,
    ...override,
    cell: { ...base.cell, ...(override.cell || {}) },
    tile: { ...base.tile, ...(override.tile || {}) },
    zoom: { ...base.zoom, ...(override.zoom || {}) },
  };
}

function murmurHash3(h: number): number {
  h ^= h >>> 16;
  h = Math.imul(h, 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;
  return h;
}

function hash4(i: number, j: number, channel: number, seed: number): number {
  let l = 0 | seed;
  l = murmurHash3(l ^ Math.imul(0 | i, 0x27d4eb2f));
  l = murmurHash3(l ^ Math.imul(0 | j, 0x165667b1));
  l = murmurHash3(l ^ Math.imul(0 | channel, 0x9e3779b1)) >>> 0;
  return l;
}

function randomFloat(i: number, j: number, channel: number, seed: number): number {
  return hash4(i, j, channel, seed) / 0x100000000;
}

function lerp(range: [number, number], t: number): number {
  return range[0] + (range[1] - range[0]) * t;
}

function clamp(value: number, min: number, max: number): number {
  return value < min ? min : value > max ? max : value;
}

const permCache = new Map<number, number[][]>();

function getPermutations(itemCount: number): number[][] {
  const cached = permCache.get(itemCount);
  if (cached) return cached;
  let rng = -0x61c8864f;
  const nextRng = () => {
    rng = ((Math.imul(rng, 1664525) + 0x3c6ef35f) | 0) >>> 0;
    return rng / 0x100000000;
  };
  const list: { seq: number[]; bad: number; spread: number }[] = [];
  const seen = new Set<string>();
  for (let t = 0; t < 3000; t += 1) {
    const seq = Array.from({ length: itemCount }, (_, idx) => idx);
    for (let r = itemCount - 1; r > 0; r -= 1) {
      const idx = Math.floor(nextRng() * (r + 1));
      [seq[r], seq[idx]] = [seq[idx], seq[r]];
    }
    const key = seq.join(',');
    if (seen.has(key)) continue;
    seen.add(key);
    let bad = 0;
    const spread = new Set<number>();
    for (let r = 0; r + 1 < itemCount; r += 1) {
      const diff = (((seq[r + 1] - seq[r]) % itemCount) + itemCount) % itemCount;
      if (diff === 1 || diff === itemCount - 1) bad += 1;
      spread.add(diff);
    }
    list.push({ seq, bad, spread: spread.size });
  }
  list.sort((a, b) => a.bad - b.bad || b.spread - a.spread);
  const result = list.slice(0, 8).map((x) => x.seq);
  permCache.set(itemCount, result);
  return result;
}

function getItemIndex(i: number, j: number, seed: number, itemCount: number): number {
  if (itemCount <= 1) return 0;
  const blockX = Math.floor(i / itemCount);
  const blockY = Math.floor(j / itemCount);
  const perms = getPermutations(itemCount);
  const perm = perms[hash4(blockX, blockY, 1, seed) % perms.length];
  const offset = hash4(blockX, blockY, 7, seed) % itemCount;
  const wrappedY = ((j % itemCount) + itemCount) % itemCount;
  return (((i + perm[wrappedY] + offset) % itemCount) + itemCount) % itemCount;
}

function getCellPadding(config: CaseCanvasConfig) {
  const diagonal = (Math.hypot(config.tile.w, config.tile.h) * config.scale[1]) / 2;
  return {
    x: diagonal + (config.stagger ? config.cell.w / 2 : 0),
    y: diagonal + (config.columnDrift * config.cell.h) / 2,
  };
}

interface CellBounds {
  i0: number;
  i1: number;
  j0: number;
  j1: number;
}

function getVisibleCellBounds(
  camera: { x: number; y: number; z: number },
  viewport: { w: number; h: number },
  config: CaseCanvasConfig
): CellBounds {
  const halfW = viewport.w / (2 * camera.z);
  const halfH = viewport.h / (2 * camera.z);
  const pad = getCellPadding(config);
  const { cell, ring } = config;
  return {
    i0: Math.floor((camera.x - halfW - pad.x) / cell.w) - ring,
    i1: Math.floor((camera.x + halfW + pad.x) / cell.w) + ring,
    j0: Math.floor((camera.y - halfH - pad.y) / cell.h) - ring,
    j1: Math.floor((camera.y + halfH + pad.y) / cell.h) + ring,
  };
}

interface CellNode {
  key: string;
  i: number;
  j: number;
  itemIndex: number;
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

function getCellNodes(
  bounds: CellBounds,
  config: CaseCanvasConfig,
  itemCount: number
): CellNode[] {
  const nodes: CellNode[] = [];
  if (itemCount <= 0) return nodes;

  const { seed, cell, jitter, density, stagger, columnDrift } = config;

  for (let j = bounds.j0; j <= bounds.j1; j++) {
    for (let i = bounds.i0; i <= bounds.i1; i++) {
      if (randomFloat(i, j, 0, seed) >= density) continue;

      const staggerShift = stagger && (j & 1) !== 0 ? cell.w / 2 : 0;
      const driftShift =
        columnDrift > 0
          ? (randomFloat(i, 0, 6, seed) - 0.5) * columnDrift * cell.h
          : 0;

      const itemIndex = getItemIndex(i, j, seed, itemCount);
      const x =
        i * cell.w +
        cell.w / 2 +
        staggerShift +
        (randomFloat(i, j, 2, seed) - 0.5) * jitter * cell.w;
      const y =
        j * cell.h +
        cell.h / 2 +
        driftShift +
        (randomFloat(i, j, 3, seed) - 0.5) * jitter * cell.h;
      const scale = lerp(config.scale, randomFloat(i, j, 4, seed));
      const rotation = lerp(config.rotation, randomFloat(i, j, 5, seed));

      nodes.push({
        key: `${i}:${j}`,
        i,
        j,
        itemIndex,
        x,
        y,
        scale,
        rotation,
      });
    }
  }

  return nodes;
}

interface PoolTile {
  el: HTMLAnchorElement;
  base: HTMLImageElement;
  hover: HTMLImageElement;
  discipline: HTMLSpanElement;
  title: HTMLSpanElement;
  cellKey: string | null;
}

function resetPoolTile(tile: PoolTile) {
  tile.cellKey = null;
  tile.el.style.display = 'none';
  tile.el.removeAttribute('href');
  tile.el.removeAttribute('target');
  tile.el.removeAttribute('rel');
  delete tile.el.dataset.cell;
  delete tile.el.dataset.slug;
  delete tile.el.dataset.pageLabel;
  delete tile.el.dataset.caseFlip;
  delete tile.el.dataset.flipSrc;
  tile.el.removeAttribute('data-hover');
  tile.base.removeAttribute('src');
  tile.base.removeAttribute('srcset');
  tile.hover.removeAttribute('src');
  tile.hover.removeAttribute('srcset');
  tile.discipline.textContent = '';
  tile.title.textContent = '';
}

function createTilePool(count: number): PoolTile[] {
  const result: PoolTile[] = [];
  for (let a = 0; a < count; a += 1) {
    const el = document.createElement('a');
    el.className =
      'CaseTile-module__SHADKG__tile CaseCanvas-module__BpNJTq__poolTile';
    el.setAttribute('aria-hidden', 'true');
    el.setAttribute('tabindex', '-1');
    el.style.display = 'none';

    const thumb = document.createElement('span');
    thumb.className = 'CaseTile-module__SHADKG__thumb';

    const base = document.createElement('img');
    base.className =
      'CaseTile-module__SHADKG__img CaseTile-module__SHADKG__base';
    base.alt = '';
    base.decoding = 'async';
    base.draggable = false;

    const hover = document.createElement('img');
    hover.className =
      'CaseTile-module__SHADKG__img CaseTile-module__SHADKG__hover';
    hover.alt = '';
    hover.decoding = 'async';
    hover.draggable = false;
    hover.dataset.flipImg = '';

    thumb.append(base, hover);

    const meta = document.createElement('span');
    meta.className = 'CaseTile-module__SHADKG__meta';

    const discipline = document.createElement('span');
    discipline.className = 'CaseTile-module__SHADKG__discipline';

    const title = document.createElement('span');
    title.className = 'CaseTile-module__SHADKG__title';

    meta.append(discipline, title);
    el.append(thumb, meta);

    result.push({
      el,
      base,
      hover,
      discipline,
      title,
      cellKey: null,
    });
  }
  return result;
}

export function zoomPulse(el: HTMLElement | null) {
  if (
    !el ||
    (typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  ) {
    return;
  }
  el.animate(
    [
      { transform: 'scale(1)' },
      { transform: 'scale(0.82)' },
      { transform: 'scale(1)' },
    ],
    { duration: 420, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }
  );
}

function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (callback: () => void) => {
      const m = window.matchMedia(query);
      m.addEventListener('change', callback);
      return () => m.removeEventListener('change', callback);
    },
    [query]
  );
  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query]
  );
  return useSyncExternalStore(subscribe, getSnapshot, () => null);
}

const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * 20;

function columnsForWidth(w: number) {
  return w >= 1200 ? 4 : w >= 900 ? 3 : w >= 600 ? 2 : 1;
}

/* ----------------------------------------------------
 * SLIDER MODE (CaseTicker)
 * ---------------------------------------------------- */
function CaseTickerSlider({
  items,
  children,
}: {
  items: GridProject[];
  children: React.ReactNode;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLUListElement>(null);
  const slotRefs = useRef<(HTMLLIElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tickerRef = useRef<{
    step: (dir: number) => void;
    hold: (held: boolean) => void;
    resume: () => void;
    flatten: () => void;
    detach: () => void;
  } | null>(null);

  const total = items.length;
  const slotCount =
    total > 0 ? (total <= 0 ? 0 : total * Math.max(1, Math.ceil(6 / total))) : 0;
  const isHeld = useRef(false);
  const holdTimer = useRef<number | null>(null);
  const isMoving = useRef(false);
  const ringRef = useRef<SVGCircleElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const clearTimer = useCallback(() => {
    if (holdTimer.current !== null) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
  }, []);

  const killRing = useCallback(() => {
    tweenRef.current?.kill();
    tweenRef.current = null;
    if (ringRef.current) {
      gsap.set(ringRef.current, { strokeDashoffset: CIRCLE_CIRCUMFERENCE });
    }
  }, []);

  const updateRing = useCallback(
    (info: { left: number; total: number } | 'held' | null) => {
      if (info === 'held') {
        tweenRef.current?.pause();
        return;
      }
      if (!info) {
        killRing();
        return;
      }
      const ring = ringRef.current;
      if (!ring) return;
      tweenRef.current?.kill();
      const offset = CIRCLE_CIRCUMFERENCE * (info.left / info.total);
      tweenRef.current = gsap.fromTo(
        ring,
        { strokeDashoffset: offset },
        {
          strokeDashoffset: 0,
          duration: info.left / 1000,
          ease: 'none',
        }
      );
    },
    [killRing]
  );

  const onHold = useCallback(() => tickerRef.current?.hold(true), []);
  const onRelease = useCallback(() => tickerRef.current?.hold(false), []);
  const onStep = useCallback(
    (dir: number, target?: HTMLElement | null) => {
      tickerRef.current?.step(dir);
      zoomPulse(target ?? null);
    },
    []
  );

  useLayoutEffect(() => {
    const vp = viewportRef.current;
    if (vp && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(vp, { opacity: 0 });
    }
  }, []);

  useEffect(() => {
    const vp = viewportRef.current;
    const strip = stripRef.current;
    if (!vp || !strip || slotCount === 0) return;

    const slots: { outer: HTMLElement; inner: HTMLElement }[] = [];
    for (let idx = 0; idx < slotCount; idx++) {
      const o = slotRefs.current[idx];
      const i = cardRefs.current[idx];
      if (o && i) slots.push({ outer: o, inner: i });
    }
    if (slots.length !== slotCount) return;

    const wrap = gsap.utils.wrap(-1, slotCount - 1);
    let wrapFunc = wrap;
    let offsetStagger = 0;
    const pos = { t: 0 };
    let lastT = 0;
    let bend = 0;
    let cellW = 0;
    let slideW = 0;
    let totalW = 1;
    let isDragging = false;
    let isAnimating = false;
    let isSuspended = false;
    let isInterrupted = false;
    let animTimer = 0;
    let timerStart = 0;
    let timerDuration = 0;
    let isHoldingTimer = false;
    let savedTime = 0;
    let lastFrameTime = 0;
    let rafId = 0;

    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduced = reducedQuery.matches;

    function renderSlots() {
      const rot = 7 * bend;
      const scale = 1 - 0.06 * Math.abs(bend);
      const half =
        ((totalW = cellW * (1 + 0.16 * Math.abs(bend))) - slideW) / 2 +
        offsetStagger * totalW;
      for (let s = 0; s < slotCount; s++) {
        const xPos = wrapFunc(s + pos.t) * totalW + half;
        slots[s].outer.style.transform = `translate3d(${xPos.toFixed(2)}px, -50%, 0) rotate(${rot.toFixed(3)}deg) scale(${scale.toFixed(4)})`;
      }
      strip!.style.transform = `rotate(${(1.6 * bend).toFixed(3)}deg)`;
    }

    function onResize() {
      const cw = vp!.clientWidth;
      if (cw < 1) return;
      let cols = columnsForWidth(cw);
      const ch = vp!.clientHeight;
      if (ch > 0 && ch < 620) {
        const target = Math.max(120, (ch - 190) / 1.16);
        while ((cw / cols) * 0.84 > target && cols < Math.max(1, slotCount - 2)) {
          cols++;
        }
      }
      slideW = 0.84 * (cellW = cw / cols);
      offsetStagger = 0.5 * (cols % 2 === 0 ? 1 : 0);
      const margin = slotCount > 6 ? 2 : 1;
      wrapFunc = gsap.utils.wrap(
        -margin - offsetStagger,
        slotCount - margin - offsetStagger
      );
      strip!.style.setProperty('--slide-w', `${slideW}px`);
      renderSlots();
    }

    const onReducedChange = () => {
      reduced = reducedQuery.matches;
      if (reduced) {
        bend = 0;
        cancelTimer();
        gsap.killTweensOf(pos);
        isAnimating = false;
        pos.t = Math.round(pos.t);
        renderSlots();
      }
    };
    reducedQuery.addEventListener('change', onReducedChange);

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(vp);

    function cancelTimer() {
      savedTime = 0;
      if (animTimer) {
        window.clearTimeout(animTimer);
        animTimer = 0;
        updateRing(null);
      }
    }

    function startTimer(duration = 3400) {
      cancelTimer();
      if (!reduced && !isSuspended && !isInterrupted && !isDragging) {
        if (isHoldingTimer) {
          savedTime = duration;
          updateRing('held');
          return;
        }
        timerStart = performance.now();
        timerDuration = duration;
        animTimer = window.setTimeout(() => {
          animTimer = 0;
          updateRing(null);
          goTo(pos.t - 1, 0.9);
        }, duration);
        updateRing({ left: duration, total: 3400 });
      }
    }

    function goTo(targetT: number, dur: number) {
      if (isInterrupted) return;
      cancelTimer();
      gsap.killTweensOf(pos);
      isAnimating = true;
      startLoop();
      gsap.to(pos, {
        t: targetT,
        duration: reduced ? 0 : dur,
        ease: 'expo.out',
        overwrite: true,
        onComplete: () => {
          isAnimating = false;
          pos.t = Math.round(pos.t);
          startTimer();
        },
      });
    }

    function tick(timestamp: number) {
      if (isInterrupted) return;
      const deltaRatio = lastFrameTime
        ? gsap.utils.clamp(0.2, 3, (timestamp - lastFrameTime) / (1000 / 60))
        : 1;
      lastFrameTime = timestamp;
      const prevT = pos.t;
      pos.t = ((pos.t % slotCount) + slotCount) % slotCount;
      lastT += pos.t - prevT;
      let diff = pos.t - lastT;
      if (Math.abs(diff) > slotCount / 2) diff = 0;
      lastT = pos.t;
      const vel = deltaRatio > 0 ? diff / deltaRatio : 0;
      const targetBend = reduced ? 0 : gsap.utils.clamp(-1, 1, vel / 0.055);
      bend += (targetBend - bend) * (1 - Math.pow(0.88, deltaRatio));
      if (Math.abs(targetBend) < 0.001 && Math.abs(bend) < 0.001) bend = 0;

      const moving = isDragging || isAnimating || Math.abs(vel) > 0.01;
      if (moving !== isMoving.current) {
        isMoving.current = moving;
        if (moving) vp!.dataset.moving = 'true';
        else delete vp!.dataset.moving;
      }
      renderSlots();

      if (moving || bend !== 0 || isDragging || isAnimating) {
        rafId = requestAnimationFrame(tick);
      } else {
        stopLoop();
      }
    }

    function startLoop() {
      if (!rafId && !isInterrupted && !isSuspended) {
        rafId = requestAnimationFrame(tick);
      }
    }

    function stopLoop() {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
        lastFrameTime = 0;
      }
    }

    function setSuspended(suspend: boolean) {
      if (suspend !== isSuspended) {
        isSuspended = suspend;
        if (suspend) {
          cancelTimer();
          gsap.killTweensOf(pos);
          isAnimating = false;
          stopLoop();
        } else {
          startLoop();
          startTimer();
        }
      }
    }

    const onVisibility = () => setSuspended(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => setSuspended(!entry.isIntersecting),
      { threshold: 0 }
    );
    intersectionObserver.observe(vp);

    const preventDrag = (e: DragEvent) => e.preventDefault();
    vp.addEventListener('dragstart', preventDrag);

    const obs = Observer.create({
      target: vp,
      type: 'wheel,touch,pointer',
      preventDefault: true,
      allowClicks: true,
      dragMinimum: 3,
      tolerance: 0,
      lockAxis: true,
      onPress: () => {
        vp.dataset.pressed = 'true';
        gsap.killTweensOf(pos);
        isAnimating = false;
        cancelTimer();
        startLoop();
      },
      onRelease: () => {
        delete vp.dataset.pressed;
        if (!isDragging && !isAnimating) startTimer();
      },
      onDragStart: () => {
        isDragging = true;
        vp.dataset.dragging = 'true';
        startLoop();
      },
      onDrag: (e) => {
        pos.t += e.deltaX / totalW;
        startLoop();
      },
      onDragEnd: (e) => {
        isDragging = false;
        const vel = reduced ? 0 : e.velocityX / totalW;
        const offset = gsap.utils.clamp(-6, 6, 0.3 * vel);
        let target = Math.round(pos.t + offset);
        if (target === Math.round(pos.t) && Math.abs(vel) > 1.1) {
          target += Math.sign(vel);
        }
        const delta = Math.abs(target - pos.t);
        goTo(target, 0.55 + 0.14 * Math.max(0, delta - 1));
        requestAnimationFrame(() => {
          delete vp.dataset.dragging;
        });
      },
      onWheel: (e) => {
        if (reduced || isAnimating) return;
        const wheelDelta =
          Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        if (wheelDelta) {
          goTo(Math.round(pos.t) - Math.sign(wheelDelta), 0.72);
        }
      },
    });

    onResize();
    renderSlots();
    startTimer();

    tickerRef.current = {
      step: (dir: number) => {
        if (!isInterrupted) goTo(Math.round(pos.t) - dir, 0.72);
      },
      hold: (held: boolean) => {
        if (!isInterrupted && isHoldingTimer !== held) {
          isHoldingTimer = held;
          if (held) {
            if (!animTimer) return;
            const remaining = Math.max(
              300,
              timerDuration - (performance.now() - timerStart)
            );
            window.clearTimeout(animTimer);
            animTimer = 0;
            savedTime = remaining;
            updateRing('held');
          } else if (savedTime) {
            const time = savedTime;
            savedTime = 0;
            startTimer(time);
          }
        }
      },
      resume: () => {
        if (!isInterrupted) startTimer();
      },
      flatten: () => {
        const inners = slots.map((s) => s.inner);
        gsap.killTweensOf(inners);
        gsap.set(inners, { clearProps: 'transform' });
      },
      detach: () => {
        isInterrupted = true;
        cancelTimer();
        stopLoop();
        gsap.killTweensOf(pos);
        gsap.killTweensOf(slots.map((s) => s.inner));
        obs.kill();
        vp.removeEventListener('dragstart', preventDrag);
        resizeObserver.disconnect();
        intersectionObserver.disconnect();
        document.removeEventListener('visibilitychange', onVisibility);
        reducedQuery.removeEventListener('change', onReducedChange);
        delete vp.dataset.dragging;
        delete vp.dataset.pressed;
        delete vp.dataset.moving;
      },
    };

    gsap.fromTo(
      vp,
      { opacity: 0, scale: 0.965 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: 'expo.out',
        clearProps: 'opacity,scale',
        onComplete: () => tickerRef.current?.resume(),
      }
    );

    return () => {
      cancelTimer();
      stopLoop();
      tickerRef.current?.detach();
      tickerRef.current = null;
    };
  }, [slotCount, updateRing, killRing]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onStep(1);
      else if (e.key === 'ArrowLeft') onStep(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onStep]);

  return (
    <div
      className="CaseTicker-module__qP8FZq__viewport"
      ref={viewportRef}
      onPointerDownCapture={() => {
        tickerRef.current?.flatten();
        clearTimer();
      }}
    >
      <ul className="CaseTicker-module__qP8FZq__strip" ref={stripRef} aria-hidden="true">
        {Array.from({ length: slotCount }, (_, idx) => {
          const item = items[idx % total];
          return (
            <li
              key={`${item.slug}-${idx}`}
              className="CaseTicker-module__qP8FZq__slot"
              ref={(el) => {
                slotRefs.current[idx] = el;
              }}
            >
              <div
                className="CaseTicker-module__qP8FZq__card"
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
              >
                <Link
                  className="CaseCard-module__WCHEYG__card"
                  href={`/projects/${item.slug}`}
                  data-page-label={item.title}
                  data-case-flip=""
                  data-flip-src={item.hoverImg}
                  tabIndex={-1}
                >
                  <span className="CaseCard-module__WCHEYG__thumb">
                    <img
                      src={item.baseImg}
                      alt={`${item.title}, ${item.discipline}`}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </span>
                  <span className="CaseCard-module__WCHEYG__meta">
                    <span className="CaseCard-module__WCHEYG__title">
                      {item.title}
                    </span>
                    <span
                      className="CaseCard-module__WCHEYG__dot"
                      aria-hidden="true"
                    />
                    <span className="CaseCard-module__WCHEYG__discipline">
                      {item.discipline}
                    </span>
                  </span>
                </Link>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="CaseTicker-module__qP8FZq__controls">
        <button
          type="button"
          className="CaseTicker-module__qP8FZq__step"
          aria-label="Previous project"
          onClick={(e) => onStep(-1, e.currentTarget)}
          onPointerEnter={onHold}
          onPointerLeave={onRelease}
          onFocus={onHold}
          onBlur={onRelease}
          data-arrow-host=""
        >
          <SwapArrow dir="left" size={14} strokeWidth={1.8} />
        </button>

        {children}

        <button
          type="button"
          className="CaseTicker-module__qP8FZq__step"
          aria-label="Next project"
          onClick={(e) => onStep(1, e.currentTarget)}
          onPointerEnter={onHold}
          onPointerLeave={onRelease}
          onFocus={onHold}
          onBlur={onRelease}
          data-arrow-host=""
        >
          <svg
            className="CaseTicker-module__qP8FZq__ring"
            viewBox="0 0 44 44"
            aria-hidden="true"
            focusable="false"
          >
            <circle
              className="CaseTicker-module__qP8FZq__ringTrack"
              cx="22"
              cy="22"
              r="20"
            />
            <circle
              className="CaseTicker-module__qP8FZq__ringFill"
              cx="22"
              cy="22"
              r="20"
              ref={ringRef}
              strokeDasharray={CIRCLE_CIRCUMFERENCE}
              strokeDashoffset={CIRCLE_CIRCUMFERENCE}
            />
          </svg>
          <SwapArrow dir="right" size={14} strokeWidth={1.8} />
        </button>
      </div>
    </div>
  );
}

/* ----------------------------------------------------
 * MODE TOGGLE CONTROLS (Canvas / Slider)
 * ---------------------------------------------------- */
function ViewModeGroup({
  mode,
  onChoose,
}: {
  mode: 'canvas' | 'slider' | 'list';
  onChoose: (m: 'canvas' | 'slider' | 'list') => void;
}) {
  const handleClick =
    (targetMode: 'canvas' | 'slider' | 'list') =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      zoomPulse(event.currentTarget);
      onChoose(targetMode);
    };

  return (
    <div
      className="CaseCanvas-module__BpNJTq__modeGroup"
      role="group"
      aria-label="View"
    >
      <button
        type="button"
        className="CaseCanvas-module__BpNJTq__control"
        aria-pressed={mode === 'canvas'}
        aria-label="Canvas view"
        onClick={handleClick('canvas')}
      >
        <svg
          viewBox="0 0 16 16"
          width="16"
          height="16"
          aria-hidden="true"
          focusable="false"
        >
          {[0, 6, 12].map((y) =>
            [0, 6, 12].map((x) => (
              <rect
                key={`${x}-${y}`}
                x={x}
                y={y}
                width="4"
                height="4"
                rx="1"
              />
            ))
          )}
        </svg>
      </button>

      <button
        type="button"
        className="CaseCanvas-module__BpNJTq__control"
        aria-pressed={mode === 'slider'}
        aria-label="Slider view"
        onClick={handleClick('slider')}
      >
        <svg
          viewBox="0 0 16 16"
          width="16"
          height="16"
          aria-hidden="true"
          focusable="false"
        >
          <rect x="0" y="3" width="3" height="10" rx="1" opacity="0.45" />
          <rect x="5" y="0" width="6" height="16" rx="1" />
          <rect x="13" y="3" width="3" height="10" rx="1" opacity="0.45" />
        </svg>
      </button>
    </div>
  );
}

/* ----------------------------------------------------
 * MAIN CASECANVAS COMPONENT
 * ---------------------------------------------------- */
export interface CaseCanvasProps {
  items: GridProject[];
  config?: Partial<CaseCanvasConfig>;
}

export function CaseCanvas({ items, config: userConfig }: CaseCanvasProps) {
  const [explicitMode, setExplicitMode] = useState<
    'canvas' | 'slider' | 'list' | null
  >(null);

  const windowWidth = useSyncExternalStore(
    (callback) => {
      window.addEventListener('resize', callback);
      return () => window.removeEventListener('resize', callback);
    },
    () => (typeof window !== 'undefined' ? window.innerWidth : 1440),
    () => 1440
  );

  const isDesktop = useMediaQuery('(min-width: 768px)');
  const prefersReduced = useMediaQuery('(prefers-reduced-motion: reduce)');

  const mode: 'canvas' | 'slider' | 'list' =
    explicitMode ??
    (isDesktop === null || prefersReduced
      ? 'list'
      : isDesktop
      ? 'canvas'
      : 'slider');

  const isPending = isDesktop === null || prefersReduced === null;

  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);

  const canvasEngineRef = useRef<{
    intro: () => void;
    detach: () => void;
    zoomBy: (factor: number) => void;
    reset: () => void;
    focusSlug: (slug: string) => void;
  } | null>(null);

  const mergedConfig = useMemo(() => {
    let cfg = DEFAULT_CONFIG;
    for (const bp of BREAKPOINTS) {
      if (windowWidth <= bp.maxWidth) {
        cfg = mergeConfig(cfg, bp.config);
      }
    }
    return mergeConfig(cfg, userConfig);
  }, [windowWidth, userConfig]);

  // Lock body scroll when in canvas or slider mode
  useEffect(() => {
    if (mode === 'list') return;
    const originalHtml = document.documentElement.style.overflow;
    const originalBody = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = originalHtml;
      document.body.style.overflow = originalBody;
    };
  }, [mode]);

  // Canvas lifecycle
  useEffect(() => {
    if (mode !== 'canvas') return;
    const surfaceEl = surfaceRef.current;
    const parallaxEl = parallaxRef.current;
    const cameraEl = cameraRef.current;
    const listEl = listRef.current;
    if (!surfaceEl || !parallaxEl || !cameraEl || !listEl) return;

    const sources = items.map((p) => ({
      slug: p.slug,
      title: p.title,
      discipline: p.discipline,
      href: `/projects/${p.slug}`,
      external: false,
      flipSrc: p.hoverImg,
      baseSrc: p.baseImg,
      hoverSrc: p.hoverImg,
      sizes: '380px',
    }));

    const cfg = mergedConfig;
    const camera = { x: 0.5 * cfg.cell.w, y: 0.5 * cfg.cell.h, z: 0.86 };
    const velocity = { x: 0, y: 0 };
    const parallaxOffset = { x: 0, y: 0, tx: 0, ty: 0 };
    const pointer = { x: 0, y: 0, inside: false };
    const edgeDrift = { x: 0, y: 0, tx: 0, ty: 0 };
    const origin = { x: camera.x, y: camera.y };
    let viewportSize = { w: 1, h: 1 };
    let rafId = 0;
    let isDragging = false;
    let isIntro = false;
    let isIntroPrepared = false;
    let cachedBounds: CellBounds | null = null;
    let isDetached = false;

    cameraEl.style.setProperty('--tile-w', `${cfg.tile.w}px`);
    cameraEl.style.setProperty(
      '--tile-title-size',
      `${Math.round(0.082 * cfg.tile.w)}px`
    );
    cameraEl.style.setProperty(
      '--tile-discipline-size',
      `${Math.round(0.05 * cfg.tile.w)}px`
    );
    cameraEl.style.setProperty(
      '--tile-meta-gap',
      `${Math.round(0.03 * cfg.tile.w)}px`
    );
    cameraEl.style.setProperty(
      '--tile-meta-top',
      `${Math.round(0.055 * cfg.tile.w)}px`
    );

    const activeMap = new Map<string, PoolTile>();
    const freePool: PoolTile[] = [];
    let allPool: PoolTile[] = [];

    function clearActiveTiles() {
      for (const tile of activeMap.values()) {
        gsap.killTweensOf(tile.el);
        resetPoolTile(tile);
        freePool.push(tile);
      }
      activeMap.clear();
      cachedBounds = null;
    }

    function updateTiles() {
      const bounds = getVisibleCellBounds(camera, viewportSize, cfg);
      if (
        cachedBounds &&
        cachedBounds.i0 === bounds.i0 &&
        cachedBounds.i1 === bounds.i1 &&
        cachedBounds.j0 === bounds.j0 &&
        cachedBounds.j1 === bounds.j1
      ) {
        return;
      }
      cachedBounds = bounds;

      const nodes = getCellNodes(bounds, cfg, sources.length);
      const nodeKeys = new Set(nodes.map((n) => n.key));

      for (const [key, tile] of activeMap) {
        if (!nodeKeys.has(key)) {
          gsap.killTweensOf(tile.el);
          resetPoolTile(tile);
          freePool.push(tile);
          activeMap.delete(key);
        }
      }

      for (const node of nodes) {
        if (activeMap.has(node.key)) continue;
        const tile = freePool.pop();
        if (!tile) continue;

        const source = sources[node.itemIndex];
        if (!source) {
          freePool.push(tile);
          continue;
        }

        const relativeX = node.x - origin.x;
        const relativeY = node.y - origin.y;
        tile.cellKey = node.key;
        tile.el.href = source.href;
        tile.el.dataset.cell = node.key;
        tile.el.dataset.slug = source.slug;
        tile.el.dataset.pageLabel = source.title;
        tile.el.dataset.caseFlip = '';
        tile.el.dataset.flipSrc = source.flipSrc;

        tile.base.sizes = source.sizes;
        tile.base.src = source.baseSrc;
        tile.hover.sizes = source.sizes;
        tile.hover.src = source.hoverSrc;
        tile.hover.style.display = '';

        tile.discipline.textContent = source.discipline;
        tile.title.textContent = source.title;
        tile.el.style.opacity = '';

        const signX = relativeX >= 0 ? '+' : '-';
        const signY = relativeY >= 0 ? '+' : '-';
        tile.el.style.transform = `translate3d(calc(-50% ${signX} ${Math.abs(relativeX).toFixed(2)}px), calc(-50% ${signY} ${Math.abs(relativeY).toFixed(2)}px), 0px) rotate(${node.rotation.toFixed(3)}deg) scale(${node.scale.toFixed(4)})`;
        tile.el.style.display = '';

        activeMap.set(node.key, tile);
      }
    }

    function renderTransforms() {
      const camX = (-(camera.x - origin.x) * camera.z + viewportSize.w / 2).toFixed(2);
      const camY = (-(camera.y - origin.y) * camera.z + viewportSize.h / 2).toFixed(2);
      cameraEl!.style.transform = `translate3d(${camX}px, ${camY}px, 0px) scale(${camera.z.toFixed(4)})`;
      parallaxEl!.style.transform = `translate3d(${parallaxOffset.x.toFixed(2)}px, ${parallaxOffset.y.toFixed(2)}px, 0px)`;
    }

    function loop() {
      if (isDetached) return;

      if (!isDragging && (velocity.x !== 0 || velocity.y !== 0)) {
        camera.x += velocity.x;
        camera.y += velocity.y;
        velocity.x *= cfg.friction;
        velocity.y *= cfg.friction;
        if (Math.abs(velocity.x) < 0.02) velocity.x = 0;
        if (Math.abs(velocity.y) < 0.02) velocity.y = 0;
      }

      // Edge drift calculation
      if (pointer.inside && !isDragging && !isIntro && cfg.edgeDrift > 0) {
        const deadZone = cfg.edgeDeadZone;
        const activeRange = 1 - deadZone || 1;
        const normX = clamp((pointer.x / viewportSize.w - 0.5) * 2, -1, 1);
        const normY = clamp((pointer.y / viewportSize.h - 0.5) * 2, -1, 1);
        const factorX = Math.max(0, (Math.abs(normX) - deadZone) / activeRange);
        const factorY = Math.max(0, (Math.abs(normY) - deadZone) / activeRange);
        edgeDrift.tx = Math.sign(normX) * factorX * factorX * cfg.edgeDrift;
        edgeDrift.ty = Math.sign(normY) * factorY * factorY * cfg.edgeDrift;
      } else {
        edgeDrift.tx = 0;
        edgeDrift.ty = 0;
      }

      edgeDrift.x += (edgeDrift.tx - edgeDrift.x) * 0.09;
      edgeDrift.y += (edgeDrift.ty - edgeDrift.y) * 0.09;
      if (Math.abs(edgeDrift.x) < 0.01 && edgeDrift.tx === 0) edgeDrift.x = 0;
      if (Math.abs(edgeDrift.y) < 0.01 && edgeDrift.ty === 0) edgeDrift.y = 0;

      if (edgeDrift.x !== 0 || edgeDrift.y !== 0) {
        camera.x += edgeDrift.x / camera.z;
        camera.y += edgeDrift.y / camera.z;
      }

      parallaxOffset.x += (parallaxOffset.tx - parallaxOffset.x) * 0.08;
      parallaxOffset.y += (parallaxOffset.ty - parallaxOffset.y) * 0.08;

      if (
        Math.abs(camera.x - origin.x) >= 1e5 ||
        Math.abs(camera.y - origin.y) >= 1e5
      ) {
        origin.x = camera.x;
        origin.y = camera.y;
        clearActiveTiles();
        updateTiles();
      }

      updateTiles();
      renderTransforms();

      const parallaxSettled =
        Math.abs(parallaxOffset.tx - parallaxOffset.x) < 0.05 &&
        Math.abs(parallaxOffset.ty - parallaxOffset.y) < 0.05;
      const driftSettled =
        edgeDrift.x === 0 &&
        edgeDrift.y === 0 &&
        edgeDrift.tx === 0 &&
        edgeDrift.ty === 0;

      if (
        !isDragging &&
        !isIntro &&
        driftSettled &&
        velocity.x === 0 &&
        velocity.y === 0 &&
        parallaxSettled
      ) {
        parallaxOffset.x = parallaxOffset.tx;
        parallaxOffset.y = parallaxOffset.ty;
        renderTransforms();
        rafId = 0;
        return;
      }

      rafId = requestAnimationFrame(loop);
    }

    function requestLoop() {
      if (!rafId && !isDetached) {
        rafId = requestAnimationFrame(loop);
      }
    }

    function zoomAt(clientX: number, clientY: number, factor: number) {
      const worldPoint = {
        x: (clientX - viewportSize.w / 2) / camera.z + camera.x,
        y: (clientY - viewportSize.h / 2) / camera.z + camera.y,
      };
      camera.z = clamp(camera.z * factor, cfg.zoom.min, cfg.zoom.max);
      camera.x = worldPoint.x - (clientX - viewportSize.w / 2) / camera.z;
      camera.y = worldPoint.y - (clientY - viewportSize.h / 2) / camera.z;
      requestLoop();
    }

    // Touch pointers map for pinch zoom
    const touchMap = new Map<number, { x: number; y: number }>();
    let isPinching = false;
    let lastDistance = 0;
    let lastMidX = 0;
    let lastMidY = 0;

    function getTouchInfo() {
      const [t1, t2] = [...touchMap.values()];
      return {
        distance: Math.hypot(t1.x - t2.x, t1.y - t2.y),
        midX: (t1.x + t2.x) / 2,
        midY: (t1.y + t2.y) / 2,
      };
    }

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== 'touch') return;
      touchMap.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (touchMap.size === 2) {
        const info = getTouchInfo();
        isPinching = true;
        lastDistance = info.distance;
        lastMidX = info.midX;
        lastMidY = info.midY;
        velocity.x = 0;
        velocity.y = 0;
      }
    };

    const onPointerMoveTouch = (e: PointerEvent) => {
      if (e.pointerType !== 'touch' || !touchMap.has(e.pointerId)) return;
      touchMap.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (!isPinching || touchMap.size < 2) return;

      const info = getTouchInfo();
      const rect = surfaceEl.getBoundingClientRect();
      camera.x -= (info.midX - lastMidX) / camera.z;
      camera.y -= (info.midY - lastMidY) / camera.z;

      if (lastDistance > 0 && info.distance > 0) {
        zoomAt(
          info.midX - rect.left,
          info.midY - rect.top,
          info.distance / lastDistance
        );
      }
      lastDistance = info.distance;
      lastMidX = info.midX;
      lastMidY = info.midY;
      requestLoop();
    };

    const onPointerUpTouch = (e: PointerEvent) => {
      if (e.pointerType !== 'touch') return;
      touchMap.delete(e.pointerId);
      if (touchMap.size < 2 && isPinching) {
        isPinching = false;
        velocity.x = 0;
        velocity.y = 0;
      }
    };

    // Parallax mouse hover
    const onPointerMoveHover = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const rect = surfaceEl.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.inside = true;
      if (cfg.parallax > 0) {
        parallaxOffset.tx =
          -((pointer.x / rect.width - 0.5) * 2) * cfg.parallax;
        parallaxOffset.ty =
          -((pointer.y / rect.height - 0.5) * 2) * cfg.parallax;
      }
      requestLoop();
    };

    const onPointerLeaveSurface = () => {
      pointer.inside = false;
      parallaxOffset.tx = 0;
      parallaxOffset.ty = 0;
      requestLoop();
    };

    surfaceEl.addEventListener('pointerdown', onPointerDown);
    surfaceEl.addEventListener('pointermove', onPointerMoveTouch, {
      passive: false,
    });
    surfaceEl.addEventListener('pointerup', onPointerUpTouch);
    surfaceEl.addEventListener('pointercancel', onPointerUpTouch);
    surfaceEl.addEventListener('pointermove', onPointerMoveHover);
    surfaceEl.addEventListener('pointerleave', onPointerLeaveSurface);

    const preventDefault = (e: Event) => e.preventDefault();
    surfaceEl.addEventListener('dragstart', preventDefault);

    // Observer for panning and momentum fling
    const obs = Observer.create({
      target: surfaceEl,
      type: 'wheel,touch,pointer',
      preventDefault: true,
      allowClicks: true,
      dragMinimum: 3,
      tolerance: 0,
      onPress: () => {
        velocity.x = 0;
        velocity.y = 0;
        surfaceEl.dataset.pressed = 'true';
      },
      onRelease: () => {
        delete surfaceEl.dataset.pressed;
      },
      onDragStart: () => {
        isDragging = true;
        surfaceEl.dataset.dragging = 'true';
        requestLoop();
      },
      onDrag: (e) => {
        if (!isPinching) {
          camera.x -= e.deltaX / camera.z;
          camera.y -= e.deltaY / camera.z;
          requestLoop();
        }
      },
      onDragEnd: (e) => {
        isDragging = false;
        velocity.x = isPinching ? 0 : -e.velocityX / camera.z / 60;
        velocity.y = isPinching ? 0 : -e.velocityY / camera.z / 60;
        requestAnimationFrame(() => {
          delete surfaceEl.dataset.dragging;
        });
        requestLoop();
      },
      onWheel: (e) => {
        const ev = e.event as WheelEvent | undefined;
        if (ev?.ctrlKey || ev?.metaKey) {
          const rect = surfaceEl.getBoundingClientRect();
          zoomAt(
            ev.clientX - rect.left,
            ev.clientY - rect.top,
            Math.exp(-e.deltaY * cfg.zoom.speed)
          );
          return;
        }
        camera.x += e.deltaX / camera.z;
        camera.y += e.deltaY / camera.z;
        requestLoop();
      },
    });

    // Resize observer
    function onResizeViewport() {
      const rect = surfaceEl.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) return;
      viewportSize = { w: rect.width, h: rect.height };

      const pad = getCellPadding(cfg);
      const neededNodes = Math.min(
        (Math.ceil((viewportSize.w / cfg.zoom.min + 2 * pad.x) / cfg.cell.w) +
          2 * cfg.ring +
          2) *
          (Math.ceil(
            (viewportSize.h / cfg.zoom.min + 2 * pad.y) / cfg.cell.h
          ) +
            2 * cfg.ring +
            2),
        cfg.maxNodes
      );

      if (allPool.length < neededNodes) {
        const added = createTilePool(neededNodes - allPool.length);
        for (const tile of added) {
          cameraEl.appendChild(tile.el);
        }
        allPool = allPool.concat(added);
        freePool.push(...added);
      }

      cachedBounds = null;
      requestLoop();
    }

    const resizeObserver = new ResizeObserver(onResizeViewport);
    resizeObserver.observe(surfaceEl);

    // Initial setup
    onResizeViewport();
    camera.x = 0.5 * cfg.cell.w;
    camera.y = 0.5 * cfg.cell.h;
    origin.x = camera.x;
    origin.y = camera.y;

    function prepareIntro() {
      camera.z = 0.86;
      cachedBounds = null;
      updateTiles();
      renderTransforms();
      for (const tile of activeMap.values()) {
        tile.el.style.opacity = '0';
      }
      isIntroPrepared = true;
    }

    prepareIntro();

    function triggerIntro() {
      if (isIntroPrepared) prepareIntro();
      isIntroPrepared = false;
      const cx = viewportSize.w / 2;
      const cy = viewportSize.h / 2;
      const sortedTiles = [...activeMap.values()]
        .map((r) => {
          const rect = r.el.getBoundingClientRect();
          return {
            el: r.el,
            dist: Math.hypot(
              rect.left + rect.width / 2 - cx,
              rect.top + rect.height / 2 - cy
            ),
          };
        })
        .sort((a, b) => a.dist - b.dist)
        .map((x) => x.el);

      isIntro = true;
      gsap
        .timeline({
          onComplete: () => {
            isIntro = false;
            requestLoop();
          },
        })
        .to(camera, { z: 1, duration: 1.15, ease: 'expo.out' }, 0)
        .to(
          sortedTiles,
          {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
            stagger: { amount: 0.55 },
            clearProps: 'opacity',
          },
          0.06
        );
      requestLoop();
    }

    const introFrame = requestAnimationFrame(() => {
      requestAnimationFrame(triggerIntro);
    });

    canvasEngineRef.current = {
      intro: triggerIntro,
      zoomBy: (factor: number) => {
        zoomAt(viewportSize.w / 2, viewportSize.h / 2, factor);
      },
      reset: () => {
        edgeDrift.x = 0;
        edgeDrift.y = 0;
        edgeDrift.tx = 0;
        edgeDrift.ty = 0;
        camera.x = 0.5 * cfg.cell.w;
        camera.y = 0.5 * cfg.cell.h;
        camera.z = 1;
        velocity.x = 0;
        velocity.y = 0;
        cachedBounds = null;
        requestLoop();
      },
      focusSlug: (slug: string) => {
        const idx = sources.findIndex((s) => s.slug === slug);
        if (idx < 0) return;
        const nodes = getCellNodes(
          getVisibleCellBounds(camera, viewportSize, cfg),
          cfg,
          sources.length
        );
        const target = nodes.find((n) => n.itemIndex === idx);
        if (target) {
          camera.x = target.x;
          camera.y = target.y;
          velocity.x = 0;
          velocity.y = 0;
          requestLoop();
        }
      },
      detach: () => {
        isDetached = true;
        isIntro = false;
        gsap.killTweensOf(camera);
        if (rafId) cancelAnimationFrame(rafId);
        rafId = 0;
        obs.kill();
        resizeObserver.disconnect();
        surfaceEl.removeEventListener('pointermove', onPointerMoveHover);
        surfaceEl.removeEventListener('pointerleave', onPointerLeaveSurface);
        surfaceEl.removeEventListener('dragstart', preventDefault);
        surfaceEl.removeEventListener('pointerdown', onPointerDown);
        surfaceEl.removeEventListener('pointermove', onPointerMoveTouch);
        surfaceEl.removeEventListener('pointerup', onPointerUpTouch);
        surfaceEl.removeEventListener('pointercancel', onPointerUpTouch);
        touchMap.clear();
        delete surfaceEl.dataset.dragging;
        delete surfaceEl.dataset.pressed;
        clearActiveTiles();
        for (const tile of allPool) {
          tile.el.remove();
        }
        allPool = [];
        freePool.length = 0;
      },
    };

    return () => {
      cancelAnimationFrame(introFrame);
      canvasEngineRef.current?.detach();
      canvasEngineRef.current = null;
    };
  }, [mode, items, mergedConfig]);

  const handleZoom = (factor: number, event: React.MouseEvent<HTMLButtonElement>) => {
    zoomPulse(event.currentTarget);
    canvasEngineRef.current?.zoomBy(factor);
  };

  const handleReset = (event: React.MouseEvent<HTMLButtonElement>) => {
    zoomPulse(event.currentTarget);
    canvasEngineRef.current?.reset();
  };

  return (
    <section
      ref={sectionRef}
      className="CaseCanvas-module__BpNJTq__root"
      data-mode={mode}
      data-pending={isPending ? '' : undefined}
      aria-label="Our projects"
    >
      {/* 1. Frosted blur navigation scrim */}
      {mode !== 'list' && (
        <div className="CaseCanvas-module__BpNJTq__navScrim" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
      )}

      {/* 2. Canonical SEO / accessibility list */}
      <ul
        ref={listRef}
        className="CaseCanvas-module__BpNJTq__list"
        data-canonical=""
        onFocus={(e) => {
          if (mode !== 'canvas') return;
          const target = e.target as HTMLElement;
          const slug = target.closest<HTMLElement>('[data-case-slug]')?.dataset
            .caseSlug;
          if (slug) canvasEngineRef.current?.focusSlug(slug);
        }}
      >
        {items.map((project) => (
          <li
            key={project.slug}
            className="CaseCanvas-module__BpNJTq__listItem"
          >
            <CaseTile
              item={project}
              sizes={mode === 'list' ? '(max-width: 767px) 88vw, 380px' : '380px'}
            />
          </li>
        ))}
      </ul>

      {/* 3. Infinite interactive 2D canvas surface */}
      {mode === 'canvas' && (
        <div className="CaseCanvas-module__BpNJTq__surface" ref={surfaceRef}>
          <div
            className="CaseCanvas-module__BpNJTq__parallax"
            ref={parallaxRef}
            aria-hidden="true"
          >
            <div className="CaseCanvas-module__BpNJTq__camera" ref={cameraRef}>
              {/* Managed tile pool injected dynamically here */}
            </div>
          </div>
        </div>
      )}

      {/* 4. Controls: Slider mode vs Canvas mode */}
      {mode !== 'list' &&
        (mode === 'slider' ? (
          <CaseTickerSlider items={items}>
            <ViewModeGroup mode={mode} onChoose={setExplicitMode} />
          </CaseTickerSlider>
        ) : (
          <div className="CaseCanvas-module__BpNJTq__controls">
            <div
              className="CaseCanvas-module__BpNJTq__zoomGroup"
              role="group"
              aria-label="Zoom"
            >
              <button
                type="button"
                className="CaseCanvas-module__BpNJTq__control"
                onClick={(e) => handleZoom(0.8, e)}
                aria-label="Zoom out"
              >
                −
              </button>
              <button
                type="button"
                className="CaseCanvas-module__BpNJTq__control"
                onClick={handleReset}
                aria-label="Reset view"
              >
                ⌖
              </button>
              <button
                type="button"
                className="CaseCanvas-module__BpNJTq__control"
                onClick={(e) => handleZoom(1.25, e)}
                aria-label="Zoom in"
              >
                +
              </button>
            </div>
            <ViewModeGroup mode={mode} onChoose={setExplicitMode} />
          </div>
        ))}

      <p className="sr-only" aria-live="polite">
        {mode === 'canvas'
          ? 'Canvas view. Drag to explore, hold command and scroll to zoom.'
          : mode === 'slider'
          ? 'Slider view. Drag to browse, or step with the arrow keys.'
          : ''}
      </p>
    </section>
  );
}
