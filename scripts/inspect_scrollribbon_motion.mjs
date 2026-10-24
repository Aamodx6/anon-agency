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

  // Scroll to #about and measure at different scroll offsets
  const offsets = [0, 200, 400, 600, 800, 1000, 1200];
  const states = [];

  for (const off of offsets) {
    await page.evaluate((y) => {
      const el = document.getElementById('about');
      if (el) {
        window.scrollTo(0, el.offsetTop + y);
      }
    }, off);
    await new Promise(r => setTimeout(r, 400));

    const state = await page.evaluate(() => {
      const svg = document.querySelector('#about svg[data-ribbon]');
      if (!svg) return null;

      const paths = Array.from(svg.querySelectorAll('path, line, circle, rect')).map((p, idx) => ({
        idx,
        tag: p.tagName,
        className: p.className.baseVal || p.className,
        style: p.getAttribute('style'),
        d: p.getAttribute('d')?.slice(0, 80),
        transform: p.getAttribute('transform'),
        strokeDashoffset: p.style?.strokeDashoffset || p.getAttribute('stroke-dashoffset'),
        strokeDasharray: p.style?.strokeDasharray || p.getAttribute('stroke-dasharray'),
      }));

      return {
        svgAttrs: {
          dataWeight: svg.getAttribute('data-weight'),
          dataFigure: svg.getAttribute('data-figure'),
          dataStage: svg.getAttribute('data-stage'),
        },
        activePathsCount: paths.length,
        pathsWithStyle: paths.filter(p => p.style)
      };
    });

    states.push({ offset: off, state });
  }

  fs.writeFileSync('scripts/ref_scrollribbon_motion.json', JSON.stringify(states, null, 2));
  console.log('Saved scripts/ref_scrollribbon_motion.json');

  await browser.close();
}

main().catch(console.error);
