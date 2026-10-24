import puppeteer from 'puppeteer-core';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function main() {
  console.log('--- RUNNING FULL 1:1 REPLICATION VERIFICATION PASS ---');
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  // 1. Homepage initial load
  console.log('1. Loading Homepage...');
  await page.goto('http://localhost:3005/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 900));

  const heroCheck = await page.evaluate(() => {
    const heading = document.querySelector('h1[data-split-heading]');
    const canvas = document.querySelector('section[data-intro] canvas');
    const heroLoader = document.querySelector('[data-hero-loader]');
    return {
      title: document.title,
      headingText: heading?.textContent?.trim().slice(0, 32),
      canvasDimensions: canvas ? `${canvas.width}x${canvas.height}` : null,
      heroLoaderZ: heroLoader ? window.getComputedStyle(heroLoader).zIndex : null
    };
  });
  console.log('Hero Check:', heroCheck);

  // 2. Statement 3D cylinder roll
  console.log('2. Statement Section 3D Roll (#about)...');
  await page.evaluate(() => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 600));

  const statementInitial = await page.evaluate(() => {
    const lines = document.querySelectorAll('.Statement-module__6Nrrla__text .split-measured-line');
    return {
      lineCount: lines.length,
      line0Transform: lines[0]?.style.transform,
      line4Transform: lines[4]?.style.transform,
    };
  });
  console.log('Statement Initial at #about:', statementInitial);

  // Mid-scrub
  await page.evaluate(() => window.scrollBy(0, 450));
  await new Promise(r => setTimeout(r, 400));
  const statementMid = await page.evaluate(() => {
    const lines = document.querySelectorAll('.Statement-module__6Nrrla__text .split-measured-line');
    return {
      line0Transform: lines[0]?.style.transform,
      line4Transform: lines[4]?.style.transform,
    };
  });
  console.log('Statement Mid-Scrub 3D Roll:', statementMid);

  // 3. CaseGrid Parallax (#projects)
  console.log('3. CaseGrid Featured Projects (#projects)...');
  await page.evaluate(() => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 600));

  const caseGridCheck = await page.evaluate(() => {
    const items = document.querySelectorAll('.CaseGrid-module__tbWBJq__item');
    const spline = document.querySelector('.CaseGrid-module__tbWBJq__stage svg');
    return {
      itemCount: items.length,
      splineFound: !!spline,
      itemsParallaxTransforms: Array.from(items).map(it => it.style.transform)
    };
  });
  console.log('CaseGrid Check:', caseGridCheck);

  // 4. Archive hover deck
  console.log('4. Archive Section Hover Deck...');
  await page.evaluate(() => {
    document.querySelector('.Archive-module__t718NW__section')?.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 600));

  // Hover over the second item
  const archiveRows = await page.$$('.Archive-module__t718NW__row');
  console.log(`Found ${archiveRows.length} archive rows. Hovering row index 1...`);
  if (archiveRows.length > 1) {
    await archiveRows[1].hover();
    await new Promise(r => setTimeout(r, 400));
  }

  const archiveCheck = await page.evaluate(() => {
    const layers = document.querySelectorAll('.Archive-module__t718NW__layer');
    return {
      deckLayersCount: layers.length,
      layer0Transform: layers[0]?.style.transform,
      layer0Opacity: layers[0]?.style.opacity,
      layer0Filter: layers[0]?.style.filter,
      layer1Transform: layers[1]?.style.transform,
      layer1Opacity: layers[1]?.style.opacity,
    };
  });
  console.log('Archive Deck Hover Check:', archiveCheck);

  // 5. Services Stacking Cards (#services)
  console.log('5. Services Stacking Cards (#services)...');
  await page.evaluate(() => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 600));

  // Scroll to trigger card 2 and card 3 landing
  await page.evaluate(() => window.scrollBy(0, 600));
  await new Promise(r => setTimeout(r, 500));

  const servicesCheck = await page.evaluate(() => {
    const cards = document.querySelectorAll('.ServicesStack-module__QW-zbq__card');
    return {
      cardCount: cards.length,
      cardRotations: Array.from(cards).map(c => c.style.transform)
    };
  });
  console.log('Services Stacking Check:', servicesCheck);

  // 6. Sticky Nav
  console.log('6. Sticky Nav Check...');
  const stickyCheck = await page.evaluate(() => {
    const sticky = document.querySelector('.StickyNav-module__hNdvsq__wrap');
    return {
      exists: !!sticky,
      shown: sticky?.getAttribute('data-shown'),
      computedOpacity: sticky ? window.getComputedStyle(sticky).opacity : null
    };
  });
  console.log('Sticky Nav Check:', stickyCheck);

  // 7. Menu Overlay
  console.log('7. Menu Overlay Check...');
  await page.evaluate(() => {
    const btn = document.querySelector('button[aria-label="Open menu"]');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 400));
  const menuCheck = await page.evaluate(() => {
    const overlay = document.querySelector('#menu-overlay');
    return {
      open: overlay?.getAttribute('data-open'),
      visible: overlay?.getAttribute('data-visible')
    };
  });
  console.log('Menu Overlay Check:', menuCheck);

  // Close menu
  await page.evaluate(() => {
    const btn = document.querySelector('button[aria-label="Close menu"], button[data-open="true"]');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 300));

  console.log('--- ALL CHECKS COMPLETED ---');
  console.log('Console Errors caught:', consoleErrors);

  await browser.close();
}

main().catch(console.error);
