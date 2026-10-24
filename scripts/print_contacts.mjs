import fs from 'node:fs';

const html = fs.readFileSync('scripts/pages/contacts.html', 'utf8');
const mainMatch = html.match(/<main id="main"[\s\S]*?<\/main>/);
if (mainMatch) {
  console.log(mainMatch[0].slice(0, 3000));
}
