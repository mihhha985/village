import { NextRequest, NextResponse } from "next/server";

const STATIC_MAPS_URL = "https://static-maps.yandex.ru/v1";
const COORDINATE_PAIR_PATTERN = /^-?\d+(?:\.\d+)?,-?\d+(?:\.\d+)?$/;

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const ll = searchParams.get("ll");
  const zoom = searchParams.get("z") ?? "10";
  const markers = searchParams.get("pt");

  if (!ll || !COORDINATE_PAIR_PATTERN.test(ll)) {
    return jsonError("Invalid map center", 400);
  }

  const zoomValue = Number(zoom);
  if (!Number.isInteger(zoomValue) || zoomValue < 0 || zoomValue > 21) {
    return jsonError("Invalid map zoom", 400);
  }

  const apiKey = process.env.YANDEX_MAPS_API_KEY ?? process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY;
  if (!apiKey) {
    return jsonError("Yandex Static API key is not configured", 500);
  }

  const url = new URL(STATIC_MAPS_URL);
  url.searchParams.set("apikey", apiKey);
  url.searchParams.set("ll", ll);
  url.searchParams.set("z", String(zoomValue));
  url.searchParams.set("size", "650,450");
  url.searchParams.set("scale", "1");
  url.searchParams.set("lang", "ru_RU");
  url.searchParams.set("theme", "dark");
  if (markers) url.searchParams.set("pt", markers);

  const requestReferer = request.headers.get("referer");
  const referer = requestReferer?.includes("localhost")
    ? requestReferer
    : "http://localhost:3000/";

  try {
    const response = await fetch(url, {
      headers: { Referer: referer },
      cache: "no-store",
    });
    const body = await response.arrayBuffer();

    return new NextResponse(body, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("content-type") ?? "application/octet-stream",
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return jsonError("Yandex Static API is unavailable", 502);
  }
}
