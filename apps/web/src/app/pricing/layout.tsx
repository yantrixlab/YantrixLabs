import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Subscription-Based Business Tools Pricing',
  description:
    'Compare pricing for subscription-based business tools, GST invoicing, and business automation software for startups and SMEs.',
  alternates: {
    canonical: 'https://yantrixlab.com/pricing',
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
