export default function ClassesPage() {
  const classes = [
    {
      name: "Pre-natal",
      bullets: ["Safe trimester programming", "Pelvic floor & breath", "Low-impact strength & mobility"],
    },
    {
      name: "Post-natal",
      bullets: ["Core & pelvic floor rebuild", "Progressive strength", "Buggy-friendly options"],
    },
    {
      name: "Baby massage",
      bullets: ["Bonding & relaxation", "Colic & wind routines", "Sleep-supportive techniques"],
    },
  ];

  return (
    <div className="grid gap-8 py-8">
      <h1 className="text-3xl font-bold">Classes</h1>
      <div className="grid gap-6 md:grid-cols-3">
        {classes.map((c) => (
          <div key={c.name} className="rounded-lg border p-6">
            <h2 className="text-xl font-semibold">{c.name}</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-700">
              {c.bullets.map((b) => <li key={b}>{b}</li>)}
            </ul>
            <a href="/timetable" className="mt-4 inline-block rounded-md border px-4 py-2">Book</a>
          </div>
        ))}
      </div>
    </div>
  );
}
