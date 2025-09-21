import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./(components)/NavBar";

export const metadata: Metadata = {
  title: "Eir & Wild — Pre- & Postnatal Fitness, Baby Massage, PT",
  description:
    "Group exercise for new & expecting mothers. Pre & postnatal classes, baby massage, and personal training.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        <NavBar />
        <main className="mx-auto w-full max-w-6xl px-4 py-4 md:px-6">{children}</main>
        <footer className="mt-16 border-t">
          <div className="mx-auto max-w-6xl px-4 py-4 text-sm text-slate-600 md:px-6">
            © {new Date().getFullYear()} Eir & Wild • Pre & Postnatal Fitness
          </div>
        </footer>
      </body>
    </html>
  );
}
