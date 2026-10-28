import type { MetadataRoute } from 'next';
import { PROJECTS } from '@/data/projects';
import { SERVICES } from '@/data/services';

const SITE_URL = 'https://www.awakeagency.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['/', '/services', '/projects', '/contacts', '/privacy', '/cookies', '/terms'];

  return [
    ...pages.map(path => ({
      url: `${SITE_URL}${path}`,
    })),
    ...SERVICES.map(service => ({
      url: `${SITE_URL}/services/${service.slug}`,
    })),
    ...PROJECTS.map(project => ({
      url: `${SITE_URL}/projects/${project.slug}`,
    })),
  ];
}
