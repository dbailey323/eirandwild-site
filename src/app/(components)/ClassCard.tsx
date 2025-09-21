// src/components/ClassCard.tsx
import Link from "next/link";
import Image from "next/image";

type ClassEvent = { id: string; start_at: string; url: string };

type Props = {
  title: string;
  blurb: string;
  pageSlug: string;     // e.g. "eirandwild-motherhood"
  tag?: string;         // "Motherhood" | "Womanhood"
  events: ClassEvent[]; // from /api/bookwhen/upcoming
  image?: string;
  imageAlt?: string;
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

export default function ClassCard({
  title,
  blurb,
  pageSlug,
  tag,
  events,
  image,
  imageAlt,
}: Props) {
  const hasEvents = events.length > 0;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border bg-white/70 shadow-sm ring-1 ring-black/5 transition hover:shadow-md">
      {/* Tall image header */}
      {image && (
        <div className="relative h-72 w-full">
          <Image
            src={image}
            alt={imageAlt ?? title}
            fill
            sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
            className="object-cover"
            priority={false}
          />
          {tag && (
            <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-medium text-[--brand-ink]">
              {tag}
            </span>
          )}
        </div>
      )}

      {/* Body */}
      <div className="p-6">
        {!image && tag && (
          <span className="mb-3 inline-flex w-fit rounded-full border px-2.5 py-0.5 text-xs font-medium text-[--brand-ink]/80">
            {tag}
          </span>
        )}

        <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
        <p className="mt-2 text-sm text-slate-600 leading-6">{blurb}</p>

        {/* Upcoming dates */}
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

        {/* Actions */}
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
      </div>
    </article>
  );
}
