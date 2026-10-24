import puppeteer from 'puppeteer-core';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function debugMenuClick() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3005/', { waitUntil: 'networkidle2' });
  await page.waitForSelector('.Hero-module__KTD73a__hero[data-intro="done"]');

  // Check element at center of button
  const info = await page.evaluate(() => {
    const btn = document.querySelector('.Navbar-module__O8Na-a__hero .Navbar-module__O8Na-a__menuPill');
    if (!btn) return 'Button not found';
    const rect = btn.getBoundingClientRect();
    const elAtPoint = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
    return {
      rect: { left: rect.left, top: rect.top, width: rect.width, height: rect.height },
      elAtPoint: elAtPoint ? elAtPoint.outerHTML.slice(0, 200) : null
    };
  });
  console.log('Button info:', info);

  // Directly call click in page context
  const clicked = await page.evaluate(() => {
    const btn = document.querySelector('.Navbar-module__O8Na-a__hero .Navbar-module__O8Na-a__menuPill');
    btn.click();
    return document.querySelector('#site-menu').getAttribute('data-open');
  });
  console.log('Clicked directly in DOM, menu data-open:', clicked);

  await browser.close();
}

debugMenuClick().catch(console.error);
