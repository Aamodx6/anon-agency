import puppeteer from 'puppeteer-core';
import fs from 'fs';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function main() {
  console.log('--- TESTING HERO LAUNCH & 3D COINS ANIMATION ---');
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

  // 1. Initial Load
  console.log('1. Navigating to http://localhost:3005/ ...');
  await page.goto('http://localhost:3005/', { waitUntil: 'domcontentloaded' });
  await page.screenshot({ path: 'scripts/hero_step1_loader.png' });

  // 2. Wait for loader count-up and frame morph (1.2s)
  console.log('2. Waiting for frame morph...');
  await new Promise(r => setTimeout(r, 900));
  await page.screenshot({ path: 'scripts/hero_step2_morph.png' });

  // 3. Wait for letter slide-in (2.0s)
  console.log('3. Waiting for split letter reveal...');
  await new Promise(r => setTimeout(r, 1100));
  await page.screenshot({ path: 'scripts/hero_step3_letters.png' });

  const layoutCheck = await page.evaluate(() => {
    const lines = document.querySelectorAll('.Hero-module__KTD73a__headline > [data-split-line]');
    const kicker = document.querySelector('.Hero-module__KTD73a__kicker');
    const heroRect = document.querySelector('.Hero-module__KTD73a__hero')?.getBoundingClientRect();
    
    const lineResults = Array.from(lines).map(line => {
      const words = Array.from(line.children).map(w => ({
        text: w.textContent?.trim(),
        rect: w.getBoundingClientRect()
      }));
      return words;
    });

    return {
      lines: lineResults,
      kickerRect: kicker?.getBoundingClientRect(),
      heroRect
    };
  });
  console.log('Layout check:', JSON.stringify(layoutCheck, null, 2));

  // 4. Wait for 3D Coins to drop and settle (total 5.5s)
  console.log('4. Waiting for 3D Coins to cascade and settle...');
  await new Promise(r => setTimeout(r, 4500));
  await page.screenshot({ path: 'scripts/hero_step4_coins_settled.png' });

  const coinsCheck = await page.evaluate(() => {
    const host = document.querySelector('.HeroCoins-module__gZVsqG__host');
    const canvas = host?.querySelector('canvas');
    return {
      hostExists: !!host,
      canvasExists: !!canvas,
      canvasWidth: canvas?.width,
      canvasHeight: canvas?.height,
      webglContext: !!canvas?.getContext('webgl2') || !!canvas?.getContext('webgl')
    };
  });
  console.log('Coins Check:', coinsCheck);

  // 5. Test Drag & Toss Coin Interaction
  console.log('5. Testing drag and toss interaction...');
  const heroBox = await page.$('.Hero-module__KTD73a__hero');
  if (heroBox) {
    const box = await heroBox.boundingBox();
    if (box) {
      // Pick up a coin from the cluster (around x: 75% of width, y: 88% of height)
      const startX = box.x + box.width * 0.75;
      const startY = box.y + box.height * 0.88;

      await page.mouse.move(startX, startY);
      await page.mouse.down();
      // Drag upwards to the left (toss into the air)
      await page.mouse.move(box.x + box.width * 0.45, box.y + box.height * 0.45, { steps: 10 });
      await new Promise(r => setTimeout(r, 60));
      await page.mouse.up();
      console.log('Tossed coin from cluster towards center!');
      await new Promise(r => setTimeout(r, 500));
      await page.screenshot({ path: 'scripts/hero_step5_coin_tossed.png' });
    }
  }

  console.log('Console Errors caught:', errors);
  await browser.close();
  console.log('--- ALL HERO & COINS CHECKS COMPLETED ---');
}

main().catch(console.error);
