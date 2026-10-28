import { CANONICAL_DOMAIN } from "@/lib/canonical";

export const INDEXNOW_KEY = "d23238ffcd6def7721819640b0aab753";
export const INDEXNOW_KEY_LOCATION = `https://${CANONICAL_DOMAIN}/${INDEXNOW_KEY}.txt`;

export const INDEXNOW_ENDPOINTS = [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow",
];

export interface IndexNowSubmissionResult {
  endpoint: string;
  status: number;
  statusText: string;
  success: boolean;
  error?: string;
}

/**
 * Submits a list of absolute canonical URLs to IndexNow search engine endpoints (Bing, Yandex, etc.)
 */
export async function submitUrlsToIndexNow(
  urls: string[]
): Promise<IndexNowSubmissionResult[]> {
  if (!urls || urls.length === 0) {
    return [];
  }

  // Deduplicate and cap at 10,000 per IndexNow API specification
  const uniqueUrls = Array.from(new Set(urls)).slice(0, 10000);

  const payload = {
    host: CANONICAL_DOMAIN,
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_LOCATION,
    urlList: uniqueUrls,
  };

  const results: IndexNowSubmissionResult[] = [];

  for (const endpoint of INDEXNOW_ENDPOINTS) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      results.push({
        endpoint,
        status: response.status,
        statusText: response.statusText,
        success: response.status === 200 || response.status === 202,
      });
    } catch (err) {
      results.push({
        endpoint,
        status: 0,
        statusText: "Network Error",
        success: false,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  return results;
}
