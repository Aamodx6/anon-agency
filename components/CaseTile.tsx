'use client';

import React from 'react';
import Link from 'next/link';
import { GridProject } from '@/data/projectsGrid';

export function CaseTile({
  item,
  sizes = '380px',
}: {
  item: GridProject;
  sizes?: string;
}) {
  return (
    <Link
      className="CaseTile-module__SHADKG__tile"
      data-page-label={item.title}
      data-case-slug={item.slug}
      data-case-flip=""
      data-flip-src={item.hoverImg}
      href={`/projects/${item.slug}`}
    >
      <span className="CaseTile-module__SHADKG__thumb">
        <img
          alt={`${item.title}, ${item.discipline}`}
          loading="lazy"
          sizes={sizes}
          className="CaseTile-module__SHADKG__img CaseTile-module__SHADKG__base"
          src={item.baseImg}
        />
        <img
          alt=""
          aria-hidden="true"
          loading="lazy"
          sizes={sizes}
          className="CaseTile-module__SHADKG__img CaseTile-module__SHADKG__hover"
          src={item.hoverImg}
        />
      </span>
      <span className="CaseTile-module__SHADKG__meta">
        <span className="CaseTile-module__SHADKG__discipline">
          {item.discipline}
        </span>
        <span className="CaseTile-module__SHADKG__title">{item.title}</span>
      </span>
    </Link>
  );
}
