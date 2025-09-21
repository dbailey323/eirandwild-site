"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useMemo, useTransition } from "react";

type Option = { label: string; value: string };

export default function FilterBar({
  classOptions,
  defaultTab,
}: {
  classOptions: Option[];
  defaultTab: "motherhood" | "womanhood";
}) {
  const router = useRouter();
  const sp = useSearchParams();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const tab = (sp.get("tab") as "motherhood" | "womanhood") || defaultTab;
  const classId = sp.get("class") ?? "all";
  const day = sp.get("day") ?? "all"; // mon..sun
  const q = sp.get("q") ?? "";
  const startHour = sp.get("startHour") ?? "";
  const endHour = sp.get("endHour") ?? "";

  const push = (key: string, val: string) => {
    const next = new URLSearchParams(sp.toString());
    if (!val || val === "all") next.delete(key);
    else next.set(key, val);
    // always keep tab
    if (!next.get("tab")) next.set("tab", tab);
    startTransition(() => router.replace(`${pathname}?${next.toString()}`, { scroll: false }));
  };

  const setMany = (obj: Record<string, string>) => {
    const next = new URLSearchParams(sp.toString());
    Object.entries(obj).forEach(([k, v]) => {
      if (!v || v === "all") next.delete(k);
      else next.set(k, v);
    });
    if (!next.get("tab")) next.set("tab", tab);
    startTransition(() => router.replace(`${pathname}?${next.toString()}`, { scroll: false }));
  };

  const days: Option[] = useMemo(
    () => [
      { label: "All days", value: "all" },
      { label: "Mon", value: "mon" },
      { label: "Tue", value: "tue" },
      { label: "Wed", value: "wed" },
      { label: "Thu", value: "thu" },
      { label: "Fri", value: "fri" },
      { label: "Sat", value: "sat" },
      { label: "Sun", value: "sun" },
    ],
    []
  );

  return (
    <div className="grid gap-3 rounded-xl border p-3 md:grid-cols-12 md:items-end">
      {/* Tabs */}
      <div className="md:col-span-3">
        <div className="inline-flex rounded-lg border p-1 bg-white">
          <button
            onClick={() => setMany({ tab: "motherhood", class: "all" })}
            className="px-3 py-1.5 rounded-md text-sm font-medium data-[active=true]:bg-[--brand] data-[active=true]:text-white"
            data-active={tab === "motherhood"}
          >
            Motherhood
          </button>
          <button
            onClick={() => setMany({ tab: "womanhood", class: "all" })}
            className="px-3 py-1.5 rounded-md text-sm font-medium data-[active=true]:bg-[--brand] data-[active=true]:text-white"
            data-active={tab === "womanhood"}
          >
            Womanhood
          </button>
        </div>
      </div>

      {/* Class select */}
      <label className="md:col-span-3 text-sm">
        <span className="block mb-1 text-slate-600">Class</span>
        <select
          className="w-full rounded-md border px-3 py-2"
          value={classId}
          onChange={(e) => push("class", e.target.value)}
        >
          <option value="all">All classes</option>
          {classOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </label>

      {/* Day select */}
      <label className="md:col-span-2 text-sm">
        <span className="block mb-1 text-slate-600">Day</span>
        <select
          className="w-full rounded-md border px-3 py-2"
          value={day}
          onChange={(e) => push("day", e.target.value)}
        >
          {days.map((d) => (
            <option key={d.value} value={d.value}>{d.label}</option>
          ))}
        </select>
      </label>

      {/* Time range */}
      <div className="md:col-span-3 grid grid-cols-2 gap-2 text-sm">
        <label>
          <span className="block mb-1 text-slate-600">From</span>
          <input
            type="time"
            value={startHour}
            onChange={(e) => push("startHour", e.target.value)}
            className="w-full rounded-md border px-3 py-2"
          />
        </label>
        <label>
          <span className="block mb-1 text-slate-600">To</span>
          <input
            type="time"
            value={endHour}
            onChange={(e) => push("endHour", e.target.value)}
            className="w-full rounded-md border px-3 py-2"
          />
        </label>
      </div>

      {/* Search */}
      <label className="md:col-span-4 text-sm">
        <span className="block mb-1 text-slate-600">Search</span>
        <input
          placeholder="e.g. strong, baby, dance…"
          value={q}
          onChange={(e) => push("q", e.target.value)}
          className="w-full rounded-md border px-3 py-2"
        />
      </label>

      {/* Reset */}
      <div className="md:col-span-2">
        <button
          onClick={() =>
            setMany({ class: "all", day: "all", startHour: "", endHour: "", q: "" })
          }
          className="w-full rounded-md border px-3 py-2 text-sm hover:bg-slate-50"
          disabled={isPending}
        >
          Reset filters
        </button>
      </div>
    </div>
  );
}
