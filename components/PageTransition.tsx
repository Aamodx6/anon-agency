'use client';

import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useLayoutEffect,
} from 'react';
import { useRouter, usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMenu } from '@/context/MenuContext';
import { registerGsap, prefersReducedMotion, EASE } from '@/src/animations/tokens';
import { NAV_LINKS } from './MenuOverlay';

export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const { close, lenisRef, lockScroll, unlockScroll } = useMenu();

  const [label, setLabel] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const coverImgRef = useRef<HTMLImageElement>(null);

  const modeRef = useRef<'sheet' | 'cover'>('sheet');
  const pendingPathRef = useRef<string | null>(null);
  const pendingHashRef = useRef<string>('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const isLockedRef = useRef(false);

  // Responsive font size calculation for large label
  useLayoutEffect(() => {
    const el = labelRef.current;
    const parent = el?.parentElement;
    if (!el || !parent || !label) return;

    const resize = () => {
      el.style.fontSize = '';
      if (getComputedStyle(el).whiteSpace !== 'nowrap') return;
      const parentWidth = parent.clientWidth;
      const scrollWidth = el.scrollWidth;
      if (scrollWidth > parentWidth && parentWidth > 0) {
        const currentSize = parseFloat(getComputedStyle(el).fontSize);
        el.style.fontSize = `${Math.max(20, Math.floor((parentWidth / scrollWidth) * currentSize * 0.99))}px`;
      }
    };

    resize();
    let active = true;
    document.fonts?.ready?.then(() => active && resize());
    return () => {
      active = false;
    };
  }, [label]);

  const unlock = useCallback(() => {
    if (isLockedRef.current) {
      isLockedRef.current = false;
      unlockScroll?.();
    }
  }, [unlockScroll]);

  const animateCoverOut = useCallback((coverEl: HTMLElement, onComplete: () => void) => {
    const startTime = performance.now();
    const fallbackFade = () =>
      gsap.to(coverEl, { autoAlpha: 0, duration: 0.4, ease: 'power2.out', onComplete });

    const checkHero = () => {
      const hero = document.querySelector<HTMLElement>('[data-case-hero], [data-project-transition-hero]');
      if (hero) {
        ScrollTrigger.refresh();
        const heroRect = hero.getBoundingClientRect();
        if (heroRect.width < 1 || heroRect.height < 1) {
          fallbackFade();
          return;
        }

        gsap.to(coverEl, {
          top: heroRect.top,
          left: heroRect.left,
          width: heroRect.width,
          height: heroRect.height,
          borderRadius: getComputedStyle(hero).borderRadius,
          duration: 0.75,
          ease: EASE.inOut,
          onComplete: () => {
            const heroImg = hero.querySelector('img');
            const finish = () =>
              gsap.to(coverEl, { autoAlpha: 0, duration: 0.25, ease: 'none', onComplete });
            if (!heroImg || (heroImg.complete && heroImg.naturalWidth > 0)) {
              finish();
              return;
            }
            let done = false;
            const onImg = () => {
              if (done) return;
              done = true;
              heroImg.removeEventListener('load', onImg);
              heroImg.removeEventListener('error', onImg);
              clearTimeout(timer);
              finish();
            };
            const timer = setTimeout(onImg, 2000);
            heroImg.addEventListener('load', onImg);
            heroImg.addEventListener('error', onImg);
          },
        });
        return;
      }

      if (performance.now() - startTime > 1500) {
        fallbackFade();
      } else {
        animFrameRef.current = requestAnimationFrame(checkHero);
      }
    };

    checkHero();
  }, []);

  const completeTransition = useCallback(() => {
    const root = rootRef.current;
    const sheet = sheetRef.current;
    const cover = coverRef.current;
    if (!root || !sheet) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (!pendingHashRef.current) {
      lenisRef?.current?.scrollTo?.(0, { immediate: true, force: true });
      window.scrollTo(0, 0);
    }
    unlock();

    const cleanup = () => {
      root.dataset.active = 'false';
      root.dataset.mode = 'sheet';
      modeRef.current = 'sheet';
      gsap.set(sheet, { scaleY: 0 });
      if (cover) {
        gsap.set(cover, { clearProps: 'all' });
        coverImgRef.current?.removeAttribute('src');
      }
      ScrollTrigger.refresh();
    };

    if (prefersReducedMotion()) {
      cleanup();
    } else if (modeRef.current === 'cover' && cover) {
      animateCoverOut(cover, cleanup);
    } else {
      gsap
        .timeline({ onComplete: cleanup })
        .to(labelRef.current, { opacity: 0, duration: 0.28, ease: 'power2.in' }, 0)
        .fromTo(
          sheet,
          { scaleY: 1, transformOrigin: '50% 100%' },
          { scaleY: 0, duration: 0.75, ease: EASE.inOut },
          0.12
        );
    }
  }, [lenisRef, animateCoverOut, unlock]);

  const startTransition = useCallback(
    (pathnameWithQuery: string, hash: string, targetLabel: string, anchorEl?: HTMLAnchorElement | null) => {
      const root = rootRef.current;
      const sheet = sheetRef.current;
      const cover = coverRef.current;
      const coverImg = coverImgRef.current;

      if (!root || !sheet) {
        router.push(pathnameWithQuery + hash);
        return;
      }

      close();

      const flipImg =
        anchorEl?.dataset.caseFlip !== undefined
          ? (anchorEl.querySelector<HTMLImageElement>('img[data-flip-img]') ||
            anchorEl.querySelector<HTMLImageElement>('img'))
          : null;
      const isCover = !!(cover && coverImg && flipImg && !prefersReducedMotion());

      modeRef.current = isCover ? 'cover' : 'sheet';
      root.dataset.mode = modeRef.current;
      setLabel(targetLabel);
      pendingPathRef.current = pathnameWithQuery.split('?')[0];
      pendingHashRef.current = hash;

      if (!isLockedRef.current) {
        isLockedRef.current = true;
        lockScroll?.();
      }
      root.dataset.active = 'true';

      const navigate = () => {
        timeoutRef.current = setTimeout(() => {
          pendingPathRef.current = null;
          completeTransition();
        }, 6000);
        router.push(pathnameWithQuery + hash);
      };

      if (isCover && cover && coverImg && flipImg) {
        const rect = flipImg.getBoundingClientRect();
        coverImg.src = flipImg.currentSrc || flipImg.src;
        gsap.set(cover, {
          autoAlpha: 1,
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          borderRadius: getComputedStyle(flipImg.parentElement || flipImg).borderRadius,
        });
        gsap.to(cover, {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: Math.max(window.innerHeight, sheet.offsetHeight || 0),
          borderRadius: 0,
          duration: 0.7,
          ease: EASE.inOut,
          onComplete: navigate,
        });
        return;
      }

      if (prefersReducedMotion()) {
        gsap.set(sheet, { scaleY: 1, transformOrigin: '50% 0%' });
        gsap.set(labelRef.current, { opacity: 1, yPercent: 0 });
        navigate();
        return;
      }

      // Awake signature sheet wipe-in timeline
      gsap
        .timeline({ onComplete: navigate })
        .fromTo(
          sheet,
          { scaleY: 0, transformOrigin: '50% 0%' },
          { scaleY: 1, duration: 0.7, ease: EASE.inOut },
          0
        )
        .fromTo(
          labelRef.current,
          { yPercent: 110, opacity: 1 },
          { yPercent: 0, duration: 0.6, ease: EASE.landing },
          0.22
        );
    },
    [close, lockScroll, completeTransition, router]
  );

  // Intercept all internal navigation link clicks
  useEffect(() => {
    registerGsap();

    const handleClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }

      const anchor = (e.target as HTMLElement)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!anchor || anchor.dataset.noTransition !== undefined || anchor.hasAttribute('download')) {
        return;
      }
      if (anchor.target && anchor.target !== '_self') {
        return;
      }

      let targetUrl: URL;
      try {
        targetUrl = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }

      if (
        targetUrl.origin === window.location.origin &&
        targetUrl.pathname !== window.location.pathname &&
        !targetUrl.pathname.startsWith('/studio')
      ) {
        e.preventDefault();
        e.stopPropagation();

        const pageLabel =
          anchor.dataset.pageLabel ||
          NAV_LINKS.find((item) => item.href === targetUrl.pathname)?.label ||
          (targetUrl.pathname === '/'
            ? 'Home'
            : (targetUrl.pathname.split('/').filter(Boolean).pop() ?? '')
                .replace(/-/g, ' ')
                .replace(/\b\w/g, (char) => char.toUpperCase()));

        startTransition(targetUrl.pathname + targetUrl.search, targetUrl.hash, pageLabel, anchor);
      }
    };

    window.addEventListener('click', handleClick, true);
    return () => {
      window.removeEventListener('click', handleClick, true);
    };
  }, [startTransition]);

  // When pathname changes after navigation, animate the exit
  useLayoutEffect(() => {
    if (pendingPathRef.current === null || pendingPathRef.current !== pathname) return;
    pendingPathRef.current = null;
    const raf = requestAnimationFrame(() => requestAnimationFrame(completeTransition));
    return () => cancelAnimationFrame(raf);
  }, [pathname, completeTransition]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      unlock();
    };
  }, [unlock]);

  return (
    <div
      ref={rootRef}
      className="PageTransition-module__nKAAuq__root"
      data-active="false"
      data-mode="sheet"
      aria-hidden="true"
    >
      <div
        ref={sheetRef}
        className="PageTransition-module__nKAAuq__sheet"
        style={{
          transformOrigin: '50% 100%',
          transform: 'scale(1, 0)',
        }}
      />
      <div className="PageTransition-module__nKAAuq__labelMask">
        <span
          ref={labelRef}
          className="PageTransition-module__nKAAuq__label"
          style={
            {
              '--label-chars': label.length || 8,
              opacity: 0,
              transform: 'translate(0px, 0px)',
            } as React.CSSProperties
          }
        >
          {label}
        </span>
      </div>
      <div ref={coverRef} className="PageTransition-module__nKAAuq__cover">
        <img ref={coverImgRef} className="PageTransition-module__nKAAuq__coverImg" alt="" />
      </div>
    </div>
  );
}
