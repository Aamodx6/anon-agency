import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services · Awake',
  description:
    'Our services: Webflow development, UX/UI design, Branding, and Maintenance & Support.',
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
