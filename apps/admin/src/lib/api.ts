const rawApiUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

function normalizeApiUrl(url?: string): string {
  if (!url) {
    // Production-safe fallback: prefer same-origin API route if env is missing.
    if (typeof window !== 'undefined' && window.location?.origin) {
      return `${window.location.origin}/api/v1`;
    }
    return 'http://localhost:4000/api/v1';
  }

  const cleaned = url.replace(/\/+$/, '');
  // Backward-compatible guard: if env points to ".../api", append "/v1"
  // because backend routes are mounted at /api/v1.
  if (cleaned.endsWith('/api')) return `${cleaned}/v1`;

  return cleaned;
}

function withV1(url: string): string {
  const cleaned = url.replace(/\/+$/, "");
  if (cleaned.endsWith("/api/v1")) return cleaned;
  if (cleaned.endsWith("/api")) return `${cleaned}/v1`;
  return `${cleaned}/api/v1`;
}

export function getApiCandidates(): string[] {
  const candidates: string[] = [];
  const seen = new Set<string>();
  const add = (value?: string) => {
    if (!value) return;
    const normalized = normalizeApiUrl(value);
    if (seen.has(normalized)) return;
    seen.add(normalized);
    candidates.push(normalized);
  };

  add(rawApiUrl);

  if (typeof window !== "undefined" && window.location?.origin) {
    add(withV1(window.location.origin));
  }

  add("http://localhost:4000/api/v1");
  return candidates;
}

export const API_URL = getApiCandidates()[0];

export function getAdminToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('adminToken');
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  const token = localStorage.getItem('adminToken');
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export async function adminFetch<T = any>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const token = getAdminToken();
  let lastError: unknown;

  for (const baseUrl of getApiCandidates()) {
    try {
      const res = await fetch(`${baseUrl}${path}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...(options?.headers ?? {}),
        },
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || `HTTP ${res.status}`);
      }
      return data;
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError instanceof Error ? lastError : new Error("Failed to reach API");
}
