'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Discovery call',
    body: '30 free minutes to scope your goals, system architecture, and timeline.',
  },
  {
    number: '02',
    title: 'Architecture & Design',
    body: 'System blueprints, wireframes, data flows, and interactive prototypes.',
  },
  {
    number: '03',
    title: 'Build & Integration',
    body: 'Production code, API integrations, agent pipelines, test coverage, and responsive polish.',
  },
  {
    number: '04',
    title: 'Launch & Scaling',
    body: 'Go-live, cloud configuration, CI/CD, team handover, and ongoing monitoring.',
  },
];

export function HowWeWork() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const layers = Array.from(
      section.querySelectorAll<HTMLElement>('.HowWeWork-module__kq1Iga__dragLayer'),
    );
    if (layers.length !== steps.length) return;

    const media = gsap.matchMedia();
    media.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.set(layers, {
        autoAlpha: 0,
        y: () => window.innerHeight * 0.72,
        scale: 0.96,
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${window.innerHeight * 1.45}`,
          pin: true,
          scrub: 0.65,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      layers.forEach((layer, index) => {
        timeline.to(
          layer,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
          },
          index * 0.55,
        );
      });

      return () => {
        gsap.set(layers, { clearProps: 'all' });
      };
    });

    return () => {
      media.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="HowWeWork-module__kq1Iga__section"
      data-node-id="43:276"
    >
      <h2 className="HowWeWork-module__kq1Iga__heading">How we work</h2>
      <ol className="HowWeWork-module__kq1Iga__list">
        {steps.map((step) => (
          <li className="HowWeWork-module__kq1Iga__item" key={step.number}>
            <div className="HowWeWork-module__kq1Iga__dragLayer">
              <div className="HowWeWork-module__kq1Iga__card" data-stack-card="">
                <svg
                  className="ScrollRibbon-module__wSfOTW__svg"
                  aria-hidden="true"
                  focusable="false"
                  preserveAspectRatio="none"
                  data-ribbon=""
                />
                <span className="HowWeWork-module__kq1Iga__number">{step.number}</span>
                <div className="HowWeWork-module__kq1Iga__end">
                  <h3 className="HowWeWork-module__kq1Iga__title">{step.title}</h3>
                  <p className="HowWeWork-module__kq1Iga__body">{step.body}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
