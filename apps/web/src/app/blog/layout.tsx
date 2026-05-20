import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Business Tools, SaaS, and Automation Insights',
  description:
    'Guides on AI business tools, SaaS development, mobile apps, automation systems, and growth strategies for startups and small businesses.',
  alternates: {
    canonical: 'https://yantrixlab.com/blog',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
