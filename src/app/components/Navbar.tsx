// src/components/Navbar.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Me" },
  { href: "/classes", label: "Womanhood Classes" },
  { href: "/classes", label: "MotherhoodClasses" },
  { href: "/personal-training", label: "Personal Training" },
  { href: "/timetable", label: "Timetable & Booking" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact", kind: "button" as const },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Close on ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Prevent body scroll when the drawer is open and focus the close button
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      closeBtnRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between p-4">
        {/* Logo (left) */}
        <Link href="/" className="flex items-center gap-2" aria-label="Eir & Wild home">
          <Image
            src="/images/logo.png" // put your logo in /public/images/logo.png
            alt="Eir & Wild Wellness"
            width={170}
            height={50}
            priority
          />
        </Link>

        {/* Desktop nav (right) */}
        <ul className="hidden items-center gap-6 text-sm md:flex">
          {NAV_LINKS.map((link) =>
            link.kind === "button" ? (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex items-center rounded-md border px-3 py-1.5 hover:bg-slate-50"
                >
                  {link.label}
                </Link>
              </li>
            ) : (
              <li key={link.href}>
                <Link href={link.href} className="hover:underline">
                  {link.label}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* Hamburger (mobile only) */}
        <button
          className="md:hidden rounded-xl border p-2 shadow-sm"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Overlay */}
      <button
        aria-hidden={!open}
        tabIndex={-1}
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        className={`fixed right-0 top-0 z-50 h-full w-80 max-w-[85vw] bg-white shadow-xl transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b p-4">
          <span className="text-sm font-semibold tracking-wide text-slate-700">Menu</span>
          <button
            ref={closeBtnRef}
            onClick={() => setOpen(false)}
            className="rounded-lg border p-2"
            aria-label="Close menu"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} fill="none">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-1 p-2">
          {NAV_LINKS.map((link) =>
            link.kind === "button" ? (
              <Link
                key={link.href}
                href={link.href}
                className="mt-2 inline-flex items-center justify-center rounded-lg bg-blue-900 bg-[--brand] px-4 py-2 font-medium text-white"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-[15px] hover:bg-slate-50"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            )
          )}
        </div>
      </div>
    </header>
  );
}
