import fs from 'node:fs';

const files = fs.readdirSync('scripts/js');
for (const f of files) {
  if (!f.endsWith('.js')) continue;
  const content = fs.readFileSync(`scripts/js/${f}`, 'utf8');
  // Match webpack / turbopack module names
  const moduleNames = [...content.matchAll(/["']([./][^"']+\.(?:tsx|ts|jsx|js|css))["']/g)].map(m => m[1]);
  if (moduleNames.length > 0) {
    const unique = [...new Set(moduleNames)];
    console.log(`=== ${f} === (${unique.length} modules)`);
    console.log(unique.slice(0, 15).join('\n'));
  }
}
