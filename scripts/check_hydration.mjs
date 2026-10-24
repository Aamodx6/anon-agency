import puppeteer from 'puppeteer-core';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function checkHydration() {
  const browser = await puppeteer.launch({ executablePath: EDGE_PATH, headless: true });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  
  await page.goto('http://localhost:3005/', { waitUntil: 'networkidle2' });

  const result = await page.evaluate(() => {
    const btn = document.querySelector('.Navbar-module__O8Na-a__hero .Navbar-module__O8Na-a__menuPill');
    // Check React internal props
    const reactKey = Object.keys(btn).find(k => k.startsWith('__reactFiber') || k.startsWith('__reactProps'));
    return {
      hasReactProps: !!reactKey,
      reactProps: reactKey ? Object.keys(btn[reactKey]) : []
    };
  });
  console.log('Hydration check:', result);

  await browser.close();
}

checkHydration().catch(console.error);
