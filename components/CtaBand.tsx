'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface CtaBandProps {
  spacing?: 'home' | 'page';
}

const NEEDS = ['development', 'web design', 'branding'];

export function CtaBand({ spacing = 'home' }: CtaBandProps) {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [need, setNeed] = useState<string>('development');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [triedSubmit, setTriedSubmit] = useState<boolean>(false);

  const isNameValid = name.trim().length > 0;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isValid = isNameValid && isEmailValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTriedSubmit(true);
    if (isValid) {
      const params = new URLSearchParams({ need });
      if (name.trim()) params.set('name', name.trim());
      if (email.trim()) params.set('email', email.trim());
      router.push(`/contacts?${params.toString()}`);
    }
  };

  const nextArrow = (
    <span
      className="SwapArrow-module__0B2EzW__swap CtaBand-module__4ELZEW__nextArrow"
      data-dir="right"
      aria-hidden="true"
    >
      <span className="SwapArrow-module__0B2EzW__a">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            d="M4 12h15m0 0-6.5-6.5M19 12l-6.5 6.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="SwapArrow-module__0B2EzW__b">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            d="M4 12h15m0 0-6.5-6.5M19 12l-6.5 6.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </span>
  );

  return (
    <section
      className={`CtaBand-module__4ELZEW__band CtaBand-module__4ELZEW__${spacing}`}
      data-step={step}
      data-node-id="1:378"
    >
      {/* STEP 1 */}
      <div className="CtaBand-module__4ELZEW__stepOne" inert={step !== 1}>
        <p className="CtaBand-module__4ELZEW__label" data-node-id="1:380" id="cta-band-label">
          I need
        </p>
        <div className="CtaBand-module__4ELZEW__reelWindow">
          <ul
            className="CtaBand-module__4ELZEW__reel"
            role="radiogroup"
            aria-labelledby="cta-band-label"
          >
            {/* Repetitions for visual reel flow */}
            {Array.from({ length: 4 * NEEDS.length }).map((_, idx) => {
              const word = NEEDS[idx % NEEDS.length];
              const isMainSlot = idx >= NEEDS.length && idx < 2 * NEEDS.length;
              return (
                <li
                  key={idx}
                  role="presentation"
                  className="CtaBand-module__4ELZEW__pillSlot"
                  aria-hidden={isMainSlot ? undefined : true}
                >
                  <button
                    type="button"
                    className="CtaBand-module__4ELZEW__pill"
                    data-word={word}
                    data-selected={need === word ? '' : undefined}
                    tabIndex={isMainSlot ? 0 : -1}
                    role={isMainSlot ? 'radio' : undefined}
                    aria-checked={isMainSlot ? need === word : undefined}
                    onClick={() => setNeed(word)}
                  >
                    {word}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <button
          type="button"
          className="CtaBand-module__4ELZEW__next CtaBand-module__4ELZEW__nextOne"
          onClick={() => setStep(2)}
          data-arrow-host=""
        >
          next
          {nextArrow}
        </button>
      </div>

      {/* STEP 2 */}
      <form
        className="CtaBand-module__4ELZEW__stepTwo"
        inert={step !== 2}
        aria-label="Book a call"
        onSubmit={handleSubmit}
      >
        <p className="CtaBand-module__4ELZEW__recap">
          <span className="CtaBand-module__4ELZEW__recapLabel">I need</span>
          <button
            type="button"
            className="CtaBand-module__4ELZEW__recapPill"
            onClick={() => setStep(1)}
            aria-label={`Change service, currently ${need}`}
          >
            {need}
          </button>
        </p>
        <div className="CtaBand-module__4ELZEW__fields">
          <input
            className={`CtaBand-module__4ELZEW__field ${triedSubmit && !isNameValid ? 'CtaBand-module__4ELZEW__field-shake' : ''}`}
            type="text"
            autoComplete="name"
            placeholder="your name"
            aria-label="Your name"
            aria-invalid={triedSubmit && !isNameValid}
            data-invalid={triedSubmit && !isNameValid ? '' : undefined}
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            className={`CtaBand-module__4ELZEW__field ${triedSubmit && !isEmailValid ? 'CtaBand-module__4ELZEW__field-shake' : ''}`}
            type="email"
            autoComplete="email"
            placeholder="email"
            aria-label="Email"
            aria-invalid={triedSubmit && !isEmailValid}
            data-invalid={triedSubmit && !isEmailValid ? '' : undefined}
            enterKeyHint="go"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button type="submit" className="sr-only">
            Continue
          </button>
          <button
            type="submit"
            className="CtaBand-module__4ELZEW__next"
            data-arrow-host=""
          >
            next
            {nextArrow}
          </button>
        </div>
      </form>
    </section>
  );
}
