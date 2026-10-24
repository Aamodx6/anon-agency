'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CtaBand } from '@/components/CtaBand';
import { GRID_PROJECTS } from '@/data/projectsGrid';

export default function ProjectsPage() {
  return (
    <main id="main">
      <div className="page-module__4ccqhG__page">
        <div className="page-module__4ccqhG__navRow">
          <Navbar variant="dev" />
        </div>

        <section
          className="CaseCanvas-module__BpNJTq__root"
          data-mode="list"
          aria-label="Our projects"
        >
          <ul className="CaseCanvas-module__BpNJTq__list" data-canonical="">
            {GRID_PROJECTS.map((project) => (
              <li key={project.slug} className="CaseCanvas-module__BpNJTq__listItem">
                <Link
                  className="CaseTile-module__SHADKG__tile"
                  data-page-label={project.title}
                  data-case-slug={project.slug}
                  data-case-flip=""
                  data-flip-src={project.hoverImg}
                  href={`/projects/${project.slug}`}
                >
                  <span className="CaseTile-module__SHADKG__thumb">
                    <img
                      alt={`${project.title}, ${project.discipline}`}
                      loading="lazy"
                      width={380}
                      height={440}
                      className="CaseTile-module__SHADKG__img CaseTile-module__SHADKG__base"
                      src={project.baseImg}
                    />
                    <img
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      width={380}
                      height={440}
                      className="CaseTile-module__SHADKG__img CaseTile-module__SHADKG__hover"
                      src={project.hoverImg}
                    />
                  </span>
                  <span className="CaseTile-module__SHADKG__meta">
                    <span className="CaseTile-module__SHADKG__discipline">
                      {project.discipline}
                    </span>
                    <span className="CaseTile-module__SHADKG__title">
                      {project.title}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <CtaBand spacing="page" />
        <Footer />
      </div>
    </main>
  );
}
