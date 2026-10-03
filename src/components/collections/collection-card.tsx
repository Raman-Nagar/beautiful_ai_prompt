import React from "react";
import { Collection } from "@/types/collection";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { TrackedCollectionLink } from "@/components/analytics/tracked-link";
import {
  Code2,
  Briefcase,
  FileText,
  MessageSquare,
  Atom,
  FileCode,
  Zap,
  TrendingUp,
  Target,
  Share2,
  Video,
  Feather,
  CheckSquare,
  Compass,
  Store,
  ShoppingBag,
  GraduationCap,
  Search,
  Mail,
  Headphones,
  Palette,
  Kanban,
  Layers,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Code2,
  Briefcase,
  FileText,
  MessageSquare,
  Atom,
  FileCode,
  Zap,
  TrendingUp,
  Target,
  Share2,
  Video,
  Feather,
  CheckSquare,
  Compass,
  Store,
  ShoppingBag,
  GraduationCap,
  Search,
  Mail,
  Headphones,
  Palette,
  Kanban,
};

export interface CollectionCardProps {
  collection: Collection;
  sourcePage?: string;
  className?: string;
  compact?: boolean;
}

export function CollectionCard({
  collection,
  sourcePage = "/collections",
  className = "",
  compact = false,
}: CollectionCardProps) {
  const IconComponent = (collection.icon && ICON_MAP[collection.icon]) || Layers;
  const promptCount = collection.promptIds.length;

  return (
    <TrackedCollectionLink
      collectionSlug={collection.slug}
      collectionTitle={collection.title}
      sourcePage={sourcePage}
      href={`/collections/${collection.slug}`}
      className={`group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 rounded-[var(--radius-xl)] ${className}`}
    >
      <Card
        hoverable
        className={`h-full flex flex-col justify-between p-6 card-lift cursor-pointer hover:bg-[var(--card-hover)] relative overflow-hidden transition-all duration-200 border-[var(--border)] group-hover:border-[var(--border-strong)] ${
          compact ? "p-5" : "p-6 sm:p-7"
        }`}
      >
        <div>
          {/* Header Row: Icon + Category + Prompt Count Badge */}
          <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-[var(--border-subtle)]">
            <div className="flex items-center gap-2 min-w-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] bg-[var(--primary-muted)] text-[var(--primary)] shrink-0 transition-transform group-hover:scale-105">
                <IconComponent className="h-4 w-4" />
              </div>
              <span className="text-xs font-semibold text-[var(--foreground)] truncate capitalize">
                {collection.categoryName || collection.category}
              </span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {collection.featured && !compact && (
                <Badge variant="warning" size="sm" className="hidden sm:inline-flex gap-1 text-[10px] py-0 px-2">
                  <Sparkles className="h-2.5 w-2.5" />
                  Featured
                </Badge>
              )}
              <Badge variant="outline" size="sm" className="font-mono text-[11px]">
                {promptCount} {promptCount === 1 ? "Prompt" : "Prompts"}
              </Badge>
            </div>
          </div>

          {/* Title */}
          <h3
            className={`font-bold tracking-tight text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors leading-snug ${
              compact ? "text-base" : "text-lg"
            }`}
          >
            {collection.title}
          </h3>

          {/* Short Description */}
          <p
            className={`leading-relaxed text-[var(--muted-foreground)] mt-2 line-clamp-2 ${
              compact ? "text-xs" : "text-xs sm:text-sm"
            }`}
          >
            {collection.shortDescription || collection.description}
          </p>

          {/* Target Audience Pill (Only in standard view) */}
          {!compact && collection.targetAudience && (
            <div className="mt-3.5 pt-3 border-t border-[var(--border-subtle)] text-[11px] text-[var(--subtle-foreground)] flex items-center gap-1.5">
              <span className="font-medium text-[var(--muted-foreground)] shrink-0">For:</span>
              <span className="truncate">{collection.targetAudience}</span>
            </div>
          )}

          {/* Tags */}
          {collection.tags && collection.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {collection.tags.slice(0, compact ? 2 : 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-[var(--radius-sm)] bg-[var(--secondary)] px-2 py-0.5 text-[10px] text-[var(--muted-foreground)] border border-[var(--border-subtle)]"
                >
                  #{tag}
                </span>
              ))}
              {collection.tags.length > (compact ? 2 : 3) && (
                <span className="text-[10px] text-[var(--muted-foreground)] self-center">
                  +{collection.tags.length - (compact ? 2 : 3)}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="mt-6 flex items-center justify-between border-t border-[var(--border-subtle)] pt-4 text-xs font-semibold text-[var(--primary)]">
          <span>Explore Collection</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </div>
      </Card>
    </TrackedCollectionLink>
  );
}
