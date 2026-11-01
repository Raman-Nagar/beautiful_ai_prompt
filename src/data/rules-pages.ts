import { DeveloperRule } from "@/types/rule";

export const DEVELOPER_RULES: DeveloperRule[] = [
  {
    id: "rule-001",
    slug: "nextjs-cursorrules",
    technology: "Next.js 15 App Router",
    techCategory: "frontend",
    versionTarget: "Next.js 15.1+ / React 19",
    title: "Next.js 15 App Router AI Agent Rules & Cursorrules",
    seoTitle: "Next.js 15 Cursorrules & CLAUDE.md AI Agent Rules (2026)",
    seoDescription: "Production-tested AI agent rules for Next.js 15 App Router. Enforce Server Actions, React 19 Suspense streaming, and zero client-bundle bloat in Cursor and Claude Code.",
    heroTagline: "Enforce Next.js 15 App Router conventions and Server Actions in Cursor, Claude Code, and Copilot.",
    targetKeywords: [
      "nextjs cursorrules",
      "nextjs 15 cursor rules",
      "nextjs claude md",
      "nextjs agent rules",
      "nextjs system prompt for ai",
    ],
    summary: "Prevent AI coding agents from generating obsolete Next.js Pages router code, leaking sensitive server logic into client bundles, or misusing React 19 hooks.",
    overview: "Next.js 15 introduces fundamental architectural shifts: asynchronous request APIs (`await cookies()`, `await headers()`), React 19 Actions (`useActionState`, `useOptimistic`), and strict server/client boundary enforcement. Without explicit rules, AI models default to legacy Next.js 12/13 patterns.",
    keyPrinciples: [
      "All page and layout components are Server Components by default; never add 'use client' without interactive state.",
      "Always await asynchronous runtime functions: `await params`, `await searchParams`, `await cookies()`, `await headers()`.",
      "Execute database mutations exclusively through dedicated Server Actions in separate `actions.ts` files with 'use server'.",
      "Enforce runtime data validation on all Server Action inputs using Zod `safeParse`.",
      "Use Suspense boundaries with skeleton fallbacks for all asynchronous data-fetching components.",
      "Never import server-only packages (Prisma, database drivers, secrets) into Client Components.",
    ],
    installationGuide: {
      pathRecommendation: "Place in project root as `.cursorrules` or `.cursor/rules/nextjs.mdc`, or save as `CLAUDE.md` for Anthropic Claude Code CLI.",
      steps: [
        "Copy the `.cursorrules` file into the root directory of your Next.js project.",
        "If using Claude Code CLI, copy the `CLAUDE.md` configuration into your root folder.",
        "If using modern Cursor IDE (.mdc), save under `.cursor/rules/nextjs-15.mdc`.",
        "Restart your IDE or agent session to apply the instructions automatically.",
      ],
    },
    files: [
      {
        fileName: ".cursorrules",
        formatLabel: "Cursor Rules (.cursorrules)",
        description: "Standard Cursor project configuration to guide autocomplete, composer, and inline edits.",
        content: `# Next.js 15 & React 19 Cursor Rules

You are an expert Next.js 15, React 19, TypeScript, and Tailwind CSS developer.

## Core Architecture
- Framework: Next.js 15 App Router (NOT Pages router).
- Language: TypeScript with strict mode enabled. Never use 'any'.
- React: React 19. Utilize React 19 Compiler idioms (avoid unnecessary useMemo/useCallback).
- Styling: Tailwind CSS with mobile-first responsive utility classes.
- Icons: Lucide React.
- Validation: Zod for runtime schema validation.

## Next.js 15 Specifics
- Async request headers: In Next.js 15, 'cookies()', 'headers()', 'params', and 'searchParams' are Promises. ALWAYS await them.
  Example: const { id } = await params; const cookieStore = await cookies();
- Server Components by default: Keep all data-fetching and database queries on the server.
- Add 'use client' ONLY to components requiring browser events, React state, or browser APIs.
- Keep Client Components small and leaf-level. Pass server-fetched data as props.

## Data Mutations & Server Actions
- Co-locate Server Actions in 'actions.ts' files marked with 'use server' at the top.
- ALWAYS validate Server Action arguments using Zod schemas with 'safeParse'.
- Return structured Result objects: { success: true, data: T } | { success: false, error: string }.
- Never throw unchecked errors from Server Actions to the client.
- Call 'revalidatePath' or 'revalidateTag' after successful mutations.

## Performance & Accessibility
- Wrap asynchronous Server Components in '<Suspense fallback={<Skeleton />}>'.
- Use 'next/image' with explicit width, height, or fill + sizes.
- Ensure all interactive elements have semantic HTML and accessible ARIA attributes.`,
      },
      {
        fileName: "CLAUDE.md",
        formatLabel: "Claude Code (CLAUDE.md)",
        description: "Anthropic Claude Code CLI persistent project memory instructions.",
        content: `# Next.js 15 Architecture Guide for Claude Code

## Project Stack
- Next.js 15 (App Router)
- React 19
- TypeScript (Strict)
- Tailwind CSS

## Commands
- Build: \`npm run build\`
- Dev: \`npm run dev\`
- Lint: \`npm run lint\`
- Type Check: \`npx tsc --noEmit\`

## Critical Constraints
1. NEVER use the Pages router conventions (no \`pages/\`, no \`getServerSideProps\`, no \`getStaticProps\`).
2. Next.js 15 breaking change: \`params\`, \`searchParams\`, \`cookies()\`, and \`headers()\` are async Promises. Always \`await\` them before reading properties.
3. Server Actions must live in separate files with \`'use server'\` directive and Zod validation.
4. Never disable TypeScript checks or ESLint rules in generated files.
5. Provide minimal, surgical code diffs. Preserve existing docstrings and comments.`,
      },
      {
        fileName: "AGENTS.md",
        formatLabel: "Agent Specification (AGENTS.md)",
        description: "Universal Autonomous Agent guidelines adhering to the emerging AGENTS.md standard.",
        content: `# Agent Operating Instructions: Next.js 15

## Mission
You are an autonomous engineering agent assisting with a Next.js 15 application.

## Quality Invariants
1. Zero TypeScript errors (\`npx tsc --noEmit\` must pass).
2. Zero bundle leakage of database credentials or server environments.
3. Accessible UI adhering to WCAG 2.1 AA standards.
4. All data mutations handled via type-safe Server Actions.`,
      },
      {
        fileName: "system-prompt.txt",
        formatLabel: "LLM System Prompt",
        description: "Raw system prompt for direct API integration or custom GPT setup.",
        content: `You are a Principal Next.js 15 Architect.
Strict guidelines:
- Always build using Next.js 15 App Router and React 19.
- Await params and searchParams: const { slug } = await params.
- Server components are default. Only use 'use client' for interactive UI leaves.
- Validate all Server Action inputs with Zod safeParse.
- Output clean, modular, and accessible TypeScript code with zero 'any' types.`,
      },
    ],
    examples: [
      {
        scenario: "Scaffolding a dynamic route page in Next.js 15",
        prompt: "Create a blog post page that reads the post slug from the URL parameters.",
        agentBehavior: "The agent correctly writes an async Server Component that awaits `params` (`const { slug } = await params`), renders with `<Suspense>`, and fetches data on the server without adding `'use client'`.",
      },
      {
        scenario: "Handling form submission",
        prompt: "Create a user newsletter signup form with validation.",
        agentBehavior: "The agent creates a dedicated `actions/newsletter.ts` file with `'use server'`, validates email via Zod, and implements `useActionState` in a Client Component with pending states.",
      },
    ],
    faqs: [
      {
        question: "Why do AI agents keep forgetting to await params in Next.js 15?",
        answer: "Because most LLM training data is dominated by Next.js 13 and 14 where params was a synchronous object. Next.js 15 made params an asynchronous Promise. Adding this .cursorrules file forces the agent to await params every time.",
      },
      {
        question: "Where should I save the .cursorrules file in my repository?",
        answer: "Place it in the root directory of your project named `.cursorrules`. If you use modern Cursor rules, you can also place it under `.cursor/rules/nextjs.mdc`.",
      },
    ],
    relatedRules: ["react-cursorrules", "typescript-cursorrules", "tailwind-cursorrules"],
    relatedMatrixSlugs: ["claude-prompts-for-react-and-nextjs", "claude-prompts-for-full-stack-development"],
    wikidataEntityIds: ["Q110823377", "Q19399674", "Q9824"],
    updatedAt: "2026-11-01T00:00:00Z",
    publishedAt: "2026-11-01T00:00:00Z",
  },
  {
    id: "rule-002",
    slug: "react-cursorrules",
    technology: "React 19 & Modern Hooks",
    techCategory: "frontend",
    versionTarget: "React 19.x",
    title: "React 19 Modern Hooks & Compiler AI Agent Rules",
    seoTitle: "React 19 Cursorrules & AI Agent Instructions (2026)",
    seoDescription: "Calibrated AI coding rules for React 19. Guide Cursor and Claude to leverage React 19 Actions, useOptimistic, useActionState, and modern component idioms.",
    heroTagline: "Modernize AI coding agents for React 19 Compiler and Server Component architectures.",
    targetKeywords: [
      "react cursorrules",
      "react 19 cursor rules",
      "react claude md",
      "react agent rules",
      "cursor rules for react",
    ],
    summary: "Eliminate obsolete React patterns. Teach AI models to write modern React 19 code using useActionState, useOptimistic, and clean unidirectional data flow.",
    overview: "React 19 revolutionizes state management, form transitions, and optimization. With the React Compiler, manual memoization (`useMemo`, `useCallback`) is largely obsolete, while new hooks like `useActionState` and `useOptimistic` provide native primitives for async operations.",
    keyPrinciples: [
      "Leverage the React 19 Compiler: Avoid premature `useMemo` and `useCallback` unless isolating expensive external libraries.",
      "Use `useActionState` instead of complex `useState` + `useEffect` combinations for asynchronous form submissions.",
      "Implement `useOptimistic` for instantaneous UI feedback during network mutations.",
      "Use `ref` as a standard prop; do not use the deprecated `forwardRef` API in React 19.",
      "Clean separation of pure presentation components from stateful data hooks.",
    ],
    installationGuide: {
      pathRecommendation: "Place in project root as `.cursorrules` or `.cursor/rules/react.mdc`.",
      steps: [
        "Download or copy `.cursorrules` into your project root.",
        "Add to version control to standardize team AI coding style.",
      ],
    },
    files: [
      {
        fileName: ".cursorrules",
        formatLabel: "Cursor Rules (.cursorrules)",
        description: "Cursor configuration for React 19 projects.",
        content: `# React 19 Cursor Rules

You are a Principal React 19 and TypeScript engineer.

## React 19 Primitives
- Rely on the React Compiler: Do NOT wrap functions in 'useCallback' or values in 'useMemo' by default.
- Pass 'ref' directly as a prop to function components. Do NOT use deprecated 'forwardRef'.
- For forms and async transitions, use 'useActionState', 'useFormStatus', and 'useOptimistic'.
- Use the 'use' hook for reading promises and React context conditionally or inside loops.

## Code Quality
- Functional components only. Zero class components.
- Strict TypeScript typing with explicit props interfaces.
- Accessibility: ARIA attributes, semantic buttons (type='button'|'submit'), keyboard navigable.
- Clean component breakdown: No monolithic files over 200 lines.`,
      },
      {
        fileName: "CLAUDE.md",
        formatLabel: "Claude Code (CLAUDE.md)",
        description: "Claude Code CLI configuration for React 19.",
        content: `# React 19 Claude Code Guidelines

## Stack
- React 19
- TypeScript 5+

## Invariants
1. Do NOT use \`forwardRef\` (React 19 supports ref as prop).
2. Avoid \`useMemo\`/\`useCallback\` unless benchmarking demonstrates necessity.
3. Form mutations use \`useActionState\`.
4. Run \`npm test\` to verify changes before presenting code.`,
      },
      {
        fileName: "AGENTS.md",
        formatLabel: "Agent Specification (AGENTS.md)",
        description: "Standard Autonomous Agent instructions for React 19.",
        content: `# Agent Guidelines: React 19
Follow modern React 19 standards:
- Native ref props without forwardRef wrapper.
- Optimistic updates via useOptimistic.
- Zero unchecked prop spreading on DOM elements.`,
      },
      {
        fileName: "system-prompt.txt",
        formatLabel: "LLM System Prompt",
        description: "Direct system prompt for React 19.",
        content: `You are a Senior React 19 Engineer. Write modern, accessible, type-safe React 19 components using ref props, useActionState, and useOptimistic. Avoid deprecated React 17/18 patterns.`,
      },
    ],
    examples: [
      {
        scenario: "Creating an optimistic todo item toggle",
        prompt: "Build a todo checkbox that toggles instantly while calling the server in the background.",
        agentBehavior: "The agent implements `useOptimistic` to flip the UI state immediately, cleanly falling back if the background action fails.",
      },
    ],
    faqs: [
      {
        question: "Is forwardRef still needed in React 19?",
        answer: "No. In React 19, `ref` can be passed as a standard prop directly to functional components. `forwardRef` is deprecated and will be removed in future releases.",
      },
    ],
    relatedRules: ["nextjs-cursorrules", "typescript-cursorrules", "tailwind-cursorrules"],
    relatedMatrixSlugs: ["claude-prompts-for-react-and-nextjs"],
    wikidataEntityIds: ["Q19399674", "Q9824"],
    updatedAt: "2026-11-01T00:00:00Z",
    publishedAt: "2026-11-01T00:00:00Z",
  },
  {
    id: "rule-003",
    slug: "typescript-cursorrules",
    technology: "TypeScript Strict Mode & Zod",
    techCategory: "language",
    versionTarget: "TypeScript 5.4+ / 5.5+",
    title: "TypeScript Strict Mode AI Agent Rules & Cursorrules",
    seoTitle: "TypeScript Strict Mode Cursorrules & Agent Instructions (2026)",
    seoDescription: "Eliminate 'any' types and unsafe casting. Comprehensive TypeScript rules for Cursor and Claude Code enforcing strict generics, branded types, and Zod schemas.",
    heroTagline: "Force AI coding agents to write 100% type-safe, exhaustive TypeScript.",
    targetKeywords: [
      "typescript cursorrules",
      "typescript cursor rules",
      "typescript claude md",
      "strict typescript prompt",
      "cursor rules for typescript",
    ],
    summary: "Stop AI agents from cutting corners with 'any', 'as unknown as T', or non-null assertions. Enforce branded types, exhaustive switch statements, and schema-driven type safety.",
    overview: "AI models frequently introduce subtle typing loopholes when solving complex data structures. These rules enforce strict compiler adherence, utility types, discriminated unions, and safe schema parsing across every file.",
    keyPrinciples: [
      "Zero tolerance for `any`. Use `unknown` with narrowing or typed generic parameters.",
      "No non-null assertions (`!`) unless immediately preceded by a verified runtime guard.",
      "Use discriminated unions with exhaustive `never` checks for domain state machines.",
      "Use branded types for domain identifiers (`type UserId = string & { readonly __brand: unique symbol }`).",
      "Derive TypeScript types directly from Zod schemas (`z.infer<typeof Schema>`) to maintain single source of truth.",
    ],
    installationGuide: {
      pathRecommendation: "Place in project root as `.cursorrules` or `.cursor/rules/typescript.mdc`.",
      steps: [
        "Add `.cursorrules` to the root of your TypeScript monorepo or project.",
        "Ensure your `tsconfig.json` has `strict: true` and `noUncheckedIndexedAccess: true` enabled.",
      ],
    },
    files: [
      {
        fileName: ".cursorrules",
        formatLabel: "Cursor Rules (.cursorrules)",
        description: "Cursor configuration enforcing strict TypeScript typing.",
        content: `# TypeScript Strict Mode Cursor Rules

You are a Principal TypeScript Architect.

## Strict Invariants
- NEVER use 'any'. Use 'unknown' with type narrowing or generic constraints.
- NEVER use non-null assertions ('!'). Handle null/undefined explicitly.
- Avoid unsafe type casting ('as SomeType'). Use type predicate functions or Zod validation.
- Enforce exhaustive pattern matching on discriminated unions using 'assertNever(x: never): never'.
- Use 'readonly' on properties that should not be mutated after initialization.

## Type Design
- Prefer 'type' for unions, intersections, and primitives; prefer 'interface' for public object contracts.
- Use branded types for domain IDs (e.g., UserId, TenantId) to prevent accidental ID swapping.
- Single source of truth: Infer types from runtime schemas (e.g. 'type User = z.infer<typeof UserSchema>').`,
      },
      {
        fileName: "CLAUDE.md",
        formatLabel: "Claude Code (CLAUDE.md)",
        description: "Claude Code CLI rules for TypeScript strictness.",
        content: `# TypeScript Strict Rules for Claude Code
- Zero 'any' policy.
- All exported functions must have explicit return types.
- Verify with: \`npx tsc --noEmit\`. If type errors exist, resolve them before presenting code.`,
      },
      {
        fileName: "AGENTS.md",
        formatLabel: "Agent Specification (AGENTS.md)",
        description: "Universal Agent guidelines for TypeScript.",
        content: `# Agent Instructions: Strict TypeScript
Verify type contracts exhaustively. No lazy casts. Handle all union variants.`,
      },
      {
        fileName: "system-prompt.txt",
        formatLabel: "LLM System Prompt",
        description: "System prompt for TypeScript strictness.",
        content: `You are a Staff TypeScript Engineer. Enforce absolute type safety: no 'any', no non-null assertions, exhaustive discriminated unions, and branded types for entity IDs.`,
      },
    ],
    examples: [
      {
        scenario: "Handling an API response with unknown payload",
        prompt: "Write a function to process user preferences received from an external webhook.",
        agentBehavior: "The agent parses the incoming payload through a Zod schema using `safeParse`, returning a typed Result object without unsafe `as` casting.",
      },
    ],
    faqs: [
      {
        question: "Why should I use unknown instead of any in TypeScript?",
        answer: "The `any` type completely disables TypeScript's type checker, propagating unsafety across your codebase. `unknown` forces developers (and AI agents) to perform runtime type narrowing before reading properties.",
      },
    ],
    relatedRules: ["nextjs-cursorrules", "react-cursorrules", "nodejs-cursorrules"],
    relatedMatrixSlugs: ["chatgpt-prompts-for-coding", "claude-prompts-for-full-stack-development"],
    wikidataEntityIds: ["Q9824"],
    updatedAt: "2026-11-01T00:00:00Z",
    publishedAt: "2026-11-01T00:00:00Z",
  },
  {
    id: "rule-004",
    slug: "python-fastapi-cursorrules",
    technology: "Python 3.12, FastAPI & Pydantic v2",
    techCategory: "backend",
    versionTarget: "Python 3.12+ / FastAPI 0.110+",
    title: "Python & FastAPI AI Agent Rules & Cursorrules",
    seoTitle: "Python & FastAPI Cursorrules & Agent Instructions (2026)",
    seoDescription: "Production-ready AI agent rules for Python 3.12, FastAPI, and Pydantic v2. Enforce async/await, dependency injection, and clean architecture in Cursor.",
    heroTagline: "Enforce modern Python 3.12, async FastAPI, and Pydantic v2 patterns in AI agents.",
    targetKeywords: [
      "fastapi cursorrules",
      "python cursorrules",
      "fastapi claude md",
      "python ai agent rules",
      "cursor rules for fastapi",
    ],
    summary: "Prevent AI models from generating legacy Python 2/3.8 patterns. Enforce Python 3.12 type hints, Pydantic v2 settings, FastAPI dependency injection, and async database sessions.",
    overview: "Modern Python has evolved significantly with native union types (`int | str`), Pydantic v2 performance boosts, and async SQLAlchemy 2.0. These rules ensure AI agents write clean, performant, and PEP 8 compliant backend microservices.",
    keyPrinciples: [
      "Use modern Python 3.10+ type hinting: `list[str]` instead of `typing.List[str]`, `str | None` instead of `Optional[str]`.",
      "Use Pydantic v2 with `model_validator` and `field_validator` (avoid deprecated Pydantic v1 syntax).",
      "Use FastAPI `Depends()` for all service layers, authentication, and database session injection.",
      "Always use `async def` for I/O bound endpoints; use standard `def` for CPU-bound computations.",
      "Follow Ruff / Black formatting guidelines and enforce strict type checking with mypy / pyright.",
    ],
    installationGuide: {
      pathRecommendation: "Place in project root as `.cursorrules` or `CLAUDE.md`.",
      steps: [
        "Copy `.cursorrules` into your FastAPI repository root.",
        "Ensure your environment runs `ruff check` and `mypy`.",
      ],
    },
    files: [
      {
        fileName: ".cursorrules",
        formatLabel: "Cursor Rules (.cursorrules)",
        description: "Cursor configuration for FastAPI & Python 3.12.",
        content: `# Python 3.12 & FastAPI Cursor Rules

You are a Principal Python Backend Architect.

## Core Invariants
- Python: 3.12+. Use modern syntax: 'X | Y' instead of 'Union[X, Y]', 'X | None' instead of 'Optional[X]'.
- Framework: FastAPI with Pydantic v2.
- ORM / Database: Async SQLAlchemy 2.0 or SQLModel.
- Typing: 100% type-annotated code passing 'mypy --strict'.

## FastAPI Best Practices
- Dependency Injection: Use 'Annotated[Session, Depends(get_db)]' for database sessions and auth.
- Async correctness: Use 'async def' for endpoints doing async I/O. Use 'def' for synchronous tasks.
- Error handling: Raise 'HTTPException' with detailed RFC-compliant detail messages.
- Schema separation: Separate Request DTOs from Response DTOs. Never return raw database models directly.`,
      },
      {
        fileName: "CLAUDE.md",
        formatLabel: "Claude Code (CLAUDE.md)",
        description: "Claude Code instructions for Python FastAPI.",
        content: `# FastAPI Project Rules for Claude Code
- Commands: \`pytest\`, \`ruff check .\`, \`mypy .\`
- Enforce modern Pydantic v2 (\`model_config = ConfigDict(...)\`).
- No bare \`except:\` blocks. Always catch specific exceptions.`,
      },
      {
        fileName: "AGENTS.md",
        formatLabel: "Agent Specification (AGENTS.md)",
        description: "Autonomous Agent guidelines for FastAPI.",
        content: `# Agent Operating Instructions: Python FastAPI
Maintain async session boundaries. Always close resources with context managers.`,
      },
      {
        fileName: "system-prompt.txt",
        formatLabel: "LLM System Prompt",
        description: "Direct system prompt for Python FastAPI.",
        content: `You are a Principal Python Architect specializing in FastAPI and Pydantic v2. Write clean, async-first, type-annotated Python 3.12 code adhering to PEP 8 and modern dependency injection.`,
      },
    ],
    examples: [
      {
        scenario: "Creating an authenticated FastAPI endpoint",
        prompt: "Create an endpoint to update user profile information with authentication.",
        agentBehavior: "The agent uses `Annotated[User, Depends(get_current_active_user)]`, validates input with a separate `UserProfileUpdateRequest` Pydantic model, and handles async database commits.",
      },
    ],
    faqs: [
      {
        question: "Why should I use Annotated with Depends in FastAPI?",
        answer: "Using `Annotated[Type, Depends(...)]` allows you to declare dependencies cleanly while keeping function signatures testable, type-safe, and compatible with static analyzers like mypy.",
      },
    ],
    relatedRules: ["docker-cursorrules", "postgresql-cursorrules"],
    relatedMatrixSlugs: ["claude-prompts-for-api-and-schema-design"],
    wikidataEntityIds: ["Q28865", "Q105477461"],
    updatedAt: "2026-11-01T00:00:00Z",
    publishedAt: "2026-11-01T00:00:00Z",
  },
  {
    id: "rule-005",
    slug: "tailwind-cursorrules",
    technology: "Tailwind CSS v4 & Modern UI",
    techCategory: "frontend",
    versionTarget: "Tailwind CSS v4.x",
    title: "Tailwind CSS v4 AI Agent Rules & Cursorrules",
    seoTitle: "Tailwind CSS v4 Cursorrules & AI Agent Rules (2026)",
    seoDescription: "Calibrated AI coding instructions for Tailwind CSS v4. Prevent AI agents from using obsolete tailwind.config.js and enforce modern CSS variables and color palettes.",
    heroTagline: "Guide AI agents to write modern Tailwind CSS v4 without obsolete v3 configs.",
    targetKeywords: [
      "tailwind cursorrules",
      "tailwind css v4 cursor rules",
      "tailwind claude md",
      "tailwind css agent rules",
      "cursor rules for tailwind",
    ],
    summary: "Prevent AI agents from generating deprecated Tailwind v3 config files. Enforce Tailwind CSS v4 CSS-first configuration (`@theme`), OKLCH colors, and container queries.",
    overview: "Tailwind CSS v4 introduces a revolutionary CSS-first architecture, replacing `tailwind.config.js` with pure CSS `@theme` directives. These rules instruct AI coding tools to write modern utility classes and responsive layouts.",
    keyPrinciples: [
      "Do NOT create `tailwind.config.js`; configure design tokens directly in CSS using `@theme` blocks.",
      "Use modern OKLCH color spaces for perceptual uniformity and vibrant dark modes.",
      "Enforce mobile-first responsive design: base styles first, followed by `sm:`, `md:`, `lg:`, `xl:`.",
      "Use Flexbox and CSS Grid semantics instead of obsolete floating layouts.",
      "Use standard class sorting (layout -> sizing -> typography -> background -> border -> interactive).",
    ],
    installationGuide: {
      pathRecommendation: "Place in project root as `.cursorrules` or `.cursor/rules/tailwind.mdc`.",
      steps: [
        "Save `.cursorrules` to the root of your project.",
        "Ensure your CSS entry point imports `@import 'tailwindcss';`.",
      ],
    },
    files: [
      {
        fileName: ".cursorrules",
        formatLabel: "Cursor Rules (.cursorrules)",
        description: "Cursor configuration for Tailwind CSS v4.",
        content: `# Tailwind CSS v4 Cursor Rules

You are a Principal Frontend Stylist specializing in Tailwind CSS v4.

## v4 Architecture
- Do NOT generate or edit 'tailwind.config.js'. Tailwind v4 uses CSS-first configuration.
- Custom tokens belong in your CSS stylesheet inside '@theme' blocks.
- Use native CSS variables and modern color spaces (oklch).

## Class Organization
- Mobile-first: Default utility classes apply to mobile; prefix with 'md:' and 'lg:' for larger viewports.
- Maintain consistent utility ordering:
  1. Display & Positioning (flex, grid, absolute, relative)
  2. Sizing & Spacing (w-, h-, p-, m-)
  3. Typography (text-, font-, leading-)
  4. Colors & Backgrounds (bg-, text-)
  5. Borders & Effects (rounded-, border-, shadow-)
  6. States & Transitions (hover:, focus:, transition-, duration-)`,
      },
      {
        fileName: "CLAUDE.md",
        formatLabel: "Claude Code (CLAUDE.md)",
        description: "Claude Code CLI rules for Tailwind CSS v4.",
        content: `# Tailwind CSS v4 Rules for Claude Code
- Never generate tailwind.config.js for v4 projects.
- Use modern @theme directives.
- Ensure all interactive elements have visible focus rings: \`focus-visible:ring-2 focus-visible:ring-offset-2\`.`,
      },
      {
        fileName: "AGENTS.md",
        formatLabel: "Agent Specification (AGENTS.md)",
        description: "Universal Agent guidelines for Tailwind CSS v4.",
        content: `# Agent Instructions: Tailwind CSS v4
Follow CSS-first theming. Ensure dark mode contrast meets WCAG AA standards.`,
      },
      {
        fileName: "system-prompt.txt",
        formatLabel: "LLM System Prompt",
        description: "Direct system prompt for Tailwind CSS v4.",
        content: `You are an expert Tailwind CSS v4 engineer. Write modern, accessible, mobile-first utility classes following CSS-first @theme conventions.`,
      },
    ],
    examples: [
      {
        scenario: "Designing a responsive card grid",
        prompt: "Create a 3-column responsive pricing card grid with dark mode.",
        agentBehavior: "The agent generates a clean CSS Grid layout (`grid grid-cols-1 md:grid-cols-3 gap-6`) with dark mode classes and accessible focus states.",
      },
    ],
    faqs: [
      {
        question: "Why does my AI agent keep creating tailwind.config.js?",
        answer: "LLMs were trained on years of Tailwind v2 and v3 codebases where `tailwind.config.js` was required. Adding these rules explicitly instructs the agent that Tailwind v4 uses pure CSS configuration.",
      },
    ],
    relatedRules: ["nextjs-cursorrules", "react-cursorrules"],
    relatedMatrixSlugs: ["claude-prompts-for-react-and-nextjs"],
    wikidataEntityIds: ["Q110823377"],
    updatedAt: "2026-11-01T00:00:00Z",
    publishedAt: "2026-11-01T00:00:00Z",
  },
  {
    id: "rule-006",
    slug: "nodejs-cursorrules",
    technology: "Node.js & Enterprise REST APIs",
    techCategory: "backend",
    versionTarget: "Node.js 20+ LTS / Express / Hono",
    title: "Node.js & Backend REST API AI Agent Rules & Cursorrules",
    seoTitle: "Node.js & REST API Cursorrules & AI Agent Instructions (2026)",
    seoDescription: "Guide Cursor and Claude to build scalable Node.js microservices. Enforce structured logging, graceful shutdown, error envelopes, and security middlewares.",
    heroTagline: "Turn AI coding assistants into enterprise Node.js systems engineers.",
    targetKeywords: [
      "nodejs cursorrules",
      "node js cursor rules",
      "nodejs claude md",
      "backend agent rules nodejs",
      "cursor rules for express",
    ],
    summary: "Prevent memory leaks and unhandled promise crashes. Enforce enterprise Node.js standards including structured JSON logging, graceful SIGTERM shutdowns, and rate limiting.",
    overview: "Enterprise Node.js requires disciplined memory management, non-blocking asynchronous event loops, and strict error handling. These rules guide AI agents to write production-grade services.",
    keyPrinciples: [
      "Always listen for `SIGTERM` and `SIGINT` signals to perform graceful database and connection shutdowns.",
      "Use structured JSON logging (Pino) with correlation IDs rather than unstructured `console.log`.",
      "Never block the event loop with synchronous file operations (`readFileSync`) or heavy CPU algorithms.",
      "Return standardized error payloads (RFC 7807 Problem Details) with HTTP status codes.",
      "Enforce helmet security headers, CORS policies, and token bucket rate limiters.",
    ],
    installationGuide: {
      pathRecommendation: "Place in project root as `.cursorrules` or `CLAUDE.md`.",
      steps: [
        "Copy `.cursorrules` to your Node.js service root.",
        "Ensure Pino or Winston is configured for structured logging.",
      ],
    },
    files: [
      {
        fileName: ".cursorrules",
        formatLabel: "Cursor Rules (.cursorrules)",
        description: "Cursor configuration for Node.js enterprise backends.",
        content: `# Node.js Backend Cursor Rules

You are a Principal Systems Engineer specializing in Node.js.

## Core Rules
- Runtime: Node.js 20+ LTS with ESM modules ('import/export').
- Asynchronous: Never use synchronous blocking APIs ('readFileSync', 'crypto.pbkdf2Sync').
- Structured Logging: Use Pino with trace IDs. NEVER use 'console.log' in production code.
- Graceful Shutdown: Handle process 'SIGTERM' and 'SIGINT' to drain active HTTP connections and close database pools.
- Error Handling: Centralized error handling middleware. Catch unhandled rejections.`,
      },
      {
        fileName: "CLAUDE.md",
        formatLabel: "Claude Code (CLAUDE.md)",
        description: "Claude Code rules for Node.js.",
        content: `# Node.js Project Guidelines for Claude Code
- Commands: \`npm test\`, \`npm run lint\`
- Always use async/await over raw promise chains or callbacks.
- Enforce input validation using Zod on all incoming request bodies.`,
      },
      {
        fileName: "AGENTS.md",
        formatLabel: "Agent Specification (AGENTS.md)",
        description: "Autonomous Agent instructions for Node.js.",
        content: `# Agent Operating Instructions: Node.js
Never introduce memory leak patterns. Ensure all streams are piped safely with error listeners.`,
      },
      {
        fileName: "system-prompt.txt",
        formatLabel: "LLM System Prompt",
        description: "Direct system prompt for Node.js.",
        content: `You are a Principal Node.js Engineer. Write high-throughput, non-blocking, securely configured REST APIs with structured logging and graceful shutdown mechanisms.`,
      },
    ],
    examples: [
      {
        scenario: "Implementing graceful shutdown",
        prompt: "Write a server bootstrap script that gracefully drains connections on SIGTERM.",
        agentBehavior: "The agent implements a clean listener on `process.on('SIGTERM')` that stops accepting new connections, drains the database pool, and exits with code 0.",
      },
    ],
    faqs: [
      {
        question: "Why should I ban console.log in Node.js rules?",
        answer: "`console.log` is synchronous and can block the Node.js event loop during high-throughput spikes. Structured loggers like Pino buffer output asynchronously and output machine-readable JSON.",
      },
    ],
    relatedRules: ["typescript-cursorrules", "postgresql-cursorrules", "docker-cursorrules"],
    relatedMatrixSlugs: ["claude-prompts-for-api-and-schema-design", "claude-prompts-for-code-debugging"],
    wikidataEntityIds: ["Q756100"],
    updatedAt: "2026-11-01T00:00:00Z",
    publishedAt: "2026-11-01T00:00:00Z",
  },
  {
    id: "rule-007",
    slug: "postgresql-cursorrules",
    technology: "PostgreSQL, Prisma & Drizzle ORM",
    techCategory: "database",
    versionTarget: "PostgreSQL 16+ / Prisma 5+ / Drizzle",
    title: "PostgreSQL, Prisma & Drizzle AI Agent Rules & Cursorrules",
    seoTitle: "PostgreSQL & Prisma Cursorrules & AI Agent Instructions (2026)",
    seoDescription: "Guide AI coding assistants to write safe PostgreSQL migrations, indexed queries, and Prisma/Drizzle schemas without N+1 query bottlenecks.",
    heroTagline: "Eliminate N+1 database bottlenecks and unsafe table locks in AI-generated code.",
    targetKeywords: [
      "postgresql cursorrules",
      "prisma cursorrules",
      "drizzle cursor rules",
      "sql agent rules",
      "cursor rules for database",
    ],
    summary: "Prevent AI agents from writing disastrous database migrations and slow unindexed queries. Enforce compound indexing, non-blocking lock timeouts, and safe ORM joins.",
    overview: "Relational database performance depends on schema design, query planning, and concurrency management. These rules instruct AI agents to write safe SQL queries, add proper foreign key indexes, and prevent N+1 query loops.",
    keyPrinciples: [
      "Always add compound database indexes to foreign keys and filtered columns.",
      "Never generate N+1 query patterns; use relational joins or batching (`include`, `with`).",
      "Enforce lock timeouts (`SET lock_timeout = '2s'`) on production schema migrations.",
      "Use `CONCURRENTLY` when building indexes on existing PostgreSQL tables with production traffic.",
      "Use ULID or UUIDv7 for distributed identifiers to preserve B-tree index insertion locality.",
    ],
    installationGuide: {
      pathRecommendation: "Place in project root as `.cursorrules` or `.cursor/rules/database.mdc`.",
      steps: [
        "Add `.cursorrules` to your database directory or repository root.",
        "Verify all migrations with dry-run scripts before applying.",
      ],
    },
    files: [
      {
        fileName: ".cursorrules",
        formatLabel: "Cursor Rules (.cursorrules)",
        description: "Cursor configuration for PostgreSQL and ORMs.",
        content: `# PostgreSQL & ORM Cursor Rules

You are a Principal Database Administrator and Performance Engineer.

## Schema & Query Invariants
- PostgreSQL: 16+.
- Every foreign key must have an accompanying index.
- Never write N+1 query loops. Always use batching or eager loading with explicit joins.
- Use UUIDv7 or ULID for primary keys to maintain sequential B-tree ordering.
- For large migrations, use 'CREATE INDEX CONCURRENTLY' with strict statement timeouts.
- Never store raw passwords or unhashed tokens. Use Argon2id or bcrypt.`,
      },
      {
        fileName: "CLAUDE.md",
        formatLabel: "Claude Code (CLAUDE.md)",
        description: "Claude Code instructions for PostgreSQL.",
        content: `# PostgreSQL Rules for Claude Code
- Never generate raw SQL without parameterized queries (prevent SQL injection).
- When using Prisma or Drizzle, select only needed columns rather than selecting full records.`,
      },
      {
        fileName: "AGENTS.md",
        formatLabel: "Agent Specification (AGENTS.md)",
        description: "Universal Agent guidelines for PostgreSQL.",
        content: `# Agent Instructions: PostgreSQL
All schema alterations must include reversible rollback scripts.`,
      },
      {
        fileName: "system-prompt.txt",
        formatLabel: "LLM System Prompt",
        description: "Direct system prompt for PostgreSQL.",
        content: `You are a Principal Database Architect. Write optimized, indexed PostgreSQL schemas and ORM queries that eliminate N+1 bottlenecks and concurrency locks.`,
      },
    ],
    examples: [
      {
        scenario: "Fetching user orders without N+1 query loop",
        prompt: "Write a query to list users and their recent 5 orders.",
        agentBehavior: "The agent generates an optimized single query with a lateral join or single relational `include` statement, preventing iterative loop queries.",
      },
    ],
    faqs: [
      {
        question: "Why are UUIDv7 primary keys recommended over UUIDv4?",
        answer: "UUIDv4 is purely random, which causes severe B-tree page fragmentation and slow index insertions on large tables. UUIDv7 embeds a timestamp prefix, ensuring chronological insertion order while retaining global uniqueness.",
      },
    ],
    relatedRules: ["nodejs-cursorrules", "python-fastapi-cursorrules"],
    relatedMatrixSlugs: ["claude-prompts-for-api-and-schema-design", "chatgpt-prompts-for-coding"],
    wikidataEntityIds: ["Q192490"],
    updatedAt: "2026-11-01T00:00:00Z",
    publishedAt: "2026-11-01T00:00:00Z",
  },
  {
    id: "rule-008",
    slug: "docker-cursorrules",
    technology: "Docker & Container Security",
    techCategory: "devops",
    versionTarget: "Docker BuildKit / Multi-Stage",
    title: "Docker & Container Security AI Agent Rules & Cursorrules",
    seoTitle: "Docker & Containerization Cursorrules & Agent Instructions (2026)",
    seoDescription: "Guide AI assistants to build lightweight, non-root, multi-stage Dockerfiles. Enforce BuildKit caching, minimal base images, and container security.",
    heroTagline: "Force AI agents to write minimal, non-root, production-hardened Dockerfiles.",
    targetKeywords: [
      "docker cursorrules",
      "docker cursor rules",
      "docker claude md",
      "containerization agent rules",
      "cursor rules for dockerfile",
    ],
    summary: "Stop AI agents from generating insecure, bloated 1GB Docker images that run as root. Enforce multi-stage builds, non-root user execution, and BuildKit cache mounts.",
    overview: "Insecure container images introduce severe vulnerabilities into production Kubernetes clusters. These rules ensure AI coding agents produce multi-stage Dockerfiles that run under unprivileged users.",
    keyPrinciples: [
      "Always use multi-stage builds (`AS builder` and `AS runner`) to keep production images tiny.",
      "NEVER run containers as the `root` user; create and switch to a dedicated non-root user (`USER nonroot`).",
      "Use minimal Alpine or distroless base images with fixed sha256 digests.",
      "Leverage BuildKit cache mounts (`--mount=type=cache`) to accelerate CI/CD build speeds.",
      "Include a lightweight `.dockerignore` file excluding `node_modules`, `.git`, and environment secrets.",
    ],
    installationGuide: {
      pathRecommendation: "Place in project root as `.cursorrules` or `.cursor/rules/docker.mdc`.",
      steps: [
        "Save `.cursorrules` to your project root.",
        "Ensure Docker BuildKit is enabled (`DOCKER_BUILDKIT=1`).",
      ],
    },
    files: [
      {
        fileName: ".cursorrules",
        formatLabel: "Cursor Rules (.cursorrules)",
        description: "Cursor configuration for Docker containerization.",
        content: `# Docker & Containerization Cursor Rules

You are a Principal DevOps and Container Security Architect.

## Core Rules
- Always write multi-stage Dockerfiles separating build dependencies from runtime environments.
- Non-Root: Never run as 'root'. Explicitly create a non-root group and user (e.g. 'USER node' or 'USER nonroot').
- Base Images: Use slim or Alpine base images with explicit version tags (never use ':latest').
- Caching: Copy dependency manifests first ('package.json', 'pnpm-lock.yaml') before copying application source code.
- Ignore Secrets: Always create a comprehensive '.dockerignore' excluding '.env*', '.git', and build artifacts.`,
      },
      {
        fileName: "CLAUDE.md",
        formatLabel: "Claude Code (CLAUDE.md)",
        description: "Claude Code instructions for Docker.",
        content: `# Docker Guidelines for Claude Code
- Build check: \`docker build -t test-build .\`
- Ensure all exposed ports match application binding addresses (bind to 0.0.0.0).`,
      },
      {
        fileName: "AGENTS.md",
        formatLabel: "Agent Specification (AGENTS.md)",
        description: "Universal Agent guidelines for Docker.",
        content: `# Agent Instructions: Docker
Enforce least-privilege container execution and clean layer minimization.`,
      },
      {
        fileName: "system-prompt.txt",
        formatLabel: "LLM System Prompt",
        description: "Direct system prompt for Docker.",
        content: `You are a Senior Container Security Engineer. Write multi-stage, non-root, cache-optimized Dockerfiles with minimal attack surfaces.`,
      },
    ],
    examples: [
      {
        scenario: "Building a Next.js production Dockerfile",
        prompt: "Write a production Dockerfile for a Next.js standalone application.",
        agentBehavior: "The agent generates a 3-stage Dockerfile (deps, builder, runner), uses `output: 'standalone'`, creates a `nextjs:nodejs` non-root user, and exposes the port cleanly.",
      },
    ],
    faqs: [
      {
        question: "Why is running as non-root critical in Docker?",
        answer: "If a container process running as root is compromised via an application vulnerability, an attacker can potentially break out of the container boundary and gain root access to the host machine kernel.",
      },
    ],
    relatedRules: ["nodejs-cursorrules", "python-fastapi-cursorrules"],
    relatedMatrixSlugs: ["claude-prompts-for-software-architecture"],
    wikidataEntityIds: ["Q15133800"],
    updatedAt: "2026-11-01T00:00:00Z",
    publishedAt: "2026-11-01T00:00:00Z",
  },
  {
    id: "rule-009",
    slug: "go-microservices-cursorrules",
    technology: "Go Microservices & Clean Architecture",
    techCategory: "backend",
    versionTarget: "Go 1.22+ / 1.23+",
    title: "Go Microservices & Clean Architecture AI Agent Rules & Cursorrules",
    seoTitle: "Go Microservices Cursorrules & AI Agent Instructions (2026)",
    seoDescription: "Guide AI assistants to write idiomatic Go 1.22+ code. Enforce goroutine leak prevention, context cancellation, structured logging, and clean architecture.",
    heroTagline: "Enforce idiomatic Go concurrency, context propagation, and zero goroutine leaks.",
    targetKeywords: [
      "go cursorrules",
      "golang cursor rules",
      "golang claude md",
      "go microservices agent rules",
      "cursor rules for golang",
    ],
    summary: "Prevent AI models from generating Java-like Go code or introducing silent goroutine leaks. Enforce idiomatic error handling, context propagation, and clean architectural boundaries.",
    overview: "Go is revered for its simplicity, concurrency primitives, and raw execution speed. However, AI models often write unidiomatic Go with unbuffered channel deadlocks and missing context checks. These rules enforce idiomatic Go engineering.",
    keyPrinciples: [
      "Always propagate `context.Context` as the first argument in all I/O, database, and network functions.",
      "Check `errors.Is` and `errors.As` instead of comparing string error values.",
      "Ensure all spawned goroutines have an exit condition to prevent memory leaks.",
      "Use `slog` for modern structured JSON logging.",
      "Favor small, single-method interfaces declared at the consumer site rather than producer site.",
    ],
    installationGuide: {
      pathRecommendation: "Place in project root as `.cursorrules` or `CLAUDE.md`.",
      steps: [
        "Copy `.cursorrules` to your Go repository root.",
        "Ensure `golangci-lint` passes on your project.",
      ],
    },
    files: [
      {
        fileName: ".cursorrules",
        formatLabel: "Cursor Rules (.cursorrules)",
        description: "Cursor configuration for Go microservices.",
        content: `# Go Microservices Cursor Rules

You are a Principal Go Systems Architect.

## Core Rules
- Language: Go 1.22+. Use standard library 'slog' for structured logging.
- Concurrency: Never start a goroutine without knowing how and when it will stop. Listen to 'ctx.Done()'.
- Context: 'ctx context.Context' must be the first parameter in all blocking/I/O functions.
- Error Handling: Handle errors immediately; never ignore returned errors. Use 'fmt.Errorf(\"...: %w\", err)' for wrapping.
- Interfaces: Define interfaces where they are consumed, not where they are implemented. Keep interfaces small (1-2 methods).`,
      },
      {
        fileName: "CLAUDE.md",
        formatLabel: "Claude Code (CLAUDE.md)",
        description: "Claude Code instructions for Go.",
        content: `# Go Project Rules for Claude Code
- Commands: \`go test -race ./...\`, \`golangci-lint run\`
- Never use panic/recover in standard library or business logic. Return clean error values.`,
      },
      {
        fileName: "AGENTS.md",
        formatLabel: "Agent Specification (AGENTS.md)",
        description: "Universal Agent guidelines for Go.",
        content: `# Agent Operating Instructions: Go
Enforce -race test passing. Ensure all channels have unambiguous ownership and close semantics.`,
      },
      {
        fileName: "system-prompt.txt",
        formatLabel: "LLM System Prompt",
        description: "Direct system prompt for Go.",
        content: `You are an expert Go Engineer. Write idiomatic, concurrent, performant Go code with explicit error wrapping, context cancellation, and zero goroutine leaks.`,
      },
    ],
    examples: [
      {
        scenario: "Handling concurrent worker pools",
        prompt: "Write a worker pool processing jobs with graceful shutdown.",
        agentBehavior: "The agent uses `sync.WaitGroup`, listens for `ctx.Done()`, drains the job channel, and exits cleanly without deadlocks or leaked goroutines.",
      },
    ],
    faqs: [
      {
        question: "Why should interfaces be declared by consumers in Go?",
        answer: "Declaring interfaces where they are used (consumer side) decouples packages, avoids unnecessary package dependencies, and makes mocking straightforward in tests.",
      },
    ],
    relatedRules: ["docker-cursorrules", "postgresql-cursorrules"],
    relatedMatrixSlugs: ["claude-prompts-for-software-architecture"],
    wikidataEntityIds: ["Q37227"],
    updatedAt: "2026-11-01T00:00:00Z",
    publishedAt: "2026-11-01T00:00:00Z",
  },
  {
    id: "rule-010",
    slug: "angular-cursorrules",
    technology: "Angular 18+ Signals & Standalone Components",
    techCategory: "frontend",
    versionTarget: "Angular 18+ / 19+",
    title: "Angular 18+ Signals & Standalone AI Agent Rules & Cursorrules",
    seoTitle: "Angular 18+ Signals & Standalone Cursorrules (2026)",
    seoDescription: "Guide AI assistants to write modern Angular 18+ code using Signals, Standalone Components, and control flow syntax (@if, @for) instead of NgModules.",
    heroTagline: "Enforce modern Angular Signals and standalone architecture in AI assistants.",
    targetKeywords: [
      "angular cursorrules",
      "angular 18 cursor rules",
      "angular signals claude md",
      "angular agent rules",
      "cursor rules for angular",
    ],
    summary: "Prevent AI models from generating deprecated Angular 12 NgModules and manual RxJS subscriptions. Enforce modern Angular Signals, computed states, and built-in control flow (@if, @for).",
    overview: "Angular has evolved dramatically with Angular 17 and 18, introducing fine-grained reactive Signals and deprecating NgModules in favor of Standalone Components. These rules keep AI models focused on modern Angular standards.",
    keyPrinciples: [
      "NEVER generate `NgModule` declarations; all components, directives, and pipes must be `standalone: true`.",
      "Use Angular Signals (`signal()`, `computed()`) for reactive component state instead of manual RxJS subscription boilerplate.",
      "Use modern built-in control flow syntax (`@if`, `@for`, `@switch`) instead of legacy `*ngIf` and `*ngFor` directives.",
      "Use `inject()` function for dependency injection rather than constructor injection.",
      "Use `toSignal()` when bridging RxJS observables to component templates.",
    ],
    installationGuide: {
      pathRecommendation: "Place in project root as `.cursorrules` or `.cursor/rules/angular.mdc`.",
      steps: [
        "Copy `.cursorrules` to your Angular project root.",
        "Ensure your workspace uses Angular CLI 18+.",
      ],
    },
    files: [
      {
        fileName: ".cursorrules",
        formatLabel: "Cursor Rules (.cursorrules)",
        description: "Cursor configuration for Angular 18+ Signals.",
        content: `# Angular 18+ Signals Cursor Rules

You are a Principal Angular Architect.

## Core Rules
- Framework: Angular 18+. Standalone components ONLY (never generate 'NgModule').
- Reactivity: Use Angular Signals ('signal()', 'computed()') for state management.
- Templates: Use built-in control flow ('@if', '@for (item of items; track item.id)', '@switch'). NEVER use '*ngIf' or '*ngFor'.
- Dependency Injection: Use the modern 'inject(Service)' function instead of constructor parameters.
- Forms: Reactive Forms with strict typing ('FormControl<string>').`,
      },
      {
        fileName: "CLAUDE.md",
        formatLabel: "Claude Code (CLAUDE.md)",
        description: "Claude Code instructions for modern Angular.",
        content: `# Angular Guidelines for Claude Code
- Commands: \`ng test\`, \`ng lint\`
- Always include the \`track\` expression in \`@for\` loops.`,
      },
      {
        fileName: "AGENTS.md",
        formatLabel: "Agent Specification (AGENTS.md)",
        description: "Universal Agent guidelines for Angular.",
        content: `# Agent Operating Instructions: Angular
Enforce standalone components and fine-grained reactive Signal architectures.`,
      },
      {
        fileName: "system-prompt.txt",
        formatLabel: "LLM System Prompt",
        description: "Direct system prompt for Angular.",
        content: `You are an expert Angular 18+ Engineer. Write clean, standalone, Signal-driven Angular components using modern @if/@for control flow syntax and inject() dependency injection.`,
      },
    ],
    examples: [
      {
        scenario: "Creating a reactive user list component",
        prompt: "Create an Angular component displaying a searchable list of users.",
        agentBehavior: "The agent generates a standalone component with `signal()` for search query, `computed()` for filtered users, and modern `@for (user of filteredUsers(); track user.id)` syntax in the template.",
      },
    ],
    faqs: [
      {
        question: "Why should I avoid *ngIf and *ngFor in Angular 18?",
        answer: "Angular's new built-in control flow (`@if`, `@for`, `@switch`) compiles directly into template instructions with zero runtime directive overhead, offers cleaner syntax, and requires mandatory track expressions for optimal rendering performance.",
      },
    ],
    relatedRules: ["typescript-cursorrules", "tailwind-cursorrules"],
    relatedMatrixSlugs: ["claude-prompts-for-full-stack-development"],
    wikidataEntityIds: ["Q24578999", "Q9824"],
    updatedAt: "2026-11-01T00:00:00Z",
    publishedAt: "2026-11-01T00:00:00Z",
  },
];
