import fs from 'node:fs';

const html = fs.readFileSync('scripts/home_dom.html', 'utf8');
const start = html.indexOf('class="MenuOverlay-module__wz4T_a__nav"');
const end = html.indexOf('</aside>', start);
console.log(html.slice(start, end !== -1 ? end : start + 3000));
