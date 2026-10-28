import type { MetadataRoute } from "next";
import { SITE_URL, CANONICAL_DOMAIN } from "@/lib/canonical";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/private/"],
      },
      {
        userAgent: [
          "Googlebot",
          "Bingbot",
          "Applebot",
          "GPTBot",
          "ChatGPT-User",
          "ClaudeBot",
          "PerplexityBot",
          "Google-Extended",
          "Applebot-Extended",
          "cohere-ai",
        ],
        allow: "/",
        disallow: ["/api/private/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: CANONICAL_DOMAIN,
  };
}
