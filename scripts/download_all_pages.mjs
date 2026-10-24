import fs from 'node:fs';
import path from 'node:path';

const urls = [
  '/',
  '/projects',
  '/services',
  '/contacts',
  '/privacy',
  '/cookies',
  '/terms',
  '/projects/mihailove',
  '/projects/frame',
  '/projects/portfolio-ventures',
  '/projects/manypixels',
  '/projects/rally',
  '/projects/rhinestone',
  '/projects/ezra',
  '/projects/korelabs',
  '/projects/trustyfy',
  '/projects/cortland',
  '/projects/riverlight',
  '/projects/sib',
  '/projects/reach-industries',
  '/projects/squirrelled',
  '/projects/ot-playground',
  '/projects/hamlet-gardens',
  '/projects/aimplify',
  '/projects/auxility',
  '/projects/cybercapitalist',
  '/projects/aviatize',
  '/projects/bro-traffic',
  '/projects/covalent',
  '/projects/nomee',
  '/services/webflow-development',
  '/services/ux-ui-design',
  '/services/branding',
  '/services/webflow-maintains-support'
];

async function fetchAll() {
  fs.mkdirSync('scripts/pages', { recursive: true });
  for (const p of urls) {
    const slug = p === '/' ? 'home' : p.replace(/\//g, '_').slice(1);
    const filePath = `scripts/pages/${slug}.html`;
    try {
      console.log(`Fetching ${p}...`);
      const res = await fetch('https://www.awakeagency.dev' + p);
      if (!res.ok) {
        console.error(`Failed ${p}: ${res.status}`);
        continue;
      }
      const html = await res.text();
      fs.writeFileSync(filePath, html);
      console.log(`Saved ${slug}.html (${html.length} chars)`);
    } catch (e) {
      console.error(`Error ${p}:`, e.message);
    }
  }
}

fetchAll();
