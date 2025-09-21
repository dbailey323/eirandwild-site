import Link from "next/link";
import FilterBar from "./FilterBar";
import { EW_CLASSES } from "@/lib/classes";

type ClassCfg = (typeof EW_CLASSES)[number];
type ApiEvent = { id: string; title: string; start_at: string; url: string };
type SearchParams = { [key: string]: string | string[] | undefined };

const dayMap: Record<string, number> = {
  mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6, sun: 0,
};

function isMotherhood(c: ClassCfg) { return c.page.includes("motherhood"); }
function isWomanhood(c: ClassCfg) { return c.page.includes("womanhood"); }

function weekKey(d: Date) {
  const dt = new Date(d); const day = dt.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  dt.setDate(dt.getDate() + diff); dt.setHours(0,0,0,0);
  return dt.toISOString();
}
function fmtWeekLabel(isoMonday: string) {
  const d = new Date(isoMonday); const end = new Date(d); end.setDate(d.getDate()+6);
  const fmt = new Intl.DateTimeFormat(undefined,{ day:"2-digit", month:"short" });
  const yr = new Intl.DateTimeFormat(undefined,{ year:"numeric" });
  return `${fmt.format(d)} – ${fmt.format(end)} ${yr.format(d)}`;
}
function fmtDateTime(iso: string) {
  const d = new Date(iso);
  return new Intl.DateTimeFormat(undefined, {
    weekday:"short", day:"2-digit", month:"short", hour:"2-digit", minute:"2-digit",
  }).format(d);
}

async function fetchUpcoming(c: ClassCfg, limit = 60): Promise<ApiEvent[]> {
  const params = new URLSearchParams({
    page: c.page, calendarId: c.calendarId, titles: c.titles, limit: String(limit),
  });
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const res = await fetch(`${base}/api/bookwhen/upcoming?${params.toString()}`, { cache: "no-store" });
  const json = await res.json();
  return Array.isArray(json?.events) ? (json.events as ApiEvent[]) : [];
}

export default async function TimetablePage({ searchParams }: { searchParams?: SearchParams }) {
  const tab = (typeof searchParams?.tab === "string" ? searchParams!.tab : "motherhood") as
    | "motherhood" | "womanhood";

  const classes = EW_CLASSES.filter(tab === "motherhood" ? isMotherhood : isWomanhood);

  // Build class options for the filter bar
  const classOptions = classes.map((c) => ({ label: c.label, value: c.id }));

  // Fetch all events
  const lists = await Promise.all(classes.map((c) => fetchUpcoming(c, 100)));

  // Flatten & annotate
  let events = lists.flatMap((list, i) =>
    list.map((e) => ({ ...e, classId: classes[i].id, classLabel: classes[i].label })),
  );

  // Apply filters from URL
  const classId = typeof searchParams?.class === "string" ? searchParams!.class : "all";
  const q = (typeof searchParams?.q === "string" ? searchParams!.q : "").trim().toLowerCase();
  const day = typeof searchParams?.day === "string" ? searchParams!.day : "all";
  const startHour = typeof searchParams?.startHour === "string" ? searchParams!.startHour : "";
  const endHour   = typeof searchParams?.endHour === "string" ? searchParams!.endHour : "";

  if (classId && classId !== "all") events = events.filter((e) => e.classId === classId);
  if (q) events = events.filter((e) => (e.title + " " + e.classLabel).toLowerCase().includes(q));

  if (day in dayMap) {
    events = events.filter((e) => new Date(e.start_at).getDay() === dayMap[day]);
  }
  if (startHour) {
    const [h, m] = startHour.split(":").map(Number);
    events = events.filter((e) => {
      const d = new Date(e.start_at);
      return d.getHours() > h || (d.getHours() === h && d.getMinutes() >= (m || 0));
    });
  }
  if (endHour) {
    const [h, m] = endHour.split(":").map(Number);
    events = events.filter((e) => {
      const d = new Date(e.start_at);
      return d.getHours() < h || (d.getHours() === h && d.getMinutes() <= (m || 0));
    });
  }

  // Group by week (after filtering)
  const byWeek = new Map<string, typeof events>();
  for (const ev of events) {
    const key = weekKey(new Date(ev.start_at));
    const arr = byWeek.get(key) ?? [];
    arr.push(ev); byWeek.set(key, arr);
  }
  const weekKeys = Array.from(byWeek.keys()).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime(),
  );

  return (
    <div className="mx-auto max-w-6xl py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Timetable &amp; Booking</h1>
        <p className="mt-1 text-slate-600">
          Filter by class, day, or time. Choose a date to book on Bookwhen.
        </p>
      </header>

      <FilterBar
        classOptions={classOptions}
        defaultTab={tab}
      />

      {events.length === 0 ? (
        <div className="mt-6 rounded-lg border p-6 text-slate-600">
          No sessions match your filters. Try widening the time window or clearing filters.
        </div>
      ) : (
        <div className="mt-6 space-y-8">
          {weekKeys.map((wk) => {
            const items = (byWeek.get(wk) ?? []).sort(
              (a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime(),
            );
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
      )}
    </div>
  );
}
