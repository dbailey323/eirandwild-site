// src/components/ClassCard.tsx
import Link from "next/link";

type ClassEvent = {
  id: string;
  start_at: string; // ISO with timezone
  url: string;
};

type Props = {
  title: string;
  blurb: string;
  pageSlug: string;
  tag?: string;
  events: ClassEvent[]; // upcoming dates
};

function formatWhen(iso: string) {
  const d = new Date(iso);
  return new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export default function ClassCard({ title, blurb, pageSlug, tag, events }: Props) {
  const hasEvents = events.length > 0;

  return (
    <article className="group relative flex flex-col rounded-2xl border bg-white/70 p-6 shadow-sm ring-1 ring-black/5 backdrop-blur-sm transition hover:shadow-md">
      {tag && (
        <span className="mb-3 w-fit rounded-full border px-2.5 py-0.5 text-xs font-medium text-[--brand-ink]/80">
          {tag}
        </span>
      )}

      <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 text-sm text-slate-600 leading-6">{blurb}</p>

      <div className="mt-4 grid gap-2">
        {hasEvents ? (
          <>
            <div className="text-xs text-slate-500">Upcoming dates</div>
            <div className="flex flex-wrap gap-2">
              {events.map((ev) => (
                <a
                  key={ev.id}
                  href={ev.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-lg border px-3 py-1.5 text-sm hover:bg-slate-50"
                >
                  {formatWhen(ev.start_at)}
                </a>
              ))}
            </div>
          </>
        ) : (
          <div className="text-sm text-slate-500">No upcoming sessions</div>
        )}
      </div>

      <div className="mt-5 flex items-center gap-3">
        {hasEvents && (
          <a
            href={events[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg bg-emerald-600 bg-[--brand] px-4 py-2 text-white font-medium transition hover:opacity-90"
          >
            Book next available
          </a>
        )}
        <Link
          href={`/${pageSlug}`}
          className="text-sm font-medium underline-offset-4 hover:underline text-[--brand-ink]"
        >
          Learn more
        </Link>
      </div>

      <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-[--brand]/30" />
    </article>
  );
}
