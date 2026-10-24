'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useMenu } from '../context/MenuContext';
import { Navbar } from './Navbar';
import { animateMenuOverlay } from '@/src/animations/menu';

export function MenuOverlay() {
  const { isOpen, close } = useMenu();
  const overlayRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const navLinks = Array.from(overlay.querySelectorAll<HTMLElement>('.MenuOverlay-module__wz4T_a__navLink'));
    const ribbonSvg = overlay.querySelector<SVGElement>('.GlyphRibbon-module___k1tSG__svg');

    const anim = animateMenuOverlay({
      overlayEl: overlay,
      navLinks,
      ribbonSvg,
      isOpen,
    });

    return () => {
      anim.kill();
    };
  }, [isOpen]);

  return (
    <div
      ref={overlayRef}
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
      style={{
        display: isOpen ? 'block' : 'none',
      }}
    >
      <div ref={stageRef} className="MenuOverlay-module__wz4T_a__stage">
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
      </div>
    </div>
  );
}
