import fs from 'node:fs';

const html = fs.readFileSync('scripts/home_dom.html', 'utf8');
const caseGrid = html.match(/<section class="CaseGrid-module__tbWBJq__section[\s\S]*?<\/section>/);
if (caseGrid) {
  fs.writeFileSync('scripts/casegrid.html', caseGrid[0]);
  console.log('Saved scripts/casegrid.html');
}
const archive = html.match(/<section class="Archive-module__t718NW__section[\s\S]*?<\/section>/);
if (archive) {
  fs.writeFileSync('scripts/archive.html', archive[0]);
  console.log('Saved scripts/archive.html');
}
