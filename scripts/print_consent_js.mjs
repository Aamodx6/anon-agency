import fs from 'node:fs';

const js = fs.readFileSync('scripts/js/2fynoz9uh28eg.js', 'utf8');
const idx = js.indexOf('ConsentBanner-module__l3wmYG');
if (idx !== -1) {
  console.log(js.slice(Math.max(0, idx - 200), Math.min(js.length, idx + 2000)));
} else {
  console.log('Not found in 2fynoz');
}
