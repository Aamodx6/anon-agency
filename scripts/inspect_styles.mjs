import fs from 'node:fs';

const html = fs.readFileSync('scripts/home.html', 'utf8');

// Find all style tags
const styleMatches = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)];
console.log('Style tags count:', styleMatches.length);
styleMatches.forEach((m, idx) => {
  console.log(`Style #${idx} length:`, m[1].length, m[1].slice(0, 150));
});

// Find all links
const linkMatches = [...html.matchAll(/<link[^>]+>/g)].map(m => m[0]);
console.log('\nLinks count:', linkMatches.length);
linkMatches.forEach(l => console.log(l));

// Find all images / svgs
const imgMatches = [...html.matchAll(/<img[^>]+src="([^">]+)"/g)].map(m => m[1]);
console.log('\nImage src count:', imgMatches.length);
console.log('Sample image srcs:', imgMatches.slice(0, 10));

// Find all video sources
const videoMatches = [...html.matchAll(/<source[^>]+src="([^">]+)"/g)].map(m => m[1]);
console.log('\nVideo src count:', videoMatches.length);
console.log('Video srcs:', videoMatches);
