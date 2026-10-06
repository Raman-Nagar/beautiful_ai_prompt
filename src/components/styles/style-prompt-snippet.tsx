"use client";

import React, { useState } from "react";
import { copyToClipboard } from "@/lib/utils";
import { useToast } from "@/components/ui/toast";
import { Copy, Check, Terminal, Sparkles } from "lucide-react";

interface StylePromptSnippetProps {
  title: string;
  prompt: string;
  breakdown: string;
}

export function StylePromptSnippet({
  title,
  prompt,
  breakdown,
}: StylePromptSnippetProps) {
  const [copied, setCopied] = useState(false);
  const { success } = useToast();

  const handleCopy = async () => {
    const ok = await copyToClipboard(prompt);
    if (ok) {
      setCopied(true);
      success("Copied master prompt to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden shadow-xs">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--border)] bg-[var(--muted)]/40">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[var(--primary)]" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground)]">
            {title}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium bg-[var(--background)] hover:bg-[var(--muted)] text-[var(--foreground)] border border-[var(--border)] transition-colors shadow-xs"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-[var(--muted-foreground)]" />
              <span>Copy Prompt</span>
            </>
          )}
        </button>
      </div>

      <div className="p-5 space-y-4">
        <div className="p-4 rounded-xl bg-black/80 text-white font-mono text-xs leading-relaxed border border-white/10 select-all overflow-x-auto">
          {prompt}
        </div>

        <div className="flex items-start gap-2.5 text-xs text-[var(--muted-foreground)] bg-[var(--muted)]/30 p-3.5 rounded-xl border border-[var(--border)]/60">
          <Sparkles className="w-4 h-4 text-[var(--primary)] shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-semibold text-[var(--foreground)]">Prompt Architecture Breakdown: </span>
            <span className="leading-relaxed">{breakdown}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
