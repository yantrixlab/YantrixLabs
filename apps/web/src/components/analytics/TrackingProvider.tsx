"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics/client";

export function TrackingProvider() {
  const pathname = usePathname();

  useEffect(() => {
    track("report_generated", { pageView: true, pathname });
  }, [pathname]);

  return null;
}
