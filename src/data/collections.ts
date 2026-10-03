import { Collection } from "@/types/collection";

export const COLLECTIONS: Collection[] = [
  // 1. AI Prompts for Software Developers
  {
    id: "col-software-developers",
    slug: "ai-prompts-for-software-developers",
    title: "AI Prompts for Software Developers",
    shortDescription: "A systematic engineering toolkit covering technical design, edge-case testing, rigorous code review, and root-cause debugging.",
    description: "Engineered for software engineers, backend architects, and full-stack developers who need AI to operate as an unforgiving peer reviewer and architecture sounding board. Rather than generic code autocomplete, this collection guides you from initial technical design (RFCs and ADRs) through exhaustive test generation, multi-dimension pull request auditing, production incident analysis, and latency profiling.",
    editorialOverview: "Modern software engineering with generative AI requires far more than generic code autocomplete. Elite developers treat AI models as rigorous peer reviewers, strict type architects, and distributed system sounding boards. This curated collection forms a cohesive development lifecycle: start by documenting architectural decisions and RFCs, generate comprehensive edge-case unit test suites with mocks, conduct multi-dimensional code reviews, and conduct blameless 5-whys root cause investigations when incidents occur.",
    category: "coding",
    categoryName: "Coding & Engineering",
    categoryIds: ["coding", "ai-development"],
    promptIds: [
      "prompt-004", // Principal Code Reviewer & Architecture Auditor
      "prompt-047", // Engineering RFC & Technical Design Document Author
      "prompt-126", // Architectural Decision Record (ADR) Analysis & Trade-Off Matrix
      "prompt-043", // Exhaustive Edge-Case Unit & Integration Test Generator
      "prompt-130", // Edge-Case Driven Unit Test Suite Generator with Mocks
      "prompt-134", // Constructive Multi-Dimension Pull Request Code Review
      "prompt-041", // Production Incident Post-Mortem & Root-Cause Synthesizer
      "prompt-132", // Production Bug Forensic Root-Cause Analysis & 5-Whys
      "prompt-136", // System Performance Bottleneck & Latency Waterfall Profiler
      "prompt-133", // Production Engineering Runbook & Architecture Documentation
    ],
    tags: ["Architecture", "Code Review", "Testing", "Debugging", "RFC", "Performance"],
    featured: true,
    icon: "Code2",
    targetAudience: "Software Engineers, Backend Architects & Tech Leads",
    curatorNotes: "For best results, provide full function signatures, data models, and relevant configuration blocks rather than asking broad coding questions. Pair with Claude 3.7 Sonnet or ChatGPT-4o in multi-turn discussions.",
    keyTakeaways: [
      "Establish clear architecture boundaries with RFCs and ADR trade-off matrices before writing production code.",
      "Generate edge-case test suites that catch null states, race conditions, and boundary overflow errors.",
      "Perform multi-dimension code reviews evaluating maintainability, security vulnerabilities, and algorithmic efficiency.",
      "Execute blameless 5-whys post-mortems and write structured engineering runbooks for production resilience.",
    ],
    workflowSteps: [
      { step: 1, title: "Draft Technical RFC & ADR", description: "Define system boundaries, data contracts, and architectural trade-offs using structured templates.", promptId: "prompt-047" },
      { step: 2, title: "Architectural Decision Auditing", description: "Audit key technical decisions against future scalability bottlenecks and single points of failure.", promptId: "prompt-126" },
      { step: 3, title: "Generate Exhaustive Test Suites", description: "Produce comprehensive unit and integration tests with edge cases, mocks, and boundary assertions.", promptId: "prompt-130" },
      { step: 4, title: "Multi-Dimension Pull Request Review", description: "Review code against security vulnerabilities, readability, modularity, and runtime performance.", promptId: "prompt-134" },
      { step: 5, title: "Incident Analysis & Runbook Authoring", description: "Perform blameless root-cause analysis and author operational runbooks for production stability.", promptId: "prompt-132" },
    ],
    relatedCollectionSlugs: [
      "ai-prompts-for-react-developers",
      "ai-prompts-for-javascript-developers",
      "ai-prompts-for-nextjs-developers",
      "project-management-toolkit",
    ],
    createdAt: "2026-01-15T00:00:00Z",
    updatedAt: "2026-03-20T00:00:00Z",
  },

  // 2. Get Your Next Job
  {
    id: "col-get-your-next-job",
    slug: "get-your-next-job",
    title: "Get Your Next Job",
    shortDescription: "An end-to-end career transition roadmap from skill-gap analysis and ATS resume tailoring to mock interviews and salary negotiation.",
    description: "Built for ambitious professionals aiming for their next career milestone. This comprehensive workflow guides you through identifying target role expectations, auditing and closing skill gaps, translating past experience into quantifiable ATS-optimized achievements, practicing high-stakes behavioral interviews, and negotiating total compensation with confidence.",
    editorialOverview: "Landing top-tier offers in a competitive talent market demands high-signal positioning at every step. This collection operates as an executive career advisory team in your browser. Transform passive job descriptions into quantifiable Google XYZ achievement bullets, simulate turn-by-turn interviews with strict grading rubrics, polish behavioral answers with tight narrative hooks, and prepare data-driven counter-offers that maximize total compensation without risking goodwill.",
    category: "career",
    categoryName: "Career & Job Search",
    categoryIds: ["career", "resume", "job-interview"],
    promptIds: [
      "prompt-001", // Strategic Career Transition Roadmap Architect
      "prompt-027", // Strategic Skill-Gap Analysis & Upskilling Roadmap
      "prompt-002", // ATS-Optimized Resume Bullet Point Transformer
      "prompt-031", // Targeted Resume Tailoring & Keyword Alignment Engine
      "prompt-030", // High-Signal Executive Networking & Cold Advisory Outreach
      "prompt-040", // High-Impact 'Tell Me About Yourself' Narrative Architect
      "prompt-021", // Behavioral STAR Interview Story Polisher
      "prompt-036", // Reverse Interview: High-Signal Questions for the Hiring Team
      "prompt-025", // Executive Salary & Equity Negotiation Script
    ],
    tags: ["Career Search", "Resume", "Interview", "Networking", "Salary Negotiation"],
    featured: true,
    icon: "Briefcase",
    targetAudience: "Job Seekers, Career Changers & Tech Professionals",
    curatorNotes: "Execute these prompts in chronological order: start with role scoping and resume tailoring before scheduling interview prep. Always provide actual job descriptions to maximize contextual tailoring.",
    keyTakeaways: [
      "Map realistic career transition paths with structured milestone checkpoints and skill-gap identification.",
      "Re-engineer resume bullets using Google's XYZ formula to showcase undeniable business impact.",
      "Master behavioral interview loops using the refined STAR framework with crisp situation framing.",
      "Negotiate sign-on bonuses, equity grants, and base salary using respectful, data-backed phone scripts.",
    ],
    workflowSteps: [
      { step: 1, title: "Define Career Transition & Roadmap", description: "Audit current skills, analyze target role requirements, and build a high-leverage transition roadmap.", promptId: "prompt-001" },
      { step: 2, title: "Tailor Resume & Achievement Bullets", description: "Convert vague task lists into quantifiable Google XYZ achievement bullets calibrated for ATS parsers.", promptId: "prompt-002" },
      { step: 3, title: "Executive Networking & Outreach", description: "Draft high-signal, non-needy outreach messages to hiring managers and potential executive mentors.", promptId: "prompt-030" },
      { step: 4, title: "Rehearse Behavioral & Reverse Interviews", description: "Structure STAR interview responses and prepare insightful reverse questions that impress hiring committees.", promptId: "prompt-021" },
      { step: 5, title: "Negotiate Top-of-Band Compensation", description: "Prepare data-driven counter-offers for base salary, equity grants, and sign-on incentives.", promptId: "prompt-025" },
    ],
    relatedCollectionSlugs: [
      "build-a-better-resume",
      "ace-your-job-interview",
      "professional-communication-toolkit",
    ],
    createdAt: "2026-01-18T00:00:00Z",
    updatedAt: "2026-03-22T00:00:00Z",
  },

  // 3. Build a Better Resume
  {
    id: "col-build-a-better-resume",
    slug: "build-a-better-resume",
    title: "Build a Better Resume",
    shortDescription: "Transform vague job duties into quantifiable, ATS-friendly achievement bullets that immediately capture hiring manager attention.",
    description: "Designed for professionals updating their resume or struggling to pass ATS filters. This collection focuses exclusively on resume transformation: crafting high-impact executive summaries, translating complex technical projects into quantifiable business results, reframing career gaps, and condensing dense histories into a sleek one-page format.",
    editorialOverview: "Recruiters spend an average of 6 seconds scanning an initial resume. Generic task lists and vague responsibilities get filtered out immediately. This collection turns your resume into an executive marketing document. Learn to articulate business impact with quantifiable metrics, optimize for ATS keyword parsing without keyword stuffing, and craft a compelling professional summary that sets you apart.",
    category: "resume",
    categoryName: "Resume Optimization",
    categoryIds: ["resume", "career"],
    promptIds: [
      "prompt-032", // Executive Resume Summary & Value Proposition Drafter
      "prompt-002", // ATS-Optimized Resume Bullet Point Transformer
      "prompt-031", // Targeted Resume Tailoring & Keyword Alignment Engine
      "prompt-033", // Complex Technical Project Experience Bullet Rewriter
      "prompt-034", // Career Gap & Non-Linear Trajectory Resume Reframer
      "prompt-035", // High-Impact One-Page Executive Resume Condenser
      "prompt-217", // Annual Performance Review Self-Appraisal & Impact Synthesizer
    ],
    tags: ["Resume", "ATS", "Bullet Points", "Executive Summary", "Career Gap"],
    featured: false,
    icon: "FileText",
    targetAudience: "Job Seekers, Executives & Career Pivoteers",
    curatorNotes: "Feed in your current draft bullets alongside the exact job specification. Let the AI extract the core metric and rewrite using active leadership verbs.",
    keyTakeaways: [
      "Draft compelling 3-sentence executive summaries that position your core value proposition.",
      "Convert passive responsibility statements into punchy, metric-driven achievement bullets.",
      "Align technical competencies directly with target job description keyword requirements.",
      "Strategically reframe career transitions, sabbaticals, and non-linear paths as strengths.",
    ],
    workflowSteps: [
      { step: 1, title: "Craft Executive Value Proposition", description: "Write an impactful 3-4 sentence professional summary that immediately establishes authority and niche expertise.", promptId: "prompt-032" },
      { step: 2, title: "Transform Bullets to Google XYZ Format", description: "Rewrite everyday tasks into quantifiable business results highlighting scale, efficiency, or revenue.", promptId: "prompt-002" },
      { step: 3, title: "Targeted Job Keyword Alignment", description: "Scan the target job description to seamlessly integrate essential hard skills and ATS search terms.", promptId: "prompt-031" },
      { step: 4, title: "Condense to Sleek One-Page Format", description: "Prune repetitive prose and condense extensive career histories into a crisp, high-impact single page.", promptId: "prompt-035" },
    ],
    relatedCollectionSlugs: [
      "get-your-next-job",
      "ace-your-job-interview",
      "professional-communication-toolkit",
    ],
    createdAt: "2026-01-20T00:00:00Z",
    updatedAt: "2026-03-24T00:00:00Z",
  },

  // 4. Ace Your Job Interview
  {
    id: "col-ace-your-job-interview",
    slug: "ace-your-job-interview",
    title: "Ace Your Job Interview",
    shortDescription: "Simulate realistic interview loops with strict grading rubrics across behavioral STAR stories, technical design, and reverse questions.",
    description: "A complete interview rehearsal suite for technical, behavioral, and leadership loops. Practice answering tough behavioral questions with crisp STAR framing, rehearse live coding communication strategies, simulate distributed system design panels with an unsparing interviewer, and prepare reverse questions that demonstrate strategic curiosity.",
    editorialOverview: "The difference between a rejection and an offer is rarely raw capability; it is communication under pressure. This collection trains you to structure your thinking, articulate trade-offs in real-time, and answer difficult behavioral questions with executive polish. Use the mock interviewer prompts to simulate realistic interview loops before you step into the real room.",
    category: "job-interview",
    categoryName: "Job Interviews",
    categoryIds: ["job-interview", "career"],
    promptIds: [
      "prompt-040", // High-Impact 'Tell Me About Yourself' Narrative Architect
      "prompt-021", // Behavioral STAR Interview Story Polisher
      "prompt-038", // Behavioral Failure & Workplace Conflict Answer Architect
      "prompt-003", // Senior System Design Mock Interviewer & Grader
      "prompt-037", // Live Coding Interview Communication & Trade-Off Narrator
      "prompt-039", // Product & Business Case Study Interview Simulator
      "prompt-036", // Reverse Interview: High-Signal Questions for the Hiring Team
      "prompt-219", // Tactical Salary Compensation Review & Market Parity Script
    ],
    tags: ["Interview Prep", "STAR Method", "Mock Interview", "System Design", "Behavioral"],
    featured: false,
    icon: "MessageSquare",
    targetAudience: "Engineers, Product Managers & Interview Candidates",
    curatorNotes: "Use voice mode or speak your answers aloud into the prompt to practice delivery cadence, concise framing, and avoiding filler words.",
    keyTakeaways: [
      "Deliver memorable 90-second 'Tell me about yourself' answers that hook interviewers immediately.",
      "Master behavioral storytelling with structured context, high-agency actions, and measurable outcomes.",
      "Demonstrate architectural maturity during system design and technical interview loops.",
      "Ask high-signal reverse interview questions that reveal genuine company culture and team dynamics.",
    ],
    workflowSteps: [
      { step: 1, title: "Perfect Your 90-Second Opening Pitch", description: "Craft an engaging, tailored personal narrative answering 'Tell me about yourself' without rambling.", promptId: "prompt-040" },
      { step: 2, title: "Rehearse STAR Behavioral Stories", description: "Structure concise stories around leadership, conflict resolution, and technical problem solving.", promptId: "prompt-021" },
      { step: 3, title: "Simulate Technical & System Design Loops", description: "Practice turn-by-turn system design interviews with strict feedback on scale, data modeling, and trade-offs.", promptId: "prompt-003" },
      { step: 4, title: "Prepare High-Signal Reverse Questions", description: "Formulate sharp, insightful questions for hiring managers, technical peers, and cross-functional partners.", promptId: "prompt-036" },
    ],
    relatedCollectionSlugs: [
      "get-your-next-job",
      "build-a-better-resume",
      "professional-communication-toolkit",
    ],
    createdAt: "2026-01-22T00:00:00Z",
    updatedAt: "2026-03-24T00:00:00Z",
  },

  // 5. AI Prompts for React Developers
  {
    id: "col-react-developers",
    slug: "ai-prompts-for-react-developers",
    title: "AI Prompts for React Developers",
    shortDescription: "Deep architectural workflows for modern React: Server Components, custom hook decoupling, state machines, and re-render profiling.",
    description: "Curated for React engineers building complex, performance-critical web applications. Move past basic component styling with advanced prompts for React 19 Server Components, compound component patterns, Zustand state architecture, custom hook logic extraction, re-render cascade profiling, and accessible React Testing Library suites.",
    editorialOverview: "Building scalable React applications in 2026 requires understanding fine-grained reactivity, server component boundaries, and headless component composition. This collection acts as your staff-level React architect, helping you identify memoization antipatterns, decouple UI from business logic, choose the right state management approach, and build resilient accessible components.",
    category: "react",
    categoryName: "React Engineering",
    categoryIds: ["react", "coding"],
    promptIds: [
      "prompt-006", // React 19 Server Components & Actions Architecture Review
      "prompt-054", // Compound Component & Polymorphic Slot Pattern Architect
      "prompt-142", // React Component Composition & Compound Component Architecture Review
      "prompt-055", // Zustand & Finite State Machine Architecture Designer
      "prompt-144", // React State Architecture & Store Selection Matrix (Zustand vs Jotai vs Context)
      "prompt-056", // Custom Hook Extraction & Clean Logic Decoupler
      "prompt-053", // React Re-render Thrashing & Memoization Auditor
      "prompt-143", // React Re-render Cascade & Context API Performance Profiler
      "prompt-145", // React Testing Library Accessible Component Testing Strategy
    ],
    tags: ["React", "React 19", "Server Components", "Zustand", "Hooks", "Testing Library"],
    featured: false,
    icon: "Atom",
    targetAudience: "React Developers, Frontend Architects & UI Engineers",
    curatorNotes: "Paste actual component definitions, prop interfaces, and state declarations into the prompt for fine-grained re-render and accessibility audits.",
    keyTakeaways: [
      "Audit React 19 Server Components and Server Actions for optimal streaming and security boundaries.",
      "Implement flexible compound component and polymorphic slot patterns for clean component APIs.",
      "Select and structure scalable state management with Zustand, Jotai, or Context based on update frequency.",
      "Profile re-render cascades and write robust accessibility-focused React Testing Library specs.",
    ],
    workflowSteps: [
      { step: 1, title: "Evaluate Component Boundaries & Server Actions", description: "Audit data fetching, props serialization, and server-side action boundaries in React 19.", promptId: "prompt-006" },
      { step: 2, title: "Architect Clean Composition Patterns", description: "Design headless compound components and polymorphic slots for maximum UI flexibility.", promptId: "prompt-054" },
      { step: 3, title: "Decouple Business Logic into Custom Hooks", description: "Extract side effects and UI state out of presentational components into clean, testable hooks.", promptId: "prompt-056" },
      { step: 4, title: "Profile Re-render Thrashing", description: "Identify unnecessary renders, misconfigured context providers, and improper memoization dependencies.", promptId: "prompt-053" },
      { step: 5, title: "Write Accessible Integration Tests", description: "Generate user-centric React Testing Library assertions querying by ARIA roles and labels.", promptId: "prompt-145" },
    ],
    relatedCollectionSlugs: [
      "ai-prompts-for-javascript-developers",
      "ai-prompts-for-nextjs-developers",
      "ai-prompts-for-software-developers",
      "ai-prompts-for-designers",
    ],
    createdAt: "2026-01-25T00:00:00Z",
    updatedAt: "2026-03-25T00:00:00Z",
  },

  // 6. AI Prompts for JavaScript Developers
  {
    id: "col-javascript-developers",
    slug: "ai-prompts-for-javascript-developers",
    title: "AI Prompts for JavaScript Developers",
    shortDescription: "Master JavaScript and TypeScript fundamentals: event loop concurrency, V8 memory profiling, strict typing, and stream resilience.",
    description: "A masterclass in modern JavaScript runtime mechanics and TypeScript type safety. Dive deep into event loop microtask sequencing, race condition debugging, V8 garbage collection and memory leak diagnostics, array processing pipeline optimization, Node.js stream unit testing, and strict algebraic data typing.",
    editorialOverview: "True JavaScript mastery lies in understanding the runtime: how the V8 engine allocates memory, how the microtask queue resolves promises, and how asynchronous race conditions corrupt application state. This collection helps you write bulletproof JavaScript and TypeScript, eliminate runtime crashes, and optimize data processing bottlenecks in browser and Node.js environments.",
    category: "javascript",
    categoryName: "JavaScript & TypeScript",
    categoryIds: ["javascript", "coding"],
    promptIds: [
      "prompt-005", // TypeScript Strict Type Refactoring Wizard
      "prompt-049", // JavaScript Event Loop, Microtask & Concurrency Explainer
      "prompt-138", // JavaScript Asynchronous Concurrency & Race Condition Debugger
      "prompt-050", // JavaScript Memory Leak & Retained Objects Profiler
      "prompt-139", // JavaScript V8 Engine & Memory Allocation Optimizer
      "prompt-051", // JavaScript Array & Data Processing Pipeline Optimizer
      "prompt-140", // Modern JavaScript Prototype Chain & Closure Scoping Explainer
      "prompt-052", // Node.js Async Error Handling & Crash Resilience Auditor
      "prompt-141", // JavaScript Node.js Stream & Buffer Unit Test Suite Generator
    ],
    tags: ["JavaScript", "TypeScript", "Event Loop", "V8 Engine", "Memory Leak", "Node.js"],
    featured: false,
    icon: "FileCode",
    targetAudience: "JavaScript Developers, Node.js Engineers & TypeScript Architects",
    curatorNotes: "When debugging race conditions or memory leaks, include minimal reproducible examples and heap snapshot summaries to get surgical refactoring guidance.",
    keyTakeaways: [
      "Refactor unsafe type assertions into strict TypeScript algebraic contracts and branded types.",
      "Debug complex asynchronous race conditions and understand microtask execution order.",
      "Diagnose retained closures and memory leaks in long-running Node.js and browser sessions.",
      "Optimize heavy data processing pipelines for minimal garbage collection overhead.",
    ],
    workflowSteps: [
      { step: 1, title: "Refactor with Strict TypeScript Contracts", description: "Eliminate any types, add branded primitive types, and define exhaustive discriminated unions.", promptId: "prompt-005" },
      { step: 2, title: "Audit Event Loop & Asynchronous Race Conditions", description: "Diagnose Promise sequencing, unhandled rejections, and timing-dependent race conditions.", promptId: "prompt-138" },
      { step: 3, title: "Profile Memory Allocation & Garbage Collection", description: "Identify detached DOM nodes, retained closures, and unbounded Map/Set memory leaks.", promptId: "prompt-050" },
      { step: 4, title: "Optimize High-Volume Data Pipelines", description: "Benchmark Array methods against generator pipelines and streams for optimal memory consumption.", promptId: "prompt-051" },
      { step: 5, title: "Harden Node.js Error Resilience", description: "Implement resilient async error handling, circuit breakers, and graceful shutdown listeners.", promptId: "prompt-052" },
    ],
    relatedCollectionSlugs: [
      "ai-prompts-for-react-developers",
      "ai-prompts-for-nextjs-developers",
      "ai-prompts-for-software-developers",
    ],
    createdAt: "2026-01-28T00:00:00Z",
    updatedAt: "2026-03-25T00:00:00Z",
  },

  // 7. AI Prompts for Next.js Developers
  {
    id: "col-nextjs-developers",
    slug: "ai-prompts-for-nextjs-developers",
    title: "AI Prompts for Next.js Developers",
    shortDescription: "Production-grade Next.js App Router workflows: RSC boundaries, Server Actions, edge caching, and programmatic SEO.",
    description: "Engineered for developers building modern full-stack web applications with Next.js 14 and 15. Audit your App Router architecture, establish strict Server vs. Client Component boundaries, optimize Turbopack bundles, architect dynamic OpenGraph images and JSON-LD structured data, and implement secure Edge Middleware authentication.",
    editorialOverview: "The Next.js App Router paradigm shifts how we think about full-stack web architecture: caching layers, server components, streaming suspense boundaries, and server actions require careful orchestration. This collection provides an architectural compass to ensure your Next.js applications remain fast, maintainable, and fully optimized for search engines.",
    category: "nextjs",
    categoryName: "Next.js App Router",
    categoryIds: ["nextjs", "react", "coding"],
    promptIds: [
      "prompt-146", // Next.js 15 App Router Enterprise Architecture & Route Group Blueprint
      "prompt-057", // Next.js Server vs. Client Component Boundary Decision Matrix
      "prompt-147", // Next.js RSC vs Client Boundary Architectural Evaluator
      "prompt-007", // Next.js App Router Performance & Cache Auditor
      "prompt-059", // Server Actions & Optimistic UI Mutation Architect
      "prompt-060", // Next.js Edge Middleware & Session Gatekeeper
      "prompt-058", // Next.js Dynamic OpenGraph & Programmatic SEO Architect
      "prompt-148", // Next.js Dynamic Metadata, OpenGraph & JSON-LD SEO Auditor
      "prompt-149", // Next.js Turbopack Bundle Analyzer & Streaming Suspense Optimizer
    ],
    tags: ["Next.js", "App Router", "Server Components", "Turbopack", "SEO", "Server Actions"],
    featured: false,
    icon: "Zap",
    targetAudience: "Next.js Developers, Full-Stack Engineers & Technical Founders",
    curatorNotes: "Specify your exact Next.js minor version and routing structure (App Router vs Pages Router) to receive the most accurate caching and configuration advice.",
    keyTakeaways: [
      "Structure route groups, layouts, and loading templates for enterprise-scale Next.js apps.",
      "Draw strict architectural boundaries between Server and Client Components to minimize bundle size.",
      "Diagnose cache invalidation gotchas across fetch, route segment config, and tag revalidation.",
      "Implement dynamic OpenGraph image generation and automated Schema.org JSON-LD generation.",
    ],
    workflowSteps: [
      { step: 1, title: "Plan Route Groups & Layout Hierarchy", description: "Design maintainable route groups, nested layouts, and parallel/intercepting routes.", promptId: "prompt-146" },
      { step: 2, title: "Establish Server vs Client Component Boundaries", description: "Push client boundaries to the leaves of your component tree to keep client JS bundles small.", promptId: "prompt-057" },
      { step: 3, title: "Audit App Router Caching & Mutations", description: "Fine-tune revalidation tags, dynamic segment configurations, and optimistic Server Action updates.", promptId: "prompt-007" },
      { step: 4, title: "Implement Dynamic SEO & Structured Data", description: "Configure dynamic metadata generators, OG images via @vercel/og, and valid JSON-LD schemas.", promptId: "prompt-058" },
      { step: 5, title: "Profile Turbopack Bundles & Streaming", description: "Analyze production build bundles and wrap slow data waterfalls in streaming Suspense boundaries.", promptId: "prompt-149" },
    ],
    relatedCollectionSlugs: [
      "ai-prompts-for-react-developers",
      "ai-prompts-for-software-developers",
      "ai-prompts-for-javascript-developers",
    ],
    createdAt: "2026-02-01T00:00:00Z",
    updatedAt: "2026-03-26T00:00:00Z",
  },

  // 8. Start and Validate a Business Idea
  {
    id: "col-validate-business-idea",
    slug: "start-and-validate-a-business-idea",
    title: "Start and Validate a Business Idea",
    shortDescription: "A systematic framework for discovering customer pain points, stress-testing business models, and building launch-ready PRDs.",
    description: "Built for founders, solopreneurs, and product builders testing new concepts. Move methodically from customer Jobs-to-be-Done discovery and hypothesis kill-tests to one-page business model canvases, competitive moat teardowns, pivot stress-testing, and zero-to-one product launch checklists.",
    editorialOverview: "Most startups fail not from building poorly, but from building something nobody wants. This collection enforces rigorous upfront validation: identify critical existential assumptions before writing code, formulate falsifiable kill-tests, assess market dynamics, and draft product specs focused exclusively on solving validated customer problems.",
    category: "business",
    categoryName: "Business & Strategy",
    categoryIds: ["business", "marketing"],
    promptIds: [
      "prompt-079", // Jobs-to-be-Done (JTBD) Customer Problem Discovery Protocol
      "prompt-061", // Startup Idea Assumption & Kill-Test Validator
      "prompt-076", // Early-Stage Business Idea Feasibility & Risk Pre-Mortem
      "prompt-062", // Lean One-Page Business Model Canvas Synthesizer
      "prompt-063", // Competitive Moat & Competitor Feature Matrix Teardown
      "prompt-206", // Business Model Pivot Feasibility & Value Proposition Stress-Test
      "prompt-022", // Zero-to-One Product Requirement Document (PRD) Author
      "prompt-081", // Zero-to-One Product Launch Readiness & Execution Checklist
    ],
    tags: ["Idea Validation", "Lean Canvas", "Startup", "JTBD", "Product Launch", "PRD"],
    featured: false,
    icon: "TrendingUp",
    targetAudience: "Founders, Product Managers & Indie Hackers",
    curatorNotes: "Be completely honest about your market assumptions. Ask the AI to act as a skeptical seed investor who is actively trying to poke holes in your thesis.",
    keyTakeaways: [
      "Uncover genuine customer motivations using the Jobs-to-be-Done (JTBD) discovery protocol.",
      "Identify fatal assumptions early with structured hypothesis kill-tests and pre-mortems.",
      "Synthesize concise one-page lean canvases and competitive moat differentiation matrices.",
      "Author comprehensive PRDs and execution checklists that keep development focused on core value.",
    ],
    workflowSteps: [
      { step: 1, title: "Customer Problem Discovery (JTBD)", description: "Conduct customer discovery to uncover the functional, emotional, and social struggles of your target market.", promptId: "prompt-079" },
      { step: 2, title: "Formulate Falsifiable Kill-Tests", description: "Isolate your riskiest business assumptions and design quick, cheap experiments to validate demand.", promptId: "prompt-061" },
      { step: 3, title: "Synthesize Lean Canvas & Competitive Moat", description: "Map out customer segments, unique value propositions, revenue channels, and defensive moats.", promptId: "prompt-062" },
      { step: 4, title: "Draft Zero-to-One PRD & Launch Checklist", description: "Write an engineering-ready Product Requirements Document and execute a rigorous pre-launch checklist.", promptId: "prompt-022" },
    ],
    relatedCollectionSlugs: [
      "marketing-strategy-starter-kit",
      "small-business-ai-toolkit",
      "ai-prompts-for-freelancers",
    ],
    createdAt: "2026-02-04T00:00:00Z",
    updatedAt: "2026-03-26T00:00:00Z",
  },

  // 9. Marketing Strategy Starter Kit
  {
    id: "col-marketing-strategy-starter-kit",
    slug: "marketing-strategy-starter-kit",
    title: "Marketing Strategy Starter Kit",
    shortDescription: "Define sharp market positioning, construct detailed buyer personas, and design high-converting omnichannel launch funnels.",
    description: "A comprehensive strategic marketing suite for B2B and consumer brands. Implement April Dunford's 5-component positioning framework, build nuanced ideal customer profiles and emotional empathy maps, craft high-converting landing page copy, audit funnel drop-offs, and structure organic growth loops.",
    editorialOverview: "Marketing without distinct positioning is simply expensive noise. This curated kit helps you define exactly what makes your solution uniquely valuable to your best customers. From category differentiation to landing page conversion copywriting and multi-channel launch playbooks, this collection equips marketing leaders with verified growth frameworks.",
    category: "marketing",
    categoryName: "Marketing & Growth",
    categoryIds: ["marketing", "sales", "business"],
    promptIds: [
      "prompt-210", // April Dunford 5-Component Product Positioning & Category Creator
      "prompt-085", // Category Differentiation & Value Proposition Canvas
      "prompt-065", // B2B Ideal Customer Profile (ICP) & Buyer Persona Profiler
      "prompt-208", // B2B Ideal Customer Profile (ICP) & Emotional Empathy Map Builder
      "prompt-083", // Negative Buyer Persona & Anti-ICP Definition Framework
      "prompt-009", // High-Converting B2B SaaS Landing Page Copywriter
      "prompt-086", // B2B Marketing Funnel Leak Audit & Drop-Off Diagnostics
      "prompt-084", // Omnichannel Product Launch Campaign Playbook
      "prompt-209", // SEO Semantic Topic Cluster & Hub-and-Spoke Content Strategy
    ],
    tags: ["Positioning", "Buyer Persona", "Landing Page", "Funnel Audit", "SEO Strategy", "GTM"],
    featured: true,
    icon: "Target",
    targetAudience: "Marketing Directors, Growth Leads, Founders & Product Marketers",
    curatorNotes: "Start with the April Dunford positioning prompt before drafting copy. Clear positioning makes all subsequent messaging, landing pages, and email sequences 10x sharper.",
    keyTakeaways: [
      "Articulate crisp market positioning using competitive alternatives, unique attributes, and value.",
      "Build actionable ideal customer profiles paired with anti-ICP boundary definitions.",
      "Draft conversion-focused landing page copy that highlights key benefits within 5 seconds.",
      "Audit full marketing funnels to pinpoint and patch conversion leaks across each stage.",
    ],
    workflowSteps: [
      { step: 1, title: "Establish 5-Component Product Positioning", description: "Define your market category, competitive alternatives, differentiated capabilities, and target buyer.", promptId: "prompt-210" },
      { step: 2, title: "Build Positive & Negative Buyer Personas", description: "Create rich ideal customer profiles while explicitly filtering out bad-fit tire-kickers.", promptId: "prompt-065" },
      { step: 3, title: "Write Conversion-Focused Landing Page Copy", description: "Draft high-converting hero headlines, objection counters, feature callouts, and social proof sections.", promptId: "prompt-009" },
      { step: 4, title: "Audit Funnel Leaks & Drop-Off Points", description: "Diagnose drop-offs between ad impressions, landing page visits, demo signups, and paid conversions.", promptId: "prompt-086" },
      { step: 5, title: "Architect Organic Growth & Topic Clusters", description: "Plan authoritative semantic topic clusters that capture high-intent organic search volume.", promptId: "prompt-209" },
    ],
    relatedCollectionSlugs: [
      "start-and-validate-a-business-idea",
      "small-business-ai-toolkit",
      "create-better-social-media-content",
    ],
    createdAt: "2026-02-06T00:00:00Z",
    updatedAt: "2026-03-27T00:00:00Z",
  },

  // 10. Create Better Social Media Content
  {
    id: "col-create-better-social-media",
    slug: "create-better-social-media-content",
    title: "Create Better Social Media Content",
    shortDescription: "A high-signal social media system for LinkedIn and X: compelling hooks, carousel frameworks, and audience engagement drivers.",
    description: "Designed for creators, executives, and brand builders who want to stand out on LinkedIn and X (Twitter) without publishing generic AI platitudes. Structure high-converting thought leadership hooks, build content pillar matrices, repurpose long-form assets into engaging carousels, and spark genuine community discussions.",
    editorialOverview: "In modern social feeds, attention is won or lost in the opening two lines. This collection focuses on craft: engineering hooks that provoke genuine intellectual curiosity, structuring multi-slide visual carousels, transforming dense podcasts into bite-sized insights, and cultivating high-trust community engagement.",
    category: "social-media",
    categoryName: "Social Media Strategy",
    categoryIds: ["social-media", "content-creation"],
    promptIds: [
      "prompt-093", // Organic Brand Social Media Pillars & Topic Matrix Architect
      "prompt-011", // High-Signal LinkedIn & X Thought Leadership Hook Generator
      "prompt-095", // Founder & Executive LinkedIn Thought Leadership Authority Post
      "prompt-220", // LinkedIn Executive Authority & High-Engagement Thought Leadership Architect
      "prompt-094", // Visual Storytelling Carousel & Reel Concept Generator for Instagram
      "prompt-221", // Cross-Platform Longform-to-Shortform Content Repurposing Engine
      "prompt-096", // Core Podcast / Webinar to 10-Post Social Snippet Engine
      "prompt-222", // Viral Community Discussion & High-Reply Engagement Catalyst
    ],
    tags: ["LinkedIn", "X/Twitter", "Hooks", "Carousels", "Content Repurposing", "Engagement"],
    featured: false,
    icon: "Share2",
    targetAudience: "Content Creators, Founders, Ghostwriters & Social Media Managers",
    curatorNotes: "Provide your own raw perspectives and authentic stories. Use the prompts to sharpen structure, pacing, and formatting rather than generating ideas from scratch.",
    keyTakeaways: [
      "Master 4 hook archetypes: counter-intuitive facts, contrasting viewpoints, data revelations, and hard truths.",
      "Architect 3-5 core brand pillars that maintain topical consistency and authority.",
      "Repurpose single long-form articles or podcasts into 10 cohesive social media assets.",
      "Spark vibrant community discussions in comment sections to trigger organic platform reach.",
    ],
    workflowSteps: [
      { step: 1, title: "Establish Brand Content Pillars", description: "Define 3-5 core subject domains that build long-term thematic authority and follower loyalty.", promptId: "prompt-093" },
      { step: 2, title: "Engineer High-Signal Opening Hooks", description: "Craft opening lines that stop the scroll without resorting to cheap clickbait.", promptId: "prompt-011" },
      { step: 3, title: "Draft Executive LinkedIn Authority Posts", description: "Structure personal lessons, case studies, and contrarian perspectives into readable text posts.", promptId: "prompt-095" },
      { step: 4, title: "Repurpose Longform into Carousels & Snippets", description: "Deconstruct podcasts, webinars, or long articles into visually scannable multi-slide carousels.", promptId: "prompt-221" },
    ],
    relatedCollectionSlugs: [
      "youtube-creator-toolkit",
      "content-creator-productivity-kit",
      "marketing-strategy-starter-kit",
    ],
    createdAt: "2026-02-08T00:00:00Z",
    updatedAt: "2026-03-27T00:00:00Z",
  },

  // 11. YouTube Creator Toolkit
  {
    id: "col-youtube-creator-toolkit",
    slug: "youtube-creator-toolkit",
    title: "YouTube Creator Toolkit",
    shortDescription: "Retention-engineered workflows for YouTubers: high-CTR title ideation, first-30-seconds hooks, and full script pacing.",
    description: "Engineered for YouTube creators, video strategists, and editors focused on maximizing click-through rates (CTR) and average view duration (AVD). Explore viral video concepts, generate high-curiosity titles, rewrite weak opening hooks to stop viewer drop-off, and write full multi-act scripts with calculated pattern interrupts.",
    editorialOverview: "YouTube success is governed by two vital metrics: Click-Through Rate (CTR) and Viewer Retention (AVD). This collection equips creators with the exact narrative techniques top channels use. Test contrasting title concepts, diagnose and fix first-30-seconds pacing leaks, write engaging script outlines, and schedule predictable quarterly production batches.",
    category: "youtube",
    categoryName: "YouTube & Video",
    categoryIds: ["youtube", "content-creation", "social-media"],
    promptIds: [
      "prompt-098", // High-Search & High-Curiosity YouTube Video Concept Explorer
      "prompt-101", // YouTube CTR Title & SEO Description Optimizer
      "prompt-100", // First 30 Seconds YouTube Hook Diagnostics & Rewriter
      "prompt-012", // High-Retention YouTube Video Scriptwriter & Pacing Director
      "prompt-099", // Retention-Engineered YouTube Long-Form Video Scriptwriter
      "prompt-102", // Quarterly YouTube Channel Content Matrix & Batch Production Schedule
      "prompt-069", // Long-Form to Multi-Platform Content Repurposing Engine
    ],
    tags: ["YouTube", "Video Scripts", "Pacing", "Hooks", "Titles & CTR", "Retention"],
    featured: true,
    icon: "Video",
    targetAudience: "YouTubers, Video Producers, Educators & Channel Strategists",
    curatorNotes: "Always test titles and thumbnail concepts before writing your script. Align the video's opening 15 seconds directly with the promise made in your title.",
    keyTakeaways: [
      "Discover high-curiosity video concepts that bridge search intent with algorithmic browse appeal.",
      "Write paired title and thumbnail concept variations that elevate baseline click-through rates.",
      "Eliminate viewer drop-off in the crucial first 30 seconds with punchy visual and narrative hooks.",
      "Structure long-form scripts with micro-payoffs and pattern interrupts every 45-60 seconds.",
    ],
    workflowSteps: [
      { step: 1, title: "Validate High-Curiosity Video Concepts", description: "Generate concepts with high clickability and broad appeal based on proven title patterns.", promptId: "prompt-098" },
      { step: 2, title: "Optimize Titles & Thumbnail Framing for High CTR", description: "A/B test compelling title angles and thumbnail visual cues before scripting.", promptId: "prompt-101" },
      { step: 3, title: "Diagnose & Rewrite Opening 30 Seconds", description: "Eliminate introductory fluff and deliver immediate confirmation of the title promise.", promptId: "prompt-100" },
      { step: 4, title: "Write Full Script with Pacing Cues", description: "Draft complete narrative scripts complete with visual B-roll cues and retention resets.", promptId: "prompt-012" },
      { step: 5, title: "Plan Batch Production & Repurposing", description: "Schedule batch filming workflows and extract short-form clips for Shorts, TikTok, and Reels.", promptId: "prompt-102" },
    ],
    relatedCollectionSlugs: [
      "content-creator-productivity-kit",
      "create-better-social-media-content",
      "work-smarter-with-ai",
    ],
    createdAt: "2026-02-10T00:00:00Z",
    updatedAt: "2026-03-27T00:00:00Z",
  },

  // 12. Content Creator Productivity Kit
  {
    id: "col-content-creator-productivity",
    slug: "content-creator-productivity-kit",
    title: "Content Creator Productivity Kit",
    shortDescription: "Streamline your creative pipeline from counter-intuitive ideation and editorial calendars to multi-format repurposing.",
    description: "A complete operational engine for solo creators, newsletter authors, and content teams. Overcome creative blocks with counter-intuitive idea matrices, build sustainable 30-day editorial calendars, outline authoritative pillar articles, polish drafts to eliminate clichés, and atomize long-form assets across multiple channels.",
    editorialOverview: "The biggest threat to content creators is burnout from unsustainable production schedules. This toolkit transforms content creation into a repeatable, high-yield system. Focus on deep ideation, establish agile Kanban-style asset pipelines, prune filler words from your drafts, and repurpose single cornerstone pieces into newsletters, threads, and short-form posts.",
    category: "content-creation",
    categoryName: "Content Strategy & Writing",
    categoryIds: ["content-creation", "productivity"],
    promptIds: [
      "prompt-103", // Unconventional Counter-Intuitive Content Ideation Matrix
      "prompt-070", // 30-Day Omnichannel Editorial Content Calendar Planner
      "prompt-107", // Agile Content Editorial Calendar & Asset Pipeline Tracker
      "prompt-104", // Comprehensive Long-Form Pillar Article Outline Architect
      "prompt-013", // Long-Form Technical Essay & Substack Editorial Polisher
      "prompt-106", // Draft Polish, Cliché Elimination & Prose Tightener
      "prompt-069", // Long-Form to Multi-Platform Content Repurposing Engine
      "prompt-204", // Weekly Curated Industry Newsletter Editorial Framing & Hook System
    ],
    tags: ["Content Pipeline", "Editorial Calendar", "Ideation", "Repurposing", "Newsletters"],
    featured: false,
    icon: "Feather",
    targetAudience: "Writers, Newsletter Creators, Solopreneurs & Editors",
    curatorNotes: "Use the prose tightener prompt on your rough drafts to systematically eliminate passive voice, throat-clearing introductions, and repetitive buzzwords.",
    keyTakeaways: [
      "Generate unconventional content angles using contrarian and data-driven ideation matrices.",
      "Manage an agile 30-day editorial calendar with realistic production milestones.",
      "Construct comprehensive long-form pillar article outlines that keep your writing focused.",
      "Tighten prose, eliminate clichés, and atomize core assets for cross-platform distribution.",
    ],
    workflowSteps: [
      { step: 1, title: "Brainstorm Unconventional Content Angles", description: "Use contrarian thinking and industry data to uncover topics that competitors avoid.", promptId: "prompt-103" },
      { step: 2, title: "Plan 30-Day Editorial Calendar", description: "Map out publishing cadences, research phases, and promotional windows across formats.", promptId: "prompt-070" },
      { step: 3, title: "Architect Long-Form Pillar Outlines", description: "Structure in-depth guides with clear subheaders, supporting evidence, and narrative arcs.", promptId: "prompt-104" },
      { step: 4, title: "Polish Drafts & Tighten Prose", description: "Prune filler phrases, eliminate buzzwords, and improve sentence-level readability.", promptId: "prompt-106" },
      { step: 5, title: "Repurpose Across Newsletters & Social", description: "Deconstruct published articles into newsletters, carousel slides, and social takeaways.", promptId: "prompt-069" },
    ],
    relatedCollectionSlugs: [
      "youtube-creator-toolkit",
      "create-better-social-media-content",
      "work-smarter-with-ai",
    ],
    createdAt: "2026-02-12T00:00:00Z",
    updatedAt: "2026-03-27T00:00:00Z",
  },

  // 13. Work Smarter with AI
  {
    id: "col-work-smarter-with-ai",
    slug: "work-smarter-with-ai",
    title: "Work Smarter with AI",
    shortDescription: "A master operating system for high performers: weekly retrospectives, 1-3-5 priority design, timeboxing, and friction audits.",
    description: "Engineered for knowledge workers, executives, and entrepreneurs seeking focused leverage. Conduct structured weekly reviews, prioritize tasks using Eisenhower and RICE frameworks, schedule deep work time-blocks that resist context switching, diagnose procrastination friction, and eliminate unnecessary meetings.",
    editorialOverview: "Productivity is not about doing more things in less time; it is about ruthlessly eliminating the non-essential so you can apply intense focus to high-leverage outcomes. This collection acts as your personal chief of staff, helping you organize your calendar around deep work blocks, clear cognitive overhead, and align daily actions with high-level strategic goals.",
    category: "productivity",
    categoryName: "Productivity & Focus",
    categoryIds: ["productivity", "operations", "email"],
    promptIds: [
      "prompt-014", // Executive Weekly Review & Timeboxing Prioritizer
      "prompt-073", // Eisenhower Matrix & 80/20 High-Leverage Task Prioritizer
      "prompt-109", // RICE & Cost of Delay Task Prioritization Matrix
      "prompt-176", // Daily Energy & Priority Architecture: 1-3-5 Rule Planner
      "prompt-074", // Daily Deep Work Time-Blocking & Distraction Shield
      "prompt-177", // Deep Work Calendar Time-Blocking & Context-Switch Optimizer
      "prompt-178", // Procrastination Friction Root Cause Diagnostic & Unblocking Protocol
      "prompt-075", // Meeting Elimination & Asynchronous Workflow Protocol
      "prompt-180", // Personal Weekly Operating Workflow Audit & Friction Pruning
    ],
    tags: ["Productivity", "Timeboxing", "Deep Work", "Prioritization", "Weekly Review"],
    featured: true,
    icon: "CheckSquare",
    targetAudience: "Managers, Knowledge Workers, Consultants & Founders",
    curatorNotes: "Run the Executive Weekly Review prompt every Friday afternoon to archive completed projects and set up clear, protected time-blocks for Monday morning.",
    keyTakeaways: [
      "Conduct weekly retrospective reviews to eliminate recurring operational bottlenecks.",
      "Prioritize high-leverage initiatives using proven Eisenhower and RICE prioritization models.",
      "Protect cognitive bandwidth by timeboxing deep focus blocks directly into your calendar.",
      "Replace bloated status meetings with asynchronous communication protocols.",
    ],
    workflowSteps: [
      { step: 1, title: "Executive Weekly Retrospective", description: "Review wins, uncompleted tasks, and calendar leaks to calibrate the upcoming work week.", promptId: "prompt-014" },
      { step: 2, title: "Prioritize via Eisenhower & RICE Matrices", description: "Filter urgent distractions from true high-leverage initiatives that move business needles.", promptId: "prompt-073" },
      { step: 3, title: "Architect Daily 1-3-5 Energy Time-Blocks", description: "Plan 1 major milestone, 3 medium tasks, and 5 quick wins matched to your peak daily energy.", promptId: "prompt-176" },
      { step: 4, title: "Eliminate Unnecessary Meetings", description: "Audit recurring meetings and convert status updates into concise asynchronous memos.", promptId: "prompt-075" },
    ],
    relatedCollectionSlugs: [
      "project-management-toolkit",
      "professional-communication-toolkit",
      "ai-prompts-for-freelancers",
    ],
    createdAt: "2026-02-15T00:00:00Z",
    updatedAt: "2026-03-28T00:00:00Z",
  },

  // 14. AI Prompts for Freelancers
  {
    id: "col-freelancers",
    slug: "ai-prompts-for-freelancers",
    title: "AI Prompts for Freelancers",
    shortDescription: "The independent consultant's playbook: discovery call scripts, value-based pricing, 3-tier proposals, and scope creep defense.",
    description: "Built for independent consultants, agencies, and solo freelancers looking to command premium rates. Master high-ticket discovery diagnostic calls, calculate value-based ROI anchors, write winning 3-tier client proposals, draft bulletproof Scopes of Work (SOW), and defend boundaries against scope creep.",
    editorialOverview: "Freelancers frequently undercharge because they sell their time instead of client business outcomes. This collection provides the commercial infrastructure to operate like a high-end advisory firm. Qualify prospects effectively, anchor your pricing to client financial ROI, offer three distinct proposal tiers that encourage upsells, and prevent unpaid revisions with airtight scope agreements.",
    category: "freelancing",
    categoryName: "Freelancing & Consulting",
    categoryIds: ["freelancing", "business", "sales"],
    promptIds: [
      "prompt-198", // High-Ticket Freelance Discovery Call Diagnostic & Qualification Script
      "prompt-171", // Freelance Client Requirements Discovery & Scope Boundary Framework
      "prompt-199", // Freelance Value-Based Pricing & ROI Anchor Calculator
      "prompt-123", // Value-Priced Client Project Pitch & Proposal Generator
      "prompt-200", // High-Win-Rate Freelance Client Proposal & 3-Tier Option Architect
      "prompt-019", // Freelance Scope of Work (SOW) & Retainer Proposal Drafter
      "prompt-124", // Bulletproof Freelance Scope of Work & Revision Boundary Agreement
      "prompt-201", // Freelance Scope Creep Boundary Defense & Change Order Protocol
      "prompt-172", // Freelance High-Value Client Strategy Meeting Agenda & Pitch Preparation
    ],
    tags: ["Freelance", "Value Pricing", "Proposals", "Scope of Work", "Client Management"],
    featured: true,
    icon: "Compass",
    targetAudience: "Freelancers, Solo Consultants, Agency Owners & Contractors",
    curatorNotes: "Always calculate the client's estimated business upside before naming a price. Use the ROI anchor prompt to justify pricing that reflects true commercial value.",
    keyTakeaways: [
      "Qualify prospective clients and uncover hidden project risks during diagnostic discovery calls.",
      "Transition from commoditized hourly rates to lucrative value-based project pricing.",
      "Draft winning proposals with 3-tier options that position you as a strategic partner.",
      "Establish strict revision boundaries and draft polite, firm change order requests.",
    ],
    workflowSteps: [
      { step: 1, title: "Diagnostic Discovery & Qualification", description: "Uncover client business pain points, timeline constraints, and decision criteria during initial calls.", promptId: "prompt-198" },
      { step: 2, title: "Calculate Value-Based Pricing Anchor", description: "Estimate the project's commercial upside to price your services on ROI rather than billable hours.", promptId: "prompt-199" },
      { step: 3, title: "Architect 3-Tier Client Proposals", description: "Structure three clear investment options (Essential, Comprehensive, Strategic Transformation).", promptId: "prompt-200" },
      { step: 4, title: "Draft Bulletproof Scope of Work (SOW)", description: "Define exact deliverables, milestones, assumptions, and explicit out-of-scope boundaries.", promptId: "prompt-124" },
      { step: 5, title: "Defend Against Scope Creep", description: "Respond to out-of-scope requests with polite, professional change order cost estimates.", promptId: "prompt-201" },
    ],
    relatedCollectionSlugs: [
      "small-business-ai-toolkit",
      "professional-communication-toolkit",
      "work-smarter-with-ai",
    ],
    createdAt: "2026-02-18T00:00:00Z",
    updatedAt: "2026-03-28T00:00:00Z",
  },

  // 15. Small Business AI Toolkit
  {
    id: "col-small-business",
    slug: "small-business-ai-toolkit",
    title: "Small Business AI Toolkit",
    shortDescription: "Essential operating workflows for business owners: unit economics, standard operating procedures, customer retention, and expense audits.",
    description: "A versatile operational toolkit tailored for small business owners, operators, and boutique agencies. Model unit economics and pricing tiers, document repeatable Standard Operating Procedures (SOPs), audit operating expenses, design automated customer onboarding flows, and reduce churn with proactive retention playbooks.",
    editorialOverview: "Small business owners juggle dozens of roles: finance, operations, customer success, and marketing. This collection acts as your operational force multiplier. Streamline everyday workflows into clear SOPs, audit recurring software expenses, improve customer retention, and de-escalate sensitive customer issues with executive empathy.",
    category: "business",
    categoryName: "Small Business Operations",
    categoryIds: ["business", "marketing", "operations", "customer-support"],
    promptIds: [
      "prompt-008", // B2B SaaS Business Model & Unit Economics Synthesizer
      "prompt-064", // SaaS Pricing Tier & Value-Metric Packaging Architect
      "prompt-207", // Standard Operating Procedure (SOP) & Scalable Process Blueprint
      "prompt-167", // SaaS Business Operating Expense (OpEx) & Runway Burn Audit
      "prompt-068", // SaaS Welcome & Time-to-Value Activation Email Sequence
      "prompt-087", // Marketing ROI & Channel Attribution Performance Review
      "prompt-215", // At-Risk Customer Churn Intervention & Re-engagement Playbook
      "prompt-170", // Empathetic Executive Customer Complaint De-escalation & Resolution
    ],
    tags: ["Small Business", "SOP", "Unit Economics", "Retention", "OpEx Audit"],
    featured: true,
    icon: "Store",
    targetAudience: "Small Business Owners, Operators, Agency Founders & General Managers",
    curatorNotes: "Use the SOP generator to document recurring manual tasks so you can easily delegate them to contractors, team members, or automation workflows.",
    keyTakeaways: [
      "Pressure-test pricing tiers, gross margins, and unit economics for long-term profitability.",
      "Document crystal-clear SOPs that allow team members to execute processes autonomously.",
      "Conduct thorough operating expense (OpEx) audits to eliminate waste and extend runway.",
      "Implement customer onboarding and retention playbooks that dramatically reduce churn.",
    ],
    workflowSteps: [
      { step: 1, title: "Model Unit Economics & Pricing Tiers", description: "Assess customer acquisition costs, gross margins, and lifetime value across product tiers.", promptId: "prompt-008" },
      { step: 2, title: "Document Repeatable Standard Operating Procedures", description: "Write stepwise SOPs with roles, inputs, quality gates, and failure recovery protocols.", promptId: "prompt-207" },
      { step: 3, title: "Audit Operating Expenses & Runway", description: "Audit recurring SaaS subscriptions, contractor costs, and overhead to optimize margin.", promptId: "prompt-167" },
      { step: 4, title: "Deploy Onboarding & Churn Interventions", description: "Design automated welcome emails and proactive outreach protocols for disengaged customers.", promptId: "prompt-215" },
    ],
    relatedCollectionSlugs: [
      "start-and-validate-a-business-idea",
      "ai-prompts-for-ecommerce",
      "customer-support-toolkit",
      "marketing-strategy-starter-kit",
    ],
    createdAt: "2026-02-20T00:00:00Z",
    updatedAt: "2026-03-28T00:00:00Z",
  },

  // 16. AI Prompts for E-commerce
  {
    id: "col-ecommerce",
    slug: "ai-prompts-for-ecommerce",
    title: "AI Prompts for E-commerce",
    shortDescription: "Conversion-optimized prompts for online stores: benefit-driven descriptions, PDP layout audits, review sentiment mining, and cart recovery.",
    description: "Designed for DTC brands, Shopify store owners, and e-commerce merchandisers looking to increase conversion rates and average order value (AOV). Translate dry product features into compelling benefit copy, conduct PDP conversion audits, build objection-crushing FAQ accordions, analyze customer reviews for unmet needs, and optimize cart recovery sequences.",
    editorialOverview: "In e-commerce, small conversion improvements yield exponential revenue growth. This collection addresses every critical touchpoint of the online shopping journey: crafting product descriptions that connect emotionally, addressing customer hesitations with structured FAQs, mining customer reviews for real-world voice-of-customer data, and winning back abandoned carts.",
    category: "ecommerce",
    categoryName: "E-commerce & Retail",
    categoryIds: ["ecommerce", "marketing", "customer-support"],
    promptIds: [
      "prompt-159", // E-commerce Benefit-Driven Product Description & Feature Translation
      "prompt-160", // E-commerce Product Detail Page (PDP) Conversion & Layout Audit
      "prompt-225", // Product Detail Page Objection-Crushing FAQ & Trust Accordion Builder
      "prompt-161", // E-commerce Customer Review Sentiment & Unmet Need Mining
      "prompt-162", // E-commerce Checkout Friction Audit & Cart Abandonment Recovery Strategy
      "prompt-224", // 4-Part E-commerce Product Launch Promotional Email Campaign
      "prompt-223", // Post-Purchase Customer Onboarding & Verified Review Generation Sequence
    ],
    tags: ["E-commerce", "Shopify", "Product Descriptions", "PDP Audit", "Cart Abandonment"],
    featured: false,
    icon: "ShoppingBag",
    targetAudience: "E-commerce Managers, DTC Founders & Shopify Merchandisers",
    curatorNotes: "Paste actual customer reviews and support tickets into the prompts to discover the exact language and objections customers raise before purchasing.",
    keyTakeaways: [
      "Translate technical specifications into emotionally resonant, benefit-driven product copy.",
      "Audit Product Detail Pages (PDP) for visual hierarchy, trust signals, and clear CTAs.",
      "Build objection-busting FAQ sections that systematically eliminate checkout hesitation.",
      "Mine customer review sentiment to identify product flaws and new merchandising angles.",
    ],
    workflowSteps: [
      { step: 1, title: "Translate Product Features into Benefits", description: "Turn bulleted specs into evocative, sensory descriptions highlighting everyday customer value.", promptId: "prompt-159" },
      { step: 2, title: "Audit PDP Conversion & Trust Signals", description: "Evaluate image placement, social proof, shipping transparency, and mobile sticky add-to-cart buttons.", promptId: "prompt-160" },
      { step: 3, title: "Build Objection-Crushing FAQ Accordions", description: "Answer sizing, return policies, materials, and shipping questions directly above the fold.", promptId: "prompt-225" },
      { step: 4, title: "Mine Reviews & Recover Abandoned Carts", description: "Extract voice-of-customer insights from reviews and draft high-converting cart recovery emails.", promptId: "prompt-162" },
    ],
    relatedCollectionSlugs: [
      "small-business-ai-toolkit",
      "marketing-strategy-starter-kit",
      "customer-support-toolkit",
    ],
    createdAt: "2026-02-22T00:00:00Z",
    updatedAt: "2026-03-28T00:00:00Z",
  },

  // 17. Learn Anything with AI
  {
    id: "col-learn-anything",
    slug: "learn-anything-with-ai",
    title: "Learn Anything with AI",
    shortDescription: "Accelerated learning frameworks: Feynman technique deconstructions, 8-week mastery syllabi, Socratic dialogues, and diagnostic quizzes.",
    description: "Built for lifelong learners, students, and professionals mastering complex new disciplines. Structure custom 8-week deep learning syllabi, deconstruct difficult concepts from first principles using the Feynman technique, engage in interactive Socratic debates, and test understanding with diagnostic practice problems.",
    editorialOverview: "The ability to learn new concepts rapidly is the ultimate meta-skill. Rather than passively reading textbooks, this collection transforms AI into an unsparing personal tutor. Deconstruct intricate theories into intuitive analogies, challenge your mental models through dialectical inquiry, and diagnose knowledge gaps before they derail your progress.",
    category: "education",
    categoryName: "Accelerated Learning",
    categoryIds: ["education", "students"],
    promptIds: [
      "prompt-186", // Personalized Skill Acquisition & Mastery Roadmap Architect
      "prompt-116", // Self-Directed 8-Week Deep Mastery Syllabus Generator
      "prompt-016", // Feynman Technique Curriculum & Concept Explainer
      "prompt-117", // Multi-Tiered Concept Explainer (ELI5 to Graduate Level)
      "prompt-188", // First-Principles Conceptual Distinction & Mental Model Matrix
      "prompt-187", // Socratic Method Deep Conceptual Inquiry & Dialectical Tutor
      "prompt-118", // Interactive Socratic Dialogue & Conceptual Quiz Generator
      "prompt-189", // Active Recall Diagnostic Practice Problem & Rubric Generator
      "prompt-190", // Metacognitive Learning Progress Audit & Knowledge Gap Diagnosis
    ],
    tags: ["Feynman Technique", "Deep Learning", "Syllabus", "Socratic Tutor", "Active Recall"],
    featured: true,
    icon: "GraduationCap",
    targetAudience: "Lifelong Learners, Engineers, Researchers & Ambitious Students",
    curatorNotes: "When using the Socratic prompt, instruct the AI never to give you the answer directly. Force yourself to articulate your reasoning step-by-step.",
    keyTakeaways: [
      "Architect custom 8-week mastery roadmaps complete with milestone checkpoints and resources.",
      "Break down abstract formulas and technical concepts using the proven Feynman method.",
      "Engage in challenging Socratic dialogues to expose flawed assumptions and logical blind spots.",
      "Generate targeted active-recall practice problems with rubrics to verify true comprehension.",
    ],
    workflowSteps: [
      { step: 1, title: "Generate 8-Week Deep Mastery Syllabus", description: "Break any technical or academic domain into progressive weekly modules with curated exercises.", promptId: "prompt-116" },
      { step: 2, title: "Deconstruct via Feynman First Principles", description: "Explain complex concepts in simple, everyday analogies to test foundational comprehension.", promptId: "prompt-016" },
      { step: 3, title: "Engage in Socratic Dialectical Dialogue", description: "Debate foundational assumptions with an AI tutor that asks probing, provocative questions.", promptId: "prompt-187" },
      { step: 4, title: "Solve Diagnostic Active-Recall Problems", description: "Tackle realistic exam and scenario problems with strict grading rubrics and solution breakdowns.", promptId: "prompt-189" },
      { step: 5, title: "Audit Knowledge Gaps & Progress", description: "Conduct metacognitive learning reviews to identify residual blind spots and plan revisions.", promptId: "prompt-190" },
    ],
    relatedCollectionSlugs: [
      "research-and-analysis-toolkit",
      "work-smarter-with-ai",
      "ai-prompts-for-software-developers",
    ],
    createdAt: "2026-02-25T00:00:00Z",
    updatedAt: "2026-03-29T00:00:00Z",
  },

  // 18. Research & Analysis Toolkit
  {
    id: "col-research-and-analysis",
    slug: "research-and-analysis-toolkit",
    title: "Research & Analysis Toolkit",
    shortDescription: "Rigorous frameworks for researchers: FINER question formulation, multi-study synthesis matrices, and counter-evidence auditing.",
    description: "Curated for graduate students, academic researchers, intelligence analysts, and journalists. Refine research questions using the FINER framework, audit literature reviews for counter-evidence, synthesize multi-study findings into structured matrices, and analyze conflicting empirical methodologies.",
    editorialOverview: "High-quality research requires intellectual rigor and systematic synthesis. This collection acts as your research methodology companion. Discover unexplored white space in your domain, stress-test hypotheses for falsifiability, compile comparative literature matrices across competing schools of thought, and uncover hidden methodological limitations.",
    category: "research",
    categoryName: "Research & Methodology",
    categoryIds: ["research", "education", "students"],
    promptIds: [
      "prompt-121", // Academic & Investigative Research Question Refiner (FINER Framework)
      "prompt-195", // Academic Research Question & Falsifiability Hypothesis Refiner
      "prompt-194", // Interdisciplinary Research Topic Landscape & White Space Explorer
      "prompt-018", // Academic Literature Review & Counter-Evidence Auditor
      "prompt-122", // Multi-Study Evidence Synthesis & Literature Matrix Builder
      "prompt-197", // Multi-Source Literature Synthesis & Thematic Consensus Matrix
      "prompt-196", // Empirical Evidence & Competing Methodology Conflict Analysis
      "prompt-119", // Academic Research Paper Milestone & Argument Outline Planner
    ],
    tags: ["Research", "Literature Review", "Methodology", "Synthesis Matrix", "Academic Writing"],
    featured: false,
    icon: "Search",
    targetAudience: "Researchers, Academics, Analysts & Graduate Students",
    curatorNotes: "Provide full citations, methodology summaries, and conflicting findings to generate detailed multi-source comparative matrices.",
    keyTakeaways: [
      "Formulate feasible, novel, and ethically sound research questions via the FINER protocol.",
      "Identify methodological biases, sample size limitations, and counter-evidence in current literature.",
      "Synthesize disparate studies into unified thematic consensus matrices.",
      "Structure academic papers with clear argument milestones and falsifiable hypotheses.",
    ],
    workflowSteps: [
      { step: 1, title: "Formulate Falsifiable Research Question", description: "Apply the FINER framework (Feasible, Interesting, Novel, Ethical, Relevant) to sharpen your thesis.", promptId: "prompt-121" },
      { step: 2, title: "Explore Research Landscape & White Space", description: "Map out existing scholarly consensus and identify under-researched methodological niches.", promptId: "prompt-194" },
      { step: 3, title: "Audit Literature for Counter-Evidence", description: "Critique existing literature for sampling bias, p-hacking, publication bias, and contradictory findings.", promptId: "prompt-018" },
      { step: 4, title: "Synthesize Multi-Study Evidence Matrix", description: "Build comparative tables detailing methodologies, sample sizes, effect sizes, and conclusions.", promptId: "prompt-122" },
      { step: 5, title: "Structure Paper Outlines & Milestones", description: "Outline your thesis argument into rigorous academic sections with supporting evidence citation plans.", promptId: "prompt-119" },
    ],
    relatedCollectionSlugs: [
      "learn-anything-with-ai",
      "professional-communication-toolkit",
      "project-management-toolkit",
    ],
    createdAt: "2026-02-28T00:00:00Z",
    updatedAt: "2026-03-29T00:00:00Z",
  },

  // 19. Professional Communication Toolkit
  {
    id: "col-professional-communication",
    slug: "professional-communication-toolkit",
    title: "Professional Communication Toolkit",
    shortDescription: "Workplace communication excellence: BLUF executive updates, meeting follow-ups, diplomatic tone shifts, and boundary setting.",
    description: "Engineered for managers, team leads, and professionals who need to communicate with clarity, authority, and empathy. Master Bottom-Line-Up-Front (BLUF) decision memos, craft high-accountability meeting follow-ups, summarize chaotic email threads into clear action items, rewrite emails for assertive diplomacy, and deliver constructive feedback gracefully.",
    editorialOverview: "Career progression is deeply tied to executive presence and communication clarity. Poorly structured emails waste time and create ambiguity. This collection equips you to write concise executive updates, summarize complex project threads, establish firm boundaries with grace, and conduct difficult workplace conversations without eroding trust.",
    category: "email",
    categoryName: "Workplace Communication",
    categoryIds: ["email", "career"],
    promptIds: [
      "prompt-181", // Executive Email Clarity, Brevity & Action-Oriented Polish
      "prompt-112", // Executive Bottom-Line-Up-Front (BLUF) Decision Memo Email
      "prompt-184", // BLUF (Bottom Line Up Front) Executive Update & Decision Memo
      "prompt-183", // High-Accountability Meeting Follow-Up & Next Steps Dispatch
      "prompt-114", // High-Signal Zero-Pressure Follow-Up Email Sequence
      "prompt-115", // Chaotic Multi-Thread Email Summarizer & Action Item Extractor
      "prompt-182", // Email Tone Transformation: Direct, Assertive & Diplomatic Polish
      "prompt-113", // Firm Yet Empathetic Boundary & Saying-No Email Rewriter
      "prompt-015", // High-Stakes Difficult Feedback & Boundary Email Drafter
    ],
    tags: ["Communication", "Executive Presence", "BLUF", "Difficult Feedback", "Email Polish"],
    featured: false,
    icon: "Mail",
    targetAudience: "Managers, Team Leads, Executives & Corporate Professionals",
    curatorNotes: "Use the BLUF prompt whenever communicating with executives or senior leadership. Put the core recommendation and required action in the very first sentence.",
    keyTakeaways: [
      "Structure executive memos using Bottom-Line-Up-Front (BLUF) for immediate decision-making.",
      "Draft high-accountability meeting follow-ups with clear ownership and delivery deadlines.",
      "Distill chaotic multi-party email threads into concise summaries with next steps.",
      "Transform emotional drafts into firm, assertive, and diplomatic professional communications.",
    ],
    workflowSteps: [
      { step: 1, title: "Format with Bottom-Line-Up-Front (BLUF)", description: "Lead with the decision, request, or core metric in the first paragraph for executive brevity.", promptId: "prompt-112" },
      { step: 2, title: "Dispatch High-Accountability Meeting Follow-Ups", description: "Send immediate post-meeting summaries documenting key decisions, owners, and hard deadlines.", promptId: "prompt-183" },
      { step: 3, title: "Summarize Multi-Thread Email Chains", description: "Extract critical context, unresolved questions, and action items from tangled email threads.", promptId: "prompt-115" },
      { step: 4, title: "Transform Tone for Diplomatic Assertiveness", description: "Remove passive-aggressive phrasing, apologetic hedging, and overly harsh language.", promptId: "prompt-182" },
      { step: 5, title: "Deliver Constructive Feedback with Care", description: "Frame performance or boundary conversations using nonviolent, observation-based language.", promptId: "prompt-015" },
    ],
    relatedCollectionSlugs: [
      "work-smarter-with-ai",
      "project-management-toolkit",
      "customer-support-toolkit",
      "get-your-next-job",
    ],
    createdAt: "2026-03-02T00:00:00Z",
    updatedAt: "2026-03-29T00:00:00Z",
  },

  // 20. Customer Support Toolkit
  {
    id: "col-customer-support",
    slug: "customer-support-toolkit",
    title: "Customer Support Toolkit",
    shortDescription: "Empathy-first customer support workflows: high-stakes de-escalation, ticket cluster triage, self-serve FAQs, and churn intervention.",
    description: "Tailored for customer support leads, success managers, and frontline teams handling high-stakes interactions. Master empathetic de-escalation for frustrated customers, triage ticket clusters into actionable engineering bug reports, author self-serve knowledge base articles, synthesize customer feedback, and execute proactive churn interventions.",
    editorialOverview: "Every customer support interaction is an opportunity to strengthen brand loyalty. When handled poorly, minor issues snowball into churn and negative reviews. This collection provides battle-tested support protocols: acknowledge customer frustration with genuine empathy, resolve technical issues methodically, translate recurring tickets into self-serve documentation, and salvage at-risk accounts.",
    category: "customer-support",
    categoryName: "Customer Support & Success",
    categoryIds: ["customer-support", "operations"],
    promptIds: [
      "prompt-020", // High-Empathy Customer Support De-escalation Responder
      "prompt-125", // Empathy-First Customer Escalation De-escalation & Resolution Responder
      "prompt-170", // Empathetic Executive Customer Complaint De-escalation & Resolution
      "prompt-169", // Customer Support Ticket Cluster Triage & Engineering Bug Escalation
      "prompt-214", // Self-Serve Knowledge Base & Troubleshooting Guide Author
      "prompt-216", // Customer Feedback Synthesis & Feature Request Impact Matrix
      "prompt-215", // At-Risk Customer Churn Intervention & Re-engagement Playbook
    ],
    tags: ["Customer Support", "De-escalation", "Knowledge Base", "Ticket Triage", "Churn Prevention"],
    featured: false,
    icon: "Headphones",
    targetAudience: "Support Leads, Customer Success Managers & Support Engineers",
    curatorNotes: "Never use boilerplate responses for escalated tickets. Let the de-escalation prompt weave in the customer's specific emotional pain points and exact words.",
    keyTakeaways: [
      "De-escalate angry customer complaints using empathetic, action-oriented communication.",
      "Triage recurring support ticket clusters and produce clean reproduction steps for engineering.",
      "Write self-serve troubleshooting guides that reduce incoming ticket volume by 30%.",
      "Synthesize customer feedback into prioritized feature impact matrices for product teams.",
    ],
    workflowSteps: [
      { step: 1, title: "De-escalate High-Stakes Customer Tickets", description: "Validate customer frustration, accept responsibility where appropriate, and outline clear next steps.", promptId: "prompt-020" },
      { step: 2, title: "Triage Ticket Clusters for Engineering", description: "Group recurring complaints and translate them into actionable, reproducible bug tickets.", promptId: "prompt-169" },
      { step: 3, title: "Author Self-Serve Troubleshooting Guides", description: "Write clear, step-by-step knowledge base articles to deflect repetitive incoming tickets.", promptId: "prompt-214" },
      { step: 4, title: "Synthesize Feedback & Intervene on Churn", description: "Aggregate feature requests and execute tailored retention offers for at-risk accounts.", promptId: "prompt-215" },
    ],
    relatedCollectionSlugs: [
      "small-business-ai-toolkit",
      "ai-prompts-for-ecommerce",
      "professional-communication-toolkit",
    ],
    createdAt: "2026-03-05T00:00:00Z",
    updatedAt: "2026-03-29T00:00:00Z",
  },

  // 21. AI Prompts for Designers
  {
    id: "col-designers",
    slug: "ai-prompts-for-designers",
    title: "AI Prompts for Designers",
    shortDescription: "Elevate digital product design: visual hierarchy audits, UX friction analysis, semantic design tokens, and WCAG accessibility.",
    description: "Curated for UI/UX designers, design system engineers, and product designers. Conduct thorough visual hierarchy and contrast critiques, diagnose interaction friction in onboarding funnels, architect semantic design system token architectures, write high-converting landing page wireframe specs, and audit compliance against WCAG 2.2 AA standards.",
    editorialOverview: "Great product design balances aesthetics, intuitive user flows, and strict accessibility standards. This collection serves as a design director and accessibility auditor. Pressure-test spatial rhythm and typographic contrast, uncover cognitive friction points in user journeys, establish scalable design token nomenclature, and ensure inclusive experiences for all users.",
    category: "design",
    categoryName: "UI/UX Design",
    categoryIds: ["design", "react"],
    promptIds: [
      "prompt-154", // UI Design Visual Hierarchy, Contrast & Spatial Rhythm Critique
      "prompt-155", // UX Onboarding & Funnel Interaction Friction Analysis
      "prompt-156", // Design System Semantic Token Architecture & Component Matrix
      "prompt-157", // High-Conversion SaaS Landing Page Wireframe & Layout Spec
      "prompt-158", // WCAG 2.2 AA Accessibility & Inclusive Design Compliance Audit
      "prompt-009", // High-Converting B2B SaaS Landing Page Copywriter
    ],
    tags: ["UI Design", "UX Research", "Design Systems", "Accessibility", "WCAG", "Wireframing"],
    featured: false,
    icon: "Palette",
    targetAudience: "UI/UX Designers, Product Designers & Design System Engineers",
    curatorNotes: "Provide detailed descriptions of your component states, color hex codes, and user flow milestones to receive precise accessibility and visual hierarchy feedback.",
    keyTakeaways: [
      "Audit interface layouts for typographic scale, visual hierarchy, and spatial balance.",
      "Identify cognitive friction and drop-off risks in critical user onboarding flows.",
      "Build scalable semantic design system token structures that bridge Figma and code.",
      "Verify compliance with WCAG 2.2 AA accessibility standards for contrast and keyboard navigation.",
    ],
    workflowSteps: [
      { step: 1, title: "Audit Visual Hierarchy & Contrast", description: "Critique typographical scales, spacing rhythms, and component prominence across screen sizes.", promptId: "prompt-154" },
      { step: 2, title: "Diagnose UX Onboarding Friction", description: "Identify unnecessary form fields, ambiguous CTAs, and confusing user flow bifurcations.", promptId: "prompt-155" },
      { step: 3, title: "Architect Semantic Design Tokens", description: "Define systematic token hierarchies (global, semantic, component-specific) across light/dark themes.", promptId: "prompt-156" },
      { step: 4, title: "Wireframe High-Converting Layouts", description: "Design layout specifications that direct eye movement toward primary conversion actions.", promptId: "prompt-157" },
      { step: 5, title: "Audit WCAG 2.2 AA Accessibility", description: "Evaluate color contrast ratios, focus rings, ARIA roles, and keyboard navigation semantics.", promptId: "prompt-158" },
    ],
    relatedCollectionSlugs: [
      "ai-prompts-for-react-developers",
      "ai-prompts-for-software-developers",
      "marketing-strategy-starter-kit",
    ],
    createdAt: "2026-03-08T00:00:00Z",
    updatedAt: "2026-03-30T00:00:00Z",
  },

  // 22. Project Management Toolkit
  {
    id: "col-project-management",
    slug: "project-management-toolkit",
    title: "Project Management Toolkit",
    shortDescription: "Rigorous project delivery frameworks: Work Breakdown Structures (WBS), risk pre-mortems, RACI matrices, and executive status dashboards.",
    description: "Engineered for project managers, technical program managers (TPMs), scrum masters, and team leads delivering complex technical initiatives. Deconstruct ambiguous initiatives into structured Work Breakdown Structures, conduct pre-mortem risk matrices, convert chaotic meeting transcripts into RACI matrices, and generate executive RAG health dashboards.",
    editorialOverview: "Complex initiatives fail due to ambiguous scope, unmanaged delivery risks, and misaligned team expectations. This collection arms project leaders with the tools needed to ship on time. Transform vague requirements into clear work breakdown structures, identify project failure modes before kickoff, maintain high-accountability action items, and deliver concise executive status reports.",
    category: "operations",
    categoryName: "Project Management & Operations",
    categoryIds: ["operations", "productivity", "business"],
    promptIds: [
      "prompt-110", // Complex Ambiguous Initiative Work Breakdown Structure (WBS)
      "prompt-173", // Project Delivery Risk Pre-Mortem & Mitigation Matrix
      "prompt-174", // Chaotic Meeting Notes to Structured Action Item & RACI Matrix Converter
      "prompt-175", // Executive Project Status Report & RAG Health Dashboard Generator
      "prompt-179", // Quarterly OKR to Weekly Tactical Action Cascade Blueprint
      "prompt-075", // Meeting Elimination & Asynchronous Workflow Protocol
      "prompt-022", // Zero-to-One Product Requirement Document (PRD) Author
    ],
    tags: ["Project Management", "WBS", "Risk Mitigation", "RACI Matrix", "Status Reports", "Agile"],
    featured: false,
    icon: "Kanban",
    targetAudience: "Project Managers, TPMs, Scrum Masters & Operations Leads",
    curatorNotes: "Feed in raw notes or brainstorm transcripts from kickoff meetings to instantly extract work packages, dependencies, and RACI matrices.",
    keyTakeaways: [
      "Break down ambiguous initiatives into structured work breakdown structures with clear owners.",
      "Conduct risk pre-mortems to identify failure modes and establish mitigation protocols.",
      "Convert chaotic meeting discussions into structured action items with RACI matrices.",
      "Publish executive RAG status reports with transparent risk commentary and milestones.",
    ],
    workflowSteps: [
      { step: 1, title: "Deconstruct Initiative into WBS", description: "Break large ambiguous initiatives into hierarchical deliverables, work packages, and acceptance criteria.", promptId: "prompt-110" },
      { step: 2, title: "Conduct Delivery Risk Pre-Mortem", description: "Identify critical technical, resource, and dependency failure modes before kickoff.", promptId: "prompt-173" },
      { step: 3, title: "Extract RACI Matrix from Meeting Notes", description: "Assign Responsible, Accountable, Consulted, and Informed stakeholders to every deliverable.", promptId: "prompt-174" },
      { step: 4, title: "Generate Executive RAG Status Report", description: "Publish high-level Red/Amber/Green status updates with milestones, risks, and blockers.", promptId: "prompt-175" },
    ],
    relatedCollectionSlugs: [
      "work-smarter-with-ai",
      "professional-communication-toolkit",
      "ai-prompts-for-software-developers",
    ],
    createdAt: "2026-03-10T00:00:00Z",
    updatedAt: "2026-03-30T00:00:00Z",
  },
];
