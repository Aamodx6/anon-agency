import fs from 'node:fs';

const content = fs.readFileSync('scripts/js/2wkfko3wa6cjp.js', 'utf8');
const idx = content.indexOf('817035,e=>');
if (idx !== -1) {
  console.log(content.slice(idx + 4000, idx + 8000));
}
