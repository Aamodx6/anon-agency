'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CaseThread } from './CaseThread';
import { GooeyThumb } from './GooeyThumb';

gsap.registerPlugin(ScrollTrigger);

const FEATURED_CASES = [
  {
    slug: 'mihailove',
    title: 'Mihailove',
    discipline: 'E-commerce & Web design',
    baseImg:
      'https://cdn.sanity.io/images/pka0c0l0/production/9395fccaf2a0f50ac5e1f478ebd1be397ddb5268-1440x1698.png',
    hoverImg:
      'https://cdn.sanity.io/images/pka0c0l0/production/bc147e801b9e7a8d05883063a695fb6d9894fc8e-2400x1306.png',
    x: '8.8889vw',
    y: '0vw',
    parallax: 14,
  },
  {
    slug: 'solvo',
    title: 'Solvo',
    discipline: 'Development',
    baseImg:
      'https://cdn.sanity.io/images/pka0c0l0/production/7f9817871110af85ee68826e2c402c8534b4cc03-1440x1698.png',
    hoverImg:
      'https://cdn.sanity.io/images/pka0c0l0/production/1c4e3567e9d6a865cd5e7cb5fc65379abc00acd5-2400x1306.png',
    x: '66.1806vw',
    y: '23.9583vw',
    parallax: -10,
  },
  {
    slug: 'better-sleep',
    title: 'Better Sleep',
    discipline: 'Development',
    baseImg:
      'https://cdn.sanity.io/images/pka0c0l0/production/87e8346123497a9f82637a7833215286d9ee76ca-1440x1698.png',
    hoverImg:
      'https://cdn.sanity.io/images/pka0c0l0/production/ff95573ee16b49298dfcefd5bf3ee79bf39db7cb-2400x1306.png',
    x: '15.3472vw',
    y: '56.3194vw',
    parallax: 20,
  },
  {
    slug: 'manypixels',
    title: 'Manypixels',
    discipline: 'Development',
    baseImg:
      'https://cdn.sanity.io/images/pka0c0l0/production/04113e313c0ebc1682f6f4faea123ecf5fbe183c-1440x1698.png',
    hoverImg:
      'https://cdn.sanity.io/images/pka0c0l0/production/b2ca12534f311df90e3d2319c5c2fc93297a7d45-2400x1306.png',
    x: '57.0833vw',
    y: '85.9028vw',
    parallax: -16,
  },
];

export function CaseGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = itemsRef.current.filter(Boolean) as HTMLLIElement[];
    if (!items.length) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      items.forEach((item, idx) => {
        const p = FEATURED_CASES[idx]?.parallax || 0;
        gsap.fromTo(
          item,
          { yPercent: p },
          {
            yPercent: -p,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="CaseGrid-module__tbWBJq__section"
      id="projects"
      data-node-id="1:135"
    >
      <h2 className="CaseGrid-module__tbWBJq__heading">Our projects</h2>
      <div className="CaseGrid-module__tbWBJq__stage">
        <CaseThread />

        <ul
          className="CaseGrid-module__tbWBJq__grid"
          style={{ ['--stage-h' as any]: '121.4583vw' }}
        >
          {FEATURED_CASES.map((item, idx) => (
            <li
              key={item.slug}
              ref={(el) => {
                itemsRef.current[idx] = el;
              }}
              className="CaseGrid-module__tbWBJq__item"
              style={{
                ['--x' as any]: item.x,
                ['--y' as any]: item.y,
              }}
            >
              <Link
                className="CaseCard-module__WCHEYG__card"
                data-page-label={item.title}
                data-case-flip=""
                data-flip-src={item.hoverImg}
                href={`/projects/${item.slug}`}
              >
                <span className="CaseCard-module__WCHEYG__thumb">
                  <GooeyThumb
                    alt={`${item.title}, ${item.discipline}`}
                    src={item.baseImg}
                    hoverSrc={item.hoverImg}
                  />
                </span>
                <span className="CaseCard-module__WCHEYG__meta">
                  <span className="CaseCard-module__WCHEYG__title">
                    {item.title}
                  </span>
                  <span
                    className="CaseCard-module__WCHEYG__dot"
                    aria-hidden="true"
                  />
                  <span className="CaseCard-module__WCHEYG__discipline">
                    {item.discipline}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
