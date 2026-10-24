import fs from 'node:fs';

const html = fs.readFileSync('scripts/pages/services.html', 'utf8');
const cardMatches = [...html.matchAll(/<article class="ServicesShowcase-module__RU0Ola__card"[\s\S]*?<\/article>/g)];
console.log(`Found ${cardMatches.length} service showcase cards:`);
if (cardMatches[0]) {
  console.log('Sample card HTML:\n', cardMatches[0][0].slice(0, 1500));
}
