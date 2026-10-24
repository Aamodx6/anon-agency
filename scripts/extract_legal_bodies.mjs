import fs from 'node:fs';

for (const p of ['privacy', 'cookies', 'terms']) {
  const html = fs.readFileSync(`scripts/pages/${p}.html`, 'utf8');
  const heroMatch = html.match(/<section class="PageHero-module__3JSMhW__hero[\s\S]*?<\/section>/);
  const legalMatch = html.match(/<section class="LegalPage-module__QUED1W__section"[\s\S]*?<\/section>/);
  fs.writeFileSync(`scripts/${p}_body.html`, `${heroMatch ? heroMatch[0] : ''}\n${legalMatch ? legalMatch[0] : ''}`);
  console.log(`Saved scripts/${p}_body.html`);
}
