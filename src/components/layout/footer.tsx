import React from "react";
import Link from "next/link";
import { Container } from "./container";
import { Sparkles } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const productLinks = [
    { label: "Prompts Directory", href: "/prompts" },
    { label: "AI Models & Guides", href: "/models" },
    { label: "Composition Ruler", href: "/tools/composition-ruler" },
    { label: "Browse Categories", href: "/categories" },
    { label: "Curated Collections", href: "/collections" },
    { label: "Engineering Guides", href: "/guides" },
  ];

  const categoryLinks = [
    { label: "Coding & Engineering", href: "/categories/coding" },
    { label: "Career & Interviews", href: "/categories/career" },
    { label: "Marketing & Growth", href: "/categories/marketing" },
    { label: "Business & Strategy", href: "/categories/business" },
  ];

  const resourceLinks = [
    { label: "Midjourney vs FLUX Benchmark", href: "/compare/midjourney-vs-flux" },
    { label: "Midjourney Parameters", href: "/models/midjourney" },
    { label: "FLUX.1 Prompt Guide", href: "/models/flux" },
    { label: "Claude 3.7 Framework", href: "/models/claude" },
    { label: "ChatGPT-4o Prompts", href: "/models/chatgpt" },
    { label: "SDXL Cheat Sheet", href: "/models/stable-diffusion" },
  ];

  const companyLinks = [
    { label: "About Beautiful AI Prompt", href: "/about" },
    { label: "Contact & Feedback", href: "/contact" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Disclaimer", href: "/disclaimer" },
  ];

  return (
    <footer
      aria-label="Site Footer"
      className="border-t border-[var(--border)] bg-[var(--background)] pt-16 pb-10"
    >
      <Container>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {/* ── Brand Column ── */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-2 space-y-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 group"
              aria-label="Beautiful AI Prompt Home"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-gradient-to-br from-indigo-500/20 via-violet-500/10 to-[var(--card)] text-[var(--primary)] shadow-sm transition-transform duration-200 group-hover:scale-105">
                <Sparkles className="h-3.5 w-3.5 text-[var(--primary)]" />
              </div>
              <span className="text-[13px] font-semibold tracking-tight text-[var(--foreground)]">
                Beautiful AI Prompt
              </span>
            </Link>

            <p className="max-w-xs text-xs leading-relaxed text-[var(--muted-foreground)]">
              Curated, tested, and practical AI prompts engineered for real-world
              engineering, business, creative, and productivity workflows.
            </p>

            {/* Status indicator */}
            <div className="flex items-center gap-2">
              <span className="flex h-1.5 w-1.5 rounded-full bg-[var(--status-success)] animate-pulse" />
              <span className="text-[11px] text-[var(--muted-foreground)]">
                All systems operational
              </span>
            </div>

            {/* Community & Contributions */}
            <div className="pt-1 space-y-1.5">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--subtle-foreground)]">
                Community &amp; Contributions
              </p>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                Have a proven prompt or suggestion?{" "}
                <Link
                  href="/contact"
                  className="font-medium text-[var(--primary)] hover:underline inline-flex items-center gap-0.5"
                >
                  Submit a prompt &rarr;
                </Link>
              </p>
            </div>
          </div>

          {/* ── Product Links ── */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-semibold uppercase tracking-widest text-[var(--foreground)]">
              Product
            </h3>
            <ul className="space-y-2.5">
              {productLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Categories ── */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-semibold uppercase tracking-widest text-[var(--foreground)]">
              Categories
            </h3>
            <ul className="space-y-2.5">
              {categoryLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Resources + Company + Legal ── */}
          <div className="space-y-5">
            <div className="space-y-3">
              <h3 className="text-[10px] font-semibold uppercase tracking-widest text-[var(--foreground)]">
                Resources
              </h3>
              <ul className="space-y-2.5">
                {resourceLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[10px] font-semibold uppercase tracking-widest text-[var(--foreground)]">
                Company
              </h3>
              <ul className="space-y-2.5">
                {companyLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-[10px] font-semibold uppercase tracking-widest text-[var(--foreground)]">
              Legal
            </h3>
            <ul className="space-y-2.5">
              {legalLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-[var(--border-subtle)] pt-7 text-[11px] text-[var(--subtle-foreground)] sm:flex-row">
          <p className="order-2 sm:order-1">
            © {currentYear} BeautifulAIPrompt.com. All rights reserved.
          </p>
          <div className="order-1 sm:order-2 flex items-center gap-4">
            {legalLinks.map((l, i) => (
              <React.Fragment key={l.href}>
                {i > 0 && (
                  <span className="text-[var(--border-strong)] select-none">·</span>
                )}
                <Link
                  href={l.href}
                  className="hover:text-[var(--muted-foreground)] transition-colors"
                >
                  {l.label}
                </Link>
              </React.Fragment>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
