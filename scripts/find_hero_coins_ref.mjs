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

  // Wait 2 seconds for all intro animations and physics to settle
  await new Promise(r => setTimeout(r, 2000));

  const result = await page.evaluate(() => {
    const hero = document.querySelector('section[class*="Hero"]');
    if (!hero) return { error: 'Hero not found' };

    // Find all children and canvases
    const canvases = Array.from(hero.querySelectorAll('canvas')).map(c => ({
      className: c.className,
      width: c.width,
      height: c.height,
      outerHTML: c.outerHTML
    }));

    // Find all SVGs
    const svgs = Array.from(hero.querySelectorAll('svg')).map(s => ({
      className: s.className,
      viewBox: s.getAttribute('viewBox'),
      parentClass: s.parentElement?.className
    }));

    // Find all coin-like elements or classes
    const allDescendants = Array.from(hero.querySelectorAll('*')).map(el => ({
      tagName: el.tagName,
      className: el.className,
      id: el.id,
      dataset: { ...el.dataset }
    }));

    return {
      canvases,
      svgs,
      allDescendants: allDescendants.slice(0, 50),
      heroFullHTML: hero.outerHTML
    };
  });

  fs.writeFileSync('scripts/hero_full_dom.json', JSON.stringify(result, null, 2));
  console.log('Saved hero_full_dom.json');

  await browser.close();
}

main().catch(console.error);
