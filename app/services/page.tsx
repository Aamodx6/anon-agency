import { Footer } from '@/components/Footer';
import { CtaBand } from '@/components/CtaBand';
import { HowWeWork } from '@/components/HowWeWork';
import { ServicesExperience } from '@/components/ServicesExperience';
import { SERVICES } from '@/data/services';

export default function ServicesPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Anon services',
    itemListElement: SERVICES.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.title,
        description: service.description,
        url: `https://www.awakeagency.dev/services/${service.slug}`,
      },
    })),
  };

  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />
      <ServicesExperience />
      <HowWeWork />
      <CtaBand spacing="page" />
      <Footer />
    </main>
  );
}
