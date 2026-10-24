import fs from 'node:fs';

const files = fs.readdirSync('scripts/js');
for (const f of files) {
  if (!f.endsWith('.js')) continue;
  const content = fs.readFileSync(`scripts/js/${f}`, 'utf8');
  if (content.includes('CtaBand') || content.includes('stepTwo') || content.includes('stepThree')) {
    console.log(`Found in ${f}`);
    const idx = content.indexOf('CtaBand');
    console.log(content.slice(Math.max(0, idx - 100), Math.min(content.length, idx + 1500)));
  }
}
