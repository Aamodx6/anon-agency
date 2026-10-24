import fs from 'node:fs';

const css = fs.readFileSync('scripts/css/25r05hs-1y9y_.css', 'utf8');
const fontFaces = [...css.matchAll(/@font-face\{[^}]+\}/g)].map(m => m[0]);
console.log('Font face declarations:\n', fontFaces.join('\n\n'));
