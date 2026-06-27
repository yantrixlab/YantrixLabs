import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { ToastProvider } from '@/components/ui/Toast';

export const metadata: Metadata = {
  title: {
    default: 'Yantrix Labs',
    template: '%s | Yantrix Labs',
  },
  description: 'Yantrix Labs builds software products and digital solutions.',
  authors: [{ name: 'Yantrix Labs' }],
  creator: 'Yantrix Labs',
  icons: {
    icon: '/app_logo.png',
    shortcut: '/app_logo.png',
    apple: '/app_logo.png',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://yantrixlab.com'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://yantrixlab.com',
    siteName: 'Yantrix Labs',
    title: 'Yantrix Labs',
    description: 'Software products and digital solutions by Yantrix Labs.',
    images: [{ url: '/og-agency.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yantrix Labs',
    description: 'Software products and digital solutions by Yantrix Labs.',
    images: ['/og-agency.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://yantrixlab.com';

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Yantrix Labs',
  url: siteUrl,
  logo: `${siteUrl}/app_logo.png`,
  description: 'Yantrix Labs builds software products and digital solutions, including SaaS, web, and mobile app development.',
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Yantrix Labs',
  url: siteUrl,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6727827078869762"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-PDPZ7XLBP8" strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PDPZ7XLBP8');
          `}
        </Script>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
