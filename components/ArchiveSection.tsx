'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { BandScribble } from './BandScribble';

const ARCHIVE_ITEMS = [
  {
    title: 'Rally',
    slug: 'rally',
    discipline: 'Development',
    year: '2024',
    image:
      'https://cdn.sanity.io/images/pka0c0l0/production/114029f7089fbdd7a27bb8f42e0aed568ad5a8ba-1440x1698.png',
  },
  {
    title: 'Rhinestone',
    slug: 'rhinestone',
    discipline: 'Development',
    year: '2024',
    image:
      'https://cdn.sanity.io/images/pka0c0l0/production/3054ee77e7a9f1d81a5c0ec55f51ff7c6e77e8a2-1440x1698.png',
  },
  {
    title: 'Ezra',
    slug: 'ezra',
    discipline: 'Development',
    year: '2024',
    image:
      'https://cdn.sanity.io/images/pka0c0l0/production/835f207df3063191fc45abf54a20d4947ae0c9ae-1440x1698.png',
  },
];

const DECK_TIERS = [
  { y: 0, scale: 1, blur: 0, opacity: 1 },
  { y: -70, scale: 0.88, blur: 4, opacity: 0.45 },
  { y: -120, scale: 0.78, blur: 7, opacity: 0.24 },
  { y: -155, scale: 0.68, blur: 9, opacity: 0.12 },
];

export function ArchiveSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const deckRef = useRef<(HTMLDivElement | null)[]>([]);
  const rowsRef = useRef<(HTMLLIElement | null)[]>([]);

  const handleRowEnter = (index: number) => {
    setActiveIndex(index);

    // Dim non-hovered rows
    rowsRef.current.forEach((row, rIdx) => {
      if (!row) return;
      const isActive = rIdx === index;
      gsap.to(row, {
        opacity: isActive ? 1 : 0.28,
        duration: 0.2,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    });

    // Update 3D card deck
    deckRef.current.forEach((card, cIdx) => {
      if (!card) return;
      const tierIndex = (cIdx - index + ARCHIVE_ITEMS.length) % ARCHIVE_ITEMS.length;
      const tier = DECK_TIERS[tierIndex] || { y: -180, scale: 0.6, blur: 9, opacity: 0 };

      gsap.to(card, {
        y: tier.y,
        scale: tier.scale,
        opacity: tier.opacity,
        filter: `blur(${tier.blur}px)`,
        zIndex: ARCHIVE_ITEMS.length - tierIndex,
        duration: 0.35,
        ease: 'power4.out',
        overwrite: 'auto',
      });
    });
  };

  const handleRowLeave = () => {
    setActiveIndex(null);

    // Reset rows opacity
    rowsRef.current.forEach((row) => {
      if (!row) return;
      gsap.to(row, {
        opacity: 1,
        duration: 0.22,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    });

    // Hide deck cards
    deckRef.current.forEach((card) => {
      if (!card) return;
      gsap.to(card, {
        opacity: 0,
        filter: 'blur(9px)',
        duration: 0.38,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    });
  };

  return (
    <section className="Archive-module__t718NW__section" data-node-id="41:164">
      <div className="Archive-module__t718NW__panel">
        <BandScribble tone="pink" className="Archive-module__t718NW__scribble" />

        <div className="Archive-module__t718NW__deck" aria-hidden="true">
          {ARCHIVE_ITEMS.map((item, idx) => (
            <div
              key={item.slug}
              ref={(el) => {
                deckRef.current[idx] = el;
              }}
              className="Archive-module__t718NW__layer"
              style={{
                opacity: idx === 0 ? 1 : 0,
                transform: `translateY(${DECK_TIERS[idx]?.y ?? -180}px) scale(${DECK_TIERS[idx]?.scale ?? 0.6})`,
                filter: `blur(${DECK_TIERS[idx]?.blur ?? 9}px)`,
                transition: 'opacity 0.2s ease',
              }}
            >
              <img
                alt=""
                loading="lazy"
                width={270}
                height={330}
                className="Archive-module__t718NW__layerImage"
                src={item.image}
              />
            </div>
          ))}
        </div>

        <ul
          className="Archive-module__t718NW__rows"
          onMouseLeave={handleRowLeave}
        >
          {ARCHIVE_ITEMS.map((item, idx) => (
            <li
              key={item.slug}
              ref={(el) => {
                rowsRef.current[idx] = el;
              }}
              className="Archive-module__t718NW__row"
              data-active={activeIndex === idx ? 'true' : 'false'}
              onMouseEnter={() => handleRowEnter(idx)}
            >
              <Link
                className="Archive-module__t718NW__rowInner"
                data-page-label={item.title}
                data-case-flip=""
                href={`/projects/${item.slug}`}
              >
                <img
                  alt=""
                  loading="lazy"
                  width={270}
                  height={330}
                  className="Archive-module__t718NW__rowThumb"
                  src={item.image}
                />
                <span className="Archive-module__t718NW__title">{item.title}</span>
                <span className="Archive-module__t718NW__meta">
                  <span className="Archive-module__t718NW__discipline">
                    {item.discipline}
                  </span>
                  <span className="Archive-module__t718NW__dot" aria-hidden="true" />
                  <span className="Archive-module__t718NW__year">{item.year}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="Archive-module__t718NW__more">
          <Link
            className="Archive-module__t718NW__viewAll"
            data-page-label="Projects"
            data-arrow-host=""
            href="/projects"
          >
            View all
            <span
              className="SwapArrow-module__0B2EzW__swap"
              data-dir="up-right"
              style={{ width: '14px', height: '14px' }}
              aria-hidden="true"
            >
              <span className="SwapArrow-module__0B2EzW__a">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                  <g
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17 17 7" />
                    <path d="M8 7h9v9" />
                  </g>
                </svg>
              </span>
              <span className="SwapArrow-module__0B2EzW__b">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                  <g
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17 17 7" />
                    <path d="M8 7h9v9" />
                  </g>
                </svg>
              </span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
