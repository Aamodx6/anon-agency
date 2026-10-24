import fs from 'fs';

const code = fs.readFileSync('scripts/js/0oeym6ebubcfy.js', 'utf8');

const marker = 'attachLetterSwap';
let idx = code.indexOf(marker);
idx = code.indexOf(marker, idx + 1);
if (idx === -1) idx = code.indexOf(marker);
console.log(code.slice(idx - 200, idx + 1500));
