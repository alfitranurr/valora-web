import Link from "next/link";
import { ArrowRight, Clock, Users, MapPin } from "lucide-react";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { Badge } from "@/components/shared/Badge";
import type { TourPackage } from "@/types";
import { formatPriceIDR, formatPriceUSD } from "@/lib/currency";

interface PackageCardProps {
  pkg: TourPackage;
}

export function PackageCard({ pkg }: PackageCardProps) {
  return (
    <article className="group flex flex-col bg-surface rounded-xl border border-border-warm overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-terracotta/30 hover:-translate-y-1">
      {/* Image */}
      <div className="card-img-wrap relative aspect-[5/3] w-full">
        <ImageWithFallback
          src={pkg.image}
          alt={`${pkg.name} — ${pkg.destination}`}
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          {pkg.bestSeller && (
            <Badge variant="bestseller" className="backdrop-blur-sm bg-gold/90 text-charcoal border-0">
              Best Seller
            </Badge>
          )}
        </div>
        <div className="absolute bottom-3 left-4 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-gold" />
          <span className="text-xs font-semibold text-ivory uppercase tracking-wide drop-shadow">
            {pkg.destination}
          </span>
        </div>
      </div>

      {/* Content — fixed structure for consistent height */}
      <div className="flex flex-col flex-1 p-6">
        {/* Title — fixed height */}
        <h3 className="font-serif text-lg font-semibold text-charcoal leading-snug mb-3 min-h-[3.5rem] line-clamp-2">
          {pkg.name}
        </h3>

        {/* Description — fixed height */}
        <p className="text-sm text-warm-grey leading-relaxed line-clamp-2 mb-4 min-h-[2.5rem]">
          {pkg.description}
        </p>

        {/* Meta — fixed height */}
        <div className="flex items-center gap-4 mb-5 pb-5 border-b border-border-warm min-h-[1.5rem]">
          <div className="flex items-center gap-1.5 text-xs text-warm-grey">
            <Clock className="w-3.5 h-3.5 text-terracotta flex-shrink-0" />
            <span className="truncate">{pkg.duration}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-warm-grey">
            <Users className="w-3.5 h-3.5 text-terracotta flex-shrink-0" />
            <span className="truncate">{pkg.capacity}</span>
          </div>
        </div>

        {/* Price + CTA — pinned to bottom */}
        <div className="mt-auto">
          <div className="mb-4">
            <p className="text-xs text-warm-grey mb-0.5">Mulai dari</p>
            <p className="text-xl font-bold text-charcoal">
              {formatPriceIDR(pkg.priceIDR)}
            </p>
            <p className="text-xs font-medium text-gold min-h-[1.25rem]">
              {formatPriceUSD(pkg.priceUSD)} · {pkg.unit}
            </p>
          </div>

          <Link
            href={`/tour-packages/${pkg.slug}`}
            className="w-full inline-flex items-center justify-center gap-2 bg-charcoal/5 text-charcoal font-semibold text-sm rounded-lg px-4 py-3 transition-all duration-300 ease-out hover:bg-terracotta hover:text-white hover:shadow-md active:scale-[0.97]"
          >
            Lihat Detail
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
