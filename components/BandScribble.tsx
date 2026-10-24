'use client';

import React, { useEffect, useRef } from 'react';

interface BandScribbleProps {
  tone?: string;
  className?: string;
}

export function BandScribble({ tone = 'onInk', className = '' }: BandScribbleProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const svg = svgRef.current;
    if (!path || !svg) return;

    const totalLen = 1000;

    const handleScroll = () => {
      const rect = svg.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const start = windowHeight * 0.85;
      const end = -rect.height * 0.4;
      const progress = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));

      const drawn = progress * totalLen;
      path.style.strokeDasharray = `${drawn}, 2000`;
      path.style.strokeDashoffset = '0';
      path.style.visibility = drawn > 5 ? 'visible' : 'hidden';
      path.style.strokeWidth = '31.68px';
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <svg
      ref={svgRef}
      className={`BandScribble-module__QwOmAG__svg ${className}`}
      data-tone={tone}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
      viewBox="0 0 1400 581"
    >
      <path
        ref={pathRef}
        className="BandScribble-module__QwOmAG__path"
        pathLength={1000}
        d="M1463.4 24.8C1401.5 29.2 1214.6 42.5 1092.0 51.4C969.4 60.3 756.0 60.9 728.0 78.0C700.0 95.1 924.0 128.7 924.0 154.0C924.0 179.3 728.0 204.7 728.0 230.0C728.0 255.3 924.0 280.7 924.0 306.0C924.0 331.3 798.0 359.8 728.0 382.0C658.0 404.2 602.0 423.9 504.0 439.0C406.0 454.1 202.3 470.5 140.2 472.4C78.0 474.3 135.5 456.7 131.2 450.4C127.0 444.0 121.1 438.1 114.9 434.2C108.7 430.3 101.1 427.7 94.0 427.0C86.9 426.3 79.1 427.4 72.4 430.1C65.8 432.8 59.1 437.5 54.1 443.1C49.2 448.7 44.9 456.2 42.6 463.6C40.2 471.1 39.2 480.0 39.9 488.0C40.5 496.0 43.0 504.7 46.6 511.7C50.2 518.8 55.7 525.6 61.7 530.4C67.6 535.2 75.1 538.9 82.3 540.6C89.5 542.2 97.7 542.2 104.8 540.3C111.9 538.5 119.2 534.5 124.9 529.5C130.6 524.5 135.8 517.4 139.0 510.1C142.3 502.8 144.3 493.9 144.4 485.6C144.6 477.4 143.1 468.2 140.1 460.5C137.1 452.8 128.9 443.0 126.7 439.5"
        style={{
          visibility: 'hidden',
          strokeWidth: '31.68px',
          strokeDasharray: '0, 2000',
          strokeDashoffset: '0'
        }}
      />
    </svg>
  );
}
