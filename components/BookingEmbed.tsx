'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export function BookingEmbed() {
  const searchParams = useSearchParams();
  const need = searchParams?.get('need') || '';
  const name = searchParams?.get('name') || '';
  const email = searchParams?.get('email') || '';

  const [hasConsent, setHasConsent] = useState<boolean>(true);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('anon_consent') || localStorage.getItem('awake_consent');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.calendar === false) {
          setHasConsent(false);
        }
      }
    } catch {}
  }, []);

  const query = new URLSearchParams({
    embed: '',
    layout: 'month_view',
    theme: 'light'
  });
  if (need) query.set('notes', `Project need: ${need}`);
  if (name) query.set('name', name);
  if (email) query.set('email', email);

  const calUrl = `https://cal.com/awakeagency/30min?${query.toString()}`;

  if (!hasConsent) {
    return (
      <div className="BookingEmbed-module__8slbVa__embed">
        <div className="BookingEmbed-module__8slbVa__gate">
          <p className="BookingEmbed-module__8slbVa__gateTitle">Booking calendar</p>
          <p className="BookingEmbed-module__8slbVa__gateBody">
            The booking calendar requires functional cookies to load embedded scheduling.
          </p>
          <button
            type="button"
            className="BookingEmbed-module__8slbVa__gateButton"
            onClick={() => {
              try {
                const saved = JSON.parse(localStorage.getItem('anon_consent') || localStorage.getItem('awake_consent') || '{}');
                saved.calendar = true;
                localStorage.setItem('anon_consent', JSON.stringify(saved));
              } catch {}
              setHasConsent(true);
            }}
          >
            Allow calendar
          </button>
          <a
            href="https://cal.com/awakeagency/30min"
            target="_blank"
            rel="noreferrer noopener"
            className="BookingEmbed-module__8slbVa__gateLink"
          >
            Or open external calendar
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="BookingEmbed-module__8slbVa__embed" style={{ position: 'relative' }}>
      {!loaded && <div className="BookingEmbed-module__8slbVa__skeleton" aria-hidden="true" />}
      <iframe
        src={calUrl}
        className="BookingEmbed-module__8slbVa__frame"
        title="Book a 30-minute call with Anon"
        onLoad={() => setLoaded(true)}
        style={{
          position: loaded ? 'relative' : 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 0
        }}
      />
    </div>
  );
}
