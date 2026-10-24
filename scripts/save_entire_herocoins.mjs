import fs from 'fs';

const text = fs.readFileSync('scripts/hero_coins_chunk.js', 'utf8');
const startIdx = text.indexOf('HeroCoins",0,function');
const nextMod = text.indexOf('"use strict";', startIdx);
console.log('Next module at:', nextMod, 'Total length:', text.length);

const fullCode = text.slice(180, nextMod !== -1 ? nextMod : text.length);
fs.writeFileSync('scripts/herocoins_entire_module.js', fullCode);
console.log('Saved scripts/herocoins_entire_module.js, size:', fullCode.length);
