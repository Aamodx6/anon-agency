import fs from 'node:fs';

const html = fs.readFileSync('scripts/home_dom.html', 'utf8');

// Statement
const statement = html.match(/<section class="Statement-module__6Nrrla__statement"[\s\S]*?<\/section>/);
if (statement) {
  console.log('=== STATEMENT ===');
  console.log(statement[0]);
}

// CaseGrid
const caseGrid = html.match(/<section class="CaseGrid-module__tbWBJq__section[\s\S]*?<\/section>/);
if (caseGrid) {
  console.log('\n=== CASEGRID (length) ===', caseGrid[0].length);
  console.log(caseGrid[0].slice(0, 1500));
}

// Archive
const archive = html.match(/<section class="Archive-module__t718NW__section"[\s\S]*?<\/section>/);
if (archive) {
  console.log('\n=== ARCHIVE ===');
  console.log(archive[0]);
}

// ServicesStack
const servicesStack = html.match(/<section class="ServicesStack-module__QW-zbq__section"[\s\S]*?<\/section>/);
if (servicesStack) {
  console.log('\n=== SERVICES STACK (length) ===', servicesStack[0].length);
  console.log(servicesStack[0].slice(0, 1500));
}

// Footer
const footer = html.match(/<footer class="Footer-module__yg9ahW__footer"[\s\S]*?<\/footer>/);
if (footer) {
  console.log('\n=== FOOTER (length) ===', footer[0].length);
  console.log(footer[0].slice(0, 1500));
}
