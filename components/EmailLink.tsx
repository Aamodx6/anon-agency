'use client';

import React, { useState } from 'react';

export function EmailLink({
  email = 'contact@awakeagency.dev',
  reveal = 'inline',
  className = '',
}: {
  email?: string;
  reveal?: 'inline' | 'block';
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <span
      className={`EmailLink-module__YoOl1a__root EmailLink-module__YoOl1a__${reveal} ${className}`.trim()}
      data-state={copied ? 'copied' : 'idle'}
    >
      <a
        href={`mailto:${email}`}
        className="EmailLink-module__YoOl1a__copy"
        aria-label={`Copy to clipboard: ${email}`}
        onClick={handleCopy}
      >
        <span className="EmailLink-module__YoOl1a__label EmailLink-module__YoOl1a__address" aria-hidden="true">
          {email}
        </span>
        <span className="EmailLink-module__YoOl1a__label EmailLink-module__YoOl1a__hint" aria-hidden="true">
          Copy to clipboard
        </span>
        <span className="EmailLink-module__YoOl1a__label EmailLink-module__YoOl1a__done" aria-hidden="true">
          Copied to clipboard.
        </span>
      </a>
      <span className="sr-only" aria-live="polite">
        {copied ? 'Copied to clipboard' : ''}
      </span>
    </span>
  );
}
