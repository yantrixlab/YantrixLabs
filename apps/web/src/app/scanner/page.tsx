import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { CheckCircle2, Download, QrCode, ScanLine, ShieldCheck, Smartphone } from 'lucide-react';

const apkUrl = process.env.NEXT_PUBLIC_SCANNER_APK_URL?.trim();

export const metadata: Metadata = {
  title: 'Android Billing Scanner App | QR Pair GST Invoice Scanner | Yantrix',
  description:
    'Download Yantrix Android scanner app for GST billing. Pair with QR, scan products live into invoices, and update inventory in real time.',
  alternates: {
    canonical: 'https://yantrixlab.com/scanner',
  },
};

export default function ScannerPage() {
  return (
    <PublicLayout>
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0a1532] via-[#0f2249] to-[#142f63] py-20 text-white">
        <div className="container-wide relative">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-1 text-xs font-semibold">
              <Smartphone className="h-3.5 w-3.5" />
              Lightweight Android scanner app
            </span>
            <h1 className="mt-6 text-4xl font-extrabold sm:text-5xl">Yantrix Scanner APK</h1>
            <p className="mt-4 text-lg text-cyan-100">
              Turn your Android phone into a real-time GST billing scanner in under 3 seconds.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              {apkUrl ? (
                <a
                  href={apkUrl}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#0b3b5a] hover:bg-slate-100"
                >
                  <Download className="h-4 w-4" />
                  Download APK
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/70 px-6 py-3 text-sm font-semibold text-[#0b3b5a] opacity-80"
                >
                  <Download className="h-4 w-4" />
                  APK Coming Soon
                </button>
              )}
              <Link
                href="/dashboard?guest=1"
                className="inline-flex items-center justify-center rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Try Live Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-wide grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 p-6">
            <QrCode className="h-6 w-6 text-indigo-600" />
            <h2 className="mt-3 text-lg font-semibold text-slate-900">Step 1: Open APK</h2>
            <p className="mt-2 text-sm text-slate-600">Launch the app and tap connect scanner.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-6">
            <ScanLine className="h-6 w-6 text-cyan-600" />
            <h2 className="mt-3 text-lg font-semibold text-slate-900">Step 2: Scan Pair QR</h2>
            <p className="mt-2 text-sm text-slate-600">Scan the pairing QR shown in billing screen.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-6">
            <CheckCircle2 className="h-6 w-6 text-emerald-600" />
            <h2 className="mt-3 text-lg font-semibold text-slate-900">Step 3: Start Scanning</h2>
            <p className="mt-2 text-sm text-slate-600">Scan products and push them directly into invoices.</p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-14">
        <div className="container-wide grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Compatibility & Permissions</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>- Android 8+ recommended</li>
              <li>- Camera permission required for scanning</li>
              <li>- Internet required for sync and pairing</li>
              <li>- No account login required to start pairing</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Release Notes</h3>
            <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              <p><strong>Version:</strong> v1.0.0</p>
              <p className="mt-1"><strong>Features:</strong> QR pairing, invoice scan mode, catalog scan mode</p>
              <p className="mt-1"><strong>Security:</strong> scoped device pairing with backend validation</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="container-wide rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 text-emerald-700" />
            <div className="text-sm text-emerald-900">
              <p className="font-semibold">Trust & Safety</p>
              <p className="mt-1">
                Download scanner app only from official Yantrix links. Do not install modified third-party APK files.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

