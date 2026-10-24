import fs from 'node:fs';

const html = fs.readFileSync('scripts/pages/services.html', 'utf8');
const stageMatch = html.match(/<section class="ServicesShowcase-module__RU0Ola__stage"[\s\S]*?<\/section>/);
if (stageMatch) {
  fs.writeFileSync('scripts/services_stage.html', stageMatch[0]);
  console.log('Saved scripts/services_stage.html');
}
