import fs from 'node:fs';

const html = fs.readFileSync('scripts/pages/contacts.html', 'utf8');
const bookingMatch = html.match(/<div class="page-module__dZxIWa__booking"[\s\S]*?<\/section>/);
if (bookingMatch) {
  console.log(bookingMatch[0]);
}
