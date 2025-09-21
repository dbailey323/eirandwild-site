import Link from "next/link";
// src/app/components/ClassCard.tsx
import Image from "next/image";

interface ClassCardProps {
  title: string;
  blurb: string; // ✅ keep as blurb
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
    <div className="overflow-hidden rounded-xl border shadow-sm">
      {/* Image */}
      <div className="relative h-64 w-full">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover object-center"
        />
        <span className="absolute top-2 left-2 rounded-md bg-white/80 px-2 py-1 text-xs font-medium">
          {tag}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-slate-600">{blurb}</p>

        {events?.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-slate-700">
              Upcoming dates
            </h4>
            <div className="mt-2 flex flex-wrap gap-2">
              {events.map((ev) => (
                <a
                  key={ev.id}
                  href={`https://bookwhen.com/${pageSlug}#focus=${ev.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border px-3 py-1 text-sm hover:bg-slate-50"
                >
                  {new Date(ev.start_at).toLocaleString("en-GB", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-4 flex items-center gap-4">
          <a
            href={`https://bookwhen.com/${pageSlug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-[--brand] px-4 py-2 text-white font-medium shadow hover:opacity-90"
          >
            Book next available
          </a>
          <a
            href={`/classes/${pageSlug}`}
            className="text-sm text-[--brand] hover:underline"
          >
            Learn more
          </a>
        </div>
      </div>
    </div>
  );
}
