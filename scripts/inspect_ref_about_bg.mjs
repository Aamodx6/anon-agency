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

  // 1. Inspect the statement section (#about) SVG and background
  const aboutInfo = await page.evaluate(() => {
    const about = document.getElementById('about');
    if (!about) return { error: '#about not found' };

    // Find all SVGs, canvases, or animated background elements inside or around #about
    const svgs = Array.from(about.querySelectorAll('svg')).map(s => ({
      className: s.className.baseVal || s.className,
      viewBox: s.getAttribute('viewBox'),
      outerHTML: s.outerHTML.slice(0, 2000),
      pathCount: s.querySelectorAll('path, line, circle, rect').length
    }));

    // Find all elements with classes containing ribbon, drawing, vector, grid, bg, etc.
    const allBg = Array.from(about.querySelectorAll('*')).filter(el => {
      const tag = el.tagName.toLowerCase();
      return tag === 'svg' || tag === 'canvas' || (el.className && typeof el.className === 'string' && (el.className.includes('bg') || el.className.includes('svg') || el.className.includes('Ribbon') || el.className.includes('drawing')));
    }).map(el => ({
      tagName: el.tagName,
      className: el.className,
      outerHTML: el.outerHTML.slice(0, 500)
    }));

    return {
      aboutOuterHTMLPrefix: about.outerHTML.slice(0, 1500),
      svgs,
      allBg
    };
  });

  fs.writeFileSync('scripts/ref_about_bg.json', JSON.stringify(aboutInfo, null, 2));
  console.log('Saved scripts/ref_about_bg.json');

  // Let's scroll into #about and see how the background changes
  await page.evaluate(() => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({ path: 'scripts/ref_about_scrolled.png' });
  console.log('Saved scripts/ref_about_scrolled.png');

  await browser.close();
}

main().catch(console.error);
