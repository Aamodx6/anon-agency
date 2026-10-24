import fs from 'node:fs';
import path from 'node:path';

const projectFiles = fs.readdirSync('scripts/pages').filter(f => f.startsWith('projects_') && f.endsWith('.html'));

const projects = [];

for (const file of projectFiles) {
  const slug = file.replace('projects_', '').replace('.html', '');
  const html = fs.readFileSync(`scripts/pages/${file}`, 'utf8');

  // Title
  const titleMatch = html.match(/<h1 class="page-module__y7JjWq__title"[^>]*>([\s\S]*?)<\/h1>/);
  const rawTitle = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : slug;
  const title = rawTitle.endsWith('.') ? rawTitle.slice(0, -1) : rawTitle;

  // Intro
  const introMatch = html.match(/<p class="page-module__y7JjWq__intro"[^>]*>([\s\S]*?)<\/p>/);
  const intro = introMatch ? introMatch[1].trim() : '';

  // Meta items
  const metaItems = [...html.matchAll(/<dt class="page-module__y7JjWq__metaLabel">([\s\S]*?)<\/dt>\s*<dd class="page-module__y7JjWq__metaValue">([\s\S]*?)<\/dd>/g)];
  const meta = {};
  for (const m of metaItems) {
    const key = m[1].trim().toLowerCase();
    const val = m[2].replace(/<[^>]+>/g, '').trim();
    meta[key] = val;
  }

  // Site link
  const siteLinkMatch = html.match(/<a class="page-module__y7JjWq__metaLink"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/);
  const siteUrl = siteLinkMatch ? siteLinkMatch[1] : null;
  const siteLabel = siteLinkMatch ? siteLinkMatch[2].trim() : null;

  // Images in gallery
  const imgMatches = [...html.matchAll(/<img[^>]+src="([^">]+)"[^>]*alt="([^"]*)"/g)].map(m => ({
    src: m[1].replace(/&amp;/g, '&'),
    alt: m[2]
  }));

  // Schema LD JSON
  const schemaMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  let schema = null;
  if (schemaMatch) {
    try {
      schema = JSON.parse(schemaMatch[1]);
    } catch {}
  }

  // Next case
  const nextCaseMatch = html.match(/<a class="CaseWorks-module__eWMvkG__nextLink"[^>]*href="\/projects\/([^"]+)"/);
  const nextSlug = nextCaseMatch ? nextCaseMatch[1] : null;

  projects.push({
    slug,
    title,
    intro,
    services: meta['services'] || '',
    industry: meta['industry'] || '',
    year: meta['year'] || '',
    country: meta['country'] || '',
    siteUrl,
    siteLabel,
    images: imgMatches,
    nextSlug,
    schema
  });
}

console.log(`Extracted ${projects.length} projects.`);
fs.writeFileSync('scripts/projects_data.json', JSON.stringify(projects, null, 2));
console.log('Saved scripts/projects_data.json');
