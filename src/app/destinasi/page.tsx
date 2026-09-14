import { SectionHeader } from "@/components/shared/SectionHeader";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import {
  getFeaturedDestination,
  getNonFeaturedDestinations,
} from "@/data/destinations";

export const metadata = {
  title: "Destinasi Turki — Valora Tour & Travel",
  description:
    "Jelajahi Istanbul, Cappadocia, Bursa, Pamukkale, Konya, Antalya, Trabzon, dan destinasi terbaik Turki lainnya.",
};

export default function DestinationsPage() {
  const featured = getFeaturedDestination();
  const rest = getNonFeaturedDestinations();

  return (
    <div className="bg-ivory">
      <section className="pt-16 md:pt-20 pb-12 border-b border-border-warm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll y={16}>
            <SectionHeader
              eyebrow="Destination"
              title="Destinasi Wisata di Turki"
              description="Dari negeri dongeng Cappadocia hingga megahnya Istanbul. Setiap destinasi menawarkan pengalaman yang berbeda."
            />
          </RevealOnScroll>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {featured && (
            <RevealOnScroll delay={80} y={24}>
              <div className="mb-12 md:mb-16">
                <DestinationCard destination={featured} variant="featured" />
              </div>
            </RevealOnScroll>
          )}

          <div className="space-y-16 md:space-y-24">
            {rest.map((dest, idx) => (
              <RevealOnScroll
                key={dest.id}
                id={dest.id}
                delay={idx * 60}
                y={28}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center scroll-mt-24"
              >
                <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="rounded-lg overflow-hidden">
                    <DestinationCard destination={dest} />
                  </div>
                </div>
                <div className={idx % 2 === 1 ? "lg:order-1" : ""}>
                  <p
                    className={
                      idx % 2 === 0
                        ? "text-sm font-semibold text-terracotta uppercase tracking-wide mb-2"
                        : "text-sm font-semibold text-gold uppercase tracking-wide mb-2"
                    }
                  >
                    {dest.region}
                  </p>
                  <h2 className="font-serif text-2xl md:text-3xl font-semibold text-charcoal mb-3">
                    {dest.name}
                  </h2>
                  <p className="text-warm-grey text-base leading-relaxed mb-5">
                    {dest.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {dest.highlights.map((h) => (
                      <span
                        key={h}
                        className="text-xs text-charcoal bg-ivory-dark border border-border-warm px-3 py-1.5 rounded"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
