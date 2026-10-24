import gsap from 'gsap';
import { EASE, DURATIONS, prefersReducedMotion } from './tokens';

export interface HeroTextOptions {
  headingEl: HTMLElement | null;
  ruleEl?: HTMLElement | null;
  metaEls?: HTMLElement[];
  kickerEl?: HTMLElement | null;
  onLettersSettled?: () => void;
}

export interface LetterSwapInstance {
  detach: () => void;
}

/**
 * Exact magnetic letter swap behavior from Awake Agency:
 * - Detects horizontal cursor velocity direction: dir = clientX > prevClientX ? 1 : -1
 * - Exits in travel direction: xPercent: 100 * dir (0.18s power2.in)
 * - Teleports opposite: xPercent: -100 * dir
 * - Returns with elastic settle: xPercent: 0 (0.5s elastic.out(1, 0.55))
 */
export function attachLetterSwap(
  container: HTMLElement,
  chars: HTMLElement[]
): LetterSwapInstance {
  const charMap = new Map<HTMLElement, HTMLElement>();
  chars.forEach((ch) => {
    const parent = (ch.parentElement ?? ch) as HTMLElement;
    parent.dataset.swapChar = '';
    charMap.set(parent, ch);
  });

  let prevClientX: number | null = null;
  let dir = 1;
  let activeChar: HTMLElement | null = null;

  const handlePointerMove = (e: PointerEvent) => {
    if (e.pointerType === 'touch') return;
    if (prevClientX !== null && e.clientX !== prevClientX) {
      dir = e.clientX > prevClientX ? 1 : -1;
    }
    prevClientX = e.clientX;

    const hit = document.elementFromPoint(e.clientX, e.clientY);
    const parentSlot = hit?.closest('[data-swap-char]') as HTMLElement | null;
    const targetChar = parentSlot ? charMap.get(parentSlot) ?? null : null;

    if (!targetChar || targetChar === activeChar) {
      activeChar = targetChar;
      return;
    }

    activeChar = targetChar;
    gsap.killTweensOf(targetChar);
    gsap.timeline()
      .to(targetChar, {
        xPercent: 100 * dir,
        duration: DURATIONS.letterSwapExit,
        ease: 'power2.in',
      })
      .set(targetChar, {
        xPercent: -100 * dir,
      })
      .to(targetChar, {
        xPercent: 0,
        duration: DURATIONS.letterSwapReturn,
        ease: EASE.landing,
      });
  };

  const handlePointerLeave = () => {
    activeChar = null;
    prevClientX = null;
  };

  container.addEventListener('pointermove', handlePointerMove);
  container.addEventListener('pointerleave', handlePointerLeave);

  return {
    detach() {
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
      chars.forEach((ch) => {
        gsap.killTweensOf(ch);
        gsap.set(ch, { xPercent: 0 });
      });
      charMap.forEach((_, key) => delete key.dataset.swapChar);
      charMap.clear();
    },
  };
}

/**
 * Hero heading entrance animation matching Awake Agency.
 * Characters staggered with alternating random +/-100% horizontal transforms
 * Elastic landing ease with random 0.4s total stagger.
 */
export function initHeroText({
  headingEl,
  ruleEl,
  metaEls = [],
  kickerEl,
  onLettersSettled,
}: HeroTextOptions): { kill: () => void; swapInstance?: LetterSwapInstance } {
  if (!headingEl) {
    onLettersSettled?.();
    return { kill: () => {} };
  }

  const chars = Array.from(headingEl.querySelectorAll<HTMLElement>('[data-split-char]'));

  if (prefersReducedMotion()) {
    chars.forEach((c) => {
      c.style.transform = 'none';
      c.style.opacity = '1';
    });
    if (ruleEl) ruleEl.style.transform = 'none';
    metaEls.forEach((m) => {
      m.style.opacity = '1';
      m.style.transform = 'none';
    });
    if (kickerEl) {
      kickerEl.style.opacity = '1';
      kickerEl.style.transform = 'none';
    }
    const swap = attachLetterSwap(headingEl, chars);
    onLettersSettled?.();
    return { kill: () => swap.detach(), swapInstance: swap };
  }

  let swapInstance: LetterSwapInstance | undefined;

  const ctx = gsap.context(() => {
    // Initial states
    chars.forEach((c) => {
      const startX = Math.random() > 0.5 ? -100 : 100;
      gsap.set(c, { xPercent: startX, opacity: 0 });
    });

    if (ruleEl) gsap.set(ruleEl, { scaleX: 0, transformOrigin: '0% 50%' });
    if (metaEls.length > 0) gsap.set(metaEls, { opacity: 0, y: 12 });
    if (kickerEl) gsap.set(kickerEl, { opacity: 0, y: 12 });

    const tl = gsap.timeline({
      delay: 0.1,
      onComplete: () => {
        swapInstance = attachLetterSwap(headingEl, chars);
        onLettersSettled?.();
      },
    });

    // Rule line draws out
    if (ruleEl) {
      tl.to(ruleEl, {
        scaleX: 1,
        duration: DURATIONS.heroRule,
        ease: EASE.out,
      }, 0);
    }

    // Letters enter with elastic landing
    tl.to(chars, {
      xPercent: 0,
      opacity: 1,
      duration: DURATIONS.heroLetters,
      ease: EASE.landing,
      stagger: {
        amount: 0.4,
        from: 'random',
      },
    }, 0.25);

    // Supporting metadata & kicker
    if (metaEls.length > 0) {
      tl.to(metaEls, {
        opacity: 1,
        y: 0,
        duration: DURATIONS.heroMeta,
        stagger: 0.06,
        ease: 'power2.out',
      }, 0.5);
    }

    if (kickerEl) {
      tl.to(kickerEl, {
        opacity: 1,
        y: 0,
        duration: DURATIONS.heroMeta,
        ease: 'power2.out',
      }, 0.55);
    }
  });

  return {
    kill: () => {
      swapInstance?.detach();
      ctx.revert();
    },
    swapInstance,
  };
}
