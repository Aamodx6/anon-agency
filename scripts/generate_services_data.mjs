import fs from 'node:fs';

const services = JSON.parse(fs.readFileSync('scripts/services_data.json', 'utf8'));

const code = `export interface Service {
  slug: string;
  title: string;
  heroIntro: string;
  deliverablesHtml: string;
  howWeWorkHtml: string;
}

export const SERVICES: Service[] = ${JSON.stringify(services, null, 2)};
`;

fs.writeFileSync('data/services.ts', code);
console.log('Saved data/services.ts with', services.length, 'services');
