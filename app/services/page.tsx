'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CtaBand } from '@/components/CtaBand';

const SERVICES_DATA = [
  {
    slug: 'webflow-development',
    tabLabel: 'Webflow',
    title: 'Webflow development',
    body: 'Begin Webflow development with our Project Discovery session, aligning our team with your goals, timeline, and required functionalities. We prioritize understanding your content strategy, feature needs, and desired user experiences.',
    leftCase: {
      slug: 'frame',
      title: 'Frame',
      type: 'product site',
      baseImg: 'https://cdn.sanity.io/images/pka0c0l0/production/7f9817871110af85ee68826e2c402c8534b4cc03-1440x1698.png',
      hoverImg: 'https://cdn.sanity.io/images/pka0c0l0/production/1c4e3567e9d6a865cd5e7cb5fc65379abc00acd5-2400x1306.png',
      discipline: 'Development'
    },
    rightCase: {
      slug: 'mihailove',
      title: 'Mihailove',
      type: 'jewellery site',
      baseImg: 'https://cdn.sanity.io/images/pka0c0l0/production/9395fccaf2a0f50ac5e1f478ebd1be397ddb5268-1440x1698.png',
      hoverImg: 'https://cdn.sanity.io/images/pka0c0l0/production/bc147e801b9e7a8d05883063a695fb6d9894fc8e-2400x1306.png',
      discipline: 'Development'
    }
  },
  {
    slug: 'ux-ui-design',
    tabLabel: 'UI/UX',
    title: 'UX/UI design',
    body: 'Every design project begins with understanding your audience, brand personality, and business goals. We create intuitive wireframes, polished visual concepts, and complete design systems that turn visitors into loyal customers.',
    leftCase: {
      slug: 'portfolio-ventures',
      title: 'Portfolio Ventures',
      type: 'venture capital site',
      baseImg: 'https://cdn.sanity.io/images/pka0c0l0/production/d542e0740df5e6200eb1b958674f0bc141b83237-1440x1698.png',
      hoverImg: 'https://cdn.sanity.io/images/pka0c0l0/production/513093ecae0df5f3582a328ade77575913405d26-2400x1306.png',
      discipline: 'Development'
    },
    rightCase: {
      slug: 'manypixels',
      title: 'Manypixels',
      type: 'creative platform',
      baseImg: 'https://cdn.sanity.io/images/pka0c0l0/production/73a5abc6bbeacc8a8380ce43b2fa889b256ebde6-1080x1320.jpg',
      hoverImg: 'https://cdn.sanity.io/images/pka0c0l0/production/fdd04734314f16dcd5c06b4d002a64b81d93d18e-1080x1320.jpg',
      discipline: 'Development'
    }
  },
  {
    slug: 'branding',
    tabLabel: 'Branding',
    title: 'Branding',
    body: 'We help brands establish an unmistakable presence. From logotypes and typography systems to color palettes and comprehensive brand books, we build coherent visual languages that resonate across every customer touchpoint.',
    leftCase: {
      slug: 'rally',
      title: 'Rally',
      type: 'crypto platform',
      baseImg: 'https://cdn.sanity.io/images/pka0c0l0/production/114029f7089fbdd7a27bb8f42e0aed568ad5a8ba-1440x1698.png',
      hoverImg: 'https://cdn.sanity.io/images/pka0c0l0/production/3054ee77e7a9f1d81a5c0ec55f51ff7c6e77e8a2-1440x1698.png',
      discipline: 'Branding'
    },
    rightCase: {
      slug: 'ezra',
      title: 'Ezra',
      type: 'health site',
      baseImg: 'https://cdn.sanity.io/images/pka0c0l0/production/835f207df3063191fc45abf54a20d4947ae0c9ae-1440x1698.png',
      hoverImg: 'https://cdn.sanity.io/images/pka0c0l0/production/3054ee77e7a9f1d81a5c0ec55f51ff7c6e77e8a2-1440x1698.png',
      discipline: 'Branding'
    }
  },
  {
    slug: 'webflow-maintains-support',
    tabLabel: 'Support',
    title: 'Webflow maintains & support',
    body: 'Keep your site fast, secure, and always up to date. From regular feature additions and performance tuning to design iterations and technical troubleshooting, we provide ongoing care for growing businesses.',
    leftCase: {
      slug: 'rhinestone',
      title: 'Rhinestone',
      type: 'web3 infrastructure',
      baseImg: 'https://cdn.sanity.io/images/pka0c0l0/production/3054ee77e7a9f1d81a5c0ec55f51ff7c6e77e8a2-1440x1698.png',
      hoverImg: 'https://cdn.sanity.io/images/pka0c0l0/production/114029f7089fbdd7a27bb8f42e0aed568ad5a8ba-1440x1698.png',
      discipline: 'Support'
    },
    rightCase: {
      slug: 'korelabs',
      title: 'Korelabs',
      type: 'research studio',
      baseImg: 'https://cdn.sanity.io/images/pka0c0l0/production/835f207df3063191fc45abf54a20d4947ae0c9ae-1440x1698.png',
      hoverImg: 'https://cdn.sanity.io/images/pka0c0l0/production/bc147e801b9e7a8d05883063a695fb6d9894fc8e-2400x1306.png',
      discipline: 'Support'
    }
  }
];

export default function ServicesPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <main id="main">
      <header className="Navbar-module__O8Na-a__navbar Navbar-module__O8Na-a__dev" data-node-id="45:284" data-site-nav="dev">
        <Navbar variant="dev" />
      </header>

      <section
        className="ServicesShowcase-module__RU0Ola__stage"
        aria-label="Our services"
        data-node-id="2331:5661"
      >
        <svg
          className="ScrollRibbon-module__wSfOTW__svg"
          aria-hidden="true"
          focusable="false"
          preserveAspectRatio="none"
          data-ribbon=""
        />
        <h1 className="sr-only">Our services</h1>

        <div className="ServicesShowcase-module__RU0Ola__cases" role="group" aria-label="Related projects">
          <ul className="ServicesShowcase-module__RU0Ola__column ServicesShowcase-module__RU0Ola__columnLeft">
            {SERVICES_DATA.map((srv, idx) => (
              <li
                key={srv.slug}
                className="ServicesShowcase-module__RU0Ola__slot"
                style={{
                  opacity: activeIndex === idx ? 1 : 0,
                  transform: `translateY(${(idx - activeIndex) * 20}px)`,
                  transition: 'opacity 0.4s ease, transform 0.4s ease',
                  pointerEvents: activeIndex === idx ? 'auto' : 'none'
                }}
              >
                <Link
                  className="CaseTile-module__SHADKG__tile"
                  data-page-label={srv.leftCase.title}
                  data-case-slug={srv.leftCase.slug}
                  data-case-flip=""
                  href={`/projects/${srv.leftCase.slug}`}
                >
                  <span className="CaseTile-module__SHADKG__thumb">
                    <img
                      alt={`${srv.leftCase.title}, ${srv.leftCase.type}`}
                      loading="eager"
                      width={380}
                      height={440}
                      className="CaseTile-module__SHADKG__img CaseTile-module__SHADKG__base"
                      src={srv.leftCase.baseImg}
                    />
                    <img
                      alt=""
                      aria-hidden="true"
                      loading="eager"
                      width={380}
                      height={440}
                      className="CaseTile-module__SHADKG__img CaseTile-module__SHADKG__hover"
                      src={srv.leftCase.hoverImg}
                    />
                  </span>
                  <span className="CaseTile-module__SHADKG__meta">
                    <span className="CaseTile-module__SHADKG__discipline">
                      {srv.leftCase.discipline}
                    </span>
                    <span className="CaseTile-module__SHADKG__title">
                      {srv.leftCase.title}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="ServicesShowcase-module__RU0Ola__stack">
            {SERVICES_DATA.map((srv, idx) => (
              <article
                key={srv.slug}
                className="ServicesShowcase-module__RU0Ola__card"
                data-pos={idx}
                role="tabpanel"
                id={`service-panel-${srv.slug}`}
                aria-labelledby={`service-tab-${srv.slug}`}
                aria-hidden={activeIndex !== idx}
                style={{
                  display: activeIndex === idx ? 'flex' : 'none'
                }}
              >
                <h2 className="ServicesShowcase-module__RU0Ola__cardTitle">{srv.title}</h2>
                <p className="ServicesShowcase-module__RU0Ola__cardBody">{srv.body}</p>
                <Link
                  className="ServicesShowcase-module__RU0Ola__cardButton"
                  data-page-label={srv.title}
                  href={`/services/${srv.slug}`}
                >
                  more information
                  <span className="sr-only"> about {srv.title}</span>
                </Link>
              </article>
            ))}
          </div>

          <ul className="ServicesShowcase-module__RU0Ola__column ServicesShowcase-module__RU0Ola__columnRight">
            {SERVICES_DATA.map((srv, idx) => (
              <li
                key={srv.slug}
                className="ServicesShowcase-module__RU0Ola__slot"
                style={{
                  opacity: activeIndex === idx ? 1 : 0,
                  transform: `translateY(${(idx - activeIndex) * 20}px)`,
                  transition: 'opacity 0.4s ease, transform 0.4s ease',
                  pointerEvents: activeIndex === idx ? 'auto' : 'none'
                }}
              >
                <Link
                  className="CaseTile-module__SHADKG__tile"
                  data-page-label={srv.rightCase.title}
                  data-case-slug={srv.rightCase.slug}
                  data-case-flip=""
                  href={`/projects/${srv.rightCase.slug}`}
                >
                  <span className="CaseTile-module__SHADKG__thumb">
                    <img
                      alt={`${srv.rightCase.title}, ${srv.rightCase.type}`}
                      loading="eager"
                      width={380}
                      height={440}
                      className="CaseTile-module__SHADKG__img CaseTile-module__SHADKG__base"
                      src={srv.rightCase.baseImg}
                    />
                    <img
                      alt=""
                      aria-hidden="true"
                      loading="eager"
                      width={380}
                      height={440}
                      className="CaseTile-module__SHADKG__img CaseTile-module__SHADKG__hover"
                      src={srv.rightCase.hoverImg}
                    />
                  </span>
                  <span className="CaseTile-module__SHADKG__meta">
                    <span className="CaseTile-module__SHADKG__discipline">
                      {srv.rightCase.discipline}
                    </span>
                    <span className="CaseTile-module__SHADKG__title">
                      {srv.rightCase.title}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Tab bar */}
        <div className="ServicesShowcase-module__RU0Ola__bar" role="tablist" aria-label="Choose a service">
          <span
            className="ServicesShowcase-module__RU0Ola__glider"
            aria-hidden="true"
            style={{
              transform: `translateX(${activeIndex * 100}%)`,
              transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          />
          {SERVICES_DATA.map((srv, idx) => (
            <button
              key={srv.slug}
              type="button"
              role="tab"
              id={`service-tab-${srv.slug}`}
              aria-selected={activeIndex === idx}
              aria-controls={`service-panel-${srv.slug}`}
              tabIndex={activeIndex === idx ? 0 : -1}
              className="ServicesShowcase-module__RU0Ola__tab"
              data-active={activeIndex === idx ? '' : undefined}
              onClick={() => setActiveIndex(idx)}
            >
              {srv.tabLabel}
            </button>
          ))}
        </div>
      </section>

      <CtaBand spacing="page" />
      <Footer />
    </main>
  );
}
