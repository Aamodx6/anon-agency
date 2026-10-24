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

  // Record mutation events
  await page.evaluateOnNewDocument(() => {
    window.__mutations = [];
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'attributes' && (m.attributeName === 'style' || m.attributeName === 'class' || m.attributeName.startsWith('data-'))) {
          const el = m.target;
          window.__mutations.push({
            tag: el.tagName,
            cls: el.className?.baseVal || el.className,
            attr: m.attributeName,
            val: el.getAttribute(m.attributeName)?.slice(0, 100),
            scrollY: window.scrollY
          });
        }
      }
    });
    document.addEventListener('DOMContentLoaded', () => {
      observer.observe(document.body, { attributes: true, subtree: true });
    });
  });

  await page.goto('https://www.awakeagency.dev/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  console.log('--- Initial Load Mutations ---');
  let initialMuts = await page.evaluate(() => {
    const list = window.__mutations.slice(0, 30);
    window.__mutations = [];
    return list;
  });
  console.log(JSON.stringify(initialMuts, null, 2));

  // Scroll smoothly in steps
  console.log('--- Scrolling from 0 to 4000px ---');
  for (let y = 500; y <= 5000; y += 500) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await new Promise(r => setTimeout(r, 400));
  }

  let scrollMuts = await page.evaluate(() => {
    // Group mutations by class/tag
    const counts = {};
    for (const m of window.__mutations) {
      const key = `${m.tag}.${m.cls} [${m.attr}]`;
      counts[key] = (counts[key] || 0) + 1;
    }
    return {
      total: window.__mutations.length,
      sample: window.__mutations.slice(0, 25),
      summary: counts
    };
  });

  console.log('Scroll Mutations Summary:');
  console.log(JSON.stringify(scrollMuts, null, 2));

  await browser.close();
}

main().catch(console.error);
