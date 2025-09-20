"use client";

import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";

type TabKey = "womanhood" | "motherhood";

export default function TimetablePage() {
  // Read default tab from URL (?tab=motherhood), fallback to womanhood
  const initialTab = useMemo<TabKey>(() => {
    if (typeof window === "undefined") return "womanhood";
    const t = new URLSearchParams(window.location.search).get("tab");
    return (t === "motherhood" || t === "womanhood") ? t : "womanhood";
  }, []);

  const [activeTab, setActiveTab] = useState<TabKey>(initialTab);

  const iframes: Record<TabKey, string> = {
    womanhood: "https://bookwhen.com/eirandwild-womanhood/iframe",
    motherhood: "https://bookwhen.com/eirandwild-motherhood/iframe",
  };

  // Load Bookwhen iframe resizer once
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.bookwhen.com/js/iframe_resizer.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  // Keep tab in the URL so you can share links
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("tab", activeTab);
    window.history.replaceState({}, "", url.toString());
  }, [activeTab]);

  return (
    <div className="grid gap-6 py-8">
      <h1 className="text-3xl font-bold">Timetable & Booking</h1>
      <p className="text-slate-700">
        Select the schedule below to view and book your classes directly.
      </p>

      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Choose a schedule"
        className="flex flex-wrap gap-2 border-b pb-2"
      >
        {(
          [
            { key: "womanhood", label: "Womanhood" },
            { key: "motherhood", label: "Motherhood" },
          ] as const
        ).map(({ key, label }) => {
          const selected = activeTab === key;
          return (
            <button
              key={key}
              role="tab"
              aria-selected={selected}
              aria-controls={`panel-${key}`}
              id={`tab-${key}`}
              onClick={() => setActiveTab(key)}
              className={clsx(
                "rounded-md px-4 py-2 text-base md:text-sm",           // bigger touch targets on mobile
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-400",
                selected
                  ? "font-semibold border-b-2 border-brand -mb-[2px]"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Active iframe */}
      <div
        id={`panel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        className="rounded-lg border"
      >
        <iframe
          key={activeTab}                 // ensures reload when switching tabs
          title={`Eir & Wild — ${activeTab}`}
          src={iframes[activeTab]}
          className="w-full border-0"     // responsive width; height handled by resizer
          loading="lazy"
        />
      </div>

      <p className="text-sm text-slate-600">
        Problems booking? Email{" "}
        <a href="mailto:hello@eirandwild.co.uk" className="underline">
          hello@eirandwild.co.uk
        </a>.
      </p>
    </div>
  );
}
