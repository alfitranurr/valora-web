import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import {
  getFeaturedDestination,
  getNonFeaturedDestinations,
} from "@/data/destinations";

export function Destinations() {
  const featured = getFeaturedDestination();
  const rest = getNonFeaturedDestinations();

  return (
    <section className="py-20 md:py-24 bg-ivory-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="flex items-end justify-between mb-10">
            <SectionHeader
              eyebrow="Destination"
              title="Jelajahi Keajaiban Turki"
              description="Dari balon udara Cappadocia hingga megahnya Hagia Sophia di Istanbul."
            />
            <Link
              href="/destinasi"
              className="group hidden md:inline-flex items-center gap-3 pl-5 pr-2 py-2 rounded-xl bg-transparent border border-border-warm text-sm font-semibold text-charcoal transition-all duration-300 ease-out hover:border-terracotta/40 hover:bg-surface hover:shadow-sm active:scale-[0.97]"
            >
              Semua destinasi
              <span className="w-8 h-8 rounded-lg bg-charcoal/5 flex items-center justify-center transition-all duration-300 group-hover:bg-terracotta">
                <ArrowRight className="w-4 h-4 text-charcoal transition-colors duration-300 group-hover:text-white" />
              </span>
            </Link>
          </div>
        </RevealOnScroll>

        {featured && (
          <RevealOnScroll y={24}>
            <div className="mb-6">
              <DestinationCard destination={featured} variant="featured" />
            </div>
          </RevealOnScroll>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {rest.slice(0, 8).map((dest, idx) => (
            <RevealOnScroll key={dest.id} delay={idx * 80} y={20}>
              <DestinationCard destination={dest} />
            </RevealOnScroll>
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <Link
            href="/destinasi"
            className="group w-full inline-flex items-center justify-between pl-5 pr-2 py-2 rounded-xl bg-transparent border border-border-warm text-sm font-semibold text-charcoal transition-all duration-300 ease-out hover:border-terracotta/40 hover:bg-surface hover:shadow-sm active:scale-[0.97]"
          >
            Semua destinasi
            <span className="w-8 h-8 rounded-lg bg-charcoal/5 flex items-center justify-center transition-all duration-300 group-hover:bg-terracotta">
              <ArrowRight className="w-4 h-4 text-charcoal transition-colors duration-300 group-hover:text-white" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
