import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects · Awake',
  description: 'Selected projects and digital products built by Awake.',
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
