import { NextRequest, NextResponse } from "next/server";
import sitemap from "@/app/sitemap";
import {
  INDEXNOW_KEY,
  INDEXNOW_KEY_LOCATION,
  INDEXNOW_ENDPOINTS,
  submitUrlsToIndexNow,
} from "@/lib/indexnow";
import { CANONICAL_DOMAIN } from "@/lib/canonical";

export const dynamic = "force-dynamic";

/**
 * GET /api/indexnow
 * Status and diagnostics check for IndexNow protocol setup
 */
export async function GET() {
  return NextResponse.json({
    status: "active",
    protocol: "IndexNow",
    host: CANONICAL_DOMAIN,
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_LOCATION,
    endpoints: INDEXNOW_ENDPOINTS,
    supportedEngines: ["Bing", "Yandex", "IndexNow Hub (Naver, Seznam)"],
    usage: {
      method: "POST",
      description: "Submit URLs to instantly ping Bing & IndexNow search engines",
      payload: {
        urls: ["https://www.beautifulaiprompt.com/prompts/example-slug"],
      },
      note: "Omit urls to automatically submit all current sitemap URLs.",
    },
  });
}

/**
 * POST /api/indexnow
 * Submit specific URLs or all catalog URLs to IndexNow
 */
export async function POST(request: NextRequest) {
  try {
    let targetUrls: string[] = [];

    try {
      const body = await request.json();
      if (Array.isArray(body?.urls) && body.urls.length > 0) {
        targetUrls = body.urls;
      }
    } catch {
      // Empty or non-JSON body: fall back to all sitemap URLs
    }

    if (targetUrls.length === 0) {
      const sitemapEntries = sitemap();
      targetUrls = sitemapEntries.map((e) => e.url);
    }

    const results = await submitUrlsToIndexNow(targetUrls);

    const allSuccessful = results.every((r) => r.success);

    return NextResponse.json(
      {
        success: allSuccessful,
        submittedCount: targetUrls.length,
        results,
        timestamp: new Date().toISOString(),
      },
      { status: allSuccessful ? 200 : 207 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
