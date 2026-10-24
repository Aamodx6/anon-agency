import type { Metadata } from 'next';
import './globals.css';
import { MenuProvider } from '@/context/MenuContext';
import { MenuOverlay } from '@/components/MenuOverlay';
import { ConsentBanner } from '@/components/ConsentBanner';
import { SmoothScroll } from '@/components/SmoothScroll';

export const metadata: Metadata = {
  title: 'Anon — We build websites people remember.',
  description:
    'Anon is a digital design and development studio based in Warsaw. We craft websites, brand systems, and digital products that work as hard as they look.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
      { url: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }]
  }
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
          {children}
          <ConsentBanner />
        </MenuProvider>
      </body>
    </html>
  );
}
