import { notFound, redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { PublicLayout } from '@/components/layout/PublicLayout';
import Link from 'next/link';
import { Wrench, ArrowRight, Tag, Star, Clock, ChevronLeft } from 'lucide-react';
import { ToolIframeClient } from './ToolIframeClient';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api/v1';

interface Tool {
  id: string;
  title: string;
  slug: string;
  shortDescription: string | null;
  fullDescription: string | null;
  logoUrl: string | null;
  bannerUrl: string | null;
  screenshots: string[];
  category: string | null;
  tags: string[];
  toolType: string;
  internalRoute: string | null;
  externalUrl: string | null;
  customHtml: string | null;
  customCss: string | null;
  customJs: string | null;
  ctaText: string | null;
  ctaUrl: string | null;
  pricingType: string;
  featured: boolean;
  seoTitle: string | null;
  seoDescription: string | null;
  focusKeyword: string | null;
  metaKeywords: string | null;
}

async function fetchTool(slug: string): Promise<Tool | null> {
  try {
    const res = await fetch(`${API_URL}/tools/${slug}`, { next: { revalidate: 3600 } });
    const data = await res.json();
    if (data?.success && data.data) return data.data as Tool;
    return null;
  } catch {
    return null;
  }
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const tool = await fetchTool(slug);
  if (!tool) return { title: 'Tool Not Found' };
  const title = tool.seoTitle || tool.title;
  const description = tool.seoDescription || tool.shortDescription || tool.fullDescription || undefined;
  return {
    title,
    description,
    keywords: tool.metaKeywords || tool.focusKeyword || undefined,
    openGraph: {
      title,
      description,
      images: tool.bannerUrl ? [tool.bannerUrl] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: tool.bannerUrl ? [tool.bannerUrl] : undefined,
    },
  };
}

export default async function RootToolSlugPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const tool = await fetchTool(slug);

  if (!tool) notFound();

  if (tool.toolType === 'INTERNAL_APP' && tool.internalRoute) {
    redirect(tool.internalRoute);
  }
  if (tool.toolType === 'EXTERNAL_URL' && tool.externalUrl) {
    redirect(tool.externalUrl);
  }

  if (tool.toolType === 'COMING_SOON') {
    return (
      <PublicLayout>
        <section className="py-32 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
          <div className="container-wide max-w-2xl mx-auto text-center">
            <div className="inline-flex h-20 w-20 rounded-3xl bg-indigo-100 items-center justify-center mb-6">
              {tool.logoUrl
                ? <img src={tool.logoUrl} alt={tool.title} className="h-full w-full object-cover rounded-3xl" />
                : <Clock className="h-10 w-10 text-indigo-600" />}
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-sm font-medium text-amber-700 mb-6">
              <Clock className="h-3.5 w-3.5" />Coming Soon
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{tool.title}</h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {tool.shortDescription || tool.fullDescription || "This tool is launching soon. Get notified when it's ready."}
            </p>
            {tool.category && (
              <div className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 rounded-full px-4 py-1.5 text-sm font-medium mb-8">
                <Tag className="h-3.5 w-3.5" />{tool.category}
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-8 py-4 text-base font-semibold text-white hover:bg-indigo-700 transition-all shadow-lg">
                Get Notified<ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/tools" className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-8 py-4 text-base font-semibold text-gray-700 hover:bg-gray-50 transition-all">
                <ChevronLeft className="h-4 w-4" />All Tools
              </Link>
            </div>
          </div>
        </section>
      </PublicLayout>
    );
  }

  if (tool.toolType === 'CUSTOM_HTML_TOOL') {
    return (
      <PublicLayout>
        <section className="py-10 bg-gradient-to-br from-indigo-50 to-white border-b border-gray-100">
          <div className="container-wide">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <Link href="/tools" className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                  <ChevronLeft className="h-5 w-5" />
                </Link>
                <div className="h-14 w-14 rounded-2xl bg-indigo-50 flex items-center justify-center overflow-hidden">
                  {tool.logoUrl
                    ? <img src={tool.logoUrl} alt={tool.title} className="h-full w-full object-cover" />
                    : <Wrench className="h-7 w-7 text-indigo-600" />}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {tool.featured && (
                      <span className="inline-flex items-center gap-1 bg-yellow-50 text-yellow-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                        <Star className="h-3 w-3 fill-current" /> Featured
                      </span>
                    )}
                    {tool.category && <span className="bg-indigo-50 text-indigo-700 text-xs font-medium px-2 py-0.5 rounded-full">{tool.category}</span>}
                    <span className="bg-green-50 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full">{tool.pricingType}</span>
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900">{tool.title}</h1>
                  {tool.shortDescription && <p className="text-gray-600 mt-0.5">{tool.shortDescription}</p>}
                </div>
              </div>
            </div>
          </div>
        </section>
        <ToolIframeClient
          customHtml={tool.customHtml}
          customCss={tool.customCss}
          customJs={tool.customJs}
          title={tool.title}
        />
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      {tool.bannerUrl && (
        <div className="h-64 w-full overflow-hidden">
          <img src={tool.bannerUrl} alt={tool.title} className="h-full w-full object-cover" />
        </div>
      )}
      <section className="py-16 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="container-wide max-w-4xl mx-auto">
          <div className="flex items-start gap-6">
            <div className="h-20 w-20 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-center overflow-hidden flex-shrink-0">
              {tool.logoUrl
                ? <img src={tool.logoUrl} alt={tool.title} className="h-full w-full object-cover" />
                : <Wrench className="h-10 w-10 text-indigo-600" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {tool.featured && (
                  <span className="inline-flex items-center gap-1 bg-yellow-50 text-yellow-700 border border-yellow-200 text-sm font-semibold px-3 py-1 rounded-full">
                    <Star className="h-3.5 w-3.5 fill-current" /> Featured
                  </span>
                )}
                {tool.category && <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 text-sm font-medium px-3 py-1 rounded-full">{tool.category}</span>}
                <span className="bg-green-50 text-green-700 border border-green-200 text-sm font-medium px-3 py-1 rounded-full">{tool.pricingType}</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-3">{tool.title}</h1>
              {tool.shortDescription && <p className="text-xl text-gray-600 leading-relaxed mb-6">{tool.shortDescription}</p>}
              <div className="flex flex-wrap gap-3">
                <Link href={tool.ctaUrl || `/${tool.slug}`} className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-4 text-base font-semibold text-white hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
                  {tool.ctaText || 'Launch Tool'}<ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/tools" className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-6 py-4 text-base font-semibold text-gray-700 hover:bg-gray-50 transition-all">
                  <ChevronLeft className="h-4 w-4" />All Tools
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
