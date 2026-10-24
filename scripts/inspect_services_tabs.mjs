import fs from 'node:fs';

const html = fs.readFileSync('scripts/services_stage.html', 'utf8');
const tabMatches = [...html.matchAll(/role="(tablist|tab|tabpanel)"[^>]*>/g)].map(m => m[0]);
console.log('Tab elements found:\n', tabMatches.join('\n'));
