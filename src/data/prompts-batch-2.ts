import { Prompt } from "@/types/prompt";
import { BATCH2_BUSINESS_PROMPTS } from "./batch2/business";
import { BATCH2_MARKETING_PROMPTS } from "./batch2/marketing";
import { BATCH2_SALES_PROMPTS } from "./batch2/sales";
import { BATCH2_SOCIAL_MEDIA_PROMPTS } from "./batch2/social-media";
import { BATCH2_YOUTUBE_PROMPTS } from "./batch2/youtube";
import { BATCH2_CONTENT_PROMPTS } from "./batch2/content";
import { BATCH2_PRODUCTIVITY_PROMPTS } from "./batch2/productivity";
import { BATCH2_EMAIL_PROMPTS } from "./batch2/email";
import { BATCH2_EDUCATION_PROMPTS } from "./batch2/education";
import { BATCH2_STUDENTS_PROMPTS } from "./batch2/students";
import { BATCH2_RESEARCH_PROMPTS } from "./batch2/research";
import { BATCH2_FREELANCING_PROMPTS } from "./batch2/freelancing";
import { BATCH2_SUPPORT_PROMPTS } from "./batch2/support";

/**
 * Launch Content Batch #2: Exactly 50 Production-Quality Prompts
 * 
 * Category Breakdown:
 * - Business: 6 (prompt-076 to prompt-081)
 * - Marketing: 6 (prompt-082 to prompt-087)
 * - Sales: 5 (prompt-088 to prompt-092)
 * - Social Media: 5 (prompt-093 to prompt-097)
 * - YouTube: 5 (prompt-098 to prompt-102)
 * - Content Creation: 5 (prompt-103 to prompt-107)
 * - Productivity: 4 (prompt-108 to prompt-111)
 * - Email: 4 (prompt-112 to prompt-115)
 * - Education: 3 (prompt-116 to prompt-118)
 * - Students: 2 (prompt-119 to prompt-120)
 * - Research: 2 (prompt-121 to prompt-122)
 * - Freelancing: 2 (prompt-123 to prompt-124)
 * - Customer Support: 1 (prompt-125)
 * 
 * Total: 50 Prompts
 */
export const PROMPTS_BATCH_2: Prompt[] = [
  ...BATCH2_BUSINESS_PROMPTS,
  ...BATCH2_MARKETING_PROMPTS,
  ...BATCH2_SALES_PROMPTS,
  ...BATCH2_SOCIAL_MEDIA_PROMPTS,
  ...BATCH2_YOUTUBE_PROMPTS,
  ...BATCH2_CONTENT_PROMPTS,
  ...BATCH2_PRODUCTIVITY_PROMPTS,
  ...BATCH2_EMAIL_PROMPTS,
  ...BATCH2_EDUCATION_PROMPTS,
  ...BATCH2_STUDENTS_PROMPTS,
  ...BATCH2_RESEARCH_PROMPTS,
  ...BATCH2_FREELANCING_PROMPTS,
  ...BATCH2_SUPPORT_PROMPTS,
];
