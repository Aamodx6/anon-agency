'use client';

import React, { useRef, useCallback, useLayoutEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { registerGsap, prefersReducedMotion } from '@/src/animations/tokens';
import { BandScribble, loopAround } from './BandScribble';

const ARCHIVE_ITEMS = [
  {
    title: 'Condor',
    slug: 'condor',
    discipline: 'Development',
    year: '2026',
    image:
      'https://cdn.sanity.io/images/pka0c0l0/production/114029f7089fbdd7a27bb8f42e0aed568ad5a8ba-1440x1698.png',
  },
  {
    title: 'Cortland',
    slug: 'cortland',
    discipline: 'Web & mobile development',
    year: '2026',
    image:
      'https://cdn.sanity.io/images/pka0c0l0/production/3054ee77e7a9f1d81a5c0ec55f51ff7c6e77e8a2-1440x1698.png',
  },
  {
    title: 'Rally',
    slug: 'rally',
    discipline: 'Development',
    year: '2025',
    image:
      'https://cdn.sanity.io/images/pka0c0l0/production/6cec671fef0e3ac55488a47d41fc9557f1c6c440-1440x1698.png',
  },
  {
    title: 'Rhinestone',
    slug: 'rhinestone',
    discipline: 'Development',
    year: '2025',
    image:
      'https://cdn.sanity.io/images/pka0c0l0/production/e1f0eba1798bfa4991abfc62cb00c9ebc88e8982-1440x1698.png',
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

const HIDDEN_TIER = { y: -180, scale: 0.6, blur: 9, opacity: 0 };

function archiveRoute(panel: HTMLElement) {
  const panelRect = panel.getBoundingClientRect();
  const width = panel.clientWidth;
  const height = panel.clientHeight;
  const strokeWidth = Math.min(40, Math.max(16, (2.2 * window.innerWidth) / 100));

  const rows = [...panel.querySelectorAll<HTMLLIElement>('li')].map((el) => {
    const r = el.getBoundingClientRect();
    return {
      x: r.left - panelRect.left,
      y: r.top - panelRect.top,
      w: r.width,
      h: r.height,
    };
  });

  const viewAllLink = panel.querySelector<HTMLAnchorElement>("a[href='/projects']")?.getBoundingClientRect();
  const points: { x: number; y: number }[] = [];
  const isVertical = rows.length > 1 && Math.abs(rows[1].y - rows[0].y) > 4;

  if (isVertical) {
    const firstRow = rows[0];
    points.push({
      x: width + 2 * strokeWidth,
      y: Math.max(0, firstRow.y - 0.2 * firstRow.h),
    });
    points.push({
      x: 0.78 * width,
      y: firstRow.y + 0.15 * firstRow.h,
    });
    rows.forEach((row, idx) => {
      points.push({
        x: width * (idx % 2 ? 0.66 : 0.52),
        y: row.y + 0.5 * row.h,
      });
    });
  } else {
    points.push({ x: width + 2 * strokeWidth, y: 0.2 * height });
    points.push({ x: 0.6 * width, y: 0.35 * height });
  }

  if (viewAllLink) {
    const cx = viewAllLink.left - panelRect.left + viewAllLink.width / 2;
    const cy = viewAllLink.top - panelRect.top + viewAllLink.height / 2;
    const lastRow = rows[rows.length - 1];
    if (isVertical && lastRow) {
      points.push({ x: 0.36 * width, y: lastRow.y + 1.25 * lastRow.h });
    }
    const rx = Math.min(viewAllLink.width / 2 + 1.8 * strokeWidth, cx - 0.9 * strokeWidth);
    const ry = viewAllLink.height / 2 + 1.5 * strokeWidth;
    const lastPoint = points[points.length - 1];
    const startAngle = Math.atan2(lastPoint.y - cy, lastPoint.x - cx);
    points.push(...loopAround(cx + 0.4 * strokeWidth, cy, rx, ry, startAngle, -1));
  }

  return points;
}

export function ArchiveSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<(HTMLLIElement | null)[]>([]);
  const deckRef = useRef<(HTMLDivElement | null)[]>([]);
  const historyRef = useRef<number[]>([]);
  const isHoveredRef = useRef(false);
  const isDesktopRef = useRef(false);
  const reducedMotionRef = useRef(false);

  const updateDeck = useCallback(() => {
    deckRef.current.forEach((card, idx) => {
      if (!card) return;
      const historyIdx = isHoveredRef.current ? historyRef.current.indexOf(idx) : -1;
      const hasTier = historyIdx >= 0 && historyIdx < DECK_TIERS.length;
      const tier = hasTier ? DECK_TIERS[historyIdx] : HIDDEN_TIER;

      gsap.set(card, { zIndex: hasTier ? DECK_TIERS.length - historyIdx : 0 });

      if (reducedMotionRef.current) {
        gsap.to(card, { opacity: +(0 === historyIdx), duration: 0.12, overwrite: 'auto' });
      } else {
        gsap.to(card, {
          y: tier.y,
          scale: tier.scale,
          opacity: tier.opacity,
          filter: `blur(${tier.blur}px)`,
          duration: 0.34,
          ease: 'power4.out',
          overwrite: 'auto',
        });
      }
    });
  }, []);

  const handleRowEnter = useCallback(
    (index: number) => {
      if (!isDesktopRef.current) return;
      isHoveredRef.current = true;
      const nextHistory = historyRef.current.filter((i) => i !== index);
      nextHistory.unshift(index);
      historyRef.current = nextHistory.slice(0, DECK_TIERS.length + 2);

      rowsRef.current.forEach((row, rIdx) => {
        if (!row) return;
        const isActive = rIdx === index;
        row.dataset.active = isActive ? 'true' : 'false';
        gsap.to(row, {
          opacity: isActive ? 1 : 0.28,
          duration: reducedMotionRef.current ? 0.12 : 0.2,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      });

      updateDeck();
    },
    [updateDeck]
  );

  const handleRowLeave = useCallback(() => {
    if (!isDesktopRef.current) return;
    isHoveredRef.current = false;

    rowsRef.current.forEach((row) => {
      if (!row) return;
      row.dataset.active = 'false';
      gsap.to(row, {
        opacity: 1,
        duration: reducedMotionRef.current ? 0.12 : 0.22,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    });

    deckRef.current.forEach((card) => {
      if (!card) return;
      gsap.to(card, {
        opacity: 0,
        filter: reducedMotionRef.current ? 'none' : `blur(${HIDDEN_TIER.blur}px)`,
        duration: reducedMotionRef.current ? 0.12 : 0.38,
        ease: 'power2.out',
        overwrite: 'auto',
        onComplete: () => {
          gsap.set(card, { y: HIDDEN_TIER.y, scale: HIDDEN_TIER.scale });
        },
      });
    });
  }, []);

  useLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    registerGsap();
    reducedMotionRef.current = prefersReducedMotion();
    const mediaQuery = window.matchMedia('(min-width: 1280px)');

    const handleMedia = () => {
      isDesktopRef.current = mediaQuery.matches;
      if (!isDesktopRef.current) {
        gsap.set(rowsRef.current.filter(Boolean), { clearProps: 'opacity' });
        gsap.set(deckRef.current.filter(Boolean), { clearProps: 'all' });
        rowsRef.current.forEach((r) => r && (r.dataset.active = 'false'));
        return;
      }
      gsap.set(deckRef.current.filter(Boolean), {
        y: HIDDEN_TIER.y,
        scale: HIDDEN_TIER.scale,
        opacity: 0,
        zIndex: 0,
        filter: `blur(${HIDDEN_TIER.blur}px)`,
      });
    };

    handleMedia();
    mediaQuery.addEventListener('change', handleMedia);

    return () => {
      mediaQuery.removeEventListener('change', handleMedia);
    };
  }, []);

  return (
    <section ref={sectionRef} className="Archive-module__t718NW__section" data-node-id="41:164">
      <div className="Archive-module__t718NW__panel">
        <BandScribble
          mode="scroll"
          route={archiveRoute}
          start="top 80%"
          end="bottom 75%"
          tone="pink"
          className="Archive-module__t718NW__scribble"
        />

        <div className="Archive-module__t718NW__deck" aria-hidden="true">
          {ARCHIVE_ITEMS.map((item, idx) => (
            <div
              key={item.slug}
              ref={(el) => {
                deckRef.current[idx] = el;
              }}
              className="Archive-module__t718NW__layer"
              style={{
                opacity: 0,
                transform: `translateY(${HIDDEN_TIER.y}px) scale(${HIDDEN_TIER.scale})`,
                filter: `blur(${HIDDEN_TIER.blur}px)`,
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
              data-active="false"
              onMouseEnter={() => handleRowEnter(idx)}
            >
              <Link
                className="Archive-module__t718NW__rowInner"
                data-page-label={item.title}
                data-case-flip=""
                href={`/projects/${item.slug}`}
                onFocus={() => handleRowEnter(idx)}
                onBlur={handleRowLeave}
              >
                <img
                  alt=""
                  loading="lazy"
                  width={380}
                  height={440}
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
