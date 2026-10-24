import puppeteer from 'puppeteer-core';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to http://localhost:3005 ...');
  await page.goto('http://localhost:3005/', { waitUntil: 'networkidle2' });

  // 1. Check Hero Loader
  const loaderCheck = await page.evaluate(() => {
    const loader = document.querySelector('[data-hero-loader]');
    const hero = document.querySelector('.Hero-module__KTD73a__hero');
    const coins = document.querySelector('.HeroCoins-canvas');
    return {
      loaderExists: !!loader,
      loaderTag: loader?.tagName,
      introState: hero?.getAttribute('data-intro'),
      coinsCanvasExists: !!coins
    };
  });
  console.log('--- 1. Hero Loader & Intro ---', loaderCheck);

  // Wait 1.5s for intro animation to complete
  await new Promise(r => setTimeout(r, 1600));

  const afterIntro = await page.evaluate(() => {
    const hero = document.querySelector('.Hero-module__KTD73a__hero');
    const headline = document.querySelector('[data-split-heading]');
    const splitSpans = Array.from(document.querySelectorAll('[data-split-line] span span'));
    return {
      introStateAfterDelay: hero?.getAttribute('data-intro'),
      totalSplitLetters: splitSpans.length,
      sampleLetterTransform: splitSpans[0]?.getAttribute('style')
    };
  });
  console.log('--- 2. Split Letters After Intro ---', afterIntro);

  // 2. Test Hover on GooeyThumb
  const firstThumb = await page.$('.GooeyThumb-module__jKjXxa__media');
  if (firstThumb) {
    const box = await firstThumb.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await new Promise(r => setTimeout(r, 300));
    }
  }

  const gooeyCheck = await page.evaluate(() => {
    const canvases = Array.from(document.querySelectorAll('.GooeyThumb-module__jKjXxa__canvas'));
    return {
      gooeyCanvasCount: canvases.length,
      firstCanvasWidth: canvases[0]?.width,
      firstCanvasHeight: canvases[0]?.height,
      firstCanvasOpacity: canvases[0]?.style.opacity
    };
  });
  console.log('--- 3. GooeyThumb WebGL Canvases ---', gooeyCheck);

  // 3. Scroll to Projects and check CaseThread animation
  console.log('Scrolling down to #projects ...');
  await page.evaluate(() => {
    const el = document.getElementById('projects');
    el?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 500));

  const caseThreadCheck = await page.evaluate(() => {
    const path = document.querySelector('.CaseThread-module__fQt_la__path');
    const svg = document.querySelector('.CaseThread-module__fQt_la__svg');
    return {
      caseThreadSvgExists: !!svg,
      caseThreadPathExists: !!path,
      strokeDasharray: path?.style.strokeDasharray,
      visibility: path?.style.visibility,
      strokeWidth: path?.style.strokeWidth
    };
  });
  console.log('--- 4. CaseThread Scroll Drawing ---', caseThreadCheck);

  // 4. Scroll to Statement and check ScrollRibbon
  console.log('Scrolling to #about (Statement) ...');
  await page.evaluate(() => {
    const el = document.getElementById('about');
    el?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 500));

  const ribbonCheck = await page.evaluate(() => {
    const stmtRibbon = document.querySelector('#about svg[data-ribbon]');
    const paths = stmtRibbon ? Array.from(stmtRibbon.querySelectorAll('path')) : [];
    return {
      stmtRibbonExists: !!stmtRibbon,
      totalPaths: paths.length,
      samplePathDash: paths[0]?.style.strokeDasharray
    };
  });
  console.log('--- 5. Statement ScrollRibbon Paths ---', ribbonCheck);

  // 5. Scroll to Archive section and check BandScribble
  console.log('Scrolling to Archive ...');
  await page.evaluate(() => {
    const el = document.querySelector('.Archive-module__t718NW__section');
    el?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 500));

  const scribbleCheck = await page.evaluate(() => {
    const scribble = document.querySelector('.Archive-module__t718NW__section .BandScribble-module__QwOmAG__path');
    return {
      scribbleExists: !!scribble,
      strokeDasharray: scribble?.style.strokeDasharray,
      visibility: scribble?.style.visibility
    };
  });
  console.log('--- 6. Archive BandScribble Drawing ---', scribbleCheck);

  // Take a full screenshot of the page after animations
  await page.screenshot({ path: 'scripts/animations_live_proof.png', fullPage: false });
  console.log('Live animation verification proof saved to scripts/animations_live_proof.png');

  await browser.close();
}

main().catch(console.error);
