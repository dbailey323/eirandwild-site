// src/components/ClassCard.tsx
import Link from "next/link";

type Props = {
  title: string;
  blurb: string;
  href: string | null;      // null = no upcoming sessions
  pageSlug: string;         // e.g. "eirandwild-motherhood"
  tag?: string;             // "Motherhood" | "Womanhood"
};

export default function ClassCard({ title, blurb, href, pageSlug, tag }: Props) {
  return (
    <article className="group relative flex flex-col rounded-2xl border bg-white/70 p-6 shadow-sm ring-1 ring-black/5 backdrop-blur-sm transition hover:shadow-md">
      {tag && (
        <span className="mb-3 w-fit rounded-full border px-2.5 py-0.5 text-xs font-medium text-[--brand-ink]/80">
          {tag}
        </span>
      )}

      <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 text-sm text-slate-600 leading-6">{blurb}</p>

      <div className="mt-5 flex items-center gap-2">
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg bg-emerald-600 bg-[--brand] px-5 py-2.5 text-white font-semibold shadow-md hover:shadow-lg transition hover:opacity-90"

          >
            Book now
            <svg className="ml-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
              <path d="M12.293 2.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414L9.414 16H6v-3.414l8.293-8.293a1 1 0 000-1.414z"/>
            </svg>
          </a>
        ) : (
          <span className="inline-flex items-center rounded-lg border px-4 py-2 text-slate-500">
            No upcoming sessions
          </span>
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
