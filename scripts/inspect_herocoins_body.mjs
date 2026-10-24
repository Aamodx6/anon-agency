import fs from 'fs';

const code = fs.readFileSync('scripts/herocoins_entire_module.js', 'utf8');

const startIdx = code.indexOf('HeroCoins",0,function');
// Print 10,000 characters starting from 32000
console.log(code.slice(startIdx + 3000, startIdx + 12000));
