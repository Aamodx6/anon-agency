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
    body: 'Webflow build with animations, CMS and responsive polish.',
  },
  {
    number: '04',
    title: 'Launch',
    body: 'Go-live, training and support when you need it.',
  },
];

// Exact Awake card transform tiers calibrated to fit within container boundaries
const CARD_CONFIG = [
  {
    number: '01',
    xPercent: -126,
    y: 28,
    rotate: -4.82,
    zIndex: 1,
  },
  {
    number: '02',
    xPercent: -42,
    y: 0,
    rotate: -0.7,
    zIndex: 4,
  },
  {
    number: '03',
    xPercent: 42,
    y: 44,
    rotate: 3.78,
    zIndex: 3,
  },
  {
    number: '04',
    xPercent: 126,
    y: 16,
    rotate: 7.83,
    zIndex: 2,
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

    const mm = gsap.matchMedia();

    // Desktop: Pin section and sequentially deal cards out from center stack
    mm.add('(min-width: 1024px)', () => {
      // 1. Initial State:
      // Card 01 starts in center deck (unlanded dark state)
      gsap.set(cards[0], {
        x: 0,
        xPercent: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        autoAlpha: 1,
      });
      if (items[0]) {
        items[0].style.zIndex = '10';
        items[0].removeAttribute('data-landed');
      }

      // Cards 02, 03, 04 wait in the center stack
      for (let i = 1; i < cards.length; i++) {
        gsap.set(cards[i], {
          x: 0,
          xPercent: 0,
          y: 0,
          rotate: 0,
          scale: 1,
          autoAlpha: 0,
        });
        if (items[i]) {
          items[i].style.zIndex = '5';
          items[i].removeAttribute('data-landed');
        }
      }

      // 2. Step-by-Step Deck Dealing Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          start: 'top top',
          end: '+=2200',
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;

            // Step 1: Card 01 dealing
            if (items[0]) {
              if (p > 0.05) {
                items[0].setAttribute('data-landed', '');
                items[0].style.zIndex = '1';
              } else {
                items[0].removeAttribute('data-landed');
                items[0].style.zIndex = '10';
              }
            }

            // Step 2: Card 02 in deck -> dealt
            if (items[1] && cards[1]) {
              if (p < 0.08) {
                cards[1].style.opacity = '0';
                cards[1].style.visibility = 'hidden';
              } else if (p < 0.35) {
                cards[1].style.opacity = '1';
                cards[1].style.visibility = 'visible';
                items[1].removeAttribute('data-landed');
                items[1].style.zIndex = '10';
              } else {
                cards[1].style.opacity = '1';
                cards[1].style.visibility = 'visible';
                items[1].setAttribute('data-landed', '');
                items[1].style.zIndex = '4';
              }
            }

            // Step 3: Card 03 in deck -> dealt
            if (items[2] && cards[2]) {
              if (p < 0.33) {
                cards[2].style.opacity = '0';
                cards[2].style.visibility = 'hidden';
              } else if (p < 0.60) {
                cards[2].style.opacity = '1';
                cards[2].style.visibility = 'visible';
                items[2].removeAttribute('data-landed');
                items[2].style.zIndex = '10';
              } else {
                cards[2].style.opacity = '1';
                cards[2].style.visibility = 'visible';
                items[2].setAttribute('data-landed', '');
                items[2].style.zIndex = '3';
              }
            }

            // Step 4: Card 04 in deck -> dealt
            if (items[3] && cards[3]) {
              if (p < 0.58) {
                cards[3].style.opacity = '0';
                cards[3].style.visibility = 'hidden';
              } else if (p < 0.85) {
                cards[3].style.opacity = '1';
                cards[3].style.visibility = 'visible';
                items[3].removeAttribute('data-landed');
                items[3].style.zIndex = '10';
              } else {
                cards[3].style.opacity = '1';
                cards[3].style.visibility = 'visible';
                items[3].setAttribute('data-landed', '');
                items[3].style.zIndex = '2';
              }
            }
          },
        },
      });

      // Segment 1: Card 01 deals out to the left (-126%, y: 28, rot: -4.82)
      tl.to(cards[1], { autoAlpha: 1, duration: 0.15 }, 0.08);
      tl.to(
        cards[0],
        {
          xPercent: CARD_CONFIG[0].xPercent,
          x: 0,
          y: CARD_CONFIG[0].y,
          rotate: CARD_CONFIG[0].rotate,
          duration: 0.85,
          ease: 'power1.inOut',
        },
        0.05
      );

      // Segment 2: Card 02 deals out to -42% (y: 0, rot: -0.7)
      tl.to(cards[2], { autoAlpha: 1, duration: 0.15 }, 1.08);
      tl.to(
        cards[1],
        {
          xPercent: CARD_CONFIG[1].xPercent,
          x: 0,
          y: CARD_CONFIG[1].y,
          rotate: CARD_CONFIG[1].rotate,
          duration: 0.85,
          ease: 'power1.inOut',
        },
        1.05
      );

      // Segment 3: Card 03 deals out to +42% (y: 44, rot: 3.78)
      tl.to(cards[3], { autoAlpha: 1, duration: 0.15 }, 2.08);
      tl.to(
        cards[2],
        {
          xPercent: CARD_CONFIG[2].xPercent,
          x: 0,
          y: CARD_CONFIG[2].y,
          rotate: CARD_CONFIG[2].rotate,
          duration: 0.85,
          ease: 'power1.inOut',
        },
        2.05
      );

      // Segment 4: Card 04 deals out to +126% (y: 16, rot: 7.83)
      tl.to(
        cards[3],
        {
          xPercent: CARD_CONFIG[3].xPercent,
          x: 0,
          y: CARD_CONFIG[3].y,
          rotate: CARD_CONFIG[3].rotate,
          duration: 0.85,
          ease: 'power1.inOut',
        },
        3.05
      );

      // Settling pause at end of pinned range
      tl.to({}, { duration: 0.35 });

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
            boxShadow: '0 24px 48px rgba(0, 0, 0, 0.45)',
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
            boxShadow: 'none',
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
                    pointerEvents: 'auto',
                    touchAction: 'none',
                  }}
                >
                  <div
                    className="HowWeWork-module__kq1Iga__ribbonHost"
                    dangerouslySetInnerHTML={{
                      __html: ARCH_RIBBONS[index % ARCH_RIBBONS.length] || '',
                    }}
                  />
                  <span className="HowWeWork-module__kq1Iga__number">{step.number}</span>
                  <div className="HowWeWork-module__kq1Iga__end">
                    <h3 className="HowWeWork-module__kq1Iga__title">{step.title}</h3>
                    <p className="HowWeWork-module__kq1Iga__body">{step.body}</p>
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
