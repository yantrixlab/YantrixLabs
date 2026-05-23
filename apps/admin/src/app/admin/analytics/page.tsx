'use client';

import { useEffect, useState } from 'react';
import { adminFetch } from '@/lib/api';

type Overview = {
  totalEvents: number;
  signups: number;
  logins: number;
  invoicesCreated: number;
  exportsDone: number;
  scannerConnections: number;
  activeUsers: number;
  conversionRate: number;
};

type FunnelStep = { step: string; count: number };

export default function AdminAnalyticsPage() {
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [overview, setOverview] = useState<Overview | null>(null);
  const [activationFunnel, setActivationFunnel] = useState<FunnelStep[]>([]);
  const [scannerFunnel, setScannerFunnel] = useState<FunnelStep[]>([]);
  const [retention, setRetention] = useState<{ cohortSize: number; day1: number; day7: number; day30: number } | null>(null);
  const [scannerQuality, setScannerQuality] = useState<{ totalScans: number; failedScans: number; successRate: number } | null>(null);

  useEffect(() => {
    setLoading(true);
    setError('');
    Promise.allSettled([
      adminFetch<{ data: Overview }>(`/admin/analytics/overview?days=${days}`),
      adminFetch<{ data: { activationFunnel: FunnelStep[]; scannerFunnel: FunnelStep[] } }>(`/admin/analytics/funnels?days=${days}`),
      adminFetch<{ data: { cohortSize: number; day1: number; day7: number; day30: number } }>(`/admin/analytics/retention?days=${days}`),
      adminFetch<{ data: { totalScans: number; failedScans: number; successRate: number } }>(`/admin/analytics/scanner-quality?days=${days}`),
    ])
      .then(([o, f, r, s]) => {
        const overviewData =
          o.status === 'fulfilled'
            ? o.value.data
            : {
                totalEvents: 0,
                signups: 0,
                logins: 0,
                invoicesCreated: 0,
                exportsDone: 0,
                scannerConnections: 0,
                activeUsers: 0,
                conversionRate: 0,
              };
        setOverview(overviewData);
        setActivationFunnel(
          f.status === 'fulfilled' ? f.value.data.activationFunnel || [] : []
        );
        setScannerFunnel(
          f.status === 'fulfilled' ? f.value.data.scannerFunnel || [] : []
        );
        setRetention(
          r.status === 'fulfilled'
            ? r.value.data
            : { cohortSize: 0, day1: 0, day7: 0, day30: 0 }
        );
        setScannerQuality(
          s.status === 'fulfilled'
            ? s.value.data
            : { totalScans: 0, failedScans: 0, successRate: 0 }
        );

        if (
          o.status === 'rejected' &&
          f.status === 'rejected' &&
          r.status === 'rejected' &&
          s.status === 'rejected'
        ) {
          setError('Analytics data source is not ready yet. Showing fallback values.');
        }
      })
      .catch((e: any) => setError(e.message || 'Failed to load analytics'))
      .finally(() => setLoading(false));
  }, [days]);

  const Stat = ({ label, value }: { label: string; value: string | number }) => (
    <div className="rounded-2xl border border-gray-800 bg-gray-900/70 p-4">
      <p className="text-xs uppercase tracking-wider text-gray-500">{label}</p>
      <p className="mt-2 text-2xl font-bold text-white">{value}</p>
    </div>
  );

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Founder Analytics</h1>
          <p className="mt-1 text-sm text-gray-400">Full-funnel metrics across product, scanner, and billing workflows.</p>
        </div>
        <select
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-200"
        >
          <option value={7}>Last 7 days</option>
          <option value={30}>Last 30 days</option>
          <option value={90}>Last 90 days</option>
        </select>
      </div>

      {error && <div className="mb-4 rounded-xl border border-red-900 bg-red-950/40 p-3 text-sm text-red-300">{error}</div>}
      {loading ? <p className="text-gray-400">Loading analytics...</p> : null}

      {!loading && overview && (
        <>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Stat label="Total Events" value={overview.totalEvents.toLocaleString()} />
            <Stat label="Signups" value={overview.signups.toLocaleString()} />
            <Stat label="Active Users" value={overview.activeUsers.toLocaleString()} />
            <Stat label="Invoices Created" value={overview.invoicesCreated.toLocaleString()} />
            <Stat label="Exports" value={overview.exportsDone.toLocaleString()} />
            <Stat label="Scanner Connections" value={overview.scannerConnections.toLocaleString()} />
            <Stat label="Logins" value={overview.logins.toLocaleString()} />
            <Stat label="Activation Conversion" value={`${overview.conversionRate}%`} />
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/70 p-5">
              <h2 className="text-lg font-semibold text-white">Activation Funnel</h2>
              <div className="mt-4 space-y-3">
                {activationFunnel.map((step) => (
                  <div key={step.step} className="flex items-center justify-between rounded-lg bg-gray-800/60 px-3 py-2">
                    <span className="text-sm text-gray-300">{step.step}</span>
                    <span className="text-sm font-semibold text-white">{step.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/70 p-5">
              <h2 className="text-lg font-semibold text-white">Scanner Funnel</h2>
              <div className="mt-4 space-y-3">
                {scannerFunnel.map((step) => (
                  <div key={step.step} className="flex items-center justify-between rounded-lg bg-gray-800/60 px-3 py-2">
                    <span className="text-sm text-gray-300">{step.step}</span>
                    <span className="text-sm font-semibold text-white">{step.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/70 p-5">
              <h2 className="text-lg font-semibold text-white">Retention Snapshot</h2>
              <div className="mt-4 grid grid-cols-4 gap-3">
                <Stat label="Cohort" value={retention?.cohortSize ?? 0} />
                <Stat label="D1" value={retention?.day1 ?? 0} />
                <Stat label="D7" value={retention?.day7 ?? 0} />
                <Stat label="D30" value={retention?.day30 ?? 0} />
              </div>
            </div>
            <div className="rounded-2xl border border-gray-800 bg-gray-900/70 p-5">
              <h2 className="text-lg font-semibold text-white">Scanner Quality</h2>
              <div className="mt-4 grid grid-cols-3 gap-3">
                <Stat label="Total Scans" value={scannerQuality?.totalScans ?? 0} />
                <Stat label="Failed Scans" value={scannerQuality?.failedScans ?? 0} />
                <Stat label="Success Rate" value={`${scannerQuality?.successRate ?? 0}%`} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
