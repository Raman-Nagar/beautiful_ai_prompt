import { Prompt } from "@/types/prompt";
import { CAREER_PROMPTS } from "./batch1/career";
import { RESUME_PROMPTS } from "./batch1/resume";
import { INTERVIEW_PROMPTS } from "./batch1/interview";
import { CODING_PROMPTS } from "./batch1/coding";
import { JAVASCRIPT_PROMPTS } from "./batch1/javascript";
import { REACT_PROMPTS } from "./batch1/react";
import { NEXTJS_PROMPTS } from "./batch1/nextjs";
import { BUSINESS_PROMPTS } from "./batch1/business";
import { MARKETING_PROMPTS } from "./batch1/marketing";
import { CONTENT_PROMPTS } from "./batch1/content";
import { PRODUCTIVITY_PROMPTS } from "./batch1/productivity";

/**
 * Launch Content Batch #1: 50 high-utility, curated AI prompts.
 *
 * Category Distribution:
 * - Career: 5 prompts (prompt-026 to prompt-030)
 * - Resume: 5 prompts (prompt-031 to prompt-035)
 * - Job Interview: 5 prompts (prompt-036 to prompt-040)
 * - Coding: 8 prompts (prompt-041 to prompt-048)
 * - JavaScript: 4 prompts (prompt-049 to prompt-052)
 * - React: 4 prompts (prompt-053 to prompt-056)
 * - Next.js: 4 prompts (prompt-057 to prompt-060)
 * - Business: 4 prompts (prompt-061 to prompt-064)
 * - Marketing: 4 prompts (prompt-065 to prompt-068)
 * - Content Creation: 4 prompts (prompt-069 to prompt-072)
 * - Productivity: 3 prompts (prompt-073 to prompt-075)
 *
 * Total: Exactly 50 prompts.
 */
export const PROMPTS_BATCH_1: Prompt[] = [
  ...CAREER_PROMPTS,
  ...RESUME_PROMPTS,
  ...INTERVIEW_PROMPTS,
  ...CODING_PROMPTS,
  ...JAVASCRIPT_PROMPTS,
  ...REACT_PROMPTS,
  ...NEXTJS_PROMPTS,
  ...BUSINESS_PROMPTS,
  ...MARKETING_PROMPTS,
  ...CONTENT_PROMPTS,
  ...PRODUCTIVITY_PROMPTS,
];
