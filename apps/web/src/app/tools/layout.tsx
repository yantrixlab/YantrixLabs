import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Business Tools',
  description: 'Explore products and tools from Yantrix Labs.',
  alternates: {
    canonical: 'https://yantrixlab.com/tools',
  },
  openGraph: {
    title: 'Business Tools | Yantrix Labs',
    description: 'Explore products and tools from Yantrix Labs.',
    url: 'https://yantrixlab.com/tools',
    images: [{ url: 'https://yantrixlab.com/og-gst-tool.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Business Tools | Yantrix Labs',
    description: 'Explore products and tools from Yantrix Labs.',
    images: ['https://yantrixlab.com/og-gst-tool.png'],
  },
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
