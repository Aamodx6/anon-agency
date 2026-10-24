import fs from 'node:fs';

const html = fs.readFileSync('scripts/pages/home.html', 'utf8');

// 1. Inspect Loader and Hero
const heroMatch = html.match(/<section class="Hero-module__KTD73a__hero[\s\S]*?<\/section>/);
if (heroMatch) {
  console.log('=== HERO SECTION ===');
  console.log(heroMatch[0].slice(0, 1500));
}

// 2. Inspect CTA Band ("I need" flow)
const ctaMatch = html.match(/<section class="CtaBand-module__4ELZEW__band[\s\S]*?<\/section>/);
if (ctaMatch) {
  console.log('\n=== CTA BAND ===');
  console.log(ctaMatch[0].slice(0, 2000));
}

// 3. Inspect Consent Banner
const consentMatch = html.match(/<div class="ConsentBanner-module__l3wmYG[\s\S]*?<\/div>/);
if (consentMatch) {
  console.log('\n=== CONSENT BANNER ===');
  console.log(consentMatch[0]);
}

// 4. Inspect Menu Overlay
const menuMatch = html.match(/<div id="site-menu"[\s\S]*?<\/aside>/);
if (menuMatch) {
  console.log('\n=== MENU OVERLAY ===');
  console.log(menuMatch[0].slice(0, 1500));
}
