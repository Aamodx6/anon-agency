import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EASE, prefersReducedMotion } from './tokens';

export interface FooterAnimationOptions {
  container: HTMLElement;
  magneticEls?: HTMLElement[];
}

export function initFooterAnimation({
  container,
  magneticEls = [],
}: FooterAnimationOptions): { kill: () => void } {
  if (typeof window === 'undefined' || !container) {
    return { kill: () => {} };
  }

  gsap.registerPlugin(ScrollTrigger);

  if (prefersReducedMotion()) {
    container.style.opacity = '1';
    container.style.transform = 'none';
    return { kill: () => {} };
  }

  const ctx = gsap.context(() => {
    // 1. Reveal on scroll
    gsap.fromTo(
      container,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: EASE.out,
        scrollTrigger: {
          trigger: container,
          start: 'top 92%',
          toggleActions: 'play none none none',
        },
      }
    );

    // 2. Magnetic buttons / links
    magneticEls.forEach((el) => {
      const onMove = (e: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = (e.clientX - centerX) * 0.35;
        const dy = (e.clientY - centerY) * 0.35;

        gsap.to(el, {
          x: dx,
          y: dy,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      };

      const onLeave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.4)',
          overwrite: 'auto',
        });
      };

      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerleave', onLeave);
    });
  }, container);

  return {
    kill: () => ctx.revert(),
  };
}
