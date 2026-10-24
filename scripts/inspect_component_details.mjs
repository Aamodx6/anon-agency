import fs from 'fs';

const code = fs.readFileSync('scripts/js/0oeym6ebubcfy.js', 'utf8');

function extractFunc(name) {
  const marker = `"${name}",0,function`;
  const idx = code.indexOf(marker);
  if (idx === -1) {
    console.log(`Could not find ${name}`);
    return;
  }
  console.log(`\n================== ${name} ==================`);
  console.log(code.slice(idx, idx + 2500));
}

extractFunc('Hero');
extractFunc('CaseGrid');
extractFunc('ServicesStack');
extractFunc('useStackingCards');
extractFunc('BandScribble');
