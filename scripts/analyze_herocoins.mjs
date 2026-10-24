import fs from 'fs';

const code = fs.readFileSync('scripts/herocoins_entire_module.js', 'utf8');

// Look for coin count, colors, palette, bodies
const coinMatch = code.match(/(\[\s*\{[^\}]*color[^\}]*\}[^\]]*\])/);
if (coinMatch) {
  console.log('COIN ARRAY:', coinMatch[1]);
} else {
  console.log('No direct coin array match, searching for color definitions...');
  const colorMatches = [...code.matchAll(/(#[0-9a-fA-F]{6}|0x[0-9a-fA-F]{6})/g)].map(m => m[0]);
  console.log('Hex colors:', [...new Set(colorMatches)]);
}

// Find Matter.js setup
const matterIdx = code.indexOf('Matter');
console.log('Matter index:', matterIdx);
if (matterIdx !== -1) {
  console.log('Around Matter:\n', code.slice(matterIdx - 200, matterIdx + 1000));
}

// Find how coins are spawned / launched
const startIdx = code.indexOf('HeroCoins",0,function');
console.log('HeroCoins function start:\n', code.slice(startIdx, startIdx + 3000));
