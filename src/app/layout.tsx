import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { ToastProvider } from "@/components/ui/toast";
import { SearchProvider } from "@/components/search/search-context";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageViewTracker } from "@/components/analytics/page-view-tracker";
import { MicrosoftClarity } from "@/components/analytics/clarity";
import { GoogleTagManager, GoogleTagManagerNoscript } from "@/components/analytics/gtm";
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  TWITTER_HANDLE,
  generateWebSiteJsonLd,
  generateOrganizationJsonLd,
} from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#090d16" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "AI prompts",
    "ChatGPT prompts",
    "Claude prompts",
    "Gemini prompts",
    "prompt engineering",
    "developer prompts",
    "productivity",
    "prompt templates",
  ],
  authors: [{ name: `${SITE_NAME} Team` }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  verification:
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || process.env.GOOGLE_SITE_VERIFICATION
      ? {
        google:
          process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
          process.env.GOOGLE_SITE_VERIFICATION,
      }
      : undefined,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: DEFAULT_TITLE,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    creator: TWITTER_HANDLE,
    site: TWITTER_HANDLE,
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const websiteJsonLd = generateWebSiteJsonLd();
  const organizationJsonLd = generateOrganizationJsonLd();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--primary-muted)] selection:text-[var(--primary)]">
        <GoogleTagManagerNoscript />
        {/* Accessible skip link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--primary)] focus:text-[var(--primary-foreground)] focus:rounded-[var(--radius-md)] focus:shadow-lg"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <ToastProvider>
            <SearchProvider>
              <PageViewTracker />
              <MicrosoftClarity />
              <GoogleTagManager />
              <Navbar />
              <main id="main-content" className="flex-1">
                {children}
              </main>
              <Footer />
            </SearchProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
