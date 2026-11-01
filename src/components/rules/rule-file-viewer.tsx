"use client";

import React, { useState } from "react";
import { RuleFormatFile } from "@/types/rule";
import { Check, Copy, Download, FileCode, Terminal } from "lucide-react";

interface RuleFileViewerProps {
  files: RuleFormatFile[];
  technologyName: string;
}

export function RuleFileViewer({ files, technologyName }: RuleFileViewerProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!files || files.length === 0) {
    return null;
  }

  const currentFile = files[activeTab] || files[0];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentFile.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code to clipboard", err);
    }
  };

  const handleDownload = () => {
    try {
      const blob = new Blob([currentFile.content], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = currentFile.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to trigger file download", err);
    }
  };

  const lineCount = currentFile.content.split("\n").length;
  const byteCount = new TextEncoder().encode(currentFile.content).length;

  return (
    <div className="rounded-2xl border border-border bg-card shadow-lg overflow-hidden">
      {/* File Format Tabs */}
      <div className="flex flex-wrap items-center justify-between border-b border-border bg-muted/40 px-4 py-3 gap-2">
        <div className="flex flex-wrap gap-2">
          {files.map((file, idx) => {
            const isActive = idx === activeTab;
            return (
              <button
                key={file.fileName}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <FileCode className="h-3.5 w-3.5" />
                <span>{file.fileName}</span>
              </button>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs sm:text-sm font-medium text-foreground transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            title="Copy configuration to clipboard"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-green-500" />
                <span className="text-green-600 dark:text-green-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs sm:text-sm font-medium text-primary-foreground shadow transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            title={`Download ${currentFile.fileName}`}
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Meta Bar: Target File Description & Stats */}
      <div className="flex flex-wrap items-center justify-between border-b border-border/60 bg-muted/20 px-4 py-2.5 text-xs text-muted-foreground gap-2">
        <div className="flex items-center gap-2">
          <Terminal className="h-3.5 w-3.5 text-primary" />
          <span>{currentFile.description}</span>
        </div>
        <div className="flex items-center gap-3">
          <span>{lineCount} lines</span>
          <span>•</span>
          <span>{(byteCount / 1024).toFixed(1)} KB</span>
        </div>
      </div>

      {/* Code Container */}
      <div className="relative max-h-[520px] overflow-auto bg-slate-950 p-4 text-xs sm:text-sm text-slate-100 font-mono">
        <pre className="whitespace-pre-wrap break-words leading-relaxed">
          <code>{currentFile.content}</code>
        </pre>
      </div>

      {/* Bottom helper tip */}
      <div className="border-t border-border bg-card/60 px-4 py-2.5 text-xs text-muted-foreground">
        <p>
          <strong className="text-foreground">Pro-tip:</strong> Place this file directly in the root directory of your {technologyName} project. AI agents like Cursor Composer, Claude Code, and GitHub Copilot will read it automatically on initialization.
        </p>
      </div>
    </div>
  );
}
