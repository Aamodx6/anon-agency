import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scripts/ref_scrollribbon_motion.json', 'utf8'));
const offset1200 = data.find(d => d.offset === 1200);

console.log('Total paths at 1200:', offset1200.state.pathsWithStyle.length);
fs.writeFileSync('scripts/scrollribbon_paths_1200.json', JSON.stringify(offset1200.state.pathsWithStyle, null, 2));
console.log('Saved scripts/scrollribbon_paths_1200.json');
