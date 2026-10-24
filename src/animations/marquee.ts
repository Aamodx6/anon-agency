import gsap from 'gsap';
import { prefersReducedMotion } from './tokens';

export interface MarqueeAnimationOptions {
  trackEl: HTMLElement;
  words?: HTMLElement[];
}

export function initMarqueeAnimation({
  trackEl,
  words = [],
}: MarqueeAnimationOptions): { kill: () => void } {
  if (typeof window === 'undefined' || !trackEl) {
    return { kill: () => {} };
  }

  if (prefersReducedMotion()) {
    return { kill: () => {} };
  }

  let baseSpeed = 1.0;
  let currentSpeed = 1.0;

  const tl = gsap.to(trackEl, {
    xPercent: -50,
    duration: 18,
    ease: 'none',
    repeat: -1,
  });

  let lastScrollY = window.scrollY;
  const onScroll = () => {
    const deltaY = Math.abs(window.scrollY - lastScrollY);
    lastScrollY = window.scrollY;
    currentSpeed = Math.min(4.0, 1.0 + deltaY * 0.05);
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  const tickerCb = () => {
    currentSpeed += (baseSpeed - currentSpeed) * 0.06;
    tl.timeScale(currentSpeed);
  };

  gsap.ticker.add(tickerCb);

  return {
    kill: () => {
      window.removeEventListener('scroll', onScroll);
      gsap.ticker.remove(tickerCb);
      tl.kill();
    },
  };
}
