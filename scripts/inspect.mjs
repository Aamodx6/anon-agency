import fs from 'node:fs';
import path from 'node:path';

async function main() {
  const res = await fetch('https://www.awakeagency.dev/');
  const html = await res.text();
  fs.writeFileSync('scripts/home.html', html);
  console.log('Homepage saved, length:', html.length);

  // Extract CSS
  const cssMatches = [...html.matchAll(/href="(\/_next\/static\/css\/[^"]+)"/g)].map(m => m[1]);
  console.log('CSS links:', cssMatches);

  // Extract Fonts
  const fontMatches = [...html.matchAll(/href="(\/_next\/static\/immutable\/media\/[^"]+)"/g)].map(m => m[1]);
  console.log('Font links:', fontMatches);

  // Extract scripts
  const scriptMatches = [...html.matchAll(/src="(\/_next\/static\/[^"]+)"/g)].map(m => m[1]);
  console.log('Scripts count:', scriptMatches.length);
  console.log('Scripts:', scriptMatches);
}

main().catch(console.error);
