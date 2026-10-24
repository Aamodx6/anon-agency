'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollRibbon } from '@/components/ScrollRibbon';

gsap.registerPlugin(ScrollTrigger);

const STATEMENT_DATA = [
  {
    lines: [
      'We design and build',
      'websites, brand systems,',
      'and digital products that',
      'work as hard as they look.',
    ],
  },
  {
    lines: [
      "Whether you're launching a",
      'product, rebuilding a brand, or',
      'replacing a tired site, one team',
      'takes it from sketch to live build.',
    ],
  },
];

function renderLine(lineText: string) {
  const words = lineText.split(' ');
  return words.map((word, wIdx) => (
    <React.Fragment key={wIdx}>
      <div
        aria-hidden="true"
        style={{ position: 'relative', display: 'inline-block' }}
      >
        {Array.from(word).map((char, cIdx) => (
          <div
            key={cIdx}
            aria-hidden="true"
            style={{ position: 'relative', display: 'inline-block' }}
          >
            {char}
          </div>
        ))}
      </div>
      {wIdx < words.length - 1 && ' '}
    </React.Fragment>
  ));
}

export function Statement() {
  const sectionRef = useRef<HTMLElement>(null);
  const text0Ref = useRef<HTMLParagraphElement>(null);
  const text1Ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const t0 = text0Ref.current;
    const t1 = text1Ref.current;
    if (!section || !t0 || !t1) return;

    const lines0 = Array.from(t0.querySelectorAll<HTMLElement>('.split-measured-line'));
    const lines1 = Array.from(t1.querySelectorAll<HTMLElement>('.split-measured-line'));
    if (!lines0.length || !lines1.length) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        phone: '(max-width: 767px)',
        wide: '(min-width: 768px)',
      },
      (context) => {
        const isPhone = !!context.conditions?.phone;
        const i = isPhone ? 0.34 : 0.58;
        const o = 0.6 + 1 + 0.6; // 2.2
        const scrollDistance = o * i * window.innerHeight;

        // Ensure text blocks are visible in preserved-3d space
        gsap.set([t0, t1], { opacity: 1 });

        // Set 3D cylinder origin deep behind the line plane
        gsap.set([...lines0, ...lines1], {
          transformOrigin: '50% 50% -620px',
          backfaceVisibility: 'hidden',
        });

        // Initial positions: Statement 0 is flat (rotationY: 0), Statement 1 is turned (rotationY: 105)
        gsap.set(lines0, { rotationY: 0 });
        gsap.set(lines1, { rotationY: 105 });

        const tl = gsap.timeline({
          defaults: { ease: 'power2.inOut', duration: 1 },
          scrollTrigger: {
            trigger: section,
            start: 'center center',
            end: () => `+=${scrollDistance}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        // Rotate Statement 0 out to -105deg, Statement 1 in to 0deg with stagger
        tl.to(lines0, { rotationY: -105, stagger: 0.12 }, 0.6)
          .to(lines1, { rotationY: 0, stagger: 0.12 }, '<')
          .to({}, { duration: 0.6 }); // Rest buffer before unpinning
      }
    );

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      className="Statement-module__6Nrrla__statement"
      id="about"
      ref={sectionRef}
      data-node-id="1:130"
    >
      <ScrollRibbon figure="statement" />
      <h2 className="sr-only">
        We design and build websites, brand systems, and digital products that work as
        hard as they look. Whether you&apos;re launching a product, rebuilding a brand, or
        replacing a tired site, one team takes it from sketch to live build.
      </h2>
      <div className="Statement-module__6Nrrla__stack" aria-hidden="true">
        <p
          ref={text0Ref}
          className="Statement-module__6Nrrla__text"
          data-node-id="1:134"
          aria-label="We design and build websites, brand systems, and digital products that work as hard as they look."
          style={{ opacity: 1 }}
        >
          {STATEMENT_DATA[0].lines.map((line, lIdx) => (
            <div
              key={lIdx}
              className="split-measured-line"
              aria-hidden="true"
              style={{
                position: 'relative',
                display: 'block',
                textAlign: 'center',
                transformOrigin: '50% 50% -620px',
                backfaceVisibility: 'hidden',
              }}
            >
              {renderLine(line)}
            </div>
          ))}
        </p>
        <p
          ref={text1Ref}
          className="Statement-module__6Nrrla__text"
          data-node-id="1:134"
          aria-label="Whether you're launching a product, rebuilding a brand, or replacing a tired site, one team takes it from sketch to live build."
          style={{ opacity: 1 }}
        >
          {STATEMENT_DATA[1].lines.map((line, lIdx) => (
            <div
              key={lIdx}
              className="split-measured-line"
              aria-hidden="true"
              style={{
                position: 'relative',
                display: 'block',
                textAlign: 'center',
                transformOrigin: '50% 50% -620px',
                backfaceVisibility: 'hidden',
              }}
            >
              {renderLine(line)}
            </div>
          ))}
        </p>
      </div>
    </section>
  );
}
