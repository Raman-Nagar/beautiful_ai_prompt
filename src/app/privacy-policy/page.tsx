import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Card } from "@/components/ui/card";
import { constructMetadata } from "@/lib/seo";
import {
  ShieldCheck,
  Database,
  EyeOff,
  Cpu,
} from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Privacy Policy",
  description:
    "Privacy Policy for BeautifulAIPrompt.com. Transparent, local-first data practices, zero account requirements, and safe prompt customization.",
  path: "/privacy-policy",
  keywords: [
    "privacy policy beautiful ai prompt",
    "local first privacy",
    "ai prompt safety",
    "data protection",
  ],
});

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[var(--background)] min-h-screen pb-20">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy" },
        ]}
      />

      {/* Header */}
      <section className="py-12 sm:py-16 border-b border-[var(--border)]">
        <Container size="narrow">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Privacy & Trust</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--foreground)]">
              Privacy Policy
            </h1>

            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
              Effective Date: October 2026 • Last Reviewed: October 2026
            </p>

            <p className="text-sm text-[var(--foreground)]/90 leading-relaxed pt-2">
              At <strong>Beautiful AI Prompt</strong>, privacy is not an afterthought; it is built
              directly into our architectural foundation. We believe you should be able to explore,
              engineer, and copy AI prompts without giving up your identity, tracking your browsing
              habits, or transmitting confidential prompt text to remote servers.
            </p>
          </div>
        </Container>
      </section>

      {/* Policy Content */}
      <section className="py-12 sm:py-16">
        <Container size="narrow">
          <div className="space-y-12">
            {/* Highlights Card */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="p-5 space-y-2 bg-[var(--card)] border-[var(--border)]">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--secondary)] text-[var(--primary)]">
                  <EyeOff className="h-4 w-4" />
                </div>
                <h3 className="text-xs font-bold text-[var(--foreground)] uppercase tracking-wider">
                  No Accounts
                </h3>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  No passwords, profile data, or email signups required to use the platform.
                </p>
              </Card>

              <Card className="p-5 space-y-2 bg-[var(--card)] border-[var(--border)]">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--secondary)] text-[var(--primary)]">
                  <Cpu className="h-4 w-4" />
                </div>
                <h3 className="text-xs font-bold text-[var(--foreground)] uppercase tracking-wider">
                  Local Customization
                </h3>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  Interactive prompt variables are rendered locally in your browser&apos;s runtime.
                </p>
              </Card>

              <Card className="p-5 space-y-2 bg-[var(--card)] border-[var(--border)]">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--secondary)] text-[var(--primary)]">
                  <Database className="h-4 w-4" />
                </div>
                <h3 className="text-xs font-bold text-[var(--foreground)] uppercase tracking-wider">
                  Your Device Only
                </h3>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  Bookmarked prompts and search history stay in your browser localStorage.
                </p>
              </Card>
            </div>

            {/* Structured Sections */}
            <div className="space-y-10 text-sm leading-relaxed text-[var(--muted-foreground)]">
              {/* Section 1 */}
              <section className="space-y-3">
                <h2 className="text-lg font-bold text-[var(--foreground)]">
                  1. Information We Do Not Collect
                </h2>
                <p>
                  To preserve the highest degree of privacy, Beautiful AI Prompt intentionally avoids
                  collecting sensitive personal identifiers:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-[var(--foreground)]/80">
                  <li>We do not collect names, phone numbers, or physical addresses.</li>
                  <li>We do not handle payment cards, financial data, or billing information.</li>
                  <li>We do not require user accounts, authentication tokens, or social logins.</li>
                  <li>
                    <strong>We never capture or store the private text, context, or code you input
                    into our interactive prompt customization fields.</strong>
                  </li>
                </ul>
              </section>

              {/* Section 2 */}
              <section className="space-y-3">
                <h2 className="text-lg font-bold text-[var(--foreground)]">
                  2. Local Browser Storage (<code className="font-mono text-xs text-[var(--foreground)]">localStorage</code>)
                </h2>
                <p>
                  To provide a seamless productivity experience without maintaining user accounts, we utilize
                  your browser&apos;s built-in <code className="font-mono text-xs bg-[var(--secondary)] px-1.5 py-0.5 rounded">localStorage</code>:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-[var(--foreground)]/80">
                  <li><strong>Saved Prompts</strong>: IDs of prompts you bookmark for quick reference.</li>
                  <li><strong>Recent Searches</strong>: Your recent keyword queries in the search interface.</li>
                  <li><strong>Theme Preferences</strong>: Your selected light or dark mode setting.</li>
                </ul>
                <p className="text-xs pt-1">
                  This data resides exclusively on your local device. It is never transmitted across the network,
                  shared with third parties, or synchronized to external databases. You can clear this data at
                  any moment by clearing your browser cookies and site storage.
                </p>
              </section>

              {/* Section 3 */}
              <section className="space-y-3">
                <h2 className="text-lg font-bold text-[var(--foreground)]">
                  3. In-Browser Prompt Engine & Variable Replacement
                </h2>
                <p>
                  Our Interactive Prompt Customizer allows you to fill variables such as <code className="font-mono text-xs bg-[var(--secondary)] px-1.5 py-0.5 rounded">[JOB_TITLE]</code> or <code className="font-mono text-xs bg-[var(--secondary)] px-1.5 py-0.5 rounded">[CONTEXT]</code>.
                  This substitution logic is executed entirely client-side using JavaScript.
                </p>
                <p className="text-xs">
                  Whether you are testing prompts with proprietary code snippets, private resume details,
                  or confidential business briefs, that content never leaves your browser tab.
                </p>
              </section>

              {/* Section 4 */}
              <section className="space-y-3">
                <h2 className="text-lg font-bold text-[var(--foreground)]">
                  4. Telemetry & Analytics Practices
                </h2>
                <p>
                  To understand aggregate product trends and improve prompt relevance, we may collect
                  anonymous, privacy-conscious event metrics:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-[var(--foreground)]/80">
                  <li>Page visits and high-level route changes.</li>
                  <li>Prompt copy actions (recording the prompt category and template identifier).</li>
                  <li>Search queries (scrubbed of email addresses or continuous digit sequences).</li>
                  <li>Category and collection click interactions.</li>
                </ul>
                <p className="text-xs pt-1">
                  We enforce automated PII redaction filters before event processing. We do not use cross-site
                  behavioral advertising pixels, fingerprinting techniques, or data broker networks.
                </p>
              </section>

              {/* Section 5 */}
              <section className="space-y-3">
                <h2 className="text-lg font-bold text-[var(--foreground)]">
                  5. External AI Models & Third-Party Platforms
                </h2>
                <p>
                  Beautiful AI Prompt provides convenience shortcuts to launch your copied prompts in
                  frontier AI applications, such as OpenAI ChatGPT, Anthropic Claude, and Google Gemini.
                </p>
                <p className="text-xs">
                  When you navigate to an external AI platform, your interaction is governed solely by that
                  service&apos;s independent Terms of Service and Privacy Policy. Beautiful AI Prompt has no
                  control over how external AI vendors store, train on, or process model queries.
                </p>
              </section>

              {/* Section 6 */}
              <section className="space-y-3">
                <h2 className="text-lg font-bold text-[var(--foreground)]">
                  6. Data Security
                </h2>
                <p>
                  All network communication between your browser and BeautifulAIPrompt.com is secured
                  using modern Transport Layer Security (TLS/HTTPS). Because we intentionally minimize data
                  collection, the risk of credential theft, data breaches, or identity exposure on our
                  platform is inherently mitigated.
                </p>
              </section>

              {/* Section 7 */}
              <section className="space-y-3">
                <h2 className="text-lg font-bold text-[var(--foreground)]">
                  7. Changes to This Privacy Policy
                </h2>
                <p>
                  We may periodically update this Privacy Policy to reflect technical enhancements or
                  refinements in our features. When adjustments are made, the revised policy will be posted
                  here with an updated revision date.
                </p>
              </section>

              {/* Section 8 */}
              <section className="space-y-3 border-t border-[var(--border)] pt-8">
                <h2 className="text-lg font-bold text-[var(--foreground)]">
                  8. Questions & Contact
                </h2>
                <p>
                  If you have questions regarding our privacy architecture or data practices, please reach
                  out through our{" "}
                  <Link href="/contact" className="text-[var(--primary)] hover:underline font-semibold">
                    Contact & Feedback form
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
