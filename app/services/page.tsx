'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CtaBand } from '@/components/CtaBand';
import { SERVICES } from '@/data/services';

export default function ServicesPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <main id="main">
      <header
        className="Navbar-module__O8Na-a__navbar Navbar-module__O8Na-a__dev"
        data-node-id="45:284"
        data-site-nav="dev"
      >
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

        <div
          className="ServicesShowcase-module__RU0Ola__cases"
          role="group"
          aria-label="Related projects"
        >
          {/* Left Case Column */}
          <ul className="ServicesShowcase-module__RU0Ola__column ServicesShowcase-module__RU0Ola__columnLeft">
            {SERVICES.map((srv, idx) => (
              <li
                key={srv.slug}
                className="ServicesShowcase-module__RU0Ola__slot"
                style={{
                  opacity: activeIndex === idx ? 1 : 0,
                  transform: `translateY(${(idx - activeIndex) * 20}px)`,
                  transition: 'opacity 0.4s ease, transform 0.4s ease',
                  pointerEvents: activeIndex === idx ? 'auto' : 'none',
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

          {/* Center Card Stack */}
          <div className="ServicesShowcase-module__RU0Ola__stack">
            {SERVICES.map((srv, idx) => (
              <article
                key={srv.slug}
                className="ServicesShowcase-module__RU0Ola__card"
                data-pos={idx}
                role="tabpanel"
                id={`service-panel-${srv.slug}`}
                aria-labelledby={`service-tab-${srv.slug}`}
                aria-hidden={activeIndex !== idx}
                style={{
                  display: activeIndex === idx ? 'flex' : 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--c-red, #f35d3b)', letterSpacing: '0.1em' }}>
                    {srv.number}
                  </span>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8b9298' }}>
                    Service
                  </span>
                </div>
                <h2 className="ServicesShowcase-module__RU0Ola__cardTitle">{srv.title}</h2>
                <p className="ServicesShowcase-module__RU0Ola__cardBody">{srv.heroIntro}</p>
                <Link
                  className="ServicesShowcase-module__RU0Ola__cardButton"
                  data-page-label={srv.title}
                  href={`/services/${srv.slug}`}
                >
                  Explore service
                  <span className="sr-only"> about {srv.title}</span>
                  <span aria-hidden="true" style={{ marginLeft: '0.4rem' }}>→</span>
                </Link>
              </article>
            ))}
          </div>

          {/* Right Case Column */}
          <ul className="ServicesShowcase-module__RU0Ola__column ServicesShowcase-module__RU0Ola__columnRight">
            {SERVICES.map((srv, idx) => (
              <li
                key={srv.slug}
                className="ServicesShowcase-module__RU0Ola__slot"
                style={{
                  opacity: activeIndex === idx ? 1 : 0,
                  transform: `translateY(${(idx - activeIndex) * 20}px)`,
                  transition: 'opacity 0.4s ease, transform 0.4s ease',
                  pointerEvents: activeIndex === idx ? 'auto' : 'none',
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

        {/* Tab Controls */}
        <div
          className="ServicesShowcase-module__RU0Ola__tabs"
          role="tablist"
          aria-label="Services list"
        >
          {SERVICES.map((srv, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={srv.slug}
                type="button"
                role="tab"
                id={`service-tab-${srv.slug}`}
                aria-controls={`service-panel-${srv.slug}`}
                aria-selected={isActive}
                className="ServicesShowcase-module__RU0Ola__tab"
                data-active={isActive ? '' : undefined}
                onClick={() => setActiveIndex(idx)}
              >
                <span className="ServicesShowcase-module__RU0Ola__tabIndex">
                  {srv.number}
                </span>
                <span className="ServicesShowcase-module__RU0Ola__tabLabel">
                  {srv.tabLabel}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* How We Work Section */}
      <section className="HowWeWork-module__kq1Iga__section" data-node-id="43:276">
        <h2 className="HowWeWork-module__kq1Iga__heading">How we work</h2>
        <ol className="HowWeWork-module__kq1Iga__list">
          <li className="HowWeWork-module__kq1Iga__item">
            <div className="HowWeWork-module__kq1Iga__dragLayer">
              <div className="HowWeWork-module__kq1Iga__card" data-stack-card="">
                <svg
                  className="ScrollRibbon-module__wSfOTW__svg"
                  aria-hidden="true"
                  focusable="false"
                  preserveAspectRatio="none"
                  data-ribbon=""
                />
                <span className="HowWeWork-module__kq1Iga__number">01</span>
                <div className="HowWeWork-module__kq1Iga__end">
                  <h3 className="HowWeWork-module__kq1Iga__title">Discovery call</h3>
                  <p className="HowWeWork-module__kq1Iga__body">
                    30 free minutes to scope your goals, system architecture, and timeline.
                  </p>
                </div>
              </div>
            </div>
          </li>
          <li className="HowWeWork-module__kq1Iga__item">
            <div className="HowWeWork-module__kq1Iga__dragLayer">
              <div className="HowWeWork-module__kq1Iga__card" data-stack-card="">
                <svg
                  className="ScrollRibbon-module__wSfOTW__svg"
                  aria-hidden="true"
                  focusable="false"
                  preserveAspectRatio="none"
                  data-ribbon=""
                />
                <span className="HowWeWork-module__kq1Iga__number">02</span>
                <div className="HowWeWork-module__kq1Iga__end">
                  <h3 className="HowWeWork-module__kq1Iga__title">Architecture & Design</h3>
                  <p className="HowWeWork-module__kq1Iga__body">
                    System blueprints, wireframes, data flows, and interactive prototypes.
                  </p>
                </div>
              </div>
            </div>
          </li>
          <li className="HowWeWork-module__kq1Iga__item">
            <div className="HowWeWork-module__kq1Iga__dragLayer">
              <div className="HowWeWork-module__kq1Iga__card" data-stack-card="">
                <svg
                  className="ScrollRibbon-module__wSfOTW__svg"
                  aria-hidden="true"
                  focusable="false"
                  preserveAspectRatio="none"
                  data-ribbon=""
                />
                <span className="HowWeWork-module__kq1Iga__number">03</span>
                <div className="HowWeWork-module__kq1Iga__end">
                  <h3 className="HowWeWork-module__kq1Iga__title">Build & Integration</h3>
                  <p className="HowWeWork-module__kq1Iga__body">
                    Production code, API integrations, agent pipelines, test coverage, and responsive polish.
                  </p>
                </div>
              </div>
            </div>
          </li>
          <li className="HowWeWork-module__kq1Iga__item">
            <div className="HowWeWork-module__kq1Iga__dragLayer">
              <div className="HowWeWork-module__kq1Iga__card" data-stack-card="">
                <svg
                  className="ScrollRibbon-module__wSfOTW__svg"
                  aria-hidden="true"
                  focusable="false"
                  preserveAspectRatio="none"
                  data-ribbon=""
                />
                <span className="HowWeWork-module__kq1Iga__number">04</span>
                <div className="HowWeWork-module__kq1Iga__end">
                  <h3 className="HowWeWork-module__kq1Iga__title">Launch & Scaling</h3>
                  <p className="HowWeWork-module__kq1Iga__body">
                    Go-live, cloud configuration, CI/CD, team handover, and ongoing monitoring.
                  </p>
                </div>
              </div>
            </div>
          </li>
        </ol>
      </section>

      <CtaBand spacing="page" />
      <Footer />
    </main>
  );
}
