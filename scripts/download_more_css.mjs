import fs from 'node:fs';

const additional = [
  '/_next/static/immutable/chunks/2vp9s_omx54dc.css',
  '/_next/static/immutable/chunks/3rlol-cabb1fl.css',
  '/_next/static/immutable/chunks/3niif314l1_01.css'
];

async function download() {
  for (const f of additional) {
    const filename = f.split('/').pop();
    const res = await fetch('https://www.awakeagency.dev' + f);
    const text = await res.text();
    fs.writeFileSync(`scripts/css/${filename}`, text);
    console.log(`Saved ${filename}: ${text.length} chars`);
  }
}

download();
