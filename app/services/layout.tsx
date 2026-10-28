import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services — Web, mobile & AI | Anon',
  description:
    'Explore web and mobile applications, AI automation, custom agents, software, support, document processing, sales automation, and analytics.',
  openGraph: {
    title: 'Services — Web, mobile & AI | Anon',
    description:
      'Explore web and mobile applications, AI automation, custom agents, software, support, document processing, sales automation, and analytics.',
    siteName: 'Anon',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services — Web, mobile & AI | Anon',
    description:
      'Explore web and mobile applications, AI automation, custom agents, software, support, document processing, sales automation, and analytics.',
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
