'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CtaBand } from '@/components/CtaBand';
import { GooeyThumb } from '@/components/GooeyThumb';
import { PROJECTS } from '@/data/projects';

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
            {PROJECTS.map(project => {
              const baseImg = project.images[0]?.src || '';
              const hoverImg = project.images[1]?.src || baseImg;
              const discipline = project.services ? project.services.split('·')[0].trim() : 'Development';

              return (
                <li key={project.slug} className="CaseCanvas-module__BpNJTq__listItem">
                  <Link
                    className="CaseTile-module__SHADKG__tile"
                    data-page-label={project.title}
                    data-case-slug={project.slug}
                    data-case-flip=""
                    data-flip-src={hoverImg}
                    href={`/projects/${project.slug}`}
                  >
                    <span className="CaseTile-module__SHADKG__thumb">
                      <GooeyThumb
                        alt={`${project.title}, ${project.industry}`}
                        src={baseImg}
                        hoverSrc={hoverImg}
                        width={380}
                        height={440}
                      />
                    </span>
                    <span className="CaseTile-module__SHADKG__meta">
                      <span className="CaseTile-module__SHADKG__discipline">
                        {discipline}
                      </span>
                      <span className="CaseTile-module__SHADKG__title">
                        {project.title}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <CtaBand spacing="page" />
        <Footer />
      </div>
    </main>
  );
}
