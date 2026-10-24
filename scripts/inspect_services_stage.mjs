import fs from 'node:fs';

const html = fs.readFileSync('scripts/pages/services.html', 'utf8');
const main = html.match(/<section class="ServicesShowcase-module__RU0Ola__stage"[\s\S]*?<\/section>/);
if (main) {
  console.log(main[0].slice(0, 3000));
}
