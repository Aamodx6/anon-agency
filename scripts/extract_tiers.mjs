import fs from 'fs';

const code = fs.readFileSync('scripts/js/0oeym6ebubcfy.js', 'utf8');

const marker = '"ServicesStack",0,function';
const idx = code.indexOf(marker);
console.log(code.slice(idx - 1000, idx));
