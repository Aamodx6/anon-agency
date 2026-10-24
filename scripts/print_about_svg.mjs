import fs from 'fs';

let html = fs.readFileSync('scripts/about_svg.html', 'utf8');
html = html.replace(/href="data:image[^"]+"/g, 'href="[BASE64]"');
console.log(html.slice(0, 4000));
