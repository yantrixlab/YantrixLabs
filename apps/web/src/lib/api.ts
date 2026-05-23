import { emitAuthRequired, isGuestMode, disableGuestMode } from './guestMode';
import { getGuestDemoResponse } from './guestDemoData';

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
    // Always try same-origin proxy first in browsers to avoid CORS/mixed-content issues.
    add(`${window.location.origin}/api/proxy`);
    add(withV1(window.location.origin));
  }

  if (typeof window === "undefined") {
    add("http://localhost:4000/api/v1");
  }
  return candidates;
}

export const API_URL = getApiCandidates()[0];

/**
 * Returns true if the given string is a safe image URL (data URI or HTTPS).
 * Used to prevent XSS from arbitrary logo/image values stored in the database.
 */
export function isSafeImageUrl(url: string): boolean {
  return /^(data:image\/(png|jpe?g|gif|webp|svg\+xml);base64,|https:\/\/)/.test(url);
}

export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('accessToken');
}

export function getUserData(): { name?: string; email?: string; role?: string; businessId?: string } {
  if (typeof window === 'undefined') return {};
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) return {};
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch {
    return {};
  }
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  const token = localStorage.getItem('accessToken');
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const ok = payload.exp * 1000 > Date.now();
    if (ok) disableGuestMode();
    return ok;
  } catch {
    return false;
  }
}

export async function apiFetch<T = any>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const method = (options?.method || 'GET').toUpperCase();
  const guest = isGuestMode() && !isAuthenticated();

  if (guest && method !== 'GET' && method !== 'HEAD') {
    emitAuthRequired(path);
    throw new Error('AUTH_REQUIRED');
  }

  if (guest && method === 'GET') {
    const demo = getGuestDemoResponse(path);
    if (demo) return demo as T;
  }

  const token = getAccessToken();
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

// Use for unauthenticated/public flows like login/register.
export async function publicApiFetch<T = any>(
  path: string,
  options?: RequestInit
): Promise<T> {
  let lastError: unknown;

  for (const baseUrl of getApiCandidates()) {
    try {
      const res = await fetch(`${baseUrl}${path}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
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
