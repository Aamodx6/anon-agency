import fs from 'fs';

const code = fs.readFileSync('scripts/js/0oeym6ebubcfy.js', 'utf8');
const searchStr = '["Statement",0,function';
const idx = code.indexOf(searchStr);
if (idx !== -1) {
  console.log('--- FOUND AT', idx);
  console.log(code.slice(idx, idx + 5000));
} else {
  console.log('NOT FOUND');
}
