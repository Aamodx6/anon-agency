import fs from 'fs';

const code = fs.readFileSync('scripts/js/0oeym6ebubcfy.js', 'utf8');

const marker = 'attachLetterSwap';
const idx = code.indexOf(marker);
console.log(code.slice(idx - 100, idx + 1500));
