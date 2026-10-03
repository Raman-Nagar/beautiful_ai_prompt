import React from "react";

/**
 * Highlights terms matching the search query within a text string.
 */
export function HighlightMatches({
  text,
  query,
  className,
  highlightClassName = "bg-[var(--primary-muted)] text-[var(--primary)] font-semibold rounded-xs px-0.5",
}: {
  text: string;
  query: string;
  className?: string;
  highlightClassName?: string;
}): React.ReactElement {
  if (!text) return <span className={className}></span>;
  if (!query || !query.trim()) return <span className={className}>{text}</span>;

  // Split query into individual alphanumeric words to highlight
  const tokens = query
    .trim()
    .split(/\s+/)
    .filter((t) => t.length > 0)
    .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

  if (tokens.length === 0) {
    return <span className={className}>{text}</span>;
  }

  const regex = new RegExp(`(${tokens.join("|")})`, "gi");
  const parts = text.split(regex);

  return (
    <span className={className}>
      {parts.map((part, i) => {
        const isMatch = regex.test(part);
        // Reset lastIndex for next iteration since regex has 'g' flag
        regex.lastIndex = 0;

        return isMatch ? (
          <mark key={i} className={highlightClassName}>
            {part}
          </mark>
        ) : (
          part
        );
      })}
    </span>
  );
}
