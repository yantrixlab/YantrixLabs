import type { Metadata } from 'next';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { CostCalculatorClient } from './CostCalculatorClient';

export const metadata: Metadata = {
  title: 'App & Software Cost Calculator | Yantrix Labs',
  description:
    'Get an instant estimate for your app or software project. Pick your platform (Android, iOS, Web) and the features you need to see a live cost estimate.',
  keywords: [
    'app development cost calculator',
    'software cost estimator',
    'app cost calculator India',
    'mobile app price calculator',
  ],
  alternates: { canonical: 'https://yantrixlab.com/cost-calculator' },
  openGraph: {
    title: 'App & Software Cost Calculator | Yantrix Labs',
    description: 'Pick your platform and features to get an instant project cost estimate.',
    url: 'https://yantrixlab.com/cost-calculator',
    siteName: 'Yantrix Labs',
    type: 'website',
    images: [{ url: 'https://yantrixlab.com/og-agency.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'App & Software Cost Calculator',
    description: 'Pick your platform and features to get an instant project cost estimate.',
    images: ['https://yantrixlab.com/og-agency.png'],
  },
};

export const dynamic = 'force-dynamic';

export default function CostCalculatorPage() {
  return (
    <PublicLayout>
      <CostCalculatorClient />
    </PublicLayout>
  );
}
