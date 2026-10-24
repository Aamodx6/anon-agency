import fs from 'fs';

const code1 = fs.readFileSync('scripts/js/0oeym6ebubcfy.js', 'utf8');
const code2 = fs.readFileSync('scripts/js/3ezdqb6tcrl2c.js', 'utf8');

function findExports(code, file) {
  const matches = [...code.matchAll(/e\.s\(\[([^\]]+)\]/g)];
  console.log(`--- Exports in ${file} (${matches.length} found) ---`);
  matches.forEach(m => {
    const preview = m[1].slice(0, 100);
    if (preview.includes('function') || preview.includes('ScrollTrigger') || preview.includes('gsap')) {
      console.log('  Export:', preview);
    }
  });
}

findExports(code1, '0oeym6ebubcfy.js');
findExports(code2, '3ezdqb6tcrl2c.js');
