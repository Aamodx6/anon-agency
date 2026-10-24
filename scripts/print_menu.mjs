import fs from 'node:fs';

const html = fs.readFileSync('scripts/home_dom.html', 'utf8');
const start = html.indexOf('id="site-menu"');
const end = html.indexOf('ConsentBanner', start);
console.log(html.slice(start - 5, end !== -1 ? end : start + 4000));
