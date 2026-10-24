import puppeteer from 'puppeteer-core';

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222' });
  const pages = await browser.pages();
  const refPage = pages.find(p => p.url().includes('awakeagency.dev'));
  if (!refPage) {
    console.error('Ref page not found');
    return;
  }

  // Get script tags
  const scripts = await refPage.evaluate(() => {
    return Array.from(document.querySelectorAll('script[src]')).map(s => s.src);
  });
  console.log('Script sources on reference:', scripts);

  // Evaluate animation details
  const details = await refPage.evaluate(() => {
    // Look for animation libraries in Next.js bundle or window
    const styleSheets = Array.from(document.styleSheets);
    let keyframes = [];
    try {
      for (const sheet of styleSheets) {
        for (const rule of sheet.cssRules || []) {
          if (rule.type === CSSRule.KEYFRAMES_RULE) {
            keyframes.push(rule.name);
          }
        }
      }
    } catch (e) {}

    // Find all elements with transition, transform, or animation in computed style or inline style
    const allElems = document.querySelectorAll('*');
    let inlineStyles = [];
    for (const el of allElems) {
      const style = el.getAttribute('style');
      if (style && (style.includes('transform') || style.includes('translate') || style.includes('opacity') || style.includes('--'))) {
        inlineStyles.push({
          tag: el.tagName,
          id: el.id,
          class: el.className,
          style: style
        });
      }
    }

    // Scroll information
    return {
      keyframes,
      inlineStylesCount: inlineStyles.length,
      sampleInlineStyles: inlineStyles.slice(0, 20),
      htmlClasses: document.documentElement.className,
      bodyClasses: document.body.className
    };
  });

  console.log('Animation Details:', JSON.stringify(details, null, 2));
}

main().catch(console.error);
