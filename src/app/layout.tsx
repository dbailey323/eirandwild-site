// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Eir & Wild — Pre & Postnatal Fitness",
  description:
    "Group exercise for new & expecting mothers. Postnatal: Strong Mummy Movement. Prenatal: Badass Bumps. Womanhood: Dance & Tone, STRONG & STRETCHED.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900 antialiased">

        {/* Sticky header */}
        <header className="sticky top-0 z-40 bg-white/70 backdrop-blur border-b">
          <nav className="mx-auto flex max-w-6xl items-center justify-between p-4">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              Eir &amp; Wild
            </Link>

            <ul className="hidden md:flex items-center gap-6 text-sm">
              <li><Link href="/classes" className="hover:underline">Classes</Link></li>
              <li><Link href="/timetable" className="hover:underline">Timetable</Link></li>
              <li><Link href="/about" className="hover:underline">About</Link></li>
              <li>
                <Link
                  href="/contact"
                  className="rounded-lg bg-[--accent] px-3 py-2 text-white font-medium hover:opacity-90"
                >
                  Get in touch
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <main className="mx-auto max-w-6xl p-4">{children}</main>

        <footer className="mt-16 border-t">
          <div className="mx-auto max-w-6xl p-4 text-sm text-slate-600">
            © {new Date().getFullYear()} Eir &amp; Wild • Pre &amp; Postnatal Fitness
          </div>
        </footer>
      </body>
    </html>
  );
}


