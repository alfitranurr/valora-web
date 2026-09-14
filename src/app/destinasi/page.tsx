import { DestinationCard } from "@/components/cards/DestinationCard";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { PageHeader } from "@/components/shared/PageHeader";
import { destinations } from "@/data/destinations";
import { DestinationsClient } from "./DestinationsClient";
import { FeaturedDestinationGallery } from "./FeaturedDestinationGallery";

export const metadata = {
  title: "Destinasi Turki",
  description:
    "Jelajahi Istanbul, Cappadocia, Bursa, Pamukkale, Konya, Antalya, Trabzon, dan destinasi terbaik Turki lainnya.",
};

export default function DestinationsPage() {
  const featured = destinations.find((d) => d.featured);

  return (
    <div className="bg-ivory">
      <PageHeader
        eyebrow="Destination"
        title="Destinasi Wisata di Turki"
        description="Dari negeri dongeng Cappadocia hingga megahnya Istanbul. Setiap destinasi menawarkan pengalaman yang berbeda."
      />

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {featured &&
            (featured.gallery && featured.gallery.length > 1 ? (
              <div className="mb-12 md:mb-16">
                <FeaturedDestinationGallery destination={featured} />
              </div>
            ) : (
              <RevealOnScroll delay={80} y={24}>
                <div className="mb-12 md:mb-16">
                  <DestinationCard destination={featured} variant="featured" />
                </div>
              </RevealOnScroll>
            ))}

          <DestinationsClient destinations={destinations} />
        </div>
      </section>
    </div>
  );
}
