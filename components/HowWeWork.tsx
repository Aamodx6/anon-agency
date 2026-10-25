'use client';

import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollRibbon } from '@/components/ScrollRibbon';
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
    body: '30 free minutes to scope your goals, system architecture, and timeline.',
  },
  {
    number: '02',
    title: 'Architecture & Design',
    body: 'System blueprints, wireframes, data flows, and interactive prototypes.',
  },
  {
    number: '03',
    title: 'Build & Integration',
    body: 'Production code, API integrations, agent pipelines, test coverage, and responsive polish.',
  },
  {
    number: '04',
    title: 'Launch & Scaling',
    body: 'Go-live, cloud configuration, CI/CD, team handover, and ongoing monitoring.',
  },
];

// Fanned coordinates calibrated so all 4 cards overlap and stay comfortably inside the container boundaries
const CARD_TIERS = [
  { rotate: -4.82, xPercent: -86, y: 22, zIndex: 1 },
  { rotate: -0.7, xPercent: -28, y: 0, zIndex: 4 },
  { rotate: 2.8, xPercent: 28, y: 26, zIndex: 3 },
  { rotate: 6.2, xPercent: 86, y: 14, zIndex: 2 },
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

    // Desktop: Smooth fan out from center stack as section enters view
    mm.add('(min-width: 1024px)', () => {
      // Calculate responsive scaling so cards never overflow on any viewport
      const containerW = section.clientWidth || 1200;
      const cardW = cards[0]?.offsetWidth || 250;
      const totalSpan = cardW * 2.72; // span from -86% to +86%
      const maxAvailable = containerW - 120;
      const scaleFactor = Math.min(1, maxAvailable / Math.max(totalSpan, 1));

      // Initial state: cards start in neat center stack
      cards.forEach((card, idx) => {
        gsap.set(card, {
          xPercent: 0,
          y: idx === 1 ? 0 : 32,
          rotate: 0,
          opacity: idx === 1 ? 1 : 0.2,
          scale: 0.94,
        });
        if (items[idx]) {
          items[idx].style.zIndex = String(CARD_TIERS[idx]?.zIndex || idx + 1);
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          end: 'top 20%',
          scrub: 0.7,
          invalidateOnRefresh: true,
        },
      });

      // Fan out cards into their exact resting positions inside the container
      cards.forEach((card, idx) => {
        const tier = CARD_TIERS[idx % CARD_TIERS.length];
        tl.to(
          card,
          {
            xPercent: tier.xPercent * scaleFactor,
            y: tier.y,
            rotate: tier.rotate,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power2.out',
          },
          idx * 0.15
        );
      });

      // Interactive hover lift
      const cleanups: (() => void)[] = [];
      cards.forEach((card, idx) => {
        const item = items[idx];
        const tier = CARD_TIERS[idx % CARD_TIERS.length];

        const onEnter = () => {
          gsap.to(card, {
            y: tier.y - 16,
            scale: 1.03,
            rotate: tier.rotate * 0.75,
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto',
          });
          if (item) item.style.zIndex = '90';
        };

        const onLeave = () => {
          gsap.to(card, {
            y: tier.y,
            scale: 1,
            rotate: tier.rotate,
            boxShadow: 'none',
            duration: 0.35,
            ease: 'power2.out',
            overwrite: 'auto',
          });
          if (item) item.style.zIndex = String(tier.zIndex);
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

    // Tablet & Mobile
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
        {steps.map((step, index) => (
          <li
            key={step.number}
            className="HowWeWork-module__kq1Iga__item"
            ref={(el) => {
              itemsRef.current[index] = el;
            }}
          >
            <div className="HowWeWork-module__kq1Iga__dragLayer">
              <div
                className="HowWeWork-module__kq1Iga__card"
                data-stack-card=""
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
              >
                <ScrollRibbon
                  stage={['brief', 'sketch', 'build', 'launch'][index % 4]}
                />
                <span className="HowWeWork-module__kq1Iga__number">{step.number}</span>
                <div className="HowWeWork-module__kq1Iga__end">
                  <h3 className="HowWeWork-module__kq1Iga__title">{step.title}</h3>
                  <p className="HowWeWork-module__kq1Iga__body">{step.body}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
