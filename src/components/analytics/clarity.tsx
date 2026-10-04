"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

interface MicrosoftClarityProps {
  projectId?: string;
}

export function MicrosoftClarity({ projectId }: MicrosoftClarityProps) {
  useEffect(() => {
    const id = projectId || process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || "ysfugsl0r6";
    if (id && typeof window !== "undefined") {
      Clarity.init(id);
    }
  }, [projectId]);

  return null;
}

export { Clarity };
