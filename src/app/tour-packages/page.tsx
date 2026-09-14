import { SectionHeader } from "@/components/shared/SectionHeader";
import { PackageCard } from "@/components/cards/PackageCard";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { tourPackages } from "@/data/packages";
import { BundleCard } from "@/components/cards/BundleCard";
import { bundles } from "@/data/bundles";

export const metadata = {
  title: "Paket Tour Turki — Valora Tour & Travel",
  description:
    "Paket tur all-inclusive ke Istanbul, Bursa, Cappadocia, dan Pamukkale dengan armada private Mercedes-Benz dan guide berlisensi.",
};

export default function TourPackagesPage() {
  return (
    <div className="bg-ivory">
      <section className="pt-16 md:pt-20 pb-12 border-b border-border-warm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll y={16}>
            <SectionHeader
              eyebrow="Tour Packages"
              title="Paket tur pilihan ke destinasi terbaik Turki"
              description="Tur all-inclusive dengan armada private Mercedes-Benz Vito. Guide berlisensi, itinerary terstruktur, dan harga transparan."
            />
          </RevealOnScroll>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tourPackages.map((pkg, idx) => (
              <RevealOnScroll key={pkg.id} delay={idx * 100} y={20}>
                <PackageCard pkg={pkg} />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-ivory-dark border-t border-border-warm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll y={16}>
            <SectionHeader
              eyebrow="Bundles"
              title="Hemat lebih banyak dengan bundle"
              description="Kombinasi layanan dengan harga lebih terjangkau dibanding pesan satuan."
              className="mb-10"
            />
          </RevealOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bundles.map((b, idx) => (
              <RevealOnScroll key={b.id} delay={idx * 100} y={20}>
                <BundleCard bundle={b} />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
