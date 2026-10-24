import fs from 'node:fs';

const html = fs.readFileSync('scripts/home_dom.html', 'utf8');
const logoMatch = html.match(/<svg class="Logo-module__BPrZ0W__logo"[\s\S]*?<\/svg>/);
if (logoMatch) {
  console.log('Logo SVG found:');
  fs.writeFileSync('scripts/logo.svg', logoMatch[0]);
  console.log('Saved scripts/logo.svg');
}
