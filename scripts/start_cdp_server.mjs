import puppeteer from 'puppeteer-core';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--remote-debugging-port=9222', '--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3005/', { waitUntil: 'networkidle2' });
  console.log('Edge launched with CDP on port 9222 and navigated to http://localhost:3005/');
  
  // Keep process alive
  setInterval(() => {}, 10000);
}

main().catch(console.error);
