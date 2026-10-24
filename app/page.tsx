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
      <section
        className="Statement-module__6Nrrla__statement"
        id="about"
        data-node-id="1:130"
      >
        <ScrollRibbon figure="statement" />
        <h2 className="sr-only">
          We design and build websites, brand systems, and digital products that work as
          hard as they look. Whether you&apos;re launching a product, rebuilding a brand, or
          replacing a tired site, one team takes it from sketch to live build.
        </h2>
        <div className="Statement-module__6Nrrla__stack" aria-hidden="true">
          <p className="Statement-module__6Nrrla__text" data-node-id="1:134">
            We design and build websites, brand systems, and digital products that work as
            hard as they look.
          </p>
          <p className="Statement-module__6Nrrla__text" data-node-id="1:134">
            Whether you&apos;re launching a product, rebuilding a brand, or replacing a tired
            site, one team takes it from sketch to live build.
          </p>
        </div>
      </section>

      {/* 3. CASEGRID SECTION */}
      <section
        className="CaseGrid-module__tbWBJq__section "
        id="projects"
        data-node-id="1:135"
      >
        <h2 className="CaseGrid-module__tbWBJq__heading">Our projects</h2>
        <div className="CaseGrid-module__tbWBJq__stage">
          {/* Animated SVG thread path connecting project cards */}
          <CaseThread />

          <ul
            className="CaseGrid-module__tbWBJq__grid"
            style={{ ['--stage-h' as any]: '121.4583vw' }}
          >
            {/* 1. Mihailove */}
            <li
              className="CaseGrid-module__tbWBJq__item"
              style={{ ['--x' as any]: '8.8889vw', ['--y' as any]: '0vw' }}
            >
              <Link
                className="CaseCard-module__WCHEYG__card"
                data-page-label="Mihailove"
                data-case-flip=""
                data-flip-src="https://cdn.sanity.io/images/pka0c0l0/production/bc147e801b9e7a8d05883063a695fb6d9894fc8e-2400x1306.png"
                href="/projects/mihailove"
              >
                <span className="CaseCard-module__WCHEYG__thumb">
                  <GooeyThumb
                    alt="Mihailove, jewellery site"
                    src="https://cdn.sanity.io/images/pka0c0l0/production/9395fccaf2a0f50ac5e1f478ebd1be397ddb5268-1440x1698.png"
                    hoverSrc="https://cdn.sanity.io/images/pka0c0l0/production/bc147e801b9e7a8d05883063a695fb6d9894fc8e-2400x1306.png"
                    width={380}
                    height={440}
                  />
                </span>
                <span className="CaseCard-module__WCHEYG__meta">
                  <span className="CaseCard-module__WCHEYG__title">Mihailove</span>
                  <span className="CaseCard-module__WCHEYG__dot" aria-hidden="true" />
                  <span className="CaseCard-module__WCHEYG__discipline">
                    Development
                  </span>
                </span>
              </Link>
            </li>

            {/* 2. Frame */}
            <li
              className="CaseGrid-module__tbWBJq__item"
              style={{ ['--x' as any]: '66.1806vw', ['--y' as any]: '23.9583vw' }}
            >
              <Link
                className="CaseCard-module__WCHEYG__card"
                data-page-label="Frame"
                data-case-flip=""
                data-flip-src="https://cdn.sanity.io/images/pka0c0l0/production/1c4e3567e9d6a865cd5e7cb5fc65379abc00acd5-2400x1306.png"
                href="/projects/frame"
              >
                <span className="CaseCard-module__WCHEYG__thumb">
                  <GooeyThumb
                    alt="Frame, product site"
                    src="https://cdn.sanity.io/images/pka0c0l0/production/7f9817871110af85ee68826e2c402c8534b4cc03-1440x1698.png"
                    hoverSrc="https://cdn.sanity.io/images/pka0c0l0/production/1c4e3567e9d6a865cd5e7cb5fc65379abc00acd5-2400x1306.png"
                    width={380}
                    height={440}
                  />
                </span>
                <span className="CaseCard-module__WCHEYG__meta">
                  <span className="CaseCard-module__WCHEYG__title">Frame</span>
                  <span className="CaseCard-module__WCHEYG__dot" aria-hidden="true" />
                  <span className="CaseCard-module__WCHEYG__discipline">
                    Development
                  </span>
                </span>
              </Link>
            </li>

            {/* 3. Portfolio Ventures */}
            <li
              className="CaseGrid-module__tbWBJq__item"
              style={{ ['--x' as any]: '15.3472vw', ['--y' as any]: '56.3194vw' }}
            >
              <Link
                className="CaseCard-module__WCHEYG__card"
                data-page-label="Portfolio Ventures"
                data-case-flip=""
                data-flip-src="https://cdn.sanity.io/images/pka0c0l0/production/513093ecae0df5f3582a328ade77575913405d26-2400x1306.png"
                href="/projects/portfolio-ventures"
              >
                <span className="CaseCard-module__WCHEYG__thumb">
                  <GooeyThumb
                    alt="Portfolio Ventures, venture capital site"
                    src="https://cdn.sanity.io/images/pka0c0l0/production/d542e0740df5e6200eb1b958674f0bc141b83237-1440x1698.png"
                    hoverSrc="https://cdn.sanity.io/images/pka0c0l0/production/513093ecae0df5f3582a328ade77575913405d26-2400x1306.png"
                    width={380}
                    height={440}
                  />
                </span>
                <span className="CaseCard-module__WCHEYG__meta">
                  <span className="CaseCard-module__WCHEYG__title">
                    Portfolio Ventures
                  </span>
                  <span className="CaseCard-module__WCHEYG__dot" aria-hidden="true" />
                  <span className="CaseCard-module__WCHEYG__discipline">
                    Development
                  </span>
                </span>
              </Link>
            </li>

            {/* 4. Manypixels */}
            <li
              className="CaseGrid-module__tbWBJq__item"
              style={{ ['--x' as any]: '57.0833vw', ['--y' as any]: '85.9028vw' }}
            >
              <Link
                className="CaseCard-module__WCHEYG__card"
                data-page-label="Manypixels"
                data-case-flip=""
                data-flip-src="https://cdn.sanity.io/images/pka0c0l0/production/fdd04734314f16dcd5c06b4d002a64b81d93d18e-1080x1320.jpg"
                href="/projects/manypixels"
              >
                <span className="CaseCard-module__WCHEYG__thumb">
                  <GooeyThumb
                    alt="Manypixels, on-demand creative site"
                    src="https://cdn.sanity.io/images/pka0c0l0/production/73a5abc6bbeacc8a8380ce43b2fa889b256ebde6-1080x1320.jpg"
                    hoverSrc="https://cdn.sanity.io/images/pka0c0l0/production/fdd04734314f16dcd5c06b4d002a64b81d93d18e-1080x1320.jpg"
                    width={380}
                    height={440}
                  />
                </span>
                <span className="CaseCard-module__WCHEYG__meta">
                  <span className="CaseCard-module__WCHEYG__title">Manypixels</span>
                  <span className="CaseCard-module__WCHEYG__dot" aria-hidden="true" />
                  <span className="CaseCard-module__WCHEYG__discipline">
                    Development
                  </span>
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* 4. ARCHIVE SECTION */}
      <section className="Archive-module__t718NW__section" data-node-id="41:164">
        <div className="Archive-module__t718NW__panel">
          {/* Animated Ribbon Scribble */}
          <BandScribble tone="pink" className="Archive-module__t718NW__scribble" />

          <div className="Archive-module__t718NW__deck" aria-hidden="true">
            <div className="Archive-module__t718NW__layer">
              <img
                alt=""
                loading="lazy"
                width={270}
                height={330}
                className="Archive-module__t718NW__layerImage"
                src="https://cdn.sanity.io/images/pka0c0l0/production/114029f7089fbdd7a27bb8f42e0aed568ad5a8ba-1440x1698.png"
              />
            </div>
            <div className="Archive-module__t718NW__layer">
              <img
                alt=""
                loading="lazy"
                width={270}
                height={330}
                className="Archive-module__t718NW__layerImage"
                src="https://cdn.sanity.io/images/pka0c0l0/production/3054ee77e7a9f1d81a5c0ec55f51ff7c6e77e8a2-1440x1698.png"
              />
            </div>
            <div className="Archive-module__t718NW__layer">
              <img
                alt=""
                loading="lazy"
                width={270}
                height={330}
                className="Archive-module__t718NW__layerImage"
                src="https://cdn.sanity.io/images/pka0c0l0/production/835f207df3063191fc45abf54a20d4947ae0c9ae-1440x1698.png"
              />
            </div>
          </div>

          <ul className="Archive-module__t718NW__rows">
            <li className="Archive-module__t718NW__row">
              <Link
                className="Archive-module__t718NW__rowInner"
                data-page-label="Rally"
                data-case-flip=""
                href="/projects/rally"
              >
                <img
                  alt=""
                  loading="lazy"
                  width={270}
                  height={330}
                  className="Archive-module__t718NW__rowThumb"
                  src="https://cdn.sanity.io/images/pka0c0l0/production/114029f7089fbdd7a27bb8f42e0aed568ad5a8ba-1440x1698.png"
                />
                <span className="Archive-module__t718NW__title">Rally</span>
                <span className="Archive-module__t718NW__meta">
                  <span className="Archive-module__t718NW__discipline">Development</span>
                  <span className="Archive-module__t718NW__dot" aria-hidden="true" />
                  <span className="Archive-module__t718NW__year">2024</span>
                </span>
              </Link>
            </li>
            <li className="Archive-module__t718NW__row">
              <Link
                className="Archive-module__t718NW__rowInner"
                data-page-label="Rhinestone"
                data-case-flip=""
                href="/projects/rhinestone"
              >
                <img
                  alt=""
                  loading="lazy"
                  width={270}
                  height={330}
                  className="Archive-module__t718NW__rowThumb"
                  src="https://cdn.sanity.io/images/pka0c0l0/production/3054ee77e7a9f1d81a5c0ec55f51ff7c6e77e8a2-1440x1698.png"
                />
                <span className="Archive-module__t718NW__title">Rhinestone</span>
                <span className="Archive-module__t718NW__meta">
                  <span className="Archive-module__t718NW__discipline">Development</span>
                  <span className="Archive-module__t718NW__dot" aria-hidden="true" />
                  <span className="Archive-module__t718NW__year">2024</span>
                </span>
              </Link>
            </li>
            <li className="Archive-module__t718NW__row">
              <Link
                className="Archive-module__t718NW__rowInner"
                data-page-label="Ezra"
                data-case-flip=""
                href="/projects/ezra"
              >
                <img
                  alt=""
                  loading="lazy"
                  width={270}
                  height={330}
                  className="Archive-module__t718NW__rowThumb"
                  src="https://cdn.sanity.io/images/pka0c0l0/production/835f207df3063191fc45abf54a20d4947ae0c9ae-1440x1698.png"
                />
                <span className="Archive-module__t718NW__title">Ezra</span>
                <span className="Archive-module__t718NW__meta">
                  <span className="Archive-module__t718NW__discipline">Development</span>
                  <span className="Archive-module__t718NW__dot" aria-hidden="true" />
                  <span className="Archive-module__t718NW__year">2024</span>
                </span>
              </Link>
            </li>
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

      {/* 5. SERVICES STACK SECTION */}
      <section
        className="ServicesStack-module__QW-zbq__section"
        id="services"
        data-node-id="1:132"
      >
        <h2 className="ServicesStack-module__QW-zbq__word" data-node-id="1:397">
          Services
        </h2>
        <ul className="ServicesStack-module__QW-zbq__list">
          {/* Card 1 */}
          <li className="ServicesStack-module__QW-zbq__item">
            <article className="ServicesStack-module__QW-zbq__card">
              <ScrollRibbon figure="01" />
              <span className="ServicesStack-module__QW-zbq__number">01</span>
              <h3 className="ServicesStack-module__QW-zbq__cardTitle">
                Webflow development
              </h3>
              <p className="ServicesStack-module__QW-zbq__cardBody">
                Begin Webflow development with our Project Discovery session, aligning
                our team with your goals, timeline, and required functionalities. We
                prioritize understanding your content strategy, feature needs, and
                desired user experiences.
              </p>
              <Link
                className="ServicesStack-module__QW-zbq__cardButton"
                data-page-label="Webflow development"
                href="/services/webflow-development"
              >
                more information
                <span className="sr-only"> about Webflow development</span>
              </Link>
            </article>
          </li>

          {/* Card 2 */}
          <li className="ServicesStack-module__QW-zbq__item">
            <article className="ServicesStack-module__QW-zbq__card">
              <ScrollRibbon figure="02" />
              <span className="ServicesStack-module__QW-zbq__number">02</span>
              <h3 className="ServicesStack-module__QW-zbq__cardTitle">
                UX/UI design
              </h3>
              <p className="ServicesStack-module__QW-zbq__cardBody">
                Every design project begins with understanding your audience, brand
                personality, and business goals. We create intuitive wireframes,
                polished visual concepts, and complete design systems that turn visitors
                into loyal customers.
              </p>
              <Link
                className="ServicesStack-module__QW-zbq__cardButton"
                data-page-label="UX/UI design"
                href="/services/ux-ui-design"
              >
                more information
                <span className="sr-only"> about UX/UI design</span>
              </Link>
            </article>
          </li>

          {/* Card 3 */}
          <li className="ServicesStack-module__QW-zbq__item">
            <article className="ServicesStack-module__QW-zbq__card">
              <ScrollRibbon figure="03" />
              <span className="ServicesStack-module__QW-zbq__number">03</span>
              <h3 className="ServicesStack-module__QW-zbq__cardTitle">
                Branding
              </h3>
              <p className="ServicesStack-module__QW-zbq__cardBody">
                We help brands establish an unmistakable presence. From logotypes and
                typography systems to color palettes and comprehensive brand books, we
                build coherent visual languages that resonate across every customer
                touchpoint.
              </p>
              <Link
                className="ServicesStack-module__QW-zbq__cardButton"
                data-page-label="Branding"
                href="/services/branding"
              >
                more information
                <span className="sr-only"> about Branding</span>
              </Link>
            </article>
          </li>

          {/* Card 4 */}
          <li className="ServicesStack-module__QW-zbq__item">
            <article className="ServicesStack-module__QW-zbq__card">
              <ScrollRibbon figure="04" />
              <span className="ServicesStack-module__QW-zbq__number">04</span>
              <h3 className="ServicesStack-module__QW-zbq__cardTitle">
                Webflow maintenance &amp; support
              </h3>
              <p className="ServicesStack-module__QW-zbq__cardBody">
                Keep your site fast, secure, and always up to date. From regular feature
                additions and performance tuning to design iterations and technical
                troubleshooting, we provide ongoing care for growing businesses.
              </p>
              <Link
                className="ServicesStack-module__QW-zbq__cardButton"
                data-page-label="Webflow maintenance &amp; support"
                href="/services/webflow-maintains-support"
              >
                more information
                <span className="sr-only"> about Webflow maintenance &amp; support</span>
              </Link>
            </article>
          </li>
        </ul>
      </section>

      {/* 6. CTA BAND */}
      <CtaBand spacing="home" />

      {/* Sticky nav */}
      <Navbar variant="dev" />

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
