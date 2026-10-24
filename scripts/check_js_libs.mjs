import fs from 'node:fs';

const scripts = [
  '3z-4buq3t38fr.js',
  '1doa57t9zanho.js',
  '07v142o5owpy6.js',
  '1-9jqeenzti5i.js',
  'turbopack-2-f9u5emhy2gx.js',
  '3-vj60o6p3p2m.js',
  '2o6bwvb-fzw9g.js',
  '2mcbk33h81x8n.js',
  '2fynoz9uh28eg.js',
  '0y9irz394v2qa.js',
  '3ezdqb6tcrl2c.js',
  '0oeym6ebubcfy.js',
  '2wkfko3wa6cjp.js',
  '0c0hxoamwjsbw.js',
  '2aos7m4zex64_.js'
];

async function checkLibs() {
  fs.mkdirSync('scripts/js', { recursive: true });
  for (const s of scripts) {
    const res = await fetch('https://www.awakeagency.dev/_next/static/immutable/chunks/' + s);
    const text = await res.text();
    fs.writeFileSync(`scripts/js/${s}`, text);
    const detected = [];
    if (text.includes('gsap') || text.includes('TweenMax') || text.includes('ScrollTrigger')) detected.push('gsap');
    if (text.includes('lenis') || text.includes('Lenis')) detected.push('lenis');
    if (text.includes('framer-motion') || text.includes('motion')) detected.push('framer/motion');
    if (text.includes('three') || text.includes('WebGLRenderer')) detected.push('three.js');
    if (text.includes('canvas') || text.includes('getContext')) detected.push('canvas');
    if (text.includes('cal.com') || text.includes('calendly')) detected.push('calendar');
    console.log(`${s.padEnd(30)}: length ${text.length}, detected: ${detected.join(', ')}`);
  }
}

checkLibs();
