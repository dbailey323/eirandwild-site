export default function HomePage() {
  return (
    <div className="grid gap-12">
      <section className="grid items-center gap-6 py-16 md:grid-cols-2">
        <div>
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            Strong mums, calm babies — <span className="whitespace-nowrap">Eir & Wild</span>
          </h1>
          <p className="mt-4 text-lg text-slate-700">
            Safe, empowering classes for new & expecting mothers, plus baby massage and personal training.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="/timetable" className="rounded-md bg-slate-900 px-5 py-2.5 text-white">
              Book a class
            </a>
            <a href="/classes" className="rounded-md border px-5 py-2.5">
              Explore classes
            </a>
          </div>
        </div>
        <div className="aspect-[4/3] w-full rounded-lg bg-slate-100" />
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          { title: "Pre-natal", desc: "Trimester-friendly programming with breath & core work." },
          { title: "Post-natal", desc: "Rebuild foundations: pelvic floor, core, and strength." },
          { title: "Baby massage", desc: "Bonding, relaxation, and gentle routines for better sleep." },
        ].map((c) => (
          <div key={c.title} className="rounded-lg border p-6">
            <h3 className="text-lg font-semibold">{c.title}</h3>
            <p className="mt-2 text-slate-700">{c.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
