import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const title = searchParams.get("title") || "Beautiful AI Prompt";
    const type = searchParams.get("type") || "Prompt Engineering";
    const category = searchParams.get("category") || "Productivity Platform";
    const meta = searchParams.get("meta") || "Verified • 225+ Prompts • Production Ready";

    // Truncate title if extremely long
    const displayTitle =
      title.length > 80 ? title.substring(0, 77) + "..." : title;

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            backgroundColor: "#090d16",
            backgroundImage:
              "radial-gradient(circle at 25% 20%, rgba(99, 102, 241, 0.25) 0%, rgba(9, 13, 22, 0) 65%), radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.18) 0%, rgba(9, 13, 22, 0) 60%)",
            padding: "55px 70px",
            fontFamily: "sans-serif",
            border: "1px solid #1e293b",
          }}
        >
          {/* Top Row: Brand & Type Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  backgroundColor: "#1e1b4b",
                  border: "1.5px solid #4f46e5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#818cf8",
                  fontSize: "24px",
                  marginRight: "16px",
                }}
              >
                ✦
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontSize: "22px",
                    fontWeight: "bold",
                    color: "#f8fafc",
                    letterSpacing: "-0.5px",
                  }}
                >
                  Beautiful AI Prompt
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#818cf8",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                  }}
                >
                  {type}
                </span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#111827",
                border: "1px solid #374151",
                borderRadius: "20px",
                padding: "8px 18px",
                color: "#9ca3af",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              beautifulaiprompt.com
            </div>
          </div>

          {/* Middle: Title & Category Pill */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "1050px",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            {category && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "14px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "rgba(99, 102, 241, 0.15)",
                    border: "1px solid rgba(99, 102, 241, 0.4)",
                    color: "#c7d2fe",
                    borderRadius: "8px",
                    padding: "6px 14px",
                    fontSize: "15px",
                    fontWeight: 600,
                  }}
                >
                  {category}
                </div>
              </div>
            )}

            <div
              style={{
                fontSize: displayTitle.length > 55 ? "44px" : "54px",
                fontWeight: 800,
                color: "#ffffff",
                lineHeight: 1.18,
                letterSpacing: "-1.5px",
              }}
            >
              {displayTitle}
            </div>
          </div>

          {/* Bottom Bar: Meta highlights */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              paddingTop: "24px",
              borderTop: "1px solid #1e293b",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: "#94a3b8",
                fontSize: "16px",
                fontWeight: 500,
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "#10b981",
                  marginRight: "10px",
                }}
              />
              {meta}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                color: "#64748b",
                fontSize: "14px",
              }}
            >
              <span>Claude</span>
              <span>•</span>
              <span>ChatGPT</span>
              <span>•</span>
              <span>Gemini</span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch {
    // If dynamic image generation encounters an edge issue, redirect to static fallback
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/og-image.png",
      },
    });
  }
}
