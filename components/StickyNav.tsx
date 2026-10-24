'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';

export function StickyNav() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky navbar after scrolling past hero (approx 70% viewport height)
      const threshold = window.innerHeight * 0.7;
      setShown(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="StickyNav-module__hNdvsq__wrap"
      data-shown={shown ? 'true' : 'false'}
      aria-hidden={!shown}
    >
      <div className="StickyNav-module__hNdvsq__bar">
        <Navbar variant="dev" />
      </div>
    </div>
  );
}
