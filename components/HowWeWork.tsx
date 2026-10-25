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
    bg: '#fafafa',
    zIndex: 1,
  },
  {
    number: '02',
    xPercent: -42,
    y: 0,
    rotate: -0.7,
    bg: '#f1f1f3',
    zIndex: 4,
  },
  {
    number: '03',
    xPercent: 42,
    y: 44,
    rotate: 3.78,
    bg: '#e8e9eb',
    zIndex: 3,
  },
  {
    number: '04',
    xPercent: 126,
    y: 16,
    rotate: 7.83,
    bg: '#dbdcde',
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

    // Desktop: Pin section and smoothly fan out cards as user scrolls through the 1600px range
    mm.add('(min-width: 1024px)', () => {
      // Initial state: cards start in neat center stack
      cards.forEach((card, idx) => {
        const cfg = CARD_CONFIG[idx % CARD_CONFIG.length];
        gsap.set(card, {
          xPercent: 0,
          y: idx === 1 ? 0 : 32,
          rotate: 0,
          opacity: 1,
          scale: 0.96,
        });
        if (items[idx]) {
          items[idx].style.zIndex = String(cfg?.zIndex || idx + 1);
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          start: 'top top',
          end: '+=1600',
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            cards.forEach((_, idx) => {
              const threshold = 0.2 + idx * 0.18;
              if (self.progress >= threshold) {
                items[idx]?.setAttribute('data-landed', '');
              } else {
                items[idx]?.removeAttribute('data-landed');
              }
            });
          },
        },
      });

      // Fan out cards sequentially into their resting positions
      cards.forEach((card, idx) => {
        const cfg = CARD_CONFIG[idx % CARD_CONFIG.length];
        tl.to(
          card,
          {
            xPercent: cfg.xPercent,
            y: cfg.y,
            rotate: cfg.rotate,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power2.out',
          },
          idx * 0.22
        );
      });

      // Interactive hover lift
      const cleanups: (() => void)[] = [];
      cards.forEach((card, idx) => {
        const item = items[idx];
        const cfg = CARD_CONFIG[idx % CARD_CONFIG.length];

        const onEnter = () => {
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
                  ref={(el) => {
                    cardsRef.current[index] = el;
                  }}
                  style={{
                    backgroundColor: cfg.bg,
                    pointerEvents: 'auto',
                    touchAction: 'none',
                    opacity: 1,
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
