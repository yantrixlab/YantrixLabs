const rawApiUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

function normalizeApiUrl(url?: string): string {
  if (!url) return 'http://localhost:4000/api/v1';

  const cleaned = url.replace(/\/+$/, '');
  // Backward-compatible guard: if env points to ".../api", append "/v1"
  // because backend routes are mounted at /api/v1.
  if (cleaned.endsWith('/api')) return `${cleaned}/v1`;

  return cleaned;
}

export const API_URL = normalizeApiUrl(rawApiUrl);

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
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options?.headers ?? {}),
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || `HTTP ${res.status}`);
  }

  return data;
}
