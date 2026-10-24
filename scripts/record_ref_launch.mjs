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

  console.log('Loading reference page with navigation...');
  const times = [0, 100, 200, 400, 600, 800, 1000, 1200, 1500, 1800, 2200, 3000];

  await page.goto('https://www.awakeagency.dev/', { waitUntil: 'domcontentloaded' });

  for (let i = 0; i < times.length; i++) {
    const delay = i === 0 ? times[0] : (times[i] - times[i - 1]);
    if (delay > 0) await new Promise(r => setTimeout(r, delay));
    
    const state = await page.evaluate(() => {
      const loader = document.querySelector('[data-hero-loader], [class*="loader"]');
      const counter = loader?.querySelector('[class*="Counter"], [class*="counter"], span');
      const h1 = document.querySelector('h1');
      const coinsHost = document.querySelector('[class*="HeroCoins"], [class*="host"]');
      const letters = Array.from(document.querySelectorAll('h1 [style*="transform"]')).map(el => el.style.transform);
      return {
        counterText: counter?.textContent?.trim(),
        loaderStyle: loader?.getAttribute('style'),
        h1Opacity: h1 ? window.getComputedStyle(h1).opacity : null,
        lettersCount: letters.length,
        firstThreeLettersTransform: letters.slice(0, 3),
        coinsHostFound: !!coinsHost,
        coinsCanvasCount: document.querySelectorAll('canvas').length
      };
    });

    console.log(`[T = ${times[i]}ms]:`, JSON.stringify(state));
    await page.screenshot({ path: `scripts/ref_launch_${times[i]}ms.png` });
  }

  await browser.close();
  console.log('Done recording launch sequence!');
}

main().catch(console.error);
