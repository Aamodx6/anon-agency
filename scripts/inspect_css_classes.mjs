import fs from 'node:fs';

const css1 = fs.readFileSync('scripts/css/1c43k4umql0d7.css', 'utf8');
const css2 = fs.readFileSync('scripts/css/25r05hs-1y9y_.css', 'utf8');

console.log('--- CSS 1 (1c43k4umql0d7.css) ---');
const classes1 = new Set([...css1.matchAll(/\.([a-zA-Z0-9_\-]+)/g)].map(m => m[1]));
console.log('Total classes in css1:', classes1.size);
console.log('Sample classes from css1:', [...classes1].slice(0, 30));

console.log('\n--- CSS 2 (25r05hs-1y9y_.css) ---');
const classes2 = new Set([...css2.matchAll(/\.([a-zA-Z0-9_\-]+)/g)].map(m => m[1]));
console.log('Total classes in css2:', classes2.size);
console.log('Sample classes from css2:', [...classes2].slice(0, 30));

// Check @keyframes in both
const keyframes = [...(css1 + css2).matchAll(/@keyframes\s+([a-zA-Z0-9_\-]+)/g)].map(m => m[1]);
console.log('\nKeyframes found:', keyframes);
