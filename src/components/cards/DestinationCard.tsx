import Link from "next/link";
import { MapPin } from "lucide-react";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import type { Destination } from "@/types";

interface DestinationCardProps {
  destination: Destination;
  variant?: "default" | "featured";
}

export function DestinationCard({ destination, variant = "default" }: DestinationCardProps) {
  const href = `/destinasi/${destination.id}`;

  if (variant === "featured") {
    return (
      <Link
        href={href}
        className="group block relative rounded-xl overflow-hidden cursor-pointer border border-border-warm transition-all duration-300 hover:shadow-xl hover:border-terracotta/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
        aria-label={`Lihat detail destinasi ${destination.name}`}
      >
        <div className="card-img-wrap aspect-[16/10] md:aspect-[2/1] w-full">
          <ImageWithFallback
            src={destination.image}
            alt={`Destinasi wisata ${destination.name}, Turki`}
            className="w-full h-full"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
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
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {destination.highlights.slice(0, 3).map((h) => (
              <span
                key={h}
                className="text-xs text-ivory/70 px-2.5 py-1 rounded-lg border border-ivory/20 backdrop-blur-sm bg-charcoal/20"
              >
                {h}
              </span>
            ))}
            <span className="text-xs font-semibold text-gold inline-flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
              Lihat Detail →
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group block relative rounded-xl overflow-hidden cursor-pointer border border-border-warm transition-all duration-300 hover:shadow-lg hover:border-terracotta/30 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
      aria-label={`Lihat detail destinasi ${destination.name}`}
    >
      <div className="card-img-wrap aspect-[5/3] w-full">
        <ImageWithFallback
          src={destination.image}
          alt={`Destinasi wisata ${destination.name}, Turki`}
          className="w-full h-full"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/25 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="flex items-center gap-1.5 mb-1.5">
          <MapPin className="w-3.5 h-3.5 text-gold" />
          <span className="text-xs font-semibold text-gold/90 uppercase tracking-wide">
            {destination.region}
          </span>
        </div>
        <h3 className="font-serif text-xl font-semibold text-ivory drop-shadow">
          {destination.name}
        </h3>
        <p className="text-ivory/70 text-xs leading-relaxed mt-1.5 line-clamp-2">
          {destination.description}
        </p>
      </div>
    </Link>
  );
}
