import fs from 'fs';

const code = fs.readFileSync('scripts/herocoins_entire_module.js', 'utf8');
const start = code.indexOf('HeroCoins",0,function');
console.log(code.slice(start + 800, start + 3000));
