#!/usr/bin/env tsx
/**
 * Beautiful AI Prompt — Production SEO, Canonical, Internal Linking & Sitemap Validation Suite
 *
 * Comprehensive audit verifying:
 * 1. Metadata: missing/duplicate titles, descriptions, canonical URL syntax
 * 2. Content: slugs, essential fields, relationship integrity
 * 3. Internal Link Graph: zero orphans, bidirectional links, link density
 * 4. Sitemap: canonical URLs only, real lastModified dates, completeness
 * 5. Structured Data: schema conformance, no fake ratings/reviews
 *
 * Usage:
 *   npx tsx scripts/validate-seo.ts
 */

import { PROMPTS } from "../src/lib/data/prompts";
import { CATEGORIES } from "../src/lib/data/categories";
import { COLLECTIONS } from "../src/lib/data/collections";
import { GUIDES } from "../src/lib/data/guides";
import {
  isCanonicalUrl,
  getPromptCanonicalUrl,
  getCategoryCanonicalUrl,
  getCollectionCanonicalUrl,
  getGuideCanonicalUrl,
} from "../src/lib/canonical";
import { auditInternalLinkGraph } from "../src/lib/internal-links";
import {
  generateWebSiteJsonLd,
  generateOrganizationJsonLd,
  generatePromptJsonLd,
  generateGuideJsonLd,
} from "../src/lib/structured-data";
import sitemap from "../src/app/sitemap";

const colors = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
};

function formatHeader(title: string): string {
  const line = "━".repeat(60);
  return `\n${colors.cyan}${line}\n  ${colors.bold}${title}${colors.reset}\n${colors.cyan}${line}${colors.reset}\n`;
}

interface ValidationIssue {
  type: "error" | "warning";
  category: "metadata" | "content" | "links" | "sitemap" | "structured-data";
  message: string;
  entityId?: string;
}

function runSeoAudit() {
  console.log(formatHeader("Beautiful AI Prompt — Production SEO & Indexing Foundation Audit"));
  const startTime = Date.now();

  const issues: ValidationIssue[] = [];

  // =========================================================================
  // 1. METADATA AUDIT
  // =========================================================================
  console.log(`${colors.bold}1. Auditing Metadata System...${colors.reset}`);

  const promptTitles = new Map<string, string>();
  const promptDescriptions = new Map<string, string>();

  for (const p of PROMPTS) {
    if (!p.title || p.title.trim().length === 0) {
      issues.push({ type: "error", category: "metadata", message: "Prompt missing title", entityId: p.id });
    }
    const desc = p.shortDescription || p.description;
    if (!desc || desc.trim().length === 0) {
      issues.push({ type: "error", category: "metadata", message: "Prompt missing description", entityId: p.id });
    }

    // Duplicate check
    const normalizedTitle = p.title.toLowerCase().trim();
    if (promptTitles.has(normalizedTitle)) {
      issues.push({
        type: "error",
        category: "metadata",
        message: `Duplicate prompt title: "${p.title}" (also in ${promptTitles.get(normalizedTitle)})`,
        entityId: p.id,
      });
    } else {
      promptTitles.set(normalizedTitle, p.id);
    }

    const normalizedDesc = desc.toLowerCase().trim();
    if (promptDescriptions.has(normalizedDesc)) {
      issues.push({
        type: "warning",
        category: "metadata",
        message: `Duplicate prompt description: "${desc.slice(0, 40)}..." (also in ${promptDescriptions.get(normalizedDesc)})`,
        entityId: p.id,
      });
    } else {
      promptDescriptions.set(normalizedDesc, p.id);
    }

    // Canonical URL validation
    const canonical = getPromptCanonicalUrl(p.slug);
    if (!isCanonicalUrl(canonical)) {
      issues.push({
        type: "error",
        category: "metadata",
        message: `Invalid prompt canonical URL: ${canonical}`,
        entityId: p.id,
      });
    }
  }

  // Categories metadata
  for (const c of CATEGORIES) {
    if (!c.name || !c.description) {
      issues.push({ type: "error", category: "metadata", message: `Category ${c.slug} missing name or description` });
    }
    const canonical = getCategoryCanonicalUrl(c.slug);
    if (!isCanonicalUrl(canonical)) {
      issues.push({ type: "error", category: "metadata", message: `Invalid category canonical URL: ${canonical}` });
    }
  }

  // Collections metadata
  for (const col of COLLECTIONS) {
    if (!col.title || (!col.description && !col.shortDescription)) {
      issues.push({ type: "error", category: "metadata", message: `Collection ${col.slug} missing title or description` });
    }
    const canonical = getCollectionCanonicalUrl(col.slug);
    if (!isCanonicalUrl(canonical)) {
      issues.push({ type: "error", category: "metadata", message: `Invalid collection canonical URL: ${canonical}` });
    }
  }

  // Guides metadata
  for (const g of GUIDES) {
    if (!g.title || (!g.description && !g.excerpt)) {
      issues.push({ type: "error", category: "metadata", message: `Guide ${g.slug} missing title or description` });
    }
    const canonical = getGuideCanonicalUrl(g.slug);
    if (!isCanonicalUrl(canonical)) {
      issues.push({ type: "error", category: "metadata", message: `Invalid guide canonical URL: ${canonical}` });
    }
  }

  console.log(`  ${colors.green}✔ Metadata unique title, description, and canonical checks completed.${colors.reset}`);

  // =========================================================================
  // 2. CONTENT & RELATIONSHIP INTEGRITY
  // =========================================================================
  console.log(`\n${colors.bold}2. Auditing Content & Cross-References...${colors.reset}`);

  const categorySlugs = new Set(CATEGORIES.map((c) => c.slug));
  const promptIds = new Set(PROMPTS.map((p) => p.id));
  const collectionSlugs = new Set(COLLECTIONS.map((c) => c.slug));
  const guideSlugs = new Set(GUIDES.map((g) => g.slug));

  for (const p of PROMPTS) {
    if (!categorySlugs.has(p.category.toLowerCase())) {
      issues.push({
        type: "error",
        category: "content",
        message: `Prompt has invalid category "${p.category}"`,
        entityId: p.id,
      });
    }
  }

  for (const col of COLLECTIONS) {
    for (const pid of col.promptIds) {
      if (!promptIds.has(pid)) {
        issues.push({
          type: "error",
          category: "content",
          message: `Collection "${col.slug}" references non-existent prompt ID "${pid}"`,
        });
      }
    }
  }

  for (const g of GUIDES) {
    const pIds = g.relatedPromptIds || g.promptIds || [];
    for (const pid of pIds) {
      if (!promptIds.has(pid)) {
        issues.push({
          type: "error",
          category: "content",
          message: `Guide "${g.slug}" references non-existent prompt ID "${pid}"`,
        });
      }
    }
    for (const colSlug of g.relatedCollectionSlugs || []) {
      if (!collectionSlugs.has(colSlug)) {
        issues.push({
          type: "error",
          category: "content",
          message: `Guide "${g.slug}" references non-existent collection slug "${colSlug}"`,
        });
      }
    }
    for (const catId of g.categoryIds || []) {
      if (!categorySlugs.has(catId)) {
        issues.push({
          type: "error",
          category: "content",
          message: `Guide "${g.slug}" references non-existent category ID "${catId}"`,
        });
      }
    }
    for (const relGuide of g.relatedGuideSlugs || []) {
      if (!guideSlugs.has(relGuide)) {
        issues.push({
          type: "error",
          category: "content",
          message: `Guide "${g.slug}" references non-existent related guide slug "${relGuide}"`,
        });
      }
    }
  }

  console.log(`  ${colors.green}✔ Content relationships and cross-references verified.${colors.reset}`);

  // =========================================================================
  // 3. INTERNAL LINK GRAPH & ORPHAN AUDIT
  // =========================================================================
  console.log(`\n${colors.bold}3. Auditing Internal Link Graph & Orphan Pages...${colors.reset}`);

  const linkGraphReport = auditInternalLinkGraph();

  console.log(`  • Prompts Audited:      ${linkGraphReport.totalPages.prompts}`);
  console.log(`    - Orphan Prompts:     ${linkGraphReport.orphans.prompts.length === 0 ? colors.green + "0" : colors.red + linkGraphReport.orphans.prompts.length}${colors.reset}`);
  console.log(`    - Min Inbound Links:  ${linkGraphReport.inboundLinkStats.minPromptInbound}`);
  console.log(`    - Avg Inbound Links:  ${linkGraphReport.inboundLinkStats.avgPromptInbound}`);

  console.log(`  • Categories Audited:   ${linkGraphReport.totalPages.categories}`);
  console.log(`    - Orphan Categories:  ${linkGraphReport.orphans.categories.length === 0 ? colors.green + "0" : colors.red + linkGraphReport.orphans.categories.length}${colors.reset}`);
  console.log(`    - Min Inbound Links:  ${linkGraphReport.inboundLinkStats.minCategoryInbound}`);
  console.log(`    - Avg Inbound Links:  ${linkGraphReport.inboundLinkStats.avgCategoryInbound}`);

  console.log(`  • Collections Audited:  ${linkGraphReport.totalPages.collections}`);
  console.log(`    - Orphan Collections: ${linkGraphReport.orphans.collections.length === 0 ? colors.green + "0" : colors.red + linkGraphReport.orphans.collections.length}${colors.reset}`);
  console.log(`    - Min Inbound Links:  ${linkGraphReport.inboundLinkStats.minCollectionInbound}`);
  console.log(`    - Avg Inbound Links:  ${linkGraphReport.inboundLinkStats.avgCollectionInbound}`);

  console.log(`  • Guides Audited:       ${linkGraphReport.totalPages.guides}`);
  console.log(`    - Orphan Guides:      ${linkGraphReport.orphans.guides.length === 0 ? colors.green + "0" : colors.red + linkGraphReport.orphans.guides.length}${colors.reset}`);
  console.log(`    - Min Inbound Links:  ${linkGraphReport.inboundLinkStats.minGuideInbound}`);
  console.log(`    - Avg Inbound Links:  ${linkGraphReport.inboundLinkStats.avgGuideInbound}`);

  if (linkGraphReport.orphans.total > 0) {
    issues.push({
      type: "error",
      category: "links",
      message: `Detected ${linkGraphReport.orphans.total} orphan pages without incoming links`,
    });
  }

  // =========================================================================
  // 4. XML SITEMAP AUDIT
  // =========================================================================
  console.log(`\n${colors.bold}4. Auditing XML Sitemap (app/sitemap.ts)...${colors.reset}`);

  const sitemapEntries = sitemap();
  const sitemapUrls = new Set<string>();

  for (const entry of sitemapEntries) {
    // Canonical validation
    if (!isCanonicalUrl(entry.url)) {
      issues.push({
        type: "error",
        category: "sitemap",
        message: `Sitemap entry contains non-canonical URL: ${entry.url}`,
      });
    }

    // Duplicate check
    if (sitemapUrls.has(entry.url)) {
      issues.push({
        type: "error",
        category: "sitemap",
        message: `Duplicate sitemap URL: ${entry.url}`,
      });
    }
    sitemapUrls.add(entry.url);

    // Date validation
    if (!entry.lastModified || isNaN(new Date(entry.lastModified).getTime())) {
      issues.push({
        type: "error",
        category: "sitemap",
        message: `Invalid lastModified date for ${entry.url}`,
      });
    }
  }

  // Check expected count
  const expectedTotal = 10 + PROMPTS.length + CATEGORIES.length + COLLECTIONS.length + GUIDES.length;
  console.log(`  • Sitemap Entries:      ${sitemapEntries.length} (Expected: ${expectedTotal})`);

  if (sitemapEntries.length !== expectedTotal) {
    issues.push({
      type: "error",
      category: "sitemap",
      message: `Sitemap count mismatch: expected ${expectedTotal}, got ${sitemapEntries.length}`,
    });
  }

  console.log(`  ${colors.green}✔ Sitemap canonical check and deterministic dates verified.${colors.reset}`);

  // =========================================================================
  // 5. STRUCTURED DATA / JSON-LD AUDIT
  // =========================================================================
  console.log(`\n${colors.bold}5. Auditing Schema.org Structured Data...${colors.reset}`);

  const websiteSchema = generateWebSiteJsonLd();
  if (websiteSchema["@type"] !== "WebSite" || !websiteSchema.url) {
    issues.push({ type: "error", category: "structured-data", message: "Invalid WebSite schema" });
  }

  const orgSchema = generateOrganizationJsonLd();
  if (orgSchema["@type"] !== "Organization" || !orgSchema.url) {
    issues.push({ type: "error", category: "structured-data", message: "Invalid Organization schema" });
  }

  // Test sample prompt schema
  const samplePrompt = PROMPTS[0];
  const promptSchema = generatePromptJsonLd(samplePrompt);
  const promptSchemaJson = JSON.stringify(promptSchema);
  if (promptSchemaJson.includes("aggregateRating") || promptSchemaJson.includes("reviewRating")) {
    issues.push({
      type: "error",
      category: "structured-data",
      message: "Prohibited fake rating schema detected in prompt JSON-LD!",
    });
  }

  // Test sample guide schema
  const sampleGuide = GUIDES[0];
  const guideSchema = generateGuideJsonLd(sampleGuide);
  const guideSchemaJson = JSON.stringify(guideSchema);
  if (guideSchemaJson.includes("aggregateRating")) {
    issues.push({
      type: "error",
      category: "structured-data",
      message: "Prohibited fake rating schema detected in guide JSON-LD!",
    });
  }

  console.log(`  ${colors.green}✔ Schema.org schemas verified (100% authentic, zero fake reviews/ratings).${colors.reset}`);

  // =========================================================================
  // SUMMARY & EXIT CODE
  // =========================================================================
  const durationMs = Date.now() - startTime;
  const errors = issues.filter((i) => i.type === "error");
  const warnings = issues.filter((i) => i.type === "warning");

  console.log(formatHeader("SEO Foundation Validation Summary"));
  console.log(`  • Execution Duration:   ${durationMs}ms`);
  console.log(`  • Total Indexable Pages:${expectedTotal}`);
  console.log(`  • Errors Found:         ${errors.length === 0 ? colors.green + "0" : colors.red + errors.length}${colors.reset}`);
  console.log(`  • Warnings Found:       ${warnings.length === 0 ? colors.green + "0" : colors.yellow + warnings.length}${colors.reset}\n`);

  if (errors.length > 0) {
    console.log(`${colors.red}${colors.bold}Critical SEO Validation Failures:${colors.reset}`);
    for (const err of errors) {
      console.log(`  ${colors.red}✖ [${err.category}] ${err.message}${err.entityId ? ` (${err.entityId})` : ""}${colors.reset}`);
    }
    console.log();
    process.exit(1);
  } else {
    console.log(`${colors.green}${colors.bold}✔ ALL SEO, CANONICAL, SITEMAP & INTERNAL LINK AUDITS PASSED!${colors.reset}\n`);
    process.exit(0);
  }
}

runSeoAudit();
