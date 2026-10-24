import fs from 'fs';

const code = fs.readFileSync('scripts/js/0oeym6ebubcfy.js', 'utf8');
let idx = code.indexOf('"form"');
while (idx !== -1) {
  console.log('--- FOUND AT', idx);
  console.log(code.slice(Math.max(0, idx - 200), idx + 400));
  idx = code.indexOf('"form"', idx + 1);
  if (idx > 40000) break;
}
