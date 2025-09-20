import Link from "next/link";

export default function HomePage() {
  return (
    <div className="grid gap-12">
      {/* ... */}
      <div className="mt-6 flex gap-3">
        <Link href="/timetable" className="rounded-md bg-slate-900 px-5 py-2.5 text-white">
          Book a class
        </Link>
        <Link href="/classes" className="rounded-md border px-5 py-2.5">
          Explore classes
        </Link>
      </div>
      {/* ... */}
    </div>
  );
}
