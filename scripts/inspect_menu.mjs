import fs from 'node:fs';

const html = fs.readFileSync('scripts/home_dom.html', 'utf8');
const menu = html.match(/<div id="site-menu"[\s\S]*?<\/div>\s*<\/aside>/) || html.match(/<aside[\s\S]*?<\/aside>/);
if (menu) {
  console.log('Menu length:', menu[0].length);
  console.log(menu[0].slice(0, 3000));
}
