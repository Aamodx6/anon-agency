import puppeteer from 'puppeteer-core';

async function debugPill() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:3005/', { waitUntil: 'networkidle2' });

  const pills = await page.evaluate(() => {
    const all = Array.from(document.querySelectorAll('.CtaBand-module__4ELZEW__pill'));
    return all.map((b, i) => ({
      index: i,
      tag: b.tagName,
      text: b.textContent.trim(),
      selected: b.hasAttribute('data-selected')
    }));
  });
  console.log('Pills before click:', pills.slice(0, 6));

  // Click the one with text "branding"
  const clickRes = await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button.CtaBand-module__4ELZEW__pill'))
      .find(b => b.textContent.trim() === 'branding');
    if (!btn) return 'Button not found';
    btn.click();
    return 'Clicked button: ' + btn.textContent.trim();
  });
  console.log(clickRes);

  await new Promise(r => setTimeout(r, 300));

  const pillsAfter = await page.evaluate(() => {
    const all = Array.from(document.querySelectorAll('.CtaBand-module__4ELZEW__pill'));
    return all.map((b, i) => ({
      index: i,
      tag: b.tagName,
      text: b.textContent.trim(),
      selected: b.hasAttribute('data-selected')
    }));
  });
  console.log('Pills after click:', pillsAfter.slice(0, 6));

  await browser.close();
}

debugPill().catch(console.error);
