// src/components/Navbar.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const SIMPLE_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/personal-training", label: "Personal training" },
];

const CLASS_LINKS = [
  { href: "/classes/motherhood", label: "Motherhood" },
  { href: "/classes/womanhood", label: "Womanhood" },
  { href: "/timetable", label: "Timetable & booking" },
  { href: "/classes", label: "Class info" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lock scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) closeBtnRef.current?.focus();
  }, [open]);

  return (
    <>
      {/* ---- HEADER (no overlay/drawer children!) ---- */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-2" aria-label="Eir & Wild home">
            <Image
              src="/images/logo.png"
              alt="Eir & Wild Wellness"
              width={160}
              height={40}
              priority
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop menu */}
          <ul className="hidden items-center gap-6 text-sm text-slate-800 md:flex">
            <li className="relative group">
              <button
                className="whitespace-nowrap transition hover:text-[--brand]"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Classes
              </button>
              <div
                className="invisible absolute left-0 top-full z-40 mt-2 w-56 rounded-lg border bg-white p-2 opacity-0 shadow-lg transition
                           group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
                role="menu"
              >
                {CLASS_LINKS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="block rounded-md px-3 py-2 text-sm text-slate-800 hover:bg-slate-50"
                    role="menuitem"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </li>
            {SIMPLE_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="whitespace-nowrap hover:text-[--brand]">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Contact (desktop) */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-800 shadow-sm transition hover:border-[--brand] hover:text-[--brand]"
            >
              Contact
            </Link>
          </div>

          {/* Hamburger (mobile) */}
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
      </header>

      {/* ---- OVERLAY + DRAWER rendered as siblings of header ---- */}
      {/* Dark overlay */}
      <button
        aria-hidden={!open}
        tabIndex={-1}
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[10000] bg-black/70 backdrop-blur-sm transition-opacity md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        className={`fixed right-0 top-0 z-[10001] h-full w-80 max-w-[85vw] overflow-y-auto bg-white shadow-xl transition-transform duration-300 md:hidden ${
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
          <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Classes</div>
          {CLASS_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 text-[15px] hover:bg-slate-50"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}

          <div className="px-3 pb-1 pt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">Pages</div>
          {SIMPLE_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 text-[15px] hover:bg-slate-50"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}

          <Link
            href="/contact"
            className="mx-3 mt-3 inline-flex items-center justify-center rounded-lg bg-[--brand] px-4 py-2 font-medium text-white"
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>
        </div>
      </div>
    </>
  );
}
