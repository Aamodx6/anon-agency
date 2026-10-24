'use client';

import React from 'react';
import Link from 'next/link';
import { useMenu } from '../context/MenuContext';
import { Navbar } from './Navbar';

export function MenuOverlay() {
  const { isOpen, close } = useMenu();

  return (
    <div
      id="site-menu"
      className="MenuOverlay-module__wz4T_a__overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      aria-hidden={!isOpen}
      inert={!isOpen}
      data-open={isOpen ? 'true' : 'false'}
      data-visible={isOpen ? 'true' : 'false'}
      data-node-id="55:247"
    >
      <div className="MenuOverlay-module__wz4T_a__stage">
        <svg
          className="GlyphRibbon-module___k1tSG__svg"
          aria-hidden="true"
          focusable="false"
          preserveAspectRatio="none"
        >
          <g>
            <g>
              <path className="GlyphRibbon-module___k1tSG__path" />
            </g>
          </g>
        </svg>

        <div className="MenuOverlay-module__wz4T_a__bar">
          <Navbar variant="hero" />
        </div>

        <nav className="MenuOverlay-module__wz4T_a__nav" aria-label="Primary">
          <ul>
            <li>
              <Link href="/" className="MenuOverlay-module__wz4T_a__navLink" onClick={close}>
                <span className="MenuOverlay-module__wz4T_a__index" aria-hidden="true">00</span>
                <span className="MenuOverlay-module__wz4T_a__diamond" aria-hidden="true" />
                <span className="MenuOverlay-module__wz4T_a__rule" aria-hidden="true" />
                <span className="MenuOverlay-module__wz4T_a__labelMask">
                  <span className="MenuOverlay-module__wz4T_a__label">Home</span>
                </span>
              </Link>
            </li>
            <li>
              <Link href="/services" className="MenuOverlay-module__wz4T_a__navLink" onClick={close}>
                <span className="MenuOverlay-module__wz4T_a__index" aria-hidden="true">01</span>
                <span className="MenuOverlay-module__wz4T_a__diamond" aria-hidden="true" />
                <span className="MenuOverlay-module__wz4T_a__rule" aria-hidden="true" />
                <span className="MenuOverlay-module__wz4T_a__labelMask">
                  <span className="MenuOverlay-module__wz4T_a__label">Services</span>
                </span>
              </Link>
            </li>
            <li>
              <Link href="/projects" className="MenuOverlay-module__wz4T_a__navLink" onClick={close}>
                <span className="MenuOverlay-module__wz4T_a__index" aria-hidden="true">02</span>
                <span className="MenuOverlay-module__wz4T_a__diamond" aria-hidden="true" />
                <span className="MenuOverlay-module__wz4T_a__rule" aria-hidden="true" />
                <span className="MenuOverlay-module__wz4T_a__labelMask">
                  <span className="MenuOverlay-module__wz4T_a__label">Projects</span>
                </span>
              </Link>
            </li>
            <li>
              <Link href="/contacts" className="MenuOverlay-module__wz4T_a__navLink" onClick={close}>
                <span className="MenuOverlay-module__wz4T_a__index" aria-hidden="true">03</span>
                <span className="MenuOverlay-module__wz4T_a__diamond" aria-hidden="true" />
                <span className="MenuOverlay-module__wz4T_a__rule" aria-hidden="true" />
                <span className="MenuOverlay-module__wz4T_a__labelMask">
                  <span className="MenuOverlay-module__wz4T_a__label">Contacts</span>
                </span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="MenuOverlay-module__wz4T_a__meta">
          <p className="MenuOverlay-module__wz4T_a__sayHello">
            <span className="MenuOverlay-module__wz4T_a__sayHelloLabel">Say hello:</span>
            <a href="mailto:contact@anonagency.dev" className="MenuOverlay-module__wz4T_a__metaLink">
              contact@anonagency.dev
            </a>
          </p>
          <div className="MenuOverlay-module__wz4T_a__socials">
            <a
              href="https://www.upwork.com/agencies/1654808563442126848/"
              className="MenuOverlay-module__wz4T_a__metaLink"
              target="_blank"
              rel="noreferrer noopener"
            >
              UPWORK
            </a>
            <a
              href="https://www.linkedin.com/company/awakeagency/"
              className="MenuOverlay-module__wz4T_a__metaLink"
              target="_blank"
              rel="noreferrer noopener"
            >
              LINKEDIN
            </a>
          </div>
        </div>
      </div>
      <div className="MenuOverlay-module__wz4T_a__gutter" aria-hidden="true" />
    </div>
  );
}
