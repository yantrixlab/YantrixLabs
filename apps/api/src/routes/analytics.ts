import { Router, Response, NextFunction, Request } from "express";
import { z } from "zod";
import prisma from "../utils/prisma";
import {
  isValidAnalyticsEventName,
  sanitizeAnalyticsProperties,
  trackAnalyticsEvent,
} from "../utils/analytics";

const router = Router();

const eventSchema = z.object({
  eventName: z.string(),
  occurredAt: z.string().datetime().optional(),
  businessId: z.string().optional().nullable(),
  userId: z.string().optional().nullable(),
  sessionId: z.string().optional().nullable(),
  source: z.string().optional().nullable(),
  path: z.string().optional().nullable(),
  deviceType: z.string().optional().nullable(),
  os: z.string().optional().nullable(),
  browser: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  properties: z.record(z.any()).optional(),
});

router.post(
  "/events",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = Array.isArray(req.body?.events) ? req.body.events : [req.body];
      const parsed = payload.map((event: unknown) => eventSchema.parse(event));
      const validEvents = parsed.filter((e) => isValidAnalyticsEventName(e.eventName));

      if (validEvents.length === 0) {
        res.status(400).json({ success: false, error: "No valid analytics events" });
        return;
      }

      await (prisma as any).analyticsEvent.createMany({
        data: validEvents.map((event) => ({
          eventName: event.eventName,
          occurredAt: event.occurredAt ? new Date(event.occurredAt) : new Date(),
          businessId: event.businessId ?? null,
          userId: event.userId ?? null,
          sessionId: event.sessionId ?? null,
          source: event.source ?? "app",
          path: event.path ?? req.path,
          deviceType: event.deviceType ?? null,
          os: event.os ?? null,
          browser: event.browser ?? null,
          country: event.country ?? null,
          city: event.city ?? null,
          properties: sanitizeAnalyticsProperties(event.properties),
        })),
      });

      // Server-side milestone events.
      for (const event of validEvents) {
        if (event.eventName === "invoice_created" && event.businessId) {
          const invoiceCount = await prisma.invoice.count({
            where: { businessId: event.businessId },
          });
          if (invoiceCount === 1) {
            await trackAnalyticsEvent({
              eventName: "first_invoice_created",
              businessId: event.businessId,
              userId: event.userId ?? null,
              properties: { invoiceCount },
            });
          }
          if (invoiceCount === 5) {
            await trackAnalyticsEvent({
              eventName: "invoice_count_5_reached",
              businessId: event.businessId,
              userId: event.userId ?? null,
              properties: { invoiceCount },
            });
          }
        }
        if (event.eventName === "product_created" && event.businessId) {
          const productCount = await prisma.product.count({
            where: { businessId: event.businessId },
          });
          if (productCount === 50) {
            await trackAnalyticsEvent({
              eventName: "product_count_50_reached",
              businessId: event.businessId,
              userId: event.userId ?? null,
              properties: { productCount },
            });
          }
        }
      }

      res.status(201).json({ success: true, ingested: validEvents.length });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
