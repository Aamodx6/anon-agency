import fs from 'node:fs';
import path from 'node:path';

const pagesDir = 'scripts/pages';
const files = fs.readdirSync(pagesDir);
const allCssFiles = new Set();

for (const file of files) {
  if (!file.endsWith('.html')) continue;
  const content = fs.readFileSync(path.join(pagesDir, file), 'utf8');
  const cssMatches = [...content.matchAll(/href="(\/_next\/static\/[^"]+\.css)"/g)].map(m => m[1]);
  for (const c of cssMatches) {
    allCssFiles.add(c);
  }
}

console.log('All CSS files across all pages:', Array.from(allCssFiles));
