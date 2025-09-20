import { NextRequest, NextResponse } from "next/server";

const TOKEN = process.env.BOOKWHEN_API_TOKEN;
const auth = (t: string) => "Basic " + Buffer.from(`${t}:`).toString("base64");

// Bookwhen accepts YYYYMMDDHHMMSS for from/to; we can also send ISO, but let's be explicit
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

/**
 * GET /api/bookwhen/next?calendarId=<id>&page=<page-slug>&titles=<comma+separated+keywords>
 *    - calendarId is REQUIRED for precise filtering (e.g. b9fv0nhstsda)
 *    - page is the PUBLIC slug used to build the final user URL (e.g. eirandwild-motherhood)
 *    - titles is one or more keywords that match the entry title (comma-separated OR)
 *
 * Optionally, you can pass eventId instead of titles to link to a specific session:
 * GET /api/bookwhen/next?calendarId=<id>&page=<slug>&eventId=ev-...
 */
export async function GET(req: NextRequest) {
  const u = new URL(req.url);
  const calendarId = u.searchParams.get("calendarId"); // REQUIRED for the API filter
  const page = u.searchParams.get("page");             // public page slug for final URL
  const titles = u.searchParams.get("titles");         // comma-separated title keywords
  const eventId = u.searchParams.get("eventId");       // optional direct session id

  if (!page || !calendarId) {
    return NextResponse.json({ ok: false, reason: "Missing page or calendarId" }, { status: 400 });
  }

  const fallback = `https://bookwhen.com/${page}`;
  if (!TOKEN) return NextResponse.json({ ok: true, url: fallback });

  // Case A: direct event link
  if (eventId) {
    return NextResponse.json({ ok: true, url: `https://bookwhen.com/${page}#focus=${eventId}` });
  }

  if (!titles) {
    return NextResponse.json({ ok: true, url: fallback });
  }

  // Build the events query
  const qs = new URLSearchParams();
  qs.set("filter[calendar]", calendarId);      // <<< USE ID, not slug
  qs.set("filter[title]", titles);             // "A,B" acts as OR
  qs.set("filter[from]", yyyymmddhhmmss());    // from now
  qs.set("page[limit]", "10");                 // grab a few, we’ll pick earliest

  try {
    const resp = await fetch(`https://api.bookwhen.com/v2/events?${qs.toString()}`, {
      headers: { Authorization: auth(String(TOKEN)), Accept: "application/json" },
      cache: "no-store",
    });
    if (!resp.ok) return NextResponse.json({ ok: true, url: fallback });

    const json = await resp.json();
    let events: any[] = json?.data ?? [];
    if (events.length === 0) return NextResponse.json({ ok: true, url: fallback });

    // pick earliest by start_at
    events.sort((a, b) => new Date(a?.attributes?.start_at ?? 0).getTime() - new Date(b?.attributes?.start_at ?? 0).getTime());
    const next = events[0];
    const nextId: string | undefined = next?.id;
    if (!nextId) return NextResponse.json({ ok: true, url: fallback });

    return NextResponse.json({ ok: true, url: `https://bookwhen.com/${page}#focus=${nextId}` });
  } catch {
    return NextResponse.json({ ok: true, url: fallback });
  }
}
