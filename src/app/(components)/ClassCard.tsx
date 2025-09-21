import Image from "next/image";

interface ClassCardProps {
  tag: string;
  title: string;
  description: string;
  events: { id: string; start_at: string; url: string }[];
  image: string;
  imageAlt?: string;
}

export default function ClassCard({
  tag,
  title,
  description,
  events,
  image,
  imageAlt,
}: ClassCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      {/* Image */}
      <div className="relative w-full h-80 bg-slate-100">
        <Image
          src={image}
          alt={imageAlt ?? title}
          fill
          sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          className="object-contain" // Option B: show full image, no cropping
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <span className="mb-2 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
          {tag}
        </span>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-slate-600">{description}</p>

        {/* Dates */}
        {events.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-slate-700">Upcoming dates</h4>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {events.slice(0, 4).map((ev) => (
                <a
                  key={ev.id}
                  href={ev.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border px-3 py-2 text-sm hover:bg-slate-50"
                >
                  {new Date(ev.start_at).toLocaleDateString("en-GB", {
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

        {/* Actions */}
        <div className="mt-4 flex items-center justify-between">
          <a
            href={events[0]?.url ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg bg-[--brand] px-4 py-2 font-medium text-white transition hover:opacity-90"
          >
            Book next available
          </a>
          <a
            href={`https://bookwhen.com/`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[--brand] hover:underline"
          >
            Learn more
          </a>
        </div>
      </div>
    </div>
  );
}
