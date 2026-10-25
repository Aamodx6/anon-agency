'use client';

import React from 'react';

export function SwapArrow({
  dir = 'up-right',
  size = 14,
  strokeWidth = 1.8,
  className = '',
}: {
  dir?: 'up-right' | 'right' | 'left' | 'up';
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  const isRight = dir === 'right';
  const isLeft = dir === 'left';
  const isUp = dir === 'up';

  const renderSvg = () => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <g
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {isRight ? (
          <>
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </>
        ) : isLeft ? (
          <>
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </>
        ) : isUp ? (
          <>
            <path d="M12 19V5" />
            <path d="m5 12 7-7 7 7" />
          </>
        ) : (
          <>
            <path d="M7 17 17 7" />
            <path d="M8 7h9v9" />
          </>
        )}
      </g>
    </svg>
  );

  return (
    <span
      className={`SwapArrow-module__0B2EzW__swap ${className}`}
      data-dir={dir}
      style={{ width: `${size}px`, height: `${size}px` }}
      aria-hidden="true"
    >
      <span className="SwapArrow-module__0B2EzW__a">{renderSvg()}</span>
      <span className="SwapArrow-module__0B2EzW__b">{renderSvg()}</span>
    </span>
  );
}
