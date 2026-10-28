import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CtaBand } from '@/components/CtaBand';
import { DeliverablesTabs } from '@/components/DeliverablesTabs';
import { HowWeWork } from '@/components/HowWeWork';
import { SERVICES, SERVICE_ALIASES } from '@/data/services';

export const dynamicParams = false;

export function generateStaticParams() {
  const base = SERVICES.map(s => ({ slug: s.slug }));
  Object.keys(SERVICE_ALIASES).forEach(alias => {
    base.push({ slug: alias });
  });
  return base;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const targetSlug = SERVICE_ALIASES[slug] || slug;
  const service = SERVICES.find(item => item.slug === targetSlug);

  if (!service) {
    notFound();
  }

  const canonicalPath = `/services/${service.slug}`;
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      siteName: 'Anon',
      type: 'website',
      url: canonicalPath,
    },
    twitter: {
      card: 'summary_large_image',
      title: service.metaTitle,
      description: service.metaDescription,
    },
  };
}

export default async function ServiceDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const targetSlug = SERVICE_ALIASES[slug] || slug;
  const service = SERVICES.find(s => s.slug === targetSlug);

  if (!service) {
    notFound();
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    serviceType: service.title,
    url: `https://www.awakeagency.dev/services/${service.slug}`,
    provider: {
      '@type': 'Organization',
      name: 'Anon',
    },
  };

  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />
      <div className="page-module__dZxIWa__navRow">
        <Navbar variant="dev" />
      </div>

      {/* Page Hero */}
      <section className="PageHero-module__3JSMhW__hero PageHero-module__3JSMhW__light">
        <div style={{ marginBottom: '1.5rem' }}>
          <Link
            href="/services"
            style={{
              fontSize: '0.875rem',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--c-ink-dim, #666)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            ← All Services
          </Link>
        </div>

        <h1 className="PageHero-module__3JSMhW__title" style={{ marginLeft: '-0.02em' }}>
          {service.title}
        </h1>
        {service.heroIntro && (
          <p className="PageHero-module__3JSMhW__lead">{service.description}</p>
        )}
      </section>

      {/* Interactive Deliverables Tabs */}
      <h2
        className="HowWeWork-module__kq1Iga__heading"
        style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem 1.25rem 0' }}
      >
        What we build
      </h2>
      <DeliverablesTabs deliverables={service.deliverables} />

      <section
        aria-labelledby="service-benefits-heading"
        style={{ maxWidth: '1400px', margin: '0 auto', padding: '4rem 1.25rem' }}
      >
        <h2
          id="service-benefits-heading"
          className="HowWeWork-module__kq1Iga__heading"
          style={{ marginBottom: '1.5rem' }}
        >
          How it helps your business
        </h2>
        <ul style={{ display: 'grid', gap: '0.75rem', maxWidth: '760px' }}>
          {service.benefits.map((benefit) => (
            <li key={benefit} className="PageHero-module__3JSMhW__lead">
              {benefit}
            </li>
          ))}
        </ul>
      </section>

      {/* How We Work Process Section */}
      <div className="page-module__Oub5RG__process">
        <HowWeWork steps={service.process} />
      </div>

      {/* Featured Case Section */}
      {service.featuredCase && (
        <div className="page-module__Oub5RG__featured" style={{ padding: '4rem 1.25rem', maxWidth: '1400px', margin: '0 auto' }}>
          <section className="FeaturedCase-module__6SQUVG__section">
            <Link
              className="FeaturedCase-module__6SQUVG__panel"
              data-page-label={service.featuredCase.title}
              href={`/projects/${service.featuredCase.slug}`}
              style={{
                display: 'block',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '24px',
                backgroundColor: '#161d25',
                color: '#ffffff',
                textDecoration: 'none',
              }}
            >
              <div
                className="FeaturedCase-module__6SQUVG__media"
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16/9',
                  overflow: 'hidden',
                }}
              >
                <img
                  alt={service.featuredCase.alt}
                  src={service.featuredCase.image}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>

              <div
                style={{
                  padding: '2rem 2.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'linear-gradient(180deg, rgba(22,29,37,0.7) 0%, rgba(22,29,37,0.95) 100%)',
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: '0.8rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: '#a0aab2',
                      display: 'block',
                      marginBottom: '0.35rem',
                    }}
                  >
                    Featured Case · {service.featuredCase.discipline}
                  </span>
                  <h3 style={{ fontSize: '1.75rem', fontWeight: 600, margin: 0 }}>
                    {service.featuredCase.title}
                  </h3>
                </div>

                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#ffffff',
                  }}
                >
                  View Case Study →
                </span>
              </div>
            </Link>
          </section>
        </div>
      )}

      <p
        className="PageHero-module__3JSMhW__lead"
        style={{ maxWidth: '1400px', margin: '0 auto', padding: '1rem 1.25rem 3rem' }}
      >
        Have a project in mind?{' '}
        <Link href="/contacts">Tell us what you need and let’s talk.</Link>
      </p>
      <CtaBand spacing="page" />
      <Footer />
    </main>
  );
}
