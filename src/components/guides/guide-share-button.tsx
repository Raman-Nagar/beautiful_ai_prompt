"use client";

import React, { useState } from "react";
import { Share2, Check } from "lucide-react";
import { useToast } from "@/components/ui/toast";

interface GuideShareButtonProps {
  title: string;
  className?: string;
}

export function GuideShareButton({ title, className }: GuideShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const { success } = useToast();

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
        return;
      } catch (err) {
        // Fallback to clipboard if share was aborted or failed
        if ((err as Error).name !== "AbortError") {
          // continue to clipboard
        } else {
          return;
        }
      }
    }

    navigator.clipboard.writeText(url);
    setCopied(true);
    success("Guide link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] text-xs font-medium text-[var(--subtle-foreground)] hover:text-[var(--foreground)] hover:border-[var(--border-strong)] transition-all ${className}`}
      aria-label="Share this guide"
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 text-[var(--status-success)]" />
          <span className="text-[var(--status-success)]">Link Copied</span>
        </>
      ) : (
        <>
          <Share2 className="h-3.5 w-3.5" />
          <span>Share</span>
        </>
      )}
    </button>
  );
}
