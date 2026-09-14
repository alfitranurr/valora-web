import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { Badge } from "@/components/shared/Badge";
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import type { Bundle } from "@/types";

interface BundleCardProps {
  bundle: Bundle;
}

export function BundleCard({ bundle }: BundleCardProps) {
  return (
    <article className="group flex flex-col bg-surface rounded-lg border border-border-warm overflow-hidden transition-shadow hover:shadow-md">
      <div className="card-img-wrap aspect-[4/3] w-full">
        <ImageWithFallback
          src={bundle.image}
          alt={bundle.name}
          className="w-full h-full"
        />
      </div>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-warm-grey uppercase tracking-wide">
            Bundle
          </span>
          {bundle.bestSeller && <Badge variant="bestseller">Best Seller</Badge>}
        </div>

        <h3 className="font-serif text-lg font-semibold text-charcoal leading-snug mb-2">
          {bundle.name}
        </h3>

        <p className="text-sm text-warm-grey leading-relaxed line-clamp-2 mb-3">
          {bundle.shortDesc}
        </p>

        <div className="flex items-center gap-4 text-xs text-warm-grey mb-3">
          <span>{bundle.duration}</span>
          <span aria-hidden="true">·</span>
          <span>{bundle.capacity}</span>
        </div>

        {bundle.savingsNote && (
          <p className="text-xs font-medium text-terracotta mb-4">
            {bundle.savingsNote}
          </p>
        )}

        <div className="mt-auto flex items-end justify-between">
          <PriceDisplay
            priceIDR={bundle.priceIDR}
            priceUSD={bundle.priceUSD}
            unit={bundle.unit}
            size="sm"
          />
          <Link
            href={`/bundles/${bundle.slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-terracotta hover:text-terracotta-dark transition-colors"
          >
            Lihat Detail
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
