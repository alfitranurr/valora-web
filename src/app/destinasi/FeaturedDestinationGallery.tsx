"use client";

import { useCallback, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { cn } from "@/lib/utils";
import type { Destination } from "@/types";

interface FeaturedDestinationGalleryProps {
  destination: Destination;
}

/**
 * Kartu featured dengan galeri horizontal scroll (kiri/kanan).
 * Generik per destinasi: dipakai jika destinasi memiliki data `gallery`
 * (1 foto pertama = image utama destinasi).
 */
export function FeaturedDestinationGallery({
  destination,
}: FeaturedDestinationGalleryProps) {
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
    <div className="group relative rounded-lg overflow-hidden border border-border-warm aspect-[16/10] md:aspect-[2/1]">
      {/* Track foto */}
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
              priority={i === 0}
              reveal={i === 0}
            />
          </div>
        ))}
      </div>

      {/* Overlay dekoratif */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent" />

      {/* Panah */}
      <button
        type="button"
        onClick={() => scrollBy(-1)}
        disabled={!canPrev}
        aria-label="Foto sebelumnya"
        className={cn(
          "absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center bg-charcoal/50 backdrop-blur text-ivory border border-ivory/20 transition-all duration-200 active:scale-[0.92]",
          canPrev ? "opacity-100 hover:bg-charcoal/70" : "opacity-0 pointer-events-none"
        )}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={() => scrollBy(1)}
        disabled={!canNext}
        aria-label="Foto berikutnya"
        className={cn(
          "absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center bg-charcoal/50 backdrop-blur text-ivory border border-ivory/20 transition-all duration-200 active:scale-[0.92]",
          canNext ? "opacity-100 hover:bg-charcoal/70" : "opacity-0 pointer-events-none"
        )}
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      {photos.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
          {photos.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollTo(i)}
              aria-label={`Ke foto ${i + 1}`}
              className={cn(
                "w-2 h-2 rounded-full border border-white/0 transition-all duration-200",
                i === active ? "bg-white" : "bg-white/40 hover:bg-white/70"
              )}
            />
          ))}
        </div>
      )}

      {/* Konten overlay seperti kartu featured */}
      <div className="absolute inset-0 pointer-events-none flex items-end">
        <div className="w-full p-6 md:p-10">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4 text-gold" />
            <span className="text-xs font-semibold text-gold/90 uppercase tracking-wide">
              {destination.region}
            </span>
          </div>
          <h3 className="font-serif text-3xl md:text-5xl font-semibold text-ivory mb-3 drop-shadow">
            {destination.name}
          </h3>
          <p className="text-ivory/80 text-sm md:text-base leading-relaxed max-w-lg">
            {destination.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {destination.highlights.slice(0, 3).map((h) => (
              <span
                key={h}
                className="text-xs text-ivory/70 px-2.5 py-1 rounded-lg border border-ivory/20 backdrop-blur-sm bg-charcoal/20"
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
