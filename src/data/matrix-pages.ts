import { MatrixPage } from "@/types/matrix";

export const MATRIX_PAGES: MatrixPage[] = [
  {
    id: "matrix-001",
    slug: "chatgpt-prompts-for-coding",
    modelId: "chatgpt",
    categorySlug: "coding",
    title: "ChatGPT Prompts for Coding & Software Development",
    seoTitle: "Best ChatGPT Prompts for Coding & Software Engineering (2026)",
    seoDescription: "Battle-tested ChatGPT prompts for writing clean code, refactoring algorithms, debugging stack traces, and generating unit tests with GPT-4o.",
    heroTagline: "Precision GPT-4o prompt engineering blueprints for modern software engineers.",
    targetKeywords: [
      "chatgpt prompts for coding",
      "best chatgpt prompts for coding",
      "chatgpt coding prompts",
      "chatgpt programming prompts",
      "chatgpt code generator prompts",
    ],
    summary: "Discover battle-tested ChatGPT prompts engineered specifically for developers. Learn how to calibrate system instructions, prevent hallucinations, and generate production-grade code with GPT-4o.",
    whyThisModelForThisPersona: [
      "Rapid prototyping with GPT-4o's multimodal inputs (screenshot-to-code, terminal log analysis).",
      "Advanced Code Interpreter sandbox for validating complex mathematical models and algorithmic logic.",
      "Vast training across virtually every programming language, runtime, and ecosystem package.",
      "Exceptional speed when scaffolding repetitive boilerplate and unit test suites.",
    ],
    promptEngineeringPlaybook: {
      title: "Coding Playbook with GPT-4o",
      description: "How to extract zero-defect code from ChatGPT without iterative cycles.",
      doList: [
        "Specify the exact language version, compiler flags, and target dependencies (e.g., 'TypeScript 5.4, strict: true').",
        "Instruct ChatGPT to provide step-by-step thinking or write types and tests before the implementation.",
        "Provide exact interface definitions, API response payloads, and expected function signatures.",
        "Request explicit edge-case handling (null safety, network timeouts, concurrency guards).",
      ],
      dontList: [
        "Don't prompt with vague requests like 'make a backend for my app' without architectural specifications.",
        "Don't accept code without asking ChatGPT to identify edge cases, time complexity, and memory implications.",
        "Don't copy-paste sensitive production API secrets, keys, or proprietary data into public chats.",
        "Don't let the model guess external library APIs—always provide exact schema references when using cutting-edge releases.",
      ],
    },
    recommendedSettings: {
      temperature: "0.2 (Low variance for deterministic, syntactically correct code)",
      topP: "0.95",
      maxTokens: "4096",
      modelVariant: "GPT-4o (Omni) or o1-preview for complex mathematical algorithms",
      systemPromptSnippet: "You are a Principal Software Architect. Prioritize type safety, SOLID principles, zero dead code, and clean functional error handling over brevity. Do not write placeholder comments.",
    },
    curatedPrompts: [
      {
        title: "TypeScript Exhaustive Domain Model & Zod Validator",
        description: "Scaffold a rock-solid domain model with runtime schema validation, branded types, and error transformation.",
        prompt: `Act as a Senior TypeScript Architect. Design a production-grade domain model and Zod validator for [DOMAIN_ENTITY].

Requirements:
1. Define the immutable core TypeScript interface with branded types for identifiers (e.g. UserId, TenantId).
2. Create an exhaustive Zod validation schema that enforces strict business constraints (string lengths, regex formats, range checks).
3. Implement a safe parse factory function \`create[DOMAIN_ENTITY](input: unknown): Result<[DOMAIN_ENTITY], ValidationError>\` using a functional Result pattern without throwing unchecked exceptions.
4. Include 3 comprehensive unit test cases using Vitest/Jest demonstrating valid creation, boundary validation failure, and malformed payload rejection.

Context / Attributes:
[ATTRIBUTES_AND_RULES]`,
        recommendedVariables: {
          DOMAIN_ENTITY: "SubscriptionBillingPlan",
          ATTRIBUTES_AND_RULES: "tier (free, pro, enterprise), billingCycle (monthly, annual), seatCount (1 to 500), paymentStatus (active, delinquent, canceled)",
        },
        expectedOutputPreview: "Complete TypeScript module with branded ID types, complete Zod schema, zero-throw Result factory, and Vitest suite.",
      },
      {
        title: "Zero-Downtime Database Migration & Index Strategy",
        description: "Generate a bulletproof SQL / Prisma migration script for high-traffic tables with concurrent indexing.",
        prompt: `Act as a Staff Database Administrator and PostgreSQL performance engineer.

We need to alter a high-throughput table [TABLE_NAME] with over [ROW_COUNT] rows in production without causing locks or application downtime.
Goal: [MIGRATION_GOAL]

Provide:
1. Reversible SQL migration script utilizing PostgreSQL 15+ best practices (\`CONCURRENTLY\`, lock timeouts, non-blocking constraints).
2. Step-by-step rollout plan (pre-deploy, deploy, post-deploy data backfill).
3. Fallback rollback script in case query latency spikes.
4. Monitoring queries to verify index build progress and table bloat.`,
        recommendedVariables: {
          TABLE_NAME: "orders",
          ROW_COUNT: "15,000,000",
          MIGRATION_GOAL: "Add user_uuid column, foreign key constraint to users table, and compound index on (tenant_id, created_at DESC)",
        },
        expectedOutputPreview: "Non-blocking PostgreSQL migration script with SET statement_timeout, CREATE INDEX CONCURRENTLY, and rollback safety procedures.",
      },
      {
        title: "Deterministic Asynchronous Retry Mechanism with Exponential Jitter",
        description: "Write a zero-dependency async wrapper supporting exponential backoff, jitter, and idempotency keys.",
        prompt: `Act as a Principal Node.js / Systems Engineer. Write a production-ready retry utility function \`executeWithRetry<T>()\` in TypeScript.

Specifications:
- Accepts a promise-returning function, maxRetries, baseDelayMs, maxDelayMs, and a retryableErrorPredicate.
- Implements full jitter (decorrelated or random exponential backoff) to avoid thundering herds.
- Logs structured debug telemetry on each attempt.
- Supports an optional AbortSignal for graceful shutdown and cancellation.
- Zero external runtime dependencies.`,
        recommendedVariables: {},
        expectedOutputPreview: "Clean, robust TypeScript retry implementation with full generic typing, abort signal listening, and mathematical jitter logic.",
      },
    ],
    faqs: [
      {
        question: "How do I make ChatGPT write better code?",
        answer: "Set your temperature to 0.2, provide concrete TypeScript interfaces, instruct it to handle edge cases explicitly, and specify 'do not write placeholder comments or truncated snippets'. Always ask it to review its own output for boundary conditions before finalizing.",
      },
      {
        question: "Is GPT-4o better than Claude 3.7 for coding?",
        answer: "GPT-4o excels in rapid scaffolding, multimodal screenshot-to-UI conversion, and Python data tasks via Code Interpreter. Claude 3.7 Sonnet is widely considered superior for large multi-file refactors, deep architectural reasoning, and strict codebase adherence.",
      },
      {
        question: "Can ChatGPT generate secure, production-ready code?",
        answer: "Yes, provided you prompt it with explicit security constraints (e.g., OWASP Top 10 mitigation, parameterized SQL queries, constant-time token comparisons, and input sanitization). Never push AI-generated code directly to production without automated tests and human peer review.",
      },
    ],
    relatedGuideSlugs: ["getting-started", "prompt-engineering-fundamentals", "advanced-techniques"],
    relatedCollectionSlugs: ["developer-starter-pack", "advanced-typescript-patterns", "backend-architecture"],
    relatedToolPaths: ["/tools/token-counter", "/tools/prompt-builder"],
    wikidataEntityIds: ["Q115564437", "Q115664402", "Q19399674"],
    updatedAt: "2026-11-01T00:00:00Z",
    publishedAt: "2026-11-01T00:00:00Z",
  },
  {
    id: "matrix-002",
    slug: "claude-prompts-for-software-architecture",
    modelId: "claude",
    categorySlug: "coding",
    title: "Claude Prompts for Software Architecture & System Design",
    seoTitle: "Claude Prompts for Software Architecture & System Design (2026)",
    seoDescription: "High-leverage Claude 3.7 Sonnet prompts for designing distributed systems, microservices boundaries, event-driven architectures, and ADR documentation.",
    heroTagline: "Deep architectural synthesis powered by Claude's 200,000-token contextual reasoning.",
    targetKeywords: [
      "claude prompts for software architecture",
      "claude system prompts for developers",
      "claude system design prompts",
      "claude prompts for software engineers",
      "software architecture prompt templates",
    ],
    summary: "Leverage Claude 3.7 Sonnet's 200k context window and nuanced system thinking to architect distributed systems, resolve trade-offs, and draft Architecture Decision Records (ADRs).",
    whyThisModelForThisPersona: [
      "Deep 200k token context accommodates entire API specifications, database schemas, and monolith codebases in a single prompt.",
      "Superior nuanced trade-off evaluation (CAP theorem, event consistency models, cost-performance curves).",
      "Exceptional structured output synthesis using XML tagging (<context>, <tradeoffs>, <recommendation>).",
      "Substantially lower hallucination rate on complex distributed systems protocols.",
    ],
    promptEngineeringPlaybook: {
      title: "System Architecture with Claude 3.7",
      description: "Best practices for extracting high-level system designs from Claude.",
      doList: [
        "Enclose architectural constraints inside <requirements> and <constraints> XML tags.",
        "Demand explicit trade-off matrices comparing 2-3 viable architectural patterns (e.g. Event-Sourcing vs CQRS vs CDC).",
        "Ask Claude to conduct a failure mode and effects analysis (FMEA) on every proposed component.",
        "Request concrete ASCII diagrams or Mermaid.js sequences for all distributed communication paths.",
      ],
      dontList: [
        "Don't ask for a 'scalable system' without defining concrete RPS, read/write ratios, SLA percentiles, and latency budgets.",
        "Don't skip failure scenarios—always demand partition tolerance and degraded mode behaviors.",
        "Don't allow Claude to ignore operational costs (compute, egress, storage tiering).",
        "Don't ask for generic cloud services; specify whether you are targeting AWS, GCP, Azure, or bare-metal Kubernetes.",
      ],
    },
    recommendedSettings: {
      temperature: "0.2 (Rigorous, deterministic architectural analysis)",
      topP: "0.9",
      maxTokens: "8192",
      modelVariant: "Claude 3.7 Sonnet (Thinking mode enabled)",
      systemPromptSnippet: "You are a Principal Enterprise Systems Architect. Evaluate all designs through the lens of fault isolation, graceful degradation, data consistency, and operational simplicity. Always contrast trade-offs explicitly.",
    },
    curatedPrompts: [
      {
        title: "Comprehensive Architecture Decision Record (ADR) Generator",
        description: "Draft an industry-standard ADR documenting context, alternatives evaluated, decision rationale, and migration risks.",
        prompt: `<system_instruction>
You are a Staff Technical Architect. Write an authoritative Architecture Decision Record (ADR) following the Michael Nygard format.
</system_instruction>

<context>
We are deciding on the architectural pattern for [SYSTEM_COMPONENT].
Current problem: [CURRENT_BOTTLENECK]
Scale requirements: [SCALE_METRICS]
Team capabilities: [TEAM_EXPERTISE]
</context>

<deliverables>
1. Title and Status (Proposed / Accepted)
2. Context and Problem Statement
3. Decision Drivers (Latency, Cost, Operational Complexity, Developer Velocity)
4. Considered Options (Analyze at least 3 distinct options with Pros & Cons)
5. Decision Outcome and Justification
6. Positive & Negative Consequences (including operational trade-offs)
7. Compliance, Security, and Observability Implications
</deliverables>`,
        recommendedVariables: {
          SYSTEM_COMPONENT: "Real-time Order Processing & Inventory Reservation Engine",
          CURRENT_BOTTLENECK: "Database row-level locking on inventory tables during flash sales causing checkout timeouts",
          SCALE_METRICS: "Peak 35,000 checkout attempts/sec, 99.99% availability SLA, sub-150ms p99 latency",
          TEAM_EXPERTISE: "Strong Node.js and PostgreSQL background, moderate Kafka and Redis experience",
        },
        expectedOutputPreview: "Exhaustive Michael Nygard ADR complete with evaluated alternatives, Redis reservation pattern decision, and rollback safeguards.",
      },
      {
        title: "Event-Driven Distributed Microservice Boundary Definition",
        description: "Decompose a monolithic domain into isolated microservices using Domain-Driven Design (DDD) bounded contexts.",
        prompt: `Act as a Domain-Driven Design (DDD) specialist and event-driven architect.

Analyze the following monolithic domain [DOMAIN_DESCRIPTION].
Define clean Bounded Contexts and design an event-driven architecture.

Provide:
1. Identified Bounded Contexts with clear responsibility boundaries.
2. Domain Events schema definitions (EventName, AggregateId, Payload, IdempotencyKey).
3. Outbox pattern implementation blueprint for guaranteed at-least-once delivery.
4. Mermaid.js flowchart showing asynchronous message flow over an event bus (Kafka / RabbitMQ).`,
        recommendedVariables: {
          DOMAIN_DESCRIPTION: "Multi-tenant B2B SaaS logistics platform handling shipment quotes, warehouse intake, courier dispatch, billing, and real-time GPS tracking.",
        },
        expectedOutputPreview: "DDD context boundary map, CloudEvents JSON payload structures, transactional outbox pattern architecture, and sequence diagram.",
      },
    ],
    faqs: [
      {
        question: "Why use Claude instead of other models for software architecture?",
        answer: "Claude's 200,000-token context window allows you to feed entire repository file trees, comprehensive OpenAPI specs, and database schemas at once. It also excels at balanced trade-off analysis without biased enthusiasm for single tech stacks.",
      },
      {
        question: "How do I format architecture prompts for Claude?",
        answer: "Use XML tags like <context>, <constraints>, <sla>, and <expected_output>. Claude is specifically trained to parse XML tags cleanly, isolating context from instructions to yield superior structured output.",
      },
    ],
    relatedGuideSlugs: ["system-architecture-prompts", "advanced-techniques"],
    relatedCollectionSlugs: ["backend-architecture", "developer-starter-pack"],
    relatedToolPaths: ["/tools/token-counter", "/tools/prompt-builder"],
    wikidataEntityIds: ["Q117188168", "Q118235287", "Q19399674"],
    updatedAt: "2026-11-01T00:00:00Z",
    publishedAt: "2026-11-01T00:00:00Z",
  },
  {
    id: "matrix-003",
    slug: "gemini-prompts-for-academic-research",
    modelId: "gemini",
    categorySlug: "research",
    title: "Google Gemini Prompts for Academic Research & Literature Reviews",
    seoTitle: "Google Gemini Prompts for Academic Research & Papers (2026)",
    seoDescription: "Leverage Gemini 2.5 Pro's 2M token context window to synthesize lengthy academic literature, audit methodology, and draft systematic review protocols.",
    heroTagline: "Harness 2,000,000-token multi-document context for groundbreaking research synthesis.",
    targetKeywords: [
      "gemini prompts for academic research",
      "google gemini research prompts",
      "gemini prompts for literature review",
      "academic research prompt engineering",
      "gemini 1.5 pro prompts for researchers",
    ],
    summary: "Harness Google Gemini 2.5 Pro's massive 2M-token context window to cross-reference dozens of research papers simultaneously, identify methodological flaws, and synthesize literature reviews.",
    whyThisModelForThisPersona: [
      "Industry-leading 2,000,000 token context window ingest entire textbook chapters, dissertations, and 50+ PDF research papers in one prompt.",
      "Native multimodal capabilities to parse complex graphs, scientific charts, gel electrophoresis images, and scan documents.",
      "Direct Google Search grounding integration for cross-referencing fresh academic preprints (arXiv, bioRxiv).",
      "Exceptional citation tracing and verbatim source attribution capabilities.",
    ],
    promptEngineeringPlaybook: {
      title: "Academic Research Protocol with Gemini",
      description: "How to extract rigorous academic synthesis without synthetic hallucinations.",
      doList: [
        "Upload raw paper PDFs or paste full text directly to take full advantage of the 2M context window.",
        "Instruct Gemini to quote exact page numbers or paragraph snippets when synthesizing claims.",
        "Demand explicit categorization of evidence hierarchy (Meta-analyses vs RCTs vs Observational vs In-vitro).",
        "Ask the model to challenge the null hypothesis and search for statistical p-hacking or sample size biases.",
      ],
      dontList: [
        "Never accept citations without verifying DOI links or Google Scholar presence.",
        "Don't ask Gemini to generate statistical analysis without providing the exact raw dataset.",
        "Don't rely on ungrounded prompts for emerging 2026 biomedical data—always enable search grounding.",
        "Don't use vague terms like 'summarize this'; specify PRISMA guidelines or systematic review protocols.",
      ],
    },
    recommendedSettings: {
      temperature: "0.1 (Strict academic adherence, minimal creativity)",
      topP: "0.9",
      maxTokens: "8192",
      modelVariant: "Gemini 2.5 Pro with Search Grounding",
      systemPromptSnippet: "You are an Academic Meta-Researcher and Biostatistician. Adhere strictly to PRISMA systematic review standards. Cite exact source passages. Flag confounding variables, low statistical power, and conflict of interest disclosures.",
    },
    curatedPrompts: [
      {
        title: "PRISMA Systematic Literature Review Synthesis Matrix",
        description: "Synthesize findings across multiple academic papers into a structured PRISMA comparative matrix.",
        prompt: `Act as a Senior Academic Researcher adhering to PRISMA (Preferred Reporting Items for Systematic Reviews and Meta-Analyses) guidelines.

Analyze the provided research papers on [TOPIC_OR_DOMAIN].

Produce a comprehensive Literature Synthesis Matrix with the following columns:
1. Citation & Year (Author, Year, Journal)
2. Study Design & Sample Size (n, cohort demographics, control conditions)
3. Primary Intervention / Independent Variable
4. Measured Outcomes & Key Effect Sizes (hazard ratios, Cohen's d, p-values, 95% CI)
5. Methodological Limitations & Risk of Bias (Cochrane RoB 2 criteria)
6. Consensus vs Dissent (How this finding aligns or contradicts prevailing literature)

Papers / Excerpts:
[ATTACHED_PAPERS_TEXT]`,
        recommendedVariables: {
          TOPIC_OR_DOMAIN: "Efficacy of GLP-1 receptor agonists on neurodegenerative biomarkers in mild cognitive impairment",
          ATTACHED_PAPERS_TEXT: "[Paste raw paper texts, methodology abstracts, or upload PDFs]",
        },
        expectedOutputPreview: "Structured Markdown table comparing sample sizes, effect sizes, Cochrane bias ratings, and synthesis narrative.",
      },
      {
        title: "Research Grant Proposal Defense & Stress Test",
        description: "Subject your research grant abstract to intense peer-reviewer scrutiny to identify critical vulnerabilities.",
        prompt: `Act as an adversarial NIH / NSF Grant Review Panel Chair. 

Critically review our research proposal abstract:
[PROPOSAL_ABSTRACT]

Identify:
1. The 3 biggest methodological vulnerabilities that could cause score downgrades.
2. Unaddressed confounding variables or alternative hypotheses.
3. Power calculation and statistical validity red flags.
4. Concrete revisions to strengthen the Significance, Innovation, and Approach sections.`,
        recommendedVariables: {
          PROPOSAL_ABSTRACT: "We propose investigating CRISPR-Cas9 epigenetic methylation silencing of oncogenic promoter regions in chemo-resistant glioblastoma cell lines...",
        },
        expectedOutputPreview: "Rigorous adversarial peer-review critique with line-by-line vulnerability assessment and revised grant narrative.",
      },
    ],
    faqs: [
      {
        question: "Can Gemini 2.5 Pro read an entire PhD dissertation?",
        answer: "Yes. With a context window exceeding 2 million tokens, Gemini 2.5 Pro can ingest multiple books, dozens of lengthy academic papers, or an entire dissertation in a single prompt and perform cross-document thematic synthesis.",
      },
      {
        question: "How do I prevent fake citations in Gemini research prompts?",
        answer: "Always provide the primary source text in your prompt or enable Google Search grounding. Explicitly instruct Gemini: 'Do not generate or extrapolate citations not present in the provided source material.'",
      },
    ],
    relatedGuideSlugs: ["academic-research-prompts", "prompt-engineering-fundamentals"],
    relatedCollectionSlugs: ["academic-research-accelerator", "productivity-power-pack"],
    relatedToolPaths: ["/tools/token-counter"],
    wikidataEntityIds: ["Q123689408", "Q95", "Q115664402"],
    updatedAt: "2026-11-01T00:00:00Z",
    publishedAt: "2026-11-01T00:00:00Z",
  },
  {
    id: "matrix-004",
    slug: "chatgpt-prompts-for-digital-marketing",
    modelId: "chatgpt",
    categorySlug: "marketing",
    title: "ChatGPT Prompts for Digital Marketing & Campaign Strategy",
    seoTitle: "ChatGPT Prompts for Digital Marketing & Growth Strategy (2026)",
    seoDescription: "High-converting ChatGPT prompts for paid ad copy, conversion funnel optimization, content calendars, and programmatic SEO campaign architecture.",
    heroTagline: "Data-driven marketing frameworks designed to multiply CTR, ROAS, and organic conversions.",
    targetKeywords: [
      "chatgpt prompts for digital marketing",
      "best marketing prompts for chatgpt",
      "chatgpt copywriting prompts",
      "chatgpt seo campaign prompts",
      "chatgpt ad copy prompts",
    ],
    summary: "Accelerate customer acquisition with performance-tuned ChatGPT prompts. Formulate multi-channel campaign briefs, write high-CTR paid search headlines, and optimize landing page conversion funnels.",
    whyThisModelForThisPersona: [
      "Exceptional capacity for tone shifting (from playful B2C hooks to authoritative enterprise B2B thought leadership).",
      "Mastery of proven copywriting frameworks (AIDA, PAS, BAB, FAB, Before-After-Bridge).",
      "Rapid creative ideation: generate 30 high-converting headline variations in seconds.",
      "Ability to analyze customer review datasets to extract voice-of-customer (VoC) pain points.",
    ],
    promptEngineeringPlaybook: {
      title: "Digital Marketing with GPT-4o",
      description: "How to engineer marketing copy that converts without sounding like generic AI.",
      doList: [
        "Feed real customer reviews, quotes, or support tickets to ground the copy in authentic Voice-of-Customer language.",
        "Specify exact character count limits for Google Ads (30 char headline, 90 char description) and Meta Ads.",
        "Define target buyer personas with specific pain triggers, desired transformations, and common objections.",
        "Enforce clear negative constraints: 'Avoid cliché words like delve, game-changer, unleash, tapestry, testament'.",
      ],
      dontList: [
        "Don't ask for generic 'marketing ideas'—provide product specs, unique value proposition, and competitor weaknesses.",
        "Don't publish unedited AI marketing copy; always inject human case studies and quantified metrics.",
        "Don't run single ad variations; demand 5-10 distinct angles (loss aversion, social proof, curiosity hook).",
        "Don't forget the primary Call To Action (CTA)—always define the exact user action desired.",
      ],
    },
    recommendedSettings: {
      temperature: "0.7 (Creative hooks and compelling angle variations)",
      topP: "0.95",
      maxTokens: "3500",
      modelVariant: "GPT-4o",
      systemPromptSnippet: "You are an Elite Direct Response Copywriter and Performance Marketing Strategist. Focus ruthlessly on customer emotional triggers, clear value propositions, and unambiguous calls to action. Never use fluffy clichés.",
    },
    curatedPrompts: [
      {
        title: "High-ROAS Meta Ads Creative Angles & Hook Generator",
        description: "Generate 5 distinct psychological hooks and primary text variations for Facebook and Instagram video/image ads.",
        prompt: `Act as a Senior Direct-Response Media Buyer and Copywriter. 

We are running Meta Ads for [PRODUCT_NAME].
Product description: [PRODUCT_DESCRIPTION]
Primary Customer Avatar: [TARGET_AVATAR]
Core Transformation: [TRANSFORMATION]
Price point / Offer: [OFFER_DETAILS]

Generate 5 distinct ad concepts based on these specific angles:
1. The 'Villain & Counter-Intuitive Truth' Angle
2. The 'Before-and-After Radical Transformation' Angle
3. The 'Direct Competitor Call-Out / Dissatisfaction' Angle
4. The 'Relatable Day-in-the-Life Struggle' Hook
5. The 'Urgent FOMO / Limited Window' Hook

For each angle provide:
- 3 Hook options (first 3 seconds video overlay or image header text)
- Primary text copy (125-150 words using PAS framework)
- Visual asset creative brief (what the video or UGC visual should show)
- High-converting Call To Action button label`,
        recommendedVariables: {
          PRODUCT_NAME: "SprintFlow AI Project Automator",
          PRODUCT_DESCRIPTION: "SaaS platform that syncs Jira tickets with GitHub PRs, generates release notes, and eliminates status update meetings",
          TARGET_AVATAR: "Overworked Engineering Managers and Technical Product Leads at Series A-B startups",
          TRANSFORMATION: "Reclaim 8 engineering hours per week spent on status syncs and documentation",
          OFFER_DETAILS: "14-day free trial, no credit card required, 1-click GitHub installation",
        },
        expectedOutputPreview: "Five detailed Meta ad creative briefs featuring psychological hooks, UGC storyboards, PAS copy, and CTA recommendations.",
      },
    ],
    faqs: [
      {
        question: "How do I make ChatGPT marketing copy sound human?",
        answer: "Ban common AI clichés (delve, elevate, game-changer, revolutionary, landscape). Feed it real customer reviews and ask it to write at a 7th-grade reading level using short, punchy sentences and active verbs.",
      },
      {
        question: "Can ChatGPT write compliant Google Search Ads?",
        answer: "Yes! Specify exact Google Ads constraints: 'Headlines strictly under 30 characters including spaces. Descriptions strictly under 90 characters. Include primary target keyword in Headline 1.'",
      },
    ],
    relatedGuideSlugs: ["getting-started", "prompt-engineering-fundamentals"],
    relatedCollectionSlugs: ["digital-marketing-roi-pack", "sales-outreach-engine"],
    relatedToolPaths: ["/tools/token-counter", "/tools/prompt-builder"],
    wikidataEntityIds: ["Q115564437", "Q39809", "Q115664402"],
    updatedAt: "2026-11-01T00:00:00Z",
    publishedAt: "2026-11-01T00:00:00Z",
  },
  {
    id: "matrix-005",
    slug: "claude-prompts-for-full-stack-development",
    modelId: "claude",
    categorySlug: "coding",
    title: "Claude Prompts for Full-Stack Web Development",
    seoTitle: "Claude Prompts for Full-Stack Web Development (Next.js & Node)",
    seoDescription: "Comprehensive Claude 3.7 Sonnet prompts for architecting end-to-end full-stack applications with Next.js 15, Server Actions, PostgreSQL, and Tailwind.",
    heroTagline: "Orchestrate flawless frontend-to-database workflows with Claude 3.7 Sonnet.",
    targetKeywords: [
      "claude prompts for full-stack development",
      "claude nextjs prompts",
      "claude prompts for web development",
      "full stack prompt engineering",
      "claude coding prompt templates",
    ],
    summary: "Bridge client components, server actions, authentication, and database schemas seamlessly. Claude 3.7 Sonnet maintains strict context across every tier of your full-stack web application.",
    whyThisModelForThisPersona: [
      "Flawless handling of Next.js 15 App Router nuances (Server Components vs Client Components, 'use client' boundaries).",
      "Strict type propagation from PostgreSQL/Prisma schemas up through Server Actions to React UI components.",
      "Deep awareness of security best practices (CSRF, XSS prevention, rate limiting, secure cookie flags).",
      "Clean adherence to modern UI component libraries (shadcn/ui, Tailwind CSS v4, Lucide icons).",
    ],
    promptEngineeringPlaybook: {
      title: "Full-Stack Development with Claude",
      description: "How to scaffold end-to-end features without architectural inconsistencies.",
      doList: [
        "Provide both the database schema (Prisma/Drizzle) and the target UI design in the same prompt.",
        "Instruct Claude to separate Server Actions into dedicated action files with 'use server' directives.",
        "Require comprehensive validation on both client (Zod React Hook Form) and server (safeParse in Server Action).",
        "Demand optimistic UI updates with React 19 useOptimistic where latency impacts user experience.",
      ],
      dontList: [
        "Don't mix Server Component data-fetching logic inside interactive 'use client' event handlers.",
        "Don't expose database IDs directly when UUIDs or public slug identifiers are required.",
        "Don't neglect loading states—always request Suspense fallbacks and skeleton loaders.",
        "Don't build forms without accessible ARIA attributes and keyboard navigation.",
      ],
    },
    recommendedSettings: {
      temperature: "0.2 (High precision across API and UI contracts)",
      topP: "0.95",
      maxTokens: "8192",
      modelVariant: "Claude 3.7 Sonnet",
      systemPromptSnippet: "You are a Principal Full-Stack Engineer specializing in Next.js 15, TypeScript, PostgreSQL, and Tailwind CSS. Build production-grade, accessible, and secure software. Never use 'any'. Enforce exhaustive type safety.",
    },
    curatedPrompts: [
      {
        title: "Complete End-to-End Feature: Server Action, Zod, and Optimistic UI",
        description: "Scaffold a full stack CRUD feature spanning database schema, validated server actions, and optimistic UI.",
        prompt: `Act as a Staff Full-Stack Engineer. Build a complete feature for [FEATURE_NAME] in Next.js 15 App Router.

Tech Stack:
- Next.js 15 (App Router, Server Actions)
- TypeScript 5.4+ (Strict mode, zero any)
- Prisma ORM with PostgreSQL
- Tailwind CSS & Lucide React
- React 19 hooks (\`useActionState\`, \`useOptimistic\`)

Provide:
1. Prisma Schema model definition with proper relational indices.
2. Zod validation schemas for input data and server response types.
3. Server Action (\`actions/[feature].ts\`) with authenticated user check, rate limiting hook, and database mutation.
4. Client Component form with inline validation, pending button state, and optimistic list rendering.`,
        recommendedVariables: {
          FEATURE_NAME: "Team Member Workspace Invite Management",
        },
        expectedOutputPreview: "Complete four-part code implementation with Prisma model, Zod schema, safe Server Action, and interactive React 19 component.",
      },
    ],
    faqs: [
      {
        question: "Can Claude build Next.js 15 Server Actions without errors?",
        answer: "Yes, when prompted with explicit framework versions. Always state 'Next.js 15 App Router with async headers() and Server Actions' to ensure it does not use obsolete Next.js 13/14 conventions.",
      },
    ],
    relatedGuideSlugs: ["getting-started", "system-architecture-prompts"],
    relatedCollectionSlugs: ["developer-starter-pack", "advanced-typescript-patterns"],
    relatedToolPaths: ["/tools/token-counter"],
    wikidataEntityIds: ["Q117188168", "Q110823377", "Q19399674"],
    updatedAt: "2026-11-01T00:00:00Z",
    publishedAt: "2026-11-01T00:00:00Z",
  },
  {
    id: "matrix-006",
    slug: "midjourney-prompts-for-architectural-rendering",
    modelId: "midjourney",
    categorySlug: "visual-art",
    title: "Midjourney Prompts for Architectural Rendering & Interior Design",
    seoTitle: "Midjourney Prompts for Architecture & Interior Design (v6.1)",
    seoDescription: "Master Midjourney v6.1 prompts for photorealistic architectural visualizations, parametric facades, biophilic interiors, and dusk elevation photography.",
    heroTagline: "Translate spatial visions into publication-ready architectural visualizations.",
    targetKeywords: [
      "midjourney prompts for architecture",
      "midjourney interior design prompts",
      "architectural rendering midjourney prompt",
      "midjourney v6 architecture photography",
      "midjourney exterior rendering prompts",
    ],
    summary: "Generate photorealistic architectural elevations, sustainable timber structures, and hyper-detailed interior concepts with calibrated Midjourney v6.1 parameters.",
    whyThisModelForThisPersona: [
      "Unmatched material texture reproduction (raw concrete brutalism, fluted glass, polished travertine, charred shou sugi ban timber).",
      "Physically accurate light simulation (golden hour dusk lighting, soft volumetric shadows, diffused skylights).",
      "Precision aspect ratio control (--ar 16:9, --ar 21:9 for wide panoramic architectural photography).",
      "Consistent lens and perspective emulation (tilt-shift architectural lens, 24mm wide angle, Hasselblad medium format).",
    ],
    promptEngineeringPlaybook: {
      title: "Architectural Visualization in Midjourney v6.1",
      description: "How to craft professional architectural imagery without artificial distortion.",
      doList: [
        "Specify exact architectural styles: 'Contemporary Scandinavian biophilic pavilion', 'Minimalist Tadao Ando raw concrete'.",
        "Detail lighting conditions: 'Dusk illumination, warm 2700k interior recessed lighting glowing through floor-to-ceiling glass'.",
        "Add real-world camera optics: 'Architectural photography, shot on Hasselblad H6D-100c, 24mm tilt-shift lens, straight vertical lines'.",
        "Use appropriate parameter flags: '--ar 16:9 --style raw --v 6.1'.",
      ],
      dontList: [
        "Avoid subjective buzzwords like 'hyperrealistic, photorealistic, 8k, trending on artstation' which degrade v6.1 output.",
        "Don't forget human scale indicators or natural landscaping (ornamental grasses, mature Japanese maple).",
        "Don't use fish-eye lenses unless intentionally designing 360-degree virtual tour spheres.",
      ],
    },
    recommendedSettings: {
      temperature: "Midjourney Stylize: --s 150 to 250",
      cliFlags: "--ar 16:9 --v 6.1 --style raw",
      modelVariant: "Midjourney v6.1",
    },
    curatedPrompts: [
      {
        title: "Minimalist Cantilevered Cliffside Pavilion at Dusk",
        description: "Striking residential architecture showcasing exposed structural steel, expansive glazing, and reflective water features.",
        prompt: `Architectural exterior photography of a minimalist cantilevered concrete and dark timber residential villa perched over a rugged coastal cliff at blue hour dusk. Floor-to-ceiling glass curtain walls with warm interior illumination casting reflections across an infinity reflecting pool. Surrounding native coastal pines, mist rising from ocean below. Shot on Hasselblad H6D-100c, 28mm architectural tilt-shift lens, straight vertical lines, atmospheric evening lighting, architectural digest editorial --ar 16:9 --style raw --v 6.1`,
        recommendedVariables: {},
        expectedOutputPreview: "Crisp architectural photograph featuring clean vertical lines, luminous dusk atmosphere, and tangible timber and concrete textures.",
      },
    ],
    faqs: [
      {
        question: "Why should I use --style raw in Midjourney architecture prompts?",
        answer: "--style raw reduces Midjourney's default stylized aesthetic embellishments, producing truer camera color rendering, sharper geometric fidelity, and realistic material textures necessary for architectural visualization.",
      },
    ],
    relatedGuideSlugs: ["midjourney-v6-mastery", "visual-prompt-crafting"],
    relatedCollectionSlugs: ["visual-art-creators-bundle"],
    relatedToolPaths: ["/tools/token-counter"],
    wikidataEntityIds: ["Q113163354"],
    updatedAt: "2026-11-01T00:00:00Z",
    publishedAt: "2026-11-01T00:00:00Z",
  },
  {
    id: "matrix-007",
    slug: "claude-prompts-for-code-debugging",
    modelId: "claude",
    categorySlug: "coding",
    title: "Claude Prompts for Code Debugging & Root Cause Analysis",
    seoTitle: "Claude Prompts for Code Debugging & Stack Trace Analysis (2026)",
    seoDescription: "Isolate race conditions, memory leaks, and cryptic stack traces using Claude 3.7 Sonnet's deep reasoning and root cause analysis prompts.",
    heroTagline: "Dissect complex runtime failures and eliminate bugs at the root cause level.",
    targetKeywords: [
      "claude prompts for code debugging",
      "claude debug prompt",
      "claude root cause analysis prompt",
      "debug code with claude 3.7",
      "claude stack trace prompt",
    ],
    summary: "Triage elusive production incidents, concurrent race conditions, and cryptic memory bloat. Claude 3.7 Sonnet identifies root causes and crafts surgical, regression-proof fixes.",
    whyThisModelForThisPersona: [
      "Exceptional sequential reasoning to trace execution state through asynchronous call stacks.",
      "Identifies subtle concurrency bugs, thread contention, and event-loop blocking.",
      "Writes deterministic regression test suites that prove the bug existed and verify the resolution.",
      "Explains the exact theoretical flaw that caused the failure, upskilling engineering teams.",
    ],
    promptEngineeringPlaybook: {
      title: "Root Cause Debugging with Claude",
      description: "Structured protocol for diagnosing complex multi-tier failures.",
      doList: [
        "Include the full stack trace, environment details, and configuration flags.",
        "Provide both the broken code snippet and the exact observed vs expected behavior.",
        "Ask Claude to generate a minimal reproducible example (MRE) to isolate the failure.",
        "Demand a regression test written in Vitest/Jest/PyTest that fails before the patch and passes after.",
      ],
      dontList: [
        "Don't provide truncated stack traces without error codes and file line numbers.",
        "Don't accept quick patches that suppress error types or wrap everything in generic try-catch blocks.",
        "Don't guess at environment variables—provide exact Node/Python/Go version specifications.",
      ],
    },
    recommendedSettings: {
      temperature: "0.1 (Strict deterministic troubleshooting)",
      topP: "0.9",
      maxTokens: "6000",
      modelVariant: "Claude 3.7 Sonnet (Thinking mode)",
      systemPromptSnippet: "You are a Principal Reliability and Systems Debugging Specialist. Perform a rigorous root-cause analysis (RCA). Identify the underlying design flaw rather than merely masking symptoms. Provide a robust regression test.",
    },
    curatedPrompts: [
      {
        title: "Production Incident Root Cause Analysis (RCA) & Hotfix",
        description: "Analyze a complex runtime error log, diagnose the root cause, and produce an immediate safe patch and regression test.",
        prompt: `Act as a Staff Site Reliability Engineer and Principal Debugger.

We encountered an incident in production. Analyze the following details:
<error_log>
[PASTE_ERROR_LOG_AND_STACK_TRACE]
</error_log>

<relevant_code>
[PASTE_RELEVANT_CODE_MODULE]
</relevant_code>

<environment>
Runtime: [RUNTIME_AND_VERSION]
Database / External Services: [DEPENDENCIES]
</environment>

Provide:
1. Root Cause Analysis: Exactly what sequence of events and state mutations caused this failure.
2. Immediate Minimal Hotfix: A surgical patch modifying only what is strictly necessary to resolve the crash.
3. Long-term Architectural Solution: How to structurally prevent this class of bug from reoccurring.
4. Regression Test: A unit or integration test reproducing this exact scenario to prevent regressions.`,
        recommendedVariables: {
          RUNTIME_AND_VERSION: "Node.js 20.x on AWS ECS Fargate",
          DEPENDENCIES: "PostgreSQL 16, Redis 7.2 cluster",
        },
        expectedOutputPreview: "Clear 4-step RCA report detailing asynchronous state corruption, surgical hotfix diff, and automated test reproduction.",
      },
    ],
    faqs: [
      {
        question: "Can Claude find memory leaks in JavaScript or Python?",
        answer: "Yes. Feed Claude memory heap profile summaries, garbage collection telemetry, or circular reference patterns, and Claude can highlight unreleased event listeners, detached DOM nodes, and closure retention chains.",
      },
    ],
    relatedGuideSlugs: ["getting-started", "prompt-engineering-fundamentals"],
    relatedCollectionSlugs: ["developer-starter-pack", "backend-architecture"],
    relatedToolPaths: ["/tools/token-counter"],
    wikidataEntityIds: ["Q117188168", "Q118235287"],
    updatedAt: "2026-11-01T00:00:00Z",
    publishedAt: "2026-11-01T00:00:00Z",
  },
  {
    id: "matrix-008",
    slug: "chatgpt-prompts-for-resume-writing",
    modelId: "chatgpt",
    categorySlug: "resume",
    title: "ChatGPT Prompts for Resume Writing & ATS Optimization",
    seoTitle: "ChatGPT Prompts for Resume Writing & ATS Optimization (2026)",
    seoDescription: "Transform weak bullet points into quantified impact statements. ChatGPT prompts engineered to pass ATS filters and land Tier-1 interviews.",
    heroTagline: "Turn passive job duties into quantified, high-impact career achievements.",
    targetKeywords: [
      "chatgpt prompts for resume writing",
      "chatgpt resume prompts",
      "best prompts for resume chatgpt",
      "ats resume chatgpt prompt",
      "chatgpt bullet points resume",
    ],
    summary: "Re-engineer your resume to pass automated Applicant Tracking Systems (ATS) and captivate hiring managers. Convert passive job descriptions into quantified accomplishments using Google's X-Y-Z formula.",
    whyThisModelForThisPersona: [
      "Expertise in Google's X-Y-Z resume formula: 'Accomplished [X], as measured by [Y], by doing [Z]'.",
      "Deep understanding of ATS keyword scanning algorithms (Workday, Greenhouse, Lever).",
      "Ability to tailor a generic CV against an exact target job description in seconds.",
      "Eliminates empty corporate jargon and replaces it with high-impact action verbs.",
    ],
    promptEngineeringPlaybook: {
      title: "Executive Resume Engineering with ChatGPT",
      description: "How to craft compelling resume bullets that trigger recruiter outreach.",
      doList: [
        "Paste the exact target job description alongside your existing resume bullet points.",
        "Instruct ChatGPT to quantify every metric (revenue %, latency ms, headcount, budget saved).",
        "Enforce active power verbs (Architected, Spearheaded, Accelerated, Eliminated).",
        "Keep bullets under 2 lines for human visual scanning ease.",
      ],
      dontList: [
        "Don't invent fictional metrics or company credentials—prompt it to ask you for real data.",
        "Don't include a fluffy 'Objective Statement'; replace it with a hard-hitting 3-line Executive Summary.",
        "Don't use fancy graphical columns or tables that scramble ATS parsers.",
      ],
    },
    recommendedSettings: {
      temperature: "0.4 (Compelling executive language while adhering strictly to facts)",
      topP: "0.9",
      maxTokens: "3000",
      modelVariant: "GPT-4o",
      systemPromptSnippet: "You are a Fortune 500 Executive Recruiter and Resume Strategist. Rewrite bullet points using Google's XYZ formula: 'Accomplished [X] as measured by [Y] by doing [Z]'. Eliminate corporate filler.",
    },
    curatedPrompts: [
      {
        title: "Google X-Y-Z Formula Bullet Point Transformation",
        description: "Transform 5 passive duty descriptions into high-impact, metric-driven achievement bullets.",
        prompt: `Act as a Silicon Valley Executive Tech Recruiter.

Rewrite these 5 weak job duty bullet points into high-impact, quantified achievement statements using Google's XYZ formula:
'Accomplished [X], as measured by [Y], by doing [Z]'.

Target Role: [TARGET_ROLE_TITLE]
Target Industry: [INDUSTRY]

Draft Bullets:
[PASTE_DRAFT_BULLETS]

For each bullet:
1. Provide the transformed high-impact bullet.
2. Highlight the exact metric placeholder [e.g., $X revenue, Y% latency reduction] so I can plug in real numbers.
3. List the high-value ATS keywords embedded in the rewrite.`,
        recommendedVariables: {
          TARGET_ROLE_TITLE: "Senior Staff Product Manager",
          INDUSTRY: "Fintech & B2B Payments",
          PASTE_DRAFT_BULLETS: "- Responsible for managing checkout flow\n- Handled team meetings and Jira backlog\n- Worked with design to update user dashboard\n- Helped reduce customer churn",
        },
        expectedOutputPreview: "Five transformed, high-impact resume bullets with quantified placeholders and embedded ATS keywords.",
      },
    ],
    faqs: [
      {
        question: "Will recruiters know I used ChatGPT to write my resume?",
        answer: "Only if you use unedited generic outputs full of clichés like 'spearheaded strategic synergies'. If you calibrate ChatGPT with the XYZ formula and insert your actual verified metrics, it reads as clear, executive-grade writing.",
      },
    ],
    relatedGuideSlugs: ["getting-started", "prompt-engineering-fundamentals"],
    relatedCollectionSlugs: ["productivity-power-pack"],
    relatedToolPaths: ["/tools/token-counter", "/tools/prompt-builder"],
    wikidataEntityIds: ["Q115564437", "Q115664402"],
    updatedAt: "2026-11-01T00:00:00Z",
    publishedAt: "2026-11-01T00:00:00Z",
  },
  {
    id: "matrix-009",
    slug: "claude-prompts-for-code-review",
    modelId: "claude",
    categorySlug: "coding",
    title: "Claude Prompts for Code Review & Security Audits",
    seoTitle: "Claude Prompts for Code Review & Security Audits (2026)",
    seoDescription: "Automate rigorous pull request code reviews with Claude 3.7 Sonnet. Catch security vulnerabilities, performance anti-patterns, and edge cases.",
    heroTagline: "Deploy a virtual Staff Engineer on every pull request to guarantee code quality.",
    targetKeywords: [
      "claude prompts for code review",
      "claude pull request review prompt",
      "claude code security audit prompt",
      "ai code review prompts",
      "claude 3.7 code analysis",
    ],
    summary: "Transform pull request workflows by having Claude 3.7 Sonnet perform comprehensive code reviews covering OWASP Top 10 vulnerabilities, algorithmic complexity, and type soundness.",
    whyThisModelForThisPersona: [
      "Rigorous inspection of multi-file diffs without losing architectural context.",
      "Identifies edge-case memory leaks, unhandled promise rejections, and SQL injections.",
      "Provides actionable, constructive code comments with ready-to-merge git diff snippets.",
      "Enforces company-specific style guidelines and architectural standards.",
    ],
    promptEngineeringPlaybook: {
      title: "Automated PR Review with Claude",
      description: "Structured code review protocol for high-velocity software teams.",
      doList: [
        "Feed git unified diff output (\`git diff main...feature\`) directly into the prompt.",
        "Categorize findings by severity: Critical (P0), High (P1), Medium (P2), Low/Nit (P3).",
        "Demand ready-to-apply replacement code blocks for every reported issue.",
        "Include positive feedback for clean patterns and elegant implementations.",
      ],
      dontList: [
        "Don't review code without knowing the project's framework versions and coding conventions.",
        "Don't generate nitpicks on formatting if an automated linter (Prettier/Biome) handles it.",
      ],
    },
    recommendedSettings: {
      temperature: "0.15 (High rigor, low tolerance for stylistic deviation)",
      topP: "0.95",
      maxTokens: "8192",
      modelVariant: "Claude 3.7 Sonnet",
      systemPromptSnippet: "You are a Principal Security Auditor and Staff Code Reviewer. Audit pull requests for security vulnerabilities, concurrency flaws, performance bottlenecks, and architectural regressions. Provide severity ratings.",
    },
    curatedPrompts: [
      {
        title: "Pull Request Automated Code Review & Security Audit",
        description: "Submit a raw git diff and receive an exhaustive, categorized code review with security vulnerability checks.",
        prompt: `Act as a Staff Security Engineer and Principal Code Reviewer.

Audit the following Pull Request Git Diff:
<git_diff>
[PASTE_GIT_DIFF_HERE]
</git_diff>

Review criteria:
1. Security Vulnerabilities (OWASP Top 10, Auth bypass, IDOR, SQLi, ReDoS, prototype pollution)
2. Performance & Scalability (N+1 queries, unindexed lookups, memory bloat, unthrottled loops)
3. Error Handling & Edge Cases (null/undefined safety, network failures, race conditions)
4. TypeScript & Typing Soundness (any leakage, unsafe casting, unhandled union variants)

Format your output as:
- Executive Summary (Merge recommendation: Approve / Request Changes / Block)
- Findings Table (Severity [P0-P3], File & Line, Issue, Recommended Fix)
- Actionable Code Diffs for each P0 and P1 item`,
        recommendedVariables: {},
        expectedOutputPreview: "Professional PR audit report with severity tags, architectural commentary, and copy-ready git diff patches.",
      },
    ],
    faqs: [
      {
        question: "Can Claude review entire GitHub pull requests automatically?",
        answer: "Yes, by integrating Claude into GitHub Actions via Anthropic's API or Claude Code CLI. It can parse git diffs and post comments directly on pull request lines.",
      },
    ],
    relatedGuideSlugs: ["system-architecture-prompts", "getting-started"],
    relatedCollectionSlugs: ["developer-starter-pack", "backend-architecture"],
    relatedToolPaths: ["/tools/token-counter"],
    wikidataEntityIds: ["Q117188168", "Q118235287"],
    updatedAt: "2026-11-01T00:00:00Z",
    publishedAt: "2026-11-01T00:00:00Z",
  },
  {
    id: "matrix-010",
    slug: "gemini-prompts-for-content-creators",
    modelId: "gemini",
    categorySlug: "content-creation",
    title: "Google Gemini Prompts for Content Creators & Media Production",
    seoTitle: "Google Gemini Prompts for Content Creators & Video Scripts (2026)",
    seoDescription: "Supercharge your YouTube scripts, TikTok concepts, podcast storyboards, and editorial calendars using Google Gemini 2.5 Pro.",
    heroTagline: "From high-retention video hooks to viral multimedia scripts in minutes.",
    targetKeywords: [
      "gemini prompts for content creators",
      "google gemini youtube script prompts",
      "gemini content creation prompts",
      "gemini prompts for viral hooks",
      "video script prompts gemini",
    ],
    summary: "Plan, script, and storyboard compelling multimedia content. Google Gemini's multimodal understanding and real-time trend grounding help creators craft high-retention videos and viral narratives.",
    whyThisModelForThisPersona: [
      "Deep understanding of video retention pacing (first 5-second hook, open loops, mid-video re-engagement).",
      "Multimodal analysis: upload raw video clips or competitor thumbnails to analyze retention and visual framing.",
      "Real-time Google search grounding to incorporate trending cultural moments and breaking news.",
      "Fluid voice modulation from witty YouTube video essays to punchy short-form TikTok pacing.",
    ],
    promptEngineeringPlaybook: {
      title: "Content Strategy with Gemini 2.5",
      description: "How to engineer high-retention video scripts that keep viewers hooked.",
      doList: [
        "Specify the exact target platform (YouTube long-form, TikTok, Instagram Reels, LinkedIn Carousel).",
        "Define target average view duration (AVD) goals and audience demographics.",
        "Script visual cues (B-roll descriptions, on-screen text, sound effects) alongside spoken audio.",
        "Use open loops at the 30-second mark to prevent viewer drop-off.",
      ],
      dontList: [
        "Don't start videos with 'Hey guys, welcome back to my channel'—jump immediately into the curiosity trigger.",
        "Don't write scripts as continuous walls of text; always split into dual columns (Visual vs Audio).",
      ],
    },
    recommendedSettings: {
      temperature: "0.75 (Vibrant storytelling and creative metaphors)",
      topP: "0.95",
      maxTokens: "5000",
      modelVariant: "Gemini 2.5 Pro with Search Grounding",
      systemPromptSnippet: "You are a Viral Content Strategist and YouTube Retention Director. Write punchy, curiosity-driven scripts with synchronized B-roll directions, sound design cues, and psychological open loops.",
    },
    curatedPrompts: [
      {
        title: "High-Retention 10-Minute YouTube Video Essay Script",
        description: "Generate a dual-column YouTube script complete with psychological hooks, B-roll cues, and narrative climax.",
        prompt: `Act as a Top 1% YouTube Retention Editor and Documentary Scriptwriter (in the style of Johnny Harris, Veritasium, or Cleo Abram).

Topic: [VIDEO_TOPIC]
Target Audience: [TARGET_AUDIENCE]
Primary Thesis / Twist: [CORE_THESIS]

Write a complete production script for the first 3 minutes (The Hook, The Stakes, The Open Loop):
Format as a two-column markdown table:
- Left Column: [Visual & Sound Design]: Exact B-roll instructions, stock footage keywords, on-screen text animations, sound effect (SFX) cues.
- Right Column: [Spoken Audio / Voiceover]: Word-for-word spoken dialogue with bolded inflection cues and pacing pauses.`,
        recommendedVariables: {
          VIDEO_TOPIC: "How TSMC and ASML Secretly Built the Most Dangerous Monopoly on Earth",
          TARGET_AUDIENCE: "Tech enthusiasts, finance professionals, and geopolitics nerds aged 22-45",
          CORE_THESIS: "A single extreme ultraviolet lithography mirror failure in the Netherlands can halt global AI progress overnight.",
        },
        expectedOutputPreview: "Dual-column production script with cinematic pacing, precise B-roll cues, and psychological tension loops.",
      },
    ],
    faqs: [
      {
        question: "Can Gemini evaluate my YouTube thumbnail ideas?",
        answer: "Yes! Upload your draft thumbnail images directly into Gemini 2.5 Pro and prompt it: 'Analyze this thumbnail for visual hierarchy, emotional curiosity, text readability on mobile screens, and contrast ratio.'",
      },
    ],
    relatedGuideSlugs: ["getting-started", "prompt-engineering-fundamentals"],
    relatedCollectionSlugs: ["productivity-power-pack"],
    relatedToolPaths: ["/tools/token-counter"],
    wikidataEntityIds: ["Q123689408", "Q95"],
    updatedAt: "2026-11-01T00:00:00Z",
    publishedAt: "2026-11-01T00:00:00Z",
  },
  {
    id: "matrix-011",
    slug: "midjourney-prompts-for-product-photography",
    modelId: "midjourney",
    categorySlug: "visual-art",
    title: "Midjourney Prompts for Commercial Product Photography",
    seoTitle: "Midjourney Prompts for Commercial Product Photography (v6.1)",
    seoDescription: "Generate studio-lit, high-converting commercial product shots for e-commerce, luxury packaging, cosmetics, and tech hardware with Midjourney v6.1.",
    heroTagline: "Studio-grade commercial product rendering without expensive studio gear.",
    targetKeywords: [
      "midjourney prompts for product photography",
      "commercial product photography midjourney",
      "midjourney ecommerce product photos",
      "product rendering midjourney v6",
      "midjourney studio lighting prompt",
    ],
    summary: "Elevate e-commerce stores, ad creatives, and luxury packaging designs with commercial studio product photography generated in Midjourney v6.1.",
    whyThisModelForThisPersona: [
      "Hyper-realistic reflection physics across glass, brushed aluminum, matte ceramics, and liquids.",
      "Studio lighting emulation (softbox diffusers, rim lighting, dramatic caustics, floating podium setups).",
      "Seamless integration with commercial packaging mockups.",
      "Exceptional detail on macro close-ups (water droplets on frosted glass, embossed foil typography).",
    ],
    promptEngineeringPlaybook: {
      title: "Commercial Product Photography in v6.1",
      description: "How to craft clean, sellable e-commerce imagery.",
      doList: [
        "Specify the exact background environment: 'Minimalist stone podium', 'Soft pastel gradient studio backdrop', 'Monstera leaf shadows'.",
        "Detail the lighting setup: 'Dual softbox studio lighting, subtle rim light highlighting bottle contours, dramatic water caustics'.",
        "Include camera optical specs: 'Commercial product photography, 85mm f/2.8 macro lens, crisp focal plane, depth of field'.",
        "Use parameters: '--ar 1:1 or --ar 4:5 --style raw --v 6.1'.",
      ],
      dontList: [
        "Don't clutter the composition with distracting props that steal focus from the hero product.",
        "Don't use low stylize values for luxury items—use --s 200 for refined surface reflections.",
      ],
    },
    recommendedSettings: {
      temperature: "Midjourney Stylize: --s 200",
      cliFlags: "--ar 4:5 --style raw --v 6.1",
      modelVariant: "Midjourney v6.1",
    },
    curatedPrompts: [
      {
        title: "Luxury Skincare Serum Bottle on Wet Slate Podium",
        description: "High-end commercial cosmetic product shot featuring frosted amber glass, botanical accents, and caustics.",
        prompt: `Commercial luxury cosmetic product photography of a minimalist frosted amber dropper bottle on a raw dark slate wet stone pedestal. Subtle water droplets clinging to the glass surface, gentle ripples in shallow water below. Soft warm 3200k rim lighting, diffused overhead softbox, blurred olive branch leaves in background. Shot on Hasselblad H6D-100c with 100mm macro lens, tack-sharp focal detail on bottle label, editorial beauty magazine quality --ar 4:5 --style raw --v 6.1`,
        recommendedVariables: {},
        expectedOutputPreview: "Flawless commercial cosmetic photograph with rich amber reflections, crisp macro water beads, and luxury brand aesthetic.",
      },
    ],
    faqs: [
      {
        question: "Can Midjourney render readable product labels?",
        answer: "Midjourney v6.1 can render short words inside quotation marks (e.g. 'LUMEN', 'AURA'). For complex ingredient lists and barcodes, generate the clean mockups in Midjourney and overlay vector typography in Figma or Photoshop.",
      },
    ],
    relatedGuideSlugs: ["midjourney-v6-mastery", "visual-prompt-crafting"],
    relatedCollectionSlugs: ["visual-art-creators-bundle"],
    relatedToolPaths: ["/tools/token-counter"],
    wikidataEntityIds: ["Q113163354"],
    updatedAt: "2026-11-01T00:00:00Z",
    publishedAt: "2026-11-01T00:00:00Z",
  },
  {
    id: "matrix-012",
    slug: "chatgpt-prompts-for-sales-outreach",
    modelId: "chatgpt",
    categorySlug: "sales",
    title: "ChatGPT Prompts for B2B Sales Outreach & Cold Email",
    seoTitle: "ChatGPT Prompts for B2B Sales Outreach & Cold Email (2026)",
    seoDescription: "Personalized cold emails, LinkedIn connection sequences, and objection handling scripts that convert prospects into booked discovery calls.",
    heroTagline: "Cold outreach engineered to spark conversations, not spam complaints.",
    targetKeywords: [
      "chatgpt prompts for sales outreach",
      "chatgpt cold email prompts",
      "b2b sales prompts chatgpt",
      "chatgpt sales prospecting",
      "cold outreach prompt templates",
    ],
    summary: "Break through executive inboxes. Deploy hyper-personalized B2B cold email sequences, LinkedIn touchpoints, and phone objection handlers that book qualified pipeline.",
    whyThisModelForThisPersona: [
      "Masters brevity: writes cold emails under 75 words that look like genuine peer-to-peer messages.",
      "Incorporates specific prospect trigger events (funding rounds, executive hires, tech stack shifts).",
      "Formulates low-friction, interest-based calls to action ('Open to exploring?' vs 'Book a 45-min demo').",
      "Creates multi-touch follow-up cadences that provide incremental value instead of 'just checking in'.",
    ],
    promptEngineeringPlaybook: {
      title: "B2B Outreach Playbook with GPT-4o",
      description: "How to generate cold outreach that executives actually reply to.",
      doList: [
        "Keep the total email body between 50 and 85 words. Executives read on mobile devices.",
        "Anchor the first sentence to an undeniable prospect trigger event or observation.",
        "Use an interest-based call to action rather than demanding time on their calendar.",
        "Provide zero attachments and zero corporate brochure speak.",
      ],
      dontList: [
        "Never begin with 'I hope this email finds you well' or 'My name is X and I work at Y'.",
        "Don't pitch features in email 1—pitch the conversation around a specific business headache.",
        "Don't send 5 generic 'just bumping this' follow-ups. Each touch must introduce new insight.",
      ],
    },
    recommendedSettings: {
      temperature: "0.5 (Natural conversational human tone)",
      topP: "0.9",
      maxTokens: "2000",
      modelVariant: "GPT-4o",
      systemPromptSnippet: "You are an Elite B2B Enterprise Account Executive. Write punchy, hyper-personalized cold outreach under 80 words. Never use corporate buzzwords. Focus on high-relevance problem-solving and low-friction CTAs.",
    },
    curatedPrompts: [
      {
        title: "3-Touch Trigger-Based Cold Outreach Cadence",
        description: "Generate a personalized 3-step outbound email cadence tied to a real company trigger event.",
        prompt: `Act as a Top 1% Enterprise B2B SaaS Sales Specialist.

We are reaching out to [PROSPECT_TITLE] at [PROSPECT_COMPANY].
Trigger Event: [TRIGGER_EVENT]
Our Solution: [VALUE_PROPOSITION]
Specific Pain Point: [PAIN_POINT]

Write a 3-touch outbound sequence:
1. Touch 1 (Day 1): Hyper-personalized cold email (strictly under 75 words). Hook on the trigger event, state the single core problem, end with a low-friction interest CTA.
2. Touch 2 (Day 4): Value-add follow-up sharing a concise 1-sentence benchmark observation or data point.
3. Touch 3 (Day 9): Clean, respectful break-up / permission to close file email.`,
        recommendedVariables: {
          PROSPECT_TITLE: "VP of Engineering",
          PROSPECT_COMPANY: "Acme Logistics",
          TRIGGER_EVENT: "Recently expanded engineering team by 40 engineers following Series B funding",
          VALUE_PROPOSITION: "Cut CI/CD pipeline build times by 62% using automated distributed caching",
          PAIN_POINT: "Developers waiting 35+ minutes per pull request run, stalling daily releases",
        },
        expectedOutputPreview: "Three tight, highly targeted B2B cold emails with mobile-friendly formatting and conversational CTAs.",
      },
    ],
    faqs: [
      {
        question: "What is the best length for a ChatGPT cold email?",
        answer: "Between 50 and 75 words. Research across millions of outbound sales emails demonstrates that response rates drop dramatically once emails exceed 100 words. Keep it mobile-scannable.",
      },
    ],
    relatedGuideSlugs: ["getting-started", "prompt-engineering-fundamentals"],
    relatedCollectionSlugs: ["sales-outreach-engine", "digital-marketing-roi-pack"],
    relatedToolPaths: ["/tools/token-counter", "/tools/prompt-builder"],
    wikidataEntityIds: ["Q115564437", "Q115664402"],
    updatedAt: "2026-11-01T00:00:00Z",
    publishedAt: "2026-11-01T00:00:00Z",
  },
  {
    id: "matrix-013",
    slug: "flux-prompts-for-photorealistic-portraits",
    modelId: "flux",
    categorySlug: "visual-art",
    title: "FLUX.1 Prompts for Photorealistic Human Portraits",
    seoTitle: "FLUX.1 Prompts for Photorealistic Human Portraits (2026)",
    seoDescription: "Master Black Forest Labs' FLUX.1 model prompts for lifelike human skin textures, cinematic lighting, eye reflections, and natural expressions.",
    heroTagline: "Generate indistinguishable photorealistic human portraits with FLUX.1.",
    targetKeywords: [
      "flux prompts for photorealistic portraits",
      "flux.1 portrait prompts",
      "flux ai photo prompt engineering",
      "black forest labs flux prompts",
      "photorealistic human portrait prompt",
    ],
    summary: "Unlock next-generation visual fidelity with FLUX.1. Create hyper-realistic portraits with authentic skin micro-textures, true anatomical hands, and natural eye reflections.",
    whyThisModelForThisPersona: [
      "State-of-the-art anatomy and finger generation, eliminating classic AI visual defects.",
      "Subtle, realistic micro-textures: pores, freckles, peach fuzz, and natural sub-surface scattering.",
      "Superior prompt adherence to complex clothing materials, jewelry, and hairstyles.",
      "Open-weights architecture enabling local, private, and uncensored fine-tuning.",
    ],
    promptEngineeringPlaybook: {
      title: "Portrait Generation with FLUX.1",
      description: "How to extract authentic photographic portraits from FLUX.1.",
      doList: [
        "Describe real photographic lighting: 'Rembrandt studio lighting, 45-degree key light with subtle fill, catchlights in the pupils'.",
        "Specify genuine camera optics: '35mm portrait photography, shot on Sony A7R V with 85mm f/1.4 GM lens'.",
        "Add natural human imperfections: 'subtle laugh lines, natural skin texture, visible pores, unstyled hair strands'.",
      ],
      dontList: [
        "Avoid artificial 'airbrushed, porcelain skin, plastic look' adjectives.",
        "Don't stack dozens of contradictory artist names—FLUX.1 prefers direct descriptive language.",
      ],
    },
    recommendedSettings: {
      temperature: "Guidance Scale: 3.5 (FLUX.1 optimal prompt adherence)",
      modelVariant: "FLUX.1 [dev] or FLUX.1 [pro]",
      cliFlags: "--steps 28 --guidance 3.5",
    },
    curatedPrompts: [
      {
        title: "Intimate Editorial Golden Hour Street Portrait",
        description: "Atmospheric, cinema-grade street portrait highlighting natural golden hour lighting and authentic facial textures.",
        prompt: `An intimate candid street portrait of a 32-year-old Scandinavian architect in Copenhagen during autumn golden hour. Warm low-angle sunlight hitting the side of her face, illuminating natural skin texture, subtle freckles across the bridge of her nose, and stray wisps of windblown hair. Wearing a structured charcoal wool turtleneck and discreet tortoiseshell spectacles. Shot on Leica M11 with Summilux-M 50mm f/1.4 lens, shallow depth of field, warm cinematic color grading, Kodak Portra 400 film grain, genuine relaxed expression, tack-sharp eye focus with natural catchlight reflections.`,
        recommendedVariables: {},
        expectedOutputPreview: "Photorealistic portrait indistinguishable from a genuine Leica 35mm film photograph, featuring organic skin textures.",
      },
    ],
    faqs: [
      {
        question: "Why does FLUX.1 produce more realistic skin than Midjourney?",
        answer: "FLUX.1 excels at sub-surface scattering and micro-pore distribution without Midjourney's default stylized sharpening pass, resulting in soft, organic skin tones rather than an AI-generated sheen.",
      },
    ],
    relatedGuideSlugs: ["visual-prompt-crafting", "getting-started"],
    relatedCollectionSlugs: ["visual-art-creators-bundle"],
    relatedToolPaths: ["/tools/token-counter"],
    wikidataEntityIds: ["Q115664402"],
    updatedAt: "2026-11-01T00:00:00Z",
    publishedAt: "2026-11-01T00:00:00Z",
  },
  {
    id: "matrix-014",
    slug: "chatgpt-prompts-for-job-interviews",
    modelId: "chatgpt",
    categorySlug: "job-interview",
    title: "ChatGPT Prompts for Job Interview Preparation & Mock Panels",
    seoTitle: "ChatGPT Prompts for Job Interview Prep & Mock Panels (2026)",
    seoDescription: "Interactive ChatGPT mock interview prompts. Practice tough behavioral questions, system design panels, and compensation negotiation scenarios.",
    heroTagline: "Simulate rigorous executive interview panels before your real interview.",
    targetKeywords: [
      "chatgpt prompts for job interviews",
      "chatgpt mock interview prompt",
      "behavioral interview prompt chatgpt",
      "job interview prep chatgpt",
      "chatgpt star method prompts",
    ],
    summary: "Walk into high-stakes interviews with complete confidence. Turn ChatGPT into an adversarial interviewer that grills you on behavioral STAR stories, technical system design, and salary negotiations.",
    whyThisModelForThisPersona: [
      "Dynamic interactive roleplay: responds to your answers one by one with critical follow-up questions.",
      "Expert knowledge of behavioral frameworks (STAR: Situation, Task, Action, Result).",
      "Deep familiarity with Big Tech and Fortune 500 hiring rubrics (Amazon Leadership Principles, Google Googlyness).",
      "Provides actionable, real-time feedback on your clarity, executive presence, and answer conciseness.",
    ],
    promptEngineeringPlaybook: {
      title: "Interactive Interview Simulation with GPT-4o",
      description: "How to set up an authentic mock interview session.",
      doList: [
        "Instruct ChatGPT: 'Ask me only ONE question at a time. Wait for my response before evaluating and asking the next'.",
        "Give it the exact job description and company background.",
        "Instruct it to adopt a rigorous, challenging persona that does not settle for vague answers.",
        "Request a rubric score (1 to 5) after each answer with specific suggestions for improvement.",
      ],
      dontList: [
        "Don't let the model output a list of 10 questions at once—interactive back-and-forth simulates reality.",
        "Don't give ChatGPT ideal hypothetical answers—practice answering in your own natural speaking voice.",
      ],
    },
    recommendedSettings: {
      temperature: "0.6 (Adaptive conversational sparring)",
      topP: "0.9",
      maxTokens: "3000",
      modelVariant: "GPT-4o Voice or Text",
      systemPromptSnippet: "You are a Rigorous VP of Engineering and Hiring Panel Chair. Conduct a realistic mock interview. Ask one tough question at a time. Probe weak points. Never break character until the user says 'END INTERVIEW'.",
    },
    curatedPrompts: [
      {
        title: "Adversarial Behavioral Mock Interviewer (STAR Method)",
        description: "Run an interactive 5-question mock interview that pushes you to give concrete, quantified STAR answers.",
        prompt: `Act as a Senior Director of Product Management conducting a rigorous final-round behavioral interview for a [ROLE_TITLE] position at [TARGET_COMPANY].

Rules for our simulation:
1. Greet me, briefly set expectations, and ask your FIRST interview question.
2. Ask only ONE question at a time. Do NOT list multiple questions.
3. Wait for my response.
4. After I respond, evaluate my answer:
   - STAR Score (1-5 on Situation, Task, Action, Result)
   - What was strong
   - What sounded vague or unquantified
   - Then ask an aggressive follow-up probe OR transition to Question 2.
5. Continue for 5 questions until I say "END INTERVIEW".

Here is my background and the role:
Role: [ROLE_TITLE]
Company / Team: [TARGET_COMPANY]
My Key Experiences: [MY_BACKGROUND_SUMMARY]`,
        recommendedVariables: {
          ROLE_TITLE: "Staff Technical Program Manager",
          TARGET_COMPANY: "Stripe",
          MY_BACKGROUND_SUMMARY: "Led cross-functional migration of legacy billing engine serving 20M users; managed 14 engineers and product stakeholders.",
        },
        expectedOutputPreview: "Interactive greeting and first probing behavioral question targeting conflict resolution or high-stakes trade-offs.",
      },
    ],
    faqs: [
      {
        question: "Can I use ChatGPT Voice Mode for mock interviews?",
        answer: "Yes! Paste the mock interview system prompt into the mobile ChatGPT app and activate Voice Mode. You can speak your answers aloud in real time and receive immediate spoken critiques.",
      },
    ],
    relatedGuideSlugs: ["getting-started", "prompt-engineering-fundamentals"],
    relatedCollectionSlugs: ["productivity-power-pack"],
    relatedToolPaths: ["/tools/token-counter", "/tools/prompt-builder"],
    wikidataEntityIds: ["Q115564437", "Q115664402"],
    updatedAt: "2026-11-01T00:00:00Z",
    publishedAt: "2026-11-01T00:00:00Z",
  },
  {
    id: "matrix-015",
    slug: "claude-prompts-for-technical-documentation",
    modelId: "claude",
    categorySlug: "coding",
    title: "Claude Prompts for Technical Documentation & Developer Guides",
    seoTitle: "Claude Prompts for Technical Documentation & API Guides (2026)",
    seoDescription: "Generate Stripe-quality developer documentation, OpenAPI specs, SDK quickstarts, and architectural guides with Claude 3.7 Sonnet.",
    heroTagline: "Turn raw codebases into world-class, Stripe-caliber developer documentation.",
    targetKeywords: [
      "claude prompts for technical documentation",
      "claude api documentation prompt",
      "developer docs prompt claude",
      "technical writing prompt templates",
      "claude 3.7 documentation generator",
    ],
    summary: "Produce pristine, developer-first documentation. Claude 3.7 Sonnet translates complex codebases into intuitive quickstart guides, exhaustive API parameter tables, and troubleshooting runbooks.",
    whyThisModelForThisPersona: [
      "Writes developer documentation with Stripe-level polish, clear headings, and copy-ready curl examples.",
      "Parses entire codebases and schema files to extract accurate parameter types, default values, and errors.",
      "Strict adherence to technical style guides (Google Developer Documentation Style Guide, Microsoft Writing Style).",
      "Generates interactive troubleshooting guides that preempt common developer pitfalls.",
    ],
    promptEngineeringPlaybook: {
      title: "Technical Writing with Claude",
      description: "How to craft intuitive documentation developers actually enjoy reading.",
      doList: [
        "Include runnable code snippets in at least 2 languages (e.g. cURL and TypeScript/Python SDK).",
        "Document all possible HTTP error codes (400, 401, 403, 429, 500) with concrete JSON payloads.",
        "Include a 'Prerequisites' section and a 'Next Steps' linking to advanced concepts.",
        "Use callouts/admonitions for critical gotchas (> [!WARNING] or > [!NOTE]).",
      ],
      dontList: [
        "Don't write passive academic prose—use direct, second-person imperative voice ('Call the endpoint', 'Pass the token').",
        "Don't show code samples with undefined variables or fake placeholders that fail to compile.",
      ],
    },
    recommendedSettings: {
      temperature: "0.2 (Clear, unambiguous, standardized documentation)",
      topP: "0.95",
      maxTokens: "8192",
      modelVariant: "Claude 3.7 Sonnet",
      systemPromptSnippet: "You are a Staff Technical Writer specializing in developer platforms. Follow the Google Developer Documentation Style Guide. Write crisp, active-voice guides with runnable cURL and TypeScript examples.",
    },
    curatedPrompts: [
      {
        title: "Stripe-Style API Endpoint Reference & Quickstart Guide",
        description: "Transform an endpoint code implementation into a beautiful developer documentation page.",
        prompt: `Act as a Principal Developer Experience (DX) Engineer and Technical Writer.

Write a complete, Stripe-quality API Reference documentation page for the following endpoint:
Endpoint: [HTTP_METHOD] [ENDPOINT_PATH]
Description: [ENDPOINT_PURPOSE]

Code / Controller Implementation:
[PASTE_CONTROLLER_CODE]

Include the following sections:
1. Overview & Authentication requirements (Bearer JWT header)
2. Interactive Request Parameters Table (Field, Type, Required, Description, Validation constraints)
3. Request Body Example (JSON)
4. Response Body Example (200 OK JSON with annotated field definitions)
5. Error Responses Table (400 Invalid Payload, 401 Unauthorized, 429 Rate Limited with response JSON)
6. Two runnable Quickstart Code Samples (cURL and TypeScript SDK with native fetch)`,
        recommendedVariables: {
          HTTP_METHOD: "POST",
          ENDPOINT_PATH: "/v1/webhooks/subscriptions",
          ENDPOINT_PURPOSE: "Register a verified HTTPS endpoint to receive asynchronous billing and customer lifecycle event payloads.",
        },
        expectedOutputPreview: "Exhaustive API documentation page with parameter tables, 200/4xx JSON envelopes, and multi-language code snippets.",
      },
    ],
    faqs: [
      {
        question: "Can Claude convert raw TypeScript types into an OpenAPI 3.1 specification?",
        answer: "Yes! Paste your TypeScript interfaces or Zod schemas and ask Claude: 'Convert these schemas into an OpenAPI 3.1 YAML specification with descriptions, examples, and required fields.'",
      },
    ],
    relatedGuideSlugs: ["getting-started", "system-architecture-prompts"],
    relatedCollectionSlugs: ["developer-starter-pack", "backend-architecture"],
    relatedToolPaths: ["/tools/token-counter"],
    wikidataEntityIds: ["Q117188168", "Q118235287"],
    updatedAt: "2026-11-01T00:00:00Z",
    publishedAt: "2026-11-01T00:00:00Z",
  },
  {
    id: "matrix-016",
    slug: "chatgpt-prompts-for-ecommerce-growth",
    modelId: "chatgpt",
    categorySlug: "ecommerce",
    title: "ChatGPT Prompts for E-Commerce Growth & CRO",
    seoTitle: "ChatGPT Prompts for E-Commerce Growth & Shopify CRO (2026)",
    seoDescription: "Boost Average Order Value (AOV) and conversion rates. High-performing ChatGPT prompts for product descriptions, email flows, and landing pages.",
    heroTagline: "Engineered to maximize cart conversion, AOV, and customer lifetime value.",
    targetKeywords: [
      "chatgpt prompts for ecommerce growth",
      "shopify chatgpt prompts",
      "ecommerce product description prompt",
      "chatgpt cro prompts",
      "klaviyo email prompts chatgpt",
    ],
    summary: "Scale your direct-to-consumer (DTC) or Shopify store. Deploy ChatGPT prompts for high-converting product descriptions, abandoned cart Klaviyo sequences, and upsell funnels.",
    whyThisModelForThisPersona: [
      "Proven mastery of sensory copywriting that overcomes physical buying hesitation.",
      "Builds complete automated lifecycle email sequences (Welcome series, Abandoned Cart, Post-Purchase Winback).",
      "Identifies conversion friction points across mobile checkout flows.",
      "Optimizes product copy with high-volume Amazon and Google Shopping search intent keywords.",
    ],
    promptEngineeringPlaybook: {
      title: "E-Commerce Optimization with GPT-4o",
      description: "How to craft product pages that convert cold traffic into buyers.",
      doList: [
        "Include sensory sensory descriptors (texture, aroma, weight, tactile sensation).",
        "Address primary buying objections (sizing anxiety, durability doubts, return policy) directly in the body.",
        "Structure descriptions with scannable bullet points highlighting benefits before features.",
        "Add an FAQ section addressing shipping times, warranty, and compatibility.",
      ],
      dontList: [
        "Don't write dry manufacturer feature specifications without explaining the emotional payoff.",
        "Don't ignore mobile typography—keep paragraphs under 3 lines for seamless thumb scrolling.",
      ],
    },
    recommendedSettings: {
      temperature: "0.65 (Compelling commercial storytelling)",
      topP: "0.9",
      maxTokens: "3500",
      modelVariant: "GPT-4o",
      systemPromptSnippet: "You are an Elite Direct-to-Consumer (DTC) E-Commerce Growth Director and Conversion Rate Optimization (CRO) expert. Write irresistible product copy that triggers immediate buying action.",
    },
    curatedPrompts: [
      {
        title: "High-Converting Shopify Product Description & Objection Buster",
        description: "Generate a conversion-optimized e-commerce product page layout with benefit bullets, FAQs, and sensory hooks.",
        prompt: `Act as a 7-Figure DTC Brand Strategist and Conversion Rate Optimization (CRO) copywriter.

We are launching a hero product on our Shopify store:
Product: [PRODUCT_NAME]
Target Customer: [AUDIENCE_AND_PAIN_POINT]
Key Materials / Specs: [SPECIFICATIONS]
Key Objections: [PRIMARY_OBJECTIONS]

Generate a high-converting product page layout:
1. Punchy Above-the-Fold Hero Hook (1 strong headline + 2-sentence emotional payoff)
2. 4 Benefit-Driven Bullet Points (Bold Benefit -> Concrete Feature explanation)
3. 'The Science / Craft Behind It' sensory narrative paragraph
4. 4 Frequently Asked Questions addressing the exact objections listed above
5. Micro-copy for Trust Badges (shipping guarantee, risk-free trial, warranty)`,
        recommendedVariables: {
          PRODUCT_NAME: "HydroLux Thermal French Press",
          AUDIENCE_AND_PAIN_POINT: "Coffee aficionados tired of lukewarm French press brews and fragile broken glass carafes",
          SPECIFICATIONS: "Double-walled vacuum insulated 18/8 stainless steel, ultra-fine 0.2mm micro-mesh filter, stays hot for 4 hours",
          PRIMARY_OBJECTIONS: "Will it leave grit/sludge in my cup? Is it dishwasher safe? Does the handle get burning hot?",
        },
        expectedOutputPreview: "Complete e-commerce product page copy with high-converting benefit bullets, trust badges, and objection-busting FAQs.",
      },
    ],
    faqs: [
      {
        question: "How do I optimize ChatGPT product descriptions for Google Shopping SEO?",
        answer: "Instruct ChatGPT to include your target search term in the H1 title, the first 50 words of the body, and the bullet point headers, while incorporating natural semantic variations like brand, size, material, and color.",
      },
    ],
    relatedGuideSlugs: ["getting-started", "prompt-engineering-fundamentals"],
    relatedCollectionSlugs: ["digital-marketing-roi-pack"],
    relatedToolPaths: ["/tools/token-counter", "/tools/prompt-builder"],
    wikidataEntityIds: ["Q115564437", "Q115664402"],
    updatedAt: "2026-11-01T00:00:00Z",
    publishedAt: "2026-11-01T00:00:00Z",
  },
  {
    id: "matrix-017",
    slug: "gemini-prompts-for-data-analysis",
    modelId: "gemini",
    categorySlug: "research",
    title: "Google Gemini Prompts for Data Analysis & Statistical Modeling",
    seoTitle: "Google Gemini Prompts for Data Analysis & SQL Insights (2026)",
    seoDescription: "Analyze massive CSVs, write optimized SQL queries, interpret regression models, and visualize trends with Google Gemini 2.5 Pro.",
    heroTagline: "Turn massive datasets and messy logs into clear executive business insights.",
    targetKeywords: [
      "gemini prompts for data analysis",
      "google gemini sql prompts",
      "gemini data science prompts",
      "statistical analysis prompt gemini",
      "gemini 2.5 pro data visualization",
    ],
    summary: "Accelerate exploratory data analysis (EDA). Use Google Gemini 2.5 Pro's 2M context window to ingest huge datasets, discover hidden correlations, and generate production SQL queries.",
    whyThisModelForThisPersona: [
      "2,000,000 token context window enables pasting tens of thousands of rows of raw CSV and JSON data.",
      "Exceptional SQL generation across BigQuery, Snowflake, PostgreSQL, and DuckDB dialects.",
      "Multimodal analysis of charts, scatterplots, heatmaps, and dashboard screenshots.",
      "Statistical rigor: identifies Simpson's paradox, survivorship bias, and covariate imbalance.",
    ],
    promptEngineeringPlaybook: {
      title: "Data Analysis Protocol with Gemini",
      description: "How to extract actionable quantitative insights without arithmetic errors.",
      doList: [
        "Provide table schemas, data types, and sample rows before asking for complex SQL queries.",
        "Instruct Gemini to show the mathematical derivation and statistical confidence intervals.",
        "Ask for Python/Pandas code alongside text explanations so you can verify computations in a notebook.",
        "Specify the exact database dialect (e.g. BigQuery Standard SQL vs PostgreSQL 16).",
      ],
      dontList: [
        "Don't rely on LLM mental math for critical arithmetic—always ask for reproducible Python scripts.",
        "Don't ask for 'insights' without specifying target business KPIs (churn, CAC, LTV, net margin).",
      ],
    },
    recommendedSettings: {
      temperature: "0.1 (High statistical precision and deterministic SQL)",
      topP: "0.9",
      maxTokens: "6000",
      modelVariant: "Gemini 2.5 Pro",
      systemPromptSnippet: "You are a Principal Data Scientist and Analytics Engineer. Prioritize statistical significance, bias identification, and query optimization. Always provide executable Python or SQL code.",
    },
    curatedPrompts: [
      {
        title: "Cohort Retention & Churn Analysis (BigQuery / SQL)",
        description: "Generate a production SQL query for monthly user cohort retention and identify root-cause churn drop-offs.",
        prompt: `Act as a Staff Analytics Engineer specializing in BigQuery.

We have an events table: \`analytics.user_events\`
Columns:
- \`user_id\` (STRING)
- \`event_timestamp\` (TIMESTAMP)
- \`event_name\` (STRING: 'signup', 'login', 'completed_purchase', 'canceled_subscription')
- \`subscription_tier\` (STRING: 'starter', 'pro', 'enterprise')

Write a performant, modular SQL query using Common Table Expressions (CTEs) to:
1. Define monthly registration cohorts (Cohort Month = YYYY-MM of first 'signup').
2. Calculate Month 0 through Month 12 retention rates (active user = at least 1 login or purchase in that month).
3. Output the cohort retention percentage matrix ready for visualization.
4. Add query performance optimizations (clustering, partitioning recommendations).`,
        recommendedVariables: {},
        expectedOutputPreview: "Optimized BigQuery SQL query with window functions, CTEs, and cohort retention percentage calculations.",
      },
    ],
    faqs: [
      {
        question: "Can Gemini 2.5 Pro analyze an entire CSV file directly?",
        answer: "Yes. With its 2M token context, you can upload multi-megabyte CSV files directly into Gemini 2.5 Pro and ask it to compute correlations, summarize distributions, or identify anomalous outlier rows.",
      },
    ],
    relatedGuideSlugs: ["academic-research-prompts", "getting-started"],
    relatedCollectionSlugs: ["academic-research-accelerator", "productivity-power-pack"],
    relatedToolPaths: ["/tools/token-counter"],
    wikidataEntityIds: ["Q123689408", "Q95"],
    updatedAt: "2026-11-01T00:00:00Z",
    publishedAt: "2026-11-01T00:00:00Z",
  },
  {
    id: "matrix-018",
    slug: "perplexity-prompts-for-competitive-intelligence",
    modelId: "perplexity",
    categorySlug: "research",
    title: "Perplexity Prompts for Competitive Intelligence & Market Research",
    seoTitle: "Perplexity Prompts for Competitive Intelligence & Research (2026)",
    seoDescription: "Uncover competitor pricing, customer complaints, patent filings, and market shifts with live-grounded Perplexity AI search prompts.",
    heroTagline: "Real-time web-grounded research that uncovers competitor vulnerabilities.",
    targetKeywords: [
      "perplexity prompts for competitive intelligence",
      "perplexity market research prompts",
      "perplexity ai competitor analysis",
      "perplexity research prompts",
      "perplexity search prompt templates",
    ],
    summary: "Gather live, verified intelligence on your competitors. Perplexity AI synthesizes real-time web citations, SEC filings, G2 reviews, and pricing updates into structured competitive battlecards.",
    whyThisModelForThisPersona: [
      "Real-time web search index with clickable, verified citation footnotes on every statement.",
      "Extracts customer sentiment from fresh forum discussions (Reddit, X, G2, Trustpilot).",
      "Tracks competitor pricing changes, product rollouts, and executive team hiring patterns.",
      "Generates objective feature-by-feature comparison matrices with source attribution.",
    ],
    promptEngineeringPlaybook: {
      title: "Competitive Intelligence with Perplexity",
      description: "How to extract high-signal market intelligence with verified citations.",
      doList: [
        "Instruct Perplexity to prioritize verified reviews (G2, Capterra, Reddit) over competitor marketing pages.",
        "Ask for a structured SWOT matrix grounded in verified 2025-2026 customer feedback.",
        "Request specific pricing tiers, contract minimums, and hidden implementation fees.",
        "Use Pro Search mode for multi-step reasoning across regulatory filings.",
      ],
      dontList: [
        "Don't accept broad summaries; demand exact quotes and source links.",
        "Don't ignore customer complaints—specifically search for 'churn reasons' and 'cancellation complaints'.",
      ],
    },
    recommendedSettings: {
      temperature: "Pro Search / Deep Research mode",
      modelVariant: "Perplexity Pro (Sonar Large / Deep Research)",
    },
    curatedPrompts: [
      {
        title: "Competitor Vulnerability & Customer Dissatisfaction Battlecard",
        description: "Synthesize real-time customer complaints and pricing weaknesses into a sales battlecard.",
        prompt: `Act as a Principal Competitive Intelligence Director.

Conduct a deep web-grounded analysis of our primary competitor: [COMPETITOR_NAME] in the [INDUSTRY_SPACE] market.

Research recent reviews (G2, Reddit, Capterra, Trustpilot, customer forums from the last 12 months) and compile:
1. Top 3 Recurring Customer Complaints & Frustrations (with exact citation links).
2. Hidden Costs & Pricing Friction (enterprise add-ons, onboarding fees, price hikes).
3. Product Gaps / Features Frequently Requested but Missing.
4. Sales Battlecard: Exactly what our sales team should say when a prospect asks 'Why should we choose you over [COMPETITOR_NAME]?'
5. A feature-by-feature comparison matrix.`,
        recommendedVariables: {
          COMPETITOR_NAME: "Salesforce Service Cloud",
          INDUSTRY_SPACE: "Enterprise Customer Support & Helpdesk Software",
        },
        expectedOutputPreview: "Comprehensive competitive battlecard with verified G2 citation links, pricing pain points, and objection scripts.",
      },
    ],
    faqs: [
      {
        question: "Why use Perplexity instead of ChatGPT for competitive research?",
        answer: "Perplexity conducts real-time web searches and provides inline clickable citations for every single claim, allowing you to instantly verify pricing figures, customer quotes, and release dates.",
      },
    ],
    relatedGuideSlugs: ["getting-started", "prompt-engineering-fundamentals"],
    relatedCollectionSlugs: ["academic-research-accelerator", "productivity-power-pack"],
    relatedToolPaths: ["/tools/token-counter"],
    wikidataEntityIds: ["Q115664402"],
    updatedAt: "2026-11-01T00:00:00Z",
    publishedAt: "2026-11-01T00:00:00Z",
  },
  {
    id: "matrix-019",
    slug: "chatgpt-prompts-for-startup-founders",
    modelId: "chatgpt",
    categorySlug: "business",
    title: "ChatGPT Prompts for Startup Founders & Pitch Decks",
    seoTitle: "ChatGPT Prompts for Startup Founders & Pitch Decks (2026)",
    seoDescription: "Craft compelling VC pitch decks, calculate unit economics, validate product-market fit, and draft Y Combinator application answers with ChatGPT.",
    heroTagline: "Navigate from zero to one with battle-tested founder frameworks.",
    targetKeywords: [
      "chatgpt prompts for startup founders",
      "chatgpt pitch deck prompts",
      "yc application chatgpt prompt",
      "startup founder prompt templates",
      "chatgpt business plan prompts",
    ],
    summary: "From idea validation to Series A fundraising. Deploy ChatGPT prompts to stress-test your business model, write pitch deck slides, calculate LTV/CAC ratios, and refine investor narratives.",
    whyThisModelForThisPersona: [
      "Deep understanding of venture capital criteria (TAM/SAM/SOM calculation, defensible moats, network effects).",
      "Sharp narrative framing: turns complex technical innovations into simple, billion-dollar investor hooks.",
      "Prepares founders for tough partner-meeting grilling with adversarial investor roleplay.",
      "Assists with Y Combinator application questions with radical clarity and brevity.",
    ],
    promptEngineeringPlaybook: {
      title: "Venture Strategy with GPT-4o",
      description: "How to craft investor materials that command term sheets.",
      doList: [
        "Explain your product in the first sentence: 'We do X for Y by Z'.",
        "Quantify Total Addressable Market (TAM) using credible bottom-up calculations, not hand-waving top-down reports.",
        "Identify your unfair advantage / proprietary distribution moat.",
        "Keep pitch deck slide bullet points under 10 words per point.",
      ],
      dontList: [
        "Don't claim 'we have no competitors'—investors consider that a sign of either ignorance or an unviable market.",
        "Don't use jargon to disguise weak unit economics or slow growth.",
      ],
    },
    recommendedSettings: {
      temperature: "0.4 (Sharp investor clarity, zero fluff)",
      topP: "0.9",
      maxTokens: "4000",
      modelVariant: "GPT-4o",
      systemPromptSnippet: "You are a Tier-1 Silicon Valley Venture Capital Partner and Y Combinator Group Partner. Evaluate startups with radical honesty, sharp economic rigor, and zero patience for fluffy buzzwords.",
    },
    curatedPrompts: [
      {
        title: "10-Slide YC-Style Seed Pitch Deck Narrative",
        description: "Draft a concise, high-signal 10-slide investor pitch deck structure focused on traction, moat, and market size.",
        prompt: `Act as a Y Combinator Managing Partner.

We are preparing our Seed / Series A fundraising pitch deck:
Company Name: [COMPANY_NAME]
One-Sentence Pitch: [ONE_SENTENCE_PITCH]
Target Customer & Problem: [PROBLEM_STATEMENT]
Our Solution: [SOLUTION_DESCRIPTION]
Traction to Date: [TRACTION_METRICS]
Business Model & Pricing: [REVENUE_MODEL]

Draft a high-conviction 10-slide pitch deck narrative:
For each slide provide:
1. Slide Title & Core Headline (the single takeaway)
2. Content / Key Visual Concept (what graph, chart, or screenshot to show)
3. Bullet points (strictly under 10 words each)
4. Potential Investor Objection & How to answer it in the room`,
        recommendedVariables: {
          COMPANY_NAME: "RelayAI",
          ONE_SENTENCE_PITCH: "We automate SOC2 and ISO27001 continuous compliance monitoring for healthtech startups using autonomous AI audit agents.",
          PROBLEM_STATEMENT: "Healthtech founders spend $80k and 6 months manually gathering screenshots for enterprise compliance audits.",
          SOLUTION_DESCRIPTION: "Continuous background agent that connects to AWS, GitHub, and Jira, generating audit-ready evidence in real time.",
          TRACTION_METRICS: "$32k MRR, 18% MoM growth, 42 paying customers, zero churn in 6 months",
          REVENUE_MODEL: "Annual B2B SaaS license ($15k/year base + $2k per additional cloud connector)",
        },
        expectedOutputPreview: "Complete 10-slide investor deck blueprint with punchy slide headlines, visual framing, and objection answers.",
      },
    ],
    faqs: [
      {
        question: "Can ChatGPT help calculate bottom-up TAM?",
        answer: "Yes! Provide your target customer count, pricing tiers, and penetration assumptions. ChatGPT will structure a bottom-up TAM (Total Addressable Market = Total Prospective Buyers × Annual Contract Value) that VCs respect.",
      },
    ],
    relatedGuideSlugs: ["getting-started", "prompt-engineering-fundamentals"],
    relatedCollectionSlugs: ["productivity-power-pack", "sales-outreach-engine"],
    relatedToolPaths: ["/tools/token-counter", "/tools/prompt-builder"],
    wikidataEntityIds: ["Q115564437", "Q115664402"],
    updatedAt: "2026-11-01T00:00:00Z",
    publishedAt: "2026-11-01T00:00:00Z",
  },
  {
    id: "matrix-020",
    slug: "claude-prompts-for-react-and-nextjs",
    modelId: "claude",
    categorySlug: "nextjs",
    title: "Claude Prompts for React 19 & Next.js 15 Development",
    seoTitle: "Claude Prompts for React 19 & Next.js 15 Development (2026)",
    seoDescription: "Harness Claude 3.7 Sonnet for React 19 compiler optimizations, Server Actions, Suspense streaming boundaries, and modern shadcn/ui components.",
    heroTagline: "Modern frontend mastery with React 19 Server Components and Next.js 15.",
    targetKeywords: [
      "claude prompts for react and nextjs",
      "claude nextjs 15 prompt",
      "react 19 prompt templates",
      "claude prompts for frontend developers",
      "nextjs server actions claude prompt",
    ],
    summary: "Master the cutting edge of web development. Claude 3.7 Sonnet writes modern Next.js 15 App Router code utilizing React 19 Actions, \`useOptimistic\`, Suspense streaming, and Tailwind CSS.",
    whyThisModelForThisPersona: [
      "Up-to-date knowledge of React 19 idioms (eliminating obsolete \`useMemo\`/\`useCallback\` boilerplate thanks to the React Compiler).",
      "Strict separation of concerns between Server Components and Client Components.",
      "Deep integration with modern UI ecosystems (Tailwind CSS v4, Radix Primitives, shadcn/ui, Lucide).",
      "Zero-compromise web performance (Core Web Vitals, LCP/INP optimization, font preloading).",
    ],
    promptEngineeringPlaybook: {
      title: "React 19 & Next.js 15 with Claude",
      description: "How to engineer clean, idiomatic modern React code.",
      doList: [
        "Specify React 19 and Next.js 15 in the prompt to prevent deprecated patterns.",
        "Use React 19 hooks (\`useActionState\`, \`useFormStatus\`, \`useOptimistic\`) instead of manual useEffect state machines.",
        "Implement proper streaming architecture with \`<Suspense fallback={<Skeleton />}>\` boundaries.",
        "Ensure full accessibility (WCAG AA, proper ARIA tags, keyboard traps, focus management).",
      ],
      dontList: [
        "Don't put 'use client' at the top of every file—keep data-fetching components strictly on the server.",
        "Don't use \`router.refresh()\` when Server Actions and \`revalidatePath\` handle cache invalidation cleanly.",
      ],
    },
    recommendedSettings: {
      temperature: "0.2 (Modern, clean, bug-free frontend architecture)",
      topP: "0.95",
      maxTokens: "8192",
      modelVariant: "Claude 3.7 Sonnet",
      systemPromptSnippet: "You are a Principal Frontend Architect specializing in React 19, Next.js 15 App Router, TypeScript, and Tailwind CSS. Emphasize Server Components, Suspense streaming, and zero client-side bundle bloat.",
    },
    curatedPrompts: [
      {
        title: "Streaming Server Component with Suspense & Optimistic Action",
        description: "Scaffold an ultra-fast streaming data component with asynchronous Server Actions and instant optimistic feedback.",
        prompt: `Act as a Staff Frontend Engineer specializing in Next.js 15 and React 19.

Build a production-grade data dashboard widget for [WIDGET_NAME].

Requirements:
1. Server Component (\`page.tsx\`) that streams asynchronous data via \`<Suspense fallback={<SkeletonCard />}>\`.
2. Dedicated Server Action in \`actions.ts\` handling item updates with \`revalidateTag\` or \`revalidatePath\`.
3. Client Component (\`widget-card.tsx\`) using React 19's \`useOptimistic\` and \`useActionState\` for instant zero-latency UI updates.
4. Tailwind CSS styling with dark mode support and responsive layout.
5. Strict TypeScript with zero \`any\` types.`,
        recommendedVariables: {
          WIDGET_NAME: "Real-time Cloud Server Health & CPU Monitor",
        },
        expectedOutputPreview: "Complete production-ready Next.js 15 code split into Server Component, Action, and Optimistic Client Component.",
      },
    ],
    faqs: [
      {
        question: "Does Claude understand the React 19 Compiler changes?",
        answer: "Yes. When prompted with 'React 19 conventions', Claude knows you no longer need manual useMemo and useCallback hooks for routine memoization, as the React Compiler automatically memoizes renders.",
      },
    ],
    relatedGuideSlugs: ["getting-started", "system-architecture-prompts"],
    relatedCollectionSlugs: ["developer-starter-pack", "advanced-typescript-patterns"],
    relatedToolPaths: ["/tools/token-counter"],
    wikidataEntityIds: ["Q117188168", "Q110823377", "Q19399674"],
    updatedAt: "2026-11-01T00:00:00Z",
    publishedAt: "2026-11-01T00:00:00Z",
  },
  {
    id: "matrix-021",
    slug: "midjourney-prompts-for-cinematic-film-stills",
    modelId: "midjourney",
    categorySlug: "visual-art",
    title: "Midjourney Prompts for Cinematic Film Stills & Color Grading",
    seoTitle: "Midjourney Prompts for Cinematic Film Stills (v6.1 35mm)",
    seoDescription: "Create breathtaking 35mm and 70mm cinematic film stills, anamorphic aspect ratios, dramatic lighting, and film stock aesthetics in Midjourney v6.1.",
    heroTagline: "Cinema-grade frames with authentic anamorphic lenses and film stock colors.",
    targetKeywords: [
      "midjourney prompts for cinematic film stills",
      "midjourney film still prompts",
      "cinematic 35mm prompt midjourney",
      "anamorphic lens prompt midjourney v6",
      "midjourney cinematography prompts",
    ],
    summary: "Direct your own cinematic universe. Generate evocative film stills featuring anamorphic lens flares, authentic Kodak/Fujifilm emulsions, dramatic chiaroscuro, and 2.39:1 widescreen ratios.",
    whyThisModelForThisPersona: [
      "Realistic emulation of cinematic directors (Denis Villeneuve, Roger Deakins, Christopher Nolan, Wong Kar-wai).",
      "Authentic lens characteristics: anamorphic bokeh, horizontal blue lens flares, subtle chromatic aberration.",
      "Support for true cinematic aspect ratios (--ar 21:9, --ar 2.39:1, --ar 16:9).",
      "Nuanced environmental storytelling (atmospheric haze, neon reflections on wet asphalt, volumetric smoke).",
    ],
    promptEngineeringPlaybook: {
      title: "Cinematic Visuals in Midjourney v6.1",
      description: "How to craft frame grabs that look pulled directly from an IMAX screening.",
      doList: [
        "Specify the exact camera and lens setup: 'Shot on Panavision Millennium DXL2 with Primo 70 anamorphic lens'.",
        "Name specific film stocks: 'Kodak Vision3 500T 5219, rich shadow depth, fine grain'.",
        "Describe lighting in cinematographic terms: 'Chiaroscuro, rim light, motivated practical lighting, volumetric haze'.",
        "Use cinematic aspect ratios: '--ar 21:9 --style raw --v 6.1'.",
      ],
      dontList: [
        "Avoid generic words like 'movie, cinematic, 4k'—let technical lens and lighting descriptions create the cinema look.",
        "Don't over-saturate colors; film stock naturally renders nuanced, organic color palettes.",
      ],
    },
    recommendedSettings: {
      temperature: "Midjourney Stylize: --s 250",
      cliFlags: "--ar 21:9 --style raw --v 6.1",
      modelVariant: "Midjourney v6.1",
    },
    curatedPrompts: [
      {
        title: "Neo-Noir Cyberpunk Alleyway Widescreen Frame Still",
        description: "Atmospheric 21:9 cinematic frame grab with neon reflections, anamorphic flares, and rain-soaked pavement.",
        prompt: `A 35mm cinematic film still of a lone private investigator in a worn trench coat walking down a narrow neon-drenched Tokyo back alley during a heavy midnight downpour. Vivid cyan and magenta neon signs reflecting off wet cobblestones, horizontal anamorphic blue streak lens flare cutting across the frame. Shot on ARRI Alexa 65 with Panavision Anamorphic lenses, cinematography by Roger Deakins, Kodak Vision3 500T color science, shallow depth of field, atmospheric steam rising from storm grates, 2.39:1 aspect ratio --ar 21:9 --style raw --v 6.1`,
        recommendedVariables: {},
        expectedOutputPreview: "Evocative widescreen cinematic frame featuring authentic anamorphic flare, fine film grain, and high-contrast color grading.",
      },
    ],
    faqs: [
      {
        question: "What is the best aspect ratio for movie stills in Midjourney?",
        answer: "--ar 21:9 or --ar 2.39:1 are standard cinematic anamorphic widescreen ratios, providing the authentic wide field of view seen in modern cinema films.",
      },
    ],
    relatedGuideSlugs: ["midjourney-v6-mastery", "visual-prompt-crafting"],
    relatedCollectionSlugs: ["visual-art-creators-bundle"],
    relatedToolPaths: ["/tools/token-counter"],
    wikidataEntityIds: ["Q113163354"],
    updatedAt: "2026-11-01T00:00:00Z",
    publishedAt: "2026-11-01T00:00:00Z",
  },
  {
    id: "matrix-022",
    slug: "copilot-prompts-for-enterprise-productivity",
    modelId: "copilot",
    categorySlug: "productivity",
    title: "Microsoft Copilot Prompts for Enterprise & Office Productivity",
    seoTitle: "Microsoft Copilot Prompts for Excel, Word & Teams (2026)",
    seoDescription: "Supercharge enterprise productivity with Microsoft Copilot prompts for Excel formulas, PowerPoint presentations, Teams summaries, and Word briefs.",
    heroTagline: "Automate corporate workflows across Excel, PowerPoint, Teams, and Word.",
    targetKeywords: [
      "copilot prompts for enterprise productivity",
      "microsoft copilot excel prompts",
      "microsoft copilot powerpoint prompts",
      "copilot prompt templates enterprise",
      "copilot prompts for office 365",
    ],
    summary: "Transform workday efficiency across Microsoft 365. Use Copilot prompts to synthesize Teams meeting transcripts, write complex Excel dynamic array formulas, and generate executive presentations.",
    whyThisModelForThisPersona: [
      "Native enterprise security and tenant grounding within Microsoft 365 Graph.",
      "Direct execution in Excel (LAMBDA functions, XLOOKUP, pivot analysis, scenario modeling).",
      "Automatic transcription and action item extraction from 60-minute Microsoft Teams video meetings.",
      "Transforms unstructured Word memos into 10-slide branded PowerPoint presentations.",
    ],
    promptEngineeringPlaybook: {
      title: "Enterprise Copilot Protocol",
      description: "How to extract maximum output from Microsoft Copilot across M365.",
      doList: [
        "In Teams: Prompt 'Summarize disagreements, action items, and who was assigned each deliverable with deadlines'.",
        "In Excel: Specify column letters and exact target output format (e.g. 'Write a formula using XLOOKUP and IFERROR').",
        "In PowerPoint: Provide the exact slide count and key themes you want covered per slide.",
        "Leverage Graph connectors to search across emails, SharePoint documents, and Teams chats.",
      ],
      dontList: [
        "Don't ask Copilot to analyze spreadsheets without clean header rows.",
        "Don't accept generic summaries; demand concrete timelines and owner assignments.",
      ],
    },
    recommendedSettings: {
      temperature: "0.2 (Rigorous enterprise precision)",
      modelVariant: "Microsoft 365 Copilot Enterprise",
    },
    curatedPrompts: [
      {
        title: "Executive Teams Meeting Action Item & Decision Summary",
        description: "Extract high-signal executive decisions, ownership assignments, and unresolved blockers from a Teams transcript.",
        prompt: `Act as a Chief of Staff to the Executive Committee.

Analyze this meeting transcript:
[PASTE_TEAMS_TRANSCRIPT]

Produce an Executive Briefing containing:
1. Executive Summary (3 bullets summarizing the strategic outcome)
2. Decisions Reached (Explicitly list what was approved or rejected)
3. Action Items Matrix:
   - Owner (Name)
   - Specific Deliverable
   - Agreed Deadline
   - Dependencies / Blockers
4. Unresolved Topics & Disagreements deferred to the next session`,
        recommendedVariables: {},
        expectedOutputPreview: "Clean, structured executive memo ready for distribution to C-suite stakeholders with clear ownership tables.",
      },
    ],
    faqs: [
      {
        question: "Does Microsoft Copilot train on our confidential corporate data?",
        answer: "When using Microsoft 365 Copilot with commercial data protection, your corporate data, prompts, and tenant documents are never used to train foundational AI models and adhere to strict enterprise compliance boundaries.",
      },
    ],
    relatedGuideSlugs: ["getting-started", "prompt-engineering-fundamentals"],
    relatedCollectionSlugs: ["productivity-power-pack"],
    relatedToolPaths: ["/tools/token-counter"],
    wikidataEntityIds: ["Q115664402", "Q2283"],
    updatedAt: "2026-11-01T00:00:00Z",
    publishedAt: "2026-11-01T00:00:00Z",
  },
  {
    id: "matrix-023",
    slug: "flux-prompts-for-commercial-packaging",
    modelId: "flux",
    categorySlug: "visual-art",
    title: "FLUX.1 Prompts for Commercial Packaging & Branding Design",
    seoTitle: "FLUX.1 Prompts for Commercial Packaging & Branding (2026)",
    seoDescription: "Design luxury product boxes, cosmetic bottles, beverage cans, and foil-embossed packaging mockups with Black Forest Labs FLUX.1.",
    heroTagline: "Industrial-grade packaging mockups and luxury container concepts.",
    targetKeywords: [
      "flux prompts for commercial packaging",
      "flux packaging design prompt",
      "commercial mockup prompt flux.1",
      "branding design prompts flux",
      "packaging visualization ai prompt",
    ],
    summary: "Accelerate industrial design and packaging workflows. FLUX.1 generates photorealistic product packaging concepts featuring metallic foils, embossed typography, and custom die-cut box geometry.",
    whyThisModelForThisPersona: [
      "Superior typographic rendering: renders legible brand names directly onto 3D packaging surfaces.",
      "High-precision material modeling (foil stamping, matte soft-touch coatings, kraft paper grain, ribbed tins).",
      "Clean neutral studio backgrounds ideal for product catalog integration.",
      "High consistency across multi-angle product mockups.",
    ],
    promptEngineeringPlaybook: {
      title: "Packaging Design with FLUX.1",
      description: "How to engineer commercial packaging mockups with crisp typography.",
      doList: [
        "Put the exact brand name inside single quotes: 'botanical beverage can with the word \"VALE\" embossed'.",
        "Describe packaging substrates: 'soft-touch matte black cardboard box, gold hot-stamp foil lettering, blind debossed geometric logo'.",
        "Specify studio backdrop: 'Clean neutral grey studio setting, subtle soft contact shadows, 45-degree angle product view'.",
      ],
      dontList: [
        "Don't add busy background environments that distract from the structural container lines.",
        "Don't overload the prompt with 10 different text phrases—focus on 1-2 hero words.",
      ],
    },
    recommendedSettings: {
      temperature: "Guidance Scale: 3.5",
      modelVariant: "FLUX.1 [dev] / [pro]",
      cliFlags: "--steps 28 --guidance 3.5",
    },
    curatedPrompts: [
      {
        title: "Luxury Matte Black & Gold Foil Cosmetic Box Packaging",
        description: "Premium retail packaging mockup showcasing soft-touch textures, debossed patterns, and metallic accents.",
        prompt: `Commercial packaging design mockup of a luxury skincare rigid box standing next to its matching cosmetic pump bottle. Packaging features a premium soft-touch matte black finish with elegant minimalist gold foil typography reading 'AURA' centered on the front face. Subtle blind debossed botanical leaf pattern across the sides. Studio lighting with soft gradient reflections, clean light-grey podium surface, 50mm lens perspective, professional packaging design portfolio quality, ultra-sharp edge geometry.`,
        recommendedVariables: {},
        expectedOutputPreview: "Crisp 3D commercial packaging concept featuring legible gold foil typography and realistic soft-touch matte box textures.",
      },
    ],
    faqs: [
      {
        question: "Can FLUX.1 render exact text on product packaging?",
        answer: "Yes! FLUX.1 has industry-leading typographic rendering. Put the exact words inside quotes (e.g. 'AURA', 'PURE') and specify 'clean sans-serif typography' or 'gold foil lettering'.",
      },
    ],
    relatedGuideSlugs: ["visual-prompt-crafting", "getting-started"],
    relatedCollectionSlugs: ["visual-art-creators-bundle"],
    relatedToolPaths: ["/tools/token-counter"],
    wikidataEntityIds: ["Q115664402"],
    updatedAt: "2026-11-01T00:00:00Z",
    publishedAt: "2026-11-01T00:00:00Z",
  },
  {
    id: "matrix-024",
    slug: "chatgpt-prompts-for-youtube-creators",
    modelId: "chatgpt",
    categorySlug: "youtube",
    title: "ChatGPT Prompts for YouTube Creators & Video Ideation",
    seoTitle: "ChatGPT Prompts for YouTube Creators & CTR Titles (2026)",
    seoDescription: "High-CTR YouTube titles, retention hooks, thumbnail concepts, and complete video scripts engineered for viral reach using ChatGPT.",
    heroTagline: "Maximize click-through rates (CTR) and average view duration (AVD).",
    targetKeywords: [
      "chatgpt prompts for youtube creators",
      "youtube title prompts chatgpt",
      "chatgpt youtube script generator",
      "youtube thumbnail prompts chatgpt",
      "viral youtube hooks chatgpt",
    ],
    summary: "Crack the YouTube algorithm. Craft irresistible high-CTR video titles, psychological thumbnail concepts, and retention-engineered scripts using proven creator frameworks.",
    whyThisModelForThisPersona: [
      "Trained on millions of high-performing YouTube titles and packaging concepts.",
      "Optimizes for the critical Title + Thumbnail synergy equation.",
      "Balances curiosity hooks without falling into deceptive clickbait that hurts retention.",
      "Generates 30 title variations across 5 distinct psychological angles in seconds.",
    ],
    promptEngineeringPlaybook: {
      title: "YouTube Packaging Playbook with GPT-4o",
      description: "How to engineer YouTube concepts that earn high CTR and viewer retention.",
      doList: [
        "Keep titles strictly under 55 characters so they never get truncated on mobile screens.",
        "Pair every title with a visual thumbnail concept that completes the question rather than repeating words.",
        "Target the first 30 seconds of the video to validate the viewer's click immediately.",
        "Use high-arousal emotion words: 'Exposed, Secret, Failed, Warning, Finally'.",
      ],
      dontList: [
        "Don't put more than 3-4 words of text on the thumbnail image.",
        "Don't use deceptive clickbait that isn't answered in the first 2 minutes of the video.",
      ],
    },
    recommendedSettings: {
      temperature: "0.8 (Creative hooks and high-energy curiosity angles)",
      topP: "0.95",
      maxTokens: "3000",
      modelVariant: "GPT-4o",
      systemPromptSnippet: "You are an Elite YouTube Packaging Strategist and Channel Growth Advisor. Specialize in 10%+ CTR titles, curiosity-driven thumbnail concepts, and high-retention video hooks.",
    },
    curatedPrompts: [
      {
        title: "High-CTR Title & Thumbnail Packaging Matrix (10 Variations)",
        description: "Generate 10 pairs of synergistic YouTube titles and thumbnail visual concepts across 5 psychological angles.",
        prompt: `Act as a Top 1% YouTube Packaging Strategist (in the style of MrBeast, Colin & Samir, or Paddy Galloway).

Video Topic: [VIDEO_TOPIC]
Core Angle / Revelation: [CORE_REVELATION]
Target Audience: [TARGET_AUDIENCE]

Generate 10 Title & Thumbnail pairs:
Criteria:
- Titles strictly under 50 characters (no mobile truncation).
- Zero punctuation unless necessary.
- Each title must be paired with a Thumbnail Visual Concept that completes the curiosity loop without repeating the title text.

Categorize across these 5 psychological triggers:
1. The Unexpected Reversal ('Everything You Know About X is Wrong')
2. The Extreme Experiment ('I Spent 30 Days Doing X')
3. The Exposing / Secret Unveiled ('Why Companies Don't Want You Knowing X')
4. The Stakes / Warning Hook ('Stop Doing X Before It's Too Late')
5. The Simple Curiosity Gap ('The 1 Mistake Destroying Your X')`,
        recommendedVariables: {
          VIDEO_TOPIC: "Why 90% of Remote Workers are Quietly Being Replaced by AI Agents",
          CORE_REVELATION: "Companies are not firing entire teams; they are freezing hiring and replacing customer support and entry-level coders with agentic workflows.",
          TARGET_AUDIENCE: "Tech workers, remote employees, and career switchers aged 20-40",
        },
        expectedOutputPreview: "Ten mobile-optimized YouTube titles with accompanying visual thumbnail creative direction.",
      },
    ],
    faqs: [
      {
        question: "How long should a YouTube title be according to ChatGPT?",
        answer: "Under 50 characters. Over 70% of YouTube views occur on mobile devices, where titles longer than 50-55 characters get cut off with ellipses (...), drastically lowering click-through rates.",
      },
    ],
    relatedGuideSlugs: ["getting-started", "prompt-engineering-fundamentals"],
    relatedCollectionSlugs: ["productivity-power-pack"],
    relatedToolPaths: ["/tools/token-counter", "/tools/prompt-builder"],
    wikidataEntityIds: ["Q115564437", "Q866"],
    updatedAt: "2026-11-01T00:00:00Z",
    publishedAt: "2026-11-01T00:00:00Z",
  },
  {
    id: "matrix-025",
    slug: "claude-prompts-for-api-and-schema-design",
    modelId: "claude",
    categorySlug: "coding",
    title: "Claude Prompts for REST & GraphQL API Schema Design",
    seoTitle: "Claude Prompts for API & Schema Design (REST, GraphQL & SQL)",
    seoDescription: "Design scalable, idempotent, enterprise-grade REST APIs, GraphQL schemas, and normalized PostgreSQL data models with Claude 3.7 Sonnet.",
    heroTagline: "Architect idempotent, highly evolvable APIs and rock-solid relational schemas.",
    targetKeywords: [
      "claude prompts for api and schema design",
      "claude rest api design prompt",
      "graphql schema prompt claude",
      "database schema design prompt",
      "api architecture prompt templates",
    ],
    summary: "Build APIs that scale effortlessly. Claude 3.7 Sonnet guides you through RESTful resource design, GraphQL type unions, idempotent mutation keys, and third-normal-form relational data models.",
    whyThisModelForThisPersona: [
      "Deep understanding of distributed API design patterns (idempotency keys, cursor pagination, rate limiting headers).",
      "Strict schema normalization to prevent data anomalies while designing strategic read caches.",
      "Exceptional accuracy generating OpenAPI 3.1 YAML and GraphQL SDL definitions.",
      "Ensures backwards compatibility, versioning strategies, and deprecation lifecycles.",
    ],
    promptEngineeringPlaybook: {
      title: "API & Schema Engineering with Claude",
      description: "How to design robust API contracts before writing a single line of backend implementation.",
      doList: [
        "Define exact pagination strategy (Keyset / Cursor-based vs Offset-based).",
        "Include Idempotency-Key headers on all non-idempotent POST/PATCH mutations.",
        "Specify standard error envelopes with structured error codes, field-level errors, and trace IDs.",
        "Design for backwards compatibility (additive changes, non-breaking enum additions).",
      ],
      dontList: [
        "Don't expose internal auto-incrementing integer database IDs over public REST APIs.",
        "Don't use 200 OK for error responses (GraphQL anti-pattern in REST contexts).",
      ],
    },
    recommendedSettings: {
      temperature: "0.15 (Strict architectural rigor and deterministic schema contracts)",
      topP: "0.95",
      maxTokens: "8192",
      modelVariant: "Claude 3.7 Sonnet",
      systemPromptSnippet: "You are a Principal API Architect and Database Modeler. Design clean, idempotent, scalable REST and GraphQL schemas following RFC specifications. Prioritize backwards compatibility and strict type safety.",
    },
    curatedPrompts: [
      {
        title: "Enterprise Idempotent REST API Specification & OpenAPI 3.1 YAML",
        description: "Design a bulletproof, idempotent financial transaction API complete with error envelopes and OpenAPI 3.1 schema.",
        prompt: `Act as a Staff API Architect.

Design an enterprise-grade REST API resource for:
Resource: [API_RESOURCE_NAME]
Domain Context: [DOMAIN_CONTEXT]
Security Requirements: [SECURITY_REQUIREMENTS]

Provide:
1. RESTful URI endpoints adhering to Richardson Maturity Model Level 3 (GET, POST, PATCH, DELETE).
2. Complete Idempotency Architecture (Idempotency-Key header handling, replay cache, conflict resolution).
3. Cursor-based pagination schema for collection queries (\`limit\`, \`starting_after\`, \`ending_before\`).
4. Standardized RFC 7807 Problem Details error JSON envelopes for 400, 401, 409, and 422 errors.
5. OpenAPI 3.1 YAML specification for the primary creation endpoint.`,
        recommendedVariables: {
          API_RESOURCE_NAME: "/v1/payouts",
          DOMAIN_CONTEXT: "Multi-currency merchant payout disbursements with multi-party approval workflows and bank routing verification",
          SECURITY_REQUIREMENTS: "mTLS, OAuth2 Bearer Tokens with \`payouts:write\` scope, webhook signature HMAC-SHA256",
        },
        expectedOutputPreview: "Comprehensive API blueprint featuring RFC 7807 error envelopes, cursor pagination headers, and valid OpenAPI 3.1 YAML.",
      },
    ],
    faqs: [
      {
        question: "Why is cursor pagination better than offset pagination in API design?",
        answer: "Cursor pagination (keyset pagination) performs in O(1) time regardless of dataset size because it utilizes database index seeks (e.g. \`WHERE id > cursor\`), whereas offset pagination (e.g. \`OFFSET 100000\`) degrades to O(N) as the database scans and discards preceding rows.",
      },
    ],
    relatedGuideSlugs: ["system-architecture-prompts", "getting-started"],
    relatedCollectionSlugs: ["backend-architecture", "developer-starter-pack"],
    relatedToolPaths: ["/tools/token-counter"],
    wikidataEntityIds: ["Q117188168", "Q118235287", "Q19399674"],
    updatedAt: "2026-11-01T00:00:00Z",
    publishedAt: "2026-11-01T00:00:00Z",
  },
];
