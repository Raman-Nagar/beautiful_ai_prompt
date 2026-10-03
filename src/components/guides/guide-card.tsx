import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Guide } from "@/types/guide";
import { Clock, Calendar, ArrowRight, Sparkles } from "lucide-react";
import { TrackedGuideLink } from "@/components/analytics/tracked-link";

interface GuideCardProps {
  guide: Guide;
  sourcePage?: string;
  featured?: boolean;
}

export function GuideCard({ guide, sourcePage = "/guides", featured = false }: GuideCardProps) {
  const displayDate = guide.updatedAt || guide.publishedAt;
  const formattedDate = new Date(displayDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <TrackedGuideLink
      guideSlug={guide.slug}
      guideTitle={guide.title}
      sourcePage={sourcePage}
      href={`/guides/${guide.slug}`}
      className="group block focus:outline-none h-full"
    >
      <Card
        hoverable
        className={`h-full flex flex-col justify-between p-6 transition-all duration-200 border-[var(--border)] hover:border-[var(--border-strong)] ${
          featured
            ? "bg-gradient-to-br from-[var(--card)] via-[var(--card)] to-[var(--secondary)]/40 shadow-sm"
            : "hover:bg-[var(--card-hover)]"
        }`}
      >
        <div>
          {/* Card Top Metadata */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--border-subtle)] text-xs">
            <div className="flex items-center gap-1.5 flex-wrap">
              <Badge variant={featured ? "warning" : "secondary"} size="sm" className="font-medium">
                {featured && <Sparkles className="h-3 w-3 mr-1 inline" />}
                {guide.category}
              </Badge>
              {guide.tags && guide.tags[0] && (
                <span className="hidden sm:inline-block text-[11px] text-[var(--muted-foreground)] font-mono">
                  #{guide.tags[0].replace(/\s+/g, "").toLowerCase()}
                </span>
              )}
            </div>
            <span className="flex items-center gap-1 text-[11px] text-[var(--muted-foreground)] font-mono shrink-0 ml-2">
              <Clock className="h-3 w-3" />
              {guide.readingTime}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold tracking-tight text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors leading-snug">
            {guide.title}
          </h3>

          {/* Excerpt */}
          <p className="text-xs sm:text-sm leading-relaxed text-[var(--muted-foreground)] mt-2.5 line-clamp-3">
            {guide.excerpt || guide.description}
          </p>
        </div>

        {/* Card Footer */}
        <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
          <span className="flex items-center gap-1 text-[11px] text-[var(--muted-foreground)]">
            <Calendar className="h-3 w-3" />
            <span>{formattedDate}</span>
          </span>
          <span className="inline-flex items-center gap-1 font-semibold text-[var(--primary)] group-hover:underline">
            <span>Read Guide</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Card>
    </TrackedGuideLink>
  );
}
