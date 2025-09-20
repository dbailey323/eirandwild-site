import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eir & Wild — Pre- & Postnatal Fitness, Baby Massage, PT",
  description:
    "Group exercise for new & expecting mothers. Pre & postnatal classes, baby massage, and personal training.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        <header className="border-b">
          <nav className="mx-auto flex max-w-6xl items-center justify-between p-4">
            <a href="/" className="text-xl font-semibold">Eir & Wild</a>
            <ul className="flex items-center gap-6 text-sm">
              <li><a href="/classes" className="hover:underline">Classes</a></li>
              <li><a href="/personal-training" className="hover:underline">Personal Training</a></li>
              <li><a href="/timetable" className="hover:underline">Timetable & Booking</a></li>
              <li><a href="/about" className="hover:underline">About</a></li>
              <li><a href="/contact" className="inline-flex items-center rounded-md border px-3 py-1.5 hover:bg-slate-50">Contact</a></li>
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
