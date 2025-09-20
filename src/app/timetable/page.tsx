"use client";

import { useState } from "react";

export default function TimetablePage() {
  const [activeTab, setActiveTab] = useState<"womanhood" | "motherhood">("womanhood");

  const iframes = {
    womanhood: "https://bookwhen.com/eirandwild-womanhood/iframe",
    motherhood: "https://bookwhen.com/eirandwild-motherhood/iframe",
  };

  return (
    <div className="grid gap-6 py-8">
      <h1 className="text-3xl font-bold">Timetable & Booking</h1>
      <p className="text-slate-700">
        Select the schedule below to view and book your classes directly.
      </p>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        <button
          onClick={() => setActiveTab("womanhood")}
          className={`px-4 py-2 ${
            activeTab === "womanhood"
              ? "border-b-2 border-brand font-semibold"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Womanhood
        </button>
        <button
          onClick={() => setActiveTab("motherhood")}
          className={`px-4 py-2 ${
            activeTab === "motherhood"
              ? "border-b-2 border-brand font-semibold"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Motherhood
        </button>
      </div>

      {/* Active iframe */}
      <div className="rounded-lg border">
        <iframe
          key={activeTab} // ensures reload when switching tabs
          title={`Eir & Wild — ${activeTab}`}
          src={iframes[activeTab]}
          className="w-full h-[1200px] border-0"
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
