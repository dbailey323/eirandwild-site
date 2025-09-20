import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="grid gap-12">
      <section className="grid items-center gap-6 py-10 md:grid-cols-2 md:py-16">
        <div>
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Strong mums, calm babies — <span className="whitespace-nowrap">Eir & Wild</span>
          </h1>
          <p className="mt-4 text-base text-slate-700 sm:text-lg">
            Safe, empowering classes for new & expecting mothers, plus baby massage and personal training.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/timetable" className="rounded-md bg-brand px-5 py-2.5 text-white">
              Book a class
            </Link>
            <Link href="/classes" className="rounded-md border px-5 py-2.5 hover:bg-slate-50">
              Explore classes
            </Link>
          </div>
        </div>

        {/* Responsive image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
          <Image
            src="/images/hero.jpg"
            alt="Pre & postnatal fitness and baby massage"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Feature cards: stack on mobile, 3 cols on md+ */}
      <section className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {/* cards unchanged */}
      </section>
    </div>
  );
}
