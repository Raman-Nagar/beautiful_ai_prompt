"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "info";

export interface ToastItem {
  id: string;
  message: string;
  type?: ToastType;
  duration?: number;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType, duration?: number) => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (message: string, type: ToastType = "success", duration: number = 2800) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, message, type, duration }]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  const success = useCallback(
    (message: string, duration?: number) => addToast(message, "success", duration),
    [addToast]
  );
  const error = useCallback(
    (message: string, duration?: number) => addToast(message, "error", duration),
    [addToast]
  );
  const info = useCallback(
    (message: string, duration?: number) => addToast(message, "info", duration),
    [addToast]
  );

  return (
    <ToastContext.Provider value={{ toast: addToast, success, error, info }}>
      {children}
      {/* Toast viewport */}
      <div
        aria-live="polite"
        role="status"
        className="pointer-events-none fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full px-4 sm:px-0"
      >
        {toasts.map((t) => {
          return (
            <div
              key={t.id}
              className={cn(
                "pointer-events-auto flex items-center justify-between gap-3 rounded-[var(--radius-md)] border p-3 shadow-xl backdrop-blur-md transition-all duration-200 animate-in slide-in-from-bottom-3",
                t.type === "success" &&
                  "border-[var(--status-success)]/30 bg-[var(--card)] text-[var(--foreground)]",
                t.type === "error" &&
                  "border-[var(--status-error)]/30 bg-[var(--card)] text-[var(--foreground)]",
                t.type === "info" &&
                  "border-[var(--border-strong)] bg-[var(--card)] text-[var(--foreground)]"
              )}
            >
              <div className="flex items-center gap-2.5">
                {t.type === "success" && (
                  <CheckCircle2 className="h-4 w-4 text-[var(--status-success)] shrink-0" />
                )}
                {t.type === "error" && (
                  <AlertCircle className="h-4 w-4 text-[var(--status-error)] shrink-0" />
                )}
                {t.type === "info" && (
                  <Info className="h-4 w-4 text-[var(--status-info)] shrink-0" />
                )}
                <span className="text-xs font-medium leading-snug">{t.message}</span>
              </div>
              <button
                type="button"
                onClick={() => removeToast(t.id)}
                className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] cursor-pointer transition-colors p-0.5 rounded-sm"
                aria-label="Dismiss toast"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
