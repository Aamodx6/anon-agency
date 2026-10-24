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

  await page.goto('https://www.awakeagency.dev/', { waitUntil: 'networkidle2' });

  const data = await page.evaluate(() => {
    // 1. Extract CaseThread path data
    const caseThread = document.querySelector('.CaseThread-module__fQt_la__path');
    const caseThreadSvg = document.querySelector('.CaseThread-module__fQt_la__svg');

    // 2. Extract all ribbons
    const ribbons = Array.from(document.querySelectorAll('[data-ribbon]')).map(r => ({
      parentClass: r.parentElement?.className,
      innerHTML: r.innerHTML,
      viewBox: r.getAttribute('viewBox'),
      attrs: Array.from(r.attributes).map(a => `${a.name}="${a.value}"`)
    }));

    // 3. Extract all BandScribbles
    const scribbles = Array.from(document.querySelectorAll('.BandScribble-module__QwOmAG__svg')).map(s => ({
      parentClass: s.parentElement?.className,
      innerHTML: s.innerHTML,
      viewBox: s.getAttribute('viewBox'),
      attrs: Array.from(s.attributes).map(a => `${a.name}="${a.value}"`)
    }));

    // 4. Extract Hero loader structure and computed style
    const heroLoader = document.querySelector('.Hero-module__KTD73a__loader');
    const heroLoaderHtml = heroLoader ? heroLoader.outerHTML : null;

    // 5. Extract headline split structure
    const headline = document.querySelector('[data-split-heading]');
    const headlineHtml = headline ? headline.innerHTML : null;

    // 6. Extract GooeyThumb structure
    const gooey = document.querySelector('.GooeyThumb-module__jKjXxa__media');
    const gooeyHtml = gooey ? gooey.outerHTML : null;

    // 7. Check if there are canvas scripts or matter.js
    const scripts = Array.from(document.scripts).map(s => s.src);

    return {
      caseThread: {
        d: caseThread?.getAttribute('d'),
        viewBox: caseThreadSvg?.getAttribute('viewBox'),
        attrs: caseThread ? Array.from(caseThread.attributes).map(a => `${a.name}="${a.value}"`) : []
      },
      ribbons,
      scribbles,
      heroLoaderHtml,
      headlineHtml,
      gooeyHtml,
      scripts
    };
  });

  console.log('--- EXTRACTED REFERENCE ANIMATION ASSETS ---');
  console.log(JSON.stringify(data, null, 2));

  await browser.close();
}

main().catch(console.error);
