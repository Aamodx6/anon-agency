import fs from 'node:fs';

const html = fs.readFileSync('scripts/home_dom.html', 'utf8');
const start = html.indexOf('ConsentBanner-module__l3wmYG__wrap');
if (start !== -1) {
  console.log(html.slice(start - 10, start + 2500));
}
