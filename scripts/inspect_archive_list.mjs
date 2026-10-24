import fs from 'node:fs';

const html = fs.readFileSync('scripts/archive.html', 'utf8');
const items = [...html.matchAll(/<li class="Archive-module__t718NW__item">([\s\S]*?)<\/li>/g)];
console.log('Archive items count:', items.length);
items.forEach((it, i) => {
  const title = it[1].match(/<span class="Archive-module__t718NW__title">([\s\S]*?)<\/span>/);
  const meta = it[1].match(/<span class="Archive-module__t718NW__discipline">([\s\S]*?)<\/span>/);
  const link = it[1].match(/href="([^"]+)"/);
  console.log(`${i+1}: ${title ? title[1] : ''} (${meta ? meta[1] : ''}) -> ${link ? link[1] : ''}`);
});
