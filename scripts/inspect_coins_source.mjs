import fs from 'fs';

const text = fs.readFileSync('scripts/hero_coins_chunk.js', 'utf8');

// Search for HeroCoins definition
const idx = text.indexOf('HeroCoins');
console.log('HeroCoins index:', idx);
if (idx !== -1) {
  console.log(text.slice(Math.max(0, idx - 500), idx + 1500));
}

// Search for colors, coin parameters, physics, matter or rapier or cannon
const keywords = ['color', 'radius', 'gravity', 'mesh', 'cylinder', 'texture', 'canvas', 'Matter', 'physics', 'Rapier', 'palette'];
for (const k of keywords) {
  const i = text.indexOf(k);
  console.log(`Keyword '${k}': index ${i}`);
}
