import fs from 'node:fs';

const serviceFiles = [
  'services_webflow-development.html',
  'services_ux-ui-design.html',
  'services_branding.html',
  'services_webflow-maintains-support.html'
];

const services = [];

for (const file of serviceFiles) {
  const slug = file.replace('services_', '').replace('.html', '');
  const html = fs.readFileSync(`scripts/pages/${file}`, 'utf8');

  // Title
  const titleMatch = html.match(/<h1 class="PageHero-module__3JSMhW__title"[^>]*>([\s\S]*?)<\/h1>/);
  const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : slug;

  // Hero intro
  const heroBodyMatch = html.match(/<p class="PageHero-module__3JSMhW__lead"[^>]*>([\s\S]*?)<\/p>/) || html.match(/<p class="PageHero-module__3JSMhW__body"[^>]*>([\s\S]*?)<\/p>/);
  const heroIntro = heroBodyMatch ? heroBodyMatch[1].replace(/<[^>]+>/g, '').trim() : '';

  // Deliverables
  const delivMatch = html.match(/<section class="Deliverables-module__rs733q__section"[\s\S]*?<\/section>/);
  // How We Work
  const howMatch = html.match(/<section class="HowWeWork-module__kq1Iga__section"[\s\S]*?<\/section>/);

  services.push({
    slug,
    title,
    heroIntro,
    deliverablesHtml: delivMatch ? delivMatch[0] : '',
    howWeWorkHtml: howMatch ? howMatch[0] : ''
  });
}

console.log(`Extracted ${services.length} services.`);
fs.writeFileSync('scripts/services_data.json', JSON.stringify(services, null, 2));
console.log('Saved scripts/services_data.json');
