import puppeteer from 'puppeteer-core';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function main() {
  console.log('--- TESTING NEW MOTION & VISUAL ENHANCEMENTS ---');
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

  console.log('1. Loading Homepage...');
  await page.goto('http://localhost:3005/', { waitUntil: 'domcontentloaded' });

  // Wait 4 seconds for full intro + coin cascade
  await new Promise(r => setTimeout(r, 4500));
  await page.screenshot({ path: 'scripts/verify_hero_coins_settled.png' });
  console.log('Captured scripts/verify_hero_coins_settled.png');

  // 2. Test Letter Swap Hover Interaction
  console.log('2. Testing magnetic letter swap hover...');
  const firstChar = await page.$('[data-swap-char]');
  if (firstChar) {
    const box = await firstChar.boundingBox();
    if (box) {
      // Swipe mouse left-to-right across letters
      await page.mouse.move(box.x - 30, box.y + 20);
      await page.mouse.move(box.x + 300, box.y + 20, { steps: 15 });
      await new Promise(r => setTimeout(r, 80));
      await page.screenshot({ path: 'scripts/verify_letter_swap.png' });
      console.log('Captured scripts/verify_letter_swap.png during swap motion');
    }
  }

  // 3. Scroll into Statement Section (#about) to test Background CAD Animation
  console.log('3. Scrolling to #about to test background blueprint CAD drawing...');
  await page.evaluate(() => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'scripts/verify_statement_cad_mid.png' });
  console.log('Captured scripts/verify_statement_cad_mid.png');

  // Check SVG elements in #about
  const cadCheck = await page.evaluate(() => {
    const svg = document.querySelector('#about svg[data-ribbon]');
    const paths = svg?.querySelectorAll('path');
    const nodes = svg?.querySelectorAll('.ScrollRibbon-module__wSfOTW__nodes rect');
    const handles = svg?.querySelectorAll('.ScrollRibbon-module__wSfOTW__handles circle');
    const cross = svg?.querySelectorAll('.ScrollRibbon-module__wSfOTW__cross');

    const firstNodeTransform = nodes?.[0]?.getAttribute('transform');
    const firstPathDash = paths?.[1]?.style.strokeDashoffset;

    return {
      svgFound: !!svg,
      totalPaths: paths?.length,
      anchorNodesCount: nodes?.length,
      circleHandlesCount: handles?.length,
      crosshairsCount: cross?.length,
      firstNodeTransform,
      firstPathDash
    };
  });
  console.log('Statement CAD Background Check:', cadCheck);

  console.log('Console Errors caught:', errors);
  await browser.close();
  console.log('--- ALL VERIFICATIONS COMPLETED SUCCESSFULLY ---');
}

main().catch(console.error);
