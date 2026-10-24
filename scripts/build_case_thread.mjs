import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scripts/extracted_paths.json', 'utf8'));

const code = `'use client';

import React, { useEffect, useRef } from 'react';

export function CaseThread() {
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const svg = svgRef.current;
    if (!path || !svg) return;

    let totalLength = 11251.2;
    try {
      totalLength = path.getTotalLength() || 11251.2;
    } catch (e) {}

    const handleScroll = () => {
      const stage = svg.parentElement;
      if (!stage) return;

      const rect = stage.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress through stage
      const stageTop = rect.top;
      const stageHeight = rect.height;
      
      const start = windowHeight * 0.7;
      const end = -stageHeight * 0.5;

      const progress = Math.max(0, Math.min(1, (start - stageTop) / (start - end)));

      const drawn = progress * totalLength;
      path.style.strokeDasharray = \`\${drawn} \${totalLength + 1}\`;
      path.style.strokeDashoffset = '0';
      path.style.visibility = drawn > 10 ? 'visible' : 'hidden';

      // Dynamic responsive stroke width
      const strokeW = Math.min(40, Math.max(16, (2.2 * window.innerWidth) / 100));
      path.style.strokeWidth = \`\${strokeW}px\`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="CaseThread-module__fQt_la__svg"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
      viewBox="${data.caseThread.viewBox}"
    >
      <path
        ref={pathRef}
        className="CaseThread-module__fQt_la__path"
        d="${data.caseThread.d}"
        style={{
          strokeWidth: '31.68px',
          strokeDasharray: '0, 11252',
          strokeDashoffset: '0',
          visibility: 'hidden'
        }}
      />
    </svg>
  );
}
`;

fs.writeFileSync('components/CaseThread.tsx', code, 'utf8');
console.log('CaseThread.tsx successfully created!');
