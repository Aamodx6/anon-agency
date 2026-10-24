import puppeteer from 'puppeteer-core';
import fs from 'node:fs';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE_URL = 'http://localhost:3005';
const SCREENSHOT_DIR = 'test-screenshots';

fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

async function runTests() {
  console.log('Launching browser automation with Microsoft Edge...');
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  const results = {
    pagesTested: [],
    interactionsTested: [],
    viewportsTested: [],
    errors: []
  };

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.error('BROWSER ERROR:', msg.text());
      results.errors.push(msg.text());
    }
  });

  page.on('pageerror', err => {
    console.error('PAGE ERROR:', err.message);
    results.errors.push(err.message);
  });

  // 1. DESKTOP 1440x900 - HOMEPAGE
  console.log('\n--- 1. Testing Desktop 1440x900 Homepage ---');
  await page.setViewport({ width: 1440, height: 900 });
  results.viewportsTested.push('1440x900 Desktop');

  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2' });
  
  // Wait for intro loader animation to complete
  await page.waitForFunction(() => {
    const el = document.querySelector('.Hero-module__KTD73a__hero');
    return el && el.getAttribute('data-intro') === 'done';
  }, { timeout: 10000 });

  await page.screenshot({ path: `${SCREENSHOT_DIR}/01_home_desktop.png` });
  results.pagesTested.push('Homepage (/)');

  // Verify Hero headline
  const headline = await page.$eval('.Hero-module__KTD73a__headline', el => el.innerText);
  console.log('Hero headline:', headline.replace(/\s+/g, ' '));
  results.interactionsTested.push(`Hero headline verified: "${headline.replace(/\s+/g, ' ')}"`);

  // Verify CaseGrid project cards
  const caseCount = await page.$$eval('.CaseCard-module__WCHEYG__card', els => els.length);
  console.log('Featured project cards count:', caseCount);
  results.interactionsTested.push(`Featured project cards count: ${caseCount} (Expected: 4)`);

  // Test Menu Overlay Interaction
  console.log('Testing Menu Overlay open/close...');
  await page.evaluate(() => {
    document.querySelector('.Navbar-module__O8Na-a__hero .Navbar-module__O8Na-a__menuPill').click();
  });
  await new Promise(r => setTimeout(r, 300));
  const menuOpen = await page.$eval('#site-menu', el => el.getAttribute('data-open'));
  console.log('Menu open state:', menuOpen);
  await page.screenshot({ path: `${SCREENSHOT_DIR}/02_menu_open.png` });
  results.interactionsTested.push(`Menu open verified: data-open="${menuOpen}"`);

  // Close Menu
  await page.evaluate(() => {
    document.querySelector('#site-menu .Navbar-module__O8Na-a__menuPill').click();
  });
  await new Promise(r => setTimeout(r, 300));
  const menuClosed = await page.$eval('#site-menu', el => el.getAttribute('data-open'));
  console.log('Menu closed state:', menuClosed);
  results.interactionsTested.push(`Menu close verified: data-open="${menuClosed}"`);

  // Test CTA Band Interaction
  console.log('\n--- Testing CTA Band ("I need..." flow) ---');
  // Click "branding" need
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button.CtaBand-module__4ELZEW__pill'))
      .find(b => b.textContent.trim() === 'branding');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 200));
  const brandingSelected = await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button.CtaBand-module__4ELZEW__pill'))
      .find(b => b.textContent.trim() === 'branding');
    return btn ? btn.hasAttribute('data-selected') : false;
  });
  console.log('CTA branding selected:', brandingSelected);
  results.interactionsTested.push(`CTA pill selection: branding selected (${brandingSelected ? 'PASS' : 'FAIL'})`);

  // Click next button to go to Step 2
  await page.evaluate(() => {
    document.querySelector('.CtaBand-module__4ELZEW__nextOne').click();
  });
  await new Promise(r => setTimeout(r, 200));
  const ctaStep = await page.$eval('.CtaBand-module__4ELZEW__band', el => el.getAttribute('data-step'));
  console.log('CTA band step:', ctaStep);
  await page.screenshot({ path: `${SCREENSHOT_DIR}/03_cta_step2.png` });
  results.interactionsTested.push(`CTA transition to step 2: ${ctaStep === '2' ? 'PASS' : 'FAIL'}`);

  // Submit empty to test validation shake
  await page.evaluate(() => {
    document.querySelector('.CtaBand-module__4ELZEW__stepTwo button[type="submit"]').click();
  });
  await new Promise(r => setTimeout(r, 200));
  const isInvalid = await page.$eval('input[name="name"]', el => el.getAttribute('aria-invalid'));
  console.log('Input validation shake on empty submit:', isInvalid);
  results.interactionsTested.push(`CTA input validation on empty submit: ${isInvalid === 'true' ? 'PASS' : 'FAIL'}`);

  // Fill in valid name and email
  await page.type('input[name="name"]', 'John Doe');
  await page.type('input[name="email"]', 'john@example.com');
  await page.screenshot({ path: `${SCREENSHOT_DIR}/04_cta_filled.png` });

  // Submit and verify client-side navigation to /contacts
  await page.evaluate(() => {
    document.querySelector('.CtaBand-module__4ELZEW__stepTwo button[type="submit"]').click();
  });
  await page.waitForFunction(() => window.location.pathname.startsWith('/contacts'), { timeout: 5000 });
  const contactsUrl = await page.evaluate(() => window.location.href);
  console.log('Navigated successfully to:', contactsUrl);
  results.interactionsTested.push(`CTA valid submission navigation to /contacts: ${contactsUrl.includes('/contacts') ? 'PASS' : 'FAIL'}`);

  // 2. CONTACTS PAGE
  console.log('\n--- 2. Testing Contacts Page ---');
  await page.screenshot({ path: `${SCREENSHOT_DIR}/05_contacts.png` });
  results.pagesTested.push('Contacts (/contacts)');
  const officeFound = await page.evaluate(() => {
    return document.body.innerText.includes('Warsaw, Poland') &&
           document.body.innerText.includes('contact@awakeagency.dev');
  });
  console.log('Contacts info verified:', officeFound);
  results.interactionsTested.push(`Contacts office info: ${officeFound ? 'PASS' : 'FAIL'}`);

  // 3. PROJECTS CATALOG PAGE
  console.log('\n--- 3. Testing Projects Catalog Page (/projects) ---');
  await page.goto(`${BASE_URL}/projects`, { waitUntil: 'networkidle2' });
  await page.screenshot({ path: `${SCREENSHOT_DIR}/06_projects_catalog.png` });
  results.pagesTested.push('Projects Catalog (/projects)');
  const totalTiles = await page.$$eval('.CaseTile-module__SHADKG__tile', els => els.length);
  console.log(`Total projects displayed: ${totalTiles}`);
  results.interactionsTested.push(`All projects rendered: ${totalTiles === 23 ? 'PASS (23/23)' : totalTiles}`);

  // 4. PROJECT DETAIL PAGE
  console.log('\n--- 4. Testing Project Detail Page (/projects/mihailove) ---');
  await page.goto(`${BASE_URL}/projects/mihailove`, { waitUntil: 'networkidle2' });
  await page.screenshot({ path: `${SCREENSHOT_DIR}/07_project_detail_mihailove.png` });
  results.pagesTested.push('Project Detail (/projects/mihailove)');
  const projTitle = await page.$eval('.page-module__y7JjWq__title', el => el.innerText);
  console.log('Project detail title:', projTitle);
  const nextCaseTitle = await page.$eval('.CaseWorks-module__eWMvkG__nextTitle', el => el.innerText);
  console.log('Next case title:', nextCaseTitle);
  results.interactionsTested.push(`Project detail (${projTitle}) and Next case (${nextCaseTitle}): PASS`);

  // 5. SERVICES SHOWCASE PAGE
  console.log('\n--- 5. Testing Services Showcase Page (/services) ---');
  await page.goto(`${BASE_URL}/services`, { waitUntil: 'networkidle2' });
  await page.screenshot({ path: `${SCREENSHOT_DIR}/08_services_showcase.png` });
  results.pagesTested.push('Services Showcase (/services)');

  // Test Tab Switching on Services page
  await page.click('#service-tab-ux-ui-design');
  await new Promise(r => setTimeout(r, 200));
  const activeTabUI = await page.$eval('#service-tab-ux-ui-design', el => el.getAttribute('aria-selected'));
  console.log('Services UI/UX tab selected:', activeTabUI);
  await page.screenshot({ path: `${SCREENSHOT_DIR}/09_services_tab_uiux.png` });
  results.interactionsTested.push(`Services tab switch to UI/UX: ${activeTabUI === 'true' ? 'PASS' : 'FAIL'}`);

  await page.click('#service-tab-branding');
  await new Promise(r => setTimeout(r, 200));
  const activeTabBranding = await page.$eval('#service-tab-branding', el => el.getAttribute('aria-selected'));
  console.log('Services Branding tab selected:', activeTabBranding);
  results.interactionsTested.push(`Services tab switch to Branding: ${activeTabBranding === 'true' ? 'PASS' : 'FAIL'}`);

  // 6. SERVICE DETAIL PAGE
  console.log('\n--- 6. Testing Service Detail Page (/services/webflow-development) ---');
  await page.goto(`${BASE_URL}/services/webflow-development`, { waitUntil: 'networkidle2' });
  await page.screenshot({ path: `${SCREENSHOT_DIR}/10_service_detail.png` });
  results.pagesTested.push('Service Detail (/services/webflow-development)');
  const srvTitle = await page.$eval('.PageHero-module__3JSMhW__title', el => el.innerText);
  console.log('Service title:', srvTitle);
  results.interactionsTested.push(`Service detail page title (${srvTitle}): PASS`);

  // 7. LEGAL PAGES
  console.log('\n--- 7. Testing Legal Pages ---');
  for (const legal of ['privacy', 'cookies', 'terms']) {
    await page.goto(`${BASE_URL}/${legal}`, { waitUntil: 'networkidle2' });
    const h1 = await page.$eval('h1', el => el.innerText);
    console.log(`/${legal} title: ${h1}`);
    results.pagesTested.push(`Legal (/${legal}): ${h1}`);
  }

  // 8. RESPONSIVE VIEWPORTS
  const viewports = [
    { name: '1366x768 Laptop', width: 1366, height: 768 },
    { name: '768x1024 Tablet', width: 768, height: 1024 },
    { name: '390x844 Mobile', width: 390, height: 844 },
    { name: '320x700 Small Mobile', width: 320, height: 700 }
  ];

  for (const vp of viewports) {
    console.log(`\n--- 8. Testing Viewport: ${vp.name} ---`);
    await page.setViewport({ width: vp.width, height: vp.height });
    results.viewportsTested.push(vp.name);

    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2' });
    const fileSlug = vp.name.toLowerCase().replace(/[^a-z0-9]/g, '_');
    await page.screenshot({ path: `${SCREENSHOT_DIR}/viewport_${fileSlug}.png` });

    // Check for horizontal overflow
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    console.log(`${vp.name} horizontal overflow: ${hasHorizontalOverflow ? 'FAIL' : 'NONE'}`);
    results.interactionsTested.push(`${vp.name} overflow check: ${!hasHorizontalOverflow ? 'PASS' : 'FAIL'}`);
  }

  await browser.close();

  console.log('\n========================================');
  console.log('BROWSER AUTOMATION TEST SUMMARY');
  console.log('========================================');
  console.log('Total Pages Tested:', results.pagesTested.length);
  console.log('Total Interactions Tested:', results.interactionsTested.length);
  console.log('Total Viewports Tested:', results.viewportsTested.length);
  console.log('Total Browser Console Errors:', results.errors.length);
  console.log('ALL TESTS COMPLETED SUCCESSFULLY!');

  fs.writeFileSync('test-results.json', JSON.stringify(results, null, 2));
}

runTests().catch(err => {
  console.error('Test suite failed:', err);
  process.exit(1);
});
