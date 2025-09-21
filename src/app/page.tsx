import TileCard from "@/app/(components)/TileCard";
import { HOME_TILES } from "@/lib/homeTiles";
import { Analytics } from "@vercel/analytics/next"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[--brand]">
      <div className="mx-auto w-full max-w-3xl px-3 py-6 sm:px-4">
        <div className="grid grid-cols-1 gap-4">
          {HOME_TILES.map((tile) => (
            <TileCard key={tile.title} tile={tile} />
          ))}
        </div>

        {/* social row at the bottom, optional; navy + gold brand */}
        <div className="mt-6 flex justify-center gap-6 text-[--brand-ink]">
          <a
            href="https://www.facebook.com/EirandWildWellness"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="grid h-10 w-10 place-items-center rounded-full bg-white/90 text-[--brand] shadow hover:opacity-90"
            title="Facebook"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07c0 4.99 3.66 9.13 8.44 9.93v-7.02H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.9h-2.34V22c4.78-.8 8.44-4.94 8.44-9.93z"/></svg>
          </a>
          <a
            href="https://www.instagram.com/EirandWildWellness/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="grid h-10 w-10 place-items-center rounded-full bg-white/90 text-[--brand] shadow hover:opacity-90"
            title="Instagram"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm5 3a5 5 0 110 10 5 5 0 010-10zm0 2.2a2.8 2.8 0 100 5.6 2.8 2.8 0 000-5.6zM18.5 6.5a1 1 0 110 2 1 1 0 010-2z"/></svg>
          </a>
          <a
            href="https://www.tiktok.com/@fitnesswithlara?lang=en"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="grid h-10 w-10 place-items-center rounded-full bg-white/90 text-[--brand] shadow hover:opacity-90"
            title="TikTok"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M18 4.5a5.6 5.6 0 01-3.1-.9V14a4.6 4.6 0 11-3.1-4.3v2.5a2.5 2.5 0 102.5 2.5V2h2.1a5.6 5.6 0 004.6 4.5V9A7.6 7.6 0 0118 8V4.5z"/></svg>
          </a>
        </div>

        {/* little brand line */}
        <p className="mt-4 text-center text-sm text-[--gold]">
          AWAKEN YOUR POWER. NURTURE YOUR JOURNEY.
        </p>
      </div>
    </main>
  );
}
