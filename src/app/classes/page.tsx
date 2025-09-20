// src/app/classes/page.tsx
import Link from "next/link";

type ClassInfo = {
  name: string;
  bullets: string[];
};

export default function ClassesPage() {
  const classes: ClassInfo[] = [
    {
      name: "Pre-natal",
      bullets: [
        "Safe trimester programming",
        "Pelvic floor & breath work",
        "Low-impact strength & mobility",
      ],
    },
    {
      name: "Post-natal",
      bullets: [
        "Core & pelvic floor rebuild",
        "Progressive strength training",
        "Buggy-friendly options",
      ],
    },
    {
      name: "Baby massage",
      bullets: [
        "Bonding & relaxation",
        "Colic & wind routines",
        "Sleep-supportive techniques",
      ],
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
              {c.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <Link
              href="/timetable"
              className="mt-4 inline-block rounded-md border px-4 py-2"
            >
              Book
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
