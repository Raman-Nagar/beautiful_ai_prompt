"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface AdSlotProps {
  /**
   * AdSense ad unit slot ID (e.g., "1234567890")
   */
  slotId?: string;
  /**
   * Layout format for the ad unit
   */
  format?: "horizontal" | "rectangle" | "in-feed";
  /**
   * Optional custom styling
   */
  className?: string;
  /**
   * Optional aria-label for accessibility compliance
   */
  ariaLabel?: string;
}

/**
 * AdSlot Component
 *
 * Clean architectural abstraction for future Google AdSense or sponsor placement.
 *
 * Monetization Readiness Rules:
 * 1. Strictly dormant when NEXT_PUBLIC_ADSENSE_CLIENT_ID is not configured.
 * 2. Never displays fake ads, deceptive publisher test IDs, or layout shifts.
 * 3. Designed for non-intrusive placement away from primary action buttons.
 */
export function AdSlot({
  slotId,
  format = "horizontal",
  className,
  ariaLabel = "Advertisement",
}: AdSlotProps) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const isDebug = process.env.NEXT_PUBLIC_ADSENSE_DEBUG === "true";

  // If AdSense is not configured, do not render anything in production
  if (!clientId) {
    if (isDebug) {
      return (
        <aside
          aria-label={ariaLabel}
          className={cn(
            "my-8 mx-auto w-full max-w-4xl p-4 text-center rounded-[var(--radius-md)] border border-dashed border-[var(--border)] bg-[var(--surface)] text-[11px] text-[var(--muted-foreground)] font-mono",
            className
          )}
        >
          [AdSlot: {format} — Dormant: NEXT_PUBLIC_ADSENSE_CLIENT_ID unconfigured]
        </aside>
      );
    }
    return null;
  }

  // Active AdSense configuration container (activated only when client ID is provided)
  return (
    <aside
      aria-label={ariaLabel}
      className={cn(
        "my-8 mx-auto w-full overflow-hidden text-center",
        format === "horizontal" && "max-w-4xl min-h-[90px]",
        format === "rectangle" && "max-w-[336px] min-h-[280px]",
        format === "in-feed" && "max-w-3xl min-h-[120px]",
        className
      )}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={clientId}
        data-ad-slot={slotId}
        data-ad-format={format === "in-feed" ? "fluid" : "auto"}
        data-full-width-responsive="true"
      />
    </aside>
  );
}
