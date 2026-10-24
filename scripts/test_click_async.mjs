import puppeteer from 'puppeteer-core';

async function testClick() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:3005/', { waitUntil: 'networkidle2' });

  // Wait for intro to finish
  await page.waitForFunction(() => {
    const el = document.querySelector('.Hero-module__KTD73a__hero');
    return el && el.getAttribute('data-intro') === 'done';
  });

  // Click the menu pill
  await page.evaluate(() => {
    document.querySelector('.Navbar-module__O8Na-a__hero .Navbar-module__O8Na-a__menuPill').click();
  });

  // Wait for React re-render
  await page.waitForFunction(() => {
    const menu = document.querySelector('#site-menu');
    return menu && menu.getAttribute('data-open') === 'true';
  }, { timeout: 3000 });

  const openVal = await page.$eval('#site-menu', el => el.getAttribute('data-open'));
  console.log('SUCCESS! data-open is:', openVal);

  await browser.close();
}

testClick().catch(console.error);
