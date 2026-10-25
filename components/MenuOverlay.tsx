'use client';

import React, { useLayoutEffect, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useMenu } from '../context/MenuContext';
import { Navbar } from './Navbar';
import { GlyphRibbon } from './GlyphRibbon';
import { EmailLink } from './EmailLink';
import { registerGsap, prefersReducedMotion, EASE } from '@/src/animations/tokens';

export const NAV_LINKS = [
  { index: '00', label: 'Home', href: '/' },
  { index: '01', label: 'Services', href: '/services' },
  { index: '02', label: 'Projects', href: '/projects' },
  { index: '03', label: 'Contacts', href: '/contacts' },
];

export const SOCIAL_LINKS = [
  { label: 'Upwork', href: 'https://www.upwork.com/agencies/1654808563442126848/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/awakeagency/' },
];

export function MenuOverlay() {
  const { isOpen, close, lockScroll, unlockScroll } = useMenu();
  const overlayRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const hasOpenedRef = useRef(false);
  const gutterRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = overlayRef.current;
    if (!el || prefersReducedMotion()) return;
    registerGsap();

    const ctx = gsap.context(() => {
      const bar = el.querySelector('.MenuOverlay-module__wz4T_a__bar');
      const labels = gsap.utils.toArray<HTMLElement>('.MenuOverlay-module__wz4T_a__label', el);
      const metaLines = gsap.utils.toArray<HTMLElement>(
        '.MenuOverlay-module__wz4T_a__index, .MenuOverlay-module__wz4T_a__diamond, .MenuOverlay-module__wz4T_a__rule',
        el
      );
      const meta = el.querySelector('.MenuOverlay-module__wz4T_a__meta');

      gsap.set(el, { height: 0 });
      gsap.set(labels, { yPercent: 110 });
      gsap.set([bar, ...metaLines, meta], { opacity: 0 });

      const tl = gsap.timeline({ paused: true, defaults: { ease: EASE.landing } });
      tl.fromTo(
        el,
        { height: 0 },
        {
          height: () => {
            const prev = el.style.height;
            el.style.height = '';
            const h = el.getBoundingClientRect().height;
            el.style.height = prev;
            return h;
          },
          duration: 0.7,
          ease: EASE.panel,
        }
      )
        .fromTo(labels, { yPercent: 110 }, { yPercent: 0, duration: 0.6, stagger: 0.07 }, 0.35)
        .fromTo(metaLines, { opacity: 0 }, { opacity: 1, duration: 0.4, stagger: 0.02 }, 0.45)
        .fromTo(meta, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, 0.6)
        .fromTo(bar, { opacity: 0 }, { opacity: 1, duration: 0.32 }, 0.66);

      tl.eventCallback('onReverseComplete', () => {
        el.dataset.visible = 'false';
      });

      tlRef.current = tl;
    }, el);

    return () => {
      ctx.revert();
      tlRef.current = null;
    };
  }, []);

  useEffect(() => {
    const el = overlayRef.current;
    const gutter = gutterRef.current;
    if (!el || !gutter) return;

    const ro = new ResizeObserver(() => {
      const rect = el.getBoundingClientRect();
      const topOffset = el.dataset.barAligned === 'true' ? 0 : rect.top;
      gutter.style.height = `${rect.bottom + topOffset}px`;
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;
    const tl = tlRef.current;

    if (isOpen) {
      hasOpenedRef.current = true;
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      el.dataset.visible = 'true';

      const heroNav = document.querySelector('#main [data-site-nav="hero"]')?.getBoundingClientRect();
      const menuNav = el.querySelector('[data-site-nav]')?.getBoundingClientRect();
      el.dataset.barAligned = String(
        !!heroNav &&
          !!menuNav &&
          Math.abs(heroNav.top - menuNav.top) < 1 &&
          Math.abs(heroNav.left - menuNav.left) < 1
      );

      lockScroll();
      tl?.timeScale(1).play();
      el.querySelector<HTMLAnchorElement>('a[href]')?.focus({ preventScroll: true });

      return () => {
        unlockScroll();
      };
    }

    previousFocusRef.current?.focus({ preventScroll: true });
    previousFocusRef.current = null;

    if (hasOpenedRef.current) {
      if (!tl) {
        el.dataset.visible = 'false';
        return;
      }
      tl.timeScale(1.45).reverse();
    }
  }, [isOpen, lockScroll, unlockScroll]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
        return;
      }
      if (e.key !== 'Tab') return;

      const focusables = overlayRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus({ preventScroll: true });
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus({ preventScroll: true });
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, close]);

  return (
    <>
      <div
        id="site-menu"
        ref={overlayRef}
        className="MenuOverlay-module__wz4T_a__overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!isOpen}
        inert={!isOpen ? true : undefined}
        data-open={isOpen ? 'true' : 'false'}
        data-visible="false"
        data-node-id="55:247"
      >
        <div className="MenuOverlay-module__wz4T_a__stage">
          <GlyphRibbon play={isOpen} drift="auto" />
          <div className="MenuOverlay-module__wz4T_a__bar">
            <Navbar variant="hero" />
          </div>

          <nav className="MenuOverlay-module__wz4T_a__nav" aria-label="Primary">
            <ul>
              {NAV_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="MenuOverlay-module__wz4T_a__navLink"
                    data-page-label={item.label}
                    onClick={close}
                  >
                    <span className="MenuOverlay-module__wz4T_a__index" aria-hidden="true">
                      {item.index}
                    </span>
                    <span className="MenuOverlay-module__wz4T_a__diamond" aria-hidden="true" />
                    <span className="MenuOverlay-module__wz4T_a__rule" aria-hidden="true" />
                    <span className="MenuOverlay-module__wz4T_a__labelMask">
                      <span className="MenuOverlay-module__wz4T_a__label">{item.label}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="MenuOverlay-module__wz4T_a__meta">
            <p className="MenuOverlay-module__wz4T_a__sayHello">
              <span className="MenuOverlay-module__wz4T_a__sayHelloLabel">Say hello:</span>
              <EmailLink className="MenuOverlay-module__wz4T_a__metaLink" reveal="inline" />
            </p>
            <div className="MenuOverlay-module__wz4T_a__socials">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="MenuOverlay-module__wz4T_a__metaLink"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {social.label.toUpperCase()}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div ref={gutterRef} className="MenuOverlay-module__wz4T_a__gutter" aria-hidden="true" />
    </>
  );
}
