'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollRibbon } from '@/components/ScrollRibbon';
import { SERVICES } from '@/data/services';

gsap.registerPlugin(ScrollTrigger);

const ROTATIONS = [-2.4, -1.1, 0.4, 2.1, 3.8];
const STACK_SERVICES = SERVICES;
const CARD_BACKGROUNDS = ['var(--c-white)', '#f1f1f3', '#e8e9eb', '#dbdcde'];

export function ServicesStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = itemsRef.current.filter(Boolean) as HTMLLIElement[];
    if (items.length < 2) return;
    if (items.length !== STACK_SERVICES.length) {
      throw new Error('The services stack cards are out of sync with their rendered services.');
    }

    const cards = items
      .map((it) => it.querySelector<HTMLElement>('.ServicesStack-module__QW-zbq__card'))
      .filter(Boolean) as HTMLElement[];

    const mm = gsap.matchMedia();

    mm.add('(min-width: 0px)', () => {
      const cardCount = STACK_SERVICES.length;
      const holdPerCard = 0.6;
      const totalScroll = window.innerHeight * holdPerCard * cardCount;

      // Card 0 begins landed at y: 0
      gsap.set(cards[0], { y: 0, rotation: ROTATIONS[0], opacity: 1 });

      // Cards 1..N start below view in the section
      cards.slice(1).forEach((card) => {
        gsap.set(card, {
          y: window.innerHeight * 0.7,
          rotation: 0,
          opacity: 1,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top+=20px',
          end: `+=${totalScroll}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // Cards rise up sequentially to land on the stack
      cards.slice(1).forEach((card, idx) => {
        const targetRot = ROTATIONS[(idx + 1) % ROTATIONS.length];
        const cardStartTime = (idx + 1) * 1.4;

        tl.to(
          card,
          {
            y: 0,
            rotation: targetRot,
            duration: 1,
            ease: 'power2.out',
          },
          cardStartTime
        )
          .to(
            card,
            {
              scaleX: 1.015,
              scaleY: 0.985,
              duration: 0.1,
              ease: 'power1.out',
            },
            cardStartTime + 0.95
          )
          .to(
            card,
            {
              scaleX: 1,
              scaleY: 1,
              duration: 0.2,
              ease: 'power2.out',
            },
            cardStartTime + 1.12
          );
      });

      tl.to({}, { duration: 0.4 });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="ServicesStack-module__QW-zbq__section"
      id="services"
      data-node-id="1:132"
    >
      <h2 className="ServicesStack-module__QW-zbq__word" data-node-id="1:397">
        Services
      </h2>
      <ul className="ServicesStack-module__QW-zbq__list">
        {STACK_SERVICES.map((service, idx) => (
          <li
            key={service.slug}
            ref={(el) => {
              itemsRef.current[idx] = el;
            }}
            className="ServicesStack-module__QW-zbq__item"
            style={{ zIndex: idx + 1, pointerEvents: 'none' }}
          >
            <article
              className="ServicesStack-module__QW-zbq__card"
              style={{
                pointerEvents: 'auto',
                ...(idx >= 4 ? { backgroundColor: CARD_BACKGROUNDS[idx % CARD_BACKGROUNDS.length] } : {}),
              }}
            >
              <ScrollRibbon figure={service.number} />
              <span className="ServicesStack-module__QW-zbq__number">
                {service.number}
              </span>
              <h3 className="ServicesStack-module__QW-zbq__cardTitle">
                {service.title}
              </h3>
              <p className="ServicesStack-module__QW-zbq__cardBody">
                {service.summary}
              </p>
              <Link
                className="ServicesStack-module__QW-zbq__cardButton"
                data-page-label={service.title}
                href={`/services/${service.slug}`}
              >
                more information
                <span className="sr-only"> about {service.title}</span>
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
