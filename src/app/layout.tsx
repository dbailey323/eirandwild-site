// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./(components)/NavBar";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Eir & Wild — Pre- & Postnatal Fitness, Baby Massage, PT",
  description:
    "Group exercise for new & expecting mothers. Pre & postnatal classes, baby massage, and personal training.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        <header className="border-b bg-white">
          <nav className="mx-auto flex max-w-6xl items-center justify-between p-4">
            {/* Logo on the left */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/logo.png" // <-- save your logo as public/images/logo.png
                alt="Eir & Wild Wellness"
                width={160} // adjust as needed
                height={50}
                priority
              />
            </Link>

            {/* Nav links */}
            <ul className="hidden md:flex items-center gap-6 text-sm">
              <li><Link href="/classes" className="hover:underline">Classes</Link></li>
              <li><Link href="/personal-training" className="hover:underline">Personal Training</Link></li>
              <li><Link href="/timetable" className="hover:underline">Timetable & Booking</Link></li>
              <li><Link href="/about" className="hover:underline">About</Link></li>
              <li>
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-md border px-3 py-1.5 hover:bg-slate-50"
                >
                  Contact
                </Link>
              </li>
            </ul>

            {/* Mobile menu (hamburger) */}
            <button className="md:hidden rounded-md border p-2" aria-label="Open menu">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </nav>
        </header>

        <main className="mx-auto max-w-6xl p-4">{children}</main>

        <footer className="mt-16 border-t">
          <div className="mx-auto max-w-6xl p-4 text-sm text-slate-600">
            © {new Date().getFullYear()} Eir & Wild • Pre & Postnatal Fitness
          </div>
        </footer>
      </body>
    </html>
  );
}
