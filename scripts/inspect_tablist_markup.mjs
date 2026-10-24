import fs from 'node:fs';

const html = fs.readFileSync('scripts/services_stage.html', 'utf8');
const tablistMatch = html.match(/<div class="ServicesShowcase-module__RU0Ola__tablistWrap"[\s\S]*?<\/div>\s*<\/div>/) || html.match(/<div role="tablist"[\s\S]*?<\/div>/);
if (tablistMatch) {
  console.log('Tablist markup:\n', tablistMatch[0]);
}
