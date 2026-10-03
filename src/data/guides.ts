import { Guide } from "@/types/guide";

export const GUIDES: Guide[] = [
  // 1. How to Write Better AI Prompts
  {
    id: "guide-001",
    slug: "how-to-write-better-ai-prompts",
    title: "How to Write Better AI Prompts: The Engineering Architecture",
    description: "Learn the four-pillar prompt engineering framework used by senior engineers to eliminate hallucinations, enforce structured schemas, and produce predictable outputs.",
    summary: "Learn the four-pillar prompt engineering framework used by senior engineers to eliminate hallucinations, enforce structured schemas, and produce predictable outputs.",
    category: "Prompt Engineering",
    readingTime: "7 min read",
    publishedAt: "2026-02-10T00:00:00Z",
    updatedAt: "2026-03-25T00:00:00Z",
    featured: true,
    author: {
      name: "Beautiful AI Prompt Research Team",
      role: "Lead Prompt Architects",
    },
    tableOfContents: [
      { id: "the-four-pillars", title: "1. The Four-Pillar Architecture" },
      { id: "role-grounding", title: "2. Precision Role Definition & Context" },
      { id: "constraining-outputs", title: "3. Enforcing Exact Output Schemas" },
      { id: "negative-constraints", title: "4. Negative Constraints: What NOT to Do" },
      { id: "multi-turn-workflow", title: "5. Multi-Turn Chaining Strategy" },
    ],
    sections: [
      {
        id: "the-four-pillars",
        title: "1. The Four-Pillar Architecture",
        content: [
          "Most users treat large language models like search engines: they type a vague query, receive a generic response, and conclude the model is mediocre. Professional prompt engineering flips this approach entirely.",
          "High-signal prompts are structured like computer programs. Every production-grade prompt consists of four essential pillars: Role Persona, Context Grounding, Explicit Step-by-Step Directives, and a Strict Output Schema.",
          "When you structure your prompt into these distinct blocks, the model allocates attention heads predictably across constraints rather than guessing your implied intentions.",
        ],
        callout: {
          type: "tip",
          text: "Never combine instructions, raw context, and output formatting into a single unformatted paragraph. Use Markdown headers or XML tags to cleanly delineate prompt components.",
        },
      },
      {
        id: "role-grounding",
        title: "2. Precision Role Definition & Context",
        content: [
          "Telling an AI 'You are an expert' yields negligible improvement. Modern models have seen that phrase billions of times in their training data. Instead, define exact institutional pedigree, seniority level, and behavioral tendencies.",
          "For example: 'You are a Principal Infrastructure Architect at a Tier-1 tech company who has reviewed 1,000+ distributed systems. You are direct, rigorous, and reject answers that fail under network partition or cascading database failovers.'",
          "Grounding the persona in specific decision-making criteria forces the model to evaluate trade-offs through an expert lens rather than providing a balanced, wishy-washy overview.",
        ],
        linkedPromptId: "prompt-003",
      },
      {
        id: "constraining-outputs",
        title: "3. Enforcing Exact Output Schemas",
        content: [
          "LLMs are probabilistic token predictors. If you do not specify how you want information delivered, the model defaults to verbose, unformatted paragraphs filled with conversational pleasantries.",
          "Always specify exact formatting: numbered milestone lists, markdown comparison tables, or JSON objects. Give the model an explicit template for each section of its reply.",
          "By constraining the output shape, you drastically reduce token waste, speed up generation time, and make the response immediately actionable.",
        ],
        codeSnippet: {
          language: "markdown",
          label: "Output Schema Directive Pattern",
          code: "Format your response using this exact structure:\n### 1. Executive Summary (Max 3 sentences)\n### 2. Tactical Trade-Off Matrix (Table: Option | Pros | Cons | Latency Cost)\n### 3. Implementation Checklist (Chronological sequence)",
        },
      },
      {
        id: "negative-constraints",
        title: "4. Negative Constraints: What NOT to Do",
        content: [
          "Telling a model what to avoid is often twice as effective as telling it what to do. AI models tend toward corporate jargon, conversational filler ('Certainly! I would be happy to help with that!'), and redundant restatements of your question.",
          "Explicitly state negative constraints: 'Do not include conversational preamble. Do not use buzzwords like synergy, revolutionize, or delve. Do not invent metrics or benchmark figures that were not provided in the input.'",
        ],
        callout: {
          type: "note",
          text: "Negative constraints should be direct and unambiguous. If you forbid certain words or behaviors, the model suppresses those token paths during inference.",
        },
      },
      {
        id: "multi-turn-workflow",
        title: "5. Multi-Turn Chaining Strategy",
        content: [
          "Do not expect a complex 20-page document or comprehensive architecture in a single prompt. The highest-quality AI outputs come from multi-turn collaborative chaining.",
          "Step 1: Ask the model to outline the framework and list questions about your requirements. Step 2: Answer the questions and approve the structure. Step 3: Direct the model to generate one section at a time, followed by a critique and revision pass.",
        ],
        linkedPromptId: "prompt-001",
      },
    ],
    relatedPromptIds: ["prompt-001", "prompt-003", "prompt-004"],
    relatedGuideSlugs: ["chatgpt-prompting-tips-for-beginners", "ai-prompts-for-developers"],
    tags: ["Prompt Architecture", "Fundamentals", "Best Practices", "System Prompts"],
  },

  // 2. AI Prompts for Developers
  {
    id: "guide-002",
    slug: "ai-prompts-for-developers",
    title: "AI Prompts for Developers: Architecture, Refactoring, and Code Reviews",
    description: "How to configure AI models to audit distributed systems, enforce strict TypeScript compiler boundaries, audit React 19 server components, and optimize SQL.",
    summary: "How to configure AI models to audit distributed systems, enforce strict TypeScript compiler boundaries, audit React 19 server components, and optimize SQL.",
    category: "Software Engineering",
    readingTime: "8 min read",
    publishedAt: "2026-02-14T00:00:00Z",
    updatedAt: "2026-03-26T00:00:00Z",
    featured: true,
    author: {
      name: "Beautiful AI Prompt Research Team",
      role: "Lead Prompt Architects",
    },
    tableOfContents: [
      { id: "beyond-autocomplete", title: "1. Moving Beyond Autocomplete" },
      { id: "strict-compiler-context", title: "2. Setting Strict Compiler & Version Constraints" },
      { id: "algebraic-types", title: "3. Refactoring with Branded & Algebraic Types" },
      { id: "react-19-nextjs-ssr", title: "4. Auditing Server Actions & SSR Boundaries" },
      { id: "sql-performance", title: "5. Database Indexing & Query Plans" },
    ],
    sections: [
      {
        id: "beyond-autocomplete",
        title: "1. Moving Beyond Autocomplete",
        content: [
          "Most developers use AI as an inline tab-completion assistant. While helpful for boilerplate, this underutilizes the model's true capability: acting as an indefatigable, deeply read code auditor.",
          "When you supply rich architectural context and prompt the model as a Principal Engineer or Staff Architect, it can spot subtle concurrency race conditions, memory leaks, and leaky abstractions that standard linters miss completely.",
        ],
        linkedPromptId: "prompt-004",
      },
      {
        id: "strict-compiler-context",
        title: "2. Setting Strict Compiler & Version Constraints",
        content: [
          "The number one source of frustrating AI code hallucinations is version mismatch. If you ask for a Next.js or React solution without specifying the version, the model will blend React 17 lifecycle methods with React 19 actions.",
          "Always open your developer prompts with precise environment parameters: runtime (Node 22 / Bun 1.2), framework version (Next.js 15 App Router, React 19), and language standards (TypeScript 5.4+ with strictNullChecks and noImplicitAny).",
        ],
        codeSnippet: {
          language: "typescript",
          label: "Environment Grounding Example",
          code: "// Runtime: Node.js 22 LTS\n// Framework: Next.js 15.2 (Turbopack, App Router)\n// React: React 19 (Server Components enabled by default)\n// TypeScript: 5.5 (strict mode, exactOptionalPropertyTypes: true)",
        },
      },
      {
        id: "algebraic-types",
        title: "3. Refactoring with Branded & Algebraic Types",
        content: [
          "Lazy TypeScript code relies on optional booleans (`isLoading?`, `isError?`, `data?`), leading to illegal state representations (e.g. `isLoading: true` while `data` is present).",
          "Prompt the AI to refactor interfaces into discriminated unions and branded nominal types. This forces compiler-enforced exhaustiveness checks in switch statements and makes impossible states unrepresentable.",
        ],
        linkedPromptId: "prompt-005",
      },
      {
        id: "react-19-nextjs-ssr",
        title: "4. Auditing Server Actions & SSR Boundaries",
        content: [
          "React 19 Server Components require clear boundary discipline. Passing non-serializable objects (like class instances or functions) across the server-client divide triggers subtle hydration bugs.",
          "Use dedicated architecture review prompts to inspect your components. Direct the model to verify whether client state is unnecessarily lifted into server components or whether database queries are leaking into client bundles.",
        ],
        linkedPromptId: "prompt-006",
        callout: {
          type: "tip",
          text: "Combine React 19 component reviews with Next.js caching audits to ensure dynamic data is not unintentionally cached by the Data Cache.",
        },
      },
      {
        id: "sql-performance",
        title: "5. Database Indexing & Query Plans",
        content: [
          "Instead of asking AI to write a raw SQL query from scratch, paste your existing query alongside your schema DDL and table row counts.",
          "Prompt the model to explain the expected PostgreSQL EXPLAIN ANALYZE execution plan. Ask whether a Composite B-Tree index, GIN index, or partial index will prevent expensive sequential table scans.",
        ],
        linkedPromptId: "prompt-024",
      },
    ],
    relatedPromptIds: ["prompt-004", "prompt-005", "prompt-006", "prompt-007", "prompt-024"],
    relatedGuideSlugs: ["how-to-write-better-ai-prompts", "how-to-use-ai-for-productivity"],
    tags: ["TypeScript", "React 19", "Next.js", "SQL", "Code Review", "Architecture"],
  },

  // 3. AI Prompts for Resume Writing
  {
    id: "guide-003",
    slug: "ai-prompts-for-resume-writing",
    title: "AI Prompts for Resume Writing: The Google XYZ Impact Formula",
    description: "Transform passive job descriptions into quantifiable achievement bullets that pass Applicant Tracking Systems (ATS) and compel hiring managers.",
    summary: "Transform passive job descriptions into quantifiable achievement bullets that pass Applicant Tracking Systems (ATS) and compel hiring managers.",
    category: "Career & Resume",
    readingTime: "6 min read",
    publishedAt: "2026-02-18T00:00:00Z",
    updatedAt: "2026-03-27T00:00:00Z",
    featured: true,
    author: {
      name: "Beautiful AI Prompt Research Team",
      role: "Lead Prompt Architects",
    },
    tableOfContents: [
      { id: "ats-reality", title: "1. The Truth About ATS Parsers" },
      { id: "google-xyz-formula", title: "2. The Google XYZ Achievement Formula" },
      { id: "active-power-verbs", title: "3. Power Verbs vs. Passive Duties" },
      { id: "eliminating-ai-tells", title: "4. Eliminating Obvious 'AI-Generated' Tells" },
      { id: "tailoring-to-target-role", title: "5. Grounding with Target Job Specs" },
    ],
    sections: [
      {
        id: "ats-reality",
        title: "1. The Truth About ATS Parsers",
        content: [
          "Applicant Tracking Systems (ATS) do not reject resumes based on subjective magic. They are straightforward keyword and semantic matching parsers. If a recruiter searches for 'distributed systems Kafka latency', and your resume only says 'worked on messaging queue', your application gets buried.",
          "However, keyword stuffing without substance will fail the human recruiter screen 10 seconds later. The key is embedding technical keywords naturally inside high-impact metric statements.",
        ],
        linkedPromptId: "prompt-002",
      },
      {
        id: "google-xyz-formula",
        title: "2. The Google XYZ Achievement Formula",
        content: [
          "Former Google SVP of People Operations Laszlo Bock formalized the gold standard for resume bullets: 'Accomplished [X] as measured by [Y] by doing [Z].'",
          "Weak: 'Responsible for optimizing database queries.'",
          "Transformed: 'Reduced P99 checkout latency by 42% (saving $180k in annual cloud compute) by implementing Redis caching layers and composite B-tree indexing.'",
          "Prompt the AI specifically to extract the business outcome (X), the quantitative metric (Y), and the technical mechanism (Z) for every bullet point on your resume.",
        ],
        codeSnippet: {
          language: "text",
          label: "Google XYZ Transformation Structure",
          code: "Before: Managed social media accounts and created weekly posts.\nAfter: Grew organic developer impressions by 340% (from 50k to 220k monthly) by producing technical teardown threads and interactive code benchmarks.",
        },
      },
      {
        id: "active-power-verbs",
        title: "3. Power Verbs vs. Passive Duties",
        content: [
          "Never begin a resume bullet with passive filler like 'Assisted with', 'Helped in', or 'Responsible for'. These phrases signal junior execution and lack of ownership.",
          "Direct your prompt to begin every bullet with an active leadership verb: 'Architected', 'Spearheaded', 'Engineered', 'Overhauled', or 'Negotiated'.",
        ],
      },
      {
        id: "eliminating-ai-tells",
        title: "4. Eliminating Obvious 'AI-Generated' Tells",
        content: [
          "Recruiters review hundreds of resumes every week and can spot generic ChatGPT resumes instantly. Common AI tells include words like 'delved into', 'spearheaded a tapestry of synergies', or overly ornate adjectives.",
          "Instruct the AI: 'Write in concise, data-anchored, professional prose. Eliminate corporate clichés and adjectives. Every claim must tie directly to an engineering or business metric.'",
        ],
        callout: {
          type: "warning",
          text: "Never let an AI invent numbers you cannot defend in an interview. Provide your estimated baseline ranges in the prompt variables, and let the model structure the narrative around your real work.",
        },
      },
      {
        id: "tailoring-to-target-role",
        title: "5. Grounding with Target Job Specs",
        content: [
          "The most effective way to tailor your resume is to feed the full text of your target job description into the prompt. Direct the model to match competencies while preserving your factual work history.",
        ],
        linkedPromptId: "prompt-001",
      },
    ],
    relatedPromptIds: ["prompt-002", "prompt-001", "prompt-025"],
    relatedGuideSlugs: ["ai-prompts-for-job-interviews", "how-to-write-better-ai-prompts"],
    tags: ["Resume", "ATS", "Career", "Job Search", "Google XYZ"],
  },

  // 4. AI Prompts for Job Interviews
  {
    id: "guide-004",
    slug: "ai-prompts-for-job-interviews",
    title: "AI Prompts for Job Interviews: Simulating High-Pressure Panels",
    description: "How to use interactive multi-turn prompts to simulate system design grilling, behavioral STAR answers, and salary negotiation loops.",
    summary: "How to use interactive multi-turn prompts to simulate system design grilling, behavioral STAR answers, and salary negotiation loops.",
    category: "Career & Interview",
    readingTime: "7 min read",
    publishedAt: "2026-02-22T00:00:00Z",
    updatedAt: "2026-03-27T00:00:00Z",
    featured: true,
    author: {
      name: "Beautiful AI Prompt Research Team",
      role: "Lead Prompt Architects",
    },
    tableOfContents: [
      { id: "simulation-power", title: "1. The Power of Interactive Simulation" },
      { id: "system-design-grilling", title: "2. Simulating System Design Panels" },
      { id: "behavioral-star", title: "3. Sharpening Behavioral STAR Stories" },
      { id: "compensation-negotiation", title: "4. Counter-Offer Phone Scripts & Branching Logic" },
    ],
    sections: [
      {
        id: "simulation-power",
        title: "1. The Power of Interactive Simulation",
        content: [
          "Reading about system design or interview questions is passive. Answering dynamic pushback under simulated pressure is active. Generative AI is uniquely suited to simulate turn-by-turn interviewers who don't give away answers upfront.",
          "When you prompt an AI to act as an unsparing interviewer, it exposes gaps in your logic before you face a real hiring committee.",
        ],
        linkedPromptId: "prompt-003",
      },
      {
        id: "system-design-grilling",
        title: "2. Simulating System Design Panels",
        content: [
          "In real senior engineering interviews, the interviewer evaluates how you scope requirements, handle ambiguities, and justify architectural trade-offs.",
          "Configure the prompt to start by asking: 'Here is the scale requirement: 50,000 writes/sec. How would you scope Functional and Non-Functional requirements?' Force the model to wait for your response, then push back on single points of failure, partition tolerance, and cache consistency.",
        ],
        linkedPromptId: "prompt-003",
        callout: {
          type: "tip",
          text: "After your practice session, ask the AI model for an Evaluation Scorecard across: Scoping, High-Level Architecture, Deep Dives, and Communication.",
        },
      },
      {
        id: "behavioral-star",
        title: "3. Sharpening Behavioral STAR Stories",
        content: [
          "Behavioral questions ('Tell me about a time you disagreed with leadership') trip up many candidates because their answers are rambling or defensive.",
          "Use the Situation-Task-Action-Result (STAR) prompt framework. Input your raw story and direct the AI to polish it for 2-minute verbal delivery: 15% Situation, 15% Task, 50% Action (what YOU specifically decided and executed), and 20% Result.",
        ],
        linkedPromptId: "prompt-021",
      },
      {
        id: "compensation-negotiation",
        title: "4. Counter-Offer Phone Scripts & Branching Logic",
        content: [
          "The negotiation phase carries the highest financial ROI of the entire hiring process. A 5-minute phone call can influence tens of thousands of dollars in total compensation.",
          "Use prompts that generate verbatim phone scripts. Give the model your initial offer, your target numbers, and your leverage points (competing offers, unvested bonuses). Ask for branching logic: what to say if the recruiter claims 'This is our final number' vs. 'We can only increase equity, not base.'",
        ],
        linkedPromptId: "prompt-025",
      },
    ],
    relatedPromptIds: ["prompt-003", "prompt-021", "prompt-025"],
    relatedGuideSlugs: ["ai-prompts-for-resume-writing", "how-to-write-better-ai-prompts"],
    tags: ["Interview", "System Design", "Behavioral", "STAR", "Negotiation"],
  },

  // 5. AI Prompts for YouTube
  {
    id: "guide-005",
    slug: "ai-prompts-for-youtube",
    title: "AI Prompts for YouTube: Scriptwriting for High Viewer Retention",
    description: "Structure high-retention video scripts with pattern interrupts, 15-second opening visual hooks, and 3-act narrative arcs that keep viewers watching.",
    summary: "Structure high-retention video scripts with pattern interrupts, 15-second opening visual hooks, and 3-act narrative arcs that keep viewers watching.",
    category: "Content Creation",
    readingTime: "6 min read",
    publishedAt: "2026-02-25T00:00:00Z",
    updatedAt: "2026-03-27T00:00:00Z",
    featured: false,
    author: {
      name: "Beautiful AI Prompt Research Team",
      role: "Lead Prompt Architects",
    },
    tableOfContents: [
      { id: "retention-graph", title: "1. The Reality of the Retention Graph" },
      { id: "opening-visual-hook", title: "2. Crafting the First 15 Seconds" },
      { id: "pattern-interrupts", title: "3. Pacing & Pattern Interrupts Every 60 Seconds" },
      { id: "three-act-structure", title: "4. The 3-Act Educational Narrative" },
    ],
    sections: [
      {
        id: "retention-graph",
        title: "1. The Reality of the Retention Graph",
        content: [
          "YouTube's recommendation algorithm is primarily driven by Click-Through Rate (CTR) and Average View Duration (AVD). A video with exceptional information will still die if 50% of viewers click away in the first 30 seconds.",
          "AI prompt engineering for video is not about writing generic spoken essays; it is about pacing, tension management, and visual cues.",
        ],
        linkedPromptId: "prompt-012",
      },
      {
        id: "opening-visual-hook",
        title: "2. Crafting the First 15 Seconds",
        content: [
          "Never start a YouTube video with 'Hi guys, welcome back to my channel! In today's video we are going to talk about...' That guarantees an immediate drop-off cliff.",
          "Prompt the AI to generate 3 hook variations that immediately validate the title and thumbnail promise within the first sentence, establish a high-stakes premise, and introduce an unanswered question.",
        ],
        codeSnippet: {
          language: "text",
          label: "15-Second Hook Directive",
          code: "[VISUAL: Close-up of terminal showing failed database failover]\nNARRATOR: 'In 2024, an engineering mistake cost one SaaS startup $2.4M in 14 minutes. Today, we break down the 4 lines of code that caused it—and why your current architecture probably has the exact same flaw.'",
        },
      },
      {
        id: "pattern-interrupts",
        title: "3. Pacing & Pattern Interrupts Every 60 Seconds",
        content: [
          "Monotonous voice delivery causes viewer fatigue. Direct the prompt to intersperse explicit visual cues: screen transitions, on-screen text callouts, B-roll suggestions, and tonal shifts every 45 to 60 seconds.",
        ],
      },
      {
        id: "three-act-structure",
        title: "4. The 3-Act Educational Narrative",
        content: [
          "Structure educational videos like mini-documentaries: Act 1 (The Problem & Stakes), Act 2 (The Conventional Wisdom vs. Why It Fails), Act 3 (The Breakthrough Solution & Live Implementation).",
        ],
        linkedPromptId: "prompt-012",
      },
    ],
    relatedPromptIds: ["prompt-012", "prompt-011", "prompt-013"],
    relatedGuideSlugs: ["ai-prompts-for-marketing", "how-to-write-better-ai-prompts"],
    tags: ["YouTube", "Video Scripts", "Storytelling", "Audience Retention"],
  },

  // 6. AI Prompts for Marketing
  {
    id: "guide-006",
    slug: "ai-prompts-for-marketing",
    title: "AI Prompts for Marketing: High-Converting B2B Copywriting & Funnels",
    description: "How to use prompt frameworks to craft high-converting B2B landing pages, battlecard sales objection matrices, and personalized cold outbound sequences.",
    summary: "How to use prompt frameworks to craft high-converting B2B landing pages, battlecard sales objection matrices, and personalized cold outbound sequences.",
    category: "Marketing & Growth",
    readingTime: "7 min read",
    publishedAt: "2026-03-01T00:00:00Z",
    updatedAt: "2026-03-28T00:00:00Z",
    featured: false,
    author: {
      name: "Beautiful AI Prompt Research Team",
      role: "Lead Prompt Architects",
    },
    tableOfContents: [
      { id: "b2b-clarity", title: "1. The Law of B2B Clarity" },
      { id: "landing-page-hero", title: "2. The 5-Second Landing Page Hero" },
      { id: "objection-matrices", title: "3. Battlecard Objection Matrices" },
      { id: "cold-outbound", title: "4. High-Reply Cold Outbound Sequences" },
    ],
    sections: [
      {
        id: "b2b-clarity",
        title: "1. The Law of B2B Clarity",
        content: [
          "B2B buyers do not purchase software because of clever puns or poetic metaphors; they purchase software to solve an acute operational pain, mitigate compliance risk, or accelerate revenue.",
          "When prompting AI for marketing, eliminate abstract buzzwords like 'Unlock your potential' or 'Seamless collaboration'. Demand concrete operational language that clearly states who the product is for and what measurable problem it solves.",
        ],
        linkedPromptId: "prompt-009",
      },
      {
        id: "landing-page-hero",
        title: "2. The 5-Second Landing Page Hero",
        content: [
          "A landing page visitor must understand three things within 5 seconds of loading: (1) What is this? (2) Who is it for? and (3) What is the immediate next step?",
          "Use prompts that generate a clear 3-part hero: an outcome-focused H1 headline, an explanatory 2-sentence subheadline with negative contrast ('without hiring expensive consultants'), and a low-friction primary CTA.",
        ],
        linkedPromptId: "prompt-009",
      },
      {
        id: "objection-matrices",
        title: "3. Battlecard Objection Matrices",
        content: [
          "Enterprise deals stall on predictable friction points: budget constraints, security compliance, integration headaches, and internal build-vs-buy debates.",
          "Use a structured battlecard prompt to prepare sales reps. Feed in your product features and competitor names, and have the model generate reframing questions that turn pricing objections into total-cost-of-ownership (TCO) arguments.",
        ],
        linkedPromptId: "prompt-010",
      },
      {
        id: "cold-outbound",
        title: "4. High-Reply Cold Outbound Sequences",
        content: [
          "Mass cold outreach is dead. High-reply outbound sequences are short (under 90 words), observation-driven, and focused on starting a conversation rather than pitching a 30-minute demo.",
          "Prompt the AI to construct 3-touchpoint sequences: (1) The Observational Trigger, (2) The Peer Benchmark Question, and (3) The Graceful Break-Up Note.",
        ],
        linkedPromptId: "prompt-023",
      },
    ],
    relatedPromptIds: ["prompt-009", "prompt-010", "prompt-023", "prompt-008"],
    relatedGuideSlugs: ["how-to-write-better-ai-prompts", "ai-prompts-for-youtube"],
    tags: ["Marketing", "Landing Pages", "Copywriting", "Sales Objections", "Outbound"],
  },

  // 7. How to Use AI for Productivity
  {
    id: "guide-007",
    slug: "how-to-use-ai-for-productivity",
    title: "How to Use AI for Productivity: Executive Timeboxing & Strategic Defense",
    description: "A pragmatic operating system for high performers: weekly timeboxing retrospectives, delicate boundary emails, and scope defense.",
    summary: "A pragmatic operating system for high performers: weekly timeboxing retrospectives, delicate boundary emails, and scope defense.",
    category: "Productivity",
    readingTime: "6 min read",
    publishedAt: "2026-03-05T00:00:00Z",
    updatedAt: "2026-03-28T00:00:00Z",
    featured: false,
    author: {
      name: "Beautiful AI Prompt Research Team",
      role: "Lead Prompt Architects",
    },
    tableOfContents: [
      { id: "cognitive-bandwidth", title: "1. Protecting Cognitive Bandwidth" },
      { id: "executive-timeboxing", title: "2. The Friday Retrospective & Calendar Timeboxing" },
      { id: "difficult-emails", title: "3. Drafting Difficult Boundary & Feedback Emails" },
      { id: "client-scope-defense", title: "4. Defending Consulting Scopes from Creep" },
    ],
    sections: [
      {
        id: "cognitive-bandwidth",
        title: "1. Protecting Cognitive Bandwidth",
        content: [
          "High productivity is not about churning through 80 emails an hour. It is about defending uninterrupted blocks of deep focus for your 3 most critical priorities.",
          "AI serves as an exceptional operational gatekeeper when prompted correctly: it can synthesize disjointed notes into executive briefings and turn stressful, emotionally charged situations into calm, constructive communications.",
        ],
        linkedPromptId: "prompt-014",
      },
      {
        id: "executive-timeboxing",
        title: "2. The Friday Retrospective & Calendar Timeboxing",
        content: [
          "Every Friday afternoon, paste your calendar events and completed tasks into the Executive Weekly Review prompt. Direct the model to apply the Pareto 80/20 rule: identify which 20% of activities drove real business impact and flag time drains that should be delegated or cancelled.",
          "Use the output to generate 3 mandatory deep-work blocks on your calendar for the following week before meeting requests fill the voids.",
        ],
        linkedPromptId: "prompt-014",
      },
      {
        id: "difficult-emails",
        title: "3. Drafting Difficult Boundary & Feedback Emails",
        content: [
          "Writing critical feedback or pushing back on an unreasonable stakeholder request often takes hours of agonized drafting. People worry about tone, politeness, and misinterpretation.",
          "Use the High-Stakes Difficult Feedback prompt. Provide your raw feelings, factual observations, and desired outcome. The model applies Nonviolent Communication (NVC) principles: stating objective observations without blame, expressing the organizational impact, and proposing a firm collaborative boundary.",
        ],
        linkedPromptId: "prompt-015",
      },
      {
        id: "client-scope-defense",
        title: "4. Defending Consulting Scopes from Creep",
        content: [
          "Solo consultants and agencies lose margin when clients casually ask for extra deliverables that were never in the contract. Prompt the AI to craft airtight Scopes of Work (SOW) with clear out-of-scope clauses and change-order pricing templates.",
        ],
        linkedPromptId: "prompt-019",
      },
    ],
    relatedPromptIds: ["prompt-014", "prompt-015", "prompt-019", "prompt-020"],
    relatedGuideSlugs: ["how-to-write-better-ai-prompts", "ai-prompts-for-developers"],
    tags: ["Productivity", "Timeboxing", "Difficult Emails", "Consulting", "Operations"],
  },

  // 8. ChatGPT Prompting Tips for Beginners
  {
    id: "guide-008",
    slug: "chatgpt-prompting-tips-for-beginners",
    title: "ChatGPT Prompting Tips for Beginners: From Casual Chat to Production Results",
    description: "The essential primer for newcomers: moving past basic conversational chat, writing structured templates, using brackets, and getting consistent responses.",
    summary: "The essential primer for newcomers: moving past basic conversational chat, writing structured templates, using brackets, and getting consistent responses.",
    category: "Beginner Primer",
    readingTime: "5 min read",
    publishedAt: "2026-03-10T00:00:00Z",
    updatedAt: "2026-03-28T00:00:00Z",
    featured: false,
    author: {
      name: "Beautiful AI Prompt Research Team",
      role: "Lead Prompt Architects",
    },
    tableOfContents: [
      { id: "mindset-shift", title: "1. The Mindset Shift: Director, Not Passenger" },
      { id: "bracket-variables", title: "2. The Magic of [Bracketed Variables]" },
      { id: "few-shot-examples", title: "3. Give 1 Good Example (Few-Shot Prompting)" },
      { id: "self-critique", title: "4. Always Ask the AI to Critique Its Own Output" },
    ],
    sections: [
      {
        id: "mindset-shift",
        title: "1. The Mindset Shift: Director, Not Passenger",
        content: [
          "When beginners use ChatGPT, they act like a passenger in a taxi: 'Take me somewhere cool.' The AI drives to a generic tourist trap. Expert users act like a movie director: 'Frame this camera shot at a 45-degree angle with dramatic shadow and intense pacing.'",
          "The single biggest upgrade you can make to your AI results is giving explicit directives regarding audience, tone, depth, and length.",
        ],
        linkedPromptId: "prompt-016",
      },
      {
        id: "bracket-variables",
        title: "2. The Magic of [Bracketed Variables]",
        content: [
          "Rather than re-writing prompts from scratch every day, create reusable prompt templates with bracketed variables like `[TOPIC]`, `[AUDIENCE]`, and `[DESIRED_OUTCOME]`.",
          "When you look at prompts on BeautifulAIPrompt.com, notice how every variable in purple brackets is modular. This allows you to fill in your specific details in seconds while preserving the underlying engineering structure.",
        ],
        codeSnippet: {
          language: "text",
          label: "Reusable Template Pattern",
          code: "Explain [COMPLEX_TOPIC] to someone with a background in [USER_BACKGROUND]. Use analogies from [ANALOGY_DOMAIN] and highlight 3 common misconceptions.",
        },
      },
      {
        id: "few-shot-examples",
        title: "3. Give 1 Good Example (Few-Shot Prompting)",
        content: [
          "If you want the AI to write in a specific voice or output data in a specific structure, provide ONE example of good output directly in your prompt. This is called 'One-Shot' or 'Few-Shot' prompting.",
          "Models match patterns with astonishing accuracy when shown an example. A single good example is worth three paragraphs of explanation.",
        ],
        callout: {
          type: "tip",
          text: "Whenever possible, paste an excerpt of writing or code that you love into the prompt and say: 'Match the rhythm, cadence, and formatting of this example.'",
        },
      },
      {
        id: "self-critique",
        title: "4. Always Ask the AI to Critique Its Own Output",
        content: [
          "Never accept the first response as final. A simple follow-up prompt can improve quality by 50%: 'Review your response above through the eyes of a skeptical expert. What is weak, generic, or missing? Provide an improved Revision 2.'",
        ],
        linkedPromptId: "prompt-017",
      },
    ],
    relatedPromptIds: ["prompt-016", "prompt-017", "prompt-002"],
    relatedGuideSlugs: ["how-to-write-better-ai-prompts", "ai-prompts-for-developers"],
    tags: ["Beginner", "ChatGPT", "Tips", "Templates", "Variables"],
  },
];
