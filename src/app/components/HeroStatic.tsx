// src/components/HeroStatic.tsx
import Image from "next/image";
import Link from "next/link";

export default function HeroStatic() {
  return (
    <section className="relative isolate overflow-hidden rounded-2xl ring-1 ring-black/5">
      {/* Static brand image */}
      <div className="relative w-full">
        <Image
          src="/images/Header.png" // Put Header.png inside public/images/
          alt="Eir & Wild Wellness hero banner"
          width={1200}
          height={600}
          priority
          className="w-full h-auto object-contain md:object-cover"
        />
      </div>

      {/* CTA overlay */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
        <a
          href="https://bookwhen.com/eirandwild-motherhood"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-lg bg-[--brand] px-5 py-2.5 text-sm font-semibold text-white shadow hover:opacity-90"
        >
          Book now
        </a>
        <Link
          href="/classes"
          className="inline-flex items-center rounded-lg border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/20"
        >
          Explore classes
        </Link>
      </div>
    </section>
  );
}
