import React from 'react';

export function Logo({ className = "Logo-module__BPrZ0W__logo" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 139 33"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Anon"
      focusable="false"
    >
      <text
        x="0"
        y="26"
        fill="currentColor"
        style={{
          fontFamily: 'var(--f-syne), var(--font-syne), sans-serif',
          fontWeight: 800,
          fontSize: '32px',
          letterSpacing: '-0.04em',
        }}
      >
        Anon.
      </text>
    </svg>
  );
}
