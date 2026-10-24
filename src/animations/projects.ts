import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EASE, prefersReducedMotion } from './tokens';

export interface ProjectsAnimationOptions {
  container: HTMLElement;
  cards: HTMLElement[];
  threadSvg?: SVGElement | null;
}

export function initProjectsAnimation({
  container,
  cards,
  threadSvg,
}: ProjectsAnimationOptions): { kill: () => void } {
  if (typeof window === 'undefined' || !container || cards.length === 0) {
    return { kill: () => {} };
  }

  gsap.registerPlugin(ScrollTrigger);

  if (prefersReducedMotion()) {
    cards.forEach((c) => {
      c.style.opacity = '1';
      c.style.transform = 'none';
    });
    return { kill: () => {} };
  }

  const ctx = gsap.context(() => {
    // 1. Staggered card entrance on scroll
    cards.forEach((card, idx) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: EASE.out,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // 2. Case thread SVG guide wire drawing
    if (threadSvg) {
      const paths = threadSvg.querySelectorAll<SVGPathElement>('path');
      paths.forEach((path) => {
        const len = path.getTotalLength?.() || 1200;
        gsap.set(path, {
          strokeDasharray: len,
          strokeDashoffset: len,
        });

        gsap.to(path, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            end: 'bottom 40%',
            scrub: 0.8,
          },
        });
      });
    }
  }, container);

  return {
    kill: () => ctx.revert(),
  };
}
