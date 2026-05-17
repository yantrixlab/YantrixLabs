import type { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://yantrixlab.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '/',
    '/about',
    '/blog',
    '/contact',
    '/services',
    '/tools',
    '/pricing',
    '/saas-development-services',
    '/mobile-app-development-services',
    '/web-app-development-services',
    '/mvp-development-company',
    '/business-automation-tools',
    '/passive-income-tools-for-business',
    '/ai-tools-for-business-growth',
    '/website-development-company-kolkata',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : 0.8,
    lastModified: new Date(),
  }));
}

