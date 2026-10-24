'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ServiceDiagram } from '@/components/ServiceDiagram';

gsap.registerPlugin(ScrollTrigger);

const SERVICES_DATA = [
  {
    slug: 'webflow-development',
    number: '01',
    figure: '01',
    title: 'Webflow development',
    summary:
      'Begin Webflow development with our Project Discovery session, aligning our team with your goals, timeline, and required functionalities. We prioritize understanding your content strategy, feature needs, and desired user experiences.',
  },
  {
    slug: 'ux-ui-design',
    number: '02',
    figure: '02',
    title: 'UX/UI design',
    summary:
      "Join our UX/UI Design Workshop to kickstart your design journey. We'll analyze user experiences, pinpoint issues, and create a strategic vision for an engaging interface that aligns with business goals and user needs.",
  },
  {
    slug: 'branding',
    number: '03',
    figure: '03',
    title: 'Branding',
    summary:
      'By partnering with us for your branding needs, you receive a step-by-step, personalized experience that results in a compelling and memorable brand identity, ready to make its mark in your industry and beyond.',
  },
  {
    slug: 'webflow-maintains-support',
    number: '04',
    figure: '04',
    title: 'Webflow maintenance & support',
    summary:
      'In the last phase, Webflow Site Launch & Training, we make your site live and provide comprehensive training. This includes a CMS walkthrough, content management best practices, and tips for ongoing maintenance.',
  },
];

const ROTATIONS = [-2.2, -0.35, 1.75, 3.6];

export function ServicesStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = itemsRef.current.filter(Boolean) as HTMLLIElement[];
    if (items.length < 2) return;

    const cards = items
      .map((it) => it.querySelector<HTMLElement>('.ServicesStack-module__QW-zbq__card'))
      .filter(Boolean) as HTMLElement[];

    const mm = gsap.matchMedia();

    mm.add('(min-width: 0px)', () => {
      const cardCount = items.length;
      const holdPerCard = 0.6;
      const totalScroll = window.innerHeight * holdPerCard * cardCount;

      // Card 0 begins landed at y: 0, rotate: -2.2deg
      gsap.set(cards[0], { y: 0, rotation: ROTATIONS[0], opacity: 1 });

      // Cards 1-3 start below view in the section
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

      // Cards 1-3 rise up sequentially to land on the stack
      cards.slice(1).forEach((card, idx) => {
        const targetRot = ROTATIONS[idx + 1];
        const cardStartTime = (idx + 1) * 0.85;

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
              duration: 1.0,
              ease: 'elastic.out(1, 0.3)',
            },
            cardStartTime + 1.05
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
        {SERVICES_DATA.map((service, idx) => (
          <li
            key={service.slug}
            ref={(el) => {
              itemsRef.current[idx] = el;
            }}
            className="ServicesStack-module__QW-zbq__item"
          >
            <article
              className={`ServicesStack-module__QW-zbq__card ServicesStack-module__QW-zbq__card--${service.figure}`}
            >
              <ServiceDiagram figure={service.figure} />
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
