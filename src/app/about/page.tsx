import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { constructMetadata } from "@/lib/seo";
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Target,
  Layers,
  Cpu,
  Sliders,
  CheckCircle2,
  ArrowRight,
  Code2,
  Briefcase,
  PenTool,
  TrendingUp,
  GraduationCap,
  SlidersHorizontal,
} from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "About Us",
  description:
    "Learn what Beautiful AI Prompt is, the problem we solve, who our prompt library is built for, and how our structured prompts are organized.",
  path: "/about",
  keywords: [
    "about beautiful ai prompt",
    "prompt engineering methodology",
    "ai prompt directory",
    "structured prompts",
    "ai productivity platform",
  ],
});

const TARGET_AUDIENCES = [
  {
    icon: Code2,
    title: "Software Engineers & Tech Leads",
    description:
      "Engineers who need rigorous code refactoring, system architecture diagrams, test generation, and deep debugging prompts without generic fluff.",
  },
  {
    icon: Briefcase,
    title: "Job Seekers & Career Navigators",
    description:
      "Professionals crafting high-impact ATS resumes, preparing for senior behavioral and technical interviews, and negotiating competitive offers.",
  },
  {
    icon: PenTool,
    title: "Content Creators & Storytellers",
    description:
      "Writers, YouTubers, and podcasters looking for captivating narrative hooks, high-retention video scripts, and editorial refinement.",
  },
  {
    icon: TrendingUp,
    title: "Founders, Marketers & Strategists",
    description:
      "Operators developing sharp value propositions, competitive positioning briefs, launch copy, and customer research syntheses.",
  },
  {
    icon: GraduationCap,
    title: "Students, Researchers & Lifelong Learners",
    description:
      "Academics and self-directed learners using AI as a Socratic sparring partner to demystify complex concepts and papers.",
  },
  {
    icon: SlidersHorizontal,
    title: "Busy Professionals Seeking Efficiency",
    description:
      "Knowledge workers needing executive briefing summaries, meeting action-item extractors, and tactful email drafting prompts.",
  },
];

const ORGANIZATION_PILLARS = [
  {
    icon: Layers,
    title: "Domain Categories",
    description:
      "Prompts are cataloged across specialized domains (Development, Career, Business, Marketing, Writing) so you can quickly jump directly into your workflow.",
    link: "/categories",
    linkText: "Browse Categories",
  },
  {
    icon: Sparkles,
    title: "Curated Collections",
    description:
      "Editorial bundles assembling complementary prompts into full end-to-end workflows, like the Complete Job Search Suite or Full-Stack Developer Toolkit.",
    link: "/collections",
    linkText: "Explore Collections",
  },
  {
    icon: Cpu,
    title: "Model Compatibility & Benchmarking",
    description:
      "Every prompt identifies compatibility with Claude 3.5/Sonnet, GPT-4o, Gemini 1.5 Pro, and reasoning models to ensure consistent behavioral output.",
    link: "/prompts",
    linkText: "Filter by Model",
  },
  {
    icon: Sliders,
    title: "Interactive In-Browser Customization",
    description:
      "Prompts include dynamic variable slots ([ROLE], [CONTEXT], [CONTENT]) that you customize locally in the browser with live preview and zero latency.",
    link: "/prompts",
    linkText: "Discover Prompts",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[var(--background)] min-h-screen pb-20">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "About" },
        ]}
      />

      {/* Hero Section */}
      <section className="py-12 sm:py-16 border-b border-[var(--border)]">
        <Container size="default">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5" />
              <span>About Beautiful AI Prompt</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--foreground)] leading-[1.15]">
              Empowering people to unlock the true potential of modern AI.
            </h1>

            <p className="text-base sm:text-lg text-[var(--muted-foreground)] leading-relaxed">
              Beautiful AI Prompt is a free, privacy-first, curated library of production-grade
              prompts engineered to transform state-of-the-art language models from unpredictable
              novelties into dependable, high-leverage thinking partners.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/prompts"
                className="inline-flex items-center justify-center font-medium transition-all duration-150 rounded-[var(--radius-md)] text-sm h-9.5 px-4 bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-hover)] shadow-sm active:scale-[0.98] gap-2"
              >
                <span>Explore Prompt Library</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center justify-center font-medium transition-all duration-150 rounded-[var(--radius-md)] text-sm h-9.5 px-4 bg-transparent text-[var(--foreground)] border border-[var(--border)] hover:border-[var(--border-strong)] hover:bg-[var(--card-hover)] active:scale-[0.98]"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* The Problem We Solve */}
      <section className="py-14 sm:py-20 border-b border-[var(--border)] bg-[var(--surface)]">
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-4">
              <Badge variant="primary" size="sm">
                The Core Problem
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
                Why 90% of AI prompts yield mediocre results.
              </h2>
              <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
                Modern AI models are astonishingly capable, yet most people interact with them using
                shallow, one-sentence queries like &quot;write a blog post about marketing&quot; or
                &quot;fix my resume.&quot;
              </p>
              <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
                The result? Bland, boilerplate, hallucinatory prose that sounds unmistakably artificial.
                Users spend hours re-prompting, editing out clichés, and guessing what magic words will
                make the AI listen.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="p-6 space-y-3 bg-[var(--card)] border-[var(--border)]">
                <div className="h-9 w-9 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center font-bold text-sm">
                  ✕
                </div>
                <h3 className="text-base font-semibold text-[var(--foreground)]">
                  The Naive Approach
                </h3>
                <ul className="space-y-2 text-xs text-[var(--muted-foreground)] leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 mt-0.5">•</span>
                    <span>Vague context with missing constraints</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 mt-0.5">•</span>
                    <span>AI defaults to generic corporate tone</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 mt-0.5">•</span>
                    <span>Requires 5-10 frustrating follow-up turns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 mt-0.5">•</span>
                    <span>Output requires extensive rewriting</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6 space-y-3 bg-[var(--card)] border-[var(--primary)]/30 shadow-[var(--shadow-sm)]">
                <div className="h-9 w-9 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center font-bold text-sm">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-[var(--foreground)]">
                  The Beautiful AI Standard
                </h3>
                <ul className="space-y-2 text-xs text-[var(--foreground)]/80 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[var(--primary)] shrink-0 mt-0.5" />
                    <span>Rigid persona and cognitive role-anchoring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[var(--primary)] shrink-0 mt-0.5" />
                    <span>Explicit negative constraints (what NOT to do)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[var(--primary)] shrink-0 mt-0.5" />
                    <span>Deterministic input-output contracts & XML tags</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[var(--primary)] shrink-0 mt-0.5" />
                    <span>Self-verification step before final generation</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Who It Is For */}
      <section className="py-14 sm:py-20 border-b border-[var(--border)]">
        <Container size="default">
          <div className="max-w-2xl space-y-3 mb-12">
            <Badge variant="secondary" size="sm">
              Audience
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
              Who is Beautiful AI Prompt for?
            </h2>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
              Whether you are shipping code, pitching investors, writing essays, or interviewing for
              your dream job, our prompts are engineered for professionals who demand excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TARGET_AUDIENCES.map((audience, i) => {
              const Icon = audience.icon;
              return (
                <Card
                  key={i}
                  className="p-6 space-y-3 bg-[var(--card)] border-[var(--border)] hover:border-[var(--primary)]/40 transition-colors"
                >
                  <div className="h-10 w-10 rounded-lg bg-[var(--secondary)] text-[var(--primary)] flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-[var(--foreground)]">
                    {audience.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-[var(--muted-foreground)]">
                    {audience.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* How Prompts Are Organized */}
      <section className="py-14 sm:py-20 border-b border-[var(--border)] bg-[var(--surface)]">
        <Container size="default">
          <div className="max-w-2xl space-y-3 mb-12">
            <Badge variant="primary" size="sm">
              Architecture
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
              How our prompt library is organized.
            </h2>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
              We reject chaotic prompt dumps. Every prompt in our library is systematically classified,
              rigorously tested, and structured for instant practical application.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ORGANIZATION_PILLARS.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <Card key={i} className="p-6 space-y-4 bg-[var(--card)] border-[var(--border)] flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="h-10 w-10 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-[var(--foreground)]">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-[var(--muted-foreground)]">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-2">
                    <Link
                      href={pillar.link}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--primary)] hover:underline"
                    >
                      <span>{pillar.linkText}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Core Principles */}
      <section className="py-14 sm:py-20 border-b border-[var(--border)]">
        <Container size="narrow">
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <Badge variant="secondary" size="sm">
                Our Philosophy
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
                Our 3 Non-Negotiable Commitments
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4 p-5 rounded-xl bg-[var(--card)] border border-[var(--border)]">
                <div className="flex-shrink-0 mt-1">
                  <ShieldCheck className="h-5 w-5 text-emerald-500" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-[var(--foreground)]">
                    1. 100% Privacy-First & Local Execution
                  </h3>
                  <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                    We never require user accounts. Your prompt bookmarks are stored in your own
                    browser&apos;s localStorage, and our prompt variable editor replaces text locally
                    in your browser JavaScript runtime with zero server logging.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-5 rounded-xl bg-[var(--card)] border border-[var(--border)]">
                <div className="flex-shrink-0 mt-1">
                  <Target className="h-5 w-5 text-indigo-500" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-[var(--foreground)]">
                    2. Quality Over Massive Quantity
                  </h3>
                  <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                    We refuse to scrape or mass-generate thousands of low-value prompts. Every prompt
                    undergoes human evaluation for clarity, structural efficacy, and cross-model resilience.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-5 rounded-xl bg-[var(--card)] border border-[var(--border)]">
                <div className="flex-shrink-0 mt-1">
                  <Zap className="h-5 w-5 text-amber-500" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-[var(--foreground)]">
                    3. Actionable Utility, Not Academic Jargon
                  </h3>
                  <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                    Every prompt includes realistic example inputs, anticipated outputs, actionable tips,
                    and common pitfalls so you can get immediate value without guesswork.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Final Call to Action */}
      <section className="py-14 sm:py-20 text-center">
        <Container size="narrow">
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
              Start getting 10x better results from your AI.
            </h2>
            <p className="text-sm text-[var(--muted-foreground)] max-w-xl mx-auto leading-relaxed">
              Explore our curated library, customize variables for your current task, and experience the
              difference engineered prompts make.
            </p>
            <div className="flex justify-center gap-3">
              <Link
                href="/prompts"
                className="inline-flex items-center justify-center font-medium transition-all duration-150 rounded-[var(--radius-md)] text-sm h-10 px-6 bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-hover)] shadow-sm active:scale-[0.98] gap-2"
              >
                <span>Explore All Prompts</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
