'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CtaBand } from '@/components/CtaBand';
import { HeroCoins } from '@/components/HeroCoins';
import { Statement } from '@/components/Statement';
import { CaseGrid } from '@/components/CaseGrid';
import { ArchiveSection } from '@/components/ArchiveSection';
import { ServicesStack } from '@/components/ServicesStack';
import { StickyNav } from '@/components/StickyNav';

export default function HomePage() {
  const [counter, setCounter] = useState(0);
  const [introState, setIntroState] = useState<'pending' | 'done'>('pending');
  const [counterOpacity, setCounterOpacity] = useState(1);
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
  });

  const heroRef = useRef<HTMLElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Counter counts up from 0 to 100 in 600ms
    const duration = 600;
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

        // At 720ms, animate loader frame to match hero container rect
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
              borderRadius: '32px',
              backgroundColor: 'var(--c-red, #ff003d)',
              zIndex: 99,
              pointerEvents: 'none',
              transition: 'all 0.55s cubic-bezier(0.16, 1, 0.3, 1)',
            });
          }

          // At 1250ms: fade out loader frame and reveal hero content
          setTimeout(() => {
            setLoaderStyle((prev) => ({
              ...prev,
              opacity: 0,
              visibility: 'hidden',
              transition: 'opacity 0.35s ease',
            }));

            // At 1350ms: mark intro done, triggering staggered letter slide-in
            setTimeout(() => {
              setIntroState('done');
            }, 100);
          }, 550);
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
            style={{ opacity: counterOpacity, transition: 'opacity 0.2s ease' }}
          >
            {counter}%
          </span>
        </div>

        <section
          ref={heroRef}
          className="Hero-module__KTD73a__hero"
          data-intro={introState}
          data-node-id="1:129"
        >
          {/* Interactive 3D Physics Coins */}
          <HeroCoins />

          <div className="Hero-module__KTD73a__inner">
            <div
              className="Hero-module__KTD73a__navSlot"
              style={{
                transition: 'opacity 0.5s ease, transform 0.5s ease',
                opacity: introState === 'done' ? 1 : 0,
                transform: introState === 'done' ? 'translateY(0)' : 'translateY(12px)',
              }}
            >
              <Navbar variant="hero" />
            </div>

            <h1
              className="Hero-module__KTD73a__headline"
              aria-label="We build websites people remember."
              data-split-heading="true"
              data-split-active="true"
              data-node-id="1:137"
              data-coins-above=""
            >
              <span data-split-line="justify" aria-hidden="true">
                {renderSplitWord('We', introState === 'done', 0)}
                {renderSplitWord('build', introState === 'done', 3)}
              </span>
              <span data-split-line="justify" aria-hidden="true">
                {renderSplitWord('websites', introState === 'done', 8)}
                {renderSplitWord('people', introState === 'done', 16)}
              </span>
              <span data-split-line="start" aria-hidden="true">
                {renderSplitWord('remember.', introState === 'done', 22)}
              </span>
            </h1>

            <p
              className="Hero-module__KTD73a__kicker"
              data-node-id="1:147"
              data-coins-above=""
              style={{
                transition: 'opacity 0.6s ease 0.25s, transform 0.6s ease 0.25s',
                opacity: introState === 'done' ? 0.8 : 0,
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
                  transition: 'transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
                  transform: introState === 'done' ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin: 'left',
                }}
              />
              <p
                className="Hero-module__KTD73a__metaItem"
                data-node-id="1:148"
                style={{
                  transition: 'opacity 0.5s ease 0.35s, transform 0.5s ease 0.35s',
                  opacity: introState === 'done' ? 1 : 0,
                  transform: introState === 'done' ? 'translateY(0)' : 'translateY(12px)',
                }}
              >
                <span className="Hero-module__KTD73a__metaLabel">Based in:</span>{' '}
                <span>
                  Warsaw <span suppressHydrationWarning>15:04</span>
                  <span> · 10°C</span>
                </span>
              </p>

              <p
                className="Hero-module__KTD73a__metaItem"
                data-node-id="1:151"
                style={{
                  transition: 'opacity 0.5s ease 0.4s, transform 0.5s ease 0.4s',
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

      {/* 8. FOOTER */}
      <Footer />
    </main>
  );
}

/**
 * Split word into individual animated letter slots with clipping and staggered entrance
 */
function renderSplitWord(word: string, isDone: boolean, startDelayIndex: number) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'relative',
        display: 'inline-block',
      }}
    >
      {word.split('').map((char, cIdx) => {
        const globalIdx = startDelayIndex + cIdx;
        const xOffset = globalIdx % 2 === 0 ? '-100%' : '100%';
        const delayMs = globalIdx * 28;

        return (
          <div
            key={cIdx}
            aria-hidden="true"
            style={{
              position: 'relative',
              display: 'inline-block',
              overflow: 'clip',
              verticalAlign: 'top',
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: 'relative',
                display: 'inline-block',
                transition: `transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, opacity 0.5s ease ${delayMs}ms`,
                transform: isDone ? 'translate(0px, 0px)' : `translate(${xOffset}, 0%)`,
                opacity: isDone ? 1 : 0,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(-14%) rotate(5deg)';
                el.style.color = 'var(--c-ink, #161d25)';
                setTimeout(() => {
                  el.style.transform = 'translate(0px, 0px) rotate(0deg)';
                  el.style.color = '';
                }, 300);
              }}
            >
              {char}
            </div>
          </div>
        );
      })}
    </div>
  );
}
