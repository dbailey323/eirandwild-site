import { EW_CLASSES } from "@/lib/classes";

async function resolveNextUrl(c: (typeof EW_CLASSES)[number]) {
  const qs = new URLSearchParams({
    page: c.page,
    calendarId: c.calendarId,
    titles: c.titles,
  });
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const res = await fetch(`${base}/api/bookwhen/next?${qs.toString()}`, { cache: "no-store" });
  const data = await res.json();
  return data?.url ?? `https://bookwhen.com/${c.page}`;
}

export default async function ClassesPage() {
  const urls = await Promise.all(EW_CLASSES.map(resolveNextUrl));

  return (
    <div className="grid gap-8 py-8">
      <h1 className="text-3xl font-bold">Classes</h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {EW_CLASSES.map((c, i) => (
          <div key={c.id} className="rounded-lg border p-6">
            <h2 className="text-xl font-semibold">{c.label}</h2>
            <p className="mt-2 text-slate-700">{c.description}</p>
            <a
              href={urls[i]}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block rounded-md bg-brand px-4 py-2 text-white"
            >
              Book now
            </a>
            <p className="mt-2 text-xs text-slate-500">Bookings handled on Bookwhen.</p>
          </div>
        ))}
      </div>
    </div>
  );
}
