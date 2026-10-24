import fs from 'node:fs';

for (const name of ['25r05hs-1y9y_.css', '1c43k4umql0d7.css', '1orffevq10308.css']) {
  const content = fs.readFileSync(`scripts/css/${name}`, 'utf8');
  console.log(`=== ${name} ===`);
  console.log('Sample:', content.slice(0, 300));
  // check for tailwind
  if (content.includes('--tw-') || content.includes('tailwindcss')) {
    console.log('Uses Tailwind CSS!');
  }
  // check for CSS variables
  const rootVars = content.match(/:root\s*\{[^}]+\}/);
  if (rootVars) {
    console.log('Root vars:', rootVars[0].slice(0, 300));
  }
}
