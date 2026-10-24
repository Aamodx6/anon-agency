import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacts · Awake',
  description: 'Get in touch with Awake digital studio in Warsaw.',
};

export default function ContactsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
