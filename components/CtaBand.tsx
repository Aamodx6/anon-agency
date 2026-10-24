'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

interface CtaBandProps {
  spacing?: 'home' | 'page';
}

const NEEDS = ['development', 'web design', 'branding'];
const REEL_COPIES = 7;
const REEL_MIDDLE_START = Math.floor(REEL_COPIES / 2) * NEEDS.length;

export function CtaBand({ spacing = 'home' }: CtaBandProps) {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [need, setNeed] = useState<string>('development');
  const [activeIndex, setActiveIndex] = useState(REEL_MIDDLE_START);
  const [isJumping, setIsJumping] = useState(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [triedSubmit, setTriedSubmit] = useState<boolean>(false);
  const activeIndexRef = useRef(activeIndex);
  const hoverBlockedUntilRef = useRef(0);
  const pointerMovedRef = useRef(true);
  const reelWindowRef = useRef<HTMLDivElement>(null);

  const isNameValid = name.trim().length > 0;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isValid = isNameValid && isEmailValid;

  const moveToIndex = (index: number) => {
    const nextIndex = Math.max(0, Math.min(REEL_COPIES * NEEDS.length - 1, index));
    activeIndexRef.current = nextIndex;
    hoverBlockedUntilRef.current = Date.now() + 100;
    setIsJumping(false);
    setActiveIndex(nextIndex);
    setNeed(NEEDS[nextIndex % NEEDS.length]);
  };

  const moveToNeed = (word: string) => {
    const currentIndex = activeIndexRef.current;
    const matchingIndexes = Array.from({ length: REEL_COPIES * NEEDS.length }, (_, index) => index)
      .filter(index => NEEDS[index % NEEDS.length] === word);
    const targetIndex = matchingIndexes.reduce((closest, index) =>
      Math.abs(index - currentIndex) < Math.abs(closest - currentIndex) ? index : closest
    );
    moveToIndex(targetIndex);
  };

  const handleReelTransitionEnd = (event: React.TransitionEvent<HTMLUListElement>) => {
    if (event.propertyName !== 'transform') return;

    const currentIndex = activeIndexRef.current;
    if (currentIndex > NEEDS.length && currentIndex < (REEL_COPIES - 2) * NEEDS.length) return;

    const normalizedIndex =
      REEL_MIDDLE_START + ((currentIndex % NEEDS.length) + NEEDS.length) % NEEDS.length;
    setIsJumping(true);
    activeIndexRef.current = normalizedIndex;
    setActiveIndex(normalizedIndex);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsJumping(false));
    });
  };

  const handleReelKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
    event.preventDefault();
    moveToIndex(activeIndexRef.current + (event.key === 'ArrowDown' ? 1 : -1));
  };

  useEffect(() => {
    const el = reelWindowRef.current;
    if (!el) return;

    let accumulatedDelta = 0;
    let resetTimer: ReturnType<typeof setTimeout> | undefined;
    let isThrottled = false;

    const onWheel = (e: WheelEvent) => {
      // Prevent browser default scroll and stop propagation so only the reel moves
      e.preventDefault();
      e.stopPropagation();

      accumulatedDelta += e.deltaY;

      if (resetTimer) clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        accumulatedDelta = 0;
      }, 200);

      const THRESHOLD = 30;
      if (Math.abs(accumulatedDelta) >= THRESHOLD && !isThrottled) {
        const direction = accumulatedDelta > 0 ? 1 : -1;
        moveToIndex(activeIndexRef.current + direction);
        accumulatedDelta = 0;
        isThrottled = true;
        setTimeout(() => {
          isThrottled = false;
        }, 120);
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });

    // Touch support for touch devices/tablets
    let touchStartY = 0;
    let touchMoved = false;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartY = e.touches[0].clientY;
        touchMoved = false;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const currentY = e.touches[0].clientY;
        const diff = touchStartY - currentY;
        if (Math.abs(diff) > 8) {
          e.preventDefault();
          e.stopPropagation();
          touchMoved = true;
        }
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (touchMoved && e.changedTouches.length === 1) {
        const currentY = e.changedTouches[0].clientY;
        const diff = touchStartY - currentY;
        if (Math.abs(diff) > 25) {
          moveToIndex(activeIndexRef.current + (diff > 0 ? 1 : -1));
        }
      }
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
      if (resetTimer) clearTimeout(resetTimer);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTriedSubmit(true);
    if (isValid) {
      const params = new URLSearchParams({ need });
      if (name.trim()) params.set('name', name.trim());
      if (email.trim()) params.set('email', email.trim());
      router.push(`/contacts?${params.toString()}`);
    }
  };

  const nextArrow = (
    <span
      className="SwapArrow-module__0B2EzW__swap CtaBand-module__4ELZEW__nextArrow"
      data-dir="right"
      aria-hidden="true"
    >
      <span className="SwapArrow-module__0B2EzW__a">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            d="M4 12h15m0 0-6.5-6.5M19 12l-6.5 6.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="SwapArrow-module__0B2EzW__b">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            d="M4 12h15m0 0-6.5-6.5M19 12l-6.5 6.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </span>
  );

  return (
    <section
      className={`CtaBand-module__4ELZEW__band CtaBand-module__4ELZEW__${spacing}`}
      data-step={step}
      data-node-id="1:378"
    >
      {/* STEP 1 */}
      <div className="CtaBand-module__4ELZEW__stepOne" inert={step !== 1}>
        <p className="CtaBand-module__4ELZEW__label" data-node-id="1:380" id="cta-band-label">
          I need
        </p>
        <div
          ref={reelWindowRef}
          className="CtaBand-module__4ELZEW__reelWindow"
          data-lenis-prevent=""
          data-lenis-prevent-wheel=""
          data-lenis-prevent-touch=""
        >
          <ul
            className="CtaBand-module__4ELZEW__reel"
            role="radiogroup"
            aria-labelledby="cta-band-label"
            aria-live="polite"
            tabIndex={0}
            onKeyDown={handleReelKeyDown}
            onTransitionEnd={handleReelTransitionEnd}
            style={
              {
                '--active-index': activeIndex,
                transition: isJumping ? 'none' : undefined,
              } as React.CSSProperties
            }
          >
            {/* Repetitions for visual reel flow */}
            {Array.from({ length: REEL_COPIES * NEEDS.length }).map((_, idx) => {
              const word = NEEDS[idx % NEEDS.length];
              return (
                <li
                  key={idx}
                  role="presentation"
                  className="CtaBand-module__4ELZEW__pillSlot"
                  aria-hidden={idx === activeIndex ? undefined : true}
                >
                  <button
                    type="button"
                    className="CtaBand-module__4ELZEW__pill"
                    data-word={word}
                    data-selected={idx === activeIndex ? '' : undefined}
                    tabIndex={idx === activeIndex ? 0 : -1}
                    role={idx === activeIndex ? 'radio' : undefined}
                    aria-checked={idx === activeIndex}
                    onMouseEnter={() => {
                      if (
                        pointerMovedRef.current &&
                        Date.now() >= hoverBlockedUntilRef.current
                      ) {
                        moveToNeed(word);
                      }
                      pointerMovedRef.current = false;
                    }}
                    onPointerMove={() => {
                      pointerMovedRef.current = true;
                    }}
                    onPointerDown={event => {
                      if (event.pointerType !== 'mouse') moveToNeed(word);
                    }}
                    onClick={() => moveToNeed(word)}
                  >
                    {word}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <button
          type="button"
          className="CtaBand-module__4ELZEW__next CtaBand-module__4ELZEW__nextOne"
          onClick={() => setStep(2)}
          data-arrow-host=""
        >
          next
          {nextArrow}
        </button>
      </div>

      {/* STEP 2 */}
      <form
        className="CtaBand-module__4ELZEW__stepTwo"
        inert={step !== 2}
        aria-label="Book a call"
        onSubmit={handleSubmit}
      >
        <p className="CtaBand-module__4ELZEW__recap">
          <span className="CtaBand-module__4ELZEW__recapLabel">I need</span>
          <button
            type="button"
            className="CtaBand-module__4ELZEW__recapPill"
            onClick={() => setStep(1)}
            aria-label={`Change service, currently ${need}`}
          >
            {need}
          </button>
        </p>
        <div className="CtaBand-module__4ELZEW__fields">
          <input
            className={`CtaBand-module__4ELZEW__field ${triedSubmit && !isNameValid ? 'CtaBand-module__4ELZEW__field-shake' : ''}`}
            type="text"
            autoComplete="name"
            placeholder="your name"
            aria-label="Your name"
            aria-invalid={triedSubmit && !isNameValid}
            data-invalid={triedSubmit && !isNameValid ? '' : undefined}
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            className={`CtaBand-module__4ELZEW__field ${triedSubmit && !isEmailValid ? 'CtaBand-module__4ELZEW__field-shake' : ''}`}
            type="email"
            autoComplete="email"
            placeholder="email"
            aria-label="Email"
            aria-invalid={triedSubmit && !isEmailValid}
            data-invalid={triedSubmit && !isEmailValid ? '' : undefined}
            enterKeyHint="go"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button type="submit" className="sr-only">
            Continue
          </button>
          <button
            type="submit"
            className="CtaBand-module__4ELZEW__next"
            data-arrow-host=""
          >
            next
            {nextArrow}
          </button>
        </div>
      </form>
    </section>
  );
}
