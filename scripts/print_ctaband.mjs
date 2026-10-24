import fs from 'node:fs';

const html = fs.readFileSync('scripts/home_dom.html', 'utf8');
const ctaMatch = html.match(/<section class="CtaBand-module__4ELZEW__band[\s\S]*?<\/section>/);
if (ctaMatch) {
  console.log(ctaMatch[0]);
}
