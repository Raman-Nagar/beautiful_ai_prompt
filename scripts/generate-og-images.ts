import fs from "fs";
import path from "path";
import sharp from "sharp";

const OUTPUT_DIR = path.join(process.cwd(), "public", "og");
const ROOT_OG_IMAGE = path.join(process.cwd(), "public", "og-image.png");

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

interface OgCardConfig {
  tag: string;
  tagColor: string;
  title: string;
  description: string;
  badge1: string;
  badge2: string;
  badge3: string;
  fileName: string;
  isRoot?: boolean;
}

const CARDS: OgCardConfig[] = [
  {
    tag: "PROMPT PRODUCTIVITY PLATFORM",
    tagColor: "#818cf8",
    title: "Beautiful AI Prompt",
    description: "Curated, tested, and practical AI prompts engineered for real-world engineering, business, creative, and productivity workflows.",
    badge1: "225+ Production Prompts",
    badge2: "26 Specialized Domains",
    badge3: "Claude • ChatGPT • Gemini",
    fileName: "platform.png",
    isRoot: true,
  },
  {
    tag: "CURATED PROMPT REPOSITORY",
    tagColor: "#38bdf8",
    title: "Production AI Prompts Library",
    description: "Explore 225+ battle-tested prompts with interactive variable customization, zero filler, and deterministic output schemas.",
    badge1: "Interactive Variables",
    badge2: "Local-First Privacy",
    badge3: "Instant Clipboard Copy",
    fileName: "prompts.png",
  },
  {
    tag: "SPECIALIZED DOMAINS",
    tagColor: "#a855f7",
    title: "Browse Prompt Categories",
    description: "26 domain-specific taxonomy hubs spanning Coding, Career, Marketing, Business Strategy, Product Design, and Data Engineering.",
    badge1: "26 Taxonomy Hubs",
    badge2: "Zero Orphan Pages",
    badge3: "Verified Cross-Links",
    fileName: "categories.png",
  },
  {
    tag: "WORKFLOW PLAYBOOKS",
    tagColor: "#ec4899",
    title: "Curated Prompt Collections",
    description: "Sequential prompt packs assembled into end-to-end playbooks: Complete Job Search, Developer Toolkit, and SaaS Marketing.",
    badge1: "22 Workflow Suites",
    badge2: "End-to-End Playbooks",
    badge3: "Practical Outcomes",
    fileName: "collections.png",
  },
  {
    tag: "SYSTEM ARCHITECTURE & TUTORIALS",
    tagColor: "#10b981",
    title: "Prompt Engineering Guides",
    description: "In-depth technical guides covering cognitive role-anchoring, few-shot conditioning, STAR frameworks, and hallucination reduction.",
    badge1: "12 Engineering Guides",
    badge2: "STAR & Few-Shot Patterns",
    badge3: "Production Heuristics",
    fileName: "guides.png",
  },
];

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function generateSvg(config: OgCardConfig): string {
  const safeTitle = escapeXml(config.title);
  const safeDesc = escapeXml(config.description);
  const safeTag = escapeXml(config.tag);
  const safeB1 = escapeXml(config.badge1);
  const safeB2 = escapeXml(config.badge2);
  const safeB3 = escapeXml(config.badge3);

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="20%" cy="15%" r="70%">
      <stop offset="0%" stop-color="${config.tagColor}" stop-opacity="0.22" />
      <stop offset="50%" stop-color="#4f46e5" stop-opacity="0.08" />
      <stop offset="100%" stop-color="#090d16" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="bottomGlow" cx="80%" cy="85%" r="60%">
      <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.14" />
      <stop offset="100%" stop-color="#090d16" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#181f2f" stop-opacity="0.85" />
      <stop offset="100%" stop-color="#0d121f" stop-opacity="0.95" />
    </linearGradient>
    <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#818cf8" />
      <stop offset="100%" stop-color="#c084fc" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="#090d16" />
  <rect width="1200" height="630" fill="url(#glow)" />
  <rect width="1200" height="630" fill="url(#bottomGlow)" />

  <!-- Grid pattern overlay -->
  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1f293d" stroke-width="0.75" stroke-opacity="0.4" />
  </pattern>
  <rect width="1200" height="630" fill="url(#grid)" />

  <!-- Inner Glass Panel -->
  <rect x="50" y="50" width="1100" height="530" rx="24" fill="url(#cardGrad)" stroke="#27324b" stroke-width="1.5" />

  <!-- Top Bar: Logo & Tag -->
  <g transform="translate(90, 95)">
    <!-- Logo Icon -->
    <rect x="0" y="0" width="48" height="48" rx="12" fill="#1e1b4b" stroke="#4f46e5" stroke-width="1.5" />
    <path d="M 24 14 L 27 21 L 34 24 L 27 27 L 24 34 L 21 27 L 14 24 L 21 21 Z" fill="url(#brandGrad)" />
    
    <!-- Brand Title -->
    <text x="64" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="700" fill="#f8fafc">Beautiful AI Prompt</text>
    <text x="64" y="44" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600" letter-spacing="2" fill="${config.tagColor}">${safeTag}</text>

    <!-- Top Right Domain Chip -->
    <rect x="800" y="4" width="220" height="40" rx="20" fill="#111827" stroke="#374151" stroke-width="1" />
    <text x="910" y="29" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="600" fill="#9ca3af" text-anchor="middle">beautifulaiprompt.com</text>
  </g>

  <!-- Main Headline -->
  <g transform="translate(90, 220)">
    <text x="0" y="55" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="52" font-weight="800" fill="#ffffff" letter-spacing="-1">${safeTitle}</text>
  </g>

  <!-- Description -->
  <g transform="translate(90, 335)">
    <foreignObject x="0" y="0" width="1020" height="110">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 23px; line-height: 1.5; color: #94a3b8; font-weight: 400;">
        ${safeDesc}
      </div>
    </foreignObject>
  </g>

  <!-- Bottom Badges / Metrics -->
  <g transform="translate(90, 485)">
    <!-- Badge 1 -->
    <rect x="0" y="0" width="230" height="44" rx="10" fill="#1e1b4b" stroke="#3730a3" stroke-width="1" />
    <text x="115" y="27" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="600" fill="#c7d2fe" text-anchor="middle">${safeB1}</text>

    <!-- Badge 2 -->
    <rect x="250" y="0" width="240" height="44" rx="10" fill="#1e293b" stroke="#334155" stroke-width="1" />
    <text x="370" y="27" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="600" fill="#cbd5e1" text-anchor="middle">${safeB2}</text>

    <!-- Badge 3 -->
    <rect x="510" y="0" width="260" height="44" rx="10" fill="#1e293b" stroke="#334155" stroke-width="1" />
    <text x="640" y="27" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="600" fill="#cbd5e1" text-anchor="middle">${safeB3}</text>

    <!-- Verified Badge -->
    <g transform="translate(860, 10)">
      <circle cx="12" cy="12" r="12" fill="#065f46" />
      <path d="M 8 12 L 11 15 L 17 9" fill="none" stroke="#34d399" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
      <text x="32" y="17" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#34d399">VERIFIED CURATED</text>
    </g>
  </g>
</svg>`;
}

async function main() {
  console.log("Generating production OpenGraph social sharing images (1200x630)...");

  for (const card of CARDS) {
    const svg = generateSvg(card);
    const destPath = path.join(OUTPUT_DIR, card.fileName);

    const buffer = await sharp(Buffer.from(svg))
      .png({ quality: 95, compressionLevel: 8 })
      .toBuffer();

    fs.writeFileSync(destPath, buffer);
    console.log(`  ✔ Generated ${path.relative(process.cwd(), destPath)} (${buffer.length} bytes)`);

    if (card.isRoot) {
      fs.writeFileSync(ROOT_OG_IMAGE, buffer);
      console.log(`  ✔ Generated ${path.relative(process.cwd(), ROOT_OG_IMAGE)} (${buffer.length} bytes)`);
    }
  }

  console.log("All OpenGraph social images generated successfully!");
}

main().catch((err) => {
  console.error("Error generating OG images:", err);
  process.exit(1);
});
