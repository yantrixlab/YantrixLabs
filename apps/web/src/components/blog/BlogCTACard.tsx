import Link from 'next/link';
import { Sparkles, ArrowRight, Phone } from 'lucide-react';

export function BlogCTACard() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 p-6 text-white shadow-lg shadow-indigo-200/50">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-7 w-7 rounded-full bg-white/20 flex items-center justify-center">
          <Sparkles className="h-3.5 w-3.5" />
        </div>
        <p className="text-[11px] font-bold uppercase tracking-widest text-indigo-100">Have a project in mind?</p>
      </div>
      <h3 className="text-lg font-bold mb-2 leading-snug">Get a Free Project Estimate</h3>
      <p className="text-sm text-indigo-100 mb-5 leading-relaxed">
        Tell us what you&apos;re building. We&apos;ll get back to you with a clear scope and estimate within 2 hours.
      </p>
      <div className="space-y-2">
        <Link
          href="/contact"
          className="flex items-center justify-center gap-2 w-full rounded-xl bg-white text-indigo-700 px-4 py-2.5 text-sm font-bold hover:bg-indigo-50 transition-colors"
        >
          Get a Free Estimate
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/services"
          className="flex items-center justify-center gap-2 w-full rounded-xl border border-white/30 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
        >
          <Phone className="h-3.5 w-3.5" />
          View Our Services
        </Link>
      </div>
    </div>
  );
}
