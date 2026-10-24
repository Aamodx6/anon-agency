import fs from 'node:fs';

const cssFiles = [
  '/_next/static/immutable/chunks/25r05hs-1y9y_.css',
  '/_next/static/immutable/chunks/1c43k4umql0d7.css',
  '/_next/static/immutable/chunks/1orffevq10308.css'
];

async function downloadCss() {
  fs.mkdirSync('scripts/css', { recursive: true });
  for (const file of cssFiles) {
    const filename = file.split('/').pop();
    const res = await fetch('https://www.awakeagency.dev' + file);
    const text = await res.text();
    fs.writeFileSync(`scripts/css/${filename}`, text);
    console.log(`Saved ${filename}: ${text.length} chars`);
  }
}

downloadCss();
