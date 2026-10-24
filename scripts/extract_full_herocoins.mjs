import fs from 'fs';

const text = fs.readFileSync('scripts/hero_coins_chunk.js', 'utf8');

// Find where HeroCoins component starts and ends
const startIdx = text.indexOf('HeroCoins",0,function');
console.log('Start index:', startIdx);

// Look backwards for helper functions (RoomEnvironment, materials, geometries, Matter engine, etc.)
// Turbopack module starts at:
const modStart = text.lastIndexOf('"use strict";', startIdx);
console.log('Module start:', modStart);

// Save the entire module section
const code = text.slice(modStart, startIdx + 20000);
fs.writeFileSync('scripts/herocoins_full_source.js', code);
console.log('Saved scripts/herocoins_full_source.js, length:', code.length);
