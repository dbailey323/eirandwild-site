// src/components/SocialBar.tsx
"use client";

export default function SocialBar() {
  return (
    <div
      className="
        fixed bottom-3 left-1/2 z-50 -translate-x-1/2
        rounded-full bg-white/90 px-3 py-2 shadow-lg backdrop-blur
        ring-1 ring-black/5
        pb-[env(safe-area-inset-bottom)]
      "
      role="region"
      aria-label="Social media links"
    >
      <div className="flex items-center gap-3 text-slate-700">
        {/* Facebook App (mobile) */}
        <a
          href="fb://page/245162602330472"
          className="block md:hidden rounded-full p-2 hover:text-[--brand] focus:outline-none focus:ring-2 focus:ring-[--brand]"
          aria-label="Open Facebook page in app"
          rel="noopener"
        >
          {/* Facebook Icon */}
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
            <path d="M22 12.06C22 6.48 17.52 2 12 2S2 6.48 2 12.06c0 4.98 3.66 9.12 8.44 9.94v-7.03H7.9v-2.91h2.54V9.41c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34V22c4.78-.82 8.44-4.96 8.44-9.94z" />
          </svg>
        </a>

        {/* Facebook Web (desktop/tablet) */}
        <a
          href="https://www.facebook.com/EirandWildWellness"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block rounded-full p-2 hover:text-[--brand] focus:outline-none focus:ring-2 focus:ring-[--brand]"
          aria-label="Open Facebook page on the web"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
            <path d="M22 12.06C22 6.48 17.52 2 12 2S2 6.48 2 12.06c0 4.98 3.66 9.12 8.44 9.94v-7.03H7.9v-2.91h2.54V9.41c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34V22c4.78-.82 8.44-4.96 8.44-9.94z" />
          </svg>
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/EirandWildWellness/"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full p-2 hover:text-[--brand] focus:outline-none focus:ring-2 focus:ring-[--brand]"
          aria-label="Open Instagram"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
            <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5zM18 6.75a1 1 0 1 1-1 1 1 1 0 0 1 1-1z" />
          </svg>
        </a>

        {/* TikTok */}
        <a
          href="https://www.tiktok.com/@fitnesswithlara?lang=en"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full p-2 hover:text-[--brand] focus:outline-none focus:ring-2 focus:ring-[--brand]"
          aria-label="Open TikTok"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
            <path d="M21 8.5a6.5 6.5 0 0 1-4.5-1.9v7.02a6.62 6.62 0 1 1-6.62-6.62c.36 0 .7.03 1.03.1v2.5a4.12 4.12 0 1 0 2.9 3.94V2h2.48A6.49 6.49 0 0 0 21 4.97z"/>
          </svg>
        </a>
      </div>
    </div>
  );
}
