import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CtaBand } from '@/components/CtaBand';
import { PROJECTS } from '@/data/projects';

export const dynamicParams = false;

const PROJECT_ALIASES: Record<string, string> = {
  'solvo': 'frame',
  'better-sleep': 'portfolio-ventures',
};

export function generateStaticParams() {
  const base = PROJECTS.map(p => ({ slug: p.slug }));
  Object.keys(PROJECT_ALIASES).forEach(alias => {
    base.push({ slug: alias });
  });
  return base;
}

export default async function ProjectDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const targetSlug = PROJECT_ALIASES[slug] || slug;
  const projectIndex = PROJECTS.findIndex(p => p.slug === targetSlug);
  if (projectIndex === -1) {
    notFound();
  }

  const project = PROJECTS[projectIndex];
  const nextProject = PROJECTS[(projectIndex + 1) % PROJECTS.length];

  return (
    <main id="main">
      <article className="page-module__y7JjWq__page">
        <div className="page-module__y7JjWq__navRow">
          <Navbar variant="dev" />
        </div>

        <div className="page-module__y7JjWq__inner">
          <h1 className="page-module__y7JjWq__title" data-node-id="2233:1401">
            {project.title}
            <span className="page-module__y7JjWq__dot">.</span>
          </h1>

          <p className="page-module__y7JjWq__intro">{project.intro}</p>

          <dl className="page-module__y7JjWq__metaRow">
            <div className="page-module__y7JjWq__metaItem">
              <dt className="page-module__y7JjWq__metaLabel">Services</dt>
              <dd className="page-module__y7JjWq__metaValue">{project.services}</dd>
            </div>
            <div className="page-module__y7JjWq__metaItem">
              <dt className="page-module__y7JjWq__metaLabel">Industry</dt>
              <dd className="page-module__y7JjWq__metaValue">{project.industry}</dd>
            </div>
            <div className="page-module__y7JjWq__metaItem">
              <dt className="page-module__y7JjWq__metaLabel">Year</dt>
              <dd className="page-module__y7JjWq__metaValue">{project.year}</dd>
            </div>
            <div className="page-module__y7JjWq__metaItem">
              <dt className="page-module__y7JjWq__metaLabel">Country</dt>
              <dd className="page-module__y7JjWq__metaValue">{project.country}</dd>
            </div>
            {project.siteUrl && (
              <div className="page-module__y7JjWq__metaItem">
                <dt className="page-module__y7JjWq__metaLabel">Site</dt>
                <dd className="page-module__y7JjWq__metaValue">
                  <a
                    className="page-module__y7JjWq__metaLink"
                    href={project.siteUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {project.siteLabel || project.siteUrl.replace(/https?:\/\//, '').replace(/\/$/, '')}
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </div>

        {/* Gallery Screens */}
        <section
          className="CaseGallery-module__TMT3wW__section"
          aria-label="Project screens"
          aria-describedby="case-summary"
        >
          <ol className="CaseGallery-module__TMT3wW__track">
            {project.images.map((img, idx) => (
              <li
                key={idx}
                className="CaseGallery-module__TMT3wW__slide"
                data-slide={idx}
                data-kind="media"
              >
                <div className="CaseGallery-module__TMT3wW__mediaRow" data-layout="full">
                  <div className="CaseGallery-module__TMT3wW__mediaSlot">
                    <div
                      className="CaseMedia-module__eCldSG__frame"
                      style={{ aspectRatio: '1.7811', position: 'relative' }}
                    >
                      <img
                        alt={img.alt || `${project.title} screen ${idx + 1}`}
                        loading="lazy"
                        className="CaseImage-module__P9a4vW__image CaseImage-module__P9a4vW__fill"
                        style={{
                          position: 'absolute',
                          height: '100%',
                          width: '100%',
                          left: 0,
                          top: 0,
                          right: 0,
                          bottom: 0,
                          objectFit: 'cover'
                        }}
                        src={img.src}
                      />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Next Case Section */}
        {nextProject && (
          <section className="CaseWorks-module__eWMvkG__section" aria-label="Next case">
            <p className="CaseWorks-module__eWMvkG__kicker">Next case</p>
            <Link
              className="CaseWorks-module__eWMvkG__next"
              data-page-label={nextProject.title}
              data-arrow-host=""
              href={`/projects/${nextProject.slug}`}
            >
              <h2 className="CaseWorks-module__eWMvkG__nextTitle">
                {nextProject.title}
                <span className="CaseWorks-module__eWMvkG__dot">.</span>
              </h2>
              <p className="CaseWorks-module__eWMvkG__nextMeta">
                {nextProject.services?.split('·')[0].trim()} · {nextProject.year}
              </p>
              <span className="CaseWorks-module__eWMvkG__badge" aria-hidden="true">
                <span
                  className="SwapArrow-module__0B2EzW__swap"
                  data-dir="up-right"
                  style={{ width: '30px', height: '30px' }}
                  aria-hidden="true"
                >
                  <span className="SwapArrow-module__0B2EzW__a">
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17 17 7" />
                        <path d="M8 7h9v9" />
                      </g>
                    </svg>
                  </span>
                  <span className="SwapArrow-module__0B2EzW__b">
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17 17 7" />
                        <path d="M8 7h9v9" />
                      </g>
                    </svg>
                  </span>
                </span>
              </span>
            </Link>
          </section>
        )}

        <CtaBand spacing="page" />
        <Footer />
      </article>
    </main>
  );
}
