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

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  console.log('Navigating to http://localhost:3005 ...');
  await page.goto('http://localhost:3005/', { waitUntil: 'networkidle2' });

  // 1. Scroll to about section
  console.log('Scrolling to #about section...');
  await page.evaluate(() => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 600));

  // Screenshot initial state
  await page.screenshot({ path: 'scripts/statement_step1_initial.png' });

  const initialCheck = await page.evaluate(() => {
    const texts = Array.from(document.querySelectorAll('.Statement-module__6Nrrla__text'));
    return {
      t0LinesCount: texts[0]?.querySelectorAll('.split-measured-line').length,
      t1LinesCount: texts[1]?.querySelectorAll('.split-measured-line').length,
      t0FirstLineTransform: texts[0]?.querySelector('.split-measured-line')?.style.transform,
      t1FirstLineTransform: texts[1]?.querySelector('.split-measured-line')?.style.transform,
    };
  });
  console.log('--- Initial State at #about ---', initialCheck);

  // 2. Scroll down 400px to trigger mid-rotation scrub
  console.log('Scrolling down 400px (mid-rotation scrub)...');
  await page.evaluate(() => window.scrollBy(0, 400));
  await new Promise(r => setTimeout(r, 400));

  await page.screenshot({ path: 'scripts/statement_step2_mid.png' });

  const midCheck = await page.evaluate(() => {
    const texts = Array.from(document.querySelectorAll('.Statement-module__6Nrrla__text'));
    return {
      t0Transforms: Array.from(texts[0]?.querySelectorAll('.split-measured-line') || []).map(l => l.style.transform),
      t1Transforms: Array.from(texts[1]?.querySelectorAll('.split-measured-line') || []).map(l => l.style.transform),
    };
  });
  console.log('--- Mid-Scrub Transforms ---', midCheck);

  // 3. Scroll down another 600px to complete the 3D roll
  console.log('Scrolling down 600px (completed roll)...');
  await page.evaluate(() => window.scrollBy(0, 600));
  await new Promise(r => setTimeout(r, 400));

  await page.screenshot({ path: 'scripts/statement_step3_complete.png' });

  const finalCheck = await page.evaluate(() => {
    const texts = Array.from(document.querySelectorAll('.Statement-module__6Nrrla__text'));
    return {
      t0FirstLineTransform: texts[0]?.querySelector('.split-measured-line')?.style.transform,
      t1FirstLineTransform: texts[1]?.querySelector('.split-measured-line')?.style.transform,
    };
  });
  console.log('--- Final State ---', finalCheck);
  console.log('Errors:', errors);

  await browser.close();
}

main().catch(console.error);
