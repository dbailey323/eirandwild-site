// src/app/page.tsx
import Image from "next/image";
import Link from "next/link";
import SocialBar from "@/app/components/SocialBar";
import Reveal from "@/app/components/Reveal";

type Tile = { href: string; src: string; alt: string };

const TILES: Tile[] = [
  { href: "/about", src: "/images/About Me.png", alt: "About Me" },
  { href: "/ourstory", src: "/images/Our Story.png", alt: "Our Story" },
  { href: "/classes/motherhood", src: "/images/Motherhood.png", alt: "Motherhood Classes" },
  { href: "/classes/womanhood", src: "/images/Womanhood.png", alt: "Womanhood Classes" },
  { href: "/babymassage", src: "/images/Baby Massage.png", alt: "Baby Massage" },
  { href: "/personal-training", src: "/images/PT.png", alt: "Personal Training" },
  { href: "/onlineclasses", src: "/images/Online Classes.png", alt: "Online Classes" },
  { href: "/oneoffclasses", src: "/images/One Off.png", alt: "One Off Classes" },
  { href: "/doula", src: "/images/Doula.png", alt: "Doula Services" },
  { href: "/reviews", src: "/images/Reviews.png", alt: "Customer Reviews" },
  { href: "/contact", src: "/images/Contact.png", alt: "Contact Us" },
  { href: "/faq", src: "/images/FAQ.png", alt: "Frequently Asked Questions" },
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-6">
      {/* Hero Banner */}
      <Reveal>
        <div className="mb-6">
          <Image
            src="/images/Header.png"  // ensure this file lives in /public/images/
            alt="Welcome to Eir & Wild Wellness"
            width={1600}
            height={800}
            className="w-full rounded-lg shadow"
            priority
          />
        </div>
      </Reveal>

      {/* Tiles Section */}
      <div className="grid grid-cols-1 gap-4">
        {TILES.map((t, i) => (
          <Reveal key={t.src} delay={i * 60}>
            <Link href={t.href} className="block overflow-hidden rounded-xl shadow hover:opacity-90 transition">
              {/* Using next/image keeps things optimized; swap to <img> if these are already perfectly sized */}
              <Image
                src={t.src}
                alt={t.alt}
                width={1400}
                height={700}
                className="w-full h-auto object-cover"
              />
            </Link>
          </Reveal>
        ))}
      </div>

      {/* Floating Social Bar (fixed) */}
      <SocialBar />
    </main>
  );
}
