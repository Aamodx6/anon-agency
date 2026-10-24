import fs from 'node:fs';

const html = fs.readFileSync('scripts/pages/home.html', 'utf8');

// Extract the body tag content up to the first script tag
const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/);
if (bodyMatch) {
  const body = bodyMatch[1];
  // Remove script tags from the printout to see the clean DOM structure
  const cleanBody = body.replace(/<script[\s\S]*?<\/script>/gi, '');
  console.log('Clean body length:', cleanBody.length);
  fs.writeFileSync('scripts/home_dom.html', cleanBody);
  console.log('Saved clean body to scripts/home_dom.html');
  
  // Find all section or main tags
  const tags = [...cleanBody.matchAll(/<(main|section|header|footer|nav|article|aside|h1|h2|h3)[^>]*>/gi)].map(m => m[0]);
  console.log('\nSemantic tags found:\n', tags.join('\n'));
}
