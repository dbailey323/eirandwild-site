import Image from "next/image";
import Link from "next/link";
import type { HomeTile } from "@/lib/homeTiles";

export default function TileCard({ tile }: { tile: HomeTile }) {
  const Wrapper = tile.external ? "a" : Link;

  return (
    <Wrapper
      {...(tile.external ? { href: tile.href, target: "_blank", rel: "noopener noreferrer" } : { href: tile.href })}
      aria-label={tile.title}
      className="block"
    >
      <div className="group relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
        <div className={`relative w-full ${tile.banner ? "aspect-[16/9]" : "aspect-[7/4]"}`}>
          <Image
            src={tile.img}
            alt={tile.alt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.01]"
            sizes="(min-width:1024px) 672px, 100vw"
            priority={tile.banner}
          />
        </div>
      </div>
    </Wrapper>
  );
}
