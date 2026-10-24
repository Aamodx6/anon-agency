import fs from 'fs';

const code = fs.readFileSync('scripts/herocoins_entire_module.js', 'utf8');

const idx = code.indexOf('f.addEventListener("pointerdown",em)');
console.log('Index:', idx);
console.log('Logic before event listeners:\n', code.slice(idx - 4000, idx + 1000));
