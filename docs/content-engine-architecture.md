# Beautiful AI Prompt — Content Engine & Quality System Architecture

**Brand:** Beautiful AI Prompt  
**Domain:** `beautifulaiprompt.com`  
**Stack:** Next.js (App Router) + TypeScript + Tailwind CSS  
**Target Catalog:** 200+ battle-tested prompts across 20 core categories, 6+ curated collections, and 8+ practical engineering guides.

---

## 1. Executive Summary & Core Philosophy

The primary objective of Beautiful AI Prompt is to provide a curated, high-utility engineering and productivity platform for AI practitioners. Unlike generic "10,000 prompt directories" that generate thousands of thin, keyword-stuffed, AI-hallucinated pages, Beautiful AI Prompt operates under an unyielding editorial standard: **Every prompt must solve a tangible real-world problem with immediate, verifiable value.**

To achieve this at scale (scaling safely to 500–1,000 prompts in Phase 2), the system enforces:
1. **Normalized Data Schemas:** Decoupled content representations with 20 canonical attributes.
2. **7-Part Structural Blueprint:** Context-grounded prompt architectures (ROLE, CONTEXT, TASK, CONSTRAINTS, INPUT, OUTPUT FORMAT, QUALITY CRITERIA).
3. **Template Variable Integrity:** Strict variable type enforcement (`text`, `textarea`, `select`) with automatic token synchronization.
4. **Deterministic Local Duplicate Detection:** Jaccard token overlap and Levenshtein distance metrics to prevent near-identical reskins without requiring heavy external APIs.
5. **Static-First Query Layer:** Zero-dependency query helpers providing clean abstractions for UI components, search, and filtering.
6. **Future-Proof Migration Path:** Seamless transition from TypeScript/JSON static files to NestJS + Prisma + PostgreSQL.

---

## 2. Canonical Prompt Data Model

Every prompt record adheres to the following TypeScript contract:

```typescript
export interface Prompt {
  id: string;                    // Unique identifier (e.g. 'prompt-001')
  slug: string;                  // URL-safe unique slug (e.g. 'strategic-career-transition-roadmap')
  title: string;                 // High-signal descriptive title (10-120 chars)
  shortDescription: string;      // Card preview & SEO meta snippet (30-220 chars)
  description: string;           // Comprehensive editorial context & methodology
  category: string;              // Canonical category slug from official 20-category taxonomy
  subcategory?: string;          // Granular specialization (e.g. 'App Router', 'Mock Interview')
  tags: string[];                // 2-10 discoverability tags
  prompt: string;                // The master prompt text with [VARIABLE] template tokens
  variables: PromptVariable[];   // Typed interactive substitution variables
  exampleInput?: string;         // Realistic, un-fabricated sample input
  exampleOutput?: string;        // High-fidelity actual model output example
  useCases: string[];            // 1-8 concrete professional workflows
  difficulty: PromptDifficulty;  // 'beginner' | 'intermediate' | 'advanced'
  compatibleModels: AIModelId[]; // Validated LLMs (e.g. ['claude', 'chatgpt', 'gemini'])
  featured?: boolean;            // Homepage & banner highlight flag
  trending?: boolean;            // Popularity & momentum flag
  relatedPromptIds?: string[];   // Validated cross-references to other prompts in the library
  createdAt: string;             // ISO-8601 creation timestamp
  updatedAt: string;             // ISO-8601 last editorial revision timestamp
}
```

### 2.1 Variable Specification

Variables turn static prompts into adaptive workbenches. Each variable conforms to:

```typescript
export interface PromptVariable {
  name: string;                                    // Token identifier matching [NAME] in prompt body
  label: string;                                   // Human-readable form label
  description?: string;                            // Contextual guidance for the user
  placeholder?: string;                            // Concrete example value
  required: boolean;                               // True if required for prompt execution
  type: "text" | "textarea" | "select";            // Supported interactive input types
  options?: string[];                              // Required for type="select"
  defaultValue?: string;                           // Optional sensible default
}
```

---

## 3. The 7-Part Prompt Structural Standard

Where appropriate, prompts follow the structured standard to maximize LLM compliance and minimize hallucinations:

| Section | Purpose | Example |
| :--- | :--- | :--- |
| **ROLE** | Establishes the domain authority, tone, and perspective of the AI. | `You are a Principal Software Architect and Staff Engineer...` |
| **CONTEXT** | Sets the stage, domain boundaries, and operational environment. | `I am migrating a legacy client-side React 18 application to Next.js 15 App Router...` |
| **TASK** | Concrete statement of the primary deliverable or analysis requested. | `Conduct a strict code review of the attached component...` |
| **CONSTRAINTS** | Hard boundaries, non-negotiable standards, and negative prompts. | `Do not suggest rewrites that introduce external dependencies. Preserve zero-runtime CSS.` |
| **INPUT** | Dynamic parameters injected via `[VARIABLES]`. | `Target Architecture: [ARCHITECTURE]\nSource Code:\n[SOURCE_CODE]` |
| **OUTPUT FORMAT** | Exact schema, Markdown hierarchy, or JSON structure desired. | `Provide your audit formatted in 4 distinct sections: 1. Executive Summary, 2. Critical Bugs...` |
| **QUALITY CRITERIA**| Self-evaluation benchmarks the model must satisfy before answering. | `Every recommendation must cite concrete lines of code and explain failure modes.` |

---

## 4. 20 Launch Categories Taxonomy

The library is organized around 20 official categories, allowing effortless discovery without fragmented silos:

1. **Career** (`career`)
2. **Resume** (`resume`)
3. **Job Interview** (`job-interview`)
4. **Coding** (`coding`)
5. **JavaScript** (`javascript`)
6. **React** (`react`)
7. **Next.js** (`nextjs`)
8. **Business** (`business`)
9. **Marketing** (`marketing`)
10. **Sales** (`sales`)
11. **Social Media** (`social-media`)
12. **YouTube** (`youtube`)
13. **Content Creation** (`content-creation`)
14. **Productivity** (`productivity`)
15. **Email** (`email`)
16. **Education** (`education`)
17. **Students** (`students`)
18. **Research** (`research`)
19. **Freelancing** (`freelancing`)
20. **Customer Support** (`customer-support`)

---

## 5. Duplicate Detection & Quality Gate System

Located in `src/lib/content/`:
- `quality-standards.ts`: Constants for string length bounds, valid models, anti-spam regexes, and banned marketing buzzwords.
- `duplicate-detector.ts`: High-speed local similarity engine:
  - **Exact Collision Checks:** Rejects duplicate IDs, duplicate URL slugs, and identical titles.
  - **Fuzzy Title Collision:** Uses word-level Jaccard similarity and character-level Levenshtein distance ($T \ge 0.75$) to flag redundant prompts.
  - **Prompt Body Reskin Detection:** Compares prompt text bodies ($T \ge 0.85$) to prevent low-effort variations.
- `validator.ts`: Comprehensive catalog auditor:
  - Validates required fields, date formatting (ISO-8601), and difficulty levels.
  - **Variable Parity:** Ensures every `[VARIABLE]` in the prompt body is formally declared in `variables: []`, and every declared variable is referenced.
  - **Cross-Reference Integrity:** Confirms all `category`, `relatedPromptIds`, and collection `promptIds` point to active, existing records.
  - **Anti-Spam Filter:** Blocks fake statistics, fake reviews, hyperbolic marketing promises, and placeholder text.

### Running Validation

```bash
# Standard validation
npm run validate:content

# Strict validation (warnings treated as failures)
npx tsx scripts/validate-content.ts --strict
```

---

## 6. Decoupled Content Query Layer

All content querying is encapsulated within `src/lib/content/index.ts` and `src/lib/data/`:
- `getPromptBySlug(slug: string)`
- `getPromptsByCategory(categorySlug: string)`
- `getFeaturedPrompts(limit?: number)`
- `getTrendingPrompts(limit?: number)`
- `getLatestPrompts(limit?: number)`
- `getRelatedPrompts(promptId: string, limit?: number)`
- `searchPrompts(query: string, options?: PromptFilterOptions)`
- `getCollectionPrompts(collectionSlug: string)`
- `getPromptCount()`
- `getCategoryBySlug(slug: string)`

React components interact purely with these access functions, completely decoupling UI presentation from the data storage medium.

---

## 7. Migration Path: Static Files → NestJS + Prisma + PostgreSQL

When transitioning from Phase 1 (Static Next.js frontend) to Phase 2 (Dynamic SaaS platform):

```
┌───────────────────────────────────────┐
│ Next.js Frontend (App Router, SSG/ISR)│
└──────────────────┬────────────────────┘
                   │ REST / tRPC
┌──────────────────▼────────────────────┐
│ NestJS Core API                       │
│  - PromptsModule & PromptsService     │
│  - CategoriesModule                   │
│  - CollectionsModule                  │
│  - Audit & Moderation Service         │
└──────────────────┬────────────────────┘
                   │ Prisma ORM
┌──────────────────▼────────────────────┐
│ PostgreSQL 16                         │
│  - Full text search indexes (tsvector)│
│  - Relational integrity & constraints │
│  - JSONB attributes for variables     │
└───────────────────────────────────────┘
```

See `docs/prisma-schema-preview.prisma` for the production-grade schema definition.
