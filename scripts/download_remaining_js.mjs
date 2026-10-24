import fs from 'node:fs';

const scripts = [
  '11kx_iz_4e-sv.js',
  '3k-b3bxaib98_.js',
  '3_xeh7_al84ar.js',
  '0z714kesjy8s-.js',
  '1eu_7t26ci5ct.js',
  '3t_5fqx_romn_.js',
  '1rb-sy6xtnk0l.js',
  '1wjs0g122-72v.js',
  '22-m8eqwv7_s3.js',
  '1t7nuvkh7h4ny.js',
  '0afjhnonl6e9_.js'
];

async function download() {
  for (const s of scripts) {
    try {
      const res = await fetch('https://www.awakeagency.dev/_next/static/immutable/chunks/' + s);
      const text = await res.text();
      fs.writeFileSync(`scripts/js/${s}`, text);
      console.log(`Saved ${s} (${text.length} chars)`);
    } catch (e) {
      console.error(e.message);
    }
  }
}

download();
