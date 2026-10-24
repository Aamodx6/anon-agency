import fs from 'node:fs';

const html = fs.readFileSync('scripts/pages/projects_mihailove.html', 'utf8');
const galleryMatch = html.match(/<section class="CaseGallery-module__TMT3wW__section"[\s\S]*?<\/section>/);
if (galleryMatch) {
  console.log('Gallery length:', galleryMatch[0].length);
  console.log(galleryMatch[0].slice(0, 2000));
}
