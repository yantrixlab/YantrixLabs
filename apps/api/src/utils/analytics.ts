import { ANALYTICS_EVENT_NAMES, type AnalyticsEventName } from "@yantrix/shared-types";
import type { AuthenticatedRequest } from "../middleware/auth";
import prisma from "./prisma";

const PII_KEY_PATTERN = /(email|phone|name|password|otp)/i;

type TrackArgs = {
  eventName: AnalyticsEventName;
  req?: AuthenticatedRequest;
  businessId?: string | null;
  userId?: string | null;
  source?: string | null;
  path?: string | null;
  sessionId?: string | null;
  deviceType?: string | null;
  os?: string | null;
  browser?: string | null;
  country?: string | null;
  city?: string | null;
  occurredAt?: Date;
  properties?: Record<string, unknown>;
};

export function sanitizeAnalyticsProperties(
  properties: Record<string, unknown> | undefined,
): Record<string, unknown> {
  if (!properties) return {};
  const sanitized: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(properties)) {
    if (PII_KEY_PATTERN.test(key)) continue;
    sanitized[key] = value;
  }
  return sanitized;
}

export function isValidAnalyticsEventName(name: string): name is AnalyticsEventName {
  return (ANALYTICS_EVENT_NAMES as readonly string[]).includes(name);
}

export async function trackAnalyticsEvent(args: TrackArgs): Promise<void> {
  if (!isValidAnalyticsEventName(args.eventName)) return;
  const req = args.req;
  const source =
    args.source ||
    (typeof req?.headers["x-utm-source"] === "string"
      ? req.headers["x-utm-source"]
      : "app");

  await (prisma as any).analyticsEvent.create({
    data: {
      eventName: args.eventName,
      occurredAt: args.occurredAt ?? new Date(),
      businessId: args.businessId ?? req?.user?.businessId ?? null,
      userId: args.userId ?? req?.user?.id ?? null,
      source: source ?? null,
      path: args.path ?? req?.path ?? null,
      sessionId: args.sessionId ?? null,
      deviceType: args.deviceType ?? null,
      os: args.os ?? null,
      browser: args.browser ?? null,
      country: args.country ?? null,
      city: args.city ?? null,
      properties: sanitizeAnalyticsProperties(args.properties),
    },
  });
}
