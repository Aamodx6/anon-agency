'use client';

import React, { Suspense } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BookingEmbed } from '@/components/BookingEmbed';

export default function ContactsPage() {
  return (
    <main id="main">
      <div className="page-module__dZxIWa__navRow">
        <Navbar variant="dev" />
      </div>

      <h1 className="sr-only">Contacts</h1>

      <div className="page-module__dZxIWa__booking">
        <Suspense fallback={<div className="BookingEmbed-module__8slbVa__skeleton" style={{ height: '40rem' }} />}>
          <BookingEmbed />
        </Suspense>
      </div>

      <section className="page-module__dZxIWa__panel">
        <svg
          className="BandScribble-module__QwOmAG__svg"
          data-tone="pink"
          aria-hidden="true"
          focusable="false"
          preserveAspectRatio="none"
        >
          <path
            className="BandScribble-module__QwOmAG__path"
            pathLength="1000"
            style={{ visibility: 'hidden' }}
          />
        </svg>

        <ul className="page-module__dZxIWa__cards">
          <li className="page-module__dZxIWa__card">
            <h2 className="page-module__dZxIWa__cardTitle">Contact us</h2>
            <p className="page-module__dZxIWa__cardBody">
              <a href="mailto:contact@anonagency.dev">contact@anonagency.dev</a>
            </p>
          </li>
          <li className="page-module__dZxIWa__card">
            <h2 className="page-module__dZxIWa__cardTitle">Representative office</h2>
            <p className="page-module__dZxIWa__cardBody">
              <span>Warsaw, Poland</span>
            </p>
          </li>
          <li className="page-module__dZxIWa__card">
            <h2 className="page-module__dZxIWa__cardTitle">Development team</h2>
            <p className="page-module__dZxIWa__cardBody">
              <span>Remote, Europe</span>
            </p>
          </li>
          <li className="page-module__dZxIWa__card">
            <h2 className="page-module__dZxIWa__cardTitle">Working time</h2>
            <p className="page-module__dZxIWa__cardBody">
              <span>08:00–20:00</span>
              <span>(Central European Time)</span>
              <span>Monday–Friday</span>
            </p>
          </li>
        </ul>
      </section>

      <Footer />
    </main>
  );
}
