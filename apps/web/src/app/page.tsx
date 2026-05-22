import type { Metadata } from 'next';
import HomePageClient from './HomePageClient';

export const metadata: Metadata = {
  title: 'Free GST Invoice Generator for Indian Businesses | Yantrix Labs',
  description:
    'Free GST Invoice is a fast, mobile-friendly GST invoice generator by Yantrix Labs. Create GST-compliant invoices, export PDF bills, and automate billing for Indian businesses.',
  keywords: [
    'free gst invoice generator',
    'gst invoice software india',
    'free invoice generator india',
    'gst billing software',
    'online gst invoice maker',
    'invoice generator with gst',
    'business billing software india',
    'free billing software for small business',
    'invoice maker app india',
    'retail billing software',
    'gst invoice app',
    'simple invoice software india',
  ],
  alternates: {
    canonical: 'https://yantrixlab.com',
  },
  openGraph: {
    title: 'Free GST Invoice Generator | Yantrix Labs',
    description:
      'Create GST-compliant invoices in seconds with Free GST Invoice by Yantrix Labs.',
    url: 'https://yantrixlab.com',
    siteName: 'Yantrix Labs',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: 'https://yantrixlab.com/og-gst-tool.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free GST Invoice Generator | Yantrix Labs',
    description: 'Fast GST invoice software for Indian businesses with PDF export and mobile support.',
    images: ['https://yantrixlab.com/og-gst-tool.png'],
  },
};

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'Yantrix Labs',
      url: 'https://yantrixlab.com',
      logo: 'https://yantrixlab.com/app_logo.png',
      slogan: 'Business Automation for Modern India',
      areaServed: 'IN',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Free GST Invoice',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web, Android, iOS',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
      creator: { '@type': 'Organization', name: 'Yantrix Labs' },
      description:
        'Free GST invoice generator for Indian businesses with GST calculation automation, PDF export, and mobile-friendly invoicing.',
      featureList: [
        'Free GST invoice creation',
        'GST calculation automation',
        'PDF invoice export',
        'Customer management',
        'Invoice history',
        'CGST, SGST, IGST support',
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is a GST invoice?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A GST invoice is a tax-compliant bill with supplier, buyer, item, GST rate, and tax details as required under Indian GST rules.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is this GST invoice generator free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, Free GST Invoice can be used at no cost for GST invoice generation.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I download GST invoices as PDF?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, invoices can be exported as PDF for sharing and record-keeping.',
          },
        },
      ],
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <HomePageClient />
    </>
  );
}
