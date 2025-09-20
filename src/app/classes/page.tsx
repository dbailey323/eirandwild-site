import Link from "next/link";

export default function ClassesPage() {
  const classes = [ /* ... */ ];
  return (
    <div className="grid gap-8 py-8">
      <h1 className="text-3xl font-bold">Classes</h1>
      <div className="grid gap-6 md:grid-cols-3">
        {classes.map((c) => (
          <div key={c.name} className="rounded-lg border p-6">
            <h2 className="text-xl font-semibold">{c.name}</h2>
            {/* bullets */}
            <Link href="/timetable" className="mt-4 inline-block rounded-md border px-4 py-2">
              Book
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
