import puppeteer from 'puppeteer-core';

async function testSeq() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:3005/', { waitUntil: 'networkidle2' });
  await page.waitForSelector('.Hero-module__KTD73a__hero[data-intro="done"]');

  // 1. Menu open
  await page.evaluate(() => {
    document.querySelector('.Navbar-module__O8Na-a__hero .Navbar-module__O8Na-a__menuPill').click();
  });
  await new Promise(r => setTimeout(r, 200));
  console.log('Menu open:', await page.$eval('#site-menu', el => el.getAttribute('data-open')));

  // 2. Menu close
  await page.evaluate(() => {
    document.querySelector('#site-menu .Navbar-module__O8Na-a__menuPill').click();
  });
  await new Promise(r => setTimeout(r, 200));
  console.log('Menu closed:', await page.$eval('#site-menu', el => el.getAttribute('data-open')));

  // 3. CTA Pill click
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button.CtaBand-module__4ELZEW__pill'))
      .find(b => b.textContent.trim() === 'branding');
    btn.click();
  });
  await new Promise(r => setTimeout(r, 200));
  const brandingSelected = await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button.CtaBand-module__4ELZEW__pill'))
      .find(b => b.textContent.trim() === 'branding');
    return btn ? btn.hasAttribute('data-selected') : false;
  });
  console.log('Branding selected:', brandingSelected);

  // 4. CTA Next click
  await page.evaluate(() => {
    document.querySelector('.CtaBand-module__4ELZEW__nextOne').click();
  });
  await new Promise(r => setTimeout(r, 200));
  console.log('CTA Step:', await page.$eval('.CtaBand-module__4ELZEW__band', el => el.getAttribute('data-step')));

  await browser.close();
}

testSeq().catch(console.error);
