import { NextRequest, NextResponse } from "next/server";
import { getPaginatedPrompts } from "@/lib/data/prompts";
import { AIModelId, PromptDifficulty, PromptSortOption } from "@/types/prompt";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "16", 10);
    const search = searchParams.get("search") || undefined;
    const category = searchParams.get("category") || undefined;
    const model = (searchParams.get("model") as AIModelId) || undefined;
    const difficulty = (searchParams.get("difficulty") as PromptDifficulty) || undefined;
    const useCase = searchParams.get("useCase") || undefined;
    const tag = searchParams.get("tag") || undefined;
    const sort = (searchParams.get("sort") as PromptSortOption) || undefined;
    const engine = (searchParams.get("engine") as "all" | "visual" | "text") || undefined;
    const aspectRatio = searchParams.get("aspect") || searchParams.get("aspectRatio") || undefined;
    const complexity = searchParams.get("complexity") || undefined;

    const result = getPaginatedPrompts({
      page,
      limit,
      search,
      category,
      model,
      difficulty,
      useCase,
      tag,
      sort,
      engine,
      aspectRatio,
      complexity,
    });

    return NextResponse.json(result, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error in /api/prompts:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch paginated prompts",
        prompts: [],
        total: 0,
        page: 1,
        limit: 16,
        totalPages: 0,
        hasMore: false,
      },
      { status: 500 }
    );
  }
}
