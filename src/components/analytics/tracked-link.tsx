"use client";

import React from "react";
import Link from "next/link";
import {
  trackCategoryClick,
  trackCollectionClick,
  trackGuideClick,
} from "@/lib/analytics";

export interface TrackedCategoryLinkProps
  extends React.ComponentPropsWithoutRef<typeof Link> {
  categorySlug: string;
  categoryName?: string;
  sourcePage?: string;
}

export function TrackedCategoryLink({
  categorySlug,
  categoryName,
  sourcePage,
  onClick,
  ...props
}: TrackedCategoryLinkProps) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        trackCategoryClick(categorySlug, categoryName, sourcePage);
        onClick?.(e);
      }}
    />
  );
}

export interface TrackedCollectionLinkProps
  extends React.ComponentPropsWithoutRef<typeof Link> {
  collectionSlug: string;
  collectionTitle?: string;
  sourcePage?: string;
}

export function TrackedCollectionLink({
  collectionSlug,
  collectionTitle,
  sourcePage,
  onClick,
  ...props
}: TrackedCollectionLinkProps) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        trackCollectionClick(collectionSlug, collectionTitle, sourcePage);
        onClick?.(e);
      }}
    />
  );
}

export interface TrackedGuideLinkProps
  extends React.ComponentPropsWithoutRef<typeof Link> {
  guideSlug: string;
  guideTitle?: string;
  sourcePage?: string;
}

export function TrackedGuideLink({
  guideSlug,
  guideTitle,
  sourcePage,
  onClick,
  ...props
}: TrackedGuideLinkProps) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        trackGuideClick(guideSlug, guideTitle, sourcePage);
        onClick?.(e);
      }}
    />
  );
}
