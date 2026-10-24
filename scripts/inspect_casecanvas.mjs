import fs from 'node:fs';

const html = fs.readFileSync('scripts/pages/projects.html', 'utf8');
const caseCanvasMatch = html.match(/<section class="CaseCanvas-module__BpNJTq__root"[\s\S]*?<\/section>/);
if (caseCanvasMatch) {
  console.log('CaseCanvas length:', caseCanvasMatch[0].length);
  // find all direct children or classes inside
  const classes = [...caseCanvasMatch[0].matchAll(/class="([^"]+)"/g)].map(m => m[1]);
  console.log('Unique classes inside CaseCanvas:', [...new Set(classes)]);
}
