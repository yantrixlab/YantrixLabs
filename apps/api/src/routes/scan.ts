import { Router, Request, Response, NextFunction } from "express";
import crypto from "crypto";
import { authenticate, AuthenticatedRequest } from "../middleware/auth";
import prisma from "../utils/prisma";
import { verifyAccessToken } from "@yantrix/auth";

type SseClient = {
  id: string;
  sessionId: string;
  res: Response;
};

const sseClients = new Map<string, SseClient>();

function sseWrite(res: Response, event: string, data: unknown) {
  res.write(`event: ${event}\n`);
  res.write(`data: ${JSON.stringify(data)}\n\n`);
}

function broadcast(sessionId: string, event: string, data: unknown) {
  for (const client of sseClients.values()) {
    if (client.sessionId === sessionId) sseWrite(client.res, event, data);
  }
}

function randomToken(bytes = 24) {
  return crypto.randomBytes(bytes).toString("hex");
}

function getApiBase(req: Request) {
  const proto = req.headers["x-forwarded-proto"] || req.protocol;
  const host = req.headers["x-forwarded-host"] || req.get("host");
  return `${proto}://${host}/api/v1`;
}

function getQueryToken(req: Request): string | null {
  const v = req.query.accessToken;
  return typeof v === "string" && v ? v : null;
}

async function authenticateFromQuery(
  req: Request,
): Promise<{ userId: string; businessId: string | null } | null> {
  const token = getQueryToken(req);
  if (!token) return null;
  try {
    const payload = verifyAccessToken(token);
    return { userId: payload.sub, businessId: payload.businessId };
  } catch {
    return null;
  }
}

const router = Router();

async function handleScanSubmission(
  req: Request,
  res: Response,
  next: NextFunction,
  eventName: "scan.item" | "scan.catalog",
) {
  try {
    const sessionId = String(req.body?.sessionId || "").trim();
    const deviceToken = String(req.body?.deviceToken || "").trim();
    const rawCode = String(req.body?.rawCode || "").trim();
    const symbology =
      typeof req.body?.symbology === "string" ? req.body.symbology : null;

    if (!sessionId || !deviceToken || !rawCode) {
      res.status(400).json({
        success: false,
        error: "sessionId, deviceToken, and rawCode are required",
      });
      return;
    }

    const session = await prisma.scannerSession.findUnique({
      where: { id: sessionId },
    });
    if (!session) {
      res.status(404).json({ success: false, error: "Invalid session" });
      return;
    }
    if (session.expiresAt < new Date()) {
      res.status(410).json({ success: false, error: "Session expired" });
      return;
    }

    const device = await prisma.scannerDevice.findUnique({
      where: { deviceToken },
    });
    if (!device || !device.isActive || device.businessId !== session.businessId) {
      res.status(403).json({ success: false, error: "Device not allowed" });
      return;
    }

    const exactCode = rawCode.toLowerCase();
    const product =
      (await prisma.product.findFirst({
        where: {
          businessId: session.businessId,
          isActive: true,
          barcode: { equals: rawCode },
        },
      })) ||
      (await prisma.product.findFirst({
        where: {
          businessId: session.businessId,
          isActive: true,
          sku: { equals: rawCode },
        },
      })) ||
      (await prisma.product.findFirst({
        where: {
          businessId: session.businessId,
          isActive: true,
          name: { equals: rawCode, mode: "insensitive" as const },
        },
      })) ||
      (await prisma.product.findFirst({
        where: {
          businessId: session.businessId,
          isActive: true,
          OR: [
            { barcode: { contains: exactCode, mode: "insensitive" as const } },
            { sku: { contains: exactCode, mode: "insensitive" as const } },
          ],
        },
      }));

    await prisma.scannerDevice.update({
      where: { id: device.id },
      data: { lastSeenAt: new Date() },
    });

    await prisma.scannerScanLog.create({
      data: {
        businessId: session.businessId,
        deviceId: device.id,
        sessionId: session.id,
        rawCode,
        symbology,
        foundProductId: product?.id ?? null,
        status: product ? "FOUND" : "NOT_FOUND",
        message: product ? "Matched product" : "No matching product",
      },
    });

    const payload = {
      found: !!product,
      rawCode,
      product: product
        ? {
            id: product.id,
            name: product.name,
            hsnSac: product.hsnSac,
            price: product.price,
            gstRate: product.gstRate,
            unit: product.unit,
            barcode: product.barcode,
            sku: product.sku,
            stockCount: product.stockCount,
            lowStockAlert: product.lowStockAlert,
            type: product.type,
            category: product.category,
            mrp: product.mrp,
          }
        : null,
      message: product ? "Matched product" : "No matching product found",
      scannedAt: new Date().toISOString(),
    };

    broadcast(session.id, eventName, payload);
    res.json({ success: true, data: payload });
  } catch (error) {
    next(error);
  }
}

// Web: create scan pairing session (authenticated user)
router.post(
  "/sessions",
  authenticate,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const businessId = req.user?.businessId;
      if (!businessId) {
        res
          .status(400)
          .json({ success: false, error: "Business context required" });
        return;
      }

      const invoiceSessionId =
        (req.body?.invoiceSessionId as string | undefined)?.trim() ||
        randomToken(8);
      const now = new Date();
      const pairingExpiresAt = new Date(now.getTime() + 10 * 60 * 1000);
      const expiresAt = new Date(now.getTime() + 8 * 60 * 60 * 1000);
      const pairingToken = randomToken(16);

      const session = await prisma.scannerSession.upsert({
        where: { businessId_invoiceSessionId: { businessId, invoiceSessionId } },
        update: {
          pairingToken,
          pairingExpiresAt,
          expiresAt,
          status: "QR_READY",
        },
        create: {
          businessId,
          invoiceSessionId,
          pairingToken,
          pairingExpiresAt,
          expiresAt,
          status: "QR_READY",
          createdById: req.user?.id || null,
        },
      });

      const apiBase = getApiBase(req);
      const pairingPayload = {
        sessionId: session.id,
        pairingToken,
        apiBase,
        version: 1,
      };

      res.json({
        success: true,
        data: {
          sessionId: session.id,
          invoiceSessionId,
          status: session.status,
          pairingExpiresAt: session.pairingExpiresAt,
          pairingPayload,
          pairingPayloadText: JSON.stringify(pairingPayload),
        },
      });
    } catch (error) {
      next(error);
    }
  },
);

// Web: realtime event stream for current invoice session
router.get(
  "/sessions/:id/events",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      const bearer =
        authHeader && authHeader.startsWith("Bearer ")
          ? authHeader.slice(7)
          : null;
      const authFromQuery = await authenticateFromQuery(req);
      const auth = bearer
        ? (() => {
            try {
              const payload = verifyAccessToken(bearer);
              return { userId: payload.sub, businessId: payload.businessId };
            } catch {
              return null;
            }
          })()
        : authFromQuery;

      if (!auth || !auth.businessId) {
        res.status(401).json({ success: false, error: "Authentication required" });
        return;
      }

      const session = await prisma.scannerSession.findFirst({
        where: { id: req.params.id, businessId: auth.businessId },
      });
      if (!session) {
        res.status(404).json({ success: false, error: "Session not found" });
        return;
      }

      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");
      res.flushHeaders?.();

      const clientId = randomToken(8);
      const client: SseClient = { id: clientId, sessionId: session.id, res };
      sseClients.set(clientId, client);
      sseWrite(res, "scan.status", {
        state: "connected",
        sessionId: session.id,
      });

      const heartbeat = setInterval(() => {
        sseWrite(res, "scan.ping", { ts: Date.now() });
      }, 20000);

      req.on("close", () => {
        clearInterval(heartbeat);
        sseClients.delete(clientId);
      });
    } catch (error) {
      next(error);
    }
  },
);

// Web: fetch session state (polling fallback)
router.get(
  "/sessions/:id",
  authenticate,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const businessId = req.user?.businessId;
      if (!businessId) {
        res.status(400).json({ success: false, error: "Business context required" });
        return;
      }
      const session = await prisma.scannerSession.findFirst({
        where: { id: req.params.id, businessId },
        include: {
          connectedDevice: {
            select: { id: true, name: true, isActive: true, lastSeenAt: true },
          },
        },
      });
      if (!session) {
        res.status(404).json({ success: false, error: "Session not found" });
        return;
      }
      res.json({ success: true, data: session });
    } catch (error) {
      next(error);
    }
  },
);

// Web: fetch latest scan logs for session (polling fallback)
router.get(
  "/sessions/:id/logs",
  authenticate,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const businessId = req.user?.businessId;
      if (!businessId) {
        res.status(400).json({ success: false, error: "Business context required" });
        return;
      }
      const since = String(req.query.since || "").trim();
      const sinceDate = since ? new Date(since) : null;
      const logs = await prisma.scannerScanLog.findMany({
        where: {
          businessId,
          sessionId: req.params.id,
          ...(sinceDate && !Number.isNaN(sinceDate.getTime())
            ? { createdAt: { gt: sinceDate } }
            : {}),
        },
        include: {
          product: {
            select: {
              id: true,
              name: true,
              hsnSac: true,
              price: true,
              gstRate: true,
              unit: true,
              barcode: true,
              sku: true,
              stockCount: true,
              lowStockAlert: true,
              type: true,
              category: true,
              mrp: true,
            },
          },
        },
        orderBy: { createdAt: "asc" },
        take: 50,
      });
      res.json({ success: true, data: logs });
    } catch (error) {
      next(error);
    }
  },
);

// App: pair without login
router.post("/pair", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sessionId = String(req.body?.sessionId || "").trim();
    const pairingToken = String(req.body?.pairingToken || "").trim();
    const deviceName = String(req.body?.deviceName || "Android Scanner").trim();
    const deviceFingerprint = String(req.body?.deviceFingerprint || "").trim();

    if (!sessionId || !pairingToken) {
      res.status(400).json({
        success: false,
        error: "sessionId and pairingToken are required",
      });
      return;
    }

    const session = await prisma.scannerSession.findUnique({
      where: { id: sessionId },
    });
    if (!session) {
      res.status(404).json({ success: false, error: "Invalid session" });
      return;
    }
    if (session.pairingToken !== pairingToken) {
      res.status(401).json({ success: false, error: "Invalid pairing token" });
      return;
    }
    if (session.pairingExpiresAt < new Date()) {
      res.status(410).json({ success: false, error: "Pairing token expired" });
      return;
    }

    let device = deviceFingerprint
      ? await prisma.scannerDevice.findFirst({
          where: {
            businessId: session.businessId,
            deviceFingerprint,
          },
        })
      : null;

    if (!device) {
      device = await prisma.scannerDevice.create({
        data: {
          businessId: session.businessId,
          name: deviceName || "Android Scanner",
          deviceFingerprint: deviceFingerprint || null,
          deviceToken: randomToken(24),
          isActive: true,
          lastSeenAt: new Date(),
        },
      });
    } else if (!device.isActive) {
      res.status(403).json({ success: false, error: "Device is disabled" });
      return;
    } else {
      device = await prisma.scannerDevice.update({
        where: { id: device.id },
        data: { lastSeenAt: new Date(), name: deviceName || device.name },
      });
    }

    await prisma.scannerSession.update({
      where: { id: session.id },
      data: { connectedDeviceId: device.id, status: "PAIRED" },
    });

    broadcast(session.id, "scan.status", {
      state: "paired",
      sessionId: session.id,
      deviceId: device.id,
      deviceName: device.name,
    });

    res.json({
      success: true,
      data: {
        sessionId: session.id,
        businessId: session.businessId,
        deviceId: device.id,
        deviceToken: device.deviceToken,
      },
    });
  } catch (error) {
    next(error);
  }
});

// App: submit a scanned code
router.post("/items", async (req: Request, res: Response, next: NextFunction) => {
  await handleScanSubmission(req, res, next, "scan.item");
});

router.post(
  "/catalog-items",
  async (req: Request, res: Response, next: NextFunction) => {
    await handleScanSubmission(req, res, next, "scan.catalog");
  },
);

router.get(
  "/device-context",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deviceToken = String(req.header("x-device-token") || "").trim();
      if (!deviceToken) {
        res.status(400).json({
          success: false,
          error: "x-device-token header is required",
        });
        return;
      }

      const device = await prisma.scannerDevice.findUnique({
        where: { deviceToken },
      });
      if (!device) {
        res.status(401).json({ success: false, error: "Invalid device token" });
        return;
      }
      if (!device.isActive) {
        res.status(403).json({ success: false, error: "Device is disabled" });
        return;
      }

      const [business, totalProducts, inStockCount, stockProducts] =
        await Promise.all([
          prisma.business.findUnique({
            where: { id: device.businessId },
            select: {
              id: true,
              name: true,
              logo: true,
              email: true,
              phone: true,
            },
          }),
          prisma.product.count({
            where: { businessId: device.businessId, isActive: true },
          }),
          prisma.product.count({
            where: {
              businessId: device.businessId,
              isActive: true,
              type: "product",
              stockCount: { gt: 0 },
            },
          }),
          prisma.product.findMany({
            where: {
              businessId: device.businessId,
              isActive: true,
              type: "product",
            },
            select: {
              stockCount: true,
              lowStockAlert: true,
            },
          }),
        ]);
      const lowStockCount = stockProducts.filter((item) => {
        const stock = item.stockCount;
        const alert = item.lowStockAlert;
        return stock !== null && alert !== null && stock > 0 && stock <= alert;
      }).length;

      await prisma.scannerDevice.update({
        where: { id: device.id },
        data: { lastSeenAt: new Date() },
      });

      res.json({
        success: true,
        data: {
          business: business || {
            id: device.businessId,
            name: "Business",
            logo: null,
            email: null,
            phone: null,
          },
          stats: {
            totalProducts,
            inStockCount,
            lowStockCount,
          },
          device: {
            name: device.name,
            lastSeenAt: device.lastSeenAt,
            isActive: device.isActive,
          },
          serverTime: new Date().toISOString(),
        },
      });
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  "/devices",
  authenticate,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const businessId = req.user?.businessId;
      if (!businessId) {
        res
          .status(400)
          .json({ success: false, error: "Business context required" });
        return;
      }
      const devices = await prisma.scannerDevice.findMany({
        where: { businessId },
        orderBy: { createdAt: "desc" },
      });
      res.json({ success: true, data: devices });
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  "/devices/:id",
  authenticate,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const businessId = req.user?.businessId;
      if (!businessId) {
        res
          .status(400)
          .json({ success: false, error: "Business context required" });
        return;
      }
      const isActive = req.body?.isActive !== false;
      const updated = await prisma.scannerDevice.updateMany({
        where: { id: req.params.id, businessId },
        data: { isActive },
      });
      if (!updated.count) {
        res.status(404).json({ success: false, error: "Device not found" });
        return;
      }
      const device = await prisma.scannerDevice.findUnique({
        where: { id: req.params.id },
      });
      res.json({ success: true, data: device });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
