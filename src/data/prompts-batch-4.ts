import { Prompt } from "@/types/prompt";
import { BATCH4_PRODUCTIVITY_PROMPTS } from "./batch4/productivity";
import { BATCH4_EMAIL_PROMPTS } from "./batch4/email";
import { BATCH4_EDUCATION_PROMPTS } from "./batch4/education";
import { BATCH4_STUDENTS_PROMPTS } from "./batch4/students";
import { BATCH4_RESEARCH_PROMPTS } from "./batch4/research";
import { BATCH4_FREELANCING_PROMPTS } from "./batch4/freelancing";
import { BATCH4_CONTENT_PROMPTS } from "./batch4/content";
import { BATCH4_BUSINESS_PROMPTS } from "./batch4/business";
import { BATCH4_MARKETING_PROMPTS } from "./batch4/marketing";
import { BATCH4_SALES_PROMPTS } from "./batch4/sales";
import { BATCH4_SUPPORT_PROMPTS } from "./batch4/support";
import { BATCH4_CAREER_PROMPTS } from "./batch4/career";
import { BATCH4_SOCIAL_PROMPTS } from "./batch4/social";
import { BATCH4_ECOMMERCE_PROMPTS } from "./batch4/ecommerce";

export const PROMPTS_BATCH_4: Prompt[] = [
  ...BATCH4_PRODUCTIVITY_PROMPTS,
  ...BATCH4_EMAIL_PROMPTS,
  ...BATCH4_EDUCATION_PROMPTS,
  ...BATCH4_STUDENTS_PROMPTS,
  ...BATCH4_RESEARCH_PROMPTS,
  ...BATCH4_FREELANCING_PROMPTS,
  ...BATCH4_CONTENT_PROMPTS,
  ...BATCH4_BUSINESS_PROMPTS,
  ...BATCH4_MARKETING_PROMPTS,
  ...BATCH4_SALES_PROMPTS,
  ...BATCH4_SUPPORT_PROMPTS,
  ...BATCH4_CAREER_PROMPTS,
  ...BATCH4_SOCIAL_PROMPTS,
  ...BATCH4_ECOMMERCE_PROMPTS,
];
