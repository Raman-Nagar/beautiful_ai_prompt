import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Card } from "@/components/ui/card";
import { ContactForm } from "@/components/contact/contact-form";
import { constructMetadata } from "@/lib/seo";
import {
  MessageSquare,
  HelpCircle,
  Lightbulb,
  Clock,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Contact & Community Feedback",
  description:
    "Get in touch with the Beautiful AI Prompt team. Submit prompts, suggest categories, report issues, or contribute feedback.",
  path: "/contact",
  keywords: [
    "contact beautiful ai prompt",
    "submit ai prompt",
    "ai prompt suggestions",
    "community feedback",
  ],
});

const FAQS = [
  {
    q: "How can I submit a high-performing prompt?",
    a: "Use the contact form on this page with the 'Suggest a New Prompt' topic. Include the prompt instructions, applicable model, and a brief description of what makes it effective.",
  },
  {
    q: "Are submissions reviewed prior to publication?",
    a: "Yes. Every submitted prompt is tested across multiple models (Claude, ChatGPT, Gemini) to verify safety, adherence to instructions, and lack of generic filler before being added to the directory.",
  },
  {
    q: "Can I suggest an entirely new category or collection?",
    a: "Absolutely. If you work in a specialized field (e.g. Bio-informatics, Legal Tech, DevOps) and have established workflows, let us know!",
  },
  {
    q: "Are the prompts free for commercial and personal work?",
    a: "Yes. All prompts published on Beautiful AI Prompt are free to use, adapt, and deploy within your personal, team, and commercial projects.",
  },
];

export default function ContactPage() {
  return (
    <div className="bg-[var(--background)] min-h-screen pb-20">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
      />

      {/* Header */}
      <section className="py-12 sm:py-16 border-b border-[var(--border)]">
        <Container size="default">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-semibold">
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Get in Touch</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--foreground)]">
              Contact & Feedback
            </h1>

            <p className="text-base text-[var(--muted-foreground)] leading-relaxed">
              We welcome prompt submissions, suggestions for new categories, bug reports, and ideas
              for elevating the library. Reach out directly through the feedback form below.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Content Grid */}
      <section className="py-12 sm:py-16">
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Form Column */}
            <div className="lg:col-span-7 space-y-6">
              <Card className="p-6 sm:p-8 bg-[var(--card)] border-[var(--border)] shadow-[var(--shadow-sm)]">
                <div className="space-y-1 mb-6">
                  <h2 className="text-lg font-bold text-[var(--foreground)]">
                    Send a Message or Prompt Submission
                  </h2>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    Fill out the form below. All feedback is reviewed to keep prompts accurate and valuable.
                  </p>
                </div>
                <ContactForm />
              </Card>

              {/* Prompt Submission Quality Guidelines */}
              <div className="p-6 rounded-xl bg-[var(--surface)] border border-[var(--border)] space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[var(--foreground)]">
                  <Lightbulb className="h-4 w-4 text-[var(--primary)]" />
                  <span>Prompt Submission Criteria</span>
                </div>
                <ul className="space-y-2 text-xs text-[var(--muted-foreground)] leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--primary)]">•</span>
                    <span><strong>Specific Persona</strong>: Clear role constraints and seniority level.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--primary)]">•</span>
                    <span><strong>Interactive Variables</strong>: Use brackets like [CONTEXT] or [ROLE] where users customize.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--primary)]">•</span>
                    <span><strong>Tested Efficacy</strong>: Tested on at least one frontier model with proven real-world utility.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-5 space-y-6">
              {/* Contact Method Placeholder Card */}
              <Card className="p-6 space-y-4 bg-[var(--card)] border-[var(--border)]">
                <h3 className="text-sm font-bold text-[var(--foreground)] uppercase tracking-wider">
                  Editorial &amp; Review Channels
                </h3>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  Direct communication is handled through our interactive web form. For open-source
                  contributions, editorial issues, or partnership proposals, communication channels
                  are monitored continuously during regular review cycles.
                </p>

                <div className="pt-2 space-y-3 border-t border-[var(--border)]">
                  <div className="flex items-center gap-3 text-xs text-[var(--muted-foreground)]">
                    <Clock className="h-4 w-4 text-[var(--primary)] shrink-0" />
                    <span>Average review response: 24–48 hours</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[var(--muted-foreground)]">
                    <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>Privacy preserved: Zero email reselling or spam</span>
                  </div>
                </div>
              </Card>

              {/* Quick FAQ Card */}
              <Card className="p-6 space-y-4 bg-[var(--card)] border-[var(--border)]">
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-[var(--primary)]" />
                  <h3 className="text-sm font-bold text-[var(--foreground)]">
                    Frequently Asked Questions
                  </h3>
                </div>

                <div className="space-y-4">
                  {FAQS.map((faq, i) => (
                    <div key={i} className="space-y-1">
                      <h4 className="text-xs font-semibold text-[var(--foreground)]">
                        {faq.q}
                      </h4>
                      <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
