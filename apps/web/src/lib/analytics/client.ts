"use client";

import { API_URL, getAccessToken, getUserData, isAuthenticated } from "@/lib/api";
import type { AnalyticsEventName } from "./events";

type TrackProps = Record<string, unknown>;

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    clarity?: (...args: any[]) => void;
  }
}

function getSessionId(): string {
  const key = "yantrix_analytics_session_id";
  if (typeof window === "undefined") return "server";
  const existing = window.sessionStorage.getItem(key);
  if (existing) return existing;
  const generated = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  window.sessionStorage.setItem(key, generated);
  return generated;
}

function inferDeviceType(): string {
  if (typeof navigator === "undefined") return "unknown";
  const ua = navigator.userAgent.toLowerCase();
  if (/mobile|android|iphone/.test(ua)) return "mobile";
  if (/ipad|tablet/.test(ua)) return "tablet";
  return "desktop";
}

export async function track(eventName: AnalyticsEventName, properties?: TrackProps): Promise<void> {
  if (typeof window === "undefined") return;
  const userData = getUserData();
  const payload = {
    eventName,
    occurredAt: new Date().toISOString(),
    businessId: userData.businessId ?? null,
    userId: isAuthenticated() ? (userData as any).sub ?? null : null,
    sessionId: getSessionId(),
    source: "web_app",
    path: window.location.pathname,
    deviceType: inferDeviceType(),
    os: navigator.platform || null,
    browser: navigator.userAgent || null,
    properties: properties || {},
  };

  const gaId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
  if (gaId && typeof window.gtag === "function") {
    window.gtag("event", eventName, properties || {});
  }

  try {
    const token = getAccessToken();
    await fetch(`${API_URL}/analytics/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch {
    // Non-blocking analytics transport.
  }
}
