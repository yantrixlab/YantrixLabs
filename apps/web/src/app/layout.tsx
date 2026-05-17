import type { Metadata } from 'next';
import './globals.css';
import { ToastProvider } from '@/components/ui/Toast';

export const metadata: Metadata = {
  title: {
    default: 'Yantrix Labs — Smart Business Software & Digital Products',
    template: '%s | Yantrix Labs',
  },
  description: 'Yantrix Labs builds smart digital products and business tools. SaaS platforms, GST billing, HR tools, booking systems, and custom business software for startups, SMEs, and enterprises.',
  keywords: ['software company India', 'business software', 'SaaS platform', 'GST billing software', 'custom software development', 'yantrix labs', 'startup software'],
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
    title: 'Yantrix Labs — Smart Business Software & Digital Products',
    description: 'We build smart digital products and business tools for startups, SMEs, and enterprises.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yantrix Labs — Smart Business Software',
    description: 'SaaS platforms, GST billing, booking systems & custom business software.',
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
