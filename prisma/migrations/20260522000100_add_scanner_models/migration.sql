-- Scanner device/session/scan-log support

CREATE TABLE IF NOT EXISTS "scanner_devices" (
  "id" TEXT NOT NULL,
  "businessId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "deviceToken" TEXT NOT NULL,
  "deviceFingerprint" TEXT,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "lastSeenAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "scanner_devices_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "scanner_devices_deviceToken_key" ON "scanner_devices"("deviceToken");
CREATE UNIQUE INDEX IF NOT EXISTS "scanner_devices_businessId_deviceFingerprint_key" ON "scanner_devices"("businessId", "deviceFingerprint");

CREATE TABLE IF NOT EXISTS "scanner_sessions" (
  "id" TEXT NOT NULL,
  "businessId" TEXT NOT NULL,
  "invoiceSessionId" TEXT NOT NULL,
  "pairingToken" TEXT NOT NULL,
  "pairingExpiresAt" TIMESTAMP(3) NOT NULL,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'QR_READY',
  "connectedDeviceId" TEXT,
  "createdById" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "scanner_sessions_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "scanner_sessions_pairingToken_key" ON "scanner_sessions"("pairingToken");
CREATE UNIQUE INDEX IF NOT EXISTS "scanner_sessions_businessId_invoiceSessionId_key" ON "scanner_sessions"("businessId", "invoiceSessionId");

CREATE TABLE IF NOT EXISTS "scanner_scan_logs" (
  "id" TEXT NOT NULL,
  "businessId" TEXT NOT NULL,
  "deviceId" TEXT,
  "sessionId" TEXT NOT NULL,
  "rawCode" TEXT NOT NULL,
  "symbology" TEXT,
  "foundProductId" TEXT,
  "status" TEXT NOT NULL DEFAULT 'NOT_FOUND',
  "message" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "scanner_scan_logs_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "scanner_scan_logs_businessId_createdAt_idx" ON "scanner_scan_logs"("businessId", "createdAt");

ALTER TABLE "scanner_devices"
  ADD CONSTRAINT "scanner_devices_businessId_fkey"
  FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "scanner_sessions"
  ADD CONSTRAINT "scanner_sessions_businessId_fkey"
  FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "scanner_sessions"
  ADD CONSTRAINT "scanner_sessions_connectedDeviceId_fkey"
  FOREIGN KEY ("connectedDeviceId") REFERENCES "scanner_devices"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "scanner_scan_logs"
  ADD CONSTRAINT "scanner_scan_logs_businessId_fkey"
  FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "scanner_scan_logs"
  ADD CONSTRAINT "scanner_scan_logs_deviceId_fkey"
  FOREIGN KEY ("deviceId") REFERENCES "scanner_devices"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "scanner_scan_logs"
  ADD CONSTRAINT "scanner_scan_logs_sessionId_fkey"
  FOREIGN KEY ("sessionId") REFERENCES "scanner_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "scanner_scan_logs"
  ADD CONSTRAINT "scanner_scan_logs_foundProductId_fkey"
  FOREIGN KEY ("foundProductId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
