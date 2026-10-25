'use client';

import React from 'react';
import { CaseCanvas } from '@/components/CaseCanvas';
import { GRID_PROJECTS } from '@/data/projectsGrid';

export function ProjectsCanvas() {
  return <CaseCanvas items={GRID_PROJECTS} />;
}
