'use client';

import React, { useEffect, useRef } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CtaBand } from '@/components/CtaBand';
import { HeroCoins } from '@/components/HeroCoins';
import { Statement } from '@/components/Statement';
import { CaseGrid } from '@/components/CaseGrid';
import { ArchiveSection } from '@/components/ArchiveSection';
import { ServicesStack } from '@/components/ServicesStack';
import { StickyNav } from '@/components/StickyNav';
import { initHeroText } from '@/src/animations/heroText';

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ruleRef = useRef<HTMLSpanElement>(null);
  const kickerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const headingEl = headlineRef.current;
    const ruleEl = ruleRef.current;
    const kickerEl = kickerRef.current;
    const heroContainer = heroRef.current;
    const metaEls = heroContainer
      ? Array.from(heroContainer.querySelectorAll<HTMLElement>('.Hero-module__KTD73a__metaItem, .Hero-module__KTD73a__navSlot'))
      : [];

    const heroAnim = initHeroText({
      headingEl,
      ruleEl,
      metaEls,
      kickerEl,
    });

    return () => {
      heroAnim.kill();
    };
  }, []);

  return (
    <main id="main">
      {/* 1. HERO SECTION */}
      <div className="Hero-module__KTD73a__frame">
        <section
          ref={heroRef}
          className="Hero-module__KTD73a__hero"
          data-intro="done"
          data-node-id="1:129"
        >
          {/* Flat 2D physics coins */}
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
              data-split-active="true"
              data-node-id="1:137"
              data-coins-above=""
            >
              <span data-split-line="justify" aria-hidden="true">
                {renderSplitWord('We')}
                {renderSplitWord('build')}
              </span>
              <span data-split-line="justify" aria-hidden="true">
                {renderSplitWord('websites')}
                {renderSplitWord('people')}
              </span>
              <span data-split-line="start" aria-hidden="true">
                {renderSplitWord('remember.')}
              </span>
            </h1>

            <p
              ref={kickerRef}
              className="Hero-module__KTD73a__kicker"
              data-node-id="1:147"
              data-coins-above=""
            >
              Anon is a creative digital studio in Warsaw. We design and build premium
              websites and web products for founders and product teams who need to stand
              out.
            </p>

            <div className="Hero-module__KTD73a__meta" data-coins-floor="">
              <span
                ref={ruleRef}
                className="Hero-module__KTD73a__metaRule"
                aria-hidden="true"
              />
              <p className="Hero-module__KTD73a__metaItem" data-node-id="1:148">
                <span className="Hero-module__KTD73a__metaLabel">Based in:</span>{' '}
                <span>
                  Warsaw <span suppressHydrationWarning>15:04</span>
                  <span> · 10°C</span>
                </span>
              </p>

              <p className="Hero-module__KTD73a__metaItem" data-node-id="1:151">
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
 * Split word into individual animated letter slots with clipping, staggered entrance, and magnetic directional swap
 */
function renderSplitWord(word: string) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'relative',
        display: 'inline-block',
      }}
    >
      {word.split('').map((char, cIdx) => (
        <div
          key={cIdx}
          data-swap-char=""
          aria-hidden="true"
          style={{
            position: 'relative',
            display: 'inline-block',
            overflow: 'clip',
            verticalAlign: 'top',
            cursor: 'default',
          }}
        >
          <div
            data-split-char=""
            data-swap-inner=""
            aria-hidden="true"
            style={{
              position: 'relative',
              display: 'inline-block',
            }}
          >
            {char}
          </div>
        </div>
      ))}
    </div>
  );
}
