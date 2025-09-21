// src/app/api/bookwhen/upcoming/route.ts
import { NextRequest, NextResponse } from "next/server";

const TOKEN = process.env.BOOKWHEN_API_TOKEN!;
const auth = (t: string) => "Basic " + Buffer.from(`${t}:`).toString("base64");

// Bookwhen likes YYYYMMDDHHMMSS
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

type BwEvent = {
  id: string; // ev-...
  attributes?: { start_at?: string; title?: string };
};

type BwListResponse<T> = { data?: T[] };

async function fetchJson<T>(url: string): Promise<T> {
  const r = await fetch(url, {
    headers: { Authorization: auth(TOKEN), Accept: "application/json" },
    cache: "no-store",
  });
  if (!r.ok) throw new Error(`Bookwhen ${r.status}`);
  return (await r.json()) as T;
}

/**
 * GET /api/bookwhen/upcoming?calendarId=<id>&page=<slug>&titles=<A,B>&limit=8
 *  - calendarId: internal Bookwhen calendar id (e.g. b9fv0nhstsda)
 *  - page: public page slug (e.g. eirandwild-motherhood) for final URL
 *  - titles: comma-separated keywords (OR match)
 *  - limit: how many dates to return (default 8)
 *
 * Returns: { ok:true, events:[{id,start_at,title,url}] }
 */
export async function GET(req: NextRequest) {
  const u = new URL(req.url);
  const calendarId = u.searchParams.get("calendarId");
  const page = u.searchParams.get("page");
  const titles = u.searchParams.get("titles") ?? "";
  const limit = Math.min(Number(u.searchParams.get("limit") ?? "8"), 24);

  if (!calendarId || !page || !titles) {
    return NextResponse.json(
      { ok: false, reason: "Missing calendarId, page or titles" },
      { status: 400 }
    );
  }
  if (!TOKEN) return NextResponse.json({ ok: true, events: [] });

  const qs = new URLSearchParams();
  qs.set("filter[calendar]", calendarId);
  qs.set("filter[title]", titles);
  qs.set("filter[from]", yyyymmddhhmmss());
  qs.set("page[limit]", String(limit));

  try {
    const json = await fetchJson<BwListResponse<BwEvent>>(
      `https://api.bookwhen.com/v2/events?${qs.toString()}`
    );

    const events = (json.data ?? [])
      .filter((e): e is BwEvent => Boolean(e?.id))
      .sort((a, b) => {
        const as = a.attributes?.start_at ?? "";
        const bs = b.attributes?.start_at ?? "";
        return new Date(as).getTime() - new Date(bs).getTime();
      })
      .map((e) => ({
        id: e.id,
        title: e.attributes?.title ?? "",
        start_at: e.attributes?.start_at ?? "",
        url: `https://bookwhen.com/${page}#focus=${e.id}`,
      }));

    return NextResponse.json({ ok: true, events });
  } catch {
    return NextResponse.json({ ok: true, events: [] });
  }
}
