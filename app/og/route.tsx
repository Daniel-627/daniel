import { ImageResponse } from "next/og";

const FALLBACK = "Designer & Developer";

export function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") || FALLBACK).slice(0, 80);
  const big = title.length > 38 ? 64 : 84;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0b0b0f",
          color: "#eeeeee",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 9,
              background: "linear-gradient(135deg, #2f8fff, #7c3aed)",
            }}
          />
          <div style={{ fontSize: 30, color: "#8a8a90" }}>daniel.co.ke</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: big,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
              display: "flex",
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 30, color: "#8a8a90", display: "flex" }}>
            Daniel Ochieng · Designer & Developer · Kenya
          </div>
        </div>

        <div
          style={{
            height: 6,
            width: 220,
            borderRadius: 3,
            background: "linear-gradient(90deg, #2f8fff, #7c3aed)",
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" },
    }
  );
}
