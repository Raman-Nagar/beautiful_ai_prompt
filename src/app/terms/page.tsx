import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Card } from "@/components/ui/card";
import { constructMetadata } from "@/lib/seo";
import {
  CheckCircle2,
  Scale,
} from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Terms of Service — Beautiful AI Prompt",
  description:
    "Terms of Service for BeautifulAIPrompt.com. Permitted use, prompt rights, intellectual property guidelines, and conditions of service.",
  path: "/terms",
  keywords: [
    "terms of service beautiful ai prompt",
    "prompt usage rights",
    "commercial use prompts",
    "terms and conditions",
  ],
});

export default function TermsPage() {
  return (
    <div className="bg-[var(--background)] min-h-screen pb-20">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Terms of Service" },
        ]}
      />

      {/* Header */}
      <section className="py-12 sm:py-16 border-b border-[var(--border)]">
        <Container size="narrow">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-semibold">
              <Scale className="h-3.5 w-3.5" />
              <span>Legal Terms</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--foreground)]">
              Terms of Service
            </h1>

            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
              Effective Date: October 2026 • Last Reviewed: October 2026
            </p>

            <p className="text-sm text-[var(--foreground)]/90 leading-relaxed pt-2">
              Welcome to <strong>Beautiful AI Prompt</strong>. These Terms of Service govern your
              access to and use of our website, prompt catalog, customization tools, and educational
              guides. By browsing, copying, or interacting with our content, you agree to these terms.
            </p>
          </div>
        </Container>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16">
        <Container size="narrow">
          <div className="space-y-12">
            {/* Quick Summary Card */}
            <Card className="p-6 bg-[var(--card)] border-[var(--border)] space-y-3">
              <h3 className="text-sm font-bold text-[var(--foreground)] flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>Plain-Language Summary</span>
              </h3>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                You are free to copy, adapt, modify, and use all prompt templates on Beautiful AI Prompt
                for both your personal and commercial workflows. We do not charge subscription fees for
                browsing or copying prompts, and we do not claim ownership over the work you create using
                these prompts.
              </p>
            </Card>

            <div className="space-y-10 text-sm leading-relaxed text-[var(--muted-foreground)]">
              {/* Section 1 */}
              <section className="space-y-3">
                <h2 className="text-lg font-bold text-[var(--foreground)]">
                  1. Acceptance of Terms
                </h2>
                <p>
                  By visiting, accessing, or using BeautifulAIPrompt.com (&quot;the Service&quot;),
                  you acknowledge that you have read, understood, and agreed to be bound by these
                  Terms of Service. If you do not agree to these terms, you should discontinue use of
                  the site.
                </p>
              </section>

              {/* Section 2 */}
              <section className="space-y-3">
                <h2 className="text-lg font-bold text-[var(--foreground)]">
                  2. Description of the Service
                </h2>
                <p>
                  Beautiful AI Prompt is an open, curated repository and discovery platform providing
                  structured prompt engineering blueprints, educational guides, and browser-based
                  customization tools designed to assist users in interacting with foundational AI
                  models.
                </p>
              </section>

              {/* Section 3 */}
              <section className="space-y-3">
                <h2 className="text-lg font-bold text-[var(--foreground)]">
                  3. Permitted Use & Commercial Rights
                </h2>
                <p>
                  We believe in empowering builders, creators, and knowledge workers. Under these Terms:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-[var(--foreground)]/80">
                  <li>
                    <strong>Commercial & Personal Use</strong>: You may freely copy, customize, integrate,
                    and run our prompt instructions in your personal, educational, organizational, and
                    commercial projects without paying royalties.
                  </li>
                  <li>
                    <strong>Generated Output Ownership</strong>: Beautiful AI Prompt claims no ownership,
                    copyright, or intellectual property rights over any outputs generated by AI models
                    when utilizing prompts from our catalog.
                  </li>
                  <li>
                    <strong>Catalog Protection</strong>: You may not scrape, clone, mirror, or bulk-export
                    the entire BeautifulAIPrompt.com catalog or codebase to build a competing prompt directory
                    or commercial database without prior authorization.
                  </li>
                </ul>
              </section>

              {/* Section 4 */}
              <section className="space-y-3">
                <h2 className="text-lg font-bold text-[var(--foreground)]">
                  4. Acceptable Conduct & Prohibited Activities
                </h2>
                <p>When using Beautiful AI Prompt, you agree not to:</p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-[var(--foreground)]/80">
                  <li>Attempt to compromise, disrupt, or overwhelm the website through automated denial-of-service attempts.</li>
                  <li>Submit abusive, defamatory, or unlawful materials through our contact or feedback mechanisms.</li>
                  <li>Impersonate any individual, brand, or entity in community communications.</li>
                  <li>Circumvent or tamper with technical security or availability measures.</li>
                </ul>
              </section>

              {/* Section 5 */}
              <section className="space-y-3">
                <h2 className="text-lg font-bold text-[var(--foreground)]">
                  5. Nominative Fair Use of Third-Party Trademarks
                </h2>
                <p>
                  References across BeautifulAIPrompt.com to third-party artificial intelligence models and
                  companies (including, but not limited to, Anthropic PBC and Claude, OpenAI LLC and ChatGPT,
                  Alphabet Inc. / Google LLC and Gemini, and Microsoft Corporation and Copilot) are made
                  strictly for descriptive, nominative, and compatibility identification purposes.
                </p>
                <p className="text-xs">
                  All trademarks, service marks, and trade names are the property of their respective owners.
                  Beautiful AI Prompt is an independent platform and has no direct affiliation, sponsorship,
                  or endorsement with these trademark holders.
                </p>
              </section>

              {/* Section 6 */}
              <section className="space-y-3">
                <h2 className="text-lg font-bold text-[var(--foreground)]">
                  6. Disclaimer of Warranties
                </h2>
                <p>
                  Beautiful AI Prompt is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis.
                  While our prompts are engineered to maximize consistency, instruction-following fidelity,
                  and reasoning depth, we do not warrant that prompt execution on external AI systems will
                  always be error-free, uninterrupted, or fully suitable for any specific critical, legal,
                  financial, or medical purpose.
                </p>
                <p className="text-xs">
                  Please review our dedicated{" "}
                  <Link href="/disclaimer" className="text-[var(--primary)] font-semibold hover:underline">
                    Disclaimer
                  </Link>{" "}
                  for comprehensive guidelines regarding AI model stochasticity and output verification.
                </p>
              </section>

              {/* Section 7 */}
              <section className="space-y-3">
                <h2 className="text-lg font-bold text-[var(--foreground)]">
                  7. Limitation of Liability
                </h2>
                <p>
                  To the maximum extent permitted by applicable law, Beautiful AI Prompt, its operators,
                  contributors, and affiliates shall not be liable for any direct, indirect, incidental,
                  consequential, or exemplary damages arising from your access to, use of, or inability to
                  use the platform or any outputs generated from prompts discovered here.
                </p>
              </section>

              {/* Section 8 */}
              <section className="space-y-3">
                <h2 className="text-lg font-bold text-[var(--foreground)]">
                  8. Modifications to the Service & Terms
                </h2>
                <p>
                  We reserve the right to modify, update, or refine these Terms of Service at any time.
                  Continued use of BeautifulAIPrompt.com following any posted modifications constitutes
                  acceptance of the revised terms.
                </p>
              </section>

              {/* Section 9 */}
              <section className="space-y-3 border-t border-[var(--border)] pt-8">
                <h2 className="text-lg font-bold text-[var(--foreground)]">
                  9. Contact & Inquiries
                </h2>
                <p>
                  If you have questions regarding these Terms of Service, please reach out via our{" "}
                  <Link href="/contact" className="text-[var(--primary)] font-semibold hover:underline">
                    Contact & Feedback page
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
