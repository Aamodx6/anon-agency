import gsap from 'gsap';
import { EASE, DURATIONS, prefersReducedMotion } from './tokens';

export interface ArchiveAnimationOptions {
  cards: HTMLElement[];
  scribbleSvg?: SVGElement | null;
}

export const DECK_TIERS = [
  { y: 0, scale: 1.0, blur: 0, opacity: 1.0 },
  { y: -70, scale: 0.88, blur: 4, opacity: 0.45 },
  { y: -120, scale: 0.78, blur: 7, opacity: 0.24 },
  { y: -155, scale: 0.68, blur: 9, opacity: 0.12 },
];

export function initArchiveAnimation({
  cards,
  scribbleSvg,
}: ArchiveAnimationOptions): { kill: () => void } {
  if (typeof window === 'undefined' || cards.length === 0) {
    return { kill: () => {} };
  }

  if (prefersReducedMotion()) {
    cards.forEach((c) => {
      c.style.opacity = '1';
      c.style.transform = 'none';
      c.style.filter = 'none';
    });
    return { kill: () => {} };
  }

  function applyTiers(activeIndex: number) {
    cards.forEach((card, idx) => {
      const distance = (idx - activeIndex + cards.length) % cards.length;
      const tierIndex = Math.min(distance, DECK_TIERS.length - 1);
      const tier = DECK_TIERS[tierIndex];

      gsap.to(card, {
        y: tier.y,
        scale: tier.scale,
        opacity: tier.opacity,
        filter: `blur(${tier.blur}px)`,
        duration: DURATIONS.archiveTierTransition,
        ease: 'power4.out',
        overwrite: 'auto',
      });
    });
  }

  // Initial layout
  applyTiers(0);

  const cleanups: (() => void)[] = [];

  cards.forEach((card, idx) => {
    const onEnter = () => applyTiers(idx);
    card.addEventListener('pointerenter', onEnter);
    cleanups.push(() => card.removeEventListener('pointerenter', onEnter));
  });

  // Continuous scribble loop
  let scribbleAnim: Animation | null = null;
  if (scribbleSvg) {
    const path = scribbleSvg.querySelector<SVGPathElement>('path');
    if (path) {
      const len = path.getTotalLength?.() || 1000;
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });

      const tl = gsap.timeline({ repeat: -1 });
      tl.to(path, {
        strokeDashoffset: 0,
        duration: DURATIONS.archiveScribbleDraw,
        ease: 'power2.inOut',
      })
        .to({}, { duration: 1.4 })
        .to(path, {
          strokeDashoffset: -len,
          duration: DURATIONS.archiveScribbleErase,
          ease: 'power2.inOut',
        });
      cleanups.push(() => tl.kill());
    }
  }

  return {
    kill: () => {
      cleanups.forEach((fn) => fn());
      cards.forEach((c) => gsap.killTweensOf(c));
    },
  };
}
