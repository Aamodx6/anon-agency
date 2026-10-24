import fs from 'node:fs';

const html = fs.readFileSync('scripts/pages/services.html', 'utf8');
const casesMatch = html.match(/<div class="ServicesShowcase-module__RU0Ola__cases"[\s\S]*?<\/div>\s*<\/div>/);
if (casesMatch) {
  console.log('Cases wrapper length:', casesMatch[0].length);
  const leftCol = html.match(/<ul class="ServicesShowcase-module__RU0Ola__column ServicesShowcase-module__RU0Ola__columnLeft"[\s\S]*?<\/ul>/);
  const rightCol = html.match(/<ul class="ServicesShowcase-module__RU0Ola__column ServicesShowcase-module__RU0Ola__columnRight"[\s\S]*?<\/ul>/);
  console.log('Left col found:', !!leftCol);
  console.log('Right col found:', !!rightCol);
}
