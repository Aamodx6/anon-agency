import fs from 'node:fs';

const projects = JSON.parse(fs.readFileSync('scripts/projects_data.json', 'utf8'));

const code = `export interface Project {
  slug: string;
  title: string;
  intro: string;
  services: string;
  industry: string;
  year: string;
  country: string;
  siteUrl: string | null;
  siteLabel: string | null;
  images: Array<{ src: string; alt: string }>;
  nextSlug: string | null;
}

export const PROJECTS: Project[] = ${JSON.stringify(projects, null, 2)};
`;

fs.mkdirSync('data', { recursive: true });
fs.writeFileSync('data/projects.ts', code);
console.log('Saved data/projects.ts with', projects.length, 'projects');
