import type { Metadata } from 'next';
import './globals.css';
import { MenuProvider } from '@/context/MenuContext';
import { MenuOverlay } from '@/components/MenuOverlay';
import { PageTransition } from '@/components/PageTransition';
import { ConsentBanner } from '@/components/ConsentBanner';
import { SmoothScroll } from '@/components/SmoothScroll';
import { ProjectTransitionProvider } from '@/components/ProjectTransition';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.awakeagency.dev'),
  title: 'Anon — Websites, apps & AI systems',
  description:
    'Anon builds websites, mobile apps, custom software, AI agents, and connected workflows to help businesses serve customers and get work done.',
  openGraph: {
    title: 'Anon — Websites, apps & AI systems',
    description:
      'Anon builds websites, mobile apps, custom software, AI agents, and connected workflows to help businesses serve customers and get work done.',
    siteName: 'Anon',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anon — Websites, apps & AI systems',
    description:
      'Anon builds websites, mobile apps, custom software, AI agents, and connected workflows to help businesses serve customers and get work done.',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
      { url: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MenuProvider>
          <SmoothScroll />
          <MenuOverlay />
          <ProjectTransitionProvider>{children}</ProjectTransitionProvider>
          <PageTransition />
          <ConsentBanner />
        </MenuProvider>
      </body>
    </html>
  );
}
