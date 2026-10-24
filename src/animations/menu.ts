import gsap from 'gsap';
import { EASE, DURATIONS, prefersReducedMotion } from './tokens';

export interface MenuAnimationOptions {
  overlayEl: HTMLElement;
  navLinks?: HTMLElement[];
  ribbonSvg?: SVGElement | null;
  isOpen: boolean;
  onClosed?: () => void;
}

export function animateMenuOverlay({
  overlayEl,
  navLinks = [],
  ribbonSvg,
  isOpen,
  onClosed,
}: MenuAnimationOptions): { kill: () => void } {
  if (typeof window === 'undefined' || !overlayEl) {
    return { kill: () => {} };
  }

  if (prefersReducedMotion()) {
    overlayEl.style.display = isOpen ? 'block' : 'none';
    overlayEl.style.opacity = isOpen ? '1' : '0';
    if (!isOpen) onClosed?.();
    return { kill: () => {} };
  }

  const ctx = gsap.context(() => {
    if (isOpen) {
      overlayEl.style.display = 'block';
      gsap.fromTo(
        overlayEl,
        { clipPath: 'inset(0% 0% 100% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: DURATIONS.menuCurtain,
          ease: EASE.inOut,
        }
      );

      if (navLinks.length > 0) {
        gsap.fromTo(
          navLinks,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: DURATIONS.menuNavStagger,
            ease: EASE.out,
            delay: 0.2,
          }
        );
      }

      if (ribbonSvg) {
        const path = ribbonSvg.querySelector<SVGPathElement>('path');
        if (path) {
          const len = path.getTotalLength?.() || 1000;
          gsap.fromTo(
            path,
            { strokeDasharray: len, strokeDashoffset: len },
            {
              strokeDashoffset: 0,
              duration: 1.2,
              ease: 'power2.out',
              delay: 0.25,
            }
          );
        }
      }
    } else {
      gsap.to(overlayEl, {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: 0.5,
        ease: EASE.inOut,
        onComplete: () => {
          overlayEl.style.display = 'none';
          onClosed?.();
        },
      });
    }
  });

  return {
    kill: () => ctx.revert(),
  };
}
