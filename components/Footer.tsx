'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { CookieSettingsButton } from './ConsentBanner';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="Footer-module__yg9ahW__footer" data-node-id="39:205">
      <div className="Footer-module__yg9ahW__inner">
        <div className="Footer-module__yg9ahW__top">
          <Link href="/" className="Footer-module__yg9ahW__logoLink" aria-label="Anon, home">
            <Logo />
          </Link>

          <nav className="Footer-module__yg9ahW__column" aria-label="Footer">
            <ul>
              <li>
                <Link className="Footer-module__yg9ahW__link" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="Footer-module__yg9ahW__link" href="/services">
                  Services
                </Link>
              </li>
              <li>
                <Link className="Footer-module__yg9ahW__link" href="/projects">
                  Projects
                </Link>
              </li>
              <li>
                <Link className="Footer-module__yg9ahW__link" href="/contacts">
                  Contacts
                </Link>
              </li>
            </ul>
          </nav>

          <div className="Footer-module__yg9ahW__column">
            <ul>
              <li>
                <a
                  href="https://www.linkedin.com/company/awakeagency/"
                  className="Footer-module__yg9ahW__link"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://www.upwork.com/agencies/1654808563442126848/"
                  className="Footer-module__yg9ahW__link"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Upwork
                </a>
              </li>
            </ul>
          </div>

          <div className="Footer-module__yg9ahW__info">
            <div className="Footer-module__yg9ahW__infoBlock">
              <span className="Footer-module__yg9ahW__infoLabel">Contact us</span>
              <a
                href="mailto:contact@anonagency.dev"
                className="Footer-module__yg9ahW__infoValue"
                aria-label="Copy to clipboard: contact@anonagency.dev"
              >
                contact@anonagency.dev
              </a>
            </div>
            <div className="Footer-module__yg9ahW__infoBlock">
              <span className="Footer-module__yg9ahW__infoLabel">Based in</span>
              <span className="Footer-module__yg9ahW__infoValue">
                <span>Warsaw</span>
              </span>
            </div>
          </div>
        </div>

        <div className="Footer-module__yg9ahW__bottom">
          <p className="Footer-module__yg9ahW__copyright">© Anon 2026. All rights reserved.</p>
          <nav className="Footer-module__yg9ahW__legal" aria-label="Legal">
            <ul>
              <li>
                <Link className="Footer-module__yg9ahW__legalLink" href="/privacy">
                  Privacy
                </Link>
              </li>
              <li>
                <Link className="Footer-module__yg9ahW__legalLink" href="/cookies">
                  Cookies
                </Link>
              </li>
              <li>
                <Link className="Footer-module__yg9ahW__legalLink" href="/terms">
                  Terms
                </Link>
              </li>
              <li>
                <CookieSettingsButton className="Footer-module__yg9ahW__legalLink" />
              </li>
            </ul>
          </nav>

          <button
            type="button"
            className="Footer-module__yg9ahW__backToTop"
            data-arrow-host=""
            onClick={scrollToTop}
          >
            Back to top
            <span
              className="SwapArrow-module__0B2EzW__swap"
              data-dir="up"
              style={{ width: '14px', height: '14px' }}
              aria-hidden="true"
            >
              <span className="SwapArrow-module__0B2EzW__a">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                  <g transform="rotate(-45 12 12)" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17 17 7" />
                    <path d="M8 7h9v9" />
                  </g>
                </svg>
              </span>
              <span className="SwapArrow-module__0B2EzW__b">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                  <g transform="rotate(-45 12 12)" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17 17 7" />
                    <path d="M8 7h9v9" />
                  </g>
                </svg>
              </span>
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
