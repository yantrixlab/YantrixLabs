import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function normalizeBase(url: string): string {
  const trimmed = url.trim().replace(/\/+$/, "");
  if (trimmed.endsWith("/api/v1")) return trimmed;
  if (trimmed.endsWith("/api")) return `${trimmed}/v1`;
  if (trimmed.endsWith("/v1")) return trimmed;
  return `${trimmed}/api/v1`;
}

function toOrigin(url: string): string | null {
  try {
    return new URL(url).origin;
  } catch {
    return null;
  }
}

function getServerApiCandidates(): string[] {
  const raw = [
    process.env.API_INTERNAL_URL,
    process.env.NEXT_PUBLIC_API_URL,
    "https://api.yantrixlab.com/api/v1",
    "https://api.yantrixlab.com/v1",
    "https://api.yantrix.in/api/v1",
    "https://api.yantrix.in/v1",
  ].filter(Boolean) as string[];

  const candidates: string[] = [];
  const seen = new Set<string>();
  for (const value of raw) {
    const normalized = normalizeBase(value);
    // Prevent accidental self-proxy loops (web origin pointing back to itself).
    if (normalized.includes("yantrixlab.com/api/proxy")) continue;
    const origin = toOrigin(normalized);
    if (!origin) continue;
    if (!seen.has(origin)) {
      seen.add(origin);
      candidates.push(origin);
    }
  }
  return candidates;
}

async function proxy(req: NextRequest, path: string[]) {
  const urlPath = path.join("/");
  const query = req.nextUrl.search || "";
  const requestHost = req.nextUrl.host;
  const candidates = getServerApiCandidates().filter((base) => {
    try {
      const host = new URL(base).host;
      // Avoid calling the current web host as upstream API by mistake.
      return host !== requestHost;
    } catch {
      return true;
    }
  });

  if (candidates.length === 0) {
    return NextResponse.json(
      { success: false, error: "No API base URL configured on server." },
      { status: 500 }
    );
  }

  const headers = new Headers(req.headers);
  headers.delete("host");
  headers.delete("connection");
  headers.delete("content-length");

  const method = req.method.toUpperCase();
  const body =
    method === "GET" || method === "HEAD" ? undefined : await req.arrayBuffer();

  let lastError: unknown;
  const basePathVariants = ["/api/v1", "/v1", "/api", ""];

  for (const origin of candidates) {
    for (const basePath of basePathVariants) {
      const slashPath = urlPath ? `/${urlPath}` : "";
      const upstreamUrl = `${origin}${basePath}${slashPath}${query}`;
      try {
        const upstream = await fetch(upstreamUrl, {
          method,
          headers,
          body,
          cache: "no-store",
        });

        const contentType = upstream.headers.get("content-type") || "";
        // If upstream sends HTML, this is usually a wrong host/path (not API).
        // Try next candidate instead of returning HTML to JSON clients.
        if (contentType.includes("text/html")) {
          lastError = new Error(`Upstream returned HTML for ${upstreamUrl}`);
          continue;
        }

        // Wrong API base commonly returns 404/405 for auth paths; try next candidate.
        if (upstream.status === 404 || upstream.status === 405) {
          lastError = new Error(`Upstream ${upstreamUrl} returned ${upstream.status}`);
          continue;
        }

        const responseHeaders = new Headers(upstream.headers);
        responseHeaders.set("cache-control", "no-store");

        return new NextResponse(upstream.body, {
          status: upstream.status,
          headers: responseHeaders,
        });
      } catch (error) {
        lastError = error;
      }
    }
  }

  return NextResponse.json(
    {
      success: false,
      error: lastError instanceof Error ? lastError.message : "Upstream API unreachable.",
    },
    { status: 502 }
  );
}

export async function GET(req: NextRequest, { params }: { params: { path: string[] } }) {
  return proxy(req, params.path);
}

export async function POST(req: NextRequest, { params }: { params: { path: string[] } }) {
  return proxy(req, params.path);
}

export async function PUT(req: NextRequest, { params }: { params: { path: string[] } }) {
  return proxy(req, params.path);
}

export async function PATCH(req: NextRequest, { params }: { params: { path: string[] } }) {
  return proxy(req, params.path);
}

export async function DELETE(req: NextRequest, { params }: { params: { path: string[] } }) {
  return proxy(req, params.path);
}
