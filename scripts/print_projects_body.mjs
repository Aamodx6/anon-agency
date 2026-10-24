import fs from 'node:fs';

const html = fs.readFileSync('scripts/pages/projects.html', 'utf8');
const main = html.match(/<main id="main"[\s\S]*?<\/main>/);
if (main) {
  console.log(main[0].slice(2500, 6000));
}
