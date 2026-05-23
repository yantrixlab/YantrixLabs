'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, FileText, ShieldCheck } from 'lucide-react';
import { API_URL } from '@/lib/api';
import { track } from '@/lib/analytics/client';

type Step = 1 | 2 | 3 | 4;

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (step !== 4) return;
    const timer = window.setTimeout(() => {
      window.location.href = '/auth/login?reset=success';
    }, 1800);
    return () => window.clearTimeout(timer);
  }, [step]);

  const identifierPayload = useMemo(() => ({ email: email.trim() }), [email]);

  const maskedIdentifier = useMemo(() => {
    const value = email.trim();
    if (!value.includes('@')) return value;
    return value.replace(/(.{2}).*(@.*)/, '$1***$2');
  }, [email]);

  const validateIdentifier = (): boolean => {
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!ok) setError('Enter a valid email address.');
    return ok;
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    if (!validateIdentifier()) return;

    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/otp/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...identifierPayload, purpose: 'reset' }),
      });
      const data = await res.json();
      if (!data?.success) {
        setError(data?.error || 'Failed to send OTP. Please try again.');
        return;
      }
      void track('auth_forgot_password', { stage: 'otp_sent' });
      setSuccessMsg(data?.message || 'OTP sent successfully.');
      setStep(2);
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    if (!/^\d{6}$/.test(otp)) {
      setError('Enter a valid 6-digit OTP.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/otp/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...identifierPayload, code: otp, purpose: 'reset' }),
      });
      const data = await res.json();
      if (!data?.success) {
        setError(data?.error || 'Invalid or expired OTP.');
        return;
      }
      setSuccessMsg('OTP verified. You can now set a new password.');
      setStep(3);
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Password and confirm password do not match.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...identifierPayload,
          code: otp,
          newPassword,
        }),
      });
      const data = await res.json();
      if (!data?.success) {
        setError(data?.error || 'Failed to reset password.');
        return;
      }
      void track('auth_forgot_password', { stage: 'completed' });
      setStep(4);
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError('');
    setSuccessMsg('');
    if (!validateIdentifier()) return;

    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/otp/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...identifierPayload, purpose: 'reset' }),
      });
      const data = await res.json();
      if (!data?.success) {
        setError(data?.error || 'Failed to resend OTP.');
        return;
      }
      setSuccessMsg('A fresh OTP has been sent.');
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-auth-page min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-4">
      <div className="mx-auto flex min-h-screen w-full max-w-lg items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="w-full">
          <div className="forgot-auth-header mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div className="text-left">
                <span className="block text-2xl font-bold leading-none text-slate-900">YantrixLabs</span>
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-indigo-600">GST Invoice</span>
              </div>
            </Link>
            <h1 className="mt-6 text-2xl font-bold text-slate-900">Forgot password?</h1>
            <p className="mt-1 text-sm text-slate-600">
              Reset your password securely with OTP verification.
            </p>
          </div>

          <div className="forgot-auth-card rounded-2xl border border-slate-100 bg-white p-6 shadow-xl">
            <div className="mb-6 grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full ${step >= i ? 'bg-indigo-600' : 'bg-slate-200'}`}
                />
              ))}
            </div>

            {error && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}
            {successMsg && <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{successMsg}</div>}

            {step === 1 && (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Email address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@business.com"
                    className="forgot-auth-input w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="forgot-auth-primary inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
                >
                  {isLoading ? 'Sending OTP...' : 'Send OTP'}
                  {!isLoading && <ArrowRight className="h-4 w-4" />}
                </button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Enter 6-digit OTP</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="123456"
                    className="forgot-auth-input w-full rounded-xl border border-slate-300 px-3 py-2.5 text-center text-2xl tracking-widest focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                  <p className="mt-1 text-xs text-slate-500">OTP sent to {maskedIdentifier}</p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="forgot-auth-primary inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
                >
                  {isLoading ? 'Verifying...' : 'Verify OTP'}
                  {!isLoading && <ArrowRight className="h-4 w-4" />}
                </button>

                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={isLoading}
                  className="w-full text-sm font-medium text-indigo-600 hover:text-indigo-700 disabled:opacity-60"
                >
                  Resend OTP
                </button>
              </form>
            )}

            {step === 3 && (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">New password</label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    className="forgot-auth-input w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Confirm new password</label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    className="forgot-auth-input w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="forgot-auth-primary inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
                >
                  {isLoading ? 'Resetting password...' : 'Reset Password'}
                  {!isLoading && <ArrowRight className="h-4 w-4" />}
                </button>
              </form>
            )}

            {step === 4 && (
              <div className="py-4 text-center">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
                  <CheckCircle className="h-8 w-8 text-emerald-600" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900">Password reset successful</h2>
                <p className="mt-1 text-sm text-slate-600">Redirecting you to login...</p>
              </div>
            )}

            <div className="mt-6 border-t border-slate-100 pt-5 text-center">
              <p className="text-sm text-slate-600">
                Remembered your password?{' '}
                <Link href="/auth/login" className="font-semibold text-indigo-600 hover:text-indigo-700">
                  Sign in
                </Link>
              </p>
              <p className="mt-2 inline-flex items-center gap-1 text-xs text-slate-500">
                <ShieldCheck className="h-3.5 w-3.5" /> Your data stays secure.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
