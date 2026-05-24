'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Menu, Moon, Sun, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { isAuthenticated, getUserData, apiFetch, isSafeImageUrl } from '@/lib/api';
import { enableGuestMode } from '@/lib/guestMode';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/tools', label: 'Tools' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

interface PublicLayoutProps {
  children: React.ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const isGstLanding = pathname === '/gst-invoice';
  const isPublicMarketingPage =
    pathname === '/' ||
    pathname === '/tools' ||
    pathname.startsWith('/tools/') ||
    pathname === '/services' ||
    pathname === '/about' ||
    pathname === '/blog' ||
    pathname.startsWith('/blog/') ||
    pathname === '/contact';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [initials, setInitials] = useState('');
  const [businessLogo, setBusinessLogo] = useState<string | null>(null);
  const [businessName, setBusinessName] = useState<string | null>(null);
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'system'>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  const applyPublicTheme = (mode: 'light' | 'dark' | 'system') => {
    if (typeof window === 'undefined') return;
    const isDark = mode === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : mode === 'dark';
    const resolved: 'light' | 'dark' = isDark ? 'dark' : 'light';

    document.documentElement.setAttribute('data-public-theme-mode', mode);
    document.documentElement.setAttribute('data-public-theme', resolved);
    document.documentElement.style.colorScheme = resolved;

    setThemeMode(mode);
    setResolvedTheme(resolved);
  };

  useEffect(() => {
    if (!isPublicMarketingPage) return;
    const stored = (localStorage.getItem('public_theme_mode') || 'system') as 'light' | 'dark' | 'system';
    const initialMode = stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system';
    applyPublicTheme(initialMode);

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onSystemThemeChange = () => {
      if ((localStorage.getItem('public_theme_mode') || 'system') === 'system') {
        applyPublicTheme('system');
      }
    };
    mq.addEventListener('change', onSystemThemeChange);
    return () => mq.removeEventListener('change', onSystemThemeChange);
  }, [isPublicMarketingPage]);

  useEffect(() => {
    if (!isAuthenticated()) return;
    setLoggedIn(true);
    const tokenData = getUserData();
    const displayName = tokenData.name || 'User';
    setInitials(displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2));

    apiFetch('/auth/me')
      .then((res: any) => {
        if (res.data?.user?.name) {
          const name = res.data.user.name;
          setInitials(name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2));
        }
        const biz = res.data?.memberships?.[0]?.business;
        if (biz?.logo && typeof biz.logo === 'string' && isSafeImageUrl(biz.logo)) {
          setBusinessLogo(biz.logo);
        }
        if (biz?.name) setBusinessName(biz.name);
      })
      .catch(() => {});
  }, []);

  const onThemeModeChange = (mode: 'light' | 'dark' | 'system') => {
    localStorage.setItem('public_theme_mode', mode);
    applyPublicTheme(mode);
  };

  const onThemeToggle = () => {
    const nextMode = resolvedTheme === 'dark' ? 'light' : 'dark';
    onThemeModeChange(nextMode);
  };

  return (
    <div className="public-site min-h-screen bg-white">
      <nav className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl ${
        isHomePage
          ? 'border-brand-700 bg-brand-950/95'
          : 'border-gray-100 bg-white/80'
      }`}>
        <div className="container-wide">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <img src="/app_logo.png" alt="Yantrix Labs" className="h-8 w-8 rounded-lg object-contain" />
              <span className={`text-xl font-bold ${isHomePage ? 'text-white' : 'text-gray-900'}`}>Yantrix Labs</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map(link => {
                const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium transition-colors ${
                      isHomePage
                        ? isActive
                          ? 'text-brand-400 font-semibold'
                          : 'text-brand-50 hover:text-white'
                        : isActive
                          ? 'text-brand-600 font-semibold'
                          : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="hidden md:flex items-center gap-3">
              {isPublicMarketingPage && (
                <button
                  type="button"
                  aria-label={`Toggle theme. Current ${resolvedTheme}`}
                  onClick={onThemeToggle}
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${
                    isHomePage
                      ? 'border-brand-700 bg-brand-900/70 text-brand-100 hover:text-white'
                      : 'border-gray-200 bg-[rgb(var(--public-surface-muted))] text-[rgb(var(--public-text-muted))] hover:text-[rgb(var(--public-text))]'
                  }`}
                >
                  {resolvedTheme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </button>
              )}
              {isPublicMarketingPage && (
                <Link
                  href="/contact"
                  onClick={() => {
                    if (isGstLanding) enableGuestMode();
                  }}
                  className="enquiry-btn inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-white"
                >
                  Enquiry
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              )}
              {loggedIn ? (
                <>
                  <Link href="/dashboard" className="flex-shrink-0">
                    <div className="h-9 w-9 rounded-full overflow-hidden bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center ring-2 ring-indigo-200 hover:ring-indigo-400 transition-all">
                      {businessLogo ? (
                        <img src={businessLogo} alt={businessName || 'Business Logo'} className="h-full w-full object-contain" />
                      ) : (
                        <span className="text-white text-xs font-bold">{initials}</span>
                      )}
                    </div>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className={`inline-flex items-center px-2 py-2 text-sm font-medium transition-colors ${isHomePage ? 'text-brand-100 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}
                  >
                    Sign in
                  </Link>
                  <Link
                    href={isGstLanding ? '/dashboard?guest=1' : '/auth/register'}
                    onClick={() => {
                      if (isGstLanding) enableGuestMode();
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-brand-500 to-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
                  >
                    Get Started
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </>
              )}
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className={`md:hidden border-t px-4 py-4 space-y-2 ${
            isHomePage ? 'border-brand-800 bg-brand-950' : 'border-gray-100 bg-white'
          }`}>
            {NAV_LINKS.map(link => {
                const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block py-2 text-sm font-medium ${
                      isHomePage
                        ? isActive ? 'text-brand-300 font-semibold' : 'text-brand-100'
                        : isActive ? 'text-indigo-600 font-semibold' : 'text-gray-700'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
            <div className="pt-2 space-y-2">
              {isPublicMarketingPage && (
                <>
                  <button
                    type="button"
                    aria-label={`Toggle theme. Current ${resolvedTheme}`}
                    onClick={onThemeToggle}
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition-all ${
                      isHomePage
                        ? 'border-brand-700 bg-brand-900/70 text-brand-100 hover:text-white'
                        : 'border-gray-200 bg-[rgb(var(--public-surface-muted))] text-[rgb(var(--public-text-muted))] hover:text-[rgb(var(--public-text))]'
                    }`}
                  >
                    {resolvedTheme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    {resolvedTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                  </button>
                  <Link
                    href="/contact"
                    onClick={() => {
                      if (isGstLanding) enableGuestMode();
                      setMobileMenuOpen(false);
                    }}
                    className="enquiry-btn block rounded-lg px-4 py-2 text-center text-sm font-semibold text-white"
                  >
                    Enquiry
                  </Link>
                </>
              )}
              {loggedIn ? (
                <Link href="/dashboard" className={`flex items-center gap-2 py-2 text-sm font-medium ${isHomePage ? 'text-brand-100' : 'text-gray-700'}`} onClick={() => setMobileMenuOpen(false)}>
                  <div className="h-7 w-7 rounded-full overflow-hidden bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center flex-shrink-0">
                    {businessLogo ? (
                      <img src={businessLogo} alt={businessName || 'Business'} className="h-full w-full object-contain" />
                    ) : (
                      <span className="text-white text-xs font-bold">{initials}</span>
                    )}
                  </div>
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className={`block py-2 text-sm font-medium ${isHomePage ? 'text-brand-100' : 'text-gray-700'}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign in
                  </Link>
                  <Link
                    href={isGstLanding ? '/dashboard?guest=1' : '/auth/register'}
                    onClick={() => {
                      if (isGstLanding) enableGuestMode();
                      setMobileMenuOpen(false);
                    }}
                    className="block rounded-lg bg-gradient-to-r from-brand-500 to-brand-600 px-4 py-2 text-center text-sm font-semibold text-white"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      <main className="pt-16">
        {children}
      </main>

      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container-wide">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <img src="/app_logo.png" alt="Yantrix Labs" className="h-8 w-8 rounded-lg object-contain" />
                <span className="text-xl font-bold text-white">Yantrix Labs</span>
              </Link>
              <p className="text-sm leading-relaxed mb-3">
                We build smart digital products and business tools for startups, SMEs, and enterprises.
              </p>
              <p className="text-xs">Made with care in India</p>
            </div>
            <div>
              <h5 className="font-semibold text-white mb-3">Products</h5>
              <ul className="space-y-2 text-sm">
                <li><Link href="/gst-invoice" className="hover:text-white transition-colors">GST Invoice Tool</Link></li>
                <li><Link href="/tools" className="hover:text-white transition-colors">All Products</Link></li>
                <li><Link href="/services" className="hover:text-white transition-colors">Custom Development</Link></li>
                <li><Link href="/saas-development-services" className="hover:text-white transition-colors">SaaS Development</Link></li>
                <li><Link href="/mobile-app-development-services" className="hover:text-white transition-colors">Mobile App Development</Link></li>
                <li><Link href="/web-app-development-services" className="hover:text-white transition-colors">Web App Development</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-white mb-3">Company</h5>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/website-development-company-kolkata" className="hover:text-white transition-colors">Kolkata Services</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm">&copy; {new Date().getFullYear()} Yantrix Labs. All rights reserved.</p>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

