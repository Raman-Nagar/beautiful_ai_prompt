"use client";

import React, { useState } from "react";
import { Copy, Check, Terminal } from "lucide-react";
import { cn, copyToClipboard } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  label?: string;
  className?: string;
}

export function CodeBlock({
  code,
  language = "text",
  label,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const ok = await copyToClipboard(code);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className={cn(
        "rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)]/90 overflow-hidden shadow-xs my-4",
        className
      )}
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[var(--secondary)]/60 border-b border-[var(--border)] text-xs text-[var(--muted-foreground)]">
        <div className="flex items-center gap-2 font-mono">
          <Terminal className="h-3.5 w-3.5 text-[var(--primary)]" />
          <span className="font-semibold text-[var(--foreground)]">
            {label || (language ? language.toUpperCase() : "CODE")}
          </span>
          {language && label && (
            <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-[var(--background)] border border-[var(--border)] text-[var(--muted-foreground)]">
              {language}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy code snippet to clipboard"
          className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-[11px] font-medium text-[var(--subtle-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--card)] transition-colors focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-[var(--status-success)]" />
              <span className="text-[var(--status-success)]">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area */}
      <div className="p-4 overflow-x-auto font-mono text-xs leading-relaxed bg-[var(--card)]">
        <pre className="text-[var(--foreground)] whitespace-pre">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
