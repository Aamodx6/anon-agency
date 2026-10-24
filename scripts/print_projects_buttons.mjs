import fs from 'node:fs';

const html = fs.readFileSync('scripts/pages/projects.html', 'utf8');
const controls = [...html.matchAll(/<button[^>]*>([\s\S]*?)<\/button>/g)].map(m => m[0]);
console.log('Buttons on projects page:\n', controls.join('\n'));
