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

  const scripts = [];
  page.on('response', async res => {
    const url = res.url();
    if (url.includes('.js')) {
      scripts.push(url);
    }
  });

  console.log('Navigating to https://www.awakeagency.dev/ ...');
  await page.goto('https://www.awakeagency.dev/', { waitUntil: 'networkidle2' });

  // Get Hero HTML and full CSS classes
  const data = await page.evaluate(() => {
    const heroSection = document.querySelector('section');
    const h1 = document.querySelector('h1');
    const canvas = document.querySelector('canvas');
    const header = document.querySelector('header');
    
    // Find loader or intro elements
    const loader = document.querySelector('[class*="loader"], [data-hero-loader]');

    // Extract computed styles on canvas
    const canvasStyles = canvas ? window.getComputedStyle(canvas) : null;

    // Check if Matter.js or physics is attached to window
    const winKeys = Object.keys(window).filter(k => 
      k.toLowerCase().includes('matter') || 
      k.toLowerCase().includes('physics') || 
      k.toLowerCase().includes('coin') ||
      k.toLowerCase().includes('engine')
    );

    return {
      h1OuterHTML: h1 ? h1.outerHTML : null,
      heroHTML: heroSection ? heroSection.outerHTML.slice(0, 3000) : null,
      headerHTML: header ? header.outerHTML : null,
      canvasInfo: canvas ? {
        className: canvas.className,
        width: canvas.width,
        height: canvas.height,
        style: canvas.getAttribute('style'),
        zIndex: canvasStyles?.zIndex,
        pointerEvents: canvasStyles?.pointerEvents
      } : null,
      loaderHTML: loader ? loader.outerHTML : null,
      winKeys
    };
  });

  fs.writeFileSync('scripts/ref_hero_data.json', JSON.stringify({ data, scripts }, null, 2));
  console.log('Written scripts/ref_hero_data.json');

  await page.screenshot({ path: 'scripts/ref_hero_screenshot.png' });
  console.log('Saved scripts/ref_hero_screenshot.png');

  await browser.close();
}

main().catch(console.error);
