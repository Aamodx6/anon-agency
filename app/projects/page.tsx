'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CtaBand } from '@/components/CtaBand';
import { CaseCanvas } from '@/components/CaseCanvas';
import { GRID_PROJECTS } from '@/data/projectsGrid';

export default function ProjectsPage() {
  return (
    <main id="main">
      <div className="page-module__4ccqhG__page">
        <div className="page-module__4ccqhG__navRow">
          <Navbar variant="dev" />
        </div>

        <CaseCanvas items={GRID_PROJECTS} />

        <CtaBand spacing="page" />
        <Footer />
      </div>
    </main>
  );
}
