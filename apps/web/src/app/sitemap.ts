import type { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://yantrixlab.com';
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    '/',
    '/about',
    '/blog',
    '/contact',
    '/services',
    '/tools',
    '/scanner',
    '/pricing',
    '/saas-development-services',
    '/mobile-app-development-services',
    '/web-app-development-services',
    '/mvp-development-company',
    '/gst-invoice',
    '/passive-income-tools-for-business',
    '/ai-tools-for-business-growth',
    '/website-development-company-kolkata',
    '/blog/how-to-create-gst-invoice-free',
    '/blog/cgst-sgst-igst-difference',
    '/blog/gst-invoice-format-india',
    '/blog/gst-invoice-for-freelancers',
    '/blog/free-gst-billing-software-small-business',
    '/blog/web-app-development-cost-india',
    '/blog/saas-development-company-india',
    '/blog/mobile-app-development-kolkata',
  ];

  let toolRoutes: string[] = [];
  try {
    const res = await fetch(`${apiUrl.replace(/\/+$/, '')}/tools?limit=500`, { cache: 'no-store' });
    const data = await res.json();
    if (data?.success && Array.isArray(data.data)) {
      toolRoutes = data.data
        .map((tool: { slug?: string }) => tool.slug)
        .filter((slug: unknown): slug is string => typeof slug === 'string' && slug.length > 0)
        .map(slug => `/${slug}`);
    }
  } catch {
    toolRoutes = [];
  }

  const routes = Array.from(new Set([...staticRoutes, ...toolRoutes]));

  const priorityMap: Record<string, number> = {
    '/': 1.0,
    '/services': 0.9,
    '/gst-invoice': 0.9,
    '/tools': 0.8,
    '/scanner': 0.8,
    '/blog': 0.7,
  };

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: priorityMap[route] ?? 0.7,
    lastModified: new Date(),
  }));
}
