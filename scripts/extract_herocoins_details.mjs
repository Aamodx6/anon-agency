import fs from 'fs';

const text = fs.readFileSync('scripts/hero_coins_chunk.js', 'utf8');

// Find all occurrences of HeroCoins in the chunk
const matches = [...text.matchAll(/HeroCoins/g)];
console.log('HeroCoins occurrences:', matches.map(m => m.index));

for (const m of matches) {
  const start = Math.max(0, m.index - 200);
  const end = Math.min(text.length, m.index + 2000);
  console.log(`\n--- AT ${m.index} ---\n`, text.slice(start, end));
}
