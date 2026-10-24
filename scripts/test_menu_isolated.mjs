import puppeteer from 'puppeteer-core';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function testMenu() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3005/', { waitUntil: 'networkidle2' });

  // wait for intro done
  await page.waitForSelector('.Hero-module__KTD73a__hero[data-intro="done"]', { timeout: 10000 });
  console.log('Intro done!');

  // check initial menu state
  const initialOpen = await page.$eval('#site-menu', el => el.getAttribute('data-open'));
  console.log('Initial menu data-open:', initialOpen);

  // Click menu pill
  await page.click('.Navbar-module__O8Na-a__hero .Navbar-module__O8Na-a__menuPill');
  await new Promise(r => setTimeout(r, 500));

  const afterClickOpen = await page.$eval('#site-menu', el => el.getAttribute('data-open'));
  console.log('After click data-open:', afterClickOpen);

  // Click close button inside menu
  await page.click('#site-menu .Navbar-module__O8Na-a__menuPill');
  await new Promise(r => setTimeout(r, 500));

  const afterCloseOpen = await page.$eval('#site-menu', el => el.getAttribute('data-open'));
  console.log('After close data-open:', afterCloseOpen);

  await browser.close();
}

testMenu().catch(console.error);
