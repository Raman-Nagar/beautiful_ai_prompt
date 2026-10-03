# Beautiful AI Prompt

> The premium AI prompt discovery and productivity platform. Curated, battle-tested, and practical prompt engineering templates for software developers, marketers, creators, job seekers, and business operators.

---

## Overview

**Beautiful AI Prompt** is a local-first, privacy-respecting, high-performance static web application built with modern Next.js App Router and TypeScript. It provides 225+ rigorous prompts with interactive variable customization, zero runtime tracking, and seamless copy-to-clipboard workflows.

### Core Stack
- **Framework:** [Next.js 16.3.8](https://nextjs.org) (App Router, Turbopack)
- **UI Library:** [React 19.2.8](https://react.dev)
- **Type Safety:** [TypeScript 5](https://www.typescriptlang.org)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com) with CSS custom properties design tokens
- **Icons:** [Lucide React](https://lucide.dev)
- **Deployment Target:** [Vercel](https://vercel.com) (Static Site Generation / SSG)

---

## Catalog Architecture

- **Prompts:** 225 production-grade prompts spanning Coding, Career, Marketing, Business, Design, Writing, and Education.
- **Categories:** 26 specialized domain taxonomy routes with bidirectional cross-linking.
- **Collections:** 22 curated workflow suites grouping complementary prompts into end-to-end playbooks.
- **Guides:** 12 in-depth prompt engineering guides covering system prompt architecture, few-shot prompting, and hallucination reduction.
- **Pages:** 300 statically pre-rendered HTML routes generated at build time.

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### 3. Production Quality & Validation Suite
```bash
# Validate prompt schemas, variable brackets, cross-refs, and uniqueness
npm run validate:content

# Validate metadata, canonical URLs, sitemap, and internal link graph
npm run validate:seo

# Lint codebase
npm run lint

# Build static production bundle
npm run build
```

---

## Environment Variables

All environment variables are optional. When unset, the application automatically uses production fallbacks:

| Variable | Scope | Description | Default |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Public | Canonical production domain URL | `https://beautifulaiprompt.com` |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Public | Google Search Console site verification code | *None* |
| `NEXT_PUBLIC_ANALYTICS_DEBUG` | Public | Enables verbose console logging for analytics events | `false` |
| `NEXT_PUBLIC_ANALYTICS_ENDPOINT` | Public | Optional custom Beacon endpoint for privacy event logging | *None* |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | Public | Optional Google AdSense publisher ID (e.g. `ca-pub-xxx`) | *None (Dormant)* |

> **Security Note:** Secrets must never be prefixed with `NEXT_PUBLIC_`. Beautiful AI Prompt is architecturally serverless and static in Phase 1.

---

## Deployment to Vercel

1. Push repository to GitHub or GitLab.
2. Import repository in [Vercel](https://vercel.com/new).
3. Framework Preset: **Next.js**
4. Build Command: `npm run build`
5. Output Directory: `.next` (default)
6. Add custom domain: `beautifulaiprompt.com` with automated SSL/TLS certificate.

---

## License & Intellectual Property

Prompts published on Beautiful AI Prompt are free to copy, modify, and integrate into personal and commercial projects. See [Terms of Service](https://beautifulaiprompt.com/terms) and [Privacy Policy](https://beautifulaiprompt.com/privacy-policy) for details.
