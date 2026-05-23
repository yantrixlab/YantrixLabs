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
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const publicThemeBootstrap = `
    (function () {
      try {
        var mode = localStorage.getItem('public_theme_mode') || 'system';
        var p = window.location.pathname || '';
        var isPublicMarketingPage =
          p === '/' ||
          p === '/tools' ||
          p.indexOf('/tools/') === 0 ||
          p === '/services' ||
          p === '/about' ||
          p === '/blog' ||
          p.indexOf('/blog/') === 0 ||
          p === '/contact';

        if (!isPublicMarketingPage) return;

        var resolved = mode === 'system'
          ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
          : mode;

        document.documentElement.setAttribute('data-public-theme-mode', mode);
        document.documentElement.setAttribute('data-public-theme', resolved);
        document.documentElement.style.colorScheme = resolved;
      } catch (e) {}
    })();
  `;

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
        {process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="ga4-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  window.gtag = gtag;
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID}', { anonymize_ip: true });
                `,
              }}
            />
          </>
        ) : null}
        {process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ? (
          <Script
            id="clarity-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}");
              `,
            }}
          />
        ) : null}
        {process.env.NEXT_PUBLIC_SENTRY_DSN_BROWSER ? (
          <>
            <Script src="https://browser.sentry-cdn.com/8.33.0/bundle.tracing.min.js" strategy="afterInteractive" />
            <Script
              id="sentry-browser-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  if (window.Sentry) {
                    window.Sentry.init({
                      dsn: "${process.env.NEXT_PUBLIC_SENTRY_DSN_BROWSER}",
                      tracesSampleRate: 0.1,
                      environment: "${process.env.NEXT_PUBLIC_APP_ENV || "production"}",
                    });
                  }
                `,
              }}
            />
          </>
        ) : null}
        <script dangerouslySetInnerHTML={{ __html: publicThemeBootstrap }} />
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
