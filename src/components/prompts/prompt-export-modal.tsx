"use client";

import React, { useState, useEffect } from "react";
import { Prompt } from "@/types/prompt";
import { useToast } from "@/components/ui/toast";
import { copyToClipboard } from "@/lib/utils";
import {
  exportToCursorRules,
  exportToClaudeProject,
  exportToOpenAiPayload,
  exportToAnthropicPayload,
  downloadExportFile,
} from "@/lib/prompt-exporters";
import {
  X,
  Copy,
  Check,
  Download,
  Terminal,
  Code2,
  FileCode,
  Sparkles,
} from "lucide-react";

export type ExportFormat = "cursor" | "claude" | "openai" | "anthropic";

interface PromptExportModalProps {
  prompt: Prompt;
  customValues?: Record<string, string>;
  isOpen: boolean;
  onClose: () => void;
}

export function PromptExportModal({
  prompt,
  customValues,
  isOpen,
  onClose,
}: PromptExportModalProps) {
  const { success } = useToast();
  const [activeTab, setActiveTab] = useState<ExportFormat>("cursor");
  const [isCopied, setIsCopied] = useState(false);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  let exportedContent = "";
  let defaultFilename = "";
  let mimeType = "text/plain";

  switch (activeTab) {
    case "cursor":
      exportedContent = exportToCursorRules(prompt, customValues);
      defaultFilename = ".cursorrules";
      mimeType = "text/plain";
      break;
    case "claude":
      exportedContent = exportToClaudeProject(prompt, customValues);
      defaultFilename = "CLAUDE.md";
      mimeType = "text/markdown";
      break;
    case "openai":
      exportedContent = exportToOpenAiPayload(prompt, customValues);
      defaultFilename = `${prompt.slug}-openai.json`;
      mimeType = "application/json";
      break;
    case "anthropic":
      exportedContent = exportToAnthropicPayload(prompt, customValues);
      defaultFilename = `${prompt.slug}-anthropic.json`;
      mimeType = "application/json";
      break;
  }

  const handleCopy = async () => {
    const ok = await copyToClipboard(exportedContent);
    if (ok) {
      setIsCopied(true);
      success(`Copied ${defaultFilename} to clipboard!`);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    downloadExportFile(exportedContent, defaultFilename, mimeType);
    success(`Downloaded ${defaultFilename}`);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="export-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)] bg-[var(--secondary)]/30">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20">
              <Terminal className="h-4 w-4" />
            </div>
            <div>
              <h2
                id="export-modal-title"
                className="text-sm sm:text-base font-bold text-[var(--foreground)]"
              >
                Developer &amp; Agent Exporter
              </h2>
              <p className="text-xs text-[var(--muted-foreground)]">
                Export &quot;{prompt.title}&quot; directly into modern AI workflows
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 rounded-lg text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Format Selector Tabs */}
        <div className="flex flex-wrap gap-1 p-3 border-b border-[var(--border)] bg-[var(--background)]">
          {(
            [
              {
                id: "cursor",
                label: "Cursor IDE",
                file: ".cursorrules",
                icon: <Code2 className="h-3.5 w-3.5 text-blue-400" />,
              },
              {
                id: "claude",
                label: "Claude Code",
                file: "CLAUDE.md",
                icon: <FileCode className="h-3.5 w-3.5 text-amber-400" />,
              },
              {
                id: "openai",
                label: "OpenAI API",
                file: "JSON Payload",
                icon: <Sparkles className="h-3.5 w-3.5 text-emerald-400" />,
              },
              {
                id: "anthropic",
                label: "Anthropic API",
                file: "Messages JSON",
                icon: <Terminal className="h-3.5 w-3.5 text-purple-400" />,
              },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[130px] px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                activeTab === tab.id
                  ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)]"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  activeTab === tab.id
                    ? "bg-black/25 text-white"
                    : "bg-[var(--secondary)] text-[var(--muted-foreground)]"
                }`}
              >
                {tab.file}
              </span>
            </button>
          ))}
        </div>

        {/* Code Content Preview */}
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)]">
            <span className="font-mono text-[11px] text-[var(--foreground)]">
              Target File: <strong className="text-[var(--primary)]">{defaultFilename}</strong>
            </span>
            <span>{exportedContent.length} characters</span>
          </div>

          <div className="relative rounded-xl bg-black/90 p-4 font-mono text-xs text-zinc-200 border border-white/10 max-h-[320px] overflow-y-auto whitespace-pre-wrap select-all leading-relaxed">
            {exportedContent}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[var(--border)] bg-[var(--secondary)]/30">
          <span className="text-xs text-[var(--muted-foreground)] hidden sm:inline">
            Zero telemetry. Runs 100% locally in your browser.
          </span>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={handleCopy}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] font-bold text-xs hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              {isCopied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-300" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy Content</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)] text-[var(--foreground)] font-semibold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <Download className="h-4 w-4 text-[var(--primary)]" />
              <span>Download {defaultFilename}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
