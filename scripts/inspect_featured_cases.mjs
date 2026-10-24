import fs from 'node:fs';

const html = fs.readFileSync('scripts/home_dom.html', 'utf8');
const caseGrid = html.match(/<section class="CaseGrid-module__tbWBJq__section[\s\S]*?<\/section>/);
if (caseGrid) {
  const cards = [...caseGrid[0].matchAll(/<li class="CaseGrid-module__tbWBJq__item"[^>]*>([\s\S]*?)<\/li>/g)];
  console.log(`Found ${cards.length} featured project cards on homepage:`);
  cards.forEach((c, i) => {
    const titleMatch = c[1].match(/data-page-label="([^"]+)"/);
    const linkMatch = c[1].match(/href="([^"]+)"/);
    const posMatch = c[0].match(/style="([^"]+)"/);
    console.log(`${i + 1}. ${titleMatch ? titleMatch[1] : 'Unknown'} -> ${linkMatch ? linkMatch[1] : ''} (${posMatch ? posMatch[1] : ''})`);
  });
}
