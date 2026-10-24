import fs from 'node:fs';

const html = fs.readFileSync('scripts/pages/projects_mihailove.html', 'utf8');
const mainMatch = html.match(/<article class="page-module__y7JjWq__page"[\s\S]*?<\/article>/);
if (mainMatch) {
  console.log(mainMatch[0].slice(2500, 7500));
}
