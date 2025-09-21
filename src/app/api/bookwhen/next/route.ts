// src/app/api/bookwhen/next/route.ts
import { NextRequest, NextResponse } from "next/server";

const TOKEN = process.env.BOOKWHEN_API_TOKEN!;
const auth = (t: string) => "Basic " + Buffer.from(`${t}:`).toString("base64");

// Bookwhen prefers YYYYMMDDHHMMSS
function yyyymmddhhmmss(d = new Date()) {
  const p = (n: number) => String(n).padStart(2, "0");
  return (
    d.getUTCFullYear().toString() +
    p(d.getUTCMonth() + 1) +
    p(d.getUTCDate()) +
    p(d.getUTCHours()) +
    p(d.getUTCMinutes()) +
    p(d.getUTCSeconds())
  );
}

// Minimal types
type BwEvent = {
  id: string;
  type: string;
  attributes?: { start_at?: string };
};
type BwListResponse<T> = { data?: T[] };

async function fetchJson<T>(url: string): Promise<T> {
  const r = await fetch(url, {
    headers: { Authorization: auth(TOKEN), Accept: "application/json" },
    cache: "no-store",
  });
  if (!r.ok) throw new Error(`Bookwhen non-OK ${r.status}`);
  return (await r.json()) as T;
}

/**
 * GET /api/bookwhen/next?calendarId=<id>&page=<slug>&titles=<A,B>
 * OR  /api/bookwhen/next?calendarId=<id>&page=<slug>&eventId=ev-...
 */
export async function GET(req: NextRequest) {
  const u = new URL(req.url);
  const calendarId = u.searchParams.get("calendarId");
  const page = u.searchParams.get("page");
  const titles = u.searchParams.get("titles");
  const eventId = u.searchParams.get("eventId");
  const fallback = page ? `https://bookwhen.com/${page}` : "https://bookwhen.com/";

  if (!page || !calendarId) {
    return NextResponse.json({ ok: false, reason: "Missing page or calendarId" }, { status: 400 });
  }
  if (!TOKEN) return NextResponse.json({ ok: true, url: fallback });

  if (eventId) {
    return NextResponse.json({ ok: true, url: `https://bookwhen.com/${page}#focus=${eventId}` });
  }
  if (!titles) return NextResponse.json({ ok: true, url: fallback });

  const qs = new URLSearchParams();
  qs.set("filter[calendar]", calendarId);
  qs.set("filter[title]", titles);        // comma-separated → OR
  qs.set("filter[from]", yyyymmddhhmmss());
  qs.set("page[limit]", "10");

  try {
    const json = await fetchJson<BwListResponse<BwEvent>>(
      `https://api.bookwhen.com/v2/events?${qs.toString()}`
    );
    const events: BwEvent[] = Array.isArray(json.data) ? json.data : [];
    if (events.length === 0) return NextResponse.json({ ok: true, url: fallback });

    const next = [...events].sort(
      (a, b) =>
        new Date(a.attributes?.start_at ?? 0).getTime() -
        new Date(b.attributes?.start_at ?? 0).getTime()
    )[0];

    const nextId = next?.id;
    if (!nextId) return NextResponse.json({ ok: true, url: fallback });

    return NextResponse.json({ ok: true, url: `https://bookwhen.com/${page}#focus=${nextId}` });
  } catch {
    return NextResponse.json({ ok: true, url: fallback });
  }
}
