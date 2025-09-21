// src/app/timetable/page.tsx
import Link from "next/link";
import { EW_CLASSES } from "@/lib/classes";

type ClassCfg = (typeof EW_CLASSES)[number];

type ApiEvent = {
  id: string;
  title: string;
  start_at: string; // ISO
  url: string;      // https://bookwhen.com/<page>#focus=ev-...
};

type SearchParams = { [key: string]: string | string[] | undefined };

function isMotherhood(c: ClassCfg) {
  return c.page.includes("motherhood");
}
function isWomanhood(c: ClassCfg) {
  return c.page.includes("womanhood");
}

function weekKey(d: Date) {
  // Group by Monday-of-week (local time)
  const dt = new Date(d);
  const day = dt.getDay(); // 0 Sun .. 6 Sat
  const diff = (day === 0 ? -6 : 1) - day; // days to Monday
  dt.setDate(dt.getDate() + diff);
  dt.setHours(0, 0, 0, 0);
  return dt.toISOString();
}

function fmtWeekLabel(isoMonday: string) {
  const d = new Date(isoMonday);
  const end = new Date(d);
  end.setDate(d.getDate() + 6);
  const fmt = new Intl.DateTimeFormat(undefined, {
    day: "2-digit",
    month: "short",
  });
  const yr = new Intl.DateTimeFormat(undefined, { year: "numeric" });
  return `${fmt.format(d)} – ${fmt.format(end)} ${yr.format(d)}`;
}

function fmtDateTime(iso: string) {
  const d = new Date(iso);
  return new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

async function fetchUpcoming(c: ClassCfg, limit = 24): Promise<ApiEvent[]> {
  const params = new URLSearchParams({
    page: c.page,
    calendarId: c.calendarId,
    titles: c.titles,
    limit: String(limit),
  });
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  try {
    const res = await fetch(`${base}/api/bookwhen/upcoming?${params.toString()}`, {
      cache: "no-store",
    });
    const json = await res.json();
    return Array.isArray(json?.events) ? (json.events as ApiEvent[]) : [];
  } catch {
    return [];
  }
}

export default async function TimetablePage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const tab = typeof searchParams?.tab === "string" ? searchParams!.tab : "motherhood";
  const isMother = tab !== "womanhood";

  const classes = EW_CLASSES.filter(isMother ? isMotherhood : isWomanhood);

  // Pull events for each class concurrently
  const lists = await Promise.all(classes.map((c) => fetchUpcoming(c, 50)));

  // Flatten and annotate with class label
  const events = lists
    .flatMap((list, i) =>
      list.map((e) => ({
        ...e,
        classLabel: classes[i].label,
      })),
    )
    // sort by date ascending
    .sort(
      (a, b) =>
        new Date(a.start_at).getTime() - new Date(b.start_at).getTime(),
    );

  // Group by week
  const byWeek = new Map<string, typeof events>();
  for (const ev of events) {
    const key = weekKey(new Date(ev.start_at));
    const arr = byWeek.get(key) ?? [];
    arr.push(ev);
    byWeek.set(key, arr);
  }

  const weekKeys = Array.from(byWeek.keys()).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime(),
  );

  return (
    <div className="mx-auto max-w-6xl py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Timetable &amp; Booking</h1>
        <p className="mt-1 text-slate-600">
          Choose a date to book. Checkout happens on Bookwhen.
        </p>

        {/* Tabs */}
        <div className="mt-4 inline-flex rounded-lg border p-1 bg-white">
          <Link
            href="/timetable?tab=motherhood"
            className="px-3 py-1.5 rounded-md text-sm font-medium data-[active=true]:bg-[--brand] data-[active=true]:text-white"
            data-active={isMother ? "true" : "false"}
          >
            Motherhood
          </Link>
          <Link
            href="/timetable?tab=womanhood"
            className="px-3 py-1.5 rounded-md text-sm font-medium data-[active=true]:bg-[--brand] data-[active=true]:text-white"
            data-active={!isMother ? "true" : "false"}
          >
            Womanhood
          </Link>
        </div>
      </header>

      {/* Empty state */}
      {events.length === 0 && (
        <div className="rounded-lg border p-6 text-slate-600">
          No upcoming sessions found for this schedule. Please check back soon.
        </div>
      )}

      {/* Weeks */}
      <div className="space-y-8">
        {weekKeys.map((wk) => {
          const items = byWeek.get(wk) ?? [];
          return (
            <section key={wk} className="rounded-xl border p-4">
              <h2 className="text-lg font-semibold mb-3">{fmtWeekLabel(wk)}</h2>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((ev) => (
                  <li key={ev.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <div className="text-sm font-medium">{ev.classLabel}</div>
                      <div className="text-sm text-slate-600">{fmtDateTime(ev.start_at)}</div>
                    </div>
                    <a
                      href={ev.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-lg bg-emerald-600 bg-[--brand] px-3 py-1.5 text-white text-sm font-medium transition hover:opacity-90"
                    >
                      Book
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
