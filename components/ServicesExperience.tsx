'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useMenu } from '@/context/MenuContext';
import { GRID_PROJECTS, type GridProject } from '@/data/projectsGrid';
import { SERVICES } from '@/data/services';
import styles from './ServicesExperience.module.css';

interface ServiceProject extends GridProject {
  year: string;
}

interface ServiceTab {
  slug: string;
  number: string;
  tabLabel: string;
  title: string;
  copy: string;
  projects: [ServiceProject, ServiceProject];
}

interface ServiceShowcase {
  slug: string;
  projects: [ServiceProject, ServiceProject];
}

function project(slug: string, year: string): ServiceProject {
  const match = GRID_PROJECTS.find((item) => item.slug === slug);
  if (!match) {
    throw new Error(`Missing project "${slug}" in the services showcase.`);
  }

  return { ...match, year };
}

const serviceShowcase: ServiceShowcase[] = [
  {
    slug: 'web-mobile-development',
    projects: [project('frame', '2024'), project('rally', '2025')],
  },
  {
    slug: 'custom-software-system-integration',
    projects: [project('portfolio-ventures', '2025'), project('rhinestone', '2024')],
  },
  {
    slug: 'ai-solutions-intelligent-agents',
    projects: [project('aimplify', '2025'), project('cybercapitalist', '2024')],
  },
  {
    slug: 'business-process-automation',
    projects: [project('condor', '2025'), project('cortland', '2024')],
  },
];

const services: ServiceTab[] = serviceShowcase.map(({ slug, projects }) => {
  const service = SERVICES.find((item) => item.slug === slug);
  if (!service) {
    throw new Error(`Missing service "${slug}" in the services data.`);
  }

  return {
    slug: service.slug,
    number: service.number,
    tabLabel: service.tabLabel,
    title: service.title,
    copy: service.heroIntro,
    projects,
  };
});

const rotations = [-3, 2, -2, 3];

export function ServicesExperience() {
  const { isOpen, toggle } = useMenu();
  const [activeIndex, setActiveIndex] = useState(0);
  const [outgoingIndex, setOutgoingIndex] = useState<number | null>(null);
  const activeIndexRef = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const stackFloatRef = useRef<HTMLDivElement>(null);
  const decorationRef = useRef<SVGSVGElement>(null);
  const activePillRef = useRef<HTMLSpanElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useLayoutEffect(() => {
    const activePill = activePillRef.current;
    if (!activePill) return;

    const syncPill = () => {
      const selectedTab = tabRefs.current[activeIndexRef.current];
      if (!selectedTab) return;
      gsap.killTweensOf(activePill);
      gsap.set(activePill, {
        x: selectedTab.offsetLeft - 8,
        width: selectedTab.offsetWidth,
      });
    };

    syncPill();
    window.addEventListener('resize', syncPill);
    return () => {
      window.removeEventListener('resize', syncPill);
    };
  }, []);

  useLayoutEffect(() => {
    const floatLayer = stackFloatRef.current;
    if (!floatLayer || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const floatTween = gsap.to(floatLayer, {
      y: -5,
      rotation: 0.25,
      duration: 2.8,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });

    return () => {
      floatTween.kill();
    };
  }, []);

  useLayoutEffect(() => {
    if (outgoingIndex === null) return;

    const section = sectionRef.current;
    const stack = stackRef.current;
    if (!section || !stack) return;

    const previousCard = section.querySelector<HTMLElement>(
      `[data-service-card="${outgoingIndex}"]`,
    );
    const currentCard = section.querySelector<HTMLElement>(
      `[data-service-card="${activeIndex}"]`,
    );
    const previousProjects = section.querySelector<HTMLElement>(
      `[data-project-set="${outgoingIndex}"]`,
    );
    const currentProjects = section.querySelector<HTMLElement>(
      `[data-project-set="${activeIndex}"]`,
    );
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      if (previousCard) gsap.set(previousCard, { autoAlpha: 0 });
      if (currentCard) gsap.set(currentCard, { autoAlpha: 1, filter: 'none', x: 0 });
      if (previousProjects) gsap.set(previousProjects, { autoAlpha: 0 });
      if (currentProjects) gsap.set(currentProjects, { autoAlpha: 1, filter: 'none' });
      if (stack) gsap.set(stack, { rotation: rotations[activeIndex], y: 0, scale: 1 });
      setOutgoingIndex(null);
      return;
    }

    const timeline = gsap.timeline({
      onComplete: () => setOutgoingIndex(null),
    });

    if (previousCard && currentCard) {
      const previousHeading = previousCard.querySelector('h2');
      const previousParagraph = previousCard.querySelector('p');
      const previousButton = previousCard.querySelector('a');
      const currentHeading = currentCard.querySelector('h2');
      const currentParagraph = currentCard.querySelector('p');
      const currentButton = currentCard.querySelector('a');

      timeline
        .fromTo(
          previousCard,
          { autoAlpha: 1, rotation: 0, y: 0 },
          { autoAlpha: 0, rotation: -1.2, y: -8, duration: 0.38, ease: 'power2.out' },
          0,
        )
        .fromTo(
          currentCard,
          { autoAlpha: 0, rotation: 1.2, y: 10 },
          { autoAlpha: 1, rotation: 0, y: 0, duration: 0.58, ease: 'power3.out' },
          0.08,
        );

      if (previousHeading && previousParagraph && previousButton) {
        timeline
          .fromTo(previousHeading, { filter: 'blur(0px)', x: 0 }, {
            filter: 'blur(9px)',
            x: -8,
            duration: 0.32,
            ease: 'power2.out',
          }, 0)
          .fromTo(previousParagraph, { filter: 'blur(0px)', x: 0 }, {
            filter: 'blur(10px)',
            x: -10,
            duration: 0.38,
            ease: 'power2.out',
          }, 0.04)
          .fromTo(previousButton, { filter: 'blur(0px)', x: 0 }, {
            filter: 'blur(8px)',
            x: -8,
            duration: 0.34,
            ease: 'power2.out',
          }, 0.08);
      }

      if (currentHeading && currentParagraph && currentButton) {
        timeline
          .fromTo(currentHeading, { filter: 'blur(9px)', x: 12 }, {
            filter: 'blur(0px)',
            x: 0,
            duration: 0.54,
            ease: 'power3.out',
          }, 0.1)
          .fromTo(currentParagraph, { filter: 'blur(11px)', x: 14 }, {
            filter: 'blur(0px)',
            x: 0,
            duration: 0.64,
            ease: 'power3.out',
          }, 0.16)
          .fromTo(currentButton, { filter: 'blur(8px)', x: 10 }, {
            filter: 'blur(0px)',
            x: 0,
            duration: 0.56,
            ease: 'power3.out',
          }, 0.23);
      }
    }

    if (previousProjects && currentProjects) {
      timeline
        .fromTo(
          previousProjects.querySelectorAll('[data-project-item]'),
          { autoAlpha: 1, y: 0, filter: 'blur(0px) grayscale(0)' },
          {
            autoAlpha: 0.25,
            y: 8,
            filter: 'blur(12px) grayscale(1)',
            duration: 0.38,
            stagger: 0.04,
            ease: 'power2.out',
          },
          0,
        )
        .fromTo(
          currentProjects.querySelectorAll('[data-project-item]'),
          { autoAlpha: 0.42, y: 12, filter: 'blur(16px) grayscale(1)' },
          {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px) grayscale(0)',
            duration: 0.72,
            stagger: 0.1,
            ease: 'power3.out',
          },
          0.16,
        );
    }

    timeline
      .to(stack, {
        y: 13,
        rotation: rotations[activeIndex] + 1.5,
        scale: 0.985,
        duration: 0.22,
        ease: 'power2.in',
      }, 0)
      .to(stack, {
        y: 0,
        rotation: rotations[activeIndex],
        scale: 1,
        duration: 0.65,
        ease: 'elastic.out(1, 0.68)',
      }, 0.2)
      .to(stack.querySelector(`.${styles.stackBackOne}`), {
        x: 14,
        y: 7,
        rotation: 2,
        duration: 0.38,
        ease: 'power2.out',
      }, 0)
      .to(stack.querySelector(`.${styles.stackBackTwo}`), {
        x: -12,
        y: 12,
        rotation: -2.3,
        duration: 0.48,
        ease: 'power2.out',
      }, 0.04);

    if (decorationRef.current) {
      timeline.to(
        decorationRef.current,
        {
          x: activeIndex % 2 === 0 ? 8 : -8,
          y: activeIndex > 1 ? -7 : 7,
          duration: 0.8,
          ease: 'power2.out',
        },
        0,
      );
    }

    return () => {
      timeline.kill();
    };
  }, [activeIndex, outgoingIndex]);

  const selectTab = (index: number) => {
    if (index === activeIndex || outgoingIndex !== null) return;
    const selectedTab = tabRefs.current[index];
    const activePill = activePillRef.current;
    if (selectedTab && activePill) {
      const targetX = selectedTab.offsetLeft - 8;
      const targetWidth = selectedTab.offsetWidth;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.killTweensOf(activePill);
        gsap.set(activePill, { x: targetX, width: targetWidth });
      } else {
        gsap.killTweensOf(activePill);
        const currentX = Number(gsap.getProperty(activePill, 'x')) || 0;
        const direction = targetX >= currentX ? 1 : -1;
        const stretchedWidth = targetWidth * 1.32;
        const stretchedX = targetX - (direction < 0 ? stretchedWidth - targetWidth : 0);

        gsap.timeline()
          .to(activePill, {
            x: stretchedX,
            width: stretchedWidth,
            duration: 0.34,
            ease: 'power2.inOut',
          })
          .to(activePill, {
            x: targetX,
            width: targetWidth,
            duration: 0.48,
            ease: 'elastic.out(1, 0.62)',
          });
      }
    }

    activeIndexRef.current = index;
    setOutgoingIndex(activeIndex);
    setActiveIndex(index);
  };

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-label="Our services"
      id="services"
    >
      <header className={styles.header}>
        <Link className={styles.wordmark} href="/" aria-label="Awake home">
          awake.
        </Link>
        <div className={styles.headerActions}>
          <Link className={styles.contactLink} href="/contacts">
            get in touch.
          </Link>
          <button
            className={styles.menuButton}
            type="button"
            aria-expanded={isOpen}
            aria-controls="site-menu"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            onClick={toggle}
          >
            <span>menu.</span>
            <i aria-hidden="true" />
            <i aria-hidden="true" />
          </button>
        </div>
      </header>

      <h1 className={styles.srOnly}>Our services</h1>
      <svg
        ref={decorationRef}
        className={styles.decoration}
        data-decoration={services[activeIndex].slug}
        viewBox="0 0 700 560"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <pattern id="services-dot-grid" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.1" />
          </pattern>
        </defs>
        <g className={styles.webflowArt}>
          <rect x="90" y="45" width="520" height="470" fill="url(#services-dot-grid)" stroke="none" />
        </g>
        <g className={styles.uxArt}>
          <path d="M70 0v560M130 0v560M190 0v560M250 0v560M310 0v560M370 0v560M430 0v560M490 0v560M550 0v560M610 0v560M0 80h700M0 140h700M0 200h700M0 260h700M0 320h700M0 380h700M0 440h700M0 500h700" />
          <rect x="390" y="150" width="116" height="236" rx="12" />
          <path d="M405 178h86M405 352h54M428 366h26" />
          <circle cx="448" cy="265" r="22" />
          <rect x="520" y="300" width="116" height="236" rx="12" />
          <path d="M535 328h86M535 502h54M558 516h26" />
          <circle cx="578" cy="415" r="22" />
        </g>
        <g className={styles.brandingArt}>
          <path d="M95 390C85 260 165 120 310 95c130-22 230 48 265 154 35 106-12 223-109 276-92 50-205 29-268-40-49-54-57-137-13-195 43-56 127-75 190-43 60 30 86 100 66 162-19 58-77 95-138 83-49-10-82-50-81-96 1-40 30-72 68-75 32-3 61 17 69 47" />
          <path d="M210 432c52-84 142-130 236-122 45 4 84 20 117 46M141 220c64 37 114 47 164 35 62-15 99-61 142-103" />
          <circle cx="310" cy="95" r="5" />
          <circle cx="575" cy="249" r="5" />
          <circle cx="466" cy="525" r="5" />
        </g>
        <g className={styles.supportArt}>
          <path d="M100 330c82-65 137-92 204-67 76 28 81 113 163 117 48 2 90-21 133-62M110 183c87 34 145 56 201 18 51-34 84-56 140-39 41 13 79 45 128 37M180 455c50-52 105-83 171-72 62 10 90 62 151 66" />
          <circle cx="100" cy="330" r="28" />
          <circle cx="304" cy="263" r="43" />
          <circle cx="467" cy="380" r="31" />
          <circle cx="600" cy="318" r="20" />
          <circle cx="110" cy="183" r="17" />
          <circle cx="311" cy="201" r="25" />
          <circle cx="451" cy="162" r="34" />
          <circle cx="579" cy="199" r="15" />
          <circle cx="180" cy="455" r="18" />
          <circle cx="351" cy="383" r="27" />
          <circle cx="502" cy="449" r="16" />
        </g>
      </svg>

      <div className={styles.projects} aria-label="Selected projects">
        {services.map((service, index) => (
          <div
            className={`${styles.projectSet} ${index === activeIndex ? styles.projectSetCurrent : ''} ${index === outgoingIndex ? styles.projectSetOutgoing : ''}`}
            data-project-set={index}
            key={service.slug}
            aria-hidden={index !== activeIndex}
          >
            {service.projects.map((item, projectIndex) => (
              <Link
                key={item.slug}
                href={`/projects/${item.slug}`}
                className={`${styles.project} ${projectIndex === 1 ? styles.projectStaggered : ''}`}
                data-project-item
                tabIndex={index === activeIndex ? 0 : -1}
              >
                <span className={styles.projectImage}>
                  <Image
                    src={item.baseImg}
                    alt={`${item.title} project`}
                    fill
                    sizes="(max-width: 800px) 0px, 22vw"
                    unoptimized
                  />
                </span>
                <span className={styles.projectMeta}>
                  <span className={styles.projectDiscipline}>
                    {item.discipline} · {item.year}
                  </span>
                  <span className={styles.projectTitle}>{item.title}</span>
                </span>
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div className={styles.stackPosition}>
        <div className={styles.stack} ref={stackRef}>
          <div className={styles.stackFloat} ref={stackFloatRef}>
            <div className={`${styles.stackBack} ${styles.stackBackOne}`} aria-hidden="true" />
            <div className={`${styles.stackBack} ${styles.stackBackTwo}`} aria-hidden="true" />
            {services.map((service, index) => {
              const isCurrent = index === activeIndex;
              const isOutgoing = index === outgoingIndex;
              if (!isCurrent && !isOutgoing) return null;
              return (
                <article
                  key={service.slug}
                  className={`${styles.card} ${isCurrent ? styles.cardCurrent : styles.cardOutgoing}`}
                  data-service-card={index}
                  role="tabpanel"
                  id={`service-panel-${service.slug}`}
                  aria-labelledby={`service-tab-${service.slug}`}
                  aria-hidden={!isCurrent}
                >
                  <div className={styles.cardCopy}>
                    <h2>{service.title}</h2>
                    <p>{service.copy}</p>
                    <Link className={styles.moreButton} href={`/services/${service.slug}`}>
                      more information
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      <div
        className={styles.tabs}
        role="tablist"
        aria-label="Services"
      >
        <span className={styles.activeTabPill} ref={activePillRef} aria-hidden="true" />
        {services.map((service, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
              key={service.slug}
              type="button"
              role="tab"
              id={`service-tab-${service.slug}`}
              aria-controls={`service-panel-${service.slug}`}
              aria-selected={isActive}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              onClick={() => selectTab(index)}
            >
              {service.number}. {service.tabLabel}
            </button>
          );
        })}
      </div>
    </section>
  );
}
