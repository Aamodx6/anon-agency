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

  chars.forEach((char) => {
    gsap.set(char, { xPercent: 0, opacity: 1 });
  });
  if (ruleEl) gsap.set(ruleEl, { scaleX: 1, transformOrigin: '0% 50%' });
  metaEls.forEach((meta) => gsap.set(meta, { opacity: 1, y: 0 }));
  if (kickerEl) gsap.set(kickerEl, { opacity: 1, y: 0 });

  const swapInstance = attachLetterSwap(headingEl, chars);
  onLettersSettled?.();

  return {
    kill: () => {
      swapInstance.detach();
      chars.forEach((char) => gsap.killTweensOf(char));
    },
    swapInstance,
  };
}
