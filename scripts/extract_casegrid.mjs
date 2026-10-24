import fs from 'fs';

const code = fs.readFileSync('scripts/js/0oeym6ebubcfy.js', 'utf8');

const marker = '"CaseGrid",0,function';
const idx = code.indexOf(marker);
console.log(code.slice(idx - 600, idx));
