import React from 'react';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CtaBand } from '@/components/CtaBand';
import { SERVICES } from '@/data/services';

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map(s => ({ slug: s.slug }));
}

export default async function ServiceDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES.find(s => s.slug === slug);
  if (!service) {
    notFound();
  }

  return (
    <main id="main">
      <div className="page-module__dZxIWa__navRow">
        <Navbar variant="dev" />
      </div>

      <section className="PageHero-module__3JSMhW__hero PageHero-module__3JSMhW__light">
        <h1 className="PageHero-module__3JSMhW__title" style={{ marginLeft: '-0.02em' }}>
          {service.title}
        </h1>
        {service.heroIntro && (
          <p className="PageHero-module__3JSMhW__lead">{service.heroIntro}</p>
        )}
      </section>

      {/* Deliverables section */}
      {service.deliverablesHtml && (
        <div dangerouslySetInnerHTML={{ __html: service.deliverablesHtml }} />
      )}

      {/* How We Work section */}
      {service.howWeWorkHtml && (
        <div dangerouslySetInnerHTML={{ __html: service.howWeWorkHtml }} />
      )}

      <CtaBand spacing="page" />
      <Footer />
    </main>
  );
}
