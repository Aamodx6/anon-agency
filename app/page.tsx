'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CtaBand } from '@/components/CtaBand';
import { CaseThread } from '@/components/CaseThread';
import { ScrollRibbon } from '@/components/ScrollRibbon';
import { BandScribble } from '@/components/BandScribble';
import { GooeyThumb } from '@/components/GooeyThumb';
import { HeroCoins } from '@/components/HeroCoins';
import { Statement } from '@/components/Statement';
import { CaseGrid } from '@/components/CaseGrid';
import { ArchiveSection } from '@/components/ArchiveSection';
import { ServicesStack } from '@/components/ServicesStack';
import { StickyNav } from '@/components/StickyNav';

export default function HomePage() {
  const [counter, setCounter] = useState(0);
  const [introState, setIntroState] = useState<'pending' | 'done'>('pending');
  const [loaderStyle, setLoaderStyle] = useState<React.CSSProperties>({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    borderRadius: 0,
    backgroundColor: 'var(--c-red, #ff003d)',
    zIndex: 99,
    pointerEvents: 'none',
    transition: 'all 0.75s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease 0.75s',
  });
  const [counterOpacity, setCounterOpacity] = useState(1);

  const heroRef = useRef<HTMLElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // 1. Counter counts up from 0 to 100 in 750ms
    const duration = 750;
    const startTime = performance.now();

    const updateCounter = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      setCounter(Math.floor(progress * 100));

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        // Counter reaches 100%: fade out counter text
        setCounterOpacity(0);

        // At 850ms, animate loader frame to match hero container rect
        setTimeout(() => {
          const hero = heroRef.current;
          if (hero) {
            const rect = hero.getBoundingClientRect();
            setLoaderStyle({
              position: 'fixed',
              top: `${rect.top}px`,
              left: `${rect.left}px`,
              width: `${rect.width}px`,
              height: `${rect.height}px`,
              borderRadius: '16px',
              backgroundColor: 'var(--c-red, #ff003d)',
              zIndex: 99,
              pointerEvents: 'none',
              opacity: 0,
              transition:
                'all 0.75s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease 0.65s',
            });
          }

          // At 1550ms: mark intro done, reveal all hero content
          setTimeout(() => {
            setIntroState('done');
          }, 700);
        }, 120);
      }
    };

    requestAnimationFrame(updateCounter);
  }, []);

  return (
    <main id="main">
      {/* 1. HERO SECTION */}
      <div className="Hero-module__KTD73a__frame">
        {/* Permanent Loader Element that transforms into frame border */}
        <div
          ref={loaderRef}
          className="Hero-module__KTD73a__loader"
          data-hero-loader=""
          aria-hidden="true"
          style={loaderStyle}
        >
          <span
            className="Hero-module__KTD73a__loaderCounter"
            style={{ opacity: counterOpacity, transition: 'opacity 0.25s ease' }}
          >
            {String(counter).padStart(2, '0')}%
          </span>
        </div>

        <section
          ref={heroRef}
          className="Hero-module__KTD73a__hero"
          data-intro={introState}
          data-node-id="1:129"
        >
          {/* Hero interactive falling coins */}
          <HeroCoins />

          <div className="Hero-module__KTD73a__inner">
            <div className="Hero-module__KTD73a__navSlot">
              <Navbar variant="hero" />
            </div>

            <h1
              ref={headlineRef}
              className="Hero-module__KTD73a__headline"
              aria-label="We build websites people remember."
              data-split-heading="true"
              data-node-id="1:137"
              data-coins-above=""
            >
              <span data-split-line="justify" aria-hidden="true">
                {splitWords('We build', introState === 'done')}
              </span>
              <span data-split-line="justify" aria-hidden="true">
                {splitWords('websites people', introState === 'done')}
              </span>
              <span data-split-line="start" aria-hidden="true">
                {splitWords('remember.', introState === 'done')}
              </span>
            </h1>

            <p
              className="Hero-module__KTD73a__kicker"
              data-node-id="1:147"
              data-coins-above=""
              style={{
                transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s',
                opacity: introState === 'done' ? 1 : 0,
                transform: introState === 'done' ? 'translateY(0)' : 'translateY(12px)',
              }}
            >
              Anon is a creative digital studio in Warsaw. We design and build premium
              websites and web products for founders and product teams who need to stand
              out.
            </p>

            <div className="Hero-module__KTD73a__meta" data-coins-floor="">
              <span
                className="Hero-module__KTD73a__metaRule"
                aria-hidden="true"
                style={{
                  transition: 'transform 0.85s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: introState === 'done' ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin: 'left',
                }}
              />
              <p
                className="Hero-module__KTD73a__metaItem"
                data-node-id="1:148"
                style={{
                  transition: 'opacity 0.5s ease 0.3s, transform 0.5s ease 0.3s',
                  opacity: introState === 'done' ? 1 : 0,
                  transform: introState === 'done' ? 'translateY(0)' : 'translateY(12px)',
                }}
              >
                <span className="Hero-module__KTD73a__metaLabel">Based in:</span>{' '}
                <span>Warsaw</span>
              </p>
              <p
                className="Hero-module__KTD73a__metaItem"
                data-node-id="1:151"
                style={{
                  transition: 'opacity 0.5s ease 0.35s, transform 0.5s ease 0.35s',
                  opacity: introState === 'done' ? 1 : 0,
                  transform: introState === 'done' ? 'translateY(0)' : 'translateY(12px)',
                }}
              >
                <span className="Hero-module__KTD73a__metaLabel">Say hello:</span>{' '}
                <a
                  href="mailto:contact@anonagency.dev"
                  className="Hero-module__KTD73a__metaLink"
                  aria-label="Copy to clipboard: contact@anonagency.dev"
                >
                  contact@anonagency.dev
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* 2. STATEMENT SECTION */}
      <Statement />

      {/* 3. CASEGRID SECTION */}
      <CaseGrid />

            {/* 4. ARCHIVE SECTION */}
      <ArchiveSection />

      {/* 5. SERVICES STACK SECTION */}
      <ServicesStack />

      {/* 6. CTA BAND */}
      <CtaBand spacing="home" />

      {/* 7. STICKY NAV */}
      <StickyNav />

      {/* 7. FOOTER */}
      <Footer />
    </main>
  );
}

/**
 * Helper to split line into interactive animated letters
 */
function splitWords(text: string, isDone: boolean) {
  const words = text.split(' ');
  return words.map((w, wIdx) => (
    <span
      key={wIdx}
      style={{
        position: 'relative',
        display: 'inline-block',
        marginRight: wIdx < words.length - 1 ? '0.28em' : 0,
      }}
    >
      {w.split('').map((char, cIdx) => {
        // Alternating staggered entrance
        const xOffset = (wIdx + cIdx) % 2 === 0 ? '-100%' : '100%';
        return (
          <span
            key={cIdx}
            style={{
              position: 'relative',
              display: 'inline-block',
              overflow: 'hidden',
              verticalAlign: 'top',
            }}
          >
            <span
              style={{
                position: 'relative',
                display: 'inline-block',
                transition: `transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${
                  (wIdx * 5 + cIdx) * 35
                }ms, opacity 0.65s ease ${(wIdx * 5 + cIdx) * 35}ms`,
                transform: isDone ? 'translate(0, 0)' : `translate(${xOffset}, 0)`,
                opacity: isDone ? 1 : 0,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(-12%) rotate(6deg)';
                el.style.color = 'var(--c-ink, #161d25)';
                setTimeout(() => {
                  el.style.transform = 'translate(0, 0) rotate(0deg)';
                  el.style.color = '';
                }, 300);
              }}
            >
              {char}
            </span>
          </span>
        );
      })}
    </span>
  ));
}
