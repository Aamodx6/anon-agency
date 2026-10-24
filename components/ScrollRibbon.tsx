'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRibbonProps {
  figure?: 'statement' | '01' | '02' | '03' | '04' | string;
  className?: string;
}

export function ScrollRibbon({ figure = 'statement', className }: ScrollRibbonProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const parent = svg.closest<HTMLElement>('section') || svg.parentElement;
    if (!parent) return;

    // Select all animatable stroke paths
    const drawPaths = Array.from(
      svg.querySelectorAll<SVGPathElement>('path:not([data-no-anim])')
    );
    // Select all scale elements (handles, nodes, crosshairs)
    const scaleElements = Array.from(
      svg.querySelectorAll<SVGElement>('[data-scale-node]')
    );

    // Initialize line stroke dashes
    const pathLengths: number[] = [];
    drawPaths.forEach((p, idx) => {
      let len = 1000;
      try {
        len = p.getTotalLength() || 1000;
      } catch {}
      pathLengths[idx] = len;
      p.style.strokeDasharray = `${len} ${len + 1}`;
      p.style.strokeDashoffset = `${len}`;
    });

    // Initialize scale elements to 0
    scaleElements.forEach((el) => {
      const origTransform = el.getAttribute('data-base-transform') || '';
      el.setAttribute('transform', `${origTransform} scale(0)`);
    });

    const tweenObj = { progress: 0 };

    const updateVisuals = (p: number) => {
      // 1. Draw paths
      drawPaths.forEach((path, idx) => {
        const len = pathLengths[idx];
        const offset = len * (1 - p);
        path.style.strokeDashoffset = `${offset}`;
      });

      // 2. Scale nodes and handles
      scaleElements.forEach((el) => {
        const origTransform = el.getAttribute('data-base-transform') || '';
        // Handles pop in after 25% progress
        const scaleProgress = Math.max(0, Math.min(1, (p - 0.2) / 0.5));
        el.setAttribute('transform', `${origTransform} scale(${scaleProgress})`);
      });
    };

    // Scrub with ScrollTrigger across the parent section
    const st = ScrollTrigger.create({
      trigger: parent,
      start: 'top 85%',
      end: 'bottom 40%',
      scrub: 0.6,
      onUpdate: (self) => {
        updateVisuals(self.progress);
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className={`ScrollRibbon-module__wSfOTW__svg ${className || ''}`}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
      data-ribbon=""
      viewBox="0 0 1400 860"
      data-weight="fill"
      data-figure="form"
      data-stage="full"
    >
      {/* 1. Subtle Architectural Blueprint Fill */}
      <path
        data-no-anim=""
        style={{ fill: 'rgba(22, 29, 37, 0.045)', stroke: 'none' }}
        d="M70.00 393.09L433.71 393.09L433.71 756.80L70.00 756.80L70.00 393.09Z M446.25 154.80C570.93 154.80 672.00 255.87 672.00 380.55C672.00 505.23 570.93 606.30 446.25 606.30C321.57 606.30 220.50 505.23 220.50 380.55C220.50 255.87 321.57 154.80 446.25 154.80Z"
      />

      {/* 2. Grid Guide Lines */}
      <g className="ScrollRibbon-module__wSfOTW__guides">
        <path d="M0 154.8H1400" />
        <path d="M0 756.8H1400" />
        <path d="M70 0V860" />
        <path d="M672 0V860" />
        <path d="M0 393.09H1400" />
        <path d="M433.71 0V860" />
      </g>

      {/* 3. Construction Geometric Lines & Crosshairs */}
      <g className="ScrollRibbon-module__wSfOTW__construct">
        {/* Square outline */}
        <path d="M70.00 393.09L433.71 393.09L433.71 756.80L70.00 756.80L70.00 393.09Z" />
        {/* Circle outline */}
        <path d="M446.2544 154.80A225.7456 225.7456 0 1 1 446.2544 606.29A225.7456 225.7456 0 1 1 446.2544 154.80Z" />

        {/* Crosshairs at grid intersections */}
        <path
          className="ScrollRibbon-module__wSfOTW__cross"
          data-scale-node=""
          data-base-transform="translate(446.25 380.55)"
          d="M-5 0H5M0 -5V5"
        />
        <path
          className="ScrollRibbon-module__wSfOTW__cross"
          data-scale-node=""
          data-base-transform="translate(70 154.8)"
          d="M-5 0H5M0 -5V5"
        />
        <path
          className="ScrollRibbon-module__wSfOTW__cross"
          data-scale-node=""
          data-base-transform="translate(672 154.8)"
          d="M-5 0H5M0 -5V5"
        />
        <path
          className="ScrollRibbon-module__wSfOTW__cross"
          data-scale-node=""
          data-base-transform="translate(70 756.8)"
          d="M-5 0H5M0 -5V5"
        />
        <path
          className="ScrollRibbon-module__wSfOTW__cross"
          data-scale-node=""
          data-base-transform="translate(672 756.8)"
          d="M-5 0H5M0 -5V5"
        />
        <path
          className="ScrollRibbon-module__wSfOTW__cross"
          data-scale-node=""
          data-base-transform="translate(433.71 393.09)"
          d="M-5 0H5M0 -5V5"
        />
        <path
          className="ScrollRibbon-module__wSfOTW__cross"
          data-scale-node=""
          data-base-transform="translate(433.71 756.8)"
          d="M-5 0H5M0 -5V5"
        />
      </g>

      {/* 4. CAD Bézier Tangent Arms & Handles (Image 2) */}
      <g className="ScrollRibbon-module__wSfOTW__handles">
        {/* Top tangent arms */}
        <path d="M446.25 154.8L570.93 154.8" />
        <path d="M446.25 154.8L321.57 154.8" />
        <circle
          data-scale-node=""
          data-base-transform="translate(570.93 154.8)"
          r="2.5"
          cx="0"
          cy="0"
        />
        <circle
          data-scale-node=""
          data-base-transform="translate(321.57 154.8)"
          r="2.5"
          cx="0"
          cy="0"
        />

        {/* Right tangent arms */}
        <path d="M672 380.55L672 255.87" />
        <path d="M672 380.55L672 505.23" />
        <circle
          data-scale-node=""
          data-base-transform="translate(672 255.87)"
          r="2.5"
          cx="0"
          cy="0"
        />
        <circle
          data-scale-node=""
          data-base-transform="translate(672 505.23)"
          r="2.5"
          cx="0"
          cy="0"
        />

        {/* Bottom tangent arms */}
        <path d="M446.25 606.3L570.93 606.3" />
        <path d="M446.25 606.3L321.57 606.3" />
        <circle
          data-scale-node=""
          data-base-transform="translate(570.93 606.3)"
          r="2.5"
          cx="0"
          cy="0"
        />
        <circle
          data-scale-node=""
          data-base-transform="translate(321.57 606.3)"
          r="2.5"
          cx="0"
          cy="0"
        />

        {/* Left tangent arms */}
        <path d="M220.5 380.55L220.5 255.87" />
        <path d="M220.5 380.55L220.5 505.23" />
        <circle
          data-scale-node=""
          data-base-transform="translate(220.5 255.87)"
          r="2.5"
          cx="0"
          cy="0"
        />
        <circle
          data-scale-node=""
          data-base-transform="translate(220.5 505.23)"
          r="2.5"
          cx="0"
          cy="0"
        />
      </g>

      {/* 5. Anchor Nodes (the square control boxes in Image 2) */}
      <g className="ScrollRibbon-module__wSfOTW__nodes">
        {/* Cardinal anchor points on circle */}
        <rect
          data-scale-node=""
          data-base-transform="translate(446.25 154.8)"
          x="-3.5"
          y="-3.5"
          width="7"
          height="7"
        />
        <rect
          data-scale-node=""
          data-base-transform="translate(672 380.55)"
          x="-3.5"
          y="-3.5"
          width="7"
          height="7"
        />
        <rect
          data-scale-node=""
          data-base-transform="translate(446.25 606.3)"
          x="-3.5"
          y="-3.5"
          width="7"
          height="7"
        />
        <rect
          data-scale-node=""
          data-base-transform="translate(220.5 380.55)"
          x="-3.5"
          y="-3.5"
          width="7"
          height="7"
        />

        {/* Anchor corners on square */}
        <rect
          data-scale-node=""
          data-base-transform="translate(70 393.09)"
          x="-3.5"
          y="-3.5"
          width="7"
          height="7"
        />
        <rect
          data-scale-node=""
          data-base-transform="translate(433.71 393.09)"
          x="-3.5"
          y="-3.5"
          width="7"
          height="7"
        />
        <rect
          data-scale-node=""
          data-base-transform="translate(433.71 756.8)"
          x="-3.5"
          y="-3.5"
          width="7"
          height="7"
        />
        <rect
          data-scale-node=""
          data-base-transform="translate(70 756.8)"
          x="-3.5"
          y="-3.5"
          width="7"
          height="7"
        />
      </g>
    </svg>
  );
}
