import fs from 'node:fs';
import path from 'node:path';

const allScripts = new Set();
for (const f of fs.readdirSync('scripts/pages')) {
  if (!f.endsWith('.html')) continue;
  const content = fs.readFileSync(`scripts/pages/${f}`, 'utf8');
  const matches = [...content.matchAll(/src="(\/_next\/static\/[^"]+\.js)"/g)].map(m => m[1]);
  for (const m of matches) {
    allScripts.add(m);
  }
}

console.log(`Total JS files across all pages: ${allScripts.size}`);
console.log(Array.from(allScripts));
