'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { X, ShieldCheck } from 'lucide-react';

interface AuthRequiredModalProps {
  open: boolean;
  onClose: () => void;
  defaultTab?: 'signin' | 'signup';
}

export function AuthRequiredModal({ open, onClose, defaultTab = 'signin' }: AuthRequiredModalProps) {
  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [open, onClose]);

  if (!open) return null;

  const isSignup = defaultTab === 'signup';
  const googleEnabled = process.env.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED === 'true';

  return (
    <div className="fixed inset-0 z-[10060] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-4 flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-900">Sign in required</p>
            <p className="text-xs text-slate-500">Please continue to save data to your account.</p>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1 text-sm">
          <Link
            href="/auth/login"
            className={`rounded-lg px-3 py-2 text-center font-medium ${!isSignup ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}
          >
            Sign in
          </Link>
          <Link
            href="/auth/register"
            className={`rounded-lg px-3 py-2 text-center font-medium ${isSignup ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}
          >
            Sign up
          </Link>
        </div>

        <div className="space-y-2">
          <Link
            href={isSignup ? '/auth/register' : '/auth/login'}
            className="inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            {isSignup ? 'Create your account' : 'Continue to sign in'}
          </Link>
          <button
            type="button"
            disabled={!googleEnabled}
            className="inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
            title={googleEnabled ? 'Continue with Google' : 'Google sign-in coming soon'}
          >
            Continue with Google {googleEnabled ? '' : '(Coming soon)'}
          </button>
        </div>
      </div>
    </div>
  );
}

