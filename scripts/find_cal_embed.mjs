import fs from 'node:fs';

const files = fs.readdirSync('scripts/js');
for (const f of files) {
  if (!f.endsWith('.js')) continue;
  const content = fs.readFileSync(`scripts/js/${f}`, 'utf8');
  if (content.includes('BookingEmbed') || content.includes('cal.com')) {
    console.log(`Found cal in ${f}`);
    const idx = content.indexOf('cal.com');
    console.log(content.slice(Math.max(0, idx - 200), Math.min(content.length, idx + 1000)));
  }
}
