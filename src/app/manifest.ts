import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Beautiful AI Prompt",
    short_name: "Beautiful AI",
    description:
      "Curated, tested, and practical AI prompts engineered for engineering, career, business, and productivity workflows.",
    start_url: "/",
    display: "standalone",
    background_color: "#090d16",
    theme_color: "#090d16",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
