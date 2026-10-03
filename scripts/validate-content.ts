#!/usr/bin/env tsx
/**
 * Beautiful AI Prompt - Content Validation & Quality Assurance CLI
 *
 * Runs complete audit over prompt catalog:
 * - Structural integrity & required fields
 * - Anti-spam & quality standards
 * - Variable definition synchronization
 * - Category / collection / related prompt cross-references
 * - Duplicate ID, slug, and title detection
 * - Fuzzy similarity detection
 *
 * Usage:
 *   npx tsx scripts/validate-content.ts
 *   npx tsx scripts/validate-content.ts --strict
 */

import { PROMPTS } from "../src/lib/data/prompts";
import { CATEGORIES } from "../src/lib/data/categories";
import { COLLECTIONS } from "../src/lib/data/collections";
import { GUIDES } from "../src/lib/data/guides";
import { auditContentCatalog } from "../src/lib/content/validator";

// ANSI color formatting
const colors = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
  magenta: "\x1b[35m",
  gray: "\x1b[90m",
};

function formatHeader(title: string): string {
  const line = "━".repeat(60);
  return `\n${colors.cyan}${line}\n  ${colors.bold}${title}${colors.reset}\n${colors.cyan}${line}${colors.reset}\n`;
}

function runValidation() {
  const isStrict = process.argv.includes("--strict");

  console.log(formatHeader("Beautiful AI Prompt — Content Engine & Quality Audit"));
  console.log(`${colors.dim}Auditing catalog with standards: Anti-Spam, Variable Parity, Cross-Refs, Uniqueness...${colors.reset}\n`);

  const startTime = Date.now();
  const report = auditContentCatalog(PROMPTS, {
    categories: CATEGORIES,
    collections: COLLECTIONS,
    guides: GUIDES,
    similarityThreshold: 0.75,
  });
  const durationMs = Date.now() - startTime;

  // Print Summary Stats Table
  console.log(`${colors.bold}Catalog Statistics:${colors.reset}`);
  console.log(`  • Prompts Audited:      ${colors.cyan}${report.totalPrompts}${colors.reset}`);
  console.log(`  • Categories Loaded:    ${colors.cyan}${report.totalCategories}${colors.reset}`);
  console.log(`  • Collections Loaded:   ${colors.cyan}${report.totalCollections}${colors.reset}`);
  console.log(`  • Guides Loaded:        ${colors.cyan}${report.totalGuides}${colors.reset}`);
  console.log(`  • Valid Prompts:        ${report.validPromptsCount === report.totalPrompts ? colors.green : colors.yellow}${report.validPromptsCount}/${report.totalPrompts}${colors.reset}`);
  console.log(`  • Error Count:          ${report.errorCount === 0 ? colors.green : colors.red}${report.errorCount}${colors.reset}`);
  console.log(`  • Warning Count:        ${report.warningCount === 0 ? colors.green : colors.yellow}${report.warningCount}${colors.reset}`);
  console.log(`  • Audit Duration:       ${colors.dim}${durationMs}ms${colors.reset}\n`);

  // Print Duplicate Analysis
  const duplicates = report.duplicateReport;
  console.log(`${colors.bold}Duplicate & Collision Analysis:${colors.reset}`);
  if (
    duplicates.duplicateIds.length === 0 &&
    duplicates.duplicateSlugs.length === 0 &&
    duplicates.duplicateTitles.length === 0 &&
    duplicates.similarTitles.length === 0 &&
    duplicates.similarPrompts.length === 0
  ) {
    console.log(`  ${colors.green}✔ No duplicate IDs, slugs, or titles detected.${colors.reset}`);
    console.log(`  ${colors.green}✔ No fuzzy title collisions (similarity threshold: >= 75%).${colors.reset}`);
    console.log(`  ${colors.green}✔ No prompt body reskins (similarity threshold: >= 85%).${colors.reset}\n`);
  } else {
    if (duplicates.duplicateIds.length > 0) {
      console.log(`  ${colors.red}✖ Duplicate IDs:${colors.reset}`);
      for (const id of duplicates.duplicateIds) {
        console.log(`    - ID "${id}" appears more than once`);
      }
    }
    if (duplicates.duplicateSlugs.length > 0) {
      console.log(`  ${colors.red}✖ Duplicate Slugs:${colors.reset}`);
      for (const slug of duplicates.duplicateSlugs) {
        console.log(`    - Slug "${slug}" appears more than once`);
      }
    }
    if (duplicates.duplicateTitles.length > 0) {
      console.log(`  ${colors.red}✖ Exact Duplicate Titles:${colors.reset}`);
      for (const title of duplicates.duplicateTitles) {
        console.log(`    - Title "${title}" appears more than once`);
      }
    }
    if (duplicates.similarTitles.length > 0) {
      console.log(`  ${colors.yellow}⚠ Highly Similar Titles (Potential Redundancy):${colors.reset}`);
      for (const sim of duplicates.similarTitles) {
        console.log(`    - Similarity ${(sim.similarityScore * 100).toFixed(0)}%:`);
        console.log(`        1. "${sim.sourceTitle}" (${sim.sourceId})`);
        console.log(`        2. "${sim.targetTitle}" (${sim.targetId})`);
      }
    }
    if (duplicates.similarPrompts.length > 0) {
      console.log(`  ${colors.yellow}⚠ Highly Similar Prompt Texts (Potential Reskin):${colors.reset}`);
      for (const sim of duplicates.similarPrompts) {
        console.log(`    - Body Similarity ${(sim.similarityScore * 100).toFixed(0)}%:`);
        console.log(`        1. "${sim.sourceTitle}" (${sim.sourceId})`);
        console.log(`        2. "${sim.targetTitle}" (${sim.targetId})`);
      }
    }
    console.log();
  }

  // Print Issues Breakdown
  const invalidPrompts = report.promptResults.filter((r) => r.issues.length > 0);
  const integrityIssues = [
    ...report.categoryIntegrityIssues,
    ...report.collectionIntegrityIssues,
    ...report.guideIntegrityIssues,
  ];

  if (invalidPrompts.length > 0 || integrityIssues.length > 0) {
    console.log(`${colors.bold}Content Issues Detailed Log:${colors.reset}`);

    for (const promptRes of invalidPrompts) {
      console.log(`  ${colors.bold}Prompt ${promptRes.promptSlug} (${promptRes.promptId}):${colors.reset}`);
      for (const issue of promptRes.issues) {
        const badge =
          issue.severity === "error"
            ? `${colors.red}[ERROR]`
            : issue.severity === "warning"
            ? `${colors.yellow}[WARN]`
            : `${colors.cyan}[INFO]`;
        console.log(`    ${badge} ${colors.bold}${issue.code}${colors.reset} (${issue.field}): ${issue.message}`);
      }
    }

    if (integrityIssues.length > 0) {
      console.log(`  ${colors.bold}Cross-Reference & Taxonomy Integrity:${colors.reset}`);
      for (const issue of integrityIssues) {
        const badge =
          issue.severity === "error"
            ? `${colors.red}[ERROR]`
            : issue.severity === "warning"
            ? `${colors.yellow}[WARN]`
            : `${colors.cyan}[INFO]`;
        console.log(`    ${badge} ${colors.bold}${issue.code}${colors.reset} (${issue.field}): ${issue.message}`);
      }
    }
    console.log();
  }

  // Final Conclusion
  if (report.errorCount === 0) {
    if (report.warningCount > 0 && isStrict) {
      console.log(`${colors.red}${colors.bold}✖ Catalog audit failed in --strict mode with ${report.warningCount} warning(s).${colors.reset}\n`);
      process.exit(1);
    }
    console.log(`${colors.green}${colors.bold}✔ Content Engine Audit Passed!${colors.reset} 0 critical errors found across ${report.totalPrompts} prompts.\n`);
    process.exit(0);
  } else {
    console.log(`${colors.red}${colors.bold}✖ Content Engine Audit Failed with ${report.errorCount} critical error(s).${colors.reset}\n`);
    process.exit(1);
  }
}

runValidation();
