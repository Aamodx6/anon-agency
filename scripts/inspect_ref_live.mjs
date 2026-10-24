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

  // Listen to console and network
  page.on('console', msg => console.log('REF CONSOLE:', msg.text()));

  await page.goto('https://www.awakeagency.dev/', { waitUntil: 'networkidle2', timeout: 60000 });

  const anims = await page.evaluate(async () => {
    // Check canvas elements
    const canvases = Array.from(document.querySelectorAll('canvas')).map(c => ({
      id: c.id,
      className: c.className,
      width: c.width,
      height: c.height,
      style: c.getAttribute('style')
    }));

    // Check SVG ribbon elements
    const ribbons = Array.from(document.querySelectorAll('[data-ribbon]')).map(r => ({
      tag: r.tagName,
      className: r.className?.baseVal || r.className,
      d: r.querySelector('path')?.getAttribute('d')?.slice(0, 50),
      style: r.getAttribute('style')
    }));

    // Check hero elements
    const heroLoader = document.querySelector('[data-hero-loader]');
    const heroSplitLines = Array.from(document.querySelectorAll('[data-split-line]')).map(l => ({
      text: l.textContent,
      children: Array.from(l.children).map(c => ({
        tag: c.tagName,
        className: c.className,
        style: c.getAttribute('style'),
        text: c.textContent
      }))
    }));

    // Check coins / physics / canvas
    const coinsAbove = document.querySelector('[data-coins-above]');
    const coinsFloor = document.querySelector('[data-coins-floor]');

    // Check global scripts / libraries
    const scriptSrcs = Array.from(document.querySelectorAll('script[src]')).map(s => s.src);

    // Check Lenis / GSAP / ScrollTrigger
    const windowProps = Object.keys(window);
    const scrollProps = windowProps.filter(k => /gsap|lenis|scroll|matter|three|pixi|lottie|framer|anime/i.test(k));

    return {
      canvases,
      ribbons,
      heroLoader: heroLoader ? { tag: heroLoader.tagName, className: heroLoader.className, style: heroLoader.getAttribute('style') } : null,
      heroSplitLines,
      coinsAbove: !!coinsAbove,
      coinsFloor: !!coinsFloor,
      scrollProps,
      scriptSrcs
    };
  });

  console.log('--- REFERENCE ANIMATION INSPECTION ---');
  console.log(JSON.stringify(anims, null, 2));

  // Let's also check what happens on scroll!
  console.log('--- SCROLLING DOWN ---');
  await page.evaluate(() => window.scrollTo(0, 1000));
  await new Promise(r => setTimeout(r, 1000));

  const afterScroll = await page.evaluate(() => {
    const activeHeaders = Array.from(document.querySelectorAll('header')).map(h => ({
      className: h.className,
      style: h.getAttribute('style')
    }));

    const caseCards = Array.from(document.querySelectorAll('.CaseCard-module__WCHEYG__card, [data-case-flip]')).map(c => ({
      className: c.className,
      style: c.getAttribute('style')
    }));

    const archiveScribble = document.querySelector('[data-tone] path');

    return {
      activeHeaders,
      caseCardsCount: caseCards.length,
      archiveScribbleStyle: archiveScribble?.getAttribute('style')
    };
  });

  console.log('After scroll:', JSON.stringify(afterScroll, null, 2));

  await browser.close();
}

main().catch(console.error);
