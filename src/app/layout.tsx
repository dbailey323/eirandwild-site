// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import TileCard from "@/app/(components)/TileCard";

export const metadata: Metadata = {
  title: "Eir & Wild — Pre- & Postnatal Fitness, Baby Massage, PT",
  description:
    "Group exercise for new & expecting mothers. Pre & postnatal classes, baby massage, and personal training.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        <Navbar />
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
