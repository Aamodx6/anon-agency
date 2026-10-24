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
  await page.goto('https://www.awakeagency.dev/', { waitUntil: 'networkidle2' });

  // Get script contents from cache/fetch
  const scriptData = await page.evaluate(async () => {
    const scripts = Array.from(document.querySelectorAll('script[src]')).map(s => s.src);
    const results = {};
    for (const src of scripts) {
      if (src.includes('/chunks/')) {
        try {
          const res = await fetch(src);
          const txt = await res.text();
          const matches = [];
          if (txt.includes('CaseThread')) matches.push('CaseThread');
          if (txt.includes('GooeyThumb')) matches.push('GooeyThumb');
          if (txt.includes('ScrollRibbon')) matches.push('ScrollRibbon');
          if (txt.includes('BandScribble')) matches.push('BandScribble');
          if (txt.includes('coins') || txt.includes('coin')) matches.push('coins');
          if (txt.includes('Matter') || txt.includes('matter')) matches.push('matter');
          if (txt.includes('split-heading') || txt.includes('splitLine')) matches.push('splitLine');
          if (matches.length > 0) {
            results[src] = { matches, length: txt.length };
          }
        } catch (e) {}
      }
    }
    return results;
  });

  console.log('Script matches on reference:', JSON.stringify(scriptData, null, 2));

  await browser.close();
}

main().catch(console.error);
