'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface ConsentChoices {
  analytics: boolean;
  calendar: boolean;
}

const PURPOSES = [
  {
    id: 'analytics',
    title: 'Analytics',
    body: 'Google Analytics, to see which pages people read and how they found us. Sets _ga cookies.'
  },
  {
    id: 'calendar',
    title: 'Booking calendar',
    body: 'The Cal.com scheduler on the contacts page. Sets its own cookies when it loads.'
  }
];

export function ConsentBanner() {
  const [isOpen, setIsOpen] = useState(false);
  const [isChoosing, setIsChoosing] = useState(false);
  const [choices, setChoices] = useState<ConsentChoices>({ analytics: false, calendar: true });

  useEffect(() => {
    const saved = localStorage.getItem('anon_consent') || localStorage.getItem('awake_consent');
    if (!saved) {
      setIsOpen(true);
    } else {
      try {
        setChoices(JSON.parse(saved));
      } catch {}
    }

    const handleReopen = () => {
      setIsOpen(true);
      setIsChoosing(true);
    };
    window.addEventListener('reopen-cookie-settings', handleReopen);
    return () => window.removeEventListener('reopen-cookie-settings', handleReopen);
  }, []);

  const save = (newChoices: ConsentChoices) => {
    setChoices(newChoices);
    localStorage.setItem('anon_consent', JSON.stringify(newChoices));
    setIsOpen(false);
    setIsChoosing(false);
  };

  if (!isOpen) return null;

  if (isChoosing) {
    return (
      <div className="ConsentBanner-module__l3wmYG__wrap" role="dialog" aria-live="polite" aria-label="Cookie settings">
        <div className="ConsentBanner-module__l3wmYG__panel">
          <p className="ConsentBanner-module__l3wmYG__body">
            Choose what this site may load. You can change this any time from Cookie settings in the footer.{' '}
            <Link href="/cookies" className="ConsentBanner-module__l3wmYG__link">
              More<span className="sr-only"> about cookies</span>
            </Link>
          </p>
          <ul className="ConsentBanner-module__l3wmYG__purposes">
            {PURPOSES.map(p => (
              <li key={p.id} className="ConsentBanner-module__l3wmYG__purpose">
                <div className="ConsentBanner-module__l3wmYG__purposeText">
                  <span className="ConsentBanner-module__l3wmYG__purposeTitle" id={`consent-${p.id}`}>
                    {p.title}
                  </span>
                  <span className="ConsentBanner-module__l3wmYG__purposeBody">
                    {p.body}
                  </span>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={choices[p.id as keyof ConsentChoices]}
                  aria-labelledby={`consent-${p.id}`}
                  className="ConsentBanner-module__l3wmYG__switch"
                  onClick={() =>
                    setChoices(prev => ({
                      ...prev,
                      [p.id]: !prev[p.id as keyof ConsentChoices]
                    }))
                  }
                >
                  <span className="ConsentBanner-module__l3wmYG__knob" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
          <div className="ConsentBanner-module__l3wmYG__actions">
            <button
              type="button"
              className="ConsentBanner-module__l3wmYG__pill ConsentBanner-module__l3wmYG__reject"
              onClick={() => save({ analytics: false, calendar: false })}
            >
              Reject all
            </button>
            <button
              type="button"
              className="ConsentBanner-module__l3wmYG__pill ConsentBanner-module__l3wmYG__accept"
              onClick={() => save(choices)}
            >
              Save choices
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ConsentBanner-module__l3wmYG__wrap" role="dialog" aria-live="polite" aria-label="Cookie choices">
      <div className="ConsentBanner-module__l3wmYG__panel">
        <p className="ConsentBanner-module__l3wmYG__body">
          We use cookies for the booking calendar and, if you allow it, Google Analytics to see how people find the site.{' '}
          <Link href="/cookies" className="ConsentBanner-module__l3wmYG__link">
            More<span className="sr-only"> about cookies</span>
          </Link>
        </p>
        <div className="ConsentBanner-module__l3wmYG__actions">
          <button
            type="button"
            className="ConsentBanner-module__l3wmYG__pill ConsentBanner-module__l3wmYG__reject"
            onClick={() => save({ analytics: false, calendar: false })}
          >
            Reject all
          </button>
          <button
            type="button"
            className="ConsentBanner-module__l3wmYG__pill ConsentBanner-module__l3wmYG__accept"
            onClick={() => save({ analytics: true, calendar: true })}
          >
            Accept all
          </button>
        </div>
        <button
          type="button"
          className="ConsentBanner-module__l3wmYG__choose"
          onClick={() => setIsChoosing(true)}
        >
          Choose what to allow
        </button>
      </div>
    </div>
  );
}

export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent('reopen-cookie-settings'))}
    >
      Cookie settings
    </button>
  );
}
