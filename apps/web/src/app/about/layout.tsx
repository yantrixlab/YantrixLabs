import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Website and Mobile App Development Company | About Yantrix Labs',
  description:
    'Learn about Yantrix Labs, a web and mobile app development company building SaaS products, custom software, and AI-powered business tools.',
  alternates: {
    canonical: 'https://yantrixlab.com/about',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
