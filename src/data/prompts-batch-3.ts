import { Prompt } from "@/types/prompt";
import { BATCH3_CODING_PROMPTS } from "./batch3/coding";
import { BATCH3_JAVASCRIPT_PROMPTS } from "./batch3/javascript";
import { BATCH3_REACT_PROMPTS } from "./batch3/react";
import { BATCH3_NEXTJS_PROMPTS } from "./batch3/nextjs";
import { BATCH3_AI_DEV_PROMPTS } from "./batch3/ai-dev";
import { BATCH3_DESIGN_PROMPTS } from "./batch3/design";
import { BATCH3_ECOMMERCE_PROMPTS } from "./batch3/ecommerce";
import { BATCH3_HR_PROMPTS } from "./batch3/hr";
import { BATCH3_FINANCE_PROMPTS } from "./batch3/finance";
import { BATCH3_SUPPORT_PROMPTS } from "./batch3/support";
import { BATCH3_FREELANCING_PROMPTS } from "./batch3/freelancing";
import { BATCH3_OPERATIONS_PROMPTS } from "./batch3/operations";

export const PROMPTS_BATCH_3: Prompt[] = [
  ...BATCH3_CODING_PROMPTS,
  ...BATCH3_JAVASCRIPT_PROMPTS,
  ...BATCH3_REACT_PROMPTS,
  ...BATCH3_NEXTJS_PROMPTS,
  ...BATCH3_AI_DEV_PROMPTS,
  ...BATCH3_DESIGN_PROMPTS,
  ...BATCH3_ECOMMERCE_PROMPTS,
  ...BATCH3_HR_PROMPTS,
  ...BATCH3_FINANCE_PROMPTS,
  ...BATCH3_SUPPORT_PROMPTS,
  ...BATCH3_FREELANCING_PROMPTS,
  ...BATCH3_OPERATIONS_PROMPTS,
];
