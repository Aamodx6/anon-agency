import fs from 'fs';

const text = fs.readFileSync('scripts/herocoins_entire_module.js', 'utf8');
const idx = text.indexOf('document.addEventListener("visibilitychange",eU)');
console.log(text.slice(idx + 750, idx + 1400));
