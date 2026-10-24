import fs from 'node:fs';

const html = fs.readFileSync('scripts/pages/projects.html', 'utf8');
const tileMatch = html.match(/<a class="CaseTile-module__SHADKG__tile"[\s\S]*?<\/a>/);
if (tileMatch) {
  console.log('Tile HTML:\n', tileMatch[0]);
}
