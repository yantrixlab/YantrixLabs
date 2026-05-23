import { Router, Response, NextFunction } from "express";
import { authenticate, requireSuperAdmin, AuthenticatedRequest } from "../middleware/auth";
import prisma from "../utils/prisma";

const router = Router();
router.use(authenticate);
router.use(requireSuperAdmin);

function getDateRange(req: AuthenticatedRequest): { from: Date; to: Date } {
  const days = Number.parseInt((req.query.days as string) || "30", 10);
  const safeDays = Number.isFinite(days) && days > 0 ? Math.min(days, 365) : 30;
  const to = new Date();
  const from = new Date();
  from.setDate(to.getDate() - safeDays);
  return { from, to };
}

router.get(
  "/overview",
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const { from, to } = getDateRange(req);
      const where = { occurredAt: { gte: from, lte: to } };
      const [
        totalEvents,
        signups,
        logins,
        invoicesCreated,
        exportsDone,
        scannerConnections,
        activeUsersDistinct,
      ] = await Promise.all([
        (prisma as any).analyticsEvent.count({ where }),
        (prisma as any).analyticsEvent.count({ where: { ...where, eventName: "auth_signup_completed" } }),
        (prisma as any).analyticsEvent.count({ where: { ...where, eventName: "auth_login" } }),
        (prisma as any).analyticsEvent.count({ where: { ...where, eventName: "invoice_created" } }),
        (prisma as any).analyticsEvent.count({
          where: {
            ...where,
            eventName: { in: ["report_pdf_exported", "report_excel_exported", "invoice_pdf_downloaded"] },
          },
        }),
        (prisma as any).analyticsEvent.count({ where: { ...where, eventName: "scanner_connected" } }),
        (prisma as any).analyticsEvent.groupBy({
          by: ["userId"],
          where: { ...where, userId: { not: null } },
        }),
      ]);

      res.json({
        success: true,
        data: {
          totalEvents,
          signups,
          logins,
          invoicesCreated,
          exportsDone,
          scannerConnections,
          activeUsers: activeUsersDistinct.length,
          conversionRate: signups > 0 ? Number(((invoicesCreated / signups) * 100).toFixed(2)) : 0,
          range: { from, to },
        },
      });
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  "/funnels",
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const { from, to } = getDateRange(req);
      const baseWhere = { occurredAt: { gte: from, lte: to } };
      const funnelOneSteps = [
        "auth_signup_completed",
        "invoice_created",
        "invoice_pdf_downloaded",
      ] as const;
      const funnelTwoSteps = [
        "scanner_apk_downloaded",
        "scanner_qr_paired",
        "scanner_barcode_scanned",
      ] as const;

      const countsOne = await Promise.all(
        funnelOneSteps.map((eventName) =>
          (prisma as any).analyticsEvent.count({ where: { ...baseWhere, eventName } }),
        ),
      );
      const countsTwo = await Promise.all(
        funnelTwoSteps.map((eventName) =>
          (prisma as any).analyticsEvent.count({ where: { ...baseWhere, eventName } }),
        ),
      );

      res.json({
        success: true,
        data: {
          activationFunnel: funnelOneSteps.map((step, idx) => ({
            step,
            count: countsOne[idx],
          })),
          scannerFunnel: funnelTwoSteps.map((step, idx) => ({
            step,
            count: countsTwo[idx],
          })),
          range: { from, to },
        },
      });
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  "/retention",
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const { from, to } = getDateRange(req);
      const signupEvents = await (prisma as any).analyticsEvent.findMany({
        where: {
          eventName: "auth_signup_completed",
          occurredAt: { gte: from, lte: to },
          userId: { not: null },
        },
        select: { userId: true, occurredAt: true },
      });

      const uniqueUsers = Array.from(new Set(signupEvents.map((e) => e.userId).filter(Boolean))) as string[];
      if (uniqueUsers.length === 0) {
        res.json({ success: true, data: { cohortSize: 0, day1: 0, day7: 0, day30: 0 } });
        return;
      }

      const activity = await (prisma as any).analyticsEvent.findMany({
        where: {
          userId: { in: uniqueUsers },
          occurredAt: { gte: from, lte: new Date(to.getTime() + 31 * 24 * 3600 * 1000) },
        },
        select: { userId: true, occurredAt: true },
      });

      const firstByUser = new Map<string, Date>();
      for (const event of signupEvents) {
        if (!event.userId) continue;
        const prev = firstByUser.get(event.userId);
        if (!prev || event.occurredAt < prev) firstByUser.set(event.userId, event.occurredAt);
      }

      const seen = { day1: new Set<string>(), day7: new Set<string>(), day30: new Set<string>() };
      for (const event of activity) {
        if (!event.userId) continue;
        const start = firstByUser.get(event.userId);
        if (!start) continue;
        const deltaDays = Math.floor((event.occurredAt.getTime() - start.getTime()) / (24 * 3600 * 1000));
        if (deltaDays >= 1) seen.day1.add(event.userId);
        if (deltaDays >= 7) seen.day7.add(event.userId);
        if (deltaDays >= 30) seen.day30.add(event.userId);
      }

      res.json({
        success: true,
        data: {
          cohortSize: uniqueUsers.length,
          day1: seen.day1.size,
          day7: seen.day7.size,
          day30: seen.day30.size,
        },
      });
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  "/feature-adoption",
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const { from, to } = getDateRange(req);
      const where = { occurredAt: { gte: from, lte: to }, businessId: { not: null } };
      const byEvent = await (prisma as any).analyticsEvent.groupBy({
        by: ["eventName"],
        where,
        _count: { _all: true },
      });
      res.json({ success: true, data: byEvent });
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  "/scanner-quality",
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const { from, to } = getDateRange(req);
      const [totalScans, failedScans] = await Promise.all([
        (prisma as any).analyticsEvent.count({
          where: {
            occurredAt: { gte: from, lte: to },
            eventName: "scanner_barcode_scanned",
          },
        }),
        (prisma as any).analyticsEvent.count({
          where: {
            occurredAt: { gte: from, lte: to },
            eventName: "scanner_scan_failed",
          },
        }),
      ]);
      const successRate = totalScans > 0 ? Number((((totalScans - failedScans) / totalScans) * 100).toFixed(2)) : 0;
      res.json({
        success: true,
        data: { totalScans, failedScans, successRate, range: { from, to } },
      });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
