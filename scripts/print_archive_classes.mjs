import fs from 'node:fs';

const html = fs.readFileSync('scripts/archive.html', 'utf8');
const tags = [...html.matchAll(/<([a-zA-Z0-9]+)\s+class="([^"]+)"/g)].map(m => `<${m[1]} class="${m[2]}">`);
console.log(tags.slice(0, 30).join('\n'));
