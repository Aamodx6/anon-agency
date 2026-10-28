'use client';

import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ARCH_RIBBONS } from '@/data/howWeWorkRibbons';
import { registerGsap, prefersReducedMotion } from '@/src/animations/tokens';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ProcessStep {
  number: string;
  title: string;
  body: string;
}

export interface HowWeWorkProps {
  steps?: ProcessStep[];
  heading?: string;
}

const DEFAULT_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discovery call',
    body: '30 free minutes to scope your goals and timeline.',
  },
  {
    number: '02',
    title: 'Design',
    body: 'Concepts, wireframes and a design that tells your story.',
  },
  {
    number: '03',
    title: 'Build',
    body: 'Build, integrations, and testing for the workflows your business depends on.',
  },
  {
    number: '04',
    title: 'Launch',
    body: 'Go-live, training and support when you need it.',
  },
];

// Exact Awake card transform tiers calibrated with natural sequential overlap (1 -> 2 -> 3 -> 4)
const CARD_CONFIG = [
  {
    number: '01',
    xPercent: -126,
    y: 28,
    rotate: -4.82,
    zIndex: 1,
    overshootX: -129.5,
    overshootY: 34,
    overshootRot: -5.9,
    reboundX: -125.2,
    reboundY: 25,
    reboundRot: -4.1,
  },
  {
    number: '02',
    xPercent: -42,
    y: 0,
    rotate: -0.7,
    zIndex: 2,
    overshootX: -43.2,
    overshootY: 4,
    overshootRot: -1.8,
    reboundX: -41.7,
    reboundY: -2,
    reboundRot: 0.1,
  },
  {
    number: '03',
    xPercent: 42,
    y: 44,
    rotate: 3.78,
    zIndex: 3,
    overshootX: 43.3,
    overshootY: 49,
    overshootRot: 4.85,
    reboundX: 41.7,
    reboundY: 41,
    reboundRot: 3.1,
  },
  {
    number: '04',
    xPercent: 126,
    y: 16,
    rotate: 7.83,
    zIndex: 4,
    overshootX: 129.5,
    overshootY: 21,
    overshootRot: 9.4,
    reboundX: 125.2,
    reboundY: 13,
    reboundRot: 6.9,
  },
];

export function HowWeWork({ steps = DEFAULT_STEPS, heading = 'How we work' }: HowWeWorkProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    registerGsap();
    if (prefersReducedMotion()) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLElement[];
    const items = itemsRef.current.filter(Boolean) as HTMLElement[];
    if (cards.length < 2) return;

    // Insert exact vector ribbon directly into card (matching Awake DOM structure)
    cards.forEach((card, idx) => {
      if (!card.querySelector('.ScrollRibbon-module__wSfOTW__svg')) {
        const svgStr = ARCH_RIBBONS[idx % ARCH_RIBBONS.length];
        if (svgStr) {
          card.insertAdjacentHTML('afterbegin', svgStr);
        }
      }
    });

    const mm = gsap.matchMedia();

    // Desktop: Pin section and sequentially deal cards out from center stack
    mm.add('(min-width: 1024px)', () => {
      // 1. Initial State:
      // Cards start waiting in the center deck at translate(0%, 26%)
      // All cards are permanently white; while scrolling they only fade in (no color switching).
      gsap.set(cards[0], {
        x: 0,
        xPercent: 0,
        y: 0,
        yPercent: 26,
        rotate: 0,
        scale: 1,
        opacity: 0.04,
        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.08)',
        pointerEvents: 'none',
      });
      items[0]?.removeAttribute('data-landed');
      if (items[0]) items[0].style.zIndex = String(CARD_CONFIG[0].zIndex);

      for (let i = 1; i < cards.length; i++) {
        gsap.set(cards[i], {
          x: 0,
          xPercent: 0,
          y: 0,
          yPercent: 26,
          rotate: 0,
          scale: 1,
          opacity: 0.001,
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.08)',
          pointerEvents: 'none',
        });
        items[i]?.removeAttribute('data-landed');
        if (items[i]) items[i].style.zIndex = String(CARD_CONFIG[i].zIndex);
      }

      // 2. Step-by-Step Deck Dealing Timeline with Rising, Fading, Glowing & Wobble at the end
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          start: 'top top',
          end: '+=2400',
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;

            // Landing & interactive pointer activation triggers
            if (items[0] && cards[0]) {
              if (p > 0.18) {
                items[0].setAttribute('data-landed', '');
                cards[0].style.pointerEvents = 'auto';
              } else {
                items[0].removeAttribute('data-landed');
                cards[0].style.pointerEvents = 'none';
              }
            }

            if (items[1] && cards[1]) {
              if (p > 0.43) {
                items[1].setAttribute('data-landed', '');
                cards[1].style.pointerEvents = 'auto';
              } else {
                items[1].removeAttribute('data-landed');
                cards[1].style.pointerEvents = 'none';
              }
            }

            if (items[2] && cards[2]) {
              if (p > 0.68) {
                items[2].setAttribute('data-landed', '');
                cards[2].style.pointerEvents = 'auto';
              } else {
                items[2].removeAttribute('data-landed');
                cards[2].style.pointerEvents = 'none';
              }
            }

            if (items[3] && cards[3]) {
              if (p > 0.91) {
                items[3].setAttribute('data-landed', '');
                cards[3].style.pointerEvents = 'auto';
              } else {
                items[3].removeAttribute('data-landed');
                cards[3].style.pointerEvents = 'none';
              }
            }
          },
        },
      });

      // Helper to add rising + fading + glowing + end-wobble sequence for each card
      const addCardDeal = (cardIndex: number, startTime: number) => {
        const card = cards[cardIndex];
        const cfg = CARD_CONFIG[cardIndex];
        if (!card || !cfg) return;

        // Phase 1: Pull out, Rise up (26% -> 0%), Fade in (0 -> 1), and Glow
        tl.to(
          card,
          {
            xPercent: cfg.overshootX,
            x: 0,
            yPercent: 0,
            y: cfg.overshootY,
            rotate: cfg.overshootRot,
            opacity: 1,
            boxShadow: '0 0 32px rgba(255, 255, 255, 0.35), 0 24px 50px rgba(0, 0, 0, 0.35)',
            duration: 0.72,
            ease: 'power2.out',
          },
          startTime
        );

        // Phase 2: Wobble Rebound (overshoots angle slightly then rebounds)
        tl.to(
          card,
          {
            xPercent: cfg.reboundX,
            y: cfg.reboundY,
            rotate: cfg.reboundRot,
            boxShadow: '0 0 16px rgba(255, 255, 255, 0.18), 0 18px 40px rgba(0, 0, 0, 0.28)',
            duration: 0.14,
            ease: 'sine.inOut',
          },
          startTime + 0.72
        );

        // Phase 3: Settle cleanly into exact target resting position
        tl.to(
          card,
          {
            xPercent: cfg.xPercent,
            yPercent: 0,
            y: cfg.y,
            rotate: cfg.rotate,
            boxShadow: '0 14px 34px rgba(0, 0, 0, 0.22)',
            duration: 0.14,
            ease: 'power1.out',
          },
          startTime + 0.86
        );
      };

      // Card 01 deals out (0.05 -> 1.05)
      addCardDeal(0, 0.05);

      // Card 02 deals out (1.10 -> 2.10)
      addCardDeal(1, 1.10);

      // Card 03 deals out (2.15 -> 3.15)
      addCardDeal(2, 2.15);

      // Card 04 deals out (3.20 -> 4.20)
      addCardDeal(3, 3.20);

      // Settling pause at end of pinned range
      tl.to({}, { duration: 0.40 });

      // Interactive hover lift for landed cards
      const cleanups: (() => void)[] = [];
      cards.forEach((card, idx) => {
        const item = items[idx];
        const cfg = CARD_CONFIG[idx % CARD_CONFIG.length];

        const onEnter = () => {
          if (!item?.hasAttribute('data-landed')) return;
          gsap.to(card, {
            y: cfg.y - 18,
            scale: 1.03,
            rotate: cfg.rotate * 0.75,
            boxShadow: '0 0 30px rgba(255, 255, 255, 0.3), 0 24px 48px rgba(0, 0, 0, 0.45)',
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto',
          });
          if (item) item.style.zIndex = '90';
        };

        const onLeave = () => {
          if (!item?.hasAttribute('data-landed')) return;
          gsap.to(card, {
            y: cfg.y,
            scale: 1,
            rotate: cfg.rotate,
            boxShadow: '0 14px 34px rgba(0, 0, 0, 0.22)',
            duration: 0.35,
            ease: 'power2.out',
            overwrite: 'auto',
          });
          if (item) item.style.zIndex = String(cfg.zIndex);
        };

        card.addEventListener('mouseenter', onEnter);
        card.addEventListener('mouseleave', onLeave);
        cleanups.push(() => {
          card.removeEventListener('mouseenter', onEnter);
          card.removeEventListener('mouseleave', onLeave);
        });
      });

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        cleanups.forEach((c) => c());
        cards.forEach((card) => gsap.set(card, { clearProps: 'all' }));
        items.forEach((item) => {
          item?.removeAttribute('data-landed');
          if (item) item.style.zIndex = '';
        });
      };
    });

    // Tablet & Mobile: sequential entrance without pinning
    mm.add('(max-width: 1023px)', () => {
      items.forEach((item) => item?.setAttribute('data-landed', ''));
      cards.forEach((card, idx) => {
        const dir = idx % 2 === 0 ? -1 : 1;
        gsap.fromTo(
          card,
          {
            xPercent: 16 * dir,
            rotate: 2 * dir,
            autoAlpha: 0,
          },
          {
            xPercent: 0,
            rotate: 0,
            autoAlpha: 1,
            duration: 0.75,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              once: true,
            },
          }
        );
      });

      return () => {
        cards.forEach((card) => gsap.set(card, { clearProps: 'all' }));
        items.forEach((item) => item?.removeAttribute('data-landed'));
      };
    });

    return () => {
      mm.revert();
    };
  }, [steps]);

  return (
    <section
      ref={sectionRef}
      className="HowWeWork-module__kq1Iga__section"
      data-node-id="43:276"
    >
      <h2 className="HowWeWork-module__kq1Iga__heading">{heading}</h2>
      <ol className="HowWeWork-module__kq1Iga__list">
        {steps.map((step, index) => {
          const cfg = CARD_CONFIG[index % CARD_CONFIG.length];
          return (
            <li
              key={step.number}
              className="HowWeWork-module__kq1Iga__item"
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              style={{
                pointerEvents: 'none',
                zIndex: cfg.zIndex,
              }}
            >
              <div
                className="HowWeWork-module__kq1Iga__dragLayer"
                style={{
                  translate: 'none',
                  rotate: 'none',
                  scale: 'none',
                  touchAction: 'none',
                  cursor: 'grab',
                  userSelect: 'none',
                }}
              >
                <div
                  className="HowWeWork-module__kq1Iga__card"
                  data-stack-card=""
                  data-index={index}
                  ref={(el) => {
                    cardsRef.current[index] = el;
                  }}
                  style={{
                    translate: 'none',
                    rotate: 'none',
                    scale: 'none',
                    touchAction: 'none',
                    pointerEvents: 'none',
                  }}
                >
                  <span
                    className="HowWeWork-module__kq1Iga__number"
                    style={{ touchAction: 'none' }}
                  >
                    {step.number}
                  </span>
                  <div
                    className="HowWeWork-module__kq1Iga__end"
                    style={{ touchAction: 'none' }}
                  >
                    <h3
                      className="HowWeWork-module__kq1Iga__title"
                      style={{ touchAction: 'none' }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="HowWeWork-module__kq1Iga__body"
                      style={{ touchAction: 'none' }}
                    >
                      {step.body}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
