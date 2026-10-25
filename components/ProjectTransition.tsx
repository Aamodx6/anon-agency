'use client';

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
} from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface ProjectTransitionContextValue {
  start: (card: HTMLElement, href: string) => void;
}

interface ActiveTransition {
  overlay: HTMLDivElement;
  image: HTMLElement;
  href: string;
}

const ProjectTransitionContext =
  createContext<ProjectTransitionContextValue | null>(null);
const EASING = 'cubic-bezier(0.76, 0, 0.24, 1)';

function makeOverlay(source: HTMLElement, rect: DOMRect) {
  const overlay = document.createElement('div');
  const image = source.cloneNode(true) as HTMLElement;
  const computed = window.getComputedStyle(source);

  overlay.setAttribute('aria-hidden', 'true');
  Object.assign(overlay.style, {
    position: 'fixed',
    inset: '0',
    zIndex: '2',
    overflow: 'hidden',
    pointerEvents: 'none',
  });
  Object.assign(image.style, {
    position: 'absolute',
    left: `${rect.left}px`,
    top: `${rect.top}px`,
    display: 'block',
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    aspectRatio: 'auto',
    overflow: 'hidden',
    borderRadius: computed.borderRadius,
    willChange: 'auto',
  });

  const clonedImages = Array.from(image.querySelectorAll<HTMLImageElement>('img'));
  clonedImages.forEach((clonedImage) => {
    const originalSrc = clonedImage.dataset.transitionSrc;
    if (originalSrc) clonedImage.src = originalSrc;
    clonedImage.removeAttribute('srcset');
    clonedImage.sizes = `${window.innerWidth}px`;
    clonedImage.loading = 'eager';
    clonedImage.fetchPriority = 'high';
    clonedImage.style.imageRendering = 'auto';
  });

  const hoverImage = image.querySelector<HTMLElement>(
    '[class*="hoverImage"]'
  );
  const sourceHoverImage = source.querySelector<HTMLElement>(
    '[class*="hoverImage"]'
  );
  if (hoverImage && sourceHoverImage) {
    hoverImage.style.opacity = window.getComputedStyle(sourceHoverImage).opacity;
  }

  overlay.appendChild(image);
  document.body.appendChild(overlay);
  return { overlay, image, clonedImages };
}

async function waitForImages(images: HTMLImageElement[]) {
  await Promise.all(
    images.map(async (image) => {
      if (image.complete && image.naturalWidth > 0) return;
      await image.decode();
    })
  );
}

async function matchOverlayToHero(overlayImage: HTMLElement, hero: HTMLElement) {
  const heroImage = hero.querySelector<HTMLImageElement>('img');
  if (!heroImage) return false;

  const image = heroImage.cloneNode(true) as HTMLImageElement;
  image.removeAttribute('srcset');
  image.sizes = `${window.innerWidth}px`;
  image.loading = 'eager';
  image.fetchPriority = 'high';
  image.style.imageRendering = 'auto';
  await waitForImages([image]);
  overlayImage.replaceChildren(image);
  return true;
}

function animate(
  element: HTMLElement,
  keyframes: Keyframe[],
  duration: number,
  delay = 0
) {
  const animation = element.animate(keyframes, {
    duration,
    delay,
    easing: EASING,
    fill: 'forwards',
  });
  return animation.finished.then(
    () => undefined,
    () => undefined
  );
}

function animateDetailContent() {
  const title = document.querySelector<HTMLElement>(
    '[data-project-transition-title]'
  );
  const meta = document.querySelector<HTMLElement>(
    '[data-project-transition-meta]'
  );
  const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ? 200
    : 500;

  title?.animate(
    [
      { opacity: 0, transform: 'translate3d(0, 24px, 0)' },
      { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    ],
    { duration, easing: EASING, fill: 'both' }
  );
  meta?.animate(
    [
      { opacity: 0, transform: 'translate3d(0, 24px, 0)' },
      { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    ],
    {
      duration,
      delay: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 0
        : 80,
      easing: EASING,
      fill: 'both',
    }
  );
}

export function ProjectTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const active = useRef<ActiveTransition | null>(null);
  const previousPathname = useRef(pathname);

  const start = useCallback(
    (card: HTMLElement, href: string) => {
      const source = card.querySelector<HTMLElement>('[class*="image"]');
      if (!source || active.current) {
        router.push(href);
        return;
      }

      const rect = source.getBoundingClientRect();
      if (!rect.width || !rect.height) {
        router.push(href);
        return;
      }

      const { overlay, image, clonedImages } = makeOverlay(source, rect);
      active.current = {
        overlay,
        image,
        href: new URL(href, window.location.href).pathname,
      };
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      void waitForImages(clonedImages).then(
        () => {
          if (active.current?.image !== image) return;
          const from = {
            left: `${rect.left}px`,
            top: `${rect.top}px`,
            width: `${rect.width}px`,
            height: `${rect.height}px`,
            borderRadius: window.getComputedStyle(source).borderRadius,
          };
          const to = {
            left: '0px',
            top: '0px',
            width: `${viewportWidth}px`,
            height: `${viewportHeight}px`,
            borderRadius: '0px',
          };

          if (reducedMotion) {
            overlay.style.opacity = '0';
            image.style.left = to.left;
            image.style.top = to.top;
            image.style.width = to.width;
            image.style.height = to.height;
            image.style.borderRadius = to.borderRadius;
            void animate(overlay, [{ opacity: 0 }, { opacity: 1 }], 100).then(
              () => router.push(href)
            );
            return;
          }

          void animate(
            image,
            [{ ...from }, { ...to }],
            550
          ).then(() => router.push(href));
        },
        () => {
          overlay.remove();
          active.current = null;
          router.push(href);
        }
      );
    },
    [router]
  );

  useLayoutEffect(() => {
    const previous = previousPathname.current;
    previousPathname.current = pathname;
    if (previous === pathname) {
      if (/^\/projects\/[^/]+\/?$/.test(pathname)) animateDetailContent();
      return;
    }

    const transition = active.current;
    if (transition && pathname === transition.href) {
      animateDetailContent();
      const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      const findHero = () =>
        document.querySelector<HTMLElement>(
          '[data-project-transition-hero]'
        );
      const deadline = performance.now() + 1000;
      const waitForHero = (): Promise<HTMLElement | null> =>
        new Promise((resolve) => {
          const check = () => {
            const hero = findHero();
            if (hero || performance.now() >= deadline) {
              resolve(hero);
              return;
            }
            requestAnimationFrame(check);
          };
          check();
        });

      void waitForHero().then((hero) => {
        if (active.current !== transition) return;
        if (!hero) {
          void animate(transition.overlay, [{ opacity: 1 }, { opacity: 0 }], 300)
            .then(() => transition.overlay.remove())
            .then(() => {
              active.current = null;
            });
          return;
        }

        const originalOpacity = hero.style.opacity;
        hero.style.opacity = '0';
        const heroRect = hero.getBoundingClientRect();
        const heroRadius = window.getComputedStyle(hero).borderRadius;
        if (reducedMotion) {
          void animate(transition.overlay, [{ opacity: 1 }, { opacity: 0 }], 200)
            .then(() => {
              transition.overlay.remove();
              hero.style.opacity = originalOpacity;
              active.current = null;
            });
          return;
        }

        void matchOverlayToHero(transition.image, hero).then(
          (matched) => {
            if (active.current !== transition) return;
            if (!matched) {
              void animate(
                transition.overlay,
                [{ opacity: 1 }, { opacity: 0 }],
                300
              ).then(() => {
                transition.overlay.remove();
                hero.style.opacity = originalOpacity;
                active.current = null;
              });
              return;
            }

            void animate(
              transition.image,
              [
                {
                  left: '0px',
                  top: '0px',
                  width: `${window.innerWidth}px`,
                  height: `${window.innerHeight}px`,
                  borderRadius: '0px',
                },
                {
                  left: `${heroRect.left}px`,
                  top: `${heroRect.top}px`,
                  width: `${heroRect.width}px`,
                  height: `${heroRect.height}px`,
                  borderRadius: heroRadius,
                },
              ],
              650
            ).then(() => {
              transition.overlay.remove();
              hero.style.opacity = originalOpacity;
              active.current = null;
            });
          },
          () => {
            void animate(
              transition.overlay,
              [{ opacity: 1 }, { opacity: 0 }],
              300
            ).then(() => {
              transition.overlay.remove();
              hero.style.opacity = originalOpacity;
              active.current = null;
            });
          }
        );
      });
      return;
    }

    if (transition) {
      void animate(transition.overlay, [{ opacity: 1 }, { opacity: 0 }], 300)
        .then(() => transition.overlay.remove())
        .then(() => {
          active.current = null;
        });
      return;
    }

    if (/^\/projects\/[^/]+\/?$/.test(pathname)) {
      animateDetailContent();
    }
  }, [pathname]);

  useLayoutEffect(() => {
    const onPopState = () => {
      if (
        !/^\/projects\/[^/]+\/?$/.test(previousPathname.current) ||
        window.location.pathname.replace(/\/$/, '') !== '/projects'
      ) {
        return;
      }
      const overlay = document.createElement('div');
      const detailPage = document.querySelector<HTMLElement>(
        '.page-module__y7JjWq__page'
      );
      Object.assign(overlay.style, {
        position: 'fixed',
        inset: '0',
        zIndex: '2',
        pointerEvents: 'none',
        backgroundColor: detailPage
          ? window.getComputedStyle(detailPage).backgroundColor
          : 'transparent',
      });
      document.body.appendChild(overlay);
      const duration = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
        ? 200
        : 300;
      void animate(
        overlay,
        [{ opacity: 1 }, { opacity: 0 }],
        duration
      ).then(() => overlay.remove());
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  return (
    <ProjectTransitionContext.Provider value={{ start }}>
      {children}
    </ProjectTransitionContext.Provider>
  );
}

export function useProjectTransition() {
  const context = useContext(ProjectTransitionContext);
  if (!context) {
    throw new Error(
      'useProjectTransition must be used within ProjectTransitionProvider'
    );
  }
  return context;
}
