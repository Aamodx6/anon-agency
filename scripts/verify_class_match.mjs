import fs from 'node:fs';

const html = fs.readFileSync('scripts/home_dom.html', 'utf8');
const cssAll = ['25r05hs-1y9y_.css', '1c43k4umql0d7.css', '1orffevq10308.css']
  .map(f => fs.readFileSync(`scripts/css/${f}`, 'utf8'))
  .join('\n');

const htmlClasses = new Set([...html.matchAll(/class="([^"]+)"/g)].flatMap(m => m[1].split(/\s+/)).filter(Boolean));
console.log('Total unique classes in home HTML:', htmlClasses.size);

let found = 0;
let missing = [];
for (const cls of htmlClasses) {
  if (cssAll.includes(cls)) {
    found++;
  } else {
    missing.push(cls);
  }
}

console.log(`Matched: ${found}/${htmlClasses.size}`);
if (missing.length > 0) {
  console.log('Sample missing classes:', missing.slice(0, 20));
}
