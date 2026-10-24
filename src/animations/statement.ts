import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EASE, DURATIONS, prefersReducedMotion } from './tokens';

export interface StatementAnimationOptions {
  container: HTMLElement;
  lines: HTMLElement[];
  ribbonSvg?: SVGElement | null;
}

/**
 * Statement section 3D barrel roll and CAD blueprint animation.
 * Pinned ScrollTrigger timeline with 2008px scroll height and 0.8s scrub.
 */
export function initStatementAnimation({
  container,
  lines,
  ribbonSvg,
}: StatementAnimationOptions): { kill: () => void } {
  if (typeof window === 'undefined' || !container || lines.length === 0) {
    return { kill: () => {} };
  }

  gsap.registerPlugin(ScrollTrigger);

  if (prefersReducedMotion()) {
    lines.forEach((l, i) => {
      l.style.opacity = i === 0 ? '1' : '0';
      l.style.transform = 'none';
    });
    return { kill: () => {} };
  }

  const ctx = gsap.context(() => {
    // 1. Initial 3D cylinder setup
    lines.forEach((line, index) => {
      gsap.set(line, {
        transformStyle: 'preserve-3d',
        transformOrigin: '50% 50% -620px',
        rotationY: index === 0 ? 0 : 105,
        opacity: index === 0 ? 1 : 0,
      });
    });

    // 2. Main Pinned Scroll Timeline
    const tl = gsap.timeline({
      defaults: {
        ease: 'power2.inOut',
        duration: DURATIONS.statementLine,
      },
      scrollTrigger: {
        trigger: container,
        start: 'center center',
        end: () => `+=2008`,
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
      },
    });

    // Animate lines sequentially
    lines.forEach((currentLine, i) => {
      if (i > 0) {
        const prevLine = lines[i - 1];
        const stepTime = i === 1 ? 0.6 : '+=0.6';

        tl.to(
          prevLine,
          {
            rotationY: -105,
            opacity: 0,
            duration: DURATIONS.statementLine,
          },
          stepTime
        ).to(
          currentLine,
          {
            rotationY: 0,
            opacity: 1,
            duration: DURATIONS.statementLine,
          },
          '<'
        );
      }
    });

    tl.to({}, { duration: DURATIONS.statementLineHold });

    // 3. Background CAD Ribbon Path Animation
    if (ribbonSvg) {
      const paths = ribbonSvg.querySelectorAll<SVGPathElement>('path[data-ribbon-path]');
      const handles = ribbonSvg.querySelectorAll<SVGElement>('[data-ribbon-handle]');

      paths.forEach((p) => {
        const len = p.getTotalLength?.() || 1000;
        gsap.set(p, {
          strokeDasharray: len,
          strokeDashoffset: len,
        });

        tl.to(
          p,
          {
            strokeDashoffset: 0,
            ease: 'none',
          },
          0
        );
      });

      if (handles.length > 0) {
        gsap.set(handles, { scale: 0, transformOrigin: 'center center' });
        tl.to(
          handles,
          {
            scale: 1,
            stagger: 0.1,
            ease: 'back.out(1.5)',
          },
          0.2
        );
      }
    }
  }, container);

  return {
    kill: () => ctx.revert(),
  };
}
