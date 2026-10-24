import fs from 'fs';

let content = fs.readFileSync('app/page.tsx', 'utf8');

const startMarker = '{/* 4. ARCHIVE SECTION */}';
const endMarker = '{/* 7. FOOTER */}';

const startIdx = content.indexOf(startMarker);
const endIdx = content.indexOf(endMarker);

if (startIdx !== -1 && endIdx !== -1) {
  const replacement = `      {/* 4. ARCHIVE SECTION */}
      <ArchiveSection />

      {/* 5. SERVICES STACK SECTION */}
      <ServicesStack />

      {/* 6. CTA BAND */}
      <CtaBand spacing="home" />

      {/* 7. STICKY NAV */}
      <StickyNav />

      `;
  content = content.slice(0, startIdx) + replacement + content.slice(endIdx);
  fs.writeFileSync('app/page.tsx', content, 'utf8');
  console.log('Successfully updated app/page.tsx with all modular animated sections!');
} else {
  console.log('Markers not found', startIdx, endIdx);
}
