import type { Metadata } from 'next';
import './globals.css';
import { ToastProvider } from '@/components/ui/Toast';

export const metadata: Metadata = {
  title: {
    default: 'Website Development Company for Startups & Businesses | Yantrix Labs',
    template: '%s | Yantrix Labs',
  },
  description:
    'Yantrix Labs is a website and mobile app development company building SaaS products, custom software, and AI-powered business tools for startups and SMEs.',
  keywords: [
    'website development company',
    'website and mobile app development',
    'SaaS development company',
    'SaaS product development',
    'mobile app development company',
    'custom software development',
    'web app development services',
    'mobile app development services',
    'business automation tools',
    'passive income tools',
    'income automation tools',
    'AI business tools',
    'startup app development',
    'MVP development company',
    'website development company in Kolkata',
    'mobile app development company in Kolkata',
  ],
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
    title: 'Website Development Company | Web, Mobile, SaaS & AI Tools',
    description:
      'Web app development, mobile app development, SaaS product engineering, and AI-powered business automation tools.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Website and Mobile App Development Company | Yantrix Labs',
    description:
      'Custom software, SaaS product development, and AI-powered business automation tools.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const themeBootstrap = `
    (function () {
      try {
        var theme = localStorage.getItem('gst_invoice_theme');
        var p = window.location.pathname || '';
        var isGstModuleRoute =
          p === '/dashboard' ||
          p === '/invoices' ||
          p.indexOf('/invoices/') === 0 ||
          p === '/customers' ||
          p.indexOf('/customers/') === 0 ||
          p === '/products' ||
          p.indexOf('/products/') === 0 ||
          p === '/reports' ||
          p === '/payments' ||
          p === '/expenses' ||
          p === '/inventory' ||
          p === '/hrm' ||
          p === '/crm' ||
          p === '/settings' ||
          p.indexOf('/settings/') === 0;

        if (isGstModuleRoute && theme === 'dark') {
          document.documentElement.setAttribute('data-gst-theme', 'dark');
          document.documentElement.style.backgroundColor = '#060b16';
          document.body.style.backgroundColor = '#060b16';
        } else {
          document.documentElement.removeAttribute('data-gst-theme');
          document.documentElement.style.backgroundColor = '';
          document.body.style.backgroundColor = '';
        }
      } catch (e) {}
    })();
  `;

  return (
    <html lang="en">
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}