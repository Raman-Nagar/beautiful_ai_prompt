"use client";

import React, { useState } from "react";
import { MatrixPromptExample } from "@/types/matrix";
import { Check, Copy, Sparkles, Terminal } from "lucide-react";

interface MatrixPromptCardProps {
  prompt: MatrixPromptExample;
  index: number;
}

export function MatrixPromptCard({ prompt, index }: MatrixPromptCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy prompt", err);
    }
  };

  const hasVariables = prompt.recommendedVariables && Object.keys(prompt.recommendedVariables).length > 0;

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm hover:shadow-md transition-shadow space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
              {index + 1}
            </span>
            <h3 className="text-lg font-bold text-[var(--foreground)]">{prompt.title}</h3>
          </div>
          <p className="text-sm text-[var(--muted-foreground)] pl-8">{prompt.description}</p>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-1.5 text-xs font-semibold text-[var(--foreground)] transition hover:bg-[var(--muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          title="Copy prompt text"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-green-500" />
              <span className="text-green-600 dark:text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy Prompt</span>
            </>
          )}
        </button>
      </div>

      {/* Prompt Box */}
      <div className="relative rounded-xl bg-slate-950 p-4 text-xs sm:text-sm text-slate-100 font-mono overflow-x-auto max-h-[380px]">
        <pre className="whitespace-pre-wrap break-words leading-relaxed">
          <code>{prompt.prompt}</code>
        </pre>
      </div>

      {/* Variables & Expected Output Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
        {hasVariables && (
          <div className="rounded-xl border border-[var(--border)] bg-[var(--muted)]/40 p-3 space-y-1">
            <div className="font-semibold text-[var(--foreground)] flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>Recommended Variable Values</span>
            </div>
            <ul className="space-y-1 text-[var(--muted-foreground)]">
              {Object.entries(prompt.recommendedVariables).map(([k, v]) => (
                <li key={k}>
                  <strong className="text-[var(--foreground)]">[{k}]:</strong> {v}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="rounded-xl border border-[var(--border)] bg-[var(--muted)]/40 p-3 space-y-1">
          <div className="font-semibold text-[var(--foreground)] flex items-center gap-1.5">
            <Terminal className="h-3.5 w-3.5 text-indigo-500" />
            <span>Expected Output Signature</span>
          </div>
          <p className="text-[var(--muted-foreground)] leading-relaxed">
            {prompt.expectedOutputPreview}
          </p>
        </div>
      </div>
    </div>
  );
}
