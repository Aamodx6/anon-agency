import fs from 'node:fs';

const html = fs.readFileSync('scripts/pages/projects_mihailove.html', 'utf8');
const nextCaseMatch = html.match(/<section class="CaseWorks-module__eWMvkG__section"[\s\S]*?<\/section>/);
if (nextCaseMatch) {
  console.log('Next case HTML:\n', nextCaseMatch[0]);
}
