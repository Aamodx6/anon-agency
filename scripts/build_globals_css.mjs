import fs from 'node:fs';

const cssVars = fs.readFileSync('scripts/css/1orffevq10308.css', 'utf8');
let cssBase = fs.readFileSync('scripts/css/25r05hs-1y9y_.css', 'utf8');
const cssHero = fs.readFileSync('scripts/css/1c43k4umql0d7.css', 'utf8');
const cssContacts = fs.readFileSync('scripts/css/2vp9s_omx54dc.css', 'utf8');
const cssProjects = fs.readFileSync('scripts/css/3rlol-cabb1fl.css', 'utf8');
const cssServices = fs.readFileSync('scripts/css/3niif314l1_01.css', 'utf8');

// Replace font URLs with local paths
cssBase = cssBase
  .replace(/url\(\.\.\/media\/Aeonik_Regular-[^)]+\.woff2\)/g, "url('/fonts/Aeonik_Regular.woff2')")
  .replace(/url\(\.\.\/media\/Aeonik_Medium-[^)]+\.woff2\)/g, "url('/fonts/Aeonik_Medium.woff2')")
  .replace(/url\(\.\.\/media\/Syne_Regular-[^)]+\.woff2\)/g, "url('/fonts/Syne_Regular.woff2')")
  .replace(/url\(\.\.\/media\/Syne_Medium-[^)]+\.woff2\)/g, "url('/fonts/Syne_Medium.woff2')")
  .replace(/url\(\.\.\/media\/Syne_SemiBold-[^)]+\.woff2\)/g, "url('/fonts/Syne_SemiBold.woff2')")
  .replace(/url\(\.\.\/media\/Syne_Bold-[^)]+\.woff2\)/g, "url('/fonts/Syne_Bold.woff2')")
  .replace(/url\(\.\.\/media\/Syne_ExtraBold-[^)]+\.woff2\)/g, "url('/fonts/Syne_ExtraBold.woff2')");

// Also add font variable mapping if not present
const fontVars = `
:root {
  --font-aeonik: aeonik, sans-serif;
  --font-syne: syne, sans-serif;
}
`;

const combined = [
  fontVars,
  cssVars,
  cssBase,
  cssHero,
  cssContacts,
  cssProjects,
  cssServices
].join('\n\n');

fs.mkdirSync('app', { recursive: true });
fs.writeFileSync('app/globals.css', combined);
console.log('Successfully created app/globals.css with', combined.length, 'characters');
