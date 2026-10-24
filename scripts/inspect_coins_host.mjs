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

  await page.goto('https://www.awakeagency.dev/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 4000));

  const coinHostInfo = await page.evaluate(() => {
    const host = document.querySelector('[class*="HeroCoins"], [class*="host"]');
    const canvases = Array.from(document.querySelectorAll('canvas'));
    const hero = document.querySelector('section');
    return {
      hostHTML: host ? host.outerHTML.slice(0, 1000) : null,
      hostStyles: host ? {
        position: window.getComputedStyle(host).position,
        zIndex: window.getComputedStyle(host).zIndex,
        width: window.getComputedStyle(host).width,
        height: window.getComputedStyle(host).height,
        pointerEvents: window.getComputedStyle(host).pointerEvents,
      } : null,
      canvases: canvases.map(c => ({
        parentClass: c.parentElement?.className,
        width: c.width,
        height: c.height,
        style: c.getAttribute('style')
      }))
    };
  });

  console.log('Coin Host Info:', JSON.stringify(coinHostInfo, null, 2));
  await page.screenshot({ path: 'scripts/ref_coins_settled.png' });
  console.log('Saved scripts/ref_coins_settled.png');

  await browser.close();
}

main().catch(console.error);
