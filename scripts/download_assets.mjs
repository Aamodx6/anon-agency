import fs from 'node:fs';
import path from 'node:path';

const fonts = [
  '/_next/static/immutable/media/Aeonik_Medium-s.p.0um2v56wren_e.woff2',
  '/_next/static/immutable/media/Aeonik_Regular-s.p.1als1ieqqf52p.woff2',
  '/_next/static/immutable/media/Syne_Bold-s.p.1w23n7mqnf0pf.woff2',
  '/_next/static/immutable/media/Syne_ExtraBold-s.p.2fszkhnze5qic.woff2',
  '/_next/static/immutable/media/Syne_Medium-s.p.1-k-cb1fdb49y.woff2',
  '/_next/static/immutable/media/Syne_Regular-s.p.2l8r0yvcn7z_9.woff2',
  '/_next/static/immutable/media/Syne_SemiBold-s.p.1s70n-b6f4ah0.woff2'
];

async function downloadFonts() {
  fs.mkdirSync('public/fonts', { recursive: true });
  for (const f of fonts) {
    const filename = f.split('/').pop().replace(/-s\.p\..*?\.woff2/, '') + '.woff2';
    console.log(`Downloading font: ${f} -> ${filename}`);
    const res = await fetch('https://www.awakeagency.dev' + f);
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(`public/fonts/${filename}`, buf);
  }
}

async function downloadFavicons() {
  fs.mkdirSync('public', { recursive: true });
  for (const f of ['/favicon.ico', '/icon.svg', '/apple-icon.png']) {
    try {
      const res = await fetch('https://www.awakeagency.dev' + f);
      if (res.ok) {
        const buf = Buffer.from(await res.arrayBuffer());
        const filename = f.slice(1);
        fs.writeFileSync(`public/${filename}`, buf);
        console.log(`Downloaded ${filename}`);
      }
    } catch (e) {
      console.error(e.message);
    }
  }
}

async function run() {
  await downloadFonts();
  await downloadFavicons();
}
run();
