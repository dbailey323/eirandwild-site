// src/app/classes/page.tsx
import ClassCard from "@/app/(components)/ClassCard";
import { EW_CLASSES } from "@/lib/classes";

async function getUpcoming(c: (typeof EW_CLASSES)[number]) {
  const qs = new URLSearchParams({
    page: c.page,
    calendarId: c.calendarId,
    titles: c.titles,
    limit: "8", // how many buttons per class
  });
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  try {
    const r = await fetch(`${base}/api/bookwhen/upcoming?${qs.toString()}`, { cache: "no-store" });
    const j = await r.json();
    return Array.isArray(j?.events) ? j.events : [];
  } catch {
    return [];
  }
}

export default async function ClassesPage() {
  const all = await Promise.all(EW_CLASSES.map(getUpcoming));

  return (
    <div className="mx-auto max-w-6xl py-10">
      <header className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Classes</h1>
          <p className="mt-1 text-slate-600">
            Book ahead by choosing a date below. Checkout is handled on Bookwhen.
          </p>
        </div>
        <a
          href="mailto:hello@eirandwild.co.uk"
          className="inline-flex items-center rounded-xl border px-4 py-2 text-sm font-medium hover:bg-slate-50"
        >
          Ask a question
        </a>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {EW_CLASSES.map((c, i) => (
          <ClassCard
            key={c.id}
            title={c.label}
            blurb={c.description}
            pageSlug={c.page}
            tag={c.page.includes("motherhood") ? "Motherhood" : "Womanhood"}
            events={all[i]}
          />
        ))}
      </div>
    </div>
  );
}
