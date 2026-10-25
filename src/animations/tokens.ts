import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

let registered = false;
export function registerGsap(): void {
  if (typeof window === 'undefined' || registered) return;
  try {
    gsap.registerPlugin(CustomEase);
    CustomEase.create('panelFill', '0.45, 0, 0.2, 1');
  } catch (e) {
    // fallback
  }
  registered = true;
}

/**
 * Exact motion design tokens reverse-engineered from Awake Agency.
 * Reference: awakeagency.dev
 */
export const EASE = {
  out: "expo.out",
  inOut: "expo.inOut",
  swap: "power4.out",
  landing: "elastic.out(1, 0.55)",
  landingSoft: "elastic.out(0.6, 0.8)",
  land: "power3.out",
  panel: "panelFill",
  squash: "elastic.out(1, 0.3)",
} as const;

export const DURATIONS = {
  preloaderCounter: 0.7,
  preloaderFade: 0.18,
  preloaderMorph: 0.55,
  heroLetters: 0.6,
  heroRule: 0.85,
  heroMeta: 0.45,
  letterSwapExit: 0.18,
  letterSwapReturn: 0.5,
  statementLine: 1.0,
  statementLineHold: 0.6,
  servicesLandingSquashCompress: 0.1,
  servicesLandingSquashRebound: 1.0,
  archiveTierTransition: 0.34,
  archiveScribbleDraw: 2.6,
  archiveScribbleErase: 1.9,
  menuCurtain: 0.65,
  menuNavStagger: 0.08,
} as const;

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function clampDPR(maxDpr = 2): number {
  if (typeof window === 'undefined') return 1;
  return Math.min(maxDpr, window.devicePixelRatio || 1);
}
