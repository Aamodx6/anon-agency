import puppeteer from 'puppeteer-core';
import fs from 'fs';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('https://www.awakeagency.dev/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 6000));

  const coinPositions = await page.evaluate(() => {
    // In Three.js / window, can we inspect the scene objects or positions?
    // Let's check canvases
    const hero = document.querySelector('section');
    const heroRect = hero?.getBoundingClientRect();

    // Take screenshot of settled hero
    return {
      heroRect,
    };
  });

  await page.screenshot({ path: 'scripts/ref_settled_positions.png' });
  console.log('Saved scripts/ref_settled_positions.png');

  await browser.close();
}

main().catch(console.error);
