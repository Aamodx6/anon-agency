'use client';

import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { BandScribble } from './BandScribble';
import { prefersReducedMotion } from '@/src/animations/tokens';
import { ServiceDeliverable } from '@/data/services';

export const DELIVERABLE_DESCRIPTIONS: Record<string, string> = {
  'Project discovery & strategy':
    'One call, one document. What the site has to do, who it is for, and what done means, in writing within days.',
  'UX structure and wireframes':
    'Structure first, then look. The page order, the story, and wireframes you can click through before any pixels arrive.',
  'Custom design in Figma':
    "Every screen drawn for your content rather than a template's, with feedback rounds built into the timeline.",
  'CMS setup and team training':
    'A CMS your team will actually use, wired so nothing needs a developer after launch, handed over with training.',
  'Stakeholder and user research':
    'We talk to the people who run the product and the people who use it, and write down where the interface gets in the way.',
  'Information architecture':
    'The map of the product: what lives where, what it is called, and the shortest route to the things people do daily.',
  'Wireframes and user flows':
    'Every flow drawn end to end and clickable, so decisions happen on structure before they get expensive on visuals.',
  'High-fidelity UI design':
    'The screens at full fidelity, with states, edge cases and motion notes, from the same designers who build our sites.',
  'Component library and handover':
    'A documented component library your developers can build from, so the next screen looks like the last one.',
  'Pre-launch QA and performance pass':
    'Every page tested on real devices and checked against Lighthouse before anyone else sees it.',
  'Go-live and DNS handover':
    'We ship it: domains, redirects, forms and analytics wired, with nothing left pointing at staging.',
  'CMS walkthrough and training':
    'A recorded walkthrough of your own CMS, so publishing does not depend on us.',
  // Fallbacks for custom software / AI / automation titles
  'Full-stack architecture & foundations':
    'Next.js 15, TypeScript, Tailwind CSS, and cloud-native backends structured for sub-second page loads, SEO dominance, and modular growth.',
  'Domain modeling & system blueprint':
    'Deep architectural discovery, database entity-relationship modeling, and event-driven communication protocols tailored to your operational constraints.',
  'AI feasibility audit & readiness roadmap':
    'Evaluating proprietary business data, identifying high-leverage agent workflows, and calculating model ROI and inference costs upfront.',
  'Operational bottleneck & friction mapping':
    'Analyzing current operational handoffs, duplicate data entries, and manual approval delays to design lean, automated paths.',
  'Architecture audit & cost optimization':
    'Full code review, database query profiling, cloud infrastructure waste elimination, and security vulnerability remediations.',
};

export type DeliverableItem = string | ServiceDeliverable;

export interface DeliverablesProps {
  items?: DeliverableItem[];
  deliverables?: DeliverableItem[];
}

export function Deliverables({ items, deliverables }: DeliverablesProps) {
  const rawList = items || deliverables || [];
  const normalized = rawList.map((item, index) => {
    if (typeof item === 'string') {
      return {
        index: String(index + 1).padStart(2, '0'),
        stepLabel: item,
        cardTitle: item,
        readBody: DELIVERABLE_DESCRIPTIONS[item] || '',
      };
    }
    return {
      index: item.index || String(index + 1).padStart(2, '0'),
      stepLabel: item.stepLabel || item.cardTitle || '',
      cardTitle: item.cardTitle || item.stepLabel || '',
      readBody: item.readBody || DELIVERABLE_DESCRIPTIONS[item.cardTitle] || DELIVERABLE_DESCRIPTIONS[item.stepLabel] || '',
    };
  });

  const [active, setActive] = useState(0);
  const [transition, setTransition] = useState<{ now: number; prev: number }>({ now: 0, prev: -1 });

  if (transition.now !== active) {
    setTransition({ now: active, prev: transition.now });
  }

  const titleRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (transition.prev < 0) return;
    if (prefersReducedMotion()) {
      for (const el of [titleRef.current, bodyRef.current]) {
        el?.querySelectorAll('[data-leaving]').forEach((e) => {
          (e as HTMLElement).style.display = 'none';
        });
      }
      return;
    }

    const animOptions: KeyframeAnimationOptions = {
      duration: 700,
      easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
      fill: 'both',
    };
    const animations: Animation[] = [];

    for (const container of [titleRef.current, bodyRef.current]) {
      const leaving = container?.querySelector<HTMLElement>('[data-leaving]');
      const arriving = container?.querySelector<HTMLElement>('[data-arriving]');
      if (!leaving || !arriving) continue;

      const offset = Math.max(leaving.offsetHeight, arriving.offsetHeight) + 8;
      animations.push(
        leaving.animate([{ transform: 'translateY(0)' }, { transform: `translateY(${-offset}px)` }], animOptions)
      );
      animations.push(
        arriving.animate([{ transform: `translateY(${offset}px)` }, { transform: 'translateY(0)' }], animOptions)
      );
    }

    let activeEffect = true;
    Promise.all(animations.map((a) => a.finished)).then(
      () => {
        if (activeEffect) {
          setTransition((prev) => (prev.now === active ? { now: active, prev: -1 } : prev));
        }
      },
      () => {}
    );

    return () => {
      activeEffect = false;
    };
  }, [transition.prev, active]);

  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const [reducedMotion] = useState(() => prefersReducedMotion());
  const isRunning = inView && !hovered && !reducedMotion && normalized.length > 1;

  const RING_CIRCUMFERENCE = 2 * Math.PI * 13; // 81.68140899333463

  if (normalized.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="Deliverables-module__rs733q__section"
      aria-label="What you get"
      data-running={isRunning ? 'true' : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="Deliverables-module__rs733q__strip" role="tablist" aria-label="Deliverables">
        {normalized.map((item, idx) => {
          const isSelected = idx === active;
          return (
            <button
              key={`${item.cardTitle}-${idx}`}
              type="button"
              role="tab"
              aria-selected={isSelected}
              tabIndex={isSelected ? 0 : -1}
              className="Deliverables-module__rs733q__item"
              data-active={isSelected ? 'true' : undefined}
              onClick={() => setActive(idx)}
              onFocus={() => setHovered(true)}
              onBlur={() => setHovered(false)}
            >
              <span className="Deliverables-module__rs733q__collapsed" aria-hidden={isSelected}>
                <span className="Deliverables-module__rs733q__index">{item.index}</span>
                <span className="Deliverables-module__rs733q__mark" aria-hidden="true" />
                <span className="Deliverables-module__rs733q__stepLabel">{item.stepLabel}</span>
              </span>

              <span className="Deliverables-module__rs733q__expanded" aria-hidden={!isSelected}>
                <svg
                  key={`ring-${active}-${idx}`}
                  className="Deliverables-module__rs733q__ring"
                  onAnimationEnd={() => {
                    if (idx === active) {
                      setActive((prev) => (prev + 1) % normalized.length);
                    }
                  }}
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  focusable="false"
                >
                  <circle className="Deliverables-module__rs733q__ringTrack" cx="16" cy="16" r="13" />
                  <circle
                    className="Deliverables-module__rs733q__ringFill"
                    cx="16"
                    cy="16"
                    r="13"
                    strokeDasharray={RING_CIRCUMFERENCE}
                    strokeDashoffset={RING_CIRCUMFERENCE}
                  />
                </svg>

                {isSelected && (
                  <BandScribble
                    className="Deliverables-module__rs733q__scribble"
                    mode="beat"
                    durationMs={4200}
                    paused={!isRunning}
                    tone="onRed"
                    key={`scribble-${active}`}
                  />
                )}

                <span className="Deliverables-module__rs733q__cardTitle">{item.cardTitle}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="Deliverables-module__rs733q__reading">
        <h2 className="Deliverables-module__rs733q__readTitle" ref={titleRef}>
          {transition.prev >= 0 && (
            <span
              key={`title-out-${transition.prev}-${active}`}
              className="Deliverables-module__rs733q__readTitleLine"
              data-leaving=""
              aria-hidden="true"
            >
              {normalized[transition.prev]?.cardTitle}
            </span>
          )}
          <span
            key={`title-in-${active}`}
            className="Deliverables-module__rs733q__readTitleLine"
            data-arriving=""
          >
            {normalized[active]?.cardTitle}
          </span>
        </h2>

        <div className="Deliverables-module__rs733q__readBodyStack" ref={bodyRef}>
          {transition.prev >= 0 && (
            <p
              key={`body-out-${transition.prev}-${active}`}
              className="Deliverables-module__rs733q__readBody"
              data-leaving=""
              aria-hidden="true"
            >
              {normalized[transition.prev]?.readBody}
            </p>
          )}
          <p
            key={`body-in-${active}`}
            className="Deliverables-module__rs733q__readBody"
            data-arriving=""
          >
            {normalized[active]?.readBody}
          </p>
        </div>
      </div>
    </section>
  );
}

export { Deliverables as DeliverablesTabs };
