"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, RotateCcw, Home, Compass } from "lucide-react";

interface RootErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function RootError({ error, reset }: RootErrorProps) {
  useEffect(() => {
    // Log unexpected errors safely in development
    if (process.env.NODE_ENV === "development") {
      console.error("[Application Error Boundary caught error]:", error);
    }
  }, [error]);

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-16 bg-[var(--background)]">
      <Container size="narrow">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2">
            <Badge variant="warning" size="sm" className="font-mono">
              <AlertCircle className="h-3 w-3 mr-1 text-amber-500" />
              Runtime Error
            </Badge>
            {error.digest && (
              <span className="text-[11px] font-mono text-[var(--muted-foreground)]">
                Digest: {error.digest}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--foreground)]">
            Something unexpected occurred
          </h1>

          <p className="text-sm sm:text-base text-[var(--muted-foreground)] max-w-md mx-auto leading-relaxed">
            We encountered a temporary rendering issue. You can try refreshing the component state or return to the directory.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              variant="primary"
              onClick={() => reset()}
              leftIcon={<RotateCcw className="h-4 w-4" />}
            >
              Try Again
            </Button>

            <Link
              href="/"
              className="inline-flex items-center justify-center font-medium transition-all duration-150 rounded-[var(--radius-md)] text-sm h-9.5 px-4 bg-transparent text-[var(--foreground)] border border-[var(--border)] hover:border-[var(--border-strong)] hover:bg-[var(--card-hover)] active:scale-[0.98] gap-1.5"
            >
              <Home className="h-4 w-4" />
              <span>Return Home</span>
            </Link>

            <Link
              href="/prompts"
              className="inline-flex items-center justify-center font-medium transition-all duration-150 rounded-[var(--radius-md)] text-sm h-9.5 px-4 bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--secondary-hover)] active:scale-[0.98] gap-1.5"
            >
              <Compass className="h-4 w-4" />
              <span>Browse Prompts</span>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
