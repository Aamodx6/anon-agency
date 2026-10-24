import fs from 'fs';

async function main() {
  const text = await fetch('https://www.awakeagency.dev/_next/static/immutable/chunks/0384jp3fs5ath.js').then(r => r.text());
  fs.writeFileSync('scripts/hero_coins_chunk.js', text);
  console.log('Saved scripts/hero_coins_chunk.js, length:', text.length);

  // Search for export HeroCoins or function HeroCoins
  const lines = text.split('\n');
  console.log('Total lines:', lines.length);

  // Find module definitions inside Turbopack array
  const re = /"use strict";/g;
  let match;
  let count = 0;
  while ((match = re.exec(text)) !== null && count < 10) {
    console.log('Module at index:', match.index);
    count++;
  }
}

main().catch(console.error);
