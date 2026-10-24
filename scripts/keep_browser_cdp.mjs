import puppeteer from 'puppeteer-core';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--remote-debugging-port=9222', '--no-sandbox']
  });

  const p1 = await browser.newPage();
  await p1.goto('https://www.awakeagency.dev/', { waitUntil: 'networkidle2' });

  const p2 = await browser.newPage();
  await p2.goto('http://localhost:3005/', { waitUntil: 'networkidle2' });

  console.log('WS endpoint:', browser.wsEndpoint());
  console.log('Pages opened, keeping browser open...');

  // Keep alive for 10 minutes
  await new Promise(r => setTimeout(r, 600000));
}

main().catch(console.error);
