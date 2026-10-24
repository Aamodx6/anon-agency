import fs from 'node:fs';

for (const p of ['privacy.html', 'cookies.html', 'terms.html']) {
  const html = fs.readFileSync(`scripts/pages/${p}`, 'utf8');
  const titleMatch = html.match(/<h1 class="PageHero-module__3JSMhW__title"[^>]*>([\s\S]*?)<\/h1>/);
  const legalSection = html.match(/<section class="LegalPage-module__QUED1W__section"[\s\S]*?<\/section>/);
  console.log(`=== ${p} ===`);
  console.log('Title:', titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : '');
  console.log('Legal section length:', legalSection ? legalSection[0].length : 0);
}
