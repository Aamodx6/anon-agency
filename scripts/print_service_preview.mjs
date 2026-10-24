import fs from 'node:fs';

console.log('--- DELIV ---');
console.log(fs.readFileSync('scripts/deliv.html', 'utf8').slice(0, 1000));
console.log('\n--- HOW ---');
console.log(fs.readFileSync('scripts/how.html', 'utf8').slice(0, 1000));
