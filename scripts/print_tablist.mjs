import fs from 'node:fs';

const html = fs.readFileSync('scripts/services_stage.html', 'utf8');
const idx = html.indexOf('role="tablist"');
console.log(html.slice(idx - 100, idx + 1500));
