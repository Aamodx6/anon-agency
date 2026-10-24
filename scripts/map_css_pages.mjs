import fs from 'node:fs';
import path from 'node:path';

const pagesDir = 'scripts/pages';
const files = fs.readdirSync(pagesDir);

for (const file of files) {
  if (!file.endsWith('.html')) continue;
  const content = fs.readFileSync(path.join(pagesDir, file), 'utf8');
  const cssMatches = [...content.matchAll(/href="(\/_next\/static\/immutable\/chunks\/[^"]+\.css)"/g)].map(m => m[1].split('/').pop());
  console.log(`${file.padEnd(35)} -> ${cssMatches.join(', ')}`);
}
