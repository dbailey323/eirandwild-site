import Link from "next/link";
// src/app/components/ClassCard.tsx
import Image from "next/image";

interface ClassCardProps {
  title: string;
  blurb: string;
  pageSlug: string;
  tag: string;
  events: { id: string; start_at: string }[];
  image: string;
  imageAlt: string;
}

export function ClassCard({
  title,
  blurb,
  pageSlug,
  tag,
  events,
  image,
  imageAlt,
}: ClassCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm ring-1 ring-black/5">
      {/* Image — cropped to fill */}
      <div className="relative h-64 w-full">
        <Image
          src={image}
          alt={imageAlt || title}
          fill
          className="object-cover"
          priority={false}
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-medium text-slate-700">
          {tag}
        </span>
      </div>

      {/* Body */}
      <div className="p-6">
        <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{blurb}</p>

        {/* Upcoming dates */}
        {events?.length > 0 ? (
          <div className="mt-4">
            <div className="text-xs text-slate-500">Upcoming dates</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {events.map((ev) => (
                <a
                  key={ev.id}
                  href={`https://bookwhen.com/${pageSlug}#focus=${ev.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-lg border px-3 py-1.5 text-sm hover:bg-slate-50"
                >
                  {new Date(ev.start_at).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                  })}
                </a>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-4 text-sm text-slate-500">No upcoming sessions</div>
        )}

        {/* Actions */}
        <div className="mt-5 flex items-center gap-3">
          <a
            href={`https://bookwhen.com/${pageSlug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg bg-[--brand] px-4 py-2 font-medium text-white transition hover:opacity-90"
          >
            Book next available
          </a>
          <a
            href={`/${pageSlug}`}
            className="text-sm font-medium text-[--brand-ink] underline-offset-4 hover:underline"
          >
            Learn more
          </a>
        </div>
      </div>
    </div>
  );
}
