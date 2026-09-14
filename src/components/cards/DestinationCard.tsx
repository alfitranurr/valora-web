import { MapPin } from "lucide-react";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import type { Destination } from "@/types";

interface DestinationCardProps {
  destination: Destination;
  variant?: "default" | "featured";
}

export function DestinationCard({ destination, variant = "default" }: DestinationCardProps) {
  if (variant === "featured") {
    return (
      <article className="group relative rounded-lg overflow-hidden cursor-pointer">
        <div className="card-img-wrap aspect-[16/10] md:aspect-[2/1] w-full">
          <ImageWithFallback
            src={destination.image}
            alt={`Destinasi wisata ${destination.name}, Turki`}
            className="w-full h-full"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-terracotta" />
            <span className="text-xs font-medium text-ivory/70 uppercase tracking-wide">
              {destination.region}
            </span>
          </div>
          <h3 className="font-serif text-3xl md:text-5xl font-semibold text-ivory mb-3">
            {destination.name}
          </h3>
          <p className="text-ivory/80 text-sm md:text-base leading-relaxed max-w-lg">
            {destination.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {destination.highlights.slice(0, 3).map((h) => (
              <span
                key={h}
                className="text-xs text-ivory/60 px-2.5 py-1 rounded border border-ivory/20"
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group relative rounded-lg overflow-hidden cursor-pointer">
      <div className="card-img-wrap aspect-[4/3] w-full">
        <ImageWithFallback
          src={destination.image}
          alt={`Destinasi wisata ${destination.name}, Turki`}
          className="w-full h-full"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="flex items-center gap-1.5 mb-1">
          <MapPin className="w-3 h-3 text-terracotta" />
          <span className="text-xs font-medium text-ivory/60 uppercase tracking-wide">
            {destination.region}
          </span>
        </div>
        <h3 className="font-serif text-xl font-semibold text-ivory">
          {destination.name}
        </h3>
        <p className="text-ivory/70 text-xs leading-relaxed mt-1 line-clamp-2">
          {destination.description}
        </p>
      </div>
    </article>
  );
}
