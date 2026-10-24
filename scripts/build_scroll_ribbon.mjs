import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scripts/extracted_paths.json', 'utf8'));

// Ribbon 0: Statement
const stmtRibbon = data.serviceRibbons[0];
// Ribbons 1, 2, 3, 4: Services
const s1 = data.serviceRibbons[1];
const s2 = data.serviceRibbons[2];
const s3 = data.serviceRibbons[3];
const s4 = data.serviceRibbons[4];

function pathsToJsx(paths) {
  return paths.map((p, idx) => {
    return `        <path
          key={${idx}}
          className="${p.className || 'ScrollRibbon-module__wSfOTW__path'}"
          d="${p.d}"
        />`;
  }).join('\n');
}

const code = `'use client';

import React, { useEffect, useRef } from 'react';

interface ScrollRibbonProps {
  figure?: 'statement' | '01' | '02' | '03' | '04' | string;
  driver?: string;
  stage?: string;
}

export function ScrollRibbon({ figure = 'statement' }: ScrollRibbonProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const paths = Array.from(svg.querySelectorAll('path'));

    const handleScroll = () => {
      const rect = svg.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Progress when visible in viewport
      const start = windowHeight;
      const end = -rect.height;
      const progress = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));

      paths.forEach((p, i) => {
        let len = 1000;
        try { len = p.getTotalLength() || 1000; } catch (e) {}
        const drawn = progress * len;
        p.style.strokeDasharray = \`\${drawn} \${len + 1}\`;
        p.style.strokeDashoffset = '0';
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (figure === '01') {
    return (
      <svg
        ref={svgRef}
        className="ScrollRibbon-module__wSfOTW__svg"
        aria-hidden="true"
        focusable="false"
        preserveAspectRatio="none"
        data-ribbon=""
        viewBox="${s1.viewBox}"
      >
${pathsToJsx(s1.paths)}
      </svg>
    );
  }

  if (figure === '02') {
    return (
      <svg
        ref={svgRef}
        className="ScrollRibbon-module__wSfOTW__svg"
        aria-hidden="true"
        focusable="false"
        preserveAspectRatio="none"
        data-ribbon=""
        viewBox="${s2.viewBox}"
      >
${pathsToJsx(s2.paths)}
      </svg>
    );
  }

  if (figure === '03') {
    return (
      <svg
        ref={svgRef}
        className="ScrollRibbon-module__wSfOTW__svg"
        aria-hidden="true"
        focusable="false"
        preserveAspectRatio="none"
        data-ribbon=""
        viewBox="${s3.viewBox}"
      >
${pathsToJsx(s3.paths)}
      </svg>
    );
  }

  if (figure === '04') {
    return (
      <svg
        ref={svgRef}
        className="ScrollRibbon-module__wSfOTW__svg"
        aria-hidden="true"
        focusable="false"
        preserveAspectRatio="none"
        data-ribbon=""
        viewBox="${s4.viewBox}"
      >
${pathsToJsx(s4.paths)}
      </svg>
    );
  }

  // Default: statement
  return (
    <svg
      ref={svgRef}
      className="ScrollRibbon-module__wSfOTW__svg"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
      data-ribbon=""
      viewBox="${stmtRibbon.viewBox}"
    >
${pathsToJsx(stmtRibbon.paths)}
    </svg>
  );
}
`;

fs.writeFileSync('components/ScrollRibbon.tsx', code, 'utf8');
console.log('ScrollRibbon.tsx created successfully!');
