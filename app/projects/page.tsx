'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { ProjectsCanvas } from '@/components/projects/ProjectsCanvas';

export default function ProjectsPage() {
  return (
    <main id="main">
      <div className="page-module__4ccqhG__page">
        <div className="page-module__4ccqhG__navRow">
          <Navbar variant="dev" />
        </div>
        <ProjectsCanvas />
      </div>
    </main>
  );
}
