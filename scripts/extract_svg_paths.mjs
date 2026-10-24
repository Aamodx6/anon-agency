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

  const paths = await page.evaluate(() => {
    // 1. CaseThread
    const caseThreadPath = document.querySelector('.CaseThread-module__fQt_la__path')?.getAttribute('d');
    const caseThreadSvg = document.querySelector('.CaseThread-module__fQt_la__svg');

    // 2. Statement ribbon
    const stmtRibbon = document.querySelector('.Statement-module__6Nrrla__statement svg[data-ribbon]');
    const stmtPaths = stmtRibbon ? Array.from(stmtRibbon.querySelectorAll('path')).map(p => p.getAttribute('d')) : [];

    // 3. Service ribbons (01, 02, 03, 04)
    const serviceCards = Array.from(document.querySelectorAll('.ServicesStack-module__QW-zbq__card, .ServicesStack-module__QW-zbq__item, [data-ribbon]'));
    const serviceRibbons = Array.from(document.querySelectorAll('svg[data-ribbon]')).map((svg, idx) => ({
      index: idx,
      parent: svg.parentElement?.className,
      viewBox: svg.getAttribute('viewBox'),
      paths: Array.from(svg.querySelectorAll('path')).map(p => ({
        d: p.getAttribute('d'),
        className: p.className?.baseVal || p.className,
        style: p.getAttribute('style')
      }))
    }));

    // 4. Archive scribble
    const archiveScribbleSvg = document.querySelector('.Archive-module__03K2fa__scribble, [data-tone="onInk"]');
    const archivePath = archiveScribbleSvg?.querySelector('path')?.getAttribute('d');
    const archiveViewBox = archiveScribbleSvg?.getAttribute('viewBox');

    // 5. Band scribbles (CTA or others)
    const allScribbles = Array.from(document.querySelectorAll('.BandScribble-module__QwOmAG__svg')).map((s, idx) => ({
      index: idx,
      tone: s.getAttribute('data-tone'),
      viewBox: s.getAttribute('viewBox'),
      d: s.querySelector('path')?.getAttribute('d')
    }));

    return {
      caseThread: {
        d: caseThreadPath,
        viewBox: caseThreadSvg?.getAttribute('viewBox') || '0 0 1440 1749'
      },
      serviceRibbons,
      archiveScribble: {
        d: archivePath,
        viewBox: archiveViewBox
      },
      allScribbles
    };
  });

  fs.writeFileSync('scripts/extracted_paths.json', JSON.stringify(paths, null, 2), 'utf8');
  console.log('Saved extracted_paths.json successfully!');
  console.log('CaseThread d length:', paths.caseThread.d?.length);
  console.log('Service ribbons count:', paths.serviceRibbons.length);
  console.log('All scribbles count:', paths.allScribbles.length);

  await browser.close();
}

main().catch(console.error);
