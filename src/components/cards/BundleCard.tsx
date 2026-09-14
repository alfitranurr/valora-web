import Link from "next/link";
import { ArrowRight, Clock, Users } from "lucide-react";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { Badge } from "@/components/shared/Badge";
import type { Bundle } from "@/types";
import { formatPriceIDR, formatPriceUSD } from "@/lib/currency";

interface BundleCardProps {
  bundle: Bundle;
}

export function BundleCard({ bundle }: BundleCardProps) {
  return (
    <article className="group flex flex-col bg-surface rounded-xl border border-border-warm overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-terracotta/30 hover:-translate-y-1">
      {/* Image with overlay */}
      <div className="card-img-wrap relative aspect-[5/3] w-full">
        <ImageWithFallback
          src={bundle.image}
          alt={bundle.name}
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <Badge variant="default" className="backdrop-blur-sm bg-charcoal/80 text-ivory border-0">
            Bundle
          </Badge>
          {bundle.bestSeller && (
            <Badge variant="bestseller" className="backdrop-blur-sm bg-gold/90 text-charcoal border-0">
              Best Seller
            </Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="font-serif text-lg font-semibold text-charcoal leading-snug mb-3">
          {bundle.name}
        </h3>

        <p className="text-sm text-warm-grey leading-relaxed line-clamp-2 mb-4">
          {bundle.shortDesc}
        </p>

        {/* Meta info with icons */}
        <div className="flex items-center gap-4 mb-3 pb-3 border-b border-border-warm">
          <div className="flex items-center gap-1.5 text-xs text-warm-grey">
            <Clock className="w-3.5 h-3.5 text-terracotta" />
            {bundle.duration}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-warm-grey">
            <Users className="w-3.5 h-3.5 text-terracotta" />
            {bundle.capacity}
          </div>
        </div>

        {bundle.savingsNote && (
          <div className="flex items-center gap-1.5 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
            <p className="text-xs font-semibold text-terracotta">
              {bundle.savingsNote}
            </p>
          </div>
        )}

        {/* Price + CTA */}
        <div className="mt-auto">
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="text-xs text-warm-grey mb-0.5">Mulai dari</p>
              <p className="text-xl font-bold text-charcoal">
                {formatPriceIDR(bundle.priceIDR)}
              </p>
              <p className="text-xs font-medium text-gold">
                {formatPriceUSD(bundle.priceUSD)} · {bundle.unit}
              </p>
            </div>
          </div>

          <Link
            href={`/bundles/${bundle.slug}`}
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
