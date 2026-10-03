import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Card } from "@/components/ui/card";
import { constructMetadata } from "@/lib/seo";
import {
  AlertTriangle,
  ShieldAlert,
  FileCheck,
  Stethoscope,
  Scale,
  DollarSign,
} from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "AI Output & Content Disclaimer",
  description:
    "Essential guidance on using AI prompts safely. Clarifies that prompts are tools, outputs may be inaccurate, and critical information must always be verified.",
  path: "/disclaimer",
  keywords: [
    "ai disclaimer",
    "ai output accuracy",
    "prompt disclaimer",
    "hallucination verification",
    "beautiful ai prompt terms",
  ],
});

const VERIFICATION_STEPS = [
  {
    title: "1. Code & Technical Implementations",
    desc: "Always run AI-generated code, SQL queries, and infrastructure configurations in isolated local or sandbox test environments before merging into production.",
  },
  {
    title: "2. Factual, Historical & Statistical Claims",
    desc: "Verify citations, data metrics, and technical assertions against primary upstream sources or official documentation. LLMs can convincingly hallucinate citations.",
  },
  {
    title: "3. Career, Resume & Portfolio Information",
    desc: "Ensure all bullets, metrics, and achievements generated or polished by prompts truthfully represent your actual experience and abilities.",
  },
  {
    title: "4. Business, Marketing & Strategic Decisions",
    desc: "Treat AI strategic proposals as brainstormed drafts and hypotheses rather than validated market intelligence or infallible strategy.",
  },
];

export default function DisclaimerPage() {
  return (
    <div className="bg-[var(--background)] min-h-screen pb-20">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Disclaimer" },
        ]}
      />

      {/* Header */}
      <section className="py-12 sm:py-16 border-b border-[var(--border)]">
        <Container size="narrow">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold">
              <AlertTriangle className="h-3.5 w-3.5" />
              <span>Safety & Output Verification</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--foreground)]">
              AI Output & Content Disclaimer
            </h1>

            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
              Last Updated: October 2026 • Please read carefully before utilizing prompts.
            </p>

            <p className="text-sm text-[var(--foreground)]/90 leading-relaxed pt-2">
              Artificial intelligence is a transformative multiplier for human productivity. However,
              understanding its inherent stochastic limitations is crucial to using it safely,
              responsibly, and effectively.
            </p>
          </div>
        </Container>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16">
        <Container size="narrow">
          <div className="space-y-12">
            {/* Core Warning Box */}
            <div className="p-6 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-950 dark:text-amber-200 space-y-3">
              <div className="flex items-center gap-2.5 font-bold text-sm">
                <ShieldAlert className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>Critical Notice on AI Non-Determinism</span>
              </div>
              <p className="text-xs leading-relaxed">
                Prompts curated on Beautiful AI Prompt are structured instructions and blueprints, not
                deterministic software routines. Large Language Models (LLMs) are probabilistic systems
                that may hallucinate falsehoods, omit essential safety edge cases, or deliver
                inconsistent outputs across different versions, model updates, and parameters.
              </p>
            </div>

            {/* Structured Sections */}
            <div className="space-y-10 text-sm leading-relaxed text-[var(--muted-foreground)]">
              {/* Section 1 */}
              <section className="space-y-3">
                <h2 className="text-lg font-bold text-[var(--foreground)]">
                  1. Prompts Are Tools and Instructional Blueprints
                </h2>
                <p>
                  The prompts, templates, system instructions, and variable frameworks cataloged on
                  BeautifulAIPrompt.com are provided as heuristic tools to guide language models toward
                  more structured, high-signal responses.
                </p>
                <p className="text-xs">
                  While our prompts implement proven prompt engineering practices (such as role-anchoring,
                  negative constraints, and delimiter formatting), they do not alter the underlying
                  foundational training, stochasticity, or probabilistic behavior of external AI models.
                </p>
              </section>

              {/* Section 2 */}
              <section className="space-y-3">
                <h2 className="text-lg font-bold text-[var(--foreground)]">
                  2. AI Outputs May Be Inaccurate or Flawed
                </h2>
                <p>
                  Foundational models—including Claude, ChatGPT, Gemini, Copilot, and open weights—can
                  generate content that appears articulate and authoritative while being subtly or
                  fundamentally incorrect. Potential risks include:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-[var(--foreground)]/80">
                  <li><strong>Hallucinated Facts & Citations</strong>: Fabricated URLs, research studies, laws, or quotes.</li>
                  <li><strong>Logical & Algorithmic Bugs</strong>: Syntactically valid code containing subtle concurrency or security flaws.</li>
                  <li><strong>Knowledge Cutoff Drift</strong>: Outdated syntax or deprecated APIs not matching current library versions.</li>
                  <li><strong>Unintended Tone Shifts</strong>: Minor semantic drift caused by underlying model updates.</li>
                </ul>
              </section>

              {/* Section 3 */}
              <section className="space-y-3">
                <h2 className="text-lg font-bold text-[var(--foreground)]">
                  3. Users Must Verify All Important Information
                </h2>
                <p>
                  You are solely responsible for reviewing, auditing, testing, and verifying any content,
                  code, analysis, or strategic advice generated by an AI model prior to publication,
                  deployment, or implementation.
                </p>

                {/* Verification Card */}
                <Card className="p-5 bg-[var(--card)] border-[var(--border)] space-y-4 my-4">
                  <h3 className="text-xs font-bold text-[var(--foreground)] uppercase tracking-wider flex items-center gap-2">
                    <FileCheck className="h-4 w-4 text-[var(--primary)]" />
                    <span>Recommended Output Verification Protocol</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {VERIFICATION_STEPS.map((step, i) => (
                      <div key={i} className="space-y-1">
                        <h4 className="text-xs font-semibold text-[var(--foreground)]">{step.title}</h4>
                        <p className="text-[11px] text-[var(--muted-foreground)] leading-relaxed">{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </section>

              {/* Section 4 */}
              <section className="space-y-3">
                <h2 className="text-lg font-bold text-[var(--foreground)]">
                  4. No Guarantee of AI-Generated Results
                </h2>
                <p>
                  Beautiful AI Prompt does not guarantee that using our prompts will lead to specific
                  outcomes, including but not limited to:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-[var(--foreground)]/80">
                  <li>Securing a job interview, promotion, or employment offer.</li>
                  <li>Achieving specific exam, certification, or academic test scores.</li>
                  <li>Attaining measurable revenue, traffic, social engagement, or conversion metrics.</li>
                  <li>Producing bug-free, security-vetted software ready for deployment without human review.</li>
                </ul>
              </section>

              {/* Section 5 */}
              <section className="space-y-3">
                <h2 className="text-lg font-bold text-[var(--foreground)]">
                  5. Not a Substitute for Professional Advice
                </h2>
                <p>
                  Content on BeautifulAIPrompt.com and responses produced by AI models are for educational
                  and productivity purposes only. They do not constitute professional advice:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--foreground)]">
                      <Scale className="h-3.5 w-3.5 text-[var(--primary)]" />
                      <span>Legal Matters</span>
                    </div>
                    <p className="text-[11px] text-[var(--muted-foreground)]">
                      Not a substitute for formal advice from a qualified attorney or licensed legal counsel.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--foreground)]">
                      <DollarSign className="h-3.5 w-3.5 text-[var(--primary)]" />
                      <span>Financial & Tax</span>
                    </div>
                    <p className="text-[11px] text-[var(--muted-foreground)]">
                      Consult certified public accountants or financial advisors before financial commitments.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--foreground)]">
                      <Stethoscope className="h-3.5 w-3.5 text-[var(--primary)]" />
                      <span>Medical Health</span>
                    </div>
                    <p className="text-[11px] text-[var(--muted-foreground)]">
                      Never use AI prompts for clinical diagnosis or in place of healthcare practitioners.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 6 */}
              <section className="space-y-3 border-t border-[var(--border)] pt-8">
                <h2 className="text-lg font-bold text-[var(--foreground)]">
                  6. Independent Platform Statement
                </h2>
                <p className="text-xs">
                  BeautifulAIPrompt.com is an independent product and is not affiliated, endorsed, or
                  sponsored by Anthropic PBC, OpenAI Inc., Alphabet Inc. (Google), or Microsoft Corporation.
                  Any references to their trademarks are for nominative compatibility identification only.
                </p>
                <p className="text-xs">
                  Have questions about our disclaimer or testing methodology? Visit our{" "}
                  <Link href="/about" className="text-[var(--primary)] font-semibold hover:underline">
                    About page
                  </Link>{" "}
                  or send us a note on our{" "}
                  <Link href="/contact" className="text-[var(--primary)] font-semibold hover:underline">
                    Contact page
                  </Link>.
                </p>
              </section>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
