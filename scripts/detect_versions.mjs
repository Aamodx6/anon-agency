import fs from 'node:fs';

const jsFiles = fs.readdirSync('scripts/js');
for (const f of jsFiles) {
  const code = fs.readFileSync(`scripts/js/${f}`, 'utf8');
  const nextMatch = code.match(/next[/-]dist[/-]version["']?:\s*["']([^"']+)["']/i) || code.match(/NEXT_RUNTIME/);
  const reactMatch = code.match(/React\s*v([0-9.]+)/i) || code.match(/version:\s*["'](18\.[0-9.]+|19\.[0-9.]+)["']/);
  if (nextMatch || reactMatch) {
    console.log(`${f}:`, nextMatch ? nextMatch[0] : '', reactMatch ? reactMatch[0] : '');
  }
}
