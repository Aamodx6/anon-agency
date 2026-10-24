import fs from 'node:fs';
import path from 'node:path';

const pages = [
  'projects.html',
  'services.html',
  'contacts.html',
  'privacy.html',
  'cookies.html',
  'terms.html',
  'projects_mihailove.html',
  'services_webflow-development.html'
];

for (const p of pages) {
  const html = fs.readFileSync(`scripts/pages/${p}`, 'utf8');
  const bodyMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  if (bodyMatch) {
    const main = bodyMatch[0].replace(/<script[\s\S]*?<\/script>/gi, '');
    const tags = [...main.matchAll(/<(main|section|header|footer|nav|article|aside|h1|h2|h3)[^>]*>/gi)].map(m => m[0]);
    console.log(`\n=== ${p} ===`);
    console.log(tags.slice(0, 10).join('\n'));
  }
}
