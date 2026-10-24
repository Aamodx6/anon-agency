import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EASE, DURATIONS, prefersReducedMotion } from './tokens';

export interface ServicesAnimationOptions {
  container: HTMLElement;
  cards: HTMLElement[];
}

export function initServicesAnimation({
  container,
  cards,
}: ServicesAnimationOptions): { kill: () => void } {
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

  const CARD_ANGLES = [-2.2, -0.35, 1.75, 3.6];

  const ctx = gsap.context(() => {
    // 1. Initial Card Angles
    cards.forEach((card, idx) => {
      const angle = CARD_ANGLES[idx % CARD_ANGLES.length];
      if (idx === 0) {
        gsap.set(card, { rotation: angle, y: 0, opacity: 1 });
      } else {
        gsap.set(card, { rotation: angle, yPercent: 120, opacity: 0 });
      }
    });

    // 2. Pinned Stacking Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=3020`,
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
      },
    });

    cards.forEach((card, i) => {
      if (i > 0) {
        const angle = CARD_ANGLES[i % CARD_ANGLES.length];
        tl.to(
          card,
          {
            yPercent: 0,
            opacity: 1,
            rotation: angle,
            duration: 1.0,
            ease: 'power2.out',
            onStart: () => {
              // Landing squash trigger
              gsap.timeline()
                .to(card, {
                  scaleX: 1.018,
                  scaleY: 0.982,
                  duration: DURATIONS.servicesLandingSquashCompress,
                  ease: 'power1.out',
                })
                .to(card, {
                  scaleX: 1.0,
                  scaleY: 1.0,
                  duration: DURATIONS.servicesLandingSquashRebound,
                  ease: EASE.squash,
                });
            },
          },
          `+=0.3`
        );
      }
    });

    tl.to({}, { duration: 0.5 });
  }, container);

  return {
    kill: () => ctx.revert(),
  };
}
