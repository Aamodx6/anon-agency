import fs from 'node:fs';

const html = fs.readFileSync('scripts/home_dom.html', 'utf8');
const footer = html.match(/<footer class="Footer-module__yg9ahW__footer"[\s\S]*?<\/footer>/);
if (footer) {
  console.log(footer[0]);
}
