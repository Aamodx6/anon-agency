import fs from 'node:fs';

for (const p of ['privacy', 'cookies', 'terms']) {
  const bodyHtml = fs.readFileSync(`scripts/${p}_body.html`, 'utf8');
  const code = `import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function ${p.charAt(0).toUpperCase() + p.slice(1)}Page() {
  return (
    <main id="main">
      <div className="page-module__dZxIWa__navRow">
        <Navbar variant="dev" />
      </div>

      <div dangerouslySetInnerHTML={{ __html: ${JSON.stringify(bodyHtml)} }} />

      <Footer />
    </main>
  );
}
`;
  fs.mkdirSync(`app/${p}`, { recursive: true });
  fs.writeFileSync(`app/${p}/page.tsx`, code);
  console.log(`Generated app/${p}/page.tsx`);
}
