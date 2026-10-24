import fs from 'node:fs';

const html = fs.readFileSync('scripts/pages/services_webflow-development.html', 'utf8');
const deliv = html.match(/<section class="Deliverables-module__rs733q__section"[\s\S]*?<\/section>/);
const how = html.match(/<section class="HowWeWork-module__kq1Iga__section"[\s\S]*?<\/section>/);

if (deliv) {
  console.log('Deliverables section length:', deliv[0].length);
  fs.writeFileSync('scripts/deliv.html', deliv[0]);
}
if (how) {
  console.log('How we work section length:', how[0].length);
  fs.writeFileSync('scripts/how.html', how[0]);
}
