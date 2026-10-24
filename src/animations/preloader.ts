import gsap from 'gsap';
import { EASE, DURATIONS, prefersReducedMotion } from './tokens';

export interface PreloaderOptions {
  loaderEl: HTMLElement | null;
  counterEl: HTMLElement | null;
  heroContainer: HTMLElement | null;
  onComplete?: () => void;
}

/**
 * Exact Preloader motion sequence reverse-engineered from Awake Agency.
 * 0.7s linear counter (0% -> 100%)
 * 0.18s counter fade out (expo.out)
 * 0.55s card morph into hero container dimensions (power3.out, 32px border radius)
 */
export function initPreloader({
  loaderEl,
  counterEl,
  heroContainer,
  onComplete,
}: PreloaderOptions): { kill: () => void } {
  if (!loaderEl) {
    onComplete?.();
    return { kill: () => {} };
  }

  if (prefersReducedMotion()) {
    loaderEl.style.display = 'none';
    loaderEl.style.opacity = '0';
    loaderEl.style.visibility = 'hidden';
    onComplete?.();
    return { kill: () => {} };
  }

  const ctx = gsap.context(() => {
    const counterObj = { n: 0 };
    const tl = gsap.timeline({
      paused: false,
      onComplete: () => {
        loaderEl.style.visibility = 'hidden';
        loaderEl.style.opacity = '0';
        onComplete?.();
      },
    });

    if (counterEl) {
      tl.to(counterObj, {
        n: 100,
        duration: DURATIONS.preloaderCounter,
        ease: 'none',
        onUpdate: () => {
          counterEl.textContent = `${Math.round(counterObj.n)}%`;
        },
      }, 0);

      tl.to(counterEl, {
        opacity: 0,
        duration: DURATIONS.preloaderFade,
        ease: EASE.out,
      }, DURATIONS.preloaderCounter);
    }

    const flipTime = DURATIONS.preloaderCounter + DURATIONS.preloaderFade;
    tl.addLabel('flip', flipTime);

    tl.to(loaderEl, {
      borderRadius: () => (heroContainer ? getComputedStyle(heroContainer).borderTopLeftRadius : '32px'),
      top: () => (heroContainer ? heroContainer.getBoundingClientRect().top : 20),
      left: () => (heroContainer ? heroContainer.getBoundingClientRect().left : 20),
      width: () => (heroContainer ? heroContainer.getBoundingClientRect().width : window.innerWidth - 40),
      height: () => (heroContainer ? heroContainer.getBoundingClientRect().height : window.innerHeight - 40),
      duration: DURATIONS.preloaderMorph,
      ease: EASE.land,
    }, 'flip');

    tl.to(loaderEl, {
      opacity: 0,
      duration: 0.12,
      ease: 'power2.out',
    }, `flip+=${DURATIONS.preloaderMorph - 0.05}`);
  });

  return {
    kill: () => ctx.revert(),
  };
}
