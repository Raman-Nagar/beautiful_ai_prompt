import sitemap from "../src/app/sitemap";

const INDEXNOW_KEY = "d23238ffcd6def7721819640b0aab753";
const HOST = "www.beautifulaiprompt.com";
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;

async function main() {
  const entries = sitemap();
  const urls = entries.map((e) => e.url);

  console.log(`Preparing to submit ${urls.length} URLs to IndexNow (Bing & Search Engines)...`);

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  const endpoints = [
    "https://api.indexnow.org/indexnow",
    "https://www.bing.com/indexnow",
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload),
      });

      console.log(`✔ [${endpoint}] Response: ${response.status} ${response.statusText}`);
      if (response.status === 200 || response.status === 202) {
        console.log(`  IndexNow successfully received ${urls.length} URLs for instant Bingbot crawling.`);
      }
    } catch (err) {
      console.error(`✖ [${endpoint}] Failed:`, err);
    }
  }
}

main();
