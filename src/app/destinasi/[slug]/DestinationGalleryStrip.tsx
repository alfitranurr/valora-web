"use client";

import { useCallback, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { cn } from "@/lib/utils";
import type { Destination } from "@/types";

interface DestinationGalleryStripProps {
  destination: Destination;
}

/**
 * Strip galeri horizontal ringan untuk halaman detail destinasi —
 * scroll snap kiri/kanan dengan panah + dots, tanpa overlay teks besar.
 */
export function DestinationGalleryStrip({
  destination,
}: DestinationGalleryStripProps) {
  const photos = destination.gallery?.length
    ? destination.gallery
    : [destination.image];

  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(photos.length > 1);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
    setActive(Math.round(el.scrollLeft / Math.max(1, el.clientWidth)));
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
  };

  const scrollTo = (index: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: index * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="relative rounded-lg overflow-hidden border border-border-warm aspect-[16/9] md:aspect-[21/9]">
      <div
        ref={trackRef}
        onScroll={updateArrows}
        className="flex h-full w-full overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth"
        role="region"
        aria-label={`Galeri foto ${destination.name}`}
      >
        {photos.map((src, i) => (
          <div
            key={src}
            className="relative w-full h-full flex-shrink-0 snap-center"
          >
            <ImageWithFallback
              src={src}
              alt={`${destination.name} — foto ${i + 1} dari ${photos.length}`}
              className="w-full h-full"
              imgClassName="object-cover"
              priority={false}
              reveal={false}
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scrollBy(-1)}
        disabled={!canPrev}
        aria-label="Foto sebelumnya"
        className={cn(
          "absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center bg-charcoal/50 backdrop-blur text-ivory border border-ivory/20 transition-all duration-200 active:scale-[0.92]",
          canPrev ? "opacity-100 hover:bg-charcoal/70" : "opacity-0 pointer-events-none"
        )}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => scrollBy(1)}
        disabled={!canNext}
        aria-label="Foto berikutnya"
        className={cn(
          "absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center bg-charcoal/50 backdrop-blur text-ivory border border-ivory/20 transition-all duration-200 active:scale-[0.92]",
          canNext ? "opacity-100 hover:bg-charcoal/70" : "opacity-0 pointer-events-none"
        )}
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {photos.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
          {photos.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollTo(i)}
              aria-label={`Ke foto ${i + 1}`}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-200",
                i === active ? "bg-white" : "bg-white/40 hover:bg-white/70"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
