import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scripts/extracted_paths.json', 'utf8'));
const scribble = data.allScribbles[0];

const code = `'use client';

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
      path.style.strokeDasharray = \`\${drawn}, 2000\`;
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
      className={\`BandScribble-module__QwOmAG__svg \${className}\`}
      data-tone={tone}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
      viewBox="${scribble.viewBox}"
    >
      <path
        ref={pathRef}
        className="BandScribble-module__QwOmAG__path"
        pathLength={1000}
        d="${scribble.d}"
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
`;

fs.writeFileSync('components/BandScribble.tsx', code, 'utf8');
console.log('BandScribble.tsx created successfully!');
