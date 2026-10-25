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

const CARD_TIERS = [
  { rotate: -4.82, xPercent: -126, y: 28 },
  { rotate: -0.7, xPercent: -42, y: 0 },
  { rotate: 3.78, xPercent: 42, y: 44 },
  { rotate: 7.83, xPercent: 126, y: 16 },
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

    // Desktop: Pin and smoothly fan out cards as user scrolls through the section
    mm.add('(min-width: 1024px)', () => {
      // 1. Initial gathered state in center stack
      cards.forEach((card, idx) => {
        gsap.set(card, {
          xPercent: 0,
          y: idx === 0 ? 0 : 36,
          rotate: 0,
          opacity: idx === 0 ? 1 : 0,
          scale: idx === 0 ? 1 : 0.94,
        });
        if (items[idx]) {
          items[idx].style.zIndex = String(idx + 1);
        }
      });

      const holdPerCard = 0.45;
      const totalScroll = window.innerHeight * holdPerCard * cards.length;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top+=20px',
          end: `+=${totalScroll}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 2. Sequential fan out
      cards.forEach((card, idx) => {
        const tier = CARD_TIERS[idx % CARD_TIERS.length];
        tl.to(
          card,
          {
            xPercent: tier.xPercent,
            y: tier.y,
            rotate: tier.rotate,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power2.out',
          },
          idx * 0.45
        );
      });

      // 3. Interactive hover reaction once fanned
      const cleanups: (() => void)[] = [];
      cards.forEach((card, idx) => {
        const item = items[idx];
        const tier = CARD_TIERS[idx % CARD_TIERS.length];

        const onEnter = () => {
          gsap.to(card, {
            y: tier.y - 18,
            scale: 1.03,
            rotate: tier.rotate * 0.7,
            boxShadow: '0 24px 48px rgba(0, 0, 0, 0.45)',
            duration: 0.35,
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
            duration: 0.4,
            ease: 'power2.out',
            overwrite: 'auto',
          });
          if (item) item.style.zIndex = String(idx + 1);
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

    // Tablet & Mobile: sequential rise on scroll
    mm.add('(max-width: 1023px)', () => {
      cards.forEach((card, idx) => {
        const dir = idx % 2 === 0 ? -1 : 1;
        gsap.fromTo(
          card,
          {
            xPercent: 18 * dir,
            rotate: 2 * dir,
            autoAlpha: 0,
          },
          {
            xPercent: 0,
            rotate: 0,
            autoAlpha: 1,
            duration: 0.85,
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
