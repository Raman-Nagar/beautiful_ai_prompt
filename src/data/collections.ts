import { Collection } from "@/types/collection";

export const COLLECTIONS: Collection[] = [
  // 1. AI Prompts for Developers
  {
    id: "col-developers",
    slug: "ai-prompts-for-developers",
    title: "AI Prompts for Developers",
    description: "Battle-tested prompt workflows for clean architecture, TypeScript refactoring, React 19 Server Components, Next.js optimization, and system design.",
    editorialOverview: "Modern software engineering with generative AI requires far more than generic code autocomplete. Elite developers treat AI models as rigorous peer reviewers, strict type architects, and distributed system sounding boards. This curated collection forms a cohesive development lifecycle: start by auditing architectural boundaries, refactor fragile untyped modules into strict TypeScript contracts, benchmark Server Component boundaries for React 19, and optimize database queries before deployment.",
    category: "coding",
    categoryName: "Coding & Engineering",
    promptIds: [
      "prompt-004", // Principal Code Reviewer & Architecture Auditor
      "prompt-005", // TypeScript Strict Type Refactoring Wizard
      "prompt-006", // React 19 Server Components & Actions Architecture Review
      "prompt-007", // Next.js App Router Cache & SSR Performance Auditor
      "prompt-024", // SQL Query Performance Optimizer & Index Explainer
    ],
    featured: true,
    targetAudience: "Frontend Engineers, Backend Architects & Full-Stack Developers",
    tags: ["React", "TypeScript", "Next.js", "SQL", "Architecture", "Code Review"],
    curatorNotes: "For best results, run these prompts in multi-turn conversations with Claude 3.7 Sonnet or ChatGPT-4o. Provide exact framework versions and file excerpts rather than broad descriptions.",
    keyTakeaways: [
      "Identify hidden architectural bottlenecks and single points of failure before code reaches PR.",
      "Eliminate `any` types and runtime crashes by leveraging algebraic data types and branded types.",
      "Prevent server-action re-render thrashing and caching pitfalls in modern Next.js and React 19 apps.",
      "Understand exact PostgreSQL execution plans and indexing strategies to reduce query latency by 10x.",
    ],
    relatedCollectionSlugs: ["ai-prompts-for-productivity", "ai-prompts-for-job-seekers"],
    createdAt: "2026-01-15T00:00:00Z",
    updatedAt: "2026-03-20T00:00:00Z",
  },

  // 2. AI Prompts for Job Seekers
  {
    id: "col-job-seekers",
    slug: "ai-prompts-for-job-seekers",
    title: "AI Prompts for Job Seekers",
    description: "End-to-end toolkit for ambitious job seekers: ATS resume bullet point optimization, behavioral STAR storytelling, system design panels, and compensation negotiation.",
    editorialOverview: "Landing top-tier offers in a competitive talent market demands high-signal positioning at every step. This collection operates as an executive career advisory team in your browser. Transform passive job descriptions into quantifiable Google XYZ achievement bullets, simulate turn-by-turn system design interviews with strict grading rubrics, polish behavioral answers with tight narrative hooks, and prepare data-driven counter-offers that maximize total compensation without risking goodwill.",
    category: "career",
    categoryName: "Career & Job Search",
    promptIds: [
      "prompt-001", // Strategic Career Transition Roadmap Architect
      "prompt-002", // ATS-Optimized Resume Bullet Point Transformer
      "prompt-003", // Senior System Design Mock Interviewer & Grader
      "prompt-021", // Behavioral STAR Interview Story Polisher
      "prompt-025", // Executive Salary & Equity Negotiation Script Architect
    ],
    featured: true,
    targetAudience: "Software Engineers, Product Managers, Engineering Managers & Executives",
    tags: ["Resume", "Interview", "Salary Negotiation", "System Design", "Behavioral"],
    curatorNotes: "Always anchor inputs with verifiable numbers and genuine past responsibilities. Use the mock interviewer prompt to practice unscripted answers before your real loops.",
    keyTakeaways: [
      "Re-frame your past accomplishments using Google's proven 'Accomplished [X] by doing [Z]' metric structure.",
      "Practice stress-tested distributed system design rounds with a realistic AI bar-raiser pushing on CAP trade-offs.",
      "Elevate behavioral interview stories using the Situation-Task-Action-Result format with executive brevity.",
      "Negotiate sign-on bonuses, equity grants, and base salary with word-for-word recruiter phone scripts.",
    ],
    relatedCollectionSlugs: ["ai-prompts-for-developers", "ai-prompts-for-productivity"],
    createdAt: "2026-01-18T00:00:00Z",
    updatedAt: "2026-03-22T00:00:00Z",
  },

  // 3. AI Prompts for Content Creators
  {
    id: "col-content-creators",
    slug: "ai-prompts-for-content-creators",
    title: "AI Prompts for Content Creators",
    description: "Storytelling frameworks, retention pacing directors, viral LinkedIn/X hooks, and editorial polishing for modern digital writers.",
    editorialOverview: "In an attention-scarce digital landscape, high-performing content balances emotional hooks with rigorous analytical substance. This editorial collection arms writers, video producers, and thought leaders with verified frameworks used by top media teams. Architect opening 15-second YouTube visual hooks that crush viewer drop-off, test contrasting intellectual angles on Twitter/X and LinkedIn, and systematically prune 20% of filler prose from long-form technical essays.",
    category: "writing",
    categoryName: "Writing & Content Creation",
    promptIds: [
      "prompt-011", // High-Signal LinkedIn & X Thought Leadership Hook Architect
      "prompt-012", // High-Retention YouTube Video Scriptwriter & Pacing Director
      "prompt-013", // Long-Form Technical Essay & Editorial Polisher
    ],
    featured: true,
    targetAudience: "YouTube Creators, Technical Writers, Ghostwriters & Thought Leaders",
    tags: ["YouTube", "Social Media", "Newsletters", "Hooks", "Storytelling"],
    curatorNotes: "Feed existing drafts or raw bulleted insights into these prompts to retain your distinctive human voice while sharpening structure and information density.",
    keyTakeaways: [
      "Engineer 4 distinct hook archetypes (Counter-Intuitive, Data Revelation, Contrarian, and Hard Truth).",
      "Structure multi-act video scripts with pattern interrupts every 45-60 seconds to maintain audience watch time.",
      "Prune passive voice, redundant buzzwords, and vague generalizations from technical articles.",
    ],
    relatedCollectionSlugs: ["ai-prompts-for-business", "ai-prompts-for-productivity"],
    createdAt: "2026-02-01T00:00:00Z",
    updatedAt: "2026-03-24T00:00:00Z",
  },

  // 4. AI Prompts for Business
  {
    id: "col-business",
    slug: "ai-prompts-for-business",
    title: "AI Prompts for Business",
    description: "Strategic execution suite: SaaS unit economics modeling, high-converting landing page copy, enterprise sales objections, and outbound campaigns.",
    editorialOverview: "Building and scaling a B2B business requires continuous translation between technical capabilities and tangible customer ROI. This collection delivers commercial clarity across product strategy, go-to-market execution, and sales closing. Model LTV/CAC ratios and burn multiple sensitivities, draft conversion-oriented landing pages that speak directly to executive buyers, craft product requirement documents (PRDs) that engineers respect, and counter enterprise sales hesitation with confidence.",
    category: "business",
    categoryName: "Business & Strategy",
    promptIds: [
      "prompt-008", // B2B SaaS Business Model & Unit Economics Architect
      "prompt-009", // High-Converting B2B SaaS Landing Page Copywriter
      "prompt-010", // Enterprise Sales Objection Counter-Matrix & Battlecard
      "prompt-022", // Zero-to-One Product Requirement Document (PRD) Author
      "prompt-023", // Cold Outbound Email Sequence Architect
    ],
    featured: true,
    targetAudience: "Startup Founders, Product Managers, Growth Leads & Enterprise Account Executives",
    tags: ["SaaS", "Unit Economics", "Sales", "Landing Pages", "PRD", "Outbound"],
    curatorNotes: "Provide detailed buyer persona context and customer pain points to avoid bland corporate messaging and produce sharp commercial collateral.",
    keyTakeaways: [
      "Pressure-test SaaS financial unit economics across payback periods, net retention (NDR), and gross margins.",
      "Write hero copy that clarifies your value proposition within 5 seconds of page load.",
      "Equip sales teams with objection matrices that address budget freezing, legacy inertia, and security reviews.",
      "Draft crystal-clear PRDs with edge-case specifications and telemetry acceptance criteria.",
    ],
    relatedCollectionSlugs: ["ai-prompts-for-content-creators", "ai-prompts-for-productivity"],
    createdAt: "2026-02-05T00:00:00Z",
    updatedAt: "2026-03-25T00:00:00Z",
  },

  // 5. AI Prompts for Students
  {
    id: "col-students",
    slug: "ai-prompts-for-students",
    title: "AI Prompts for Students",
    description: "Accelerated learning frameworks: Feynman technique concept deconstruction, spaced repetition Anki card generation, and literature review auditing.",
    editorialOverview: "Deep intellectual comprehension is built through active recall, deliberate concept synthesis, and rigorous verification of counter-evidence. Designed for undergraduate, graduate, and lifelong learners, this collection transforms AI into an unsparing Socratic tutor. Break complex physics, computer science, or economic theories down into intuitive first principles, generate high-yield spaced repetition flashcards, and discover contrary academic evidence before drafting research papers.",
    category: "learning",
    categoryName: "Learning & Education",
    promptIds: [
      "prompt-016", // Feynman Technique Deep-Learning Curriculum Architect
      "prompt-017", // Spaced Repetition Flashcard & High-Yield Exam Crammer
      "prompt-018", // Academic Literature Review & Counter-Evidence Auditor
    ],
    featured: true,
    targetAudience: "University Students, Graduate Researchers, Self-Taught Engineers & Lifelong Learners",
    tags: ["Feynman Technique", "Anki", "Flashcards", "Research", "Literature Review"],
    curatorNotes: "Pair the Feynman technique prompts with active self-testing. When generating flashcards, export directly into Anki or your personal note-taking system for regular review.",
    keyTakeaways: [
      "Deconstruct abstract formulas and theories into everyday analogies using the proven Feynman method.",
      "Generate high-yield Q&A flashcards optimized for 2-way active recall and cognitive retention.",
      "Identify methodological flaws, counter-theses, and publication blindspots in academic literature.",
    ],
    relatedCollectionSlugs: ["ai-prompts-for-productivity", "ai-prompts-for-developers"],
    createdAt: "2026-02-12T00:00:00Z",
    updatedAt: "2026-03-26T00:00:00Z",
  },

  // 6. AI Prompts for Productivity
  {
    id: "col-productivity",
    slug: "ai-prompts-for-productivity",
    title: "AI Prompts for Productivity",
    description: "Operating systems for high performers: executive timeboxing, high-stakes feedback drafting, client proposal retainers, and customer support de-escalation.",
    editorialOverview: "Productivity is not about working more hours; it is about protecting cognitive bandwidth for high-leverage strategic decisions. This collection acts as your operational command center. Conduct weekly retrospective timeboxing to eliminate reactive busywork, draft delicate high-stakes feedback emails that protect interpersonal relationships while enforcing standards, structure freelance scopes of work that protect your margin, and de-escalate upset customers with profound empathy.",
    category: "productivity",
    categoryName: "Productivity & Operations",
    promptIds: [
      "prompt-014", // Executive Weekly Review & Timeboxing Prioritizer
      "prompt-015", // High-Stakes Difficult Feedback & Boundary Email Drafter
      "prompt-019", // Freelance Scope of Work & Retainer Proposal Architect
      "prompt-020", // High-Empathy Customer Support & Incident De-escalation
    ],
    featured: true,
    targetAudience: "Managers, Solo Consultants, Customer Success Leads & Operations Specialists",
    tags: ["Timeboxing", "Difficult Feedback", "Proposals", "Customer Support", "Operations"],
    curatorNotes: "Use the weekly review prompt every Friday afternoon to reset your calendar and prioritize only the 3 vital priorities for the upcoming week.",
    keyTakeaways: [
      "Structure calendar timeboxing based on the Pareto principle (80% of outcome from 20% of deep focus).",
      "Navigate sensitive managerial conversations using the Nonviolent Communication (NVC) framework.",
      "Protect consulting margins with airtight milestone scopes and clear scope-creep clause wording.",
      "Turn disgruntled customer tickets into brand advocates through systematic root-cause de-escalation.",
    ],
    relatedCollectionSlugs: ["ai-prompts-for-developers", "ai-prompts-for-business"],
    createdAt: "2026-02-15T00:00:00Z",
    updatedAt: "2026-03-28T00:00:00Z",
  },
];
