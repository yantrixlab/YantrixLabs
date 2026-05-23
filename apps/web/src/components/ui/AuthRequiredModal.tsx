'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Eye, EyeOff, ShieldCheck, X } from 'lucide-react';
import { publicApiFetch } from '@/lib/api';
import { disableGuestMode } from '@/lib/guestMode';

interface AuthRequiredModalProps {
  open: boolean;
  onClose: () => void;
  defaultTab?: 'signin' | 'signup';
}

interface SignInForm {
  email: string;
  password: string;
}

interface SignUpForm {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  password: string;
}

export function AuthRequiredModal({ open, onClose, defaultTab = 'signin' }: AuthRequiredModalProps) {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>(defaultTab);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [signInForm, setSignInForm] = useState<SignInForm>({ email: '', password: '' });
  const [signUpForm, setSignUpForm] = useState<SignUpForm>({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    password: '',
  });

  useEffect(() => {
    if (!open) return;
    setActiveTab(defaultTab);
    setError('');
    setIsLoading(false);
  }, [open, defaultTab]);

  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [open, onClose]);

  const googleEnabled = process.env.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED === 'true';
  const submitLabel = useMemo(() => {
    if (activeTab === 'signin') return isLoading ? 'Signing in...' : 'Sign in';
    return isLoading ? 'Creating account...' : 'Create Account';
  }, [activeTab, isLoading]);

  if (!open) return null;

  const handleAuthSuccess = (accessToken: string, refreshToken: string) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    disableGuestMode();
    onClose();
    // Keep users in context and refresh app shell/state.
    window.location.reload();
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const data = await publicApiFetch<any>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: signInForm.email.trim(),
          password: signInForm.password,
        }),
      });
      if (!data?.success) {
        setError(data?.error || 'Invalid credentials. Please try again.');
        return;
      }
      handleAuthSuccess(data.data.accessToken, data.data.refreshToken);
    } catch (err: any) {
      setError(err?.message || 'Connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (signUpForm.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (signUpForm.phone && signUpForm.phone.length !== 10) {
      setError('Enter a valid 10-digit mobile number.');
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        name: signUpForm.name.trim(),
        businessName: signUpForm.businessName.trim(),
        email: signUpForm.email.trim() || undefined,
        phone: signUpForm.phone ? `+91${signUpForm.phone}` : undefined,
        password: signUpForm.password,
      };

      const data = await publicApiFetch<any>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      if (!data?.success) {
        setError(data?.error || 'Registration failed. Please try again.');
        return;
      }
      handleAuthSuccess(data.data.accessToken, data.data.refreshToken);
    } catch (err: any) {
      setError(err?.message || 'Connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[10060] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/55 backdrop-blur-sm" onClick={onClose} />

      <div className="auth-required-modal relative z-10 w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl">
        <button
          onClick={onClose}
          className="auth-modal-close absolute right-3 top-3 rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-4 flex items-center gap-2.5">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-indigo-600">YantrixLabs GST Invoice</p>
            <p className="text-sm font-semibold text-slate-900">Sign in required</p>
            <p className="text-xs text-slate-500">Please continue to save data to your account.</p>
          </div>
        </div>

        <div className="auth-modal-tabs mb-4 grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1 text-sm">
          <button
            type="button"
            onClick={() => {
              setActiveTab('signin');
              setError('');
            }}
            className={`auth-modal-tab rounded-lg px-3 py-2 text-center font-medium transition ${activeTab === 'signin' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-800'}`}
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('signup');
              setError('');
            }}
            className={`auth-modal-tab rounded-lg px-3 py-2 text-center font-medium transition ${activeTab === 'signup' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-800'}`}
          >
            Create Account
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        {activeTab === 'signin' ? (
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="auth-modal-label mb-1.5 block text-sm font-medium text-slate-700">Email address</label>
              <input
                type="email"
                required
                value={signInForm.email}
                onChange={(e) => setSignInForm((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="you@business.com"
                className="auth-modal-input w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="auth-modal-label text-sm font-medium text-slate-700">Password</label>
                <Link href="/auth/forgot-password" className="text-xs font-medium text-indigo-600 hover:text-indigo-700">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={signInForm.password}
                  onChange={(e) => setSignInForm((prev) => ({ ...prev, password: e.target.value }))}
                  placeholder="Enter password"
                  className="auth-modal-input w-full rounded-xl border border-slate-300 px-3 py-2.5 pr-10 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="auth-modal-icon-btn absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="auth-modal-primary inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitLabel}
              {!isLoading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label className="auth-modal-label mb-1.5 block text-sm font-medium text-slate-700">Full Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                required
                value={signUpForm.name}
                onChange={(e) => setSignUpForm((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Rajesh Sharma"
                className="auth-modal-input w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label className="auth-modal-label mb-1.5 block text-sm font-medium text-slate-700">Business Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                required
                value={signUpForm.businessName}
                onChange={(e) => setSignUpForm((prev) => ({ ...prev, businessName: e.target.value }))}
                placeholder="Sharma Electronics Pvt Ltd"
                className="auth-modal-input w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label className="auth-modal-label mb-1.5 block text-sm font-medium text-slate-700">Email Address</label>
              <input
                type="email"
                value={signUpForm.email}
                onChange={(e) => setSignUpForm((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="you@business.com"
                className="auth-modal-input w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label className="auth-modal-label mb-1.5 block text-sm font-medium text-slate-700">Mobile Number</label>
              <div className="flex gap-2">
                <span className="auth-modal-country inline-flex items-center rounded-xl border border-slate-300 bg-slate-50 px-3 text-sm text-slate-600">
                  +91
                </span>
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={10}
                  value={signUpForm.phone}
                  onChange={(e) =>
                    setSignUpForm((prev) => ({
                      ...prev,
                      phone: e.target.value.replace(/\D/g, '').slice(0, 10),
                    }))
                  }
                  placeholder="9876543210"
                  className="auth-modal-input flex-1 rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            <div>
              <label className="auth-modal-label mb-1.5 block text-sm font-medium text-slate-700">Password <span className="text-red-500">*</span></label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={8}
                  value={signUpForm.password}
                  onChange={(e) => setSignUpForm((prev) => ({ ...prev, password: e.target.value }))}
                  placeholder="Min. 8 characters"
                  className="auth-modal-input w-full rounded-xl border border-slate-300 px-3 py-2.5 pr-10 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="auth-modal-icon-btn absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="auth-modal-primary inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitLabel}
              {!isLoading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>
        )}

        <button
          type="button"
          disabled={!googleEnabled}
          className="auth-modal-google mt-3 inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
          title={googleEnabled ? 'Continue with Google' : 'Google sign-in coming soon'}
        >
          Continue with Google {googleEnabled ? '' : '(Coming soon)'}
        </button>
      </div>
    </div>
  );
}
