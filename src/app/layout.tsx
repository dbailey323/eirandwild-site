// src/app/layout.tsx
import { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eir & Wild — Pre- & Postnatal Fitness, Baby Massage, PT",
  description:
    "Group exercise for new & expecting mothers. Pre & postnatal classes, baby massage, and personal training.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-white text-slate-900 antialiased`}>
        <header className="border-b">
          <nav className="mx-auto flex max-w-6xl items-center justify-between p-4">
            <Link href="/" className="flex items-center gap-2">
  		<Image src="/images/logo_black.png" alt="Eir & Wild" width={36} height={36} />
  		<span className="text-xl font-semibold">Eir & Wild</span>
		</Link>
            <ul className="flex items-center gap-6 text-sm">
              <li><Link href="/classes" className="hover:underline">Classes</Link></li>
              <li><Link href="/personal-training" className="hover:underline">Personal Training</Link></li>
              <li><Link href="/timetable" className="hover:underline">Timetable & Booking</Link></li>
              <li><Link href="/about" className="hover:underline">About</Link></li>
              <li>
                <Link href="/contact" className="inline-flex items-center rounded-md border px-3 py-1.5 hover:bg-slate-50">
                  Contact
                </Link>
              </li>
            </ul>
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
