'use client';

import React, { useEffect, useRef } from 'react';
import { initHeroCoins, HeroCoinsInstance } from '@/src/animations/heroCoins';

export function HeroCoins() {
  const hostRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<HeroCoinsInstance | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const hero = host.closest<HTMLElement>('section') || host.parentElement;
    if (!hero) return;

    const instance = initHeroCoins({
      container: hero,
      floorSelector: '[data-coins-floor]',
      aboveSelector: '[data-coins-above]',
    });

    instanceRef.current = instance;

    return () => {
      instance.destroy();
      instanceRef.current = null;
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className="HeroCoins-module__gZVsqG__host"
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 5,
      }}
    />
  );
}
