"use client";

import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { href: "/classes", label: "Classes" },
    { href: "/personal-training", label: "Personal Training" },
    { href: "/timetable", label: "Timetable & Booking" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact", btn: true },
  ];

  return (
    <header className="border-b">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="text-xl font-semibold">Eir & Wild</Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-6 text-sm md:flex">
          {navItems.map((i) => (
            <li key={i.href}>
              <Link
                href={i.href}
                className={
                  i.btn
                    ? "inline-flex items-center rounded-md border px-3 py-1.5 hover:bg-slate-50"
                    : "hover:underline"
                }
              >
                {i.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="inline-flex items-center rounded-md border px-3 py-1.5 md:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className={`md:hidden ${open ? "block" : "hidden"} border-t`}
      >
        <ul className="mx-auto grid max-w-6xl gap-2 px-4 py-3 md:px-6">
          {navItems.map((i) => (
            <li key={i.href}>
              <Link
                href={i.href}
                onClick={() => setOpen(false)}
                className={
                  i.btn
                    ? "block rounded-md border px-3 py-2 text-center"
                    : "block rounded-md px-3 py-2 hover:bg-slate-50"
                }
              >
                {i.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
