import type { Metadata } from 'next';
import HomePageClient from './HomePageClient';

export const metadata: Metadata = {
  title: 'Website & Mobile App Development Company in Kolkata | Yantrix Labs',
  description:
    'Yantrix Labs is a software development company in Kolkata building web apps, mobile apps, SaaS platforms, and custom software for startups and SMEs across India.',
  keywords: [
    'website development company in Kolkata',
    'mobile app development company Kolkata',
    'SaaS development company India',
    'custom software development Kolkata',
    'web app development services India',
    'startup software development company',
    'MVP development company India',
  ],
  alternates: {
    canonical: 'https://yantrixlab.com',
  },
  openGraph: {
    title: 'Website & Mobile App Development Company | Yantrix Labs',
    description:
      'We build web apps, mobile apps, and SaaS platforms for startups and businesses across India.',
    url: 'https://yantrixlab.com',
    siteName: 'Yantrix Labs',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: 'https://yantrixlab.com/og-agency.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Website & App Development Company | Yantrix Labs',
    description: 'Custom web, mobile, and SaaS development for startups and businesses.',
    images: ['https://yantrixlab.com/og-agency.png'],
  },
};

const professionalServiceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Yantrix Labs',
  url: 'https://yantrixlab.com',
  logo: 'https://yantrixlab.com/app_logo.png',
  description:
    'Software development company in Kolkata building web apps, mobile apps, and SaaS platforms.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kolkata',
    addressRegion: 'West Bengal',
    addressCountry: 'IN',
  },
  areaServed: 'IN',
  serviceType: [
    'Web Application Development',
    'Mobile App Development',
    'SaaS Development',
    'Custom Software Development',
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceJsonLd) }}
      />
      <HomePageClient />
    </>
  );
}
